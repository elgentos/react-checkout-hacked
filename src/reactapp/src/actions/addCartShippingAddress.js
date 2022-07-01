import { NEW_CART } from './actionTypes';
import { CART_DATA_FRAGMENT } from './graphql/cartQueryParts';
import sendRequest from '../utils/sendRequest';
import LocalStorage from '../utils/localStorage';

const query = `
mutation setShippingAddress(
  $cartId: String!
  $firstname: String!
  $lastname: String!
  $company: String
  $street: [String]!
  $city: String!
  $region: String
  $regionId: Int
  $zipcode: String!
  $country: String!
  $phone: String!
  $saveInBook: Boolean
) {
  setShippingAddressesOnCart(
    input: {
      cart_id: $cartId
      shipping_addresses: [{
      	address: {
          firstname: $firstname
          lastname: $lastname
          company: $company
          street: $street
          city: $city
          region: $region
          region_id: $regionId
          postcode: $zipcode
          country_code: $country
          telephone: $phone
          save_in_address_book: $saveInBook
        }
      }]
    }
  ) {
    cart {
      ${CART_DATA_FRAGMENT}
    }
  }
}
`;

export default async function addCartShippingAddress(
  dispatch,
  shippingAddress
) {
  const variables = { ...shippingAddress, cartId: LocalStorage.getCartId() };
  const result = await sendRequest(dispatch, { query, variables });

  dispatch({
    type: NEW_CART,
    payload: result?.data?.setShippingAddressesOnCart,
  });
}
