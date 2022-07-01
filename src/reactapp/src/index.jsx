import React from 'react';
import 'react-app-polyfill/ie11';
import { createRoot } from 'react-dom/client';
import './index.css'; // tailwind
import ShippingAddressForm from './ShippingAddressForm';
import CheckoutContextProvider from './context/CheckoutContextProvider';
import InitialFetchWrapper from './InitialFetchWrapper';

function Checkout() {
  return (
    <CheckoutContextProvider>
      <InitialFetchWrapper>
        <ShippingAddressForm />
      </InitialFetchWrapper>
    </CheckoutContextProvider>
  );
}

const root = createRoot(document.getElementById('react-checkout'));

root.render(<Checkout />);
