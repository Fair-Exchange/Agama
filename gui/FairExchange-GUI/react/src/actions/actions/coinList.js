import { triggerToaster } from '../actionCreators';
import Config from '../../config';
import Store from '../../store';
import { translate } from '../../translate/translate';

export function shepherdElectrumLock() {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/lock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: Config.token }),
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectrumLock',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}

export function shepherdElectrumLogout() {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: Config.token }),
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectrumLogout',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}

export function shepherdStopCoind(coin) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/coind/stop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: coin === 'KMD' ? JSON.stringify({ token: Config.token }) : JSON.stringify({ chain: coin, token: Config.token }),
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdStopCoind',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}

export function shepherdRemoveCoin(coin, mode) {
  return new Promise((resolve, reject, dispatch) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/coins/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coin === 'KMD' && mode === 'native' ? {
        mode,
        token: Config.token,
      } : {
        mode,
        chain: coin,
        token: Config.token,
      }),
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdRemoveCoin',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(json);
      if (mode === 'native') {
        Store.dispatch(
          triggerToaster(
            `${coin} ${translate('API.DAEMON_IS_STILL_RUNNING')}`,
            'Warning',
            'warning'
          )
        );
      }
    });
  });
}

export function shepherdGetCoinList() {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/coinslist?token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdGetCoinList',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}

export function shepherdPostCoinList(data) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/coinslist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: data,
        token: Config.token,
      }),
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdPostCoinList',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}

export function shepherdClearCoindFolder(coin, keepWalletDat) {
  return new Promise((resolve, reject) => {
    fetch(keepWalletDat ? `http://127.0.0.1:${Config.agamaPort}/shepherd/kick?coin=${coin}&keepwallet=true&token=${Config.token}` : `http://127.0.0.1:${Config.agamaPort}/shepherd/kick?coin=${coin}&token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdClearCoindFolder',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}