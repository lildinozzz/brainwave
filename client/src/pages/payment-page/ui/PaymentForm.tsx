import { pathsConfig } from '@config';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { StripePaymentElementChangeEvent } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { paymentService } from 'src/services/api/paymentService';
import { PagePreLoader } from 'src/shared/components/PagePreLoader';
import { Preloader } from 'src/shared/components/PreLoader';

type TPricingFormProps = {
  amount: number;
};

export const PaymentForm = ({ amount }: TPricingFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormError, setIsFormError] = useState<boolean>(false);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  const handleChange = (e: StripePaymentElementChangeEvent) => {
    if (e.complete) {
      setIsFormError(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await paymentService.createPayment(amount);
        setClientSecret(response.clientSecret);
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Ошибка при загрузке clientSecret', error);
        setIsDataLoaded(true);
      }
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
          return_url: `http://localhost:5173${pathsConfig.home.link}?amount=${amount}`,
        },
      });
    } catch (error) {
      toast.error(`Payment failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isDataLoaded || !clientSecret || !stripe || !elements) {
    return <PagePreLoader />;
  }

  return (
    <form
      className='max-w-[35rem] h-full mt-3 m-auto pb-6 py-2 px-6 border border-n-6 rounded-[2rem]'
      onSubmit={handleSubmit}
    >
      {clientSecret && <PaymentElement onChange={handleChange} />}

      <button
        className='text-black w-full h-[3rem] mt-3.5 cursor-pointer p-5 bg-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-pulse flex justify-center items-center'
        disabled={!stripe || isLoading || !isFormError}
      >
        {!isLoading ? `Pay $${amount}` : <Preloader className='w-8 h-8' />}
      </button>
    </form>
  );
};
