
var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	 	    osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	 	    osm = L.tileLayer(osmUrl, {
	 	        maxZoom: 18,
	 	        attribution: osmAttrib
	 	    });
  
   
        navigator.geolocation.getCurrentPosition(position => {
            const { coords: { latitude, longitude }} = position;
            var map = L.map('map').setView([latitude, longitude], 12).addLayer(osm);
            
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


            });