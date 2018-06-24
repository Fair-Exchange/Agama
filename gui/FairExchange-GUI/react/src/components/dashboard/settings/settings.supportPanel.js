import React from 'react';
import { translate } from '../../../translate/translate';

class SupportPanel extends React.Component {
  constructor() {
    super();
  }

  openExternalWindow(url) {
    const remote = window.require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    const externalWindow = new BrowserWindow({
      width: 1280,
      height: 800,
      title: `${translate('INDEX.LOADING')}...`,
      icon: remote.getCurrentWindow().iguanaIcon,
    });

    externalWindow.loadURL(url);
    externalWindow.webContents.on('did-finish-load', () => {
      setTimeout(() => {
        externalWindow.show();
      }, 40);
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 no-padding-left">
          <div className="support-box-wrapper">
            <div
              className="support-box"
              onClick={ () => this.openExternalWindow('http://support.supernet.org') }>
              <img
                src="assets/images/cryptologo/supernet.png"
                alt={ translate('SETTINGS.SUPPORT_TICKETS') } />
              <div className="support-box-title">{ translate('SETTINGS.SUPPORT_TICKETS') }</div>
              <div className="support-box-link">support.supernet.org</div>
            </div>
          </div>
          <div className="support-box-wrapper">
            <div
              className="support-box"
              onClick={ () => this.openExternalWindow('https://sprnt.slack.com') }>
              <img
                src="assets/images/support/slack-icon.png"
                alt="Slack" />
              <div className="support-box-title">Slack</div>
              <div className="support-box-link">sprnt.slack.com</div>
            </div>
          </div>
          <div className="support-box-wrapper">
            <div
              className="support-box"
              onClick={ () => this.openExternalWindow('http://slackinvite.supernet.org/') }>
              <img
                src="assets/images/support/slack-invite-icon.png"
                alt={ translate('SETTINGS.GET_SLACK_INVITE') } />
              <div className="support-box-title">{ translate('SETTINGS.GET_SLACK_INVITE') }</div>
              <div className="support-box-link">slackinvite.supernet.org</div>
            </div>
          </div>
          <div className="support-box-wrapper">
            <div
              className="support-box"
              onClick={ () => this.openExternalWindow('https://github.com/KomodoPlatform/Agama') }>
              <img
                src="assets/images/support/github-icon.png"
                alt="Github" />
              <div className="support-box-title">Github</div>
              <div className="support-box-link">github.com/KomodoPlatform/Agama</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default SupportPanel;