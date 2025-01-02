import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';
import { store } from '@store';
import { Provider } from 'react-redux';
import { ModalProvider } from './shared/modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ModalProvider>
      <App />
      <ToastContainer autoClose={1500} pauseOnHover={false} />
    </ModalProvider>
  </Provider>
);
