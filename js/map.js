/*global google, window, document*/

var MapaAlojamientos = (function () {
    "use strict";

    var cls = function () {
        this.todos = [];
        this.zoom = 8;
        this.centro = null;
        this.lastMarker = null;
        this.actualMarker = null;
        this.map = null;

        this.alojamientos = [
            {
                "titulo": "alojamiento1",
                "lat": -34.397,
                "lng": 150.644,
                "descripcion": "descripcion de prueba",
                "img": "http://ambiance.itsolutions.es/alquiler/photos/bk_ambiance/14198758102b185d12f7201832e519536d4b837303/big141987581052653de1c1b883672153ad6206f5df52.jpg",
                "url": "",
                "precio": "",
                "personas": 4,
                "habitaciones": 4
            },
            {
                "titulo": "alojamiento2",
                "lat": -34.000,
                "lng": 150.644,
                "descripcion": "descripcion de prueba2",
                "img": "http://ambiance.itsolutions.es/alquiler/photos/bk_ambiance/1419869280eee0fc9d3bd2a7882d9e7257aca3e040/big1419869280932af41dcd4a99953d13e92fb8a56668.jpg",
                "url": ""
            }
        ];

        google.maps.event.addDomListener(window, 'load', this.initialize.bind(this));

    };

    cls.prototype.getContent = function getContent(titulo, descripcion, img) {
        var content;

        content = "<div class='alojamiento'>" +
            "<h1>" + titulo + "</h1>" +
            "<img width='100px' src='" + img + "'>" +
            "<p>" + descripcion + "</p>" +
            "</div>";

        return content;
    };

    cls.prototype.getLatLng = function getLatLng(lat, lng) {
        var latLng;

        latLng = new google.maps.LatLng(lat, lng);

        return latLng;
    };


    cls.prototype.addMark = function addMark(titulo, lat, lng, descripcion, img) {
        var marker, content, infoWindow;

        marker = new google.maps.Marker({
            position: this.getLatLng(lat, lng),
            map: this.map,
            title: titulo,
            icon: "https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/home-32.png"
        });

        content = this.getContent(titulo, descripcion, img);

        marker.infoWindow = new google.maps.InfoWindow({
            content: content
        });

        cls.prototype.abrir = function abrir() {
            this.actualMarker = marker.infoWindow;

            if (this.actualMarker !== this.lastMarker && this.lastMarker !== null) {
                this.lastMarker.close();
            }

            marker.infoWindow.open(this.map, marker);

            this.lastMarker = this.actualMarker;
        };

        google.maps.event.addListener(marker, "click", this.abrir.bind(this));

        this.todos.push(marker);
    };

    cls.prototype.initialize = function initialize() {
        var mapOptions, i;

        mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(-34.397, 150.644),
            disableDefaultUI: true
        };

        this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        for (i = 0; i < this.alojamientos.length; i = i + 1) {
            this.addMark(this.alojamientos[i].titulo, this.alojamientos[i].lat, this.alojamientos[i].lng, this.alojamientos[i].descripcion, this.alojamientos[i].img, this.alojamientos[i].url);
        }
    };

    return cls;

}());

var mapa = new MapaAlojamientos();
