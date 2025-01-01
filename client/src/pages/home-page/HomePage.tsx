import {
  Hero,
  Benefits,
  Collaboration,
  Services,
  Pricing,
  Roadmap,
  Footer,
  Chat,
} from '@components';

export const HomePage = () => {
  return (
    <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
      <Hero />
      <Benefits />
      <Collaboration />
      <Services />
      <Pricing />
      <Roadmap />
      <Chat />
      <Footer />
    </div>
  );
};
