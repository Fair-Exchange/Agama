import translate from '../../translate/translate';
import mainWindow from '../../util/mainWindow';
import config from '../../config';
import { cryptoCoins } from '../../util/coinHelper';

let _prepCoinsList;
let coins = cryptoCoins;

const prepCoinsList = () => {
  const availableSAFEModes = mainWindow.arch === 'x64' ? 'spv|native' : 'spv';
  let _coins = [];

  if (!config.experimentalFeatures) {
    coins = coins.slice(0, 2);
  }

  for (let i = 0; i < coins.length; i++) {
    if (mainWindow.electrumServers[coins[i].toLowerCase()]) {
      _coins.push({
        label: `${translate('CRYPTO.' + coins[i])} (${coins[i]})`,
        icon: coins[i],
        value: `${coins[i]}|${coins[i] === 'SAFE' ? availableSAFEModes : 'spv'}`,
      });
    }
  }

  _prepCoinsList = _coins;

  return _coins;
};

const addCoinOptionsCrypto = () => {
  if (_prepCoinsList) {
    return _prepCoinsList;
  } else {
    return prepCoinsList();
  }
}

export default addCoinOptionsCrypto;