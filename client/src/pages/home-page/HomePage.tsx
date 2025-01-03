import {
  Hero,
  Benefits,
  Collaboration,
  Services,
  Pricing,
  Roadmap,
  Footer,
  Chat,
} from '@widgets';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectStatus = searchParams.get('redirect_status') === 'succeeded';

    if (redirectStatus) {
      toast.success(
        'Your payment was successful! We appreciate your trust in us.',
        { autoClose: 3000 }
      );
      navigate(window.location.pathname, { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
