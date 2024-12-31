import { pricing } from '../../constants';
import { PricingCard } from '../pricing-card';

type TPricingListProps = {
  showAllFeatures: boolean;
};

export const PricingList = ({ showAllFeatures }: TPricingListProps) => {
  return (
    <div className='flex gap-[1rem] max-lg:flex-wrap'>
      {pricing.map((item) => {
        return (
          <PricingCard
            key={item.id}
            item={item}
            showAllFeatures={showAllFeatures}
          />
        );
      })}
    </div>
  );
};
