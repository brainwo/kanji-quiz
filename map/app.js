


var mymap = L.map('mapid', {layers: tiles}).setView([35.6735408,139.7680049], 13);
    //var marker = L.marker([35.6735408,139.7503049]).addTo(mymap);
    
var tiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoicmlrc29zdCIsImEiOiJjam55ZjgxbnMyNDlzM3BwamsyZDAycjdwIn0.hLCZuNUG23yy5514BSFmPQ'
    }).addTo(mymap);
    
var tokyo = $.ajax({
    url: "https://cors-escape.herokuapp.com/http://www.tokyoartbeat.com/list/event_free.en.xml",
    dataType: "xml",
    success: console.log("success"),
    error: function (xhr) {
        console.log("nope")
    },
    headers: {
    'Access-Control-Allow-Credentials' : true,
    'Access-Control-Allow-Origin':'*'
  }
})

var nameToModal;
var descToModal;
var mediaToModal;
var webToModal;
var markers = new L.markerClusterGroup();
var marker;

var onLoad =  $(document).ajaxStop(function () {
    var numberOfEvents = tokyo.responseXML.children[0].children.length;
    for(var i = 0; i < numberOfEvents; i++ ) {
    var name = tokyo.responseXML.children[0].children[i].getElementsByTagName("Name")[0].innerHTML
    var lat = parseFloat(tokyo.responseXML.children[0].children[i].getElementsByTagName("Latitude")[0].innerHTML) + 0.003227
    var long = parseFloat(tokyo.responseXML.children[0].children[i].getElementsByTagName("Longitude")[0].innerHTML) - 0.003209 
    var desc = tokyo.responseXML.children[0].children[i].getElementsByTagName("Description")[0].textContent
    var media = tokyo.responseXML.children[0].children[i].getElementsByTagName("Media")[0].textContent
    var web = tokyo.responseXML.children[0].children[i].getAttribute("href")

    

    marker = new L.marker([lat, long]).bindPopup("<p class='name'>" + name + "</p>" + "<p class='desc' style='display: none'>"+desc+"</p>" + "<a class='web' href='"+web+"' style='display: none'>" + web + "</a>" + "<p class='media' style='display: none'>"+media+"</p>").on('click', onClick)
    .on('mouseover', 
        function () {
            this.openPopup()
            nameToModal = $("#mapid > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-popup-pane > div > div.leaflet-popup-content-wrapper > div > p.name").text()
            descToModal = $("#mapid > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-popup-pane > div > div.leaflet-popup-content-wrapper > div > p.desc").text()
            mediaToModal = $("#mapid > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-popup-pane > div > div.leaflet-popup-content-wrapper > div > p.media").text()
            webToModal = $("#mapid > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-popup-pane > div > div.leaflet-popup-content-wrapper > div > a.web").text()
        })    
    .on('mouseout', 
        function () {
            this.closePopup();
            nameToModal = undefined;
            descToModal = undefined;
            mediaToWeb = undefined;
            webToModal = undefined;
        })
    
    markers.addLayer(marker);
    mymap.addLayer(markers);
    
    function onClick() {
        $("#exampleModal").modal()
        $("#exampleModal > .modal-dialog > .modal-content > .modal-header > h5.modal-title").text(nameToModal)
        $("#exampleModal > .modal-dialog > .modal-content > .modal-body > p.desc").text(descToModal)
        $("#exampleModal > .modal-dialog > .modal-content > .modal-body > p.media").html("<i>"+mediaToModal+"</i>" + " ")
        $("#exampleModal > .modal-dialog > .modal-content > .modal-body > a.web").html("read more about " + nameToModal)
        $("#exampleModal > .modal-dialog > .modal-content > .modal-body > a.web").attr("href", webToModal);
        }
        
    } 
    
    
}); 








 


    






