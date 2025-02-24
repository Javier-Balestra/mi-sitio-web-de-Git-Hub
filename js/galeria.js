document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.getElementById("gallery");
    const images = [
        "img/imagen1.jpg",
        "img/imagen2.jpg",
        "img/imagen3.jpg",
        "img/imagen4.jpg",
        "img/imagen5.jpg"
    ];

    images.forEach((src, index) => {
        const linkElement = document.createElement("a");
        linkElement.href = src;
        linkElement.setAttribute("data-lightbox", "gallery");
        linkElement.setAttribute("data-title", `Imagen ${index + 1}`);

        const imgElement = document.createElement("img");
        imgElement.src = src;
        imgElement.alt = "Imagen de la galería";
        imgElement.classList.add("gallery-item");

        linkElement.appendChild(imgElement);
        galleryContainer.appendChild(linkElement);
    });
});
