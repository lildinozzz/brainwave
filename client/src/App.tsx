import { HomePage, NotFoundPage, PaymentPage, Root } from '@pages';
import { pathsConfig } from '@config';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAppDispatch } from './store/hooks';
import { useEffect } from 'react';
import { refreshAuth } from './store/reducers/user-info/reducers';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshAuth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return <RouterProvider router={router} />;
};
