import { useState } from 'react';
import { PricingList } from 'src/widgets/ui/pricing/ui/pricing-list';
import { stars, lines, smallSphere } from './assets';
import { Section, Heading, Button } from '@shared';

export const Pricing = () => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const toggleShowAllFeatures = () => setShowAllFeatures((prev) => !prev);

  return (
    <Section className='overflow-hidden' id='pricing'>
      <div className='container relative z-2'>
        <div className='hidden relative justify-center mb-[6.5rem] lg:flex'>
          <img
            src={smallSphere}
            className='relative z-1'
            width={255}
            height={255}
            alt='sphere'
          />
          <div className='absolute topx-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none'>
            <img
              src={stars}
              className='w-full'
              width={950}
              height={400}
              alt='start'
            />
          </div>
        </div>

        <Heading
          tag='Get started with Brainwave'
          title='Pay once, use forever'
        />

        <div className='relative'>
          <PricingList showAllFeatures={showAllFeatures} />
          <div className='hidden lg:block absolute top-1/2 right-full w-[92.5rem] h-[11.0625rem] -translate-y-1/2 pointer-events-none'>
            <img
              className='w-full'
              src={lines}
              width={1480}
              height={177}
              alt='Lines'
            />
          </div>
          <div className='hidden lg:block absolute top-1/2 left-full w-[92.5rem] h-[11.0625rem] -translate-y-1/2 -scale-x-100 pointer-events-none'>
            <img
              className='w-full'
              src={lines}
              width={1480}
              height={177}
              alt='Lines'
            />
          </div>
        </div>

        {!showAllFeatures && (
          <div className='flex justify-center mt-10'>
            <Button
              onClick={toggleShowAllFeatures}
              className='text-xs font-code font-bold tracking-wider uppercase'
            >
              See the full details
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
};
