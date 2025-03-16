document.addEventListener("DOMContentLoaded", function () {
    // Coordenadas del negocio
    const negocioCoords = [37.7766, -122.3916]; 

    // Inicializar mapa centrado en la ubicación del negocio
    const map = L.map('map').setView(negocioCoords, 15);

    // Cargar mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Agregar marcador para la ubicación del negocio
    L.marker(negocioCoords).addTo(map)
        .bindPopup('Mi Negocio<br>88 Colin P Kelly Jr St, San Francisco, CA 94107, USA')
        .openPopup();

    // Obtener la ubicación del visitante
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userCoords = [position.coords.latitude, position.coords.longitude];

            // Agregar marcador para la ubicación del visitante
            const userMarker = L.marker(userCoords).addTo(map)
                .bindPopup("Tu Ubicación")
                .openPopup();

            // Dibujar ruta entre el visitante y el negocio
            L.Routing.control({
                waypoints: [
                    L.latLng(userCoords),
                    L.latLng(negocioCoords)
                ],
                routeWhileDragging: true
            }).addTo(map);
        }, function () {
            alert("No se pudo obtener tu ubicación.");
        });
    } else {
        alert("Tu navegador no soporta geolocalización.");
    }
});

