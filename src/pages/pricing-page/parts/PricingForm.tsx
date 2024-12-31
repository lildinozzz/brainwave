import { Button } from '@components';
import {
  CardElement,
  useStripe,
  useElements,
  AddressElement,
} from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';

export const PricingForm = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      const TEST_CLIENT_SECRET =
        'pi_1Fj2TrJs95MOpFj2JghTEpdp_secret_Ashijlf2lkjrjdnkl';

      setClientSecret(TEST_CLIENT_SECRET);
    };

    fetchPaymentIntent();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret as string,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error(error.message);
    } else if (paymentIntent?.status === 'succeeded') {
      alert('Payment Successful!');
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className='relative h-[30rem] w-[30rem] bg-n-8 border border-n-6 rounded-[2rem] my-2'
    >
      <div className='flex h-full flex-col px-[20px] py-[20px]'>
        <h2 className='text-[1.31rem] font-semibold'>Card Details</h2>

        <CardElement
          id='card-element'
          className='w-full p-2 border rounded-lg mb-4 mt-2 text-white'
          options={{
            style: {
              base: {
                color: 'white',
              },
            },
          }}
        />

        <AddressElement id='address-element' options={{ mode: 'billing' }} />

        <Button
          type='submit'
          disabled={!stripe || !clientSecret}
          className='w-full mt-auto py-2 bg-blue-500 text-white rounded-lg'
        >
          Proceed to payment
        </Button>
      </div>
    </form>
  );
};
