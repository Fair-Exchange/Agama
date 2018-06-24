import React from 'react';
import translate from '../../../translate/translate';
import { connect } from 'react-redux';

// TODO: add currency(ies) selector option to query prices from atomic

class FiatCurrencyPanel extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <p>Fiat currency settings section to be updated soon.</p>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    Settings: state.Settings,
  };
};

export default connect(mapStateToProps)(FiatCurrencyPanel);