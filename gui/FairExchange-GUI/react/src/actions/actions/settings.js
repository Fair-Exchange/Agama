import {
  LOAD_APP_INFO,
  GET_WIF_KEY,
  GET_DEBUG_LOG,
  GET_PEERS_LIST,
  LOAD_APP_CONFIG,
} from '../storeType';
import { translate } from '../../translate/translate';
import { triggerToaster } from '../actionCreators';
import Config from '../../config';
import Store from '../../store';

function getAppInfoState(json) {
  return {
    type: LOAD_APP_INFO,
    info: json,
  }
}

export function getAppInfo() {
  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/appinfo?token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'getAppInfo',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => dispatch(getAppInfoState(json)));
  }
}

export function settingsWifkeyState(json, coin) {
  return {
    type: GET_WIF_KEY,
    wifkey: json,
    address: json[coin],
  }
}

function parseImportPrivKeyResponse(json, dispatch) {
  if (json.error === 'illegal privkey') {
    return dispatch => {
      dispatch(
        triggerToaster(
          translate('API.ILLEGAL_PRIVKEY'),
          translate('TOASTR.SETTINGS_NOTIFICATION'),
          'error'
        )
      );
    }
  } else if (json.error === 'privkey already in wallet') {
    return dispatch => {
      dispatch(
        triggerToaster(
          translate('API.PRIVKEY_IN_WALLET'),
          translate('TOASTR.SETTINGS_NOTIFICATION'),
          'warning'
        )
      );
    }
  }

  if (json &&
      json.result !== undefined &&
      json.result == 'success') {
    return dispatch => {
      dispatch(
        triggerToaster(
          translate('TOASTR.PRIV_KEY_IMPORTED'),
          translate('TOASTR.SETTINGS_NOTIFICATION'),
          'success'
        )
      );
    }
  }
}

function getDebugLogState(json) {
  const _data = json.result.replace('\n', '\r\n');

  return {
    type: GET_DEBUG_LOG,
    data: _data,
  }
}

export function getDebugLog(target, linesCount, acName) {
  const payload = {
    herdname: target,
    lastLines: linesCount,
    token: Config.token,
  };

  if (acName) {
    payload.ac = acName;
  }

  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/debuglog`, {
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
          'getDebugLog',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => dispatch(getDebugLogState(json)));
  }
}

export function saveAppConfig(_payload) {
  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/appconf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: _payload,
        token: Config.token,
      }),
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'saveAppConfig',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(getAppConfig());
      dispatch(
        triggerToaster(
          translate('TOASTR.SETTINGS_SAVED'),
          translate('TOASTR.SETTINGS_NOTIFICATION'),
          'success'
        )
      );
    });
  }
}

function getAppConfigState(json) {
  return {
    type: LOAD_APP_CONFIG,
    config: json,
  }
}

export function getAppConfig() {
  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/appconf?token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'getAppConfig',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => dispatch(getAppConfigState(json)));
  }
}

export function resetAppConfig() {
  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/appconf/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: Config.token })
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'resetAppConfig',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(getAppConfig());
      dispatch(
        triggerToaster(
          translate('TOASTR.SETTINGS_RESET'),
          translate('TOASTR.SETTINGS_NOTIFICATION'),
          'success'
        )
      );
    });
  }
}

export function coindGetStdout(chain) {
  const _chain = chain === 'KMD' ? 'komodod' : chain;

  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/coind/stdout?chain=${chain}&token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'coindGetStdout',
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

export function getWalletDatKeys(chain, keyMatchPattern) {
  const _chain = chain === 'KMD' ? null : chain;

  return new Promise((resolve, reject) => {
    fetch(keyMatchPattern ? `http://127.0.0.1:${Config.agamaPort}/shepherd/coindwalletkeys?chain=${_chain}&search=${keyMatchPattern}&token=${Config.token}` : `http://127.0.0.1:${Config.agamaPort}/shepherd/coindwalletkeys?chain=${_chain}&token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'getWalletDatKeys',
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

export function dumpPrivKey(coin, address, isZaddr) {
  return new Promise((resolve, reject) => {
    const payload = {
      mode: null,
      chain: coin,
      cmd: isZaddr ? 'z_exportkey' : 'dumpprivkey',
      params: [ address ],
      rpc2cli: Config.rpc2cli,
      token: Config.token,
    };

    const _fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload }),
    };

    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/cli`,
      _fetchConfig
    )
    .catch(function(error) {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'dumpPrivKey',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(json.result ? json.result : json);
    });
  });
}

export function validateAddress(coin, address, isZaddr) {
  return new Promise((resolve, reject) => {
    const payload = {
      mode: null,
      chain: coin,
      cmd: isZaddr ? 'z_validateaddress' : 'validateaddress',
      params: [ address ],
      rpc2cli: Config.rpc2cli,
      token: Config.token,
    };

    const _fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload }),
    };

    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/cli`,
      _fetchConfig
    )
    .catch(function(error) {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'validateAddress',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(json.result ? json.result : json);
    });
  });
}