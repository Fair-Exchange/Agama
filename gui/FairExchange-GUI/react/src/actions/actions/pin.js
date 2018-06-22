import Config from '../../config';
import {
  getDecryptedPassphrase,
  getPinList,
  triggerToaster,
  shepherdElectrumAuth,
} from '../actionCreators';
import translate from '../../translate/translate';
import urlParams from '../../util/url';
import fetchType from '../../util/fetchType';
import Store from '../../store';

export const encryptPassphrase = (string, key, suppressToastr, customPinName) => {
  const payload = {
    string,
    key,
    token: Config.token,
    pubkey: customPinName,
  };

  return new Promise((resolve, reject) => {
    fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/encryptkey`,
      fetchType(JSON.stringify(payload)).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'encryptKey',
          'Error',
          'error'
        )
      );
      resolve({ msg: 'error' });
    })
    .then(response => response.json())
    .then(json => {
      if (!suppressToastr) {
        Store.dispatch(
          triggerToaster(
            translate('INDEX.PASSPHRASE_SUCCESSFULLY_ENCRYPTED'),
            translate('SAFE_NATIVE.SUCCESS'),
            'success'
          )
        );
      }
      resolve(json);
    });
  });
}

export const loginWithPin = (key, pubkey) => {
  const payload = {
    key,
    pubkey,
    token: Config.token,
  };

  return new Promise((resolve, reject) => {
    fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/decryptkey`,
      fetchType(JSON.stringify(payload)).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'decryptKey',
          'Error',
          'error'
        )
      );
      resolve({ msg: 'error' });
    })
    .then(response => response.json())
    .then(json => {
      if (json.msg === 'success') {
        // Store.dispatch(shepherdElectrumAuth(json.result));
        resolve(json);
      } else {
        Store.dispatch(
          triggerToaster(
            json.result,
            translate('API.PIN_DECRYPT_ERR'),
            'error'
          )
        );
        resolve(json);
      }
    });
  });
}

export const modifyPin = (pubkey, remove, pubkeynew) => {
  const payload = remove ? {
    pubkey,
    delete: true,
    token: Config.token,
  } : {
    pubkey,
    pubkeynew,
    token: Config.token,
  };

  return new Promise((resolve, reject) => {
    fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/modifypin`,
      fetchType(JSON.stringify(payload)).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'modifyPin',
          'Error',
          'error'
        )
      );
      resolve({ msg: 'error' });
    })
    .then(response => response.json())
    .then(json => {
      if (json.msg === 'success') {
        resolve(json);
      } else {
        Store.dispatch(
          triggerToaster(
            json.result,
            translate('API.PIN_MODIFY_ERR'),
            'error'
          )
        );
        resolve(json);
      }
    });
  });
}

export const loadPinList = () => {
  return dispatch => {
    const _urlParams = {
      token: Config.token,
    };
    return fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/getpinlist${urlParams(_urlParams)}`,
      fetchType.get
    )
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
      /*dispatch(
        triggerToaster(
          'getPinList',
          'Success',
          'success'
        )
      );*/
      dispatch(
        getPinList(json.result)
      );
    });
  }
}