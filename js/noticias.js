document.addEventListener('DOMContentLoaded', function () {
    fetch('noticias.json')
        .then(response => response.json())
        .then(data => {
            const noticiasContainer = document.getElementById('noticias');

            data.forEach(noticia => {
                const noticiaElement = document.createElement('article');
                noticiaElement.classList.add('noticia');

                const imagen = document.createElement('img');
                imagen.src = noticia.imagen;
                imagen.alt = noticia.titulo;

                const titulo = document.createElement('h3');
                titulo.textContent = noticia.titulo;

                const descripcion = document.createElement('p');
                descripcion.textContent = noticia.descripcion;

                const enlace = document.createElement('a');
                enlace.href = noticia.url;
                enlace.textContent = 'Leer más...';

                noticiaElement.appendChild(imagen);
                noticiaElement.appendChild(titulo);
                noticiaElement.appendChild(descripcion);
                noticiaElement.appendChild(enlace);

                noticiasContainer.appendChild(noticiaElement);
            });
        })
        .catch(error => {
            console.error('Error cargando las noticias:', error);
        });
});
