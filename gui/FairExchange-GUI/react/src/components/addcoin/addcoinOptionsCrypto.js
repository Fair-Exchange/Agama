import { translate } from '../../translate/translate';
import mainWindow from '../../util/mainWindow';
import config from '../../config';

const addCoinOptionsCrypto = () => {
  const availableSAFEModes = mainWindow.arch === 'x64' ? 'spv|native' : 'spv';

  let _coins = [{
    label: 'Safecoin (SAFE)',
    icon: 'SAFE',
    value: `SAFE|${availableSAFEModes}`,
  }, {
    label: 'Chips (CHIPS)',
    icon: 'CHIPS',
    value: `CHIPS|spv`,
  }];

  if (config.experimentalFeatures) {
    _coins.push({
      label: 'BitcoinGold (BTG)',
      icon: 'BTG',
      value: `BTG|spv`,
    }, {
      label: 'BitcoinCash (BCH)',
      icon: 'BCH',
      value: `BCH|spv`,
    }, {
      label: 'Bitcoin (BTC)',
      icon: 'BTC',
      value: `BTC|spv`,
    }, {
      label: 'Crown (CRW)',
      icon: 'CRW',
      value: `CRW|spv`,
    }, {
      label: 'Dash (DASH)',
      icon: 'DASH',
      value: `DASH|spv`,
    }, {
      label: 'Denarius (DNR)',
      icon: 'DNR',
      value: `DNR|spv`,
    }, {
      label: 'DigiByte (DGB)',
      icon: 'DGB',
      value: `DGB|spv`,
    }, {
      label: 'Faircoin (FAIR)',
      icon: 'FAIR',
      value: `FAIR|spv`,
    }, {
      label: 'Argentum (ARG)',
      icon: 'ARG',
      value: `ARG|spv`,
    }, {
      label: 'Litecoin (LTC)',
      icon: 'LTC',
      value: `LTC|spv`,
    }, {
      label: 'Monacoin (MONA)',
      icon: 'MONA',
      value: `MONA|spv`,
    }, {
      label: 'Namecoin (NMC)',
      icon: 'NMC',
      value: `NMC|spv`,
    }, {
      label: 'Vertcoin (VTC)',
      icon: 'VTC',
      value: `VTC|spv`,
    }, {
      label: 'Viacoin (VIA)',
      icon: 'VIA',
      value: `VIA|spv`,
    }, {
      label: 'Sibcoin (SIB)',
      icon: 'SIB',
      value: `SIB|spv`,
    }, {
      label: 'Blackcoin (BLK)',
      icon: 'BLK',
      value: `BLK|spv`,
    }, {
      label: 'Dogecoin (DOGE)',
      icon: 'DOGE',
      value: `DOGE|spv`,
    }, {
      label: 'Zcash (ZEC)',
      icon: 'ZEC',
      value: `ZEC|spv`,
    }, {
      label: 'Hush (HUSH)',
      icon: 'HUSH',
      value: `HUSH|spv`,
    }, {
      label: 'Zclassic (ZCL)',
      icon: 'ZCL',
      value: `ZCL|spv`,
    }, {
      label: 'Myriad (XMY)',
      icon: 'XMY',
      value: `XMY|spv`,
    },/* {
      label: 'Groestlcoin (GRS)',
      icon: 'GRS',
      value: `GRS|spv`,
    }, */{
      label: 'Hodlc (HODLC)',
      icon: 'HODLC',
      value: `HODLC|spv`,
    }, {
      label: 'Bitcore (BTX)',
      icon: 'BTX',
      value: `BTX|spv`,
    }, {
      label: 'Qtum (QTUM)',
      icon: 'QTUM',
      value: `QTUM|spv`,
    }, {
      label: 'BitcoinZ (BTCZ)',
      icon: 'BTCZ',
      value: `BTCZ|spv`,
    });
  }

  return _coins;
}

export default addCoinOptionsCrypto;
