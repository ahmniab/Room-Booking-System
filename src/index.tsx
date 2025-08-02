import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BookingProvider } from './context/BookingContext';
import { RoomProvider } from './context/RoomContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RoomProvider>
      <BookingProvider>
        <App />
      </BookingProvider>
    </RoomProvider>
  </React.StrictMode>
);
