import React, { useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import CheckoutContext from './CheckoutContext';
import checkoutReducer from './checkoutReducer';
import initialState from './initialState';
import actionsFactory from './actionsFactory';

export default function CheckoutContextProvider({ children }) {
  const [data, dispatch] = useReducer(checkoutReducer, initialState);

  const actions = useMemo(() => actionsFactory(dispatch), [dispatch]);

  const context = useMemo(() => ({ actions, data }), [data, actions]);

  return (
    <CheckoutContext.Provider value={context}>
      {children}
    </CheckoutContext.Provider>
  );
}

CheckoutContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
