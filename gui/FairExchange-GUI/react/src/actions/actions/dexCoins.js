import {
  triggerToaster,
  dashboardCoinsState
} from '../actionCreators';
import Config from '../../config';

// TODO: find out why it errors on slow systems
export function getDexCoins() {
  return dispatch => {
    return fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/InstantDEX/allcoins?token=${Config.token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'Error getDexCoins',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(dashboardCoinsState(json));
    });
  }
}