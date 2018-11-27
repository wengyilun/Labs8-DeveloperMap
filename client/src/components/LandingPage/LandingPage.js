import React from 'react';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapGL, { Marker, Popup } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { MapWindow, ShowMarker } from './MapWindowStyle';
import SeekerPin from '../../images/markerlogo.png';
import CompanyPin from '../../images/markerlogo4.png';

import styled from 'styled-components';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibG5kdWJvc2UiLCJhIjoiY2pvNmF1ZnowMGo3MDNrbmw4ZTVmb2txMyJ9.UpxjYyEOBnCJjw_qE_N8Kw';

class LandingPage extends React.Component {
  state = {
    viewport: {
      latitude: 37.7577,
      longitude: -100,
      zoom: 3,
    },
    data: [],
    pin: null,
  };

  mapRef = React.createRef();

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
    axios
      .get('https://intense-stream-29923.herokuapp.com/api/markers')
      .then(response => {
        for (let mark in response.data) {
          this.setState({ data: [...this.state.data, response.data[mark]] });
        }
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.handleViewportChange({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport },
    });
  };

  renderPopup = () => {
    const { pin } = this.state;
    console.log(pin);
    return (
      pin && (
        <Popup
          latitude={pin.geometry.coordinates[1]}
          longitude={pin.geometry.coordinates[0]}
          closeOnClick={() => this.setState({ pin: null })}
        >
          <div
            onClick={() =>
              this.props.history.push(`/seeker/${pin.properties.uid}`)
            }
          >
            {pin.properties.title}
          </div>
        </Popup>
      )
    );
  };

  hoverMarker = () => {};

  render() {
    const style = {
      position: 'absolute',
      marginTop: '-8px',
      marginLeft: '-8px',
    };

    return (
      <MapWindow>
        <MapGL
          ref={this.mapRef}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          {...this.state.viewport}
          onViewportChange={this.handleViewportChange}
          style={style}
          mapStyle="mapbox://styles/lndubose/cjohrsfn608in2qqyyn2wu15g"
        >
          <Geocoder
            mapRef={this.mapRef}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            onViewportChange={this.handleViewportChange}
          />
          <KeyBox>
            <div className="key">
              <PinKey src={SeekerPin} />
              <h3>Job Seeker</h3>
            </div>
            <div className="key">
              <PinKey src={CompanyPin} />
              <h3>Employer</h3>
            </div>
          </KeyBox>

          {this.state.data.map((mark, i) => {
            return (
              <Marker
                key={i}
                latitude={mark.geometry.coordinates[1]}
                longitude={mark.geometry.coordinates[0]}
              >
                <ShowMarker
                  src={SeekerPin}
                  alt="red marker"
                  onClick={() => this.setState({ pin: mark })}
                  getCursor={'pointer'}
                />
              </Marker>
            );
          })}

          {this.renderPopup()}
        </MapGL>
      </MapWindow>
    );
  }
}

const PinKey = styled.img`
  width: 75px;
  height: 75px;
`;

const KeyBox = styled.div`
  width: 170px;
  height: 170px;
  background-color: rgba(232, 232, 232, 0.85);
  box-shadow: inset 10px 10px 10px rgba(255, 255, 255, 0.5);
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 2%;
  .key {
    display: flex;
  }
`;

const ToggleKnob = styled.label`
  position: relative;
  width: 29px;
  height: 12px;
  justify-self: center;
  align-items: center;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    &:before {
      position: absolute;
      content: '';
      height: 13px;
      width: 13px;
      left: 1px;
      bottom: 0px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  }
  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
  }
  .slider.round {
    border-radius: 12px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

export default LandingPage;

// onViewportChange={this.onViewportChange}
// mapboxApiAccessToken={MAPBOX_TOKEN}
