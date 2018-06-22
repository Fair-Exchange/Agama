import Config from '../../config';
import {
  getDecryptedPassphrase,
  getPinList,
  triggerToaster
} from '../actionCreators';
import { iguanaWalletPassphrase } from './walletAuth';

export function encryptPassphrase(passphrase, key, pubKey) {
  const payload = {
    string: passphrase,
    key: key,
    pubkey: pubKey,
    token: Config.token,
  };

  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/encryptkey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'encryptKey',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(
        triggerToaster(
          'Passphrase successfully encrypted',
          'Success',
          'success'
        )
      );
    });
  }
}

export function loginWithPin(key, pubKey) {
  const payload = {
    key: key,
    pubkey: pubKey,
    token: Config.token,
  };

  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/decryptkey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'decryptKey',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(iguanaWalletPassphrase(json.result));
    });
  }
}

export function loadPinList() {
  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/getpinlist?token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'getPinList',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(
        triggerToaster(
          'getPinList',
          'Success',
          'success'
        )
      );
      dispatch(
        getPinList(json.result)
      );
    });
  }
}