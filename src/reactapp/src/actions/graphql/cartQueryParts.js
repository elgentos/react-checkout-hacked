import cartBillingAddrInfo from './cartBillingAddrInfo';
import cartItemsInfo from './cartItemsInfo';
import cartPaymentMethodsInfo from './cartPaymentMethodsInfo';
import cartPriceInfo from './cartPriceInfo';
import cartShippingAddrInfo from './cartShippingAddrInfo';

export const CUSTOMER_ADDRESS_LIST_QUERY_PART = `
  customer {
    email
    firstname
    lastname
    default_billing
    default_shipping
    addresses {
      id
      city
      company
      country_code
      default_billing
      default_shipping
      firstname
      lastname
      middlename
      postcode
      region {
        region
        region_code
        region_id
      }
      region_id
      street
      telephone
    }
  }
`;

export const COUNTRY_STATE_LIST_QUERY_PART = `
  country(id: $countryId){
    id
    available_regions {
      code
      id
      name
    }
  }
`;

export const CART_DATA_FRAGMENT = `
  id
  email
  is_virtual
  applied_coupons {
    code
  }
  ${cartItemsInfo}
  ${cartBillingAddrInfo}
  ${cartShippingAddrInfo}
  ${cartPriceInfo}
  ${cartPaymentMethodsInfo}
`;

const cartQueryInfo = `
  email
  id
  is_virtual
  billing_address {
    city
    country {
      code
      label
    }
    company
    firstname
    lastname
    postcode
    region {
      code
      label
    }
    street
    telephone
  }
  total_quantity
  items {
    id
    quantity
    prices {
      price {
        value
      },
      row_total {
        value
      }
    }
    product {
      id
      name
      sku
      small_image {
        label
        url
      }
      url_key
    }
    ... on VirtualCartItem {
      customizable_options {
        label
        values {
          id
          label
          value
        }
        id
      }
    }
  }
  available_payment_methods {
    code
    title
  }
  selected_payment_method {
    code
    title
  }
  applied_coupons {
    code
  }
  prices {
    grand_total {
      value
      currency
    }
    subtotal_excluding_tax {
      value
      currency
    }
  }
`;

export default cartQueryInfo;
