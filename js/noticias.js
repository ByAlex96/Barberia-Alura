let indiceActual = 0;
let datosNoticias = [];

function obtenerNoticias() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'json.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            datosNoticias = JSON.parse(xhr.responseText);
            actualizarNoticias();
        }
    };
    xhr.send();
}

function mostrarNoticia(indice) {
    const contenedorNoticias = document.getElementById('noticias');
    contenedorNoticias.innerHTML = ''; // Limpiar el contenedor de noticias

    const noticia = document.createElement('div');
    noticia.className = 'noticia';

    const imagenNoticia = document.createElement('div');
    imagenNoticia.className = 'imagen-noticia';

    const img = document.createElement('img'); // Cambio aquí
    img.src = datosNoticias[indice].imagen;
    imagenNoticia.appendChild(img);

    const contenidoNoticia = document.createElement('div');
    contenidoNoticia.className = 'contenido-noticia';

    const tituloNoticia = document.createElement('div');
    tituloNoticia.className = 'titulo-noticia';
    tituloNoticia.textContent = datosNoticias[indice].titulo;

    const descripcionNoticia = document.createElement('div');
    descripcionNoticia.className = 'descripcion-noticia';
    descripcionNoticia.textContent = datosNoticias[indice].descripcion;

    contenidoNoticia.appendChild(tituloNoticia);
    contenidoNoticia.appendChild(descripcionNoticia);

    noticia.appendChild(imagenNoticia);
    noticia.appendChild(contenidoNoticia);

    contenedorNoticias.appendChild(noticia);
}

function actualizarNoticias() {
    mostrarNoticia(indiceActual);
    indiceActual = (indiceActual + 1) % datosNoticias.length;
}

// Actualizar las noticias automáticamente cada 2 segundos
setInterval(actualizarNoticias, 200000);

// Obtener datos de noticias al cargar la página
obtenerNoticias();
