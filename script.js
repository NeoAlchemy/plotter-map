

async function initMap(addresses) {
  const { Map, Circle } = await google.maps.importLibrary("maps");
  const { Marker } = await google.maps.importLibrary("marker");
  const { Geocoder } = await google.maps.importLibrary("geocoding")

  // initialize services
  const geocoder = new Map.Geocoder();
  //const service = new google.maps.DistanceMatrixService();
  
  // build request
  if (addresses) {
    addresses.forEach((address) => {
      console.log("address: " + address)
      Geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          const marker = new Marker.AdvancedMarkerElement({
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

