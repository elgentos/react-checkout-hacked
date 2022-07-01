import config from '../config';
import LocalStorage from '../utils/localStorage';
import useCheckoutContext from '../hook/useCheckoutContext';

export default async function submitCheckoutForm(values) {
  const {
    actions: { placeOrder },
  } = useCheckoutContext();

  try {
    // setPageLoader(true);
    const order = await placeOrder(values);

    const orderNumber = order?.order_number;

    if (orderNumber && config.isProductionMode) {
      LocalStorage.clearCheckoutStorage();
      window.location.replace(config.successPageRedirectUrl);
    }

    if (orderNumber && config.isDevelopmentMode) {
      LocalStorage.clearCheckoutStorage();
    }
    // setPageLoader(false);
  } catch (error) {
    // setPageLoader(false);
  }
}
