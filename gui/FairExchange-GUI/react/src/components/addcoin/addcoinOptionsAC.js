import translate from '../../translate/translate';
import mainWindow from '../../util/mainWindow';
import config from '../../config';
import { safeAssetChains } from 'safewallet-wallet-lib/src/coin-helpers';

const addCoinOptionsAC = () => {
  const _assetChains = safeAssetChains;
  let _items = [];

  for (let i = 0; i < _assetChains.length; i++) {
    let availableModes = _assetChains[i] !== 'AXO' && _assetChains[i] !== 'ETOMIC' && _assetChains[i] !== 'MESH' && _assetChains[i] !== 'CEAL' ? 'spv|native' : 'native';

    if (mainWindow.arch !== 'x64') {
      availableModes = 'spv';
    }

    if (_assetChains[i] !== 'MVP') {
      _items.push({
        label: translate(`ASSETCHAINS.${_assetChains[i].toUpperCase()}`),
        icon: _assetChains[i].toLowerCase(),
        value: `${_assetChains[i].toUpperCase()}|${availableModes}`,
      });
    }
  }

  if (config.experimentalFeatures) {
    const _customAssetChains = {
      mining: [
      ],
      staking: [
      ],
    };

    for (let key in _customAssetChains) {
      for (let i = 0; i < _customAssetChains[key].length; i++) {

        _items.push({
          label: translate(`ASSETCHAINS.${_customAssetChains[key][i].toUpperCase()}`),
          icon: _customAssetChains[key][i].toLowerCase(),
          value: `${_customAssetChains[key][i].toUpperCase()}|${key}`,
        });
      }
    }
  }

  return _items;
}

export default addCoinOptionsAC;