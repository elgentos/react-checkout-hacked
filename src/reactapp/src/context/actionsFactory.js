import addCartShippingAddress from '../actions/addCartShippingAddress';
import initialCartFetch from '../actions/initialCartFetch';

const dispatchMapper = {
  addCartShippingAddress,
  initialCartFetch,
};

export default function actionsFactory(dispatch) {
  const boundActions = {};

  Object.keys(dispatchMapper).forEach((actionKey) => {
    boundActions[actionKey] = dispatchMapper[actionKey].bind(null, dispatch);
  });

  return boundActions;
}
