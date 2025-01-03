import { useCallback, useState } from 'react';
import { PaymentSelectForm } from './ui/PaymentSelectForm';
import { Elements } from '@stripe/react-stripe-js';
import { convertToSubCurrency } from '@utils';
import { PaymentForm } from './ui/PaymentForm';
import { paymentInfoSelectors } from 'src/app/store/reducers/payment/selectors';
import { loadStripe } from '@stripe/stripe-js';
import { useAppSelector } from '@shared';

const STRIPE_PROMISE = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

export const PaymentPage = () => {
  const [isContinuePayment, setIsContinuePayment] = useState(false);
  const { selectedPlan } = useAppSelector(paymentInfoSelectors.paymentInfo);

  const amount = Number(selectedPlan?.price);

  const toggleContinuePaymentState = useCallback(() => {
    setIsContinuePayment((prev) => !prev);
  }, []);

  return (
    <div className='pt-[5.5rem] px-[1.5rem]'>
      {!isContinuePayment && (
        <PaymentSelectForm
          toggleContinuePaymentState={toggleContinuePaymentState}
        />
      )}

      {isContinuePayment && (
        <Elements
          stripe={STRIPE_PROMISE}
          options={{
            appearance: { theme: 'night' },
            mode: 'payment',
            amount: convertToSubCurrency(amount),
            currency: 'usd',
          }}
        >
          <PaymentForm amount={amount} />
        </Elements>
      )}
    </div>
  );
};
