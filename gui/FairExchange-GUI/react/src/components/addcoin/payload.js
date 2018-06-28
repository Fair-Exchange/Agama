// TODO: merge check functions
//			 move to nodejs
//			 cleanup
import { isSafecoinCoin } from 'safewallet-wallet-lib/src/coin-helpers';

export const checkAC = (coinVal) => {
	return isSafecoinCoin(coinVal, true);
}

export const startCurrencyAssetChain = (confpath, coin, mode) => {
	const assetChainPorts = window.require('electron').remote.getCurrentWindow().assetChainPorts;

	return assetChainPorts[coin];
}

export const startAssetChain = (confpath, coin, mode, getSuppyOnly) => {
	const assetChainPorts = window.require('electron').remote.getCurrentWindow().assetChainPorts;

	if (mode === '-1') {
		if (getSuppyOnly) {
			return acConfig[coin].supply;
		} else {
			return assetChainPorts[coin];
		}
	}
}

export const startCrypto = (confpath, coin, mode) => {
	const assetChainPorts = window.require('electron').remote.getCurrentWindow().assetChainPorts;

	coin = coin === 'SAFE' ? 'safecoind' : coin;
	return assetChainPorts[coin];
}

export const acConfig = {
	SUPERNET: {
		'ac_supply': 816061,
	},
	REVS: {
		'ac_supply': 1300000,
	},
	WLC: {
		'ac_supply': 210000000,
	},
	PANGEA: {
		'ac_supply': 999999,
	},
	DEX: {
		'ac_supply': 999999,
	},
	JUMBLR: {
		'ac_supply': 999999,
	},
	BET: {
		'ac_supply': 999999,
	},
	CRYPTO: {
		'ac_supply': 999999,
	},
	HODL: {
		'ac_supply': 9999999,
	},
	MSHARK: {
		'ac_supply': 1400000,
	},
	BOTS: {
		'ac_supply': 999999,
	},
	MGW: {
		'ac_supply': 999999,
	},
	MVP: {
		'ac_supply': 1000000,
	},
	KV: {
		'ac_supply': 1000000,
	},
	CEAL: {
		'ac_supply': 366666666,
	},
	MESH: {
		'ac_supply': 1000007,
	},
	COQUI: {
		'ac_supply': 72000000,
 	},
	CHAIN: {
  	'ac_supply': 999999,
  	addnode: '78.47.146.222',
  },
	GLXT: {
    'ac_supply': 100000000,
    addnode: '13.230.224.15',
  },
	EQL: {
    'ac_supply': 500000000,
    addnode: '46.101.124.153',
	},
	MNZ: {
		'ac_supply': 257142858,
	},
	AXO: {
		'ac_supply': 200000000,
	},
	ETOMIC: {
		'ac_supply': 100000000,
	},
	BTCH: {
		'ac_supply': 20998641,
	},
	BEER: {
		'ac_supply': 100000000,
		addnode: '24.54.206.138',
	},
	PIZZA: {
		'ac_supply': 100000000,
		addnode: '24.54.206.138',
	},
	OOT: {
		'ac_supply': 216000000,
		addnode: '174.138.107.226',
	},
	VOTE2018: {
		'ac_supply': 600000000,
	},
	NINJA: {
		'ac_supply': 100000000,
		addnode: '192.241.134.19',
	},
	BNTN: {
		'ac_supply': 500000000,
		addnode: '94.130.169.205',
	},
	PRLPAY: {
		'ac_supply': 500000000,
		addnode: '13.250.226.125',
	},
	ZILLA: {
		'ac_supply': 11000000,
		addnode: '158.69.0.53',
	},
};
