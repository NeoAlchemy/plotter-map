

async function initMap(addresses) {
  const { Map } = await google.maps.importLibrary("maps");
  const { Marker } = await agoogle.maps.importLibrary("marker");

  // initialize services
  const geocoder = new Map.Geocoder();
  //const service = new google.maps.DistanceMatrixService();
  
  // build request
  if (addresses) {
    addresses.forEach((address) => {
      console.log("address: " + address)
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          const marker = new Marker.AdvancedMarkerElement({
            map,
            position: results[0].geometry.location,
            title: 'Customer',
        });
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
          document.getElementById("geocodeErrors").innerHTML = document.getElementById("geocodeErrors").innerHTML + address + "<br/>"
        }
      });
    });
  
  }
  
  var center = new google.maps.LatLng(32.9398347,-97.129254);
  
  // Radius in meters (e.g., 500 meters)
  var radius = 16093.4;

  // Create a circle object
  var circle = new Marker.circle({
    strokeColor: "#0000AA",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#0000AA",
    fillOpacity: 0.35,
    map,
    center: center,
    radius: radius
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

