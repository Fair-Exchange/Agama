import React from 'react';
import WalletsBalance from '../walletsBalance/walletsBalance';
import WalletsInfo from '../walletsInfo/walletsInfo';
import SendCoin from '../sendCoin/sendCoin';
import WalletsProgress from '../walletsProgress/walletsProgress';
import WalletsData from '../walletsData/walletsData';
import ReceiveCoin from '../receiveCoin/receiveCoin';
import {
  getCoinTitle,
  isSafecoinCoin,
} from '../../../util/coinHelper';
import translate from '../../../translate/translate';

const WalletsMainRender = function() {
  return (
    <div className="page margin-left-0">
      <div className="padding-top-0">
        <div
          id="fairexchange-header-div"
          className="background-color-white"
          style={ this.getCoinStyle('transparent') }>
          <ol className={ 'coin-logo breadcrumb' + (this.props.ActiveCoin.coin === 'SAFE' || this.props.ActiveCoin.coin === 'JUMBLR' || this.props.ActiveCoin.coin === 'MESH' || this.props.ActiveCoin.coin === 'MVP' ? ' coin-logo-wide' : '') + ' native-coin-logo' }>
            <li className="header-fairexchange-section">
              { this.getCoinStyle('title') &&
                <img
                  className={ 'coin-icon' + (this.props.ActiveCoin.coin === 'SAFE' ? ' safe' : '') }
                  src={ this.getCoinStyle('title') } />
              }
              { this.props.ActiveCoin.coin === 'SAFE' &&
                <img
                  className="safe-mobile-icon"
                  src={ `assets/images/cryptologo/${this.props.ActiveCoin.coin.toLowerCase()}.png` } />
              }
              <span className={ `margin-left-20 fairexchange-section-image ${(this.props.ActiveCoin.coin === 'SAFE' || this.props.ActiveCoin.coin === 'JUMBLR' || this.props.ActiveCoin.coin === 'MESH' || this.props.ActiveCoin.coin === 'MVP' ? 'hide' : '')}` }>
                { translate((isSafecoinCoin(this.props.ActiveCoin.coin) ? 'ASSETCHAINS.' : 'CRYPTO.') + this.props.ActiveCoin.coin.toUpperCase()) }
              </span>
            </li>
          </ol>
        </div>
        <div className="page-content page-content-native">
          { this.props.ActiveCoin.mode !== 'spv' &&
            <WalletsProgress />
          }
          <div className="row">
            <WalletsBalance />
            <ReceiveCoin />
            <WalletsData />
            <SendCoin />
            <WalletsInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletsMainRender;