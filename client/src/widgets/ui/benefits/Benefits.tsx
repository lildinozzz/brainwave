import { setIsChatOpened } from 'src/app/store/reducers/common-ui/dispatchers';
import { benefits } from './api/Benefits.api';
import { ClipPath } from './assets';

import { Section, Heading } from '@components';
import { ArrowIcon } from '@icons';

export const Benefits = () => {
  return (
    <Section id='features'>
      <div className='container relative z-2'>
        <Heading
          className='md:max-w-md lg:max-w-2xl'
          title='Chat Smarter, Not Harder with Brainwave'
        />

        <div className='flex flex-wrap gap-10 mb-10'>
          {benefits.map((item) => (
            <div
              className='cursor-pointer block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]'
              onClick={() => setIsChatOpened(true)}
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className='relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none'>
                <h5 className='h5 mb-5'>{item.title}</h5>
                <p className='body-2 mb-6 text-n-3'>{item.text}</p>
                <div className='flex items-center mt-auto'>
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  />
                  <p className='ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider'>
                    Explore more
                  </p>
                  <ArrowIcon />
                </div>
              </div>

              {item.light && (
                <div className='absolute top-0 left-1/4 w-full aspect-square bg-radial-gradient from-[#28206C] to-[#28206C]/0 to-70% pointer-events-none' />
              )}

              <div
                className='absolute inset-0.5 bg-n-8'
                style={{ clipPath: 'url(#benefits)' }}
              >
                <div className='absolute inset-0 opacity-0 transition-opacity hover:opacity-10'>
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      className='w-full h-full object-cover'
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
