import React from 'react';
import { connect } from 'react-redux';
import WalletsMainRender from './walletsMain.render';
import translate from '../../../translate/translate';
import {
  triggerToaster,
  prices,
} from '../../../actions/actionCreators';
import { getCoinTitle } from '../../../util/coinHelper';
import Config from '../../../config';
import Store from '../../../store';
import mainWindow from '../../../util/mainWindow';

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

const socket = io.connect(`http://127.0.0.1:${Config.safewalletPort}`);
const PRICES_UPDATE_INTERVAL = 120000; // every 2m

class WalletsMain extends React.Component {
  constructor() {
    super();
    this.getCoinStyle = this.getCoinStyle.bind(this);
    this.pricesInterval = null;
    socket.on('service', msg => this.updateSocketsData(msg));
  }

  componentWillUnmount() {
    if (this.pricesInterval) {
      clearInterval(this.pricesInterval);
    }
  }

  componentWillMount() {
    if (Config.fiatRates) {
      Store.dispatch(prices());
      this.pricesInterval = setInterval(() => {
        Store.dispatch(prices());
      }, PRICES_UPDATE_INTERVAL);
    }

    if (mainWindow.createSeed.triggered &&
        !mainWindow.createSeed.secondaryLoginPH) {
      Store.dispatch(
        triggerToaster(
          translate('LOGIN.PLEASE_WRITE_DOWN_YOUR_PUB'),
          translate('LOGIN.FIRST_TIME_SEED_USE'),
          'info',
          false
        )
      );
    } else if (
      mainWindow.createSeed.triggered &&
      mainWindow.createSeed.secondaryLoginPH
    ) {
      if (mainWindow.createSeed.secondaryLoginPH === mainWindow.createSeed.firstLoginPH) {
        Store.dispatch(
          triggerToaster(
            translate('LOGIN.YOUR_ADDR_APPEARS_CORRECT'),
            translate('LOGIN.CONGRATS_ALL_SET'),
            'success',
            false
          )
        );
        mainWindow.createSeed = {
          triggered: false,
          firstLoginPH: null,
          secondaryLoginPH: null,
        };
      } else {
        Store.dispatch(
          triggerToaster(
            translate('LOGIN.YOUR_SEED_DOESNT_SEEM_CORRECT'),
            translate('LOGIN.SEED_VERIFICATION_ERROR'),
            'error',
            false
          )
        );
        mainWindow.createSeed = {
          triggered: false,
          firstLoginPH: null,
          secondaryLoginPH: null,
        };
      }
    }
  }

  updateSocketsData(data) {
    if (data &&
        data.safecoind &&
        data.safecoind.error) {
      switch (data.safecoind.error) {
        case 'run -reindex':
          Store.dispatch(
            triggerToaster(
              translate('TOASTR.RESTART_SAFEWALLET_WITH_REINDEX_PARAM'),
              translate('TOASTR.WALLET_NOTIFICATION'),
              'info',
              false
            )
          );
          break;
      }
    }
  }

  getCoinStyle(type) {
    if (type === 'transparent') {
      if (getCoinTitle(this.props.ActiveCoin.coin).transparentBG &&
          getCoinTitle().logo) {
        return { 'backgroundImage': `url("assets/images/bg/${getCoinTitle().logo.toLowerCase()}_transparent_header_bg.png")` };
      }
    } else if (type === 'title') {
      let _iconPath;

      if (getCoinTitle(this.props.ActiveCoin.coin).titleBG) {
        _iconPath = `assets/images/native/${getCoinTitle(this.props.ActiveCoin.coin).logo.toLowerCase()}_header_title_logo.png`;
      } else if (
        !getCoinTitle(this.props.ActiveCoin.coin).titleBG &&
        getCoinTitle(this.props.ActiveCoin.coin).logo
      ) {
        _iconPath = `assets/images/cryptologo/${getCoinTitle(this.props.ActiveCoin.coin).logo.toLowerCase()}.png`;
      }

      return _iconPath;
    }
  }

  render() {
    if (this.props.ActiveCoin &&
        this.props.ActiveCoin.mode) {
      return WalletsMainRender.call(this);
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    ActiveCoin: {
      coin: state.ActiveCoin.coin,
      mode: state.ActiveCoin.mode,
    },
  };
};

export default connect(mapStateToProps)(WalletsMain);
