const electrumServers = require('../electrumjs/electrumServers');
const request = require('request');

// TODO: refactor

module.exports = (shepherd) => {
  shepherd.startSPV = (coin) => {
    if (coin === 'SAFE+REVS+JUMBLR') {
      shepherd.addElectrumCoin('SAFE');
      shepherd.addElectrumCoin('REVS');
      shepherd.addElectrumCoin('JUMBLR');
    } else {
      if (process.argv.indexOf('spvcoins=all/add-all') > -1) {
        for (let key in electrumServers) {
          shepherd.addElectrumCoin(electrumServers[key].abbr);
        }
      } else {
        shepherd.addElectrumCoin(coin);
      }
    }
  }

  shepherd.startSAFENative = (selection, isManual) => {
    let herdData;
    const acHerdData = {
      REVS: {
        name: 'REVS',
        seedNode: '78.47.196.146',
        supply: 1300000,
      },
      JUMBLR: {
        name: 'JUMBLR',
        seedNode: '78.47.196.146',
        supply: 999999,
      },
      MNZ: {
        name: 'MNZ',
        seedNode: '78.47.196.146',
        supply: 257142858,
      },
      BTCH: {
        name: 'BTCH',
        seedNode: '78.47.196.146',
        supply: 20998641,
      },
    };
    const httpRequest = () => {
      const options = {
        url: `http://127.0.0.1:${shepherd.appConfig.safewalletPort}/shepherd/herd`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          herd: 'safecoind',
          options: herdData,
          token: shepherd.appSessionHash,
        }),
      };

      request(options, (error, response, body) => {
        // resolve(body);
      });
    };

    if (isManual) {
      shepherd.safeMainPassiveMode = true;
    }

    if (selection === 'SAFE') {
      herdData = {
        'ac_name': 'safecoind',
        'ac_options': [
          '-daemon=0',
          '-addnode=78.47.196.146',
        ],
      };

      httpRequest();
    } else if (
      selection === 'REVS' ||
      selection === 'JUMRLR' ||
      selection === 'MNZ' ||
      selection === 'BTCH'
    ) {
      herdData = {
        'ac_name': acHerdData[selection].name,
        'ac_options': [
          '-daemon=0',
          '-server',
          `-ac_name=${acHerdData[selection].name}`,
          `-addnode=${acHerdData[selection].seedNode}`,
          `-ac_supply=${acHerdData[selection].supply}`,
        ],
      };

      httpRequest();
    } else {
      const herdData = [{
        'ac_name': 'safecoind',
        'ac_options': [
          '-daemon=0',
          '-addnode=78.47.196.146',
        ],
      }, {
        'ac_name': 'REVS',
        'ac_options': [
          '-daemon=0',
          '-server',
          `-ac_name=REVS`,
          '-addnode=78.47.196.146',
          '-ac_supply=1300000',
        ],
      }, {
        'ac_name': 'JUMBLR',
        'ac_options': [
          '-daemon=0',
          '-server',
          `-ac_name=JUMBLR`,
          '-addnode=78.47.196.146',
          '-ac_supply=999999',
        ],
      }];

      for (let i = 0; i < herdData.length; i++) {
        setTimeout(() => {
          const options = {
            url: `http://127.0.0.1:${shepherd.appConfig.safewalletPort}/shepherd/herd`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              herd: 'safecoind',
              options: herdData[i],
              token: shepherd.appSessionHash,
            }),
          };

          request(options, (error, response, body) => {
            // resolve(body);
          });
        }, 100);
      }
    }
  };

  return shepherd;
};