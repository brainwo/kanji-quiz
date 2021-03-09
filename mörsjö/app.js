
var mymap = L.map('mapid').setView([60, 10], 4.5);


var tiles = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

}).addTo(mymap);
var markers = L.markerClusterGroup();

fetch("butiker.json")
    .then(response => response.json())
    .then(json => {

        for (const m in json) {
            var marker = L.marker([json[m].latitude, json[m].longitude]);
            marker.bindPopup(`<strong>${json[m].title}</strong></br>${json[m].content}`)
            markers.addLayer(marker);
        }
    });
mymap.addLayer(markers);