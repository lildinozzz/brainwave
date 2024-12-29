import { ButtonGradient } from './assets/svg';
import {
  Hero,
  Header,
  Benefits,
  Collaboration,
  Services,
  Pricing,
  Footer,
  Roadmap,
} from './components';

export const App = () => {
  return (
    <>
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
        <Header />
        <Hero />
        <Benefits />
        <Collaboration />
        <Services />
        <Pricing />
        <Roadmap />
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};
