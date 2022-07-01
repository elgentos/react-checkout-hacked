import { NEW_CART } from './actionTypes';
import sendRequest from '../utils/sendRequest';
import cartItemsInfo from './graphql/cartItemsInfo';
import cartPriceInfo from './graphql/cartPriceInfo';
import cartBillingAddrInfo from './graphql/cartBillingAddrInfo';
import cartShippingAddrInfo from './graphql/cartShippingAddrInfo';
import cartPaymentMethodsInfo from './graphql/cartPaymentMethodsInfo';
import {
  COUNTRY_STATE_LIST_QUERY_PART,
  CUSTOMER_ADDRESS_LIST_QUERY_PART,
} from './graphql/cartQueryParts';
import LocalStorage from '../utils/localStorage';

const query = (token, countryId) => `
query aggregatedQuery($cartId: String!, $countryId: String) {
  cart(cart_id: $cartId) {
    id
    email
    is_virtual
    applied_coupons {
      code
    }
    ${cartItemsInfo}
    ${cartPriceInfo}
    ${cartBillingAddrInfo}
    ${cartShippingAddrInfo}
    ${cartPaymentMethodsInfo}
  }
  countries {
    id
    full_name_locale
    full_name_english
    state_required
  }
  checkoutAgreements {
    agreement_id
    checkbox_text
    content
    content_height
    is_html
    mode
    name
  }
  ${token ? CUSTOMER_ADDRESS_LIST_QUERY_PART : ''}
  ${countryId ? COUNTRY_STATE_LIST_QUERY_PART : ''}
}
`;

export default async function initialCartFetch(dispatch) {
  const token = LocalStorage.getCustomerToken();
  const countryId = 'NL';
  const variables = { cartId: LocalStorage.getCartId(), countryId };
  const result = await sendRequest(dispatch, {
    query: query(token, countryId),
    variables,
  });

  dispatch({
    type: NEW_CART,
    payload: result?.data,
  });
}
