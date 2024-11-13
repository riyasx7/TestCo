import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Ensure correct import
import App from './App.jsx'; // Ensure this file exists and is correctly exported
import './index.css'; // Ensure this file exists and is correctly imported
import { Provider } from 'react-redux';
import { store } from './store/store.js'; // Ensure this file exists and is exporting the store correctly

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
