import { triggerToaster } from '../actionCreators';
import Config from '../../config';
import Store from '../../store';

export function getTxDetails(coin, txid, type) {
  return new Promise((resolve, reject) => {
    let payload = {
      mode: null,
      chain: coin,
      cmd: 'gettransaction',
      params: [
        txid
      ],
      rpc2cli: Config.rpc2cli,
      token: Config.token,
    };

    if (type === 'raw') {
      payload = {
        mode: null,
        chain: coin,
        cmd: 'getrawtransaction',
        params: [
          txid,
          1
        ],
        rpc2cli: Config.rpc2cli,
        token: Config.token,
      };
    }

    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/cli`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload }),
      },
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'getTransaction',
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