import React, { useState } from "react";
import { Button, Divider, Input, Radio, RadioGroup, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useAppSelector, useAppDispatch } from "@app/hooks";
import { getPaymentInfo, updatePaymentInfo } from "@app/state/paymentSlice";
import CustomRadio from "@app/modules/CustomRadio";

const usStates = [
  "AL", "AK", "AZ", "AR", "CA",
  "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS",
  "KY", "LA", "ME", "MD", "MA",
  "MI", "MN", "MS", "MO", "MT",
  "NE", "NV", "NH", "NJ", "NM",
  "NY", "NC", "ND", "OH", "OK",
  "OR", "PA", "RI", "SC", "SD",
  "TN", "TX", "UT", "VT", "VA", "WA",
  "WV", "WI", "WY"
];

const InitialForm = () => {
  const paymentInfo = useAppSelector(getPaymentInfo);
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const formValidation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    zipcode: Yup.number().required("ZIP Code is required"),
    state: Yup.string().required("State is required"),
    discountCode: Yup.string().optional(),
  });
  const formOptions = { resolver: yupResolver(formValidation) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const handlePlanChange = (value: string | number) => {
    dispatch(updatePaymentInfo({ plan: value }));
  };

  const onSubmit = async (formData: any) => {
    await dispatch(updatePaymentInfo({ billingInfo: { ...formData } }));
    const { plan, discountCode, billingInfo } = paymentInfo;
    setLoading(true);
    await axios
      .post("/api/create-subscription", { plan, discountCode, state: billingInfo?.state })
      .then((response) => {
        if (!response?.data?.stripeResponse) {
          console.log("createResult", response);
          return;
        }
        const data = response.data.stripeResponse;
        // TODO: use logger
        console.log("createResult", data);
        dispatch(
          updatePaymentInfo({
            status: "need-payment",
            subscriptionId: data.subscriptionId,
            clientSecret: data.clientSecret,
            displayApiData: data.rawResponse,
          }),
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="text-sm font-bold mb-3">Enter billing address</h4>
      <div className="mt-1 space-y-4">
        <div>
          <Input
            required
            label="Name"
            placeholder="Name"
            isInvalid={Boolean(errors.name)}
            {...register("name")}
          />
        </div>
        <div>
          <Input
            required
            label="Address"
            placeholder="Address"
            isInvalid={Boolean(errors.address)}
            {...register("address")}
          />
        </div>
        <div>
          <Input
            width="170px"
            required
            label="City"
            placeholder="City"
            isInvalid={Boolean(errors.city)}
            {...register("city")}
          />
        </div>
        <div>
          <Input
            width="130px"
            required
            label="ZIP Code"
            placeholder="ZIP Code"
            type="number"
            isInvalid={Boolean(errors.zipcode)}
            {...register("zipcode")}
          />
        </div>
        <div>
          <Select
            required
            label="State"
            placeholder="Select your state"
            isInvalid={Boolean(errors.state)}
            {...register("state")}
          >
            {usStates.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <Divider className="my-4" />
      <h3 className="text-sm font-bold mb-3">Choose a plan</h3>

      <RadioGroup defaultValue="A" size="sm" onValueChange={handlePlanChange}>
        <CustomRadio value="A" description="monthly recurring">
          $2.99
        </CustomRadio>
        <CustomRadio value="B" description="annual recurring (20% off)">
          $28.99
        </CustomRadio>
      </RadioGroup>

      <Divider className="mt-5 mb-3" />

      <div className="mt-4 mb-5">
        <Input
          width="180px"
          placeholder="Discount code"
          color="primary"
          {...register("discountCode")}
        />
      </div>

      {/*<Divider className="mt-2 mb-6" />*/}

      <div className="justify-space-around">
        <Button color="primary" variant="solid" fullWidth type="submit" isLoading={isLoading} disabled={isLoading} size="md">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default InitialForm;
