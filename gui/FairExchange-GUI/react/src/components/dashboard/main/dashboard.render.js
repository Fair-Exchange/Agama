import React from 'react';

import Navbar from '../navbar/navbar';
import CoinTile from '../coinTile/coinTile';
import EDEX from '../edex/edex';
import WalletsBalance from '../walletsBalance/walletsBalance';
import WalletsProgress from '../walletsProgress/walletsProgress';
import WalletsNav from '../walletsNav/walletsNav';
import SendCoin from '../sendCoin/sendCoin';
import WalletsData from '../walletsData/walletsData';
import Jumblr from '../jumblr/jumblr';
import Settings from '../settings/settings';
import ReceiveCoin from '../receiveCoin/receiveCoin';
import About from '../about/about';
import Support from '../support/support';
import Tools from '../tools/tools';
import WalletsMain from '../walletsMain/walletsMain';
import WalletsTxInfo from '../walletsTxInfo/walletsTxInfo';
import CoindDownModal from '../coindDownModal/coindDownModal';
import ImportKeyModal from '../importKeyModal/importKeyModal';
import ZcparamsFetchModal from '../zcparamsFetchModal/zcparamsFetchModal';
import ClaimInterestModal from '../claimInterestModal/claimInterestModal';
import SafeTrade from '../safeTrade/safeTrade';
import PairTile from '../pairTile/pairTile';
import SafeVote from '../safeVote/safeVote';
import Swissknife from '../swissknife/swissknife';
import Safenodes from '../safenodes/safenodes';

const DashboardRender = function() {
  return (
    <div className="full-height">
      <div
        className={ this.isSectionActive('wallets') || this.isSectionActive('safetrade') ? 'page-main' : '' }
        id="section-dashboard">
        <Navbar />
        <CoindDownModal />
        { this.props.Dashboard.displayImportKeyModal &&
          <ImportKeyModal />
        }
        { this.props.Dashboard.displayZcparamsModal &&
          <ZcparamsFetchModal />
        }        
        <div className={ this.isSectionActive('wallets') ? 'show' : 'hide' }>        
          <CoinTile />
          <WalletsNav />
          <WalletsTxInfo />
          <WalletsMain />
        </div>
        { this.props.SafeTrade && this.props.SafeTrade.tickers &&
          <div className={ this.isSectionActive('safetrade') ? 'show' : 'hide' }> 
            <PairTile />         
            <SafeTrade />
          </div>
        }
        { this.props.SafeVote && this.props.SafeVote.items &&
          <div className={ this.isSectionActive('safevote') ? 'show' : 'hide' }>
            <SafeVote />
          </div>
        }
        <div className={ this.isSectionActive('swissknife') ? 'show' : 'hide' }>        
          <Swissknife />
        </div>
         <div className={ this.isSectionActive('safenodes') ? 'show' : 'hide' }>        
          <Safenodes />
        </div>
        { this.isSectionActive('edex') &&
          <EDEX />
        }
        { this.isSectionActive('jumblr') &&
          <Jumblr  />
        }
        { this.isSectionActive('settings') &&
          <Settings disableWalletSpecificUI={false} />
        }
        { this.isSectionActive('about') &&
          <About />
        }
        { this.isSectionActive('support') &&
          <Support />
        }
        { this.isSectionActive('tools') &&
          <Tools />
        }
        
      </div>
    </div>
  );
};

export default DashboardRender;
