import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from './context/UserContext';
import { BrowserRouter } from 'react-router-dom';

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </UserContextProvider>
);

