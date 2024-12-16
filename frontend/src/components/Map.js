import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 37.7749, // Default to San Francisco
  lng: -122.4194,
};

const MapComponent = () => {
  const [center, setCenter] = useState(defaultCenter);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(userLocation);
        },
        () => {
          console.error('Error: The Geolocation service failed.');
        }
      );
    } else {
      console.error('Error: Your browser does not support geolocation.');
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
