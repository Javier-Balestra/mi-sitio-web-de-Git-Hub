document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map').setView([37.7766, -122.3916], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([37.7766, -122.3916]).addTo(map)
        .bindPopup('GitHub HQ\n88 Colin P Kelly Jr St, San Francisco, CA 94107, USA')
        .openPopup();
});