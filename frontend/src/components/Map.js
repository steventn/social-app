import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
