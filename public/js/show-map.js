
 var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
     osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
     osm = L.tileLayer(osmUrl, {
         maxZoom: 18,
         attribution: osmAttrib
     });


    var map = L.map('map').setView(L.GeoJSON.coordsToLatLng(latlngmf), 5).addLayer(osm);
    L.Routing.control({
        waypoints: [
            L.GeoJSON.coordsToLatLng(latlngmi),
            L.GeoJSON.coordsToLatLng(latlngmf)
        ],
        router: L.Routing.mapbox('pk.eyJ1IjoidG9ueXJpY2giLCJhIjoiY2twNmo1aW05MDR4OTJubXRrb2NybDA3aSJ9.0lt9ffFKAOWU0cXD1NkGOg')
      }).addTo(map);