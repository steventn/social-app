import React from "react";
import AddPlayer from "./AddPlayer";
import MapComponent from "./Map";

const NearbyTab = () => (
  <div>
    <h2>Nearby Players</h2>
    <AddPlayer />
    <MapComponent />
  </div>
);

export default NearbyTab;
