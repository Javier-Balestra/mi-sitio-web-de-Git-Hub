document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById("map");

    if (!mapContainer) {
        console.error("❌ Error: No se encontró el elemento #map en el HTML.");
        return;
    }

    // Inicializar el mapa centrado en la ubicación deseada
    var map = L.map('map').setView([37.7766, -122.3916], 15);

    // Cargar el mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Agregar un marcador con un popup
    L.marker([37.7766, -122.3916]).addTo(map)
        .bindPopup('<b>GitHub HQ</b><br>88 Colin P Kelly Jr St, San Francisco, CA 94107, USA')
        .openPopup();
});
