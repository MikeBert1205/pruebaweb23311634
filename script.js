let osmMap, markerOsm;

// Iniciar OpenStreetMap con Leaflet
function initOpenStreetMap(lat, lng) {
  osmMap = L.map("osmMap").setView([lat, lng], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors',
  }).addTo(osmMap);
  markerOsm = L.marker([lat, lng]).addTo(osmMap).bindPopup("Tu Ubicación").openPopup();
}

// Obtener ubicación del usuario
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocalización no es soportada por este navegador.");
  }
}

// Mostrar posición en el mapa y en texto
function showPosition(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  // Mostrar coordenadas en pantalla
  document.getElementById("lat").textContent = lat;
  document.getElementById("lng").textContent = lng;

  // Inicializar o actualizar OpenStreetMap
  if (osmMap) {
    osmMap.setView(new L.LatLng(lat, lng), 15);
    markerOsm.setLatLng([lat, lng]);
  } else {
    initOpenStreetMap(lat, lng);
  }
}

// Manejar errores de geolocalización
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Permiso denegado para la geolocalización.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Información de ubicación no disponible.");
      break;
    case error.TIMEOUT:
      alert("Tiempo de espera agotado para obtener la ubicación.");
      break;
    case error.UNKNOWN_ERROR:
      alert("Error desconocido.");
      break;
  }
}
