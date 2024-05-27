/************** CONTACTO **************/

function initMap() {
    var Barbería = { lat: 40.4412286, lng: -3.6974367 };
    var map = new google.maps.Map(document.getElementById('map'), {
        center: Barbería,
        zoom: 15
    });
    var marker = new google.maps.Marker({
        position: Barbería,
        map: map,
        title: 'Barbería ByAlex'
    });

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    var calculateRoute = function () {
        var start = document.getElementById('start').value;
        var end = Barbería;
        var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        };
        directionsService.route(request, function (result, status) {
            if (status == 'OK') {
                directionsRenderer.setDirections(result);
            } else {
                alert('Error: No se encontraron resultados para la ruta.\nPor favor intenta nuevamente');

            }
        });
    };

    document.getElementById('routeBtn').addEventListener('click', calculateRoute);
}

document.addEventListener('DOMContentLoaded', function () {
    initMap();


});
