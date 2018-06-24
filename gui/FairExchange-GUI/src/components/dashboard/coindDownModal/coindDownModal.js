import React from 'react';
import { connect } from 'react-redux';
import {
  toggleCoindDownModal,
  coindGetStdout,
  getDebugLog,
} from '../../../actions/actionCreators';
import Store from '../../../store';
import mainWindow from '../../../util/mainWindow';
import translate from '../../../translate/translate';

import CoindDownModalRender from './coindDownModal.render';

const COIND_DOWN_MODAL_FETCH_FAILURES_THRESHOLD = mainWindow.appConfig.failedRPCAttemptsThreshold || 10;

class CoindDownModal extends React.Component {
  constructor() {
    super();
    this.state = {
      display: false,
      safeMainPassiveMode: false,
      coindStdOut: translate('INDEX.LOADING') + '...',
      toggleDebugLog: true,
    };
    this.dismiss = this.dismiss.bind(this);
    this.getCoindGetStdout = this.getCoindGetStdout.bind(this);
    this.toggleDebugLog = this.toggleDebugLog.bind(this);
    this.refreshDebugLog = this.refreshDebugLog.bind(this);
  }

  refreshDebugLog() {
    const _coin = this.props.ActiveCoin.coin;

    if (!this.state.toggleDebugLog) {
      if (_coin === 'SAFE') {
        Store.dispatch(getDebugLog('safecoin', 50));
      } else {
        Store.dispatch(getDebugLog('safecoin', 50, _coin));
      }
    } else {
      this.getCoindGetStdout();
    }
  }

  toggleDebugLog() {
    this.setState({
      toggleDebugLog: !this.state.toggleDebugLog,
    });
  }

  getCoindGetStdout() {
    coindGetStdout(this.props.ActiveCoin.coin)
    .then((res) => {
      this.setState({
        coindStdOut: res.msg === 'success' ? res.result : `${translate('INDEX.ERROR_READING')} ${this.props.ActiveCoin.coin} stdout`,
      });
    });
  }

  dismiss() {
    Store.dispatch(toggleCoindDownModal(false));
  }

  componentWillMount() {
    this.setState(Object.assign({}, this.state, {
      safeMainPassiveMode: mainWindow.safeMainPassiveMode,
    }));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.displayCoindDownModal !== nextProps.displayCoindDownModal) {
      this.setState(Object.assign({}, this.state, {
        display: nextProps.displayCoindDownModal,
      }));

      if (nextProps.displayCoindDownModal) {
        this.getCoindGetStdout();
      }
    }
  }

  render() {
    if (this.state.display &&
        !this.state.safeMainPassiveMode &&
        this.props.ActiveCoin.getinfoFetchFailures >= COIND_DOWN_MODAL_FETCH_FAILURES_THRESHOLD) {
      return CoindDownModalRender.call(this);
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    ActiveCoin: {
      mode: state.ActiveCoin.mode,
      coin: state.ActiveCoin.coin,
      getinfoFetchFailures: state.ActiveCoin.getinfoFetchFailures,
    },
    displayCoindDownModal: state.Dashboard.displayCoindDownModal,
    debugLog: state.Settings.debugLog,
  };
};

export default connect(mapStateToProps)(CoindDownModal);
