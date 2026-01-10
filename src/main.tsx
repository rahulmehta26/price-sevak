import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToastContainer from './components/ui/toast/ToastContainer.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(


  <StrictMode>
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
