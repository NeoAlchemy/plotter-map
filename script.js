
function initMap(addresses) {
    const bounds = new google.maps.LatLngBounds();
    const markersArray = [];
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 32.9508297, lng: -97.2816533 },
      zoom: 10,
    });
    // initialize services
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
    // build request
    
    addresses.forEach((address) => {
      console.log("address: " + address)
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          console.log("address")
          const marker = new google.maps.Marker({
            map,
            position: results[0].geometry.location,
          });
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    });
  }
  
  function deleteMarkers(markersArray) {
    for (let i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(null);
    }
  
    markersArray = [];
  }
  
  document.getElementById("go").onclick = function(){
      window.initMap();
  }
  
  document.getElementById("dest"),onkeypress = function(e) {
    if (e.keyCode == 13) {
        window.initMap();
    }
  }

  document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            console.log(content);
            let rows = content.split(/\n/)
            window.initMap(rows)
        };
        reader.readAsText(file);
    }
});
  //window.initMap = initMap;