import React from 'react';
import translate from '../../translate/translate';
import addCoinOptionsCrypto from '../addcoin/addcoinOptionsCrypto';
import addCoinOptionsAC from '../addcoin/addcoinOptionsAC';
// import addCoinOptionsACFiat from '../addcoin/addcoinOptionsACFiat';
import mainWindow from '../../util/mainWindow';
import Select from 'react-select';
import ReactTooltip from 'react-tooltip';
import { acConfig } from '../addcoin/payload';

const CoinSelectorsRender = function(item, coin, i) {
  const _modesEnum = [
    'native',
    'spv',
    'mining',
    'staking'
  ];
  let _availModes = {};
  let _coinName;

  if (item &&
      item.selectedCoin) {
    const _itemSplit = item.selectedCoin.split('|');
    _coinName = _itemSplit[0];

    for (let i = 0; i < _modesEnum.length; i++) {
      const mode = _itemSplit.find((item) => {
        return item === _modesEnum[i];
      });

      if (mode) {
        _availModes[mode] = true;
      }
    }
  }

  return (
    <div
      className={ this.hasMoreThanOneCoin() ? 'multi' : 'single' }
      key={ `add-coin-${i}` }>
      <div className={ (this.hasMoreThanOneCoin() ? 'col-sm-10' : 'col-sm-8') + (!this.hasMoreThanOneCoin() ? ' padding-left-none' : ' padding-left-15') }>
        <div className={ (this.hasMoreThanOneCoin() && ((item.mode === '-1' || item.mode === -1) || (item.mode === '1' || item.mode === 1) || (item.mode === '2' || item.mode === 2)) ? 'col-sm-6 form-group' : 'form-group') + (this.hasMoreThanOneCoin() ? ' padding-left-none' : ' padding-left-15') }>
          <Select
            name="selectedCoin"
            value={ coin }
            onChange={ (event) => this.updateSelectedCoin(event, i) }
            optionRenderer={ this.renderCoinOption }
            valueRenderer={ this.renderCoinOption }
            options={ addCoinOptionsCrypto().concat(addCoinOptionsAC()) } />
        </div>
        <div className={ this.hasMoreThanOneCoin() && ((item.mode === '-1' || item.mode === -1) || (item.mode === '1' || item.mode === 1) || (item.mode === '2' || item.mode === 2)) ? 'col-sm-6' : 'hide' }>
          <div className="toggle-box padding-bottom-10">
            <select
              className="form-control form-material"
              name="daemonParam"
              onChange={ (event) => this.updateDaemonParam(event, i) }
              autoFocus>
              <option>{ translate('INDEX.DAEMON_PARAM') }: { translate('ADD_COIN.NONE') }</option>
              <option value="silent">{ translate('INDEX.DAEMON_PARAM') }: { translate('INDEX.BACKGROUND_PROCESS') }</option>
              <option value="reindex">{ translate('INDEX.DAEMON_PARAM') }: { translate('INDEX.REINDEX') }</option>
              <option value="rescan">{ translate('INDEX.DAEMON_PARAM') }: { translate('INDEX.RESCAN') }</option>
              <option value="gen">{ translate('INDEX.DAEMON_PARAM') }: gen</option>
            </select>
          </div>
        </div>
      </div>
      <div className={ this.hasMoreThanOneCoin() ? 'hide' : 'col-sm-4' }>
        <button
          type="button"
          className="btn btn-primary"
          onClick={ () => this.activateCoin(i) }
          disabled={ item.mode === -2 }>
          { translate('INDEX.ACTIVATE_COIN') }
        </button>
      </div>
      <div className="col-sm-11 text-center add-coin-modes">
        { _availModes.spv &&
          <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6 style-addcoin-lbl-mdl-login">
            <input
              type="radio"
              className="to-labelauty labelauty"
              name={ `mode-${i}` }
              id={ `addcoin_mdl_basilisk_mode_login-${i}` }
              disabled={ item.spvMode.disabled }
              checked={ item.spvMode.checked } />
            <label
              htmlFor={ `addcoin_mdl_basilisk_mode_login-${i}` }
              onClick={ () => this.updateSelectedMode('0', i) }
              style={{ pointerEvents: item.spvMode.disabled ? 'none' : 'all' }}>
              <span
                className="labelauty-unchecked-image"
                style={{ display: item.spvMode.checked ? 'none' : 'inline-block' }}></span>
              <span
                className="labelauty-unchecked"
                style={{ display: item.spvMode.checked ? 'none' : 'inline-block' }}>
                { translate('INDEX.SPV_MODE') }
              </span>
              <span
                className="labelauty-checked-image"
                style={{ display: item.spvMode.checked ? 'inline-block' : 'none' }}></span>
              <span
                className="labelauty-checked"
                style={{ display: item.spvMode.checked ? 'inline-block' : 'none' }}>
                { translate('INDEX.SPV_MODE') }
              </span>
            </label>
          </div>
        }
        { mainWindow.arch === 'x64' &&
          _availModes.native &&
          <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6 padding-left-none">
            <input
              type="radio"
              className="to-labelauty labelauty"
              name={ `mode-${i}` }
              id={ `addcoin_mdl_native_mode_login-${i}` }
              disabled={ item.nativeMode.disabled }
              checked={ item.nativeMode.checked } />
            <label
              htmlFor={ `addcoin_mdl_native_mode_login-${i}` }
              onClick={ () => this.updateSelectedMode('-1', i) }
              style={{ pointerEvents: item.nativeMode.disabled ? 'none' : 'all' }}>
              <span
                className="labelauty-unchecked-image"
                style={{ display: item.nativeMode.checked ? 'none' : 'inline-block' }}></span>
              <span
                className="labelauty-unchecked"
                style={{ display: item.nativeMode.checked ? 'none' : 'inline-block' }}>
                { translate('INDEX.NATIVE_MODE') }
              </span>
              <span
                className="labelauty-checked-image"
                style={{ display: item.nativeMode.checked ? 'inline-block' : 'none' }}></span>
              <span
                className="labelauty-checked"
                style={{ display: item.nativeMode.checked ? 'inline-block' : 'none' }}>
                { translate('INDEX.NATIVE_MODE') }
              </span>
            </label>
          </div>
        }
        { mainWindow.arch === 'x64' &&
          _availModes.staking &&
          <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6 padding-left-none">
            <input
              type="radio"
              className="to-labelauty labelauty"
              name={ `mode-${i}` }
              id={ `addcoin_mdl_staking_mode_login-${i}` }
              disabled={ item.stakingMode.disabled }
              checked={ item.stakingMode.checked } />
            <label
              htmlFor={ `addcoin_mdl_staking_mode_login-${i}` }
              onClick={ () => this.updateSelectedMode('1', i) }
              style={{ pointerEvents: item.stakingMode.disabled ? 'none' : 'all' }}>
              <span
                className="labelauty-unchecked-image"
                style={{ display: item.stakingMode.checked ? 'none' : 'inline-block' }}></span>
              <span
                className="labelauty-unchecked"
                style={{ display: item.stakingMode.checked ? 'none' : 'inline-block' }}>
                { translate('INDEX.STAKING_MODE') }
              </span>
              <span
                className="labelauty-checked-image"
                style={{ display: item.stakingMode.checked ? 'inline-block' : 'none' }}></span>
              <span
                className="labelauty-checked"
                style={{ display: item.stakingMode.checked ? 'inline-block' : 'none' }}>
                { translate('INDEX.STAKING_MODE') }
              </span>
            </label>
          </div>
        }
        { mainWindow.arch === 'x64' &&
          _availModes.mining &&
          <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6 padding-left-none">
            <input
              type="radio"
              className="to-labelauty labelauty"
              name={ `mode-${i}` }
              id={ `addcoin_mdl_mining_mode_login-${i}` }
              disabled={ item.miningMode.disabled }
              checked={ item.miningMode.checked } />
            <label
              htmlFor={ `addcoin_mdl_mining_mode_login-${i}` }
              onClick={ () => this.updateSelectedMode('2', i) }
              style={{ pointerEvents: item.miningMode.disabled ? 'none' : 'all' }}>
              <span
                className="labelauty-unchecked-image"
                style={{ display: item.miningMode.checked ? 'none' : 'inline-block' }}></span>
              <span
                className="labelauty-unchecked"
                style={{ display: item.miningMode.checked ? 'none' : 'inline-block' }}>
                { translate('INDEX.MINING_MODE') }
              </span>
              <span
                className="labelauty-checked-image"
                style={{ display: item.miningMode.checked ? 'inline-block' : 'none' }}></span>
              <span
                className="labelauty-checked"
                style={{ display: item.miningMode.checked ? 'inline-block' : 'none' }}>
                { translate('INDEX.MINING_MODE') }
              </span>
            </label>
          </div>
        }
      </div>
      <div className={ this.hasMoreThanOneCoin() && i !== 0 ? 'col-sm-1' : 'hide' }>
        <button
          type="button"
          className="btn btn-primary"
          onClick={ () => this.removeCoin(i) }>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
      { item.stakingMode.checked &&
        <div className="col-sm-12 margin-top-20 margin-bottom-30 no-padding">
          <div className="form-material col-sm-12 margin-bottom-20">
            <p>{ translate('ADD_COIN.STAKING_PUB_P1') }</p>
            <p>{ translate('ADD_COIN.STAKING_PUB_P2') }</p>
          </div>
          <div className="form-group form-material floating col-sm-12">
            <input
              type="password"
              name="loginPassphrase"
              ref="loginPassphrase"
              className={ !this.state.seedInputVisibility ? 'form-control' : 'hide' }
              onChange={ this.updateLoginPassPhraseInput }
              onKeyDown={ (event) => this.handleKeydown(event) }
              autoComplete="off"
              value={ this.state.loginPassphrase || '' } />
            <textarea
              className={ this.state.seedInputVisibility ? 'form-control' : 'hide' }
              id="loginPassphrase"
              ref="loginPassphraseTextarea"
              name="loginPassphraseTextarea"
              autoComplete="off"
              onChange={ this.updateLoginPassPhraseInput }
              onKeyDown={ (event) => this.handleKeydown(event) }
              value={ this.state.loginPassphrase || '' }></textarea>
            <i
              className={ 'seed-toggle fa fa-eye' + (!this.state.seedInputVisibility ? '-slash' : '') }
              onClick={ this.toggleSeedInputVisibility }></i>
            <label
              className="floating-label"
              htmlFor="inputPassword">{ translate('INDEX.WALLET_SEED') }</label>
          </div>
          { this.state.seedExtraSpaces &&
            <span>
              <i className="icon fa-warning seed-extra-spaces-warning"
                data-tip={ translate('LOGIN.SEED_TRAILING_CHARS') }
                data-html={ true }></i>
              <ReactTooltip
                effect="solid"
                className="text-left" />
            </span>
          }
        </div>
      }
      <div className={ !this.hasMoreThanOneCoin() && ((item.mode === '-1' || item.mode === -1) || (item.mode === '1' || item.mode === 1) || (item.mode === '2' || item.mode === 2)) ? 'col-sm-5 padding-bottom-30' : 'hide' }>
        <div className="toggle-box padding-top-3 padding-bottom-10">
          <select
            className="form-control form-material"
            name="daemonParam"
            onChange={ (event) => this.updateDaemonParam(event, i) }
            autoFocus>
            <option>{ translate('INDEX.DAEMON_PARAM') }: { translate('ADD_COIN.NONE') }</option>
            <option value="silent">{ translate('INDEX.DAEMON_PARAM') }: { translate('INDEX.BACKGROUND_PROCESS') }</option>
            <option value="reindex">{ translate('INDEX.DAEMON_PARAM') }: { translate('INDEX.REINDEX') }</option>
            <option value="rescan">{ translate('INDEX.DAEMON_PARAM') }: { translate('INDEX.RESCAN') }</option>
            <option value="gen">{ translate('INDEX.DAEMON_PARAM') }: gen</option>
          </select>
        </div>
      </div>
      <div className="col-sm-12 no-padding">
        <div className={ item.daemonParam === 'gen' && acConfig[_coinName] && acConfig[_coinName].genproclimit ? 'col-sm-5 padding-bottom-30' : 'hide' }>
          <div className="toggle-box padding-bottom-10">
            <select
              className="form-control form-material"
              name="genProcLimit"
              onChange={ (event) => this.updateDaemonParam(event, i) }
              autoFocus>
              { this.renderGenproclimitOptions() }
            </select>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CoinSelectorsRender;