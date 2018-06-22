import { translate } from '../../translate/translate';
import Config from '../../config';
import { triggerToaster } from '../actionCreators';
import Store from '../../store';

export function shepherdElectionsBalance(coin, address) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/electrum/getbalance?coin=${coin}&address=${address}&token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdElectionsBalance',
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

export function shepherdElectionsTransactions(coin, address, type) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/elections/listtransactions?coin=${coin}&address=${address}&full=true&type=${type}&maxlength=20&token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdElectionsTransactions',
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

export function shepherdElectionsStatus() {
  return new Promise((resolve, reject) => {
    return fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/elections/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: Config.token,
      }),
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectionsStatus',
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

export function shepherdElectionsLogin(seed, network) {
  return new Promise((resolve, reject) => {
    return fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/elections/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seed,
        network,
        iguana: true,
        token: Config.token,
      }),
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectionsLogin',
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

export function shepherdElectionsLogout() {
  return new Promise((resolve, reject) => {
    return fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/elections/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: Config.token,
      }),
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectionsLogout',
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

export function shepherdElectionsSend(coin, value, sendToAddress, changeAddress, opreturn) {
  value = Math.floor(value);

  return new Promise((resolve, reject) => {
    return fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/electrum/createrawtx?coin=${coin}&address=${sendToAddress}&value=${value}&change=${changeAddress}&vote=true&push=true&verify=false&opreturn=${opreturn}&token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectionsSend',
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

export function shepherdElectionsSendMany(coin, targets, change, opreturn) {
  return new Promise((resolve, reject) => {
    return fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/electrum/createrawtx-multiout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: Config.token,
        coin,
        targets,
        change,
        opreturn,
        push: true,
        verify: false,
        vote: true,
      }),
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectionsSendMany',
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