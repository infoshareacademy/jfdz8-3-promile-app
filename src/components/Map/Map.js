import React, { Component } from 'react'
import L from 'leaflet'

class Map extends Component {
  render () {
    const map = L.map('map').setView([54.505, -18.50], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();

    <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>

    return (
    <div id="map">

    </div>

    )
  }
}

export default Map