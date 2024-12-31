

async function initMap(addresses) {
  // initialize services
  const { Map, Circle } = await google.maps.importLibrary("maps");
  const { Marker } = await google.maps.importLibrary("marker");
  const { Geocoder } = await google.maps.importLibrary("geocoding")

  // build request
  if (addresses) {
    addresses.forEach((address) => {
      console.log("address: " + address)
      const geocoder = new Geocoder();
      const marker = new Marker();

      geocoder.geocode({ "address": address }, (results, status) => {
        if (status === "OK") {
          marker.AdvancedMarkerElement({
            map,
            position: results[0].geometry.location,
            title: 'Customer',
        });
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
          document.getElementById("geocodeErrors").innerHTML += address + "<br/>"
        }
      });
    });
  
  }
  
  // add circle
  new Circle({
    strokeColor: "#0000AA",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#0000AA",
    fillOpacity: 0.35,
    map,
    center: {lat: 32.9398347, lng: -97.129254 },
    radius: 16093.4
  }); 
}
  
document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const content = e.target.result;
          let rows = content.split(/\n/)
          rows.shift();
          window.initMap(rows)
      };
      reader.readAsText(file);
  }
});

