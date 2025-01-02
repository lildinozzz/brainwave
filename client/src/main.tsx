import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';
import { store } from '@store';
import { Provider } from 'react-redux';
import { ModalProvider } from './shared/modal';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ModalProvider>
      <App />
    </ModalProvider>
  </Provider>
);
