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
      .post('/api/subscription/cancel', { subscriptionId })
      .then((r) => {
        if (!r?.data?.apiData) {
          return;
        }
        console.log('cancelResult', r.data.apiData);
        dispatch(updatePaymentInfo({ status: 'refunded', displayApiData: r.data.apiData }));
      })
      .finally(() => {
        setRefundLoading(false);
      });
  };

  return (
    <div className="justify-center mt-5">
      {paymentInfo.status === 'finished' && (
        <div>
          <div>
            <h3 className="font-bold">
              Subscribed successfully!
            </h3>
          </div>
          <div>
            <Button isLoading={refundIsLoading} disabled={refundIsLoading} size="md" onClick={handleRefund}>
              Cancel & Refund
            </Button>
          </div>
        </div>
      )}

      {paymentInfo.status === 'refunded' && (
        <div>
          <div color="$purple500" className="font-bold">
            Cancelled subscription and refunded invoice.
          </div>
        </div>
      )}
    </div>
  );
};

export default Finished;
