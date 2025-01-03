import { scrollToNavElement } from '@utils';
import { roadmap } from './api/Roadmap.api';
import { grid, check2, loading1, gradient } from './assets';
import { Section, Heading, Tagline, Button } from '@shared';

export const Roadmap = () => (
  <Section className='overflow-hidden' id='roadmap'>
    <div className='container md:pb-10'>
      <Heading tag='Ready to get started' title='What we’re working on' />

      <div className='relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem]'>
        {roadmap.map((item) => {
          const status = item.status === 'done' ? 'Done' : 'In progress';

          return (
            <div
              className={`md:flex even:md:translate-y-[7rem] p-0.25 rounded-[2.5rem] ${
                item.colorful ? 'bg-conic-gradient' : 'bg-n-6'
              }`}
              key={item.id}
            >
              <div className='relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15'>
                <div className='absolute top-0 left-0 max-w-full'>
                  <img
                    className='w-full'
                    src={grid}
                    width={550}
                    height={550}
                    alt='Grid'
                  />
                </div>
                <div className='relative z-1'>
                  <div className='flex items-center justify-between max-w-[27rem] mb-8 md:mb-20'>
                    <Tagline>{item.date}</Tagline>

                    <div className='flex items-center px-4 py-1 bg-n-1 rounded text-n-8'>
                      <img
                        className={`mr-2.5 ${
                          item.status === 'done' ? '' : 'animate-spin'
                        }`}
                        src={item.status === 'done' ? check2 : loading1}
                        width={16}
                        height={16}
                        alt={status}
                      />
                      <div className='tagline'>{status}</div>
                    </div>
                  </div>

                  <div className='mb-10 -my-10 -mx-15'>
                    <img
                      className='w-full'
                      src={item.imageUrl}
                      width={628}
                      height={426}
                      alt={item.title}
                    />
                  </div>
                  <h4 className='h4 mb-4'>{item.title}</h4>
                  <p className='body-2 text-n-4'>{item.text}</p>
                </div>
              </div>
            </div>
          );
        })}

        <div className='absolute top-[18.25rem] -left-[30.375rem] w-[56.625rem] opacity-60 mix-blend-color-dodge pointer-events-none'>
          <div className='absolute top-1/2 left-1/2 w-[58.85rem] h-[58.85rem] -translate-x-3/4 -translate-y-1/2'>
            <img
              className='w-full'
              src={gradient}
              width={942}
              height={942}
              alt='Gradient'
            />
          </div>
        </div>
      </div>

      <div className='flex justify-center mt-12 md:mt-15 xl:mt-20'>
        <Button onClick={() => scrollToNavElement('#roadmap')}>
          Our roadmap
        </Button>
      </div>
    </div>
  </Section>
);
