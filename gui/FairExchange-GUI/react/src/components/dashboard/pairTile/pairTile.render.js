import React from 'react';

const PairTileRender = function() {
  return (
    <div className="page-aside padding-top-80">
      <div className="page-aside-switch">
        <i className="icon md-chevron-left"></i>
        <i className="icon md-chevron-right"></i>
      </div>
      <div className="page-aside-inner">
       
          <div className="markets-filter">
            <select
              className="form-control select-settings grey-font"
              name="marketsFilter"
              onChange={ (event) => this.filterMarkets(event) }>
                { this.renderSelectMarketOptions() }
            </select>
          </div>
        
        <div className="wallet-widgets-list">
          <div>
            <div>
              <div className="list-group row wallet-widgets-row">
                { this.renderTiles() }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PairTileRender;