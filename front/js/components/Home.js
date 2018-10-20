import React from 'react';
import zipcodes from 'zipcodes';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const axios = require('axios');

library.add(faSearch);

class Home extends React.Component {
  SAMPLE_PHARMACY_DATA = [
    {
      id: '1',
      name: 'Pharmacy 1',
      address: '123 Main St',
      city: 'NY',
      state: 'NY',
      zipcode: '10003',
      recommended: true,
      numberOfPharmacists: '1',
      otc: true,
    },
    {
      id: '2',
      name: 'Pharmacy 2',
      address: '456 Main St',
      city: 'NY',
      state: 'NY',
      zipcode: '10012',
      recommended: false,
      numberOfPharmacists: '2',
      otc: false,
    },
    {
      id: '3',
      name: 'Pharmacy 3',
      address: '789 Main St',
      city: 'NY',
      state: 'NY',
      zipcode: '10065',
      recommended: true,
      numberOfPharmacists: '5',
      otc: true,
    },
    {
      id: '4',
      name: 'Pharmacy 4',
      address: '111 Main St',
      city: 'NY',
      state: 'NY',
      zipcode: '10023',
      recommended: false,
      numberOfPharmacists: '1',
      otc: false,
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      activeView: 'INSURANCE',
      zipcode: '',
      insuranceData: [],
      pharmacyData: [],
    };

    this.switchActiveView = this.switchActiveView.bind(this);
    this.getInsuranceDataForZipCode = this.getInsuranceDataForZipCode.bind(
      this,
    );
  }

  componentDidMount() {}

  getInsuranceDataForZipCode(zipcode) {
    return axios.get(`/api/v1/plans?zip_code=${zipcode}`).then(res => {
      debugger;
      this.setState({ insuranceData: res.data });
    });
  }

  getPharmacyDataForZipcode(zipcode) {
    this.setState({ pharmacyData: this.SAMPLE_PHARMACY_DATA });
    // return axios.get(`/api/pharmacy?zipcode=${zipcode}`);
  }

  getHomeButton() {
    const { activeView } = this.state;
    if (activeView !== 'HOME')
      return (
        <button
          id="home-button"
          className="button"
          type="button"
          onClick={() => this.setState({ activeView: 'HOME' })}
        >
          Home
        </button>
      );
    return '';
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

        <div id="button-container">
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
      </div>
    );
  }

  renderInsuranceView() {
    const { insuranceData, zipcode } = this.state;

    return (
      <div id="insurance-container">
        <div id="insurance-header">
          <h1>Insurance Plans</h1>
          <div id="search-container">
            <button
              id="search-button"
              type="button"
              onClick={() => this.getInsuranceDataForZipCode(zipcode)}
            >
              <FontAwesomeIcon icon="search" />
            </button>
            <label htmlFor="zip-code">
              &nbsp;Zip Code&nbsp;
              <input
                id="zip-code"
                onChange={e => {
                  this.setState({ zipcode: e.target.value });
                }}
                onKeyPress={e =>
                  e.key === 'Enter' && this.getInsuranceDataForZipCode(zipcode)
                }
                type="textbox"
                placeholder="Zip Code"
              />
            </label>
          </div>
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
            <tbody>{Home.renderInsuranceTable(insuranceData)}</tbody>
          </table>
        </div>
      </div>
    );
  }

  renderPharmacyView() {
    const { pharmacyData, zipcode } = this.state;
    return (
      <div id="pharmacy-container">
        <div id="pharmacy-header">
          <h1>Pharmacies</h1>
          <div id="search-container">
            <button
              type="button"
              onClick={() => this.getPharmacyDataForZipcode(zipcode)}
            >
              <FontAwesomeIcon icon="search" />
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
        </div>
        <div id="pharmacy-body-container">
          <div id="pharmacy-map">MAP HERE</div>
          <div id="pharmacy-table-container">
            <table>
              <thead>
                <tr>
                  <th>&nbsp;&nbsp;&nbsp;</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Zipcode</th>
                  <th>Recommended</th>
                  <th># of Pharmacists</th>
                  <th>OTC</th>
                </tr>
              </thead>
              <tbody>{this.renderPharmacyTable(pharmacyData)}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
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

  static renderInsuranceTable(insuranceData) {
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

  renderPharmacyTable(pharmacyData) {
    const { zipcode } = this.state;

    return pharmacyData.map((datum, index) => (
      <tr key={`data-row-${datum.id}`}>
        <td>{index + 1}.</td>
        <td>{datum.name}</td>
        <td>{datum.address}</td>
        <td>{datum.city}</td>
        <td>{datum.state}</td>
        <td>{datum.zipcode}</td>
        <td>{datum.recommended}</td>
        <td>{datum.numberOfPharmacists}</td>
        <td>{datum.otc}</td>
        <td>{zipcodes.distance(zipcode, datum.zipcode)}</td>
      </tr>
    ));
  }

  render() {
    const { activeView } = this.state;
    return (
      <div id="app-container">
        <div id="logo-container">
          <img src="https://i.imgur.com/L8oQrpQ.png" alt="Plan A Logo" />
        </div>
        {this.getHomeButton()}
        {this.renderActiveView(activeView)}
      </div>
    );
  }
}

export default Home;
