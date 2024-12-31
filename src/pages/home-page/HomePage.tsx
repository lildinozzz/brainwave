import {
  Hero,
  Benefits,
  Collaboration,
  Services,
  Pricing,
  Roadmap,
  Header,
  Footer,
  Chat,
} from '@components';

export const HomePage = () => {
  return (
    <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
      <Header />
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
