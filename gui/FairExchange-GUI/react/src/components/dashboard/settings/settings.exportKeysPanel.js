import React from 'react';
import translate from '../../../translate/translate';
import { connect } from 'react-redux';
import {
  copyCoinAddress,
  copyString,
  shepherdElectrumKeys,
  loginWithPin,
  triggerToaster,
} from '../../../actions/actionCreators';
import Store from '../../../store';
import mainWindow from '../../../util/mainWindow';
import ReactTooltip from 'react-tooltip';

const SEED_TRIM_TIMEOUT = 5000;

class ExportKeysPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      seedInputVisibility: false,
      trimPassphraseTimer: null,
      wifkeysPassphrase: '',
      keys: null,
      seedExtraSpaces: false,
      decryptedPassphrase: null,
    };
    this.defaultState = JSON.parse(JSON.stringify(this.state));
    this.exportWifKeys = this.exportWifKeys.bind(this);
    this._exportWifKeys = this._exportWifKeys.bind(this);
    this.toggleSeedInputVisibility = this.toggleSeedInputVisibility.bind(this);
    this._copyCoinAddress = this._copyCoinAddress.bind(this);
    this._copyString = this._copyString.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.Dashboard &&
        props.Dashboard.activeSection !== 'settings') {
      this.setState(this.defaultState);

      // reset input vals
      this.refs.wifkeysPassphrase.value = '';
      this.refs.wifkeysPassphraseTextarea.value = '';
    }
  }

  exportWifKeys() {
    if (mainWindow.pinAccess) {
      loginWithPin(this.state.wifkeysPassphrase, mainWindow.pinAccess)
      .then((res) => {
        if (res.msg === 'success') {
          this.setState({
            decryptedPassphrase: res.result,
          });
          this._exportWifKeys(res.result);
        }
      });
    } else {
      this._exportWifKeys(this.state.wifkeysPassphrase);
    }
  }

  _exportWifKeys(pass) {
    shepherdElectrumKeys(pass)
    .then((keys) => {
      if (keys === 'error') {
        Store.dispatch(
          triggerToaster(
            translate('SETTINGS.WRONG_PASSPHRASE') + ' ' + translate('SETTINGS.OR_WIF_FORMAT'),
            translate('TOASTR.WALLET_NOTIFICATION'),
            'error'
          )
        );
      } else {
        this.setState(Object.assign({}, this.state, {
          keys: keys.result,
          wifkeysPassphrase: '',
        }));

        // reset input vals
        this.refs.wifkeysPassphrase.value = '';
        this.refs.wifkeysPassphraseTextarea.value = '';
      }
    })
  }

  toggleSeedInputVisibility() {
    this.setState({
      seedInputVisibility: !this.state.seedInputVisibility,
    });
  }

  _copyCoinAddress(address) {
    Store.dispatch(copyCoinAddress(address));
  }

  _copyString(str, msg) {
    Store.dispatch(copyString(str, msg));
  }

  renderWifKeys() {
    const _wifKeys = this.state.keys;
    let items = [];

    if (_wifKeys) {
      for (let _key in _wifKeys) {
        items.push(
          <tr key={ _key }>
            <td className="padding-bottom-30">
              <strong className="padding-right-20">{ _key }</strong>{ _wifKeys[_key].pub }
              <button
                className="btn btn-default btn-xs clipboard-edexaddr margin-left-10"
                title={ translate('INDEX.COPY_TO_CLIPBOARD') }
                onClick={ () => this._copyCoinAddress(_wifKeys[_key].pub) }>
                <i className="icon wb-copy"></i> { translate('INDEX.COPY') }
              </button>
            </td>
            <td className="padding-bottom-30 padding-left-15">
              { _wifKeys[_key].priv }
              <button
                className="btn btn-default btn-xs clipboard-edexaddr margin-left-10"
                title={ translate('INDEX.COPY_TO_CLIPBOARD') }
                onClick={ () => this._copyCoinAddress(_wifKeys[_key].priv) }>
                <i className="icon wb-copy"></i> { translate('INDEX.COPY') }
              </button>
            </td>
          </tr>
        );
      }

      return items;
    } else {
      return null;
    }
  }

  updateInput(e) {
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

    if (e.target.name === 'wifkeysPassphrase') {
      this.resizeLoginTextarea();
    }

    this.setState({
      trimPassphraseTimer: _trimPassphraseTimer,
      [e.target.name === 'wifkeysPassphraseTextarea' ? 'wifkeysPassphrase' : e.target.name]: newValue,
    });
  }

  resizeLoginTextarea() {
    // auto-size textarea
    setTimeout(() => {
      if (this.state.seedInputVisibility) {
        document.querySelector('#wifkeysPassphraseTextarea').style.height = '1px';
        document.querySelector('#wifkeysPassphraseTextarea').style.height = `${(15 + document.querySelector('#wifkeysPassphraseTextarea').scrollHeight)}px`;
      }
    }, 100);
  }

  renderLB(_translationID) {
    const _translationComponents = translate(_translationID).split('<br>');

    return _translationComponents.map((_translation) =>
      <span key={ `settings-label-${Math.random(0, 9) * 10}` }>
        { _translation }
        <br />
      </span>
    );
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 margin-bottom-15">
            <div className="padding-bottom-20">{ this.renderLB('INDEX.ONLY_ACTIVE_WIF_KEYS') }</div>
            <div className="padding-bottom-20">
              <i>{ this.renderLB( mainWindow.pinAccess ? 'SETTINGS.EXPORT_KEYS_NOTE_PIN' : 'SETTINGS.EXPORT_KEYS_NOTE') }</i>
            </div>
            <strong>
              <i>{ translate('INDEX.PLEASE_KEEP_KEYS_SAFE') }</i>
            </strong>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 margin-bottom-20">
            <div
              className="wifkeys-form"
              autoComplete="off">
              <div className="form-group form-material floating">
                <input
                  type="password"
                  className={ !this.state.seedInputVisibility ? 'form-control' : 'hide' }
                  autoComplete="off"
                  name="wifkeysPassphrase"
                  ref="wifkeysPassphrase"
                  id="wifkeysPassphrase"
                  onChange={ this.updateInput }
                  value={ this.state.wifkeysPassphrase } />
                <textarea
                  className={ this.state.seedInputVisibility ? 'form-control blur' : 'hide' }
                  autoComplete="off"
                  id="wifkeysPassphraseTextarea"
                  ref="wifkeysPassphraseTextarea"
                  name="wifkeysPassphraseTextarea"
                  onChange={ this.updateInput }
                  value={ this.state.wifkeysPassphrase }></textarea>
                <i
                  className={ 'seed-toggle fa fa-eye' + (!this.state.seedInputVisibility ? '-slash' : '') }
                  onClick={ this.toggleSeedInputVisibility }></i>
                { !mainWindow.pinAccess &&
                  <label
                    className="floating-label"
                    htmlFor="wifkeysPassphrase">{ translate('INDEX.PASSPHRASE') } / WIF</label>
                }
                { mainWindow.pinAccess &&
                  <label
                    className="floating-label"
                    htmlFor="wifkeysPassphrase">{ translate('SETTINGS.PW_PIN') }</label>
                }
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
              <div className="col-sm-12 col-xs-12 text-align-center">
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light margin-bottom-5"
                  onClick={ this.exportWifKeys }>
                  { mainWindow.pinAccess ? translate('SETTINGS.GET_SEED_AND_WIF') : translate('INDEX.GET_WIF_KEYS') }
                </button>
              </div>
            </div>
          </div>
        </div>
        { this.state.decryptedPassphrase &&
          <div className="row">
            <div className="col-sm-12 padding-top-15 margin-left-10">
              <strong>{ translate('TOOLS.SEED') }:</strong> { this.state.decryptedPassphrase }
              <button
                className="btn btn-default btn-xs clipboard-edexaddr margin-left-10"
                title={ translate('INDEX.COPY_TO_CLIPBOARD') }
                onClick={ () => this._copyString(this.state.decryptedPassphrase, translate('SETTINGS.SEED_IS_COPIED')) }>
                <i className="icon wb-copy"></i> { translate('INDEX.COPY') }
              </button>
            </div>
          </div>
        }
        { this.state.keys &&
          <div className="row">
            <div className="col-sm-12 padding-top-15">
              <table className="table no-borders">
                <tbody>
                  <tr key={ `wif-export-table-header-pub` }>
                    <td className="padding-bottom-20 padding-top-20">
                      <strong>{ translate('SETTINGS.ADDRESS_LIST') }</strong>
                    </td>
                    <td className="padding-bottom-20 padding-top-20">
                      <strong>{ translate('SETTINGS.WIF_KEY_LIST') }</strong>
                    </td>
                  </tr>
                  { this.renderWifKeys() }
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    ActiveCoin: {
      coin: state.ActiveCoin.coin,
    },
    Settings: state.Settings,
  };
};

export default connect(mapStateToProps)(ExportKeysPanel);