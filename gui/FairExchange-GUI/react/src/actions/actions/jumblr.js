import {
  triggerToaster,
  getNewKMDAddresses,
} from '../actionCreators';
import Config from '../../config';
import Store from '../../store';

function getNewAddress(coin) {
  return new Promise((resolve, reject) => {
    const payload = {
      mode: null,
      chain: coin,
      cmd: 'getnewaddress',
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
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'genJumblrAddress + getKMDAddressesNative',
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

export function setJumblrAddress(coin, type, address) {
  return new Promise((resolve, reject) => {
    const payload = {
      mode: null,
      chain: coin,
      cmd: type === 'deposit' ? 'jumblr_deposit' : 'jumblr_secret',
      params: [address],
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
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'setJumblrAddress',
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

export function pauseJumblr(coin) {
  return new Promise((resolve, reject) => {
    const payload = {
      mode: null,
      chain: coin,
      cmd: 'jumblr_pause',
      params: [],
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
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'pauseJumblr',
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

export function resumeJumblr(coin) {
  return new Promise((resolve, reject) => {
    const payload = {
      mode: null,
      chain: coin,
      cmd: 'jumblr_resume',
      params: [],
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
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'resumeJumblr',
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

function dumpPrivkey(coin, key) {
  return new Promise((resolve, reject) => {
    const payload = {
      mode: null,
      chain: coin,
      cmd: 'dumpprivkey',
      params: [key],
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
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'dumpPrivkey ',
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

export function importPrivkey(coin, key, rescan = false) {
  return new Promise((resolve, reject) => {
    const payload = {
      mode: null,
      chain: coin,
      cmd: 'importprivkey',
      params: [
        key,
        '',
        rescan
      ],
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
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'importPrivkey ',
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