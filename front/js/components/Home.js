import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeView: 'HOME',
    };

    this.switchActiveView = this.switchActiveView.bind(this);
  }

  componentDidMount() {}

  switchActiveView(activeView) {
    this.setState({ activeView });
  }

  renderHomeView() {
    return (
      <div id="home-container">
        <h1>What are you looking for?</h1>

        <div
          id="insurance-button"
          className="button"
          onClick={() => this.switchActiveView('INSURANCE')}
        >
          Insurance
        </div>
        <div
          id="pharmacy-button"
          className="button"
          onClick={() => this.switchActiveView('PHARMACY')}
        >
          Pharmacy
        </div>
      </div>
    );
  }

  renderInsuranceView() {
    return undefined;
  }

  renderPharmacyView() {
    return undefined;
  }

  renderActiveView(view) {
    switch (view) {
      default:
      case 'HOME':
        return this.renderHomeView();
      case 'INSURANCE':
        return this.renderInsuranceView();
      case 'PHARMACY':
        return this.renderPharmacyView();
    }
  }

  render() {
    const { activeView } = this.state;
    return <div id="app-container">{this.renderActiveView(activeView)}</div>;
  }
}

export default Home;
