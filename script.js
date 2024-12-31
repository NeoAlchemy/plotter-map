

function initMap(addresses) {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 32.9508297, lng: -97.2816533 },
    zoom: 10,
  });

  // initialize services
  const geocoder = new google.maps.Geocoder();
  const service = new google.maps.DistanceMatrixService();
  // build request
  if (addresses) {
    addresses.forEach((address) => {
      console.log("address: " + address)
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          const marker = new google.maps.Marker({
            map,
            position: results[0].geometry.location,
          });
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
          document.getElementById("geocodeErrors").innerHTML = document.getElementById("geocodeErrors").innerHTML + address + "<br/>"
        }
      });
    });
  
  }
  
  drawCircle();
}
  
document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const content = e.target.result;
          let rows = content.split(/\n/)
          window.setAddress(rows)
      };
      reader.readAsText(file);
  }
});


function drawCircle() {
  var center = new google.maps.LatLng(32.9398347,-97.129254);
  
  // Radius in meters (e.g., 500 meters)
  var radius = 16093.4;


  // Create a circle object
  var circle = new google.maps.Circle({
    center: center,
    radius: radius,
    strokeColor: '#0000AA', 
    strokeWeight: 2, // Line thickness
    fillColor: '#0000AA' // Optional fill color
  });

  circle.setMap(window.map); 
}