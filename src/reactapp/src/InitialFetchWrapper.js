import { useEffect } from 'react';
import useCheckoutContext from './hook/useCheckoutContext';

export default function InitialFetchWrapper({ children }) {
  const {
    actions: { initialCartFetch },
  } = useCheckoutContext();

  useEffect(() => {
    initialCartFetch();
  }, []);

  return children;
}
