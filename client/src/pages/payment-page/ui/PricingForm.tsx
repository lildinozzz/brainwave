import { pathsConfig } from '@config';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { stripeService } from 'src/services/api/stripeService';
import { PagePreLoader } from 'src/shared/components/PagePreLoader';
import { Preloader } from 'src/shared/components/PreLoader';

type TPricingFormProps = {
  amount: number;
};

export const PricingForm = ({ amount }: TPricingFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await stripeService.createPayment(amount);

      setClientSecret(response.clientSecret);
    };

    fetchData();
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (!stripe || !elements) return;

      const { error } = await elements.submit();

      if (error) {
        setIsLoading(false);
        return;
      }

      await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `http://localhost:5173${pathsConfig.success.link}?amount=${amount}`,
        },
      });
    } catch (error) {
      console.error('error while creating a payment', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <PagePreLoader className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%}' />
    );
  }

  return (
    <form
      className='w-full h-full max-w-[30rem] p-6 px-6 bg-n-8 border border-n-6 rounded-[2rem] mt-2 :lg-w-auto relative'
      onSubmit={handleSubmit}
    >
      {clientSecret && <PaymentElement />}

      <button
        className='text-black w-full mt-4 cursor-pointer p-5 bg-white rounded-xl font-bold isabled:opacity-50 disabled:cursor-not-allowed disabled:animate-pulse flex justify-center items-center'
        disabled={!stripe || isLoading}
      >
        {!isLoading ? `Pay $${amount}` : <Preloader className='w-8 h-8' />}
      </button>
    </form>
  );
};
