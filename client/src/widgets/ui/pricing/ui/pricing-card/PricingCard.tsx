import { useNavigate } from 'react-router-dom';
import { setSelectedPlan } from 'src/app/store/reducers/payment/dispatchers';
import { pathsConfig } from '@config';
import { setIsChatOpened } from 'src/app/store/reducers/common-ui/dispatchers';
import { Button } from '@components';
import { TPayment } from '../../api/Pricing.api';
import { CheckIcon } from '@icons';

type PricingCardProps = {
  item: TPayment | null;
  showAllFeatures: boolean;
  hideBtn?: boolean;
  className?: string;
};

export const PricingCard = ({
  item,
  showAllFeatures,
  className,
  hideBtn,
}: PricingCardProps) => {
  const navigate = useNavigate();

  const handleGoToPricing = (item: TPayment | null) => {
    if (Number(item?.price) > 0) {
      setSelectedPlan(item);
      navigate(pathsConfig.payment.link);
    } else {
      setIsChatOpened(true);
    }
  };

  const pricingFeatures = showAllFeatures
    ? item?.features
    : item?.features.slice(0, 3);

  return (
    <div
      key={item?.id}
      className={`${className} w-[90rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] :lg-w-auto even:py-14 odd:py-8 odd:my-2
           [&>h4]:first:text-color-2
           [&>h4]:even:text-color-1
           [&>h4]:last:text-color-3`}
    >
      <h4 className='h4 mb-4'>{item?.title}</h4>

      <p className='body-2 min-h-[4rem] mb-3 text-n-1/50'>
        {item?.description}
      </p>

      <div className='flex items-center h-[5.5rem] mb-6'>
        {item?.price && (
          <>
            <div className='h3'>$</div>
            <div className='text-[5.5rem] leading-none font-bold'>
              {item.price}
            </div>
          </>
        )}
      </div>

      {!hideBtn && (
        <Button
          className='w-full mb-6'
          onClick={() => handleGoToPricing(item)}
          theme={!!item?.price}
        >
          {item?.price ? 'Get Started' : 'Contact Us'}
        </Button>
      )}

      <ul>
        {pricingFeatures?.map((feature, index) => (
          <li className='flex items-start py-5 border-t border-n-6' key={index}>
            <CheckIcon width={24} height={24} />

            <p className='body-2 ml-4'>{feature}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
