import { translate } from '../../translate/translate';
import Config from '../../config';
import { triggerToaster } from '../actionCreators';
import Store from '../../store';

export function shepherdToolsSeedKeys(seed) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/keys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seed,
        active: true,
        iguana: true,
        token: Config.token,
      }),
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdToolsSeedKeys',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(!json.result ? 'error' : json);
    });
  });
}

export function shepherdToolsBalance(coin, address) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/getbalance?coin=${coin}&address=${address}&token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdToolsBalance',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(!json.result ? 'error' : json);
    });
  });
}

export function shepherdToolsTransactions(coin, address) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/listtransactions?coin=${coin}&address=${address}&full=true&maxlength=20&token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdToolsTransactions',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(!json.result ? 'error' : json);
    });
  });
}

export function shepherdToolsBuildUnsigned(coin, value, sendToAddress, changeAddress) {
  value = Math.floor(value);

  return new Promise((resolve, reject) => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/createrawtx?coin=${coin}&address=${sendToAddress}&value=${value}&change=${changeAddress}&verify=false&push=false&offline=true&token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdToolsBuildUnsigned',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(json);
    });
  });
}

export function shepherdToolsListunspent(coin, address) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/listunspent?coin=${coin}&address=${address}&full=true&token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdToolsListunspent',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(!json.result ? 'error' : json);
    });
  });
}

export function shepherdToolsPushTx(network, rawtx) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/pushtx`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        network,
        rawtx,
        token: Config.token,
      }),
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdToolsPushTx',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(!json.result ? 'error' : json);
    });
  });
}

export function shepherdToolsWifToKP(coin, wif) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/wiftopub?coin=${coin}&wif=${wif}&token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdToolsWifToKP',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(!json.result ? 'error' : json);
    });
  });
}

export function shepherdToolsSeedToWif(seed, network, iguana) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/seedtowif`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seed,
        network,
        iguana,
        token: Config.token,
      }),
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdToolsSeedToWif',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(!json.result ? 'error' : json);
    });
  });
}