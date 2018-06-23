import React from 'react';
import { connect } from 'react-redux';
import translate from '../../translate/translate';
import Config from '../../config';
import {
  addCoin,
  toggleAddcoinModal,
  triggerToaster,
  shepherdGetCoinList,
  shepherdPostCoinList,
  toggleZcparamsFetchModal,
} from '../../actions/actionCreators';
import Store from '../../store';
import zcashParamsCheckErrors from '../../util/zcashParams';
import mainWindow from '../../util/mainWindow';

import CoinSelectorsRender from './coin-selectors.render';
import AddCoinRender from './addcoin.render';

const SEED_TRIM_TIMEOUT = 5000;

class AddCoin extends React.Component {
  constructor() {
    super();
    this.state = {
      nativeOnly: Config.iguanaLessMode,
      coins: [],
      defaultCoinState: {
        selectedCoin: null,
        spvMode: {
          disabled: true,
          checked: false,
        },
        nativeMode: {
          disabled: true,
          checked: false,
        },
        miningMode: {
          disabled: true,
          checked: false,
        },
        stakingMode: {
          disabled: true,
          checked: false,
        },
        mode: -2,
        daemonParam: null,
        genProcLimit: null,
      },
      display: false,
      actionsMenu: false,
      modalClassName: 'hide',
      isExperimentalOn: false,
      // staking ac
      loginPassphrase: '',
      seedInputVisibility: false,
      seedExtraSpaces: false,
      trimPassphraseTimer: null,
    };
    this.existingCoins = null;
    this.defaultState = JSON.parse(JSON.stringify(this.state));
    this.activateCoin = this.activateCoin.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.activateAllCoins = this.activateAllCoins.bind(this);
    this.toggleActionsMenu = this.toggleActionsMenu.bind(this);
    this.saveCoinSelection = this.saveCoinSelection.bind(this);
    this.loadCoinSelection = this.loadCoinSelection.bind(this);
    this.verifyZcashParamsExist = this.verifyZcashParamsExist.bind(this);
    this.updateLoginPassPhraseInput = this.updateLoginPassPhraseInput.bind(this);
    this.toggleSeedInputVisibility = this.toggleSeedInputVisibility.bind(this);
    this.resizeLoginTextarea = this.resizeLoginTextarea.bind(this);
  }

  toggleSeedInputVisibility() {
    this.setState({
      seedInputVisibility: !this.state.seedInputVisibility,
    });

    this.resizeLoginTextarea();
  }

  resizeLoginTextarea() {
    // auto-size textarea
    setTimeout(() => {
      if (this.state.seedInputVisibility) {
        document.querySelector('#loginPassphrase').style.height = '1px';
        document.querySelector('#loginPassphrase').style.height = `${(15 + document.querySelector('#loginPassphrase').scrollHeight)}px`;
      }
    }, 100);
  }

  updateLoginPassPhraseInput(e) {
    const newValue = e.target.value;

    clearTimeout(this.state.trimPassphraseTimer);

    const _trimPassphraseTimer = setTimeout(() => {
      if (newValue[0] === ' ' ||
          newValue[newValue.length - 1] === ' ') {
        this.setState({
          seedExtraSpaces: true,
        });
      } else {
        this.setState({
          seedExtraSpaces: false,
        });
      }
    }, SEED_TRIM_TIMEOUT);

    this.resizeLoginTextarea();

    this.setState({
      trimPassphraseTimer: _trimPassphraseTimer,
      [e.target.name === 'loginPassphraseTextarea' ? 'loginPassphrase' : e.target.name]: newValue,
    });
  }

  verifyZcashParamsExist(mode) {
    return new Promise((resolve, reject) => {
      if (Number(mode) === -1 ||
          Number(mode) === 1 ||
          Number(mode) === 2) {
        const _res = mainWindow.zcashParamsExist;
        const __errors = zcashParamsCheckErrors(_res);

        if (__errors) {
          mainWindow.zcashParamsExistPromise()
          .then((res) => {
            const _errors = zcashParamsCheckErrors(res);
            mainWindow.zcashParamsExist = res;

            if (_errors) {
              Store.dispatch(
                triggerToaster(
                  _errors,
                  'Safecoind',
                  'error',
                  false
                )
              );
              Store.dispatch(toggleZcparamsFetchModal(true));
              resolve(false);
            } else {
              resolve(true);
            }
          });
        } else {
          resolve(true);
        }
      } else {
        resolve(true);
      }
    });
  }

  saveCoinSelection() {
    shepherdPostCoinList(this.state.coins)
    .then((json) => {
      this.toggleActionsMenu();
    });
  }

  loadCoinSelection() {
    shepherdGetCoinList()
    .then((json) => {
      if (json.msg !== 'error') {
        this.setState(Object.assign({}, this.state, {
          coins: json.result,
          actionsMenu: false,
        }));
      } else {
        Store.dispatch(
          triggerToaster(
            translate('TOASTR.SELECTION_NOT_FOUND'),
            translate('TOASTR.COIN_SELECTION'),
            'info'
          )
        );
      }
    });
  }

  updateDaemonParam(e, index) {
    let _coins = this.state.coins;

    _coins[index] = Object.assign({}, _coins[index], {
      [e.target.name]: e.target.value,
    });

    this.setState(Object.assign({}, this.state, {
      coins: _coins,
    }));
  }

  toggleActionsMenu() {
    this.setState(Object.assign({}, this.state, {
      actionsMenu: !this.state.actionsMenu,
    }));
  }

  componentWillMount() {
    this.addNewItem();

    this.setState({
      isExperimentalOn: mainWindow.appConfig.experimentalFeatures,
    });
  }

  componentWillReceiveProps(props) {
    const addCoinProps = props ? props.AddCoin : null;

    this.existingCoins = props && props.Main ? props.Main.coins : null;

    if (addCoinProps &&
        addCoinProps.display !== this.state.display) {
      this.setState(Object.assign({}, this.state, {
        display: addCoinProps.display,
        modalClassName: 'show fade',
      }));

      setTimeout(() => {
        this.setState(Object.assign({}, this.state, {
          display: addCoinProps.display,
          modalClassName: addCoinProps.display ? 'show in' : 'hide',
        }));
      }, 100);
    }
  }

  renderCoinOption(option) {
    return (
      <div>
        <img
          src={ `assets/images/cryptologo/${option.icon.toLowerCase()}.png` }
          alt={ option.label }
          width="30px"
          height="30px" />
          <span className="margin-left-10">{ option.label }</span>
      </div>
    );
  }

  updateSelectedCoin(e, index) {
    if (e &&
        e.value &&
        e.value.indexOf('|')) {
      const coin = e.value.split('|');
      const defaultMode = coin[1];
      const modeToValue = { // TODO: move to utils
        spv: 0,
        native: -1,
        staking: 1,
        mining: 2,
      };
      const _value = e.value;
      let _coins = this.state.coins;

      _coins[index] = {
        selectedCoin: _value,
        spvMode: {
          disabled: _value.indexOf('spv') > -1 ? false : true,
          checked: defaultMode === 'spv' ? true : false,
        },
        nativeMode: {
          disabled: _value.indexOf('native') > -1 ? false : true,
          checked: defaultMode === 'native' ? true : false,
        },
        stakingMode: {
          disabled: _value.indexOf('staking') > -1 ? false : true,
          checked: defaultMode === 'staking' ? true : false,
        },
        miningMode: {
          disabled: _value.indexOf('mining') > -1 ? false : true,
          checked: defaultMode === 'mining' ? true : false,
        },
        mode: modeToValue[defaultMode] !== undefined ? modeToValue[defaultMode] : -2,
      }

      this.setState(Object.assign({}, this.state, {
        coins: _coins,
      }));
    }
  }

  updateSelectedMode(_value, index) {
    let _coins = this.state.coins;
    const _selectedCoin = _coins[index].selectedCoin;

    _coins[index] = {
      selectedCoin: _selectedCoin,

      spvMode: {
        disabled: _selectedCoin.indexOf('spv') > -1 ? false : true,
        checked: _value === '0' ? true : false,
      },
      nativeMode: {
        disabled: _selectedCoin.indexOf('native') > -1 ? false : true,
        checked: _value === '-1' ? true : false,
      },
      stakingMode: {
        disabled: _selectedCoin.indexOf('staking') > -1 ? false : true,
        checked: _value === '1' ? true : false,
      },
      miningMode: {
        disabled: _selectedCoin.indexOf('mining') > -1 ? false : true,
        checked: _value === '2' ? true : false,
      },
      mode: _value,
    };

    this.setState(Object.assign({}, this.state, {
      coins: _coins,
    }));
  }

  handleKeydown(e) {
    if (e.key === 'Escape') {
      this.dismiss();
    }
  }

  activateCoin() {
    const coin = this.state.coins[0].selectedCoin.split('|')[0];
    const _coin = this.state.coins[0];

    if (this.isCoinAlreadyAdded(coin)) {
      this.dismiss();
      return;
    }

    this.verifyZcashParamsExist(_coin.mode)
    .then((res) => {
      if (res) {
        const seed = this.state.loginPassphrase;

        if (seed) {
          mainWindow.setPubkey(seed, coin.toLowerCase());
        }

        if (!_coin.daemonParam) {
          Store.dispatch(addCoin(
            coin,
            _coin.mode,
          ));
        } else {
          Store.dispatch(addCoin(
            coin,
            _coin.mode,
            { type: _coin.daemonParam },
            Number(_coin.genProcLimit)
          ));
        }

        this.removeCoin();
        this.addNewItem();

        Store.dispatch(toggleAddcoinModal(false, false));

        setTimeout(() => {
          this.setState({
            loginPassphrase: '',
            seedInputVisibility: false,
            seedExtraSpaces: false,
            trimPassphraseTimer: null,
          });
        }, 100);
      }
    });
  }

  dismiss() {
    this.setState(this.defaultState);
    Store.dispatch(toggleAddcoinModal(false, false));
  }

  addNewItem() {
    let _coins = this.state.coins;
    _coins.push(this.state.defaultCoinState);

    this.setState(Object.assign({}, this.state, {
      coins: _coins,
    }));
  }

  removeCoin(index) {
    let _coins = this.state.coins;
    _coins.splice(index, 1);

    this.setState(Object.assign({}, this.state, {
      coins: _coins,
    }));
  }

  hasMoreThanOneCoin() {
    return this.state.coins.length > 1;
  }

  activateAllCoins() {
    const coin = this.state.coins[0].selectedCoin.split('|')[0];

    if (!this.isCoinAlreadyAdded(coin)) {
      Store.dispatch(
        addCoin(
          coin,
          this.state.coins[0].mode,
        )
      );
    }

    for (let i = 1; i < this.state.coins.length; i++) {
      const _item = this.state.coins[i];
      const itemCoin = _item.selectedCoin.split('|')[0];

      setTimeout(() => {
        if (!this.isCoinAlreadyAdded(itemCoin)) {
          Store.dispatch(
            addCoin(
              itemCoin,
              _item.mode,
            )
          );
        }

        if (i === this.state.coins.length - 1) {
          let _coins = [];
          _coins.push(this.state.defaultCoinState);

          this.setState(Object.assign({}, this.state, {
            coins: _coins,
          }));

          Store.dispatch(toggleAddcoinModal(false, false));

          setTimeout(() => {
            this.setState({
              loginPassphrase: '',
              seedInputVisibility: false,
              seedExtraSpaces: false,
              trimPassphraseTimer: null,
            });
          }, 100);
        }
      }, 2000 * i);
    }
  }

  renderCoinSelectors() {
    const _coins = this.state.coins;
    let items = [];

    for (let i = 0; i < _coins.length; i++) {
      const _item = _coins[i];
      const _coin = _item.selectedCoin || '';

      items.push(
        CoinSelectorsRender.call(
          this,
          _item,
          _coin,
          i
        )
      );
    }

    return items;
  }

  renderGenproclimitOptions() {
    const _max = 32;
    let _items = [];

    for (let i = 0; i < _max; i++) {
      _items.push(
        <option
          key={ `addcoin-genproclimit-${i}` }
          value={ i }>{ translate('ADD_COIN.MINING_THREADS') }: { i + 1}</option>
      );
    }

    return _items;
  }

  render() {
    return (
      AddCoinRender.call(this)
    );
  }

  isCoinAlreadyAdded(coin) {
    const modes = [
      'spv',
      'native',
      'staking',
      'mining'
    ];

    for (let mode of modes) {
      if (this.existingCoins[mode] &&
          this.existingCoins[mode].indexOf(coin) !== -1) {
        const message = `${coin} ${translate('ADD_COIN.ALREADY_ADDED')} ${translate('ADD_COIN.IN')} ${mode} ${translate('ADD_COIN.MODE')}`;

        Store.dispatch(
          triggerToaster(
            message,
            translate('ADD_COIN.COIN_ALREADY_ADDED'),
            'error'
          )
        );

        return true;
      }
    }

    return false;
  }
}

const mapStateToProps = (state) => {
  return {
    Main: state.Main,
    ActiveCoin: {
      coin: state.ActiveCoin.coin,
    },
    AddCoin: state.AddCoin,
  };
};

export default connect(mapStateToProps)(AddCoin);