import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Card, CardHeader, CardBody, Divider, Link } from '@nextui-org/react';
import { Elements } from '@stripe/react-stripe-js';
import { useAppSelector } from '@app/hooks';
import { getPaymentInfo } from '@app/state/paymentSlice';
import StripeForm from '@feature/StripeForm';
import Finished from '@feature/Finished';
import InitialForm from '@feature/InitialForm';
import getStripe from '@app/util/stripe.util';

const DynamicReactJson = dynamic(import('@microlink/react-json-view'), { ssr: false });

const Checkout: NextPage = () => {
  const paymentInfo = useAppSelector(getPaymentInfo);

  return (
    <div className="flex justify-center my-3">
      <Card className="flex justify-center w-96">
        <CardHeader>
          <Link href="/">
            <h3 className="font-bold">
              Stripe Demo
            </h3>
          </Link>
        </CardHeader>

        <Divider />

        <CardBody className="pt-3">
          {paymentInfo.status === 'billing-info' && <InitialForm />}

          {paymentInfo.status === 'need-payment' && (
            <Elements stripe={getStripe()}>
              <StripeForm />
            </Elements>
          )}

          {(paymentInfo.status === 'finished' || paymentInfo.status === 'refunded') && <Finished />}
        </CardBody>
      </Card>

      {paymentInfo.displayApiData && (
        <div className="flex flex-row">
          <Card className="my-6 text-xs">
            <CardHeader>
              <h3 className="font-bold">API data</h3>
            </CardHeader>
            <DynamicReactJson
              src={paymentInfo.displayApiData}
              collapsed={1}
              displayDataTypes={false}
              enableClipboard={false}
              indentWidth={3}
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default Checkout;
