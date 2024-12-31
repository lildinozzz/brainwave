import { HomePage, NotFoundPage } from '@pages';
import { store } from '@store';
import { pathsConfig } from '@config';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const App = () => {
  const router = createBrowserRouter([
    {
      path: pathsConfig.home.link,
      errorElement: <NotFoundPage />,
      children: [{ path: pathsConfig.home.link, element: <HomePage /> }],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
