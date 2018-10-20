import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeView: 'HOME',
    };
  }

  componentDidMount() {}

  static renderHomeView() {
    return (
      <div id="home-container">
        <h1>What are you looking for?</h1>

        <div id="insurance-button" className="button">
          Insurance
        </div>
        <div id="pharmacy-button" className="button">
          Pharmacy );
        </div>
      </div>
    );
  }

  static renderInsuranceView() {
    return undefined;
  }

  static renderPharmacyView() {
    return undefined;
  }

  static renderActiveView(view) {
    switch (view) {
      case 'HOME':
        return Home.renderHomeView();
      case 'INSURANCE':
        return Home.renderInsuranceView();
      case 'PHARMACY':
        return Home.renderPharmacyView();
      default:
        return Home.renderHomeView();
    }
  }

  render() {
    const { activeView } = this.state;
    return <div id="app-container">{Home.renderActiveView(activeView)}</div>;
  }
}

export default Home;
