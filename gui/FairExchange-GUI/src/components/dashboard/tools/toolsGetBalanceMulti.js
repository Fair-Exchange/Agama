import React from 'react';
import translate from '../../../translate/translate';
import Select from 'react-select';
import {
  triggerToaster,
  shepherdToolsMultiAddressBalance,
} from '../../../actions/actionCreators';
import Store from '../../../store';

class ToolsGetBalanceMulti extends React.Component {
  constructor() {
    super();
    this.state = {
      balanceAddr: '',
      balanceCoin: 'SAFE|spv',
      balanceResult: null,
    };
    this.updateInput = this.updateInput.bind(this);
    this.updateSelectedCoin = this.updateSelectedCoin.bind(this);
    this.getBalanceAlt = this.getBalanceAlt.bind(this);
  }

  getBalanceAlt() {
    // const _coin = this.state.balanceCoin.split('|');
    const _addr = this.state.balanceAddr.split('\n');

    if (_addr &&
        _addr.length) {
      shepherdToolsMultiAddressBalance(_addr.join(','))
      .then((res) => {
        if (res.msg === 'success') {
          if (!res.result.length) {
            Store.dispatch(
              triggerToaster(
                translate('TOOLS.ALL_BALANCES_ARE_EMPTY'),
                translate('TOOLS.GET_BALANCE') + ' multi',
                'warning'
              )
            );
          }

          this.setState({
            balanceResult: res.result,
          });
        } else {
          shepherdToolsMultiAddressBalance(_addr.join(','), true)
          .then((res) => {
            if (res.msg === 'success') {
              if (!res.result.length) {
                Store.dispatch(
                  triggerToaster(
                    translate('TOOLS.ALL_BALANCES_ARE_EMPTY'),
                    translate('TOOLS.GET_BALANCE') + ' multi',
                    'warning'
                  )
                );
              }

              this.setState({
                balanceResult: res.result,
              });
            } else {
              Store.dispatch(
                triggerToaster(
                  res.result + (res.code ? ` code: ${res.code}` : ''),
                  translate('TOOLS.ERR_GET_BALANCE') + ' multi',
                  'error'
                )
              );
            }
          });
        }
      });
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

  updateSelectedCoin(e, propName) {
    if (e &&
        e.value &&
        e.value.indexOf('|')) {
      this.setState({
        [propName]: e.value,
      });
    }
  }

  updateInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  renderBalances() {
    const _balances = this.state.balanceResult;
    let balances = {};
    let _items = [];

    if (_balances &&
        _balances.length) {
      for (let i = 0; i < _balances.length; i++) {
        if (!balances[_balances[i].address]) {
          balances[_balances[i].address] = Number(_balances[i].amount);
        } else {
          balances[_balances[i].address] += Number(_balances[i].amount);
        }
      }

      for (let key in balances) {
        _items.push(
          <tr key={ `tools-balances-multi-${key}` }>
            <td className="blur">{ key }</td>
            <td>{ balances[key] } SAFE</td>
          </tr>
        );
      }

      return (
        <table className="table table-hover dataTable table-striped tools-balance-multi-table">
          <thead>
            <tr>
              <th>{ translate('INDEX.ADDRESS') }</th>
              <th>{ translate('INDEX.AMOUNT') }</th>
            </tr>
          </thead>
          <tbody>
          { _items }
          </tbody>
          <tfoot>
            <tr>
              <th>{ translate('INDEX.ADDRESS') }</th>
              <th>{ translate('INDEX.AMOUNT') }</th>
            </tr>
          </tfoot>
        </table>
      );
    }
  }

  render() {
    return (
      <div className="row margin-left-10">
        <div className="col-xlg-12 form-group form-material no-padding-left padding-bottom-10">
          <h4>{ translate('TOOLS.GET_BALANCE') } multi</h4>
          <div className="margin-top-20">{ translate('TOOLS.GET_BALANCE_MULTI_SAFE') }</div>
          <div className="margin-top-15">{ translate('TOOLS.REMOTE_CALL_EXPLORER_ACKNOWLEDGEMENT') }</div>
        </div>
        <div className="col-xlg-12 form-group form-material no-padding-left padding-top-20 padding-bottom-70">
          <label
            className="control-label col-sm-1 no-padding-left"
            htmlFor="safeWalletSendTo">{ translate('TOOLS.COIN') }</label>
          <Select
            name="balanceCoin"
            className="col-sm-3"
            value={ this.state.balanceCoin }
            onChange={ (event) => this.updateSelectedCoin(event, 'balanceCoin') }
            optionRenderer={ this.renderCoinOption }
            valueRenderer={ this.renderCoinOption }
            options={[{
              label: 'Safecoin (SAFE)',
              icon: 'SAFE',
              value: `SAFE|spv`,
            }]} />
        </div>
        <div className="col-sm-12 form-group form-material no-padding-left">
          <label
            className="control-label col-sm-3 no-padding-left padding-bottom-10"
            htmlFor="safeWalletSendTo">{ translate('TOOLS.ADDR') }</label>
        </div>
        <div className="col-sm-12 form-group form-material no-padding-left">
          <textarea
            className="form-control placeholder-no-fix height-100 col-sm-3 blur"
            id="walletseed"
            name="balanceAddr"
            onChange={ this.updateInput }
            value={ this.state.balanceAddr }
            placeholder={ translate('TOOLS.ADDRESS_MULTI') }></textarea>
        </div>
        <div className="col-sm-12 form-group form-material no-padding-left margin-top-10 padding-bottom-10">
          <button
            type="button"
            className="btn btn-info col-sm-2"
            onClick={ this.getBalanceAlt }>
            { translate('TOOLS.BALANCE') }
          </button>
        </div>
        { this.renderBalances() }
      </div>
    );
  }
}

export default ToolsGetBalanceMulti;