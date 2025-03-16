// contacto.js - Versión con HERE Maps

document.addEventListener("DOMContentLoaded", function () {
    // Claves de API de HERE Maps (reemplaza con las tuyas)
    const hereApiKey = "SKkC8rfwZAKRHbzehjVKnGCQU0aLNcRpeMiceQohRTA";

    // Coordenadas del negocio
    const negocioCoords = { lat: 37.7766, lng: -122.3916 };

    // Inicializar la plataforma de HERE Maps
    const platform = new H.service.Platform({
        apikey: hereApiKey
    });

    // Crear capas de mapas
    const defaultLayers = platform.createDefaultLayers();

    // Inicializar el mapa
    const map = new H.Map(
        document.getElementById('map'),
        defaultLayers.vector.normal.map,
        {
            zoom: 15,
            center: negocioCoords
        }
    );

    // Agregar controles de interacción
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    // Agregar marcador de la empresa
    const negocioMarker = new H.map.Marker(negocioCoords);
    map.addObject(negocioMarker);

    // Obtener la ubicación del usuario y trazar la ruta
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userCoords = { lat: position.coords.latitude, lng: position.coords.longitude };
            const userMarker = new H.map.Marker(userCoords);
            map.addObject(userMarker);

            // Trazar ruta con HERE Routing API
            calcularRuta(userCoords, negocioCoords, platform, map);
        }, function () {
            alert("No se pudo obtener tu ubicación.");
        });
    } else {
        alert("Tu navegador no soporta geolocalización.");
    }
});

// Función para calcular la ruta
function calcularRuta(origen, destino, platform, map) {
    const router = platform.getRoutingService(null, 8);
    const routingParams = {
        'routingMode': 'fast',
        'transportMode': 'car',
        'origin': `${origen.lat},${origen.lng}`,
        'destination': `${destino.lat},${destino.lng}`,
        'return': 'polyline'
    };

    router.calculateRoute(routingParams, function (result) {
        if (result.routes.length) {
            const route = result.routes[0];
            const routeLineString = H.geo.LineString.fromFlexiblePolyline(route.sections[0].polyline);
            const routeLine = new H.map.Polyline(routeLineString, {
                style: { strokeColor: 'blue', lineWidth: 4 }
            });
            map.addObject(routeLine);
        }
    }, function (error) {
        console.error("Error calculando la ruta", error);
    });
}


