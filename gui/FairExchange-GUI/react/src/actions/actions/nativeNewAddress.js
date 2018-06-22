import { translate } from '../../translate/translate';
import {
  triggerToaster,
  getDashboardUpdate,
} from '../actionCreators';
import Config from '../../config';

export function getNewSAFEAddresses(coin, pubpriv, mode) {
  return dispatch => {
    const payload = {
      mode: null,
      chain: coin,
      cmd: pubpriv === 'public' ? 'getnewaddress' : 'z_getnewaddress',
      rpc2cli: Config.rpc2cli,
      token: Config.token,
    };

    const _fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload: payload }),
    };

    return fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/cli`,
      _fetchConfig
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'getNewSAFEAddresses',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      json = json.result;
      dispatch(
        triggerToaster(
          json.result ? json.result : json,
          translate('SAFE_NATIVE.NEW_ADDR_GENERATED'),
          'info',
          false
        )
      );
      dispatch(getDashboardUpdate(coin, mode));
    })
    .catch((ex) => {
      dispatch(
        triggerToaster(
          json.result ? json.result : json,
          translate('SAFE_NATIVE.NEW_ADDR_GENERATED'),
          'info',
          false
        )
      );
      dispatch(getDashboardUpdate(coin));
    });
  }
}