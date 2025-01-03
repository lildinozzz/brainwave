import { Outlet } from 'react-router-dom';
import { Header } from 'src/widgets/ui/header';

export const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
