import { memo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { brainwaveSymbol, check } from 'src/assets';
import { pricing } from 'src/constants';
import { useAuthModal } from 'src/features/auth/AuthModal';
import { setSelectedPlan } from 'src/app/store/reducers/payment/dispatchers';
import { paymentInfoSelectors } from 'src/app/store/reducers/payment/selectors';
import { userInfoSelectors } from 'src/app/store/reducers/user-info/selectors';
import { useAppSelector } from '@hooks';

type TPaymentSelectForm = {
  toggleContinuePaymentState: () => void;
};

export const PaymentSelectForm = memo(
  ({ toggleContinuePaymentState }: TPaymentSelectForm) => {
    const { isAuthed } = useAppSelector(userInfoSelectors.userInfo);
    const { selectedPlan } = useAppSelector(paymentInfoSelectors.paymentInfo);
    const [AuthModal] = useAuthModal();

    const handleSelectionChange = (planId: string) => {
      const foundPlan = pricing.find((plan) => plan.id === planId);

      if (foundPlan) {
        setSelectedPlan(foundPlan);
      }
    };

    useEffect(() => {
      if (!selectedPlan && pricing.length > 0) {
        setSelectedPlan(pricing[1]);
      }
    }, [selectedPlan]);

    const handleGoToPayment = () => {
      if (!isAuthed) {
        toast.warn('You must be logged in to complete the payment.');
        AuthModal({});
        return;
      }

      toggleContinuePaymentState();
    };

    return (
      <div className='container pt-3'>
        <div className='flex flex-col'>
          <div className='w-auto h-auto flex justify-center items-center gap-3 mr-14'>
            <img src={brainwaveSymbol} width={60} height={60} alt='Brainwave' />
            <h3 className='h3'>Brainwave</h3>
          </div>
          <p className='w-auto h-auto text-center body-2 mt-6 mb-3 text-n-3'>
            The best AI chat in the world. Here, you can get inspiration and
            answers to all your questions.
          </p>

          {pricing.slice(1).map((item) => {
            const { id, price, title } = item;
            return (
              <div
                key={id}
                onClick={() => handleSelectionChange(id)}
                className={`flex items-center gap-4 w-full lg:w-[50rem] lg:mx-auto h-20 mt-4 border rounded-xl px-6 py-2 ${
                  selectedPlan?.id === id ? 'border-[#AC6AFF]' : 'border-n-6'
                }`}
              >
                <input
                  type='radio'
                  name='paymentOption'
                  id={id}
                  checked={selectedPlan?.id === id}
                  className='w-5 h-5'
                />
                <div className='flex flex-col'>
                  <h6 className='h6'>{title}</h6>
                  <p className='body-2 text-n-3'>for 1 month</p>
                </div>

                <div className='ml-auto'>${price}</div>
              </div>
            );
          })}

          <div className='my-6 w-full lg:w-[50rem] lg:mx-auto'>
            <p className='body-2 text-n-3'>You get:</p>

            <ul>
              {selectedPlan?.features.map((feature, index) => (
                <li
                  key={index}
                  className='ml-1 flex items-start py-2 md:py-4 h-[60px]'
                >
                  <img src={check} alt='check' width={24} height={24} />

                  <p className='body-2 ml-4'>{feature}</p>
                </li>
              ))}
            </ul>

            <button
              onClick={handleGoToPayment}
              className='text-black w-full h-[3rem] mt-4 cursor-pointer p-5 bg-white rounded-xl font-bold isabled:opacity-50 disabled:cursor-not-allowed disabled:animate-pulse flex justify-center items-center'
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
);
