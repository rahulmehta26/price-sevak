import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from "@tanstack/react-query";
import ToastContainer from './components/ui/toast/ToastContainer';
import { createQueryClient } from './utils/queryClient.ts';
import ErrorBoundary from './page/error/ErrorBoundary.tsx';

const queryClient = createQueryClient();

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient} >
        <BrowserRouter>
          <ToastContainer />
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)
