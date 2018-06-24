import React from 'react';
import { connect } from 'react-redux';
import translate from '../../../translate/translate';
import { sortByDate } from 'safewallet-wallet-lib/src/utils';
import { formatValue } from 'safewallet-wallet-lib/src/utils';
import Config from '../../../config';
import {
  toggleDashboardTxInfoModal,
  changeActiveAddress,
  getDashboardUpdate,
  shepherdElectrumKVTransactionsPromise,
  shepherdElectrumTransactions,
  toggleClaimInterestModal,
  shepherdElectrumCheckServerConnection,
  shepherdElectrumSetServer,
  electrumServerChanged,
  shepherdElectrumTransactionsCSV,
  shepherdNativeTransactionsCSV,
  triggerToaster,
} from '../../../actions/actionCreators';
import Store from '../../../store';
import {
  AddressTypeRender,
  TransactionDetailRender,
  AddressRender,
  AddressItemRender,
  TxTypeRender,
  TxAmountRender,
  TxHistoryListRender,
  TxConfsRender,
  AddressListRender,
  WalletsDataRender,
} from  './walletsData.render';
import { secondsToString } from 'safewallet-wallet-lib/src/time';
import getRandomElectrumServer from '../../../util/serverRandom';
import DoubleScrollbar from 'react-double-scrollbar';
import mainWindow from '../../../util/mainWindow';

/*import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

const socket = io.connect(`http://127.0.0.1:${Config.safewalletPort}`);*/

const BOTTOM_BAR_DISPLAY_THRESHOLD = 15;

class WalletsData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsList: [],
      filteredItemsList: [],
      currentAddress: null,
      addressSelectorOpen: false,
      currentStackLength: 0,
      totalStackLength: 0,
      useCache: true,
      itemsListColumns: this.generateItemsListColumns(),
      defaultPageSize: 20,
      pageSize: 20,
      showPagination: true,
      searchTerm: null,
      coin: null,
      txhistory: null,
      loading: false,
      reconnectInProgress: false,
      kvView: false,
      kvHistory: null,
      txhistoryCopy: null,
      generatingCSV: false,
    };
    this.kvHistoryInterval = null;
    this.openDropMenu = this.openDropMenu.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.refreshTxHistory = this.refreshTxHistory.bind(this);
    this.openClaimInterestModal = this.openClaimInterestModal.bind(this);
    this.displayClaimInterestUI = this.displayClaimInterestUI.bind(this);
    this.spvAutoReconnect = this.spvAutoReconnect.bind(this);
    this.toggleKvView = this.toggleKvView.bind(this);
    this._setTxHistory = this._setTxHistory.bind(this);
    this.exportToCSV = this.exportToCSV.bind(this);
  }

  componentWillMount() {
    document.addEventListener(
      'click',
      this.handleClickOutside,
      false
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      'click',
      this.handleClickOutside,
      false
    );
  }

  exportToCSV() {
    this.setState({
      generatingCSV: true,
    });

    if (this.props.ActiveCoin.mode === 'spv') {
      shepherdElectrumTransactionsCSV(this.props.ActiveCoin.coin, this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].pub)
      .then((res) => {
        this.setState({
          generatingCSV: false,
        });

        if (res.msg === 'success') {
          Store.dispatch(
            triggerToaster(
              `${translate('INDEX.CSV_EXPORT_SAVED')} ${res.result}`,
              translate('INDEX.TX_HISTORY_EXPORT'),
              'success toastr-wide',
              false
            )
          );
        } else {
          Store.dispatch(
            triggerToaster(
              res.result,
              translate('INDEX.CSV_EXPORT_ERR'),
              'error'
            )
          );
        }
      });
    } else {
      shepherdNativeTransactionsCSV(this.props.ActiveCoin.coin)
      .then((res) => {
        this.setState({
          generatingCSV: false,
        });

        if (res.msg === 'success') {
          Store.dispatch(
            triggerToaster(
              `${translate('INDEX.CSV_EXPORT_SAVED')} ${res.result}`,
              translate('INDEX.TX_HISTORY_EXPORT'),
              'success toastr-wide',
              false
            )
          );
        } else {
          Store.dispatch(
            triggerToaster(
              res.result,
              translate('INDEX.CSV_EXPORT_ERR'),
              'error'
            )
          );
        }
      });
    }
  }

  toggleKvView() {
    this.setState({
      kvView: !this.state.kvView,
    });

    if (!this.state.kvView) {
      shepherdElectrumKVTransactionsPromise(
        this.props.ActiveCoin.coin,
        this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].pub
      )
      .then((res) => {
        // console.warn('kvHistory', res);

        if (res.msg === 'success') {
          this.setState({
            kvHistory: res.result && res.result.length ? res.result : 'no data',
            txhistoryCopy: this.state.txhistory,
            searchTerm: '',
          });

          setTimeout(() => {
            this._setTxHistory();
          }, 200);
        }
      });
    } else {
      Store.dispatch(shepherdElectrumTransactions(this.props.ActiveCoin.coin, this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].pub));
    }
  }

  displayClaimInterestUI() {
    if (this.props.ActiveCoin &&
        this.props.ActiveCoin.coin === 'SAFE' &&
        this.props.ActiveCoin.balance) {
      if (this.props.ActiveCoin.balance.interest &&
          this.props.ActiveCoin.balance.interest > 0) {
        return this.props.ActiveCoin.mode === 'spv' && mainWindow.isWatchOnly() ? -888 : 777;
      } else if (
        (this.props.ActiveCoin.balance.transparent && this.props.ActiveCoin.balance.transparent >= 10) ||
        (this.props.ActiveCoin.balance.balance && this.props.ActiveCoin.balance.balance >= 10)
      ) {
        return -777;
      }
    }
  }

  openClaimInterestModal() {
    Store.dispatch(toggleClaimInterestModal(true));
  }

  // https://react-table.js.org/#/custom-sorting
  tableSorting(a, b) { // ugly workaround, override default sort
    if (Date.parse(a)) { // convert date to timestamp
      a = Date.parse(a);
    }
    if (Date.parse(b)) {
      b = Date.parse(b);
    }
    // force null and undefined to the bottom
    a = (a === null || a === undefined) ? -Infinity : a;
    b = (b === null || b === undefined) ? -Infinity : b;
    // force any string values to lowercase
    a = typeof a === 'string' ? a.toLowerCase() : a;
    b = typeof b === 'string' ? b.toLowerCase() : b;
    // Return either 1 or -1 to indicate a sort priority
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    // returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
    return 0;
  }

  generateItemsListColumns(itemsCount) {
    let columns = [];
    let _col;

    if (this.props.ActiveCoin.mode === 'native') {
      _col = {
        Header: translate('INDEX.TYPE'),
        Footer: translate('INDEX.TYPE'),
        className: 'colum--type',
        headerClassName: 'colum--type',
        footerClassName: 'colum--type',
        Cell: AddressTypeRender(),
      };

      if (itemsCount <= BOTTOM_BAR_DISPLAY_THRESHOLD) {
        delete _col.Footer;
      }

      columns.push(_col);
    }

    _col = [{
      id: 'direction',
      Header: translate('INDEX.DIRECTION'),
      Footer: translate('INDEX.DIRECTION'),
      className: 'colum--direction',
      headerClassName: 'colum--direction',
      footerClassName: 'colum--direction',
      accessor: (tx) => TxTypeRender.call(this, tx.category || tx.type),
    },
    {
      id: 'confirmations',
      Header: translate('INDEX.CONFIRMATIONS'),
      Footer: translate('INDEX.CONFIRMATIONS'),
      headerClassName: 'hidden-xs hidden-sm',
      footerClassName: 'hidden-xs hidden-sm',
      className: 'hidden-xs hidden-sm',
      accessor: (tx) => TxConfsRender.call(this, tx.confirmations),
    },
    {
      id: 'amount',
      Header: translate('INDEX.AMOUNT'),
      Footer: translate('INDEX.AMOUNT'),
      accessor: (tx) => TxAmountRender.call(this, tx),
    },
    {
      id: 'timestamp',
      Header: translate('INDEX.TIME'),
      Footer: translate('INDEX.TIME'),
      accessor: (tx) => secondsToString(tx.timestamp || tx.time || tx.blocktime),
    }];

    if (itemsCount <= BOTTOM_BAR_DISPLAY_THRESHOLD) {
      delete _col[0].Footer;
      delete _col[1].Footer;
      delete _col[2].Footer;
      delete _col[3].Footer;
    }

    columns.push(..._col);

    _col = {
      id: 'destination-address',
      Header: translate('INDEX.DEST_ADDRESS'),
      Footer: translate('INDEX.DEST_ADDRESS'),
      accessor: (tx) => AddressRender.call(this, tx),
    };

    if (itemsCount <= BOTTOM_BAR_DISPLAY_THRESHOLD) {
      delete _col.Footer;
    }

    columns.push(_col);

    if (this.props.ActiveCoin.mode === 'spv') {
      _col = {
        id: 'tx-detail',
        Header: translate('INDEX.TX_DETAIL'),
        Footer: translate('INDEX.TX_DETAIL'),
        className: 'colum--txinfo',
        headerClassName: 'colum--txinfo',
        footerClassName: 'colum--txinfo',
        accessor: (tx) => TransactionDetailRender.call(this, tx),
      };

      if (itemsCount <= BOTTOM_BAR_DISPLAY_THRESHOLD) {
        delete _col.Footer;
      }

      columns.push(_col);
    } else {
      _col = {
        id: 'tx-detail',
        Header: translate('INDEX.TX_DETAIL'),
        Footer: translate('INDEX.TX_DETAIL'),
        className: 'colum--txinfo',
        headerClassName: 'colum--txinfo',
        footerClassName: 'colum--txinfo',
        Cell: props => TransactionDetailRender.call(this, props.index),
      };

      if (itemsCount <= BOTTOM_BAR_DISPLAY_THRESHOLD) {
        delete _col.Footer;
      }

      columns.push(_col);
    }

    if (this.state &&
        this.state.kvView) {
      columns = [];

      _col = [{
        id: 'direction',
        Header: translate('INDEX.DIRECTION'),
        Footer: translate('INDEX.DIRECTION'),
        className: 'colum--direction',
        headerClassName: 'colum--direction',
        footerClassName: 'colum--direction',
        accessor: (tx) => TxTypeRender.call(this, tx.category || tx.type),
      },
      {
        id: 'tag',
        Header: translate('KV.TAG'),
        Footer: translate('KV.TAG'),
        headerClassName: 'hidden-xs hidden-sm',
        footerClassName: 'hidden-xs hidden-sm',
        className: 'hidden-xs hidden-sm',
        accessor: (tx) => tx.opreturn.kvDecoded.tag,
      },
      {
        id: 'title',
        Header: translate('KV.TITLE'),
        Footer: translate('KV.TITLE'),
        accessor: (tx) => tx.opreturn.kvDecoded.content.title,
      },
      {
        id: 'timestamp',
        Header: translate('INDEX.TIME'),
        Footer: translate('INDEX.TIME'),
        accessor: (tx) => secondsToString(tx.timestamp || tx.time || tx.blocktime),
      },
      {
        id: 'tx-detail',
        Header: translate('KV.CONTENT'),
        Footer: translate('KV.CONTENT'),
        className: 'colum--txinfo',
        headerClassName: 'colum--txinfo',
        footerClassName: 'colum--txinfo',
        accessor: (tx) => TransactionDetailRender.call(this, tx),
      }];

      columns.push(..._col);

      if (itemsCount <= BOTTOM_BAR_DISPLAY_THRESHOLD) {
        delete _col[0].Footer;
        delete _col[1].Footer;
        delete _col[2].Footer;
        delete _col[3].Footer;
        delete _col[4].Footer;
      }
    }

    return columns;
  }

  handleClickOutside(e) {
    if (e.srcElement.className !== 'btn dropdown-toggle btn-info' &&
        (e.srcElement.offsetParent && e.srcElement.offsetParent.className !== 'btn dropdown-toggle btn-info') &&
        (e.path && e.path[4] && e.path[4].className.indexOf('showsafewalletaddrs') === -1) &&
        (e.srcElement.offsetParent && e.srcElement.offsetParent.className.indexOf('dropdown') === -1) &&
        e.srcElement.className !== 'dropdown-toggle btn-xs btn-default') {
      this.setState({
        addressSelectorOpen: false,
      });
    }
  }

  refreshTxHistory() {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);

    if (this.state.kvView) {
      shepherdElectrumKVTransactionsPromise(
        this.props.ActiveCoin.coin,
        this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].pub
      )
      .then((res) => {
        // console.warn('kvHistory', res);

        if (res.msg === 'success') {
          this.setState({
            kvHistory: res.result && res.result.length ? res.result : 'no data',
            txhistoryCopy: this.state.txhistory,
            searchTerm: '',
          });

          setTimeout(() => {
            this._setTxHistory();
          }, 200);
        }
      });
    } else {
      if (this.props.ActiveCoin.mode === 'native') {
        Store.dispatch(getDashboardUpdate(this.props.ActiveCoin.coin));
      } else if (this.props.ActiveCoin.mode === 'spv') {
        Store.dispatch(
          shepherdElectrumTransactions(
            this.props.ActiveCoin.coin,
            this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].pub
          )
        );
      }
    }
  }

  toggleTxInfoModal(display, txIndex) {
    Store.dispatch(toggleDashboardTxInfoModal(display, txIndex));
  }

  _setTxHistory(oldTxHistory) {
    const _txhistory = this.state.kvView ? this.state.kvHistory : (oldTxHistory ? oldTxHistory : this.props.ActiveCoin.txhistory);
    let _stateChange = {};

    // TODO: figure out why changing ActiveCoin props doesn't trigger comp update
    if (_txhistory &&
        _txhistory !== 'loading' &&
        _txhistory !== 'no data' &&
        _txhistory !== 'connection error or incomplete data' &&
        _txhistory !== 'cant get current height' &&
        _txhistory.length) {
      _stateChange = Object.assign({}, _stateChange, {
        itemsList: _txhistory,
        filteredItemsList: this.filterTransactions(_txhistory, this.state.searchTerm),
        txhistory: _txhistory,
        showPagination: _txhistory && _txhistory.length >= this.state.defaultPageSize,
        itemsListColumns: this.generateItemsListColumns(_txhistory.length),
        reconnectInProgress: false,
      });
    }

    if (_txhistory &&
        _txhistory === 'no data') {
      _stateChange = Object.assign({}, _stateChange, {
        itemsList: 'no data',
        reconnectInProgress: false,
      });
    } else if (
      _txhistory &&
      _txhistory === 'loading'
    ) {
      _stateChange = Object.assign({}, _stateChange, {
        itemsList: 'loading',
        reconnectInProgress: false,
      });
    } else if (
      (_txhistory && _txhistory === 'connection error or incomplete data') ||
      (_txhistory && _txhistory === 'cant get current height')
    ) {
      _stateChange = Object.assign({}, _stateChange, {
        itemsList: 'connection error',
        reconnectInProgress: this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].serverList !== 'none' ? true : false,
      });

      if (!this.state.reconnectInProgress) {
        this.spvAutoReconnect();
      }
    }

    this.setState(Object.assign({}, _stateChange));
  }

  componentWillReceiveProps(props) {
    if (props.ActiveCoin.coin !== 'BEER' &&
        props.ActiveCoin.coin !== 'PIZZA' &&
        props.ActiveCoin.coin !== 'KV') {
      this.setState({
        kvView: false,
      });
    }

    this._setTxHistory();
  }

  spvAutoReconnect() {
    if (this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].serverList !== 'none') {
      let _spvServers = this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].serverList;
      let _server = [
        this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].server.ip,
        this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].server.port,
        this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].server.proto
      ];
      const _randomServer = getRandomElectrumServer(_spvServers, _server.join(':'));

      shepherdElectrumCheckServerConnection(_randomServer.ip, _randomServer.port, _randomServer.proto)
      .then((res) => {
        if (res.result) {
          shepherdElectrumSetServer(
            this.props.ActiveCoin.coin,
            _randomServer.ip,
            _randomServer.port
          )
          .then((serverSetRes) => {
            Store.dispatch(
              triggerToaster(
                `${this.props.ActiveCoin.coin} SPV ${translate('DASHBOARD.SERVER_SET_TO')} ${_randomServer.ip}:${_randomServer.port}:${_randomServer.proto}`,
                translate('TOASTR.WALLET_NOTIFICATION'),
                'success'
              )
            );
            Store.dispatch(electrumServerChanged(true));
          });
        } else {
          Store.dispatch(
            triggerToaster(
              `${this.props.ActiveCoin.coin} SPV ${translate('DASHBOARD.SERVER_SM')} ${_randomServer.ip}:${_randomServer.port}:${_randomServer.proto} ${translate('DASHBOARD.IS_UNREACHABLE')}!`,
              translate('TOASTR.WALLET_NOTIFICATION'),
              'error'
            )
          );
        }
      });
    }
  }

  isFullySynced() {
    const _progress = this.props.ActiveCoin.progress;

    if (_progress &&
        (Number(_progress.balances) +
        Number(_progress.validated) +
        Number(_progress.bundles) +
        Number(_progress.utxo)) / 4 === 100) {
      return true;
    } else {
      return false;
    }
  }

  renderTxHistoryList() {
    if (this.state.itemsList === 'loading') {
      if (this.isFullySynced()) {
        return (
          <tr className="hover--none">
            <td
              colSpan="7"
              className="table-cell-offset-16">{ translate('INDEX.LOADING_HISTORY') }...</td>
          </tr>
        );
      } else {
        return (
          <tr className="hover--none">
            <td
              colSpan="7"
              className="table-cell-offset-16">{ translate('INDEX.SYNC_IN_PROGRESS') }...</td>
          </tr>
        );
      }
    } else if (this.state.itemsList === 'no data') {
      return (
        <tr className="hover--none">
          <td
            colSpan="7"
            className="table-cell-offset-16">{ translate('INDEX.NO_DATA') }</td>
        </tr>
      );
    } else if (this.state.itemsList === 'connection error') {
      return (
        <tr className="hover--none">
          <td
            colSpan="7"
            className="table-cell-offset-16">
            <div className="color-warning">
              { translate('DASHBOARD.SPV_CONN_ERROR') }
            </div>
            <div className={ this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].serverList !== 'none' ? '' : 'hide' }>
              <div className="color-warning">{ translate('DASHBOARD.SPV_AUTO_SWITCH') }...</div>
              <br />
              <strong>{ translate('DASHBOARD.HOW_TO_SWITCH_MANUALLY') }:</strong>
              <br/>{ translate('DASHBOARD.SPV_CONN_ERROR_P1') }
            </div>
          </td>
        </tr>
      );
    } else if (this.state.itemsList && this.state.itemsList.length) {
      return (
        <DoubleScrollbar>
          { TxHistoryListRender.call(this) }
          <div className="margin-left-5 margin-top-30">
            <span
              className="pointer"
              onClick={ this.exportToCSV }>
              <i className="icon fa-file-excel-o margin-right-10"></i>{ this.state.generatingCSV ? translate('INDEX.GENERATING_CSV') + '...' : translate('INDEX.EXPORT_TO_CSV') }
            </span>
          </div>
        </DoubleScrollbar>
      );
    }

    return null;
  }

  onPageSizeChange(pageSize, pageIndex) {
    this.setState(Object.assign({}, this.state, {
      pageSize: pageSize,
      showPagination: this.state.itemsList && this.state.itemsList.length >= this.state.defaultPageSize,
    }));
  }

  updateAddressSelection(address) {
    Store.dispatch(changeActiveAddress(address));

    this.setState(Object.assign({}, this.state, {
      currentAddress: address,
      addressSelectorOpen: false,
    }));
  }

  openDropMenu() {
    this.setState(Object.assign({}, this.state, {
      addressSelectorOpen: !this.state.addressSelectorOpen,
    }));
  }

  renderAddressByType(type) {
    const _addresses = this.props.ActiveCoin.addresses;
    const _coin = this.props.ActiveCoin.coin;

    if (_addresses &&
        _addresses[type] &&
        _addresses[type].length) {
      let items = [];

      for (let i = 0; i < _addresses[type].length; i++) {
        const address = _addresses[type][i].address;
        let _amount = _addresses[type][i].amount;

        if (_amount !== 'N/A') {
          _amount = formatValue(_amount);
        }

        items.push(
          AddressItemRender.call(this, address, type, _amount, _coin)
        );
      }

      return items;
    }

    return null;
  }

  hasPublicAddresses() {
    return this.props.ActiveCoin.addresses &&
      this.props.ActiveCoin.addresses.public &&
      this.props.ActiveCoin.addresses.public.length;
  }

  renderAddressAmount() {
    if (this.hasPublicAddresses()) {
      const _addresses = this.props.ActiveCoin.addresses;
      const _coin = this.props.ActiveCoin.coin;

      for (let i = 0; i < _addresses.public.length; i++) {
        if (_addresses.public[i].address === this.state.currentAddress) {
          if (_addresses.public[i].amount &&
              _addresses.public[i].amount !== 'N/A') {
            let _amount = _addresses.public[i].amount;

            if (_amount !== 'N/A') {
              _amount = formatValue(_amount);
            }

            return _amount;
          } else {
            const address = _addresses.public[i].address;
            let _amount = _addresses.public[i].amount;

            if (_amount !== 'N/A') {
              _amount = formatValue(_amount);
            }

            return _amount;
          }
        }
      }
    } else {
      return 0;
    }
  }

  renderSelectorCurrentLabel() {
    const _currentAddress = this.state.currentAddress;

    if (_currentAddress) {
      return (
        <span>
          <i className={ 'icon fa-eye' + (this.state.addressType === 'public' ? '' : '-slash') }></i>&nbsp;&nbsp;
          <span className="text">
            [ { this.renderAddressAmount() } { this.props.ActiveCoin.coin } ]&nbsp;&nbsp;
            { _currentAddress }
          </span>
        </span>
      );
    } else {
      return (
        <span>{ translate('INDEX.FILTER_BY_ADDRESS') }</span>
      );
    }
  }

  onSearchTermChange(newSearchTerm) {
    this.setState(Object.assign({}, this.state, {
      searchTerm: newSearchTerm,
      filteredItemsList: this.filterTransactions(this.state.itemsList, newSearchTerm),
    }));
  }

  filterTransactions(txList, searchTerm) {
    return txList.filter(tx => this.filterTransaction(tx, searchTerm));
  }

  filterTransaction(tx, term) {
    if (!term) {
      return true;
    }

    return this.contains(tx.address, term) ||
      this.contains(tx.confirmations, term) ||
      this.contains(tx.amount, term) ||
      this.contains(tx.type, term) ||
      this.contains(secondsToString(tx.blocktime || tx.timestamp || tx.time), term);
  }

  contains(value, property) {
    return (value + '').indexOf(property) !== -1;
  }

  isActiveCoinMode(coinMode) {
    return this.props.ActiveCoin.mode === coinMode;
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin &&
        this.props.ActiveCoin.coin &&
        this.props.ActiveCoin.activeSection === 'default') {
      return WalletsDataRender.call(this);
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
      send: state.ActiveCoin.send,
      receive: state.ActiveCoin.receive,
      balance: state.ActiveCoin.balance,
      cache: state.ActiveCoin.cache,
      activeSection: state.ActiveCoin.activeSection,
      activeAddress: state.ActiveCoin.activeAddress,
      lastSendToResponse: state.ActiveCoin.lastSendToResponse,
      addresses: state.ActiveCoin.addresses,
      txhistory: state.ActiveCoin.txhistory,
      showTransactionInfo: state.ActiveCoin.showTransactionInfo,
      progress: state.ActiveCoin.progress,
    },
    Main: state.Main,
    Dashboard: state.Dashboard,
  };
};

export default connect(mapStateToProps)(WalletsData);