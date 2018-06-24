import { ACTIVE_HANDLE } from '../storeType';
import translate from '../../translate/translate';
import Config from '../../config';
import urlParams from '../../util/url';
import fetchType from '../../util/fetchType';
import mainWindow from '../../util/mainWindow';

import {
  triggerToaster,
  toggleAddcoinModal,
  getDexCoins,
  shepherdElectrumCoins,
} from '../actionCreators';
import {
  startCurrencyAssetChain,
  startAssetChain,
  startCrypto,
  checkAC,
  acConfig,
} from '../../components/addcoin/payload';

export const iguanaActiveHandleState = (json) => {
  return {
    type: ACTIVE_HANDLE,
    isLoggedIn: json.status === 'unlocked' ? true : false,
    handle: json,
  }
}

export const activeHandle = () => {
  return dispatch => {
    const _urlParams = {
      token: Config.token,
    };
    return fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/auth/status${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'activeHandle',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(
        iguanaActiveHandleState(json)
      );
    });
  }
}

export const shepherdElectrumAuth = (seed) => {
  return dispatch => {
    return fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/electrum/login`,
      fetchType(
        JSON.stringify({
          seed,
          iguana: true,
          token: Config.token,
        })
      ).post
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdElectrumAuth',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      if (json.msg !== 'error') {
        dispatch(activeHandle());
        dispatch(shepherdElectrumCoins());
      } else {
        dispatch(
          triggerToaster(
            translate('TOASTR.INCORRECT_WIF'),
            'Error',
            'error'
          )
        );
      }
    });
  }
}

export const shepherdElectrumAddCoin = (coin) => {
  return dispatch => {
    const _urlParams = {
      coin,
      token: Config.token,
    };
    return fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/electrum/coins/add${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdElectrumAddCoin',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(
        addCoinResult(coin, '0')
      );
    });
  }
}

export const addCoin = (coin, mode, startupParams, genproclimit) => {
  if (mode === 0 ||
      mode === '0') {
    return dispatch => {
      dispatch(shepherdElectrumAddCoin(coin));
    }
  } else {
    return dispatch => {
      dispatch(shepherdGetConfig(coin, mode, startupParams, genproclimit));
    }
  }
}

const handleErrors = (response) => {
  let _parsedResponse;

  if (!response.ok) {
    return null;
  } else {
    _parsedResponse = response.text().then((text) => { return text; });
    return _parsedResponse;
  }
}

export const shepherdHerd = (coin, mode, path, startupParams, genproclimit) => {
  let acData;
  let herdData = {
    'ac_name': coin,
    'ac_options': [
      '-daemon=0',
      '-server',
      `-ac_name=${coin}`
    ],
  };

  if (acConfig[coin]) {
    for (let key in acConfig[coin]) {
      if (key === 'pubkey') {
        const pubKeys = mainWindow.getPubkeys();

        if (pubKeys &&
            pubKeys[coin.toLowerCase()]) {
          herdData['ac_options'].push(`-pubkey=${pubKeys[coin.toLowerCase()].pubHex}`);
        }
      } else if (key === 'genproclimit') {
        if (genproclimit) {
          herdData['ac_options'].push(`-genproclimit=${genproclimit + 1}`);
        } else {
          herdData['ac_options'].push(`-genproclimit=1`);
        }
      } else {
        herdData['ac_options'].push(`-${key}=${acConfig[coin][key]}`);
      }
    }
  }

  if (!acConfig[coin] ||
      (acConfig[coin] && !acConfig[coin].addnode)) {
    herdData['ac_options'].push('-addnode=78.47.196.146');
  }

  if (coin === 'ZEC') {
    herdData = {
      'ac_name': 'zcashd',
      'ac_options': [
        '-daemon=0',
        '-server=1',
      ],
    };
  }

  if (coin === 'SAFE') {
    herdData = {
      'ac_name': 'safecoind',
      'ac_options': [
        '-daemon=0',
        '-addnode=78.47.196.146',
      ],
    };
  }

  if (startupParams) {
    herdData['ac_custom_param'] = startupParams.type;

    if (startupParams.value) {
      herdData['ac_custom_param_value'] = startupParams.value;
    }
  }

  // TODO: switch statement
  if (coin === 'SAFE') {
    acData = startCrypto(
      path.result,
      coin,
      mode
    );
  } else {
    const supply = startAssetChain(
      path.result,
      coin,
      mode,
      true
    );
    acData = startAssetChain(
      path.result,
      coin,
      mode
    );
    // herdData.ac_options.push(`-ac_supply=${supply}`);
  }

  return dispatch => {
    let _herd;

    if (coin === 'CHIPS') {
      _herd = 'chipsd';
      herdData = {};
    } else {
      _herd = coin !== 'ZEC' ? 'safecoind' : 'zcashd';
    }

    return fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/herd`,
      fetchType(
        JSON.stringify({
          herd: _herd,
          options: herdData,
          token: Config.token,
        })
      ).post
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          translate('FAILED_SHEPHERD_HERD'),
          translate('TOASTR.SERVICE_NOTIFICATION'),
          'error'
        )
      );
    })
    .then(handleErrors)
    .then((json) => {
      if (json) {
        dispatch(
          addCoinResult(coin, mode)
        );
      } else {
        dispatch(
          triggerToaster(
            `${translate('TOASTR.ERROR_STARTING_DAEMON', coin)} ${translate('TOASTR.PORT_IS_TAKEN', acData)}`,
            translate('TOASTR.SERVICE_NOTIFICATION'),
            'error',
            false
          )
        );
      }
    });
  }
}

export const addCoinResult = (coin, mode) => {
  const modeToValue = {
    '0': 'spv',
    '-1': 'native',
    '1': 'staking',
    '2': 'mining',
  };

  return dispatch => {
    dispatch(
      triggerToaster(
        `${coin} ${translate('TOASTR.STARTED_IN')} ${modeToValue[mode].toUpperCase()} ${translate('TOASTR.MODE')}`,
        translate('TOASTR.COIN_NOTIFICATION'),
        'success'
      )
    );
    dispatch(toggleAddcoinModal(false, false));

    if (Number(mode) === 0) {
      dispatch(activeHandle());
      dispatch(shepherdElectrumCoins());
      dispatch(getDexCoins());

      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(shepherdElectrumCoins());
        dispatch(getDexCoins());
      }, 500);
      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(shepherdElectrumCoins());
        dispatch(getDexCoins());
      }, 1000);
      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(shepherdElectrumCoins());
        dispatch(getDexCoins());
      }, 2000);
    } else {
      dispatch(activeHandle());
      dispatch(getDexCoins());

      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(getDexCoins());
      }, 500);
      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(getDexCoins());
      }, 1000);
      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(getDexCoins());
      }, 5000);
    }
  }
}

export const _shepherdGetConfig = (coin, mode, startupParams) => {
  return dispatch => {
    return fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/getconf`,
      fetchType(
        JSON.stringify({
          chain: 'safecoind',
          token: Config.token,
        })
      ).post
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          '_shepherdGetConfig',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(
      json => dispatch(
        shepherdHerd(
          coin,
          mode,
          json,
          startupParams
        )
      )
    );
  }
}

export const shepherdGetConfig = (coin, mode, startupParams, genproclimit) => {
  if (coin === 'SAFE' &&
      mode === '-1') {
    return dispatch => {
      return fetch(
        `http://127.0.0.1:${Config.safewalletPort}/shepherd/getconf`,
        fetchType(
          JSON.stringify({
            chain: 'safecoind',
            token: Config.token,
          })
        ).post
      )
      .catch((error) => {
        console.log(error);
        dispatch(
          triggerToaster(
            'shepherdGetConfig',
            'Error',
            'error'
          )
        );
      })
      .then(response => response.json())
      .then(
        json => dispatch(
          shepherdHerd(
            coin,
            mode,
            json,
            startupParams
          )
        )
      );
    }
  } else {
    return dispatch => {
      return fetch(
        `http://127.0.0.1:${Config.safewalletPort}/shepherd/getconf`,
        fetchType(
          JSON.stringify({
            chain: coin,
            token: Config.token,
          })
        ).post
      )
      .catch((error) => {
        console.log(error);
        dispatch(
          triggerToaster(
            'shepherdGetConfig',
            'Error',
            'error'
          )
        );
      })
      .then(response => response.json())
      .then(
        json => dispatch(
          shepherdHerd(
            coin,
            mode,
            json,
            startupParams,
            genproclimit
          )
        )
      );
    }
  }
}