import { triggerToaster } from '../actionCreators';
import Config from '../../config';
import Store from '../../store';

export function checkForUpdateUIPromise() {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/update/patch/check?token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'checkForUpdateUIPromise',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}

export function updateUIPromise() {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/update/patch?token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'updateUIPromise',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}

export function downloadZCashParamsPromise(dloption) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/zcparamsdl?dloption=${dloption}&token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'downloadZCashParamsPromise',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}
