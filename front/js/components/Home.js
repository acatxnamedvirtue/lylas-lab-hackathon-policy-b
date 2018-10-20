import React from 'react';
import { AxiosInstance as axios } from 'axios';

class Home extends React.Component {
  SAMPLE_INSURANCE_DATA = [
    {
      id: '1',
      name: 'name1',
      medal: 'medal1',
      ec: 'ec1',
      cost: 'cost1',
      pre: 'pre1',
    },
    {
      id: '2',
      name: 'name2',
      medal: 'medal2',
      ec: 'ec2',
      cost: 'cost2',
      pre: 'pre2',
    },
    {
      id: '3',
      name: 'name3',
      medal: 'medal3',
      ec: 'ec3',
      cost: 'cost3',
      pre: 'pre3',
    },
    {
      id: '4',
      name: 'name4',
      medal: 'medal4',
      ec: 'ec4',
      cost: 'cost4',
      pre: 'pre4',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      activeView: 'HOME',
      zipcode: '',
      insuranceData: [],
    };

    this.switchActiveView = this.switchActiveView.bind(this);
  }

  componentDidMount() {}

  getInsuranceDataForZipCode(zipcode) {
    this.setState({ insuranceData: this.SAMPLE_INSURANCE_DATA });
    // return axios.get(`/api/get_insurance_data?zipcode=${zipcode}`);
  }

  switchActiveView(activeView) {
    this.setState({ activeView });
  }

  renderHomeView() {
    return (
      <div id="home-container">
        <div id="header-container">
          <h1>What are you looking for?</h1>
        </div>

        <button
          type="button"
          id="insurance-button"
          className="button"
          onClick={() => this.switchActiveView('INSURANCE')}
        >
          Insurance
        </button>
        <button
          type="button"
          id="pharmacy-button"
          className="button"
          onClick={() => this.switchActiveView('PHARMACY')}
        >
          Pharmacy
        </button>
      </div>
    );
  }

  renderInsuranceView() {
    const { insuranceData, zipcode } = this.state;
    return (
      <div id="insurance-container">
        <div id="insurance-header">
          <h1>Insurance Plans</h1>
          <button
            type="button"
            onClick={() => this.getInsuranceDataForZipCode(zipcode)}
          >
            <i className="fa fa-search" />
          </button>
          <label htmlFor="zip-code">
            Zip Code
            <input
              id="zip-code"
              onChange={e => {
                this.setState({ zipcode: e.target.value });
              }}
              type="textbox"
              placeholder="Zip Code"
            />
          </label>
        </div>

        <div id="insurance-table-container">
          <table>
            <thead>
              <tr>
                <th>&nbsp;&nbsp;&nbsp;</th>
                <th>Name</th>
                <th>Medal</th>
                <th>EC</th>
                <th>Cost</th>
                <th>Pre.</th>
              </tr>
            </thead>
            <tbody>{this.renderInsuranceTable(insuranceData)}</tbody>
          </table>
        </div>
      </div>
    );
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

  renderInsuranceTable(insuranceData) {
    return insuranceData.map((datum, index) => (
      <tr key={`data-row-${datum.id}`}>
        <td>{index + 1}.</td>
        <td>{datum.name}</td>
        <td>{datum.medal}</td>
        <td>{datum.ec}</td>
        <td>{datum.cost}</td>
        <td>{datum.pre}</td>
      </tr>
    ));
  }

  render() {
    const { activeView } = this.state;
    return <div id="app-container">{this.renderActiveView(activeView)}</div>;
  }
}

export default Home;
