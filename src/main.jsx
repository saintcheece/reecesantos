import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const { PUBLIC_URL } = import.meta.env;
createRoot(document.getElementById('root')).render( 
  <BrowserRouter basename={PUBLIC_URL}>
    <App />
  </BrowserRouter>,
)
