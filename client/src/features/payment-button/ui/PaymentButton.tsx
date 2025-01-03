import { Preloader } from '@components';
import { Stripe } from '@stripe/stripe-js';

type TPaymentButtonProps = {
  isLoading: boolean;
  amount: number;
  isFormError: boolean;
  stripe: Stripe;
};

export const PaymentButton = ({
  isLoading,
  amount,
  isFormError,
  stripe,
}: TPaymentButtonProps) => {
  return (
    <button
      type='submit'
      className='text-black w-full h-[3rem] mt-3.5 cursor-pointer p-5 bg-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-pulse flex justify-center items-center'
      disabled={!stripe || isLoading || !isFormError}
    >
      {!isLoading ? `Pay $${amount}` : <Preloader className='w-8 h-8' />}
    </button>
  );
};
