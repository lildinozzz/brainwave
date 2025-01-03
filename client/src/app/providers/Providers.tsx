import { Provider } from 'react-redux';
import { store } from 'src/app/store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalProvider } from 'src/shared/modal';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root, NotFoundPage, HomePage, PaymentPage } from '@pages';
import { pathsConfig } from '@config';

type TProvidersProps = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: TProvidersProps) => {
  const router = createBrowserRouter([
    {
      path: pathsConfig.home.link,
      element: <Root />,
      errorElement: <NotFoundPage />,
      children: [
        { path: pathsConfig.home.link, element: <HomePage /> },
        { path: pathsConfig.payment.link, element: <PaymentPage /> },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <ModalProvider>
        <RouterProvider router={router} />
        {children}
        <ToastContainer autoClose={1500} pauseOnHover={false} />
      </ModalProvider>
    </Provider>
  );
};
