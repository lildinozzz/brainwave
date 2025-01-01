import { PricingCard } from '@components';
import { PricingForm } from './ui/PricingForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { convertToSubCurrency } from '@utils';
import { useAppSelector } from 'src/store/hooks';
import { paymentSelectors } from 'src/store/reducers/payment/selectors';

const STRIPE_PROMISE = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

export const PaymentPage = () => {
  const { plan } = useAppSelector(paymentSelectors.paymentInfo);
  const amount = Number(plan?.price);

  return (
    //w-full h-screen pt-[5.5rem] flex justify-around items-center
    <div className='pt-[5.5rem] px-[1.5rem] lg:flex lg:justify-around'>
      <PricingCard
        className='max-w-[30rem]'
        showAllFeatures
        item={plan}
        hideBtn
      />
      <Elements
        stripe={STRIPE_PROMISE}
        options={{
          appearance: { theme: 'night' },
          mode: 'payment',
          amount: convertToSubCurrency(amount),
          currency: 'usd',
        }}
      >
        <PricingForm amount={amount} />
      </Elements>
    </div>
  );
};
