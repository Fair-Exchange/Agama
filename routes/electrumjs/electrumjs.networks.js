'use strict'
const bitcoin = require('bitcoinjs-lib');

let networks = exports;
Object.keys(bitcoin.networks).forEach((key) => {
  networks[key] = bitcoin.networks[key];
});

// https://github.com/Fair-Exchange/safecoin/blob/master/src/chainparams.cpp
networks.safecoin = {
  messagePrefix: '\x19Safecoin Signed Message:\n',
  bip32: {
    public: 0x0488b21f,
    private: 0x0488ade5,
  },
  pubKeyHash: 0x3d,
  scriptHash: 0x56,
  wif: 0xbd,
  dustThreshold: 1000,
  isZcash: true,
};

networks.safe = networks.safecoin;
