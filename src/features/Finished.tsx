import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import axios from 'axios';

import { useAppSelector, useAppDispatch } from '@app/hooks';
import { getPaymentInfo, updatePaymentInfo } from '@app/state/paymentSlice';

const Finished = () => {
  const [refundIsLoading, setRefundLoading] = useState(false);
  const paymentInfo = useAppSelector(getPaymentInfo);
  const dispatch = useAppDispatch();

  const handleRefund = async (e: any) => {
    e.preventDefault();
    if (!paymentInfo) {
      return;
    }
    setRefundLoading(true);
    const { subscriptionId } = paymentInfo;
    await axios
      .post('/api/cancel-subscription', { subscriptionId })
      .then((r) => {
        if (!r?.data?.stripeResponse) {
          return;
        }
        console.log('cancelResult', r.data.stripeResponse);
        dispatch(updatePaymentInfo({ status: 'refunded', displayApiData: r.data.stripeResponse }));
      })
      .finally(() => {
        setRefundLoading(false);
      });
  };

  return (
    <div className="justify-center mt-2">
      {paymentInfo.status === 'finished' && (
        <div>
          <div>
            <h3 className="font-bold">
              Subscribed successfully!
            </h3>
          </div>
          <div>
            <Button color="warning" fullWidth className="mt-3" isLoading={refundIsLoading} disabled={refundIsLoading} size="md" onClick={handleRefund}>
              Cancel & Refund
            </Button>
          </div>
        </div>
      )}

      {paymentInfo.status === 'refunded' && (
        <div>
          <div color="$purple500" className="font-bold">
            Successfully cancelled subscription and refunded invoice.
          </div>
        </div>
      )}
    </div>
  );
};

export default Finished;
