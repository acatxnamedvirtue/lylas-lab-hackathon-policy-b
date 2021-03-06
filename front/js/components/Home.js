import React from 'react';
import zipcodes from 'zipcodes';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faThumbsDown,
  faThumbsUp,
  faCapsules,
} from '@fortawesome/free-solid-svg-icons';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const axios = require('axios');

library.add(faSearch);
library.add(faThumbsDown);
library.add(faThumbsUp);
library.add(faCapsules);

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={14} center={props.defaultCenter}>
      {props.isMarkerShown && props.markers}
    </GoogleMap>
  )),
);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.getGoogleMapsKey();

    this.state = {
      activeView: 'HOME',
      zipcode: '',
      insuranceData: [],
      pharmacyData: [],
      mapsKey: '',
      defaultCenter: { lat: 1, lng: 1 },
    };

    this.switchActiveView = this.switchActiveView.bind(this);
    this.getInsuranceDataForZipCode = this.getInsuranceDataForZipCode.bind(
      this,
    );
  }

  getInsuranceDataForZipCode(zipcode) {
    return axios.get(`/api/v1/plans?zip_code=${zipcode}`).then(res => {
      this.setState({ insuranceData: res.data });
    });
  }

  getPharmacyDataForZipcode(zipcode) {
    return axios.get(`/api/v1/pharmacies?zip_code=${zipcode}`).then(res => {
      this.setState({
        defaultCenter: {
          lat: res.data[0].latitude,
          lng: res.data[0].longitude,
        },
        pharmacyData: res.data,
      });
    });
  }

  getGoogleMapsKey() {
    return axios.get('/api/v1/map').then(res => {
      this.setState({ mapsKey: res.data.map_key });
    });
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

  static getMapMarkers(pharmacyData) {
    return pharmacyData.map(pharmacy => {
      return (
        <Marker
          key={pharmacy.id}
          position={{ lat: pharmacy.latitude, lng: pharmacy.longitude }}
        />
      );
    });
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
                <th>Metal</th>
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
    const { pharmacyData, zipcode, mapsKey, defaultCenter } = this.state;
    const isMarkerShown = true;
    return (
      <div id="pharmacy-container">
        <div id="pharmacy-header">
          <h1>Pharmacies</h1>

          <div id="search-container">
            <button
              id="search-button"
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
                onKeyPress={e =>
                  e.key === 'Enter' && this.getPharmacyDataForZipcode(zipcode)
                }
                type="textbox"
                placeholder="Zip Code"
              />
            </label>
          </div>
        </div>
        <div id="pharmacy-body-container">
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
                  <th>Dist (mi)</th>
                </tr>
              </thead>
              <tbody>{this.renderPharmacyTable(pharmacyData)}</tbody>
            </table>
          </div>
          <div id="pharmacy-map">
            {pharmacyData.length > 0 && (
              <Map
                isMarkerShown={isMarkerShown}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapsKey}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                markers={
                  pharmacyData.length > 0 && Home.getMapMarkers(pharmacyData)
                }
                defaultCenter={defaultCenter}
              />
            )}
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
    return insuranceData.map((datum, index) => {
      const backgroundColor = index % 2 === 0 ? 'secondary' : 'primary';

      return (
        <tr className={backgroundColor} key={`data-row-${datum.id}`}>
          <td>{index + 1}.</td>
          <td>{datum.name}</td>
          <td>{datum.medal}</td>
          <td>{datum.ec}</td>
          <td>{datum.cost}</td>
          <td>{datum.pre}</td>
        </tr>
      );
    });
  }

  renderPharmacyTable(pharmacyData) {
    const { zipcode } = this.state;

    return pharmacyData.map((datum, index) => {
      const backgroundColor = index % 2 === 0 ? 'secondary' : 'primary';
      return (
        <tr className={backgroundColor} key={`data-row-${datum.id}`}>
          <td>{index + 1}.</td>
          <td>{datum.name}</td>
          <td>{datum.address}</td>
          <td>{datum.city}</td>
          <td>{datum.state}</td>
          <td>{datum.zipcode}</td>
          <td>
            {datum.recommended ? (
              <FontAwesomeIcon icon="thumbs-up" />
            ) : (
              <FontAwesomeIcon icon="thumbs-down" />
            )}
          </td>
          <td>{datum.numberOfPharmacists}</td>
          <td>{datum.otc ? <FontAwesomeIcon icon="capsules" /> : ''}</td>
          <td>{zipcodes.distance(zipcode, datum.zipcode)}</td>
        </tr>
      );
    });
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
