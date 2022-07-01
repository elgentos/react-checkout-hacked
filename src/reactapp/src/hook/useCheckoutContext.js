import { useContext } from 'react';
import CheckoutContext from '../context/CheckoutContext';

export default function useCheckoutContext() {
  return useContext(CheckoutContext);
}
