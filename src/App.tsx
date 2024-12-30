import { pathsConfig } from '@config/paths/pathsConfig';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFoundPage, Chat } from './components';
import { HomePage } from './pages';

export const App = () => {
  const router = createBrowserRouter([
    {
      path: pathsConfig.home.link,
      errorElement: <NotFoundPage />,
      children: [
        { path: pathsConfig.home.link, element: <HomePage /> },
        { path: pathsConfig.chat.link, element: <Chat /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
