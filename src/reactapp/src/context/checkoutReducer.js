import { NEW_CART } from '../actions/actionTypes';

function newCartReducer(state, { cart }) {
  return { ...state, cart };
}

const actions = {
  [NEW_CART]: newCartReducer,
};

export default function checkoutReducer(state, { type, payload }) {
  const action = actions[type];

  if (action) {
    return action(state, payload);
  }

  return state;
}
