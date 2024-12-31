import { PricingCard } from '@components';
import { useAppSelector } from 'src/store/hooks';
import { pricingSelectors } from 'src/store/reducers/pricing/selectors';
import { PricingForm } from './parts/PricingForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pathsConfig } from '@config';

const STRIPE_PROMISE = loadStripe(
  'pk_test_51QbfaBBS7hRR0Jm6H61VKREVbDpWx4Kys0RzIQ8BM3yjNFmTLj1LleeMBH9sAITxAAR0hJM82BjKEe6DVefyNPQH00O7iPtZr9'
);

export const PricingPage = () => {
  const navigate = useNavigate();
  const { plan } = useAppSelector(pricingSelectors.pricing);

  useEffect(() => {
    if (plan === null) {
      navigate(pathsConfig.home.link);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);

  return (
    <div className='w-full h pt-[5.5rem] flex justify-around'>
      <PricingCard className='w-[30rem]' item={plan} showAllFeatures hideBtn />
      <Elements stripe={STRIPE_PROMISE}>
        <PricingForm />
      </Elements>
    </div>
  );
};
