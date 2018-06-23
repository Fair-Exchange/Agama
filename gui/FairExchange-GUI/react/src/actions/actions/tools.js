import translate from '../../translate/translate';
import Config from '../../config';
import { triggerToaster } from '../actionCreators';
import Store from '../../store';
import urlParams from '../../util/url';
import fetchType from '../../util/fetchType';

export const shepherdToolsSeedKeys = (seed) => {
  return new Promise((resolve, reject) => {
    fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/electrum/keys`,
      fetchType(
        JSON.stringify({
          seed,
          active: true,
          iguana: true,
          token: Config.token,
        })
      ).post
    )
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

export const shepherdToolsBalance = (coin, address) => {
  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
      coin,
      address,
    };
    fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/electrum/getbalance${urlParams(_urlParams)}`,
      fetchType.get
    )
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

export const shepherdToolsTransactions = (coin, address) => {
  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
      coin,
      address,
      full: true,
      maxlength: 20,
    };
    fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/electrum/listtransactions${urlParams(_urlParams)}`,
      fetchType.get
    )
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

export const shepherdToolsBuildUnsigned = (coin, value, sendToAddress, changeAddress) => {
  value = Math.floor(value);

  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
      coin,
      value,
      address: sendToAddress,
      change: changeAddress,
      verify: false,
      push: false,
      offline: true,
    };
    return fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/electrum/createrawtx${urlParams(_urlParams)}`,
      fetchType.get
    )
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

export const shepherdToolsListunspent = (coin, address) => {
  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
      coin,
      address,
      full: true,
    };
    fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/electrum/listunspent${urlParams(_urlParams)}`,
      fetchType.get
    )
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

export const shepherdToolsPushTx = (network, rawtx) => {
  return new Promise((resolve, reject) => {
    fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/electrum/pushtx`,
      fetchType(
        JSON.stringify({
          network,
          rawtx,
          token: Config.token,
        })
      ).post
    )
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

export const shepherdToolsWifToKP = (coin, wif) => {
  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
      coin,
      wif,
    };
    fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/electrum/wiftopub${urlParams(_urlParams)}`,
      fetchType.get
    )
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

export const shepherdToolsSeedToWif = (seed, network, iguana) => {
  return new Promise((resolve, reject) => {
    fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/electrum/seedtowif`,
      fetchType(
        JSON.stringify({
          seed,
          network,
          iguana,
          token: Config.token,
        })
      ).post
    )
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

// remote bitcore api
export const shepherdToolsMultiAddressBalance = (addressList, fallback) => {
  return new Promise((resolve, reject) => {
    fetch(
      fallback ? 'https://explorer.safecoin.org/api/addrs/utxo' : 'https://explorer.safecoin.org/api/addrs/utxo',
      fetchType(
        JSON.stringify({
          addrs: addressList,
        })
      ).post
    )
    .catch((error) => {
      console.log(error);
      console.warn(`shepherdToolsMultiAddressBalance has failed, ${fallback ? ' use fallback' : ' all routes have failed'}`);

      resolve({
        msg: 'error',
        code: fallback ? -1554 : -777,
      });
    })
    .then((response) => {
      const _response = response.text().then((text) => { return text; });
      return _response;
    })
    .then(json => {
      try {
        json = JSON.parse(json);

        if (json.length ||
            (typeof json === 'object' && !Object.keys(json).length)) {
          resolve({
            msg: 'success',
            result: json,
          });
        } else {
          resolve({
            msg: 'error',
            result: 'error parsing response',
          });
        }
      } catch (e) {
        resolve({
          msg: 'error',
          result: json.indexOf('<html>') === -1 ? json : 'error parsing response',
        });
      }
    });
  });
}