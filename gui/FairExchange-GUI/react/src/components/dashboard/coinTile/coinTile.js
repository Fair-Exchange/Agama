import React from 'react';
import { connect } from 'react-redux';
import {
  getCoinTitle,
  getModeInfo,
  isSafecoinCoin,
} from '../../../util/coinHelper';
import CoinTileItem from './coinTileItem';
import translate from '../../../translate/translate';

import CoinTileRender from './coinTile.render';

class CoinTile extends React.Component {
  constructor() {
    super();
    this.state = {
      toggledSidebar: false,
    };
    this.renderTiles = this.renderTiles.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState({
      toggledSidebar: !this.state.toggledSidebar,
    });
  }

  renderTiles() {
    const modes = [
      'native',
      'spv',
    ];
    const allCoins = this.props.allCoins;
    let items = [];

    if (allCoins) {
      modes.map((mode) => {
        allCoins[mode].map((coin) => {
          const _coinMode = getModeInfo(mode);
          const modecode = _coinMode.code;
          const modetip = _coinMode.tip;
          const modecolor = _coinMode.color;

          const _coinTitle = getCoinTitle(coin.toUpperCase());
          const coinlogo = coin.toUpperCase();
          const coinname = translate((isSafecoinCoin(coin) ? 'ASSETCHAINS.' : 'CRYPTO.') + coin.toUpperCase());

          items.push({
            coinlogo,
            coinname,
            coin,
            mode,
            modecolor,
            modetip,
            modecode,
          });
        });
      });
    }

    return (
      items.map((item, i) =>
        <CoinTileItem
          key={ i }
          i={ i }
          item={ item } />
      )
    );
  }

  render() {
    return CoinTileRender.call(this);
  }
}
const mapStateToProps = (state) => {
  return {
    allCoins: state.Main.coins,
  };
};

export default connect(mapStateToProps)(CoinTile);