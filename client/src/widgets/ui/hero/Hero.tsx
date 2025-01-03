import { ScrollParallax } from 'react-just-parallax';
import { useRef } from 'react';
import { scrollToNavElement } from '@utils';
import { PlusSvg } from 'src/assets/svg';
import { Button, Generating, Section } from '@components';
import { CompanyLogos, Notification, BackgroundCircles } from './ui';
import { curve, heroBackground, heroIcons, robot } from './assets';
export const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section className='pt-[12rem] -mt-[5.25rem]' id='hero'>
      <div className='container relative' ref={parallaxRef}>
        <div className='relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb:[6rem]'>
          <h1 className='h1 mb-6 lg:mt-[5rem]'>
            Explore the Possibilities of&nbsp;AI&nbsp;Chatting with{' '}
            <span className='inline-block relative'>
              Brainwave
              <img
                className='absolute top-full left-0 w-full xl:-mt-2'
                width={624}
                height={28}
                src={curve}
                alt='Curve'
              />
            </span>
          </h1>
          <p className='body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8'>
            Unleash the power of AI with Brainwave. Upgrade your productivity
            with Brainwave, the open AI chat app
          </p>
          <Button onClick={() => scrollToNavElement('#pricing')} theme>
            Get Started
          </Button>
        </div>
        <div className='relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24'>
          <div className='relative z-1 p-0.5 rounded-2xl bg-conic-gradient'>
            <div className='relative bg-n-8 rounded-[1rem]'>
              <div className='h[1.4rem] bg-n-10 rounded-t-[0.9rem] ' />

              <div className='aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]'>
                <img
                  className='w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:translate-y-[10%] lg:-translate-y-[23%]'
                  width={1024}
                  height={490}
                  src={robot}
                  alt='AI'
                />

                <Generating className='absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2' />

                <ScrollParallax isAbsolutelyPositioned>
                  <ul className='hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex'>
                    {heroIcons.map((icon, index) => (
                      <li className='p-5' key={index}>
                        <img src={icon} width={24} height={25} alt={icon} />
                      </li>
                    ))}
                  </ul>
                </ScrollParallax>

                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className='hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex '
                    title='Code generation'
                  />
                </ScrollParallax>
              </div>
            </div>
            <>
              <div className='relative z-1 h-6 mx-2.5 bg-n-11 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-8' />
              <div className='relative z-1 h-6 mx-6 bg-n-11/70 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-20' />
            </>
          </div>
          <div className='absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]'>
            <img
              className='w-full'
              width={1440}
              height={1800}
              src={heroBackground}
              alt='robot'
            />
          </div>

          <BackgroundCircles />
        </div>

        <CompanyLogos className='hidden relative z-10 mt-20 lg:block' />
      </div>

      <>
        <div className='hidden absolute top-[55.25rem] left-10 right-10 h-0.25 bg-n-6 pointer-events-none xl:block' />

        <PlusSvg className='hidden absolute top-[54.9375rem] left-[2.1875rem] z-2 pointer-events-none xl:block' />

        <PlusSvg className='hidden absolute top-[54.9375rem] right-[2.1875rem] z-2 pointer-events-none xl:block' />
      </>
    </Section>
  );
};
