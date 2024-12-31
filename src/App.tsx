import { HomePage, NotFoundPage, PricingPage, Root } from '@pages';
import { pathsConfig } from '@config';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from '@store';
import { Provider } from 'react-redux';

export const App = () => {
  const router = createBrowserRouter([
    {
      path: pathsConfig.home.link,
      element: <Root />,
      errorElement: <NotFoundPage />,
      children: [
        { path: pathsConfig.home.link, element: <HomePage /> },
        { path: pathsConfig.pricing.link, element: <PricingPage /> },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
