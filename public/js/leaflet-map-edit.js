
        console.log("COORDENADAS: " + latlngd + " ID " + ID + " url: " + url);

	 	var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	 	    osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	 	    osm = L.tileLayer(osmUrl, {
	 	        maxZoom: 18,
	 	        attribution: osmAttrib
	 	    });

            var map = L.map('map').setView(L.GeoJSON.coordsToLatLng(latlngd), 12).addLayer(osm);
            var markerc = L.marker(L.GeoJSON.coordsToLatLng(latlngd)).addTo(map).bindPopup("<b>Ultima posición del producto!</b>").openPopup();
            function onMapClick(e) {

            var marker = L.marker(e.latlng, {
                title: "Resource location",
                alt: "Resource Location",
                riseOnHover: true
            }).addTo(map)
                .bindPopup("<b>!Position¡</b>").openPopup();

                var data = {
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                    distance: e.latlng.distanceTo(L.GeoJSON.coordsToLatLng(latlngd)),
                    ID: ID
                }

                $.ajax({
                    url: url,
                    method: 'POST',
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    dataType:'json',
                    success: function(data) {
                        console.log('SUCCESS');
                    },
                    error: function(data) {
                        console.log('FAILED');
                    }
                });

           
            }
            map.once('click', onMapClick);
