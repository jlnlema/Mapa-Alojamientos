/*global google, window, document, MarkerClusterer*/

var MapaAlojamientos = (function () {
    "use strict";

    var cls = function () {
        this.todos = []; //Array donde se guardan los markers de los alojamientos
        this.zoom = 2;   //El zoom del mapa
        this.centro = this.getLatLng(0, 0); //Centro del mapa
        this.lastMarker = null; //Aqui se guardará el último marker pulsado
        this.actualMarker = null; //Aqui se guardará el marker actual
        this.map = null; //inicializamos el mapa
        this.mc = null; //inicializamos el cluster
        this.mcOptions = {  //Opciones del cluster
            "gridSize": 50,
            "maxZoom": 15,
            "styles": [
                {
                    textColor: "white",
                    height: 53,
                    url: "https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/home-32.png",
                    width: 53
                },
                {
                    textColor: "white",
                    height: 56,
                    url: "https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/home-32.png",
                    width: 56
                },
                {
                    textColor: "white",
                    height: 66,
                    url: "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m3.png",
                    width: 66
                },
                {
                    textColor: "white",
                    height: 78,
                    url: "https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/home-32.png",
                    width: 78
                },
                {
                    textColor: "white",
                    height: 90,
                    url: "https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/home-32.png",
                    width: 90
                }
            ]
        };

        this.alojamientos = [  //JSON con los alojamientos
            {
                "titulo": "alojamiento1",
                "lat": -34.397,
                "lng": 150.644,
                "descripcion": "descripcion de prueba",
                "img": "http://ambiance.itsolutions.es/alquiler/photos/bk_ambiance/14198758102b185d12f7201832e519536d4b837303/big141987581052653de1c1b883672153ad6206f5df52.jpg",
                "url": "",
                "precio": "",
                "personas": 4,
                "habitaciones": 4,
                "tipo": "apartamento"
            },
            {
                "titulo": "alojamiento2",
                "lat": -34.000,
                "lng": 150.644,
                "descripcion": "descripcion de prueba2",
                "img": "http://ambiance.itsolutions.es/alquiler/photos/bk_ambiance/1419869280eee0fc9d3bd2a7882d9e7257aca3e040/big1419869280932af41dcd4a99953d13e92fb8a56668.jpg",
                "url": "",
                "tipo": "villa"
            }
        ];

        google.maps.event.addDomListener(window, 'load', this.initialize.bind(this));

    };

/**
 * Devuelve el contenido del infoWindow
 * @param {string} titulo
 * @param {string} descripcion
 * @param {string} img url
 * @return {string} html del infoWindow
 */
    cls.prototype.getContent = function getContent(titulo, descripcion, img) {
        var content;

        content = "<div class='alojamiento'>" +
            "<h1>" + titulo + "</h1>" +
            "<img width='100px' src='" + img + "'>" +
            "<p>" + descripcion + "</p>" +
            "</div>";

        return content;
    };

/**
* Devuelve la latitud y la longitud formateada
* @param {Number} Latitud
* @param {Number} Longitud
* @return {LatLng} Longitud y latitud
*/
    cls.prototype.getLatLng = function getLatLng(lat, lng) {
        var latLng;

        latLng = new google.maps.LatLng(lat, lng);

        return latLng;
    };

    cls.prototype.getIcon = function getIcon(tipo) {
        switch (tipo) {

        case "apartamento":
            return "https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/home-32.png";
        default:
            return "";
        }
    };

    cls.prototype.addMark = function addMark(titulo, lat, lng, descripcion, img, url, tipo) {
        var marker, content, infoWindow;

        marker = new google.maps.Marker({
            position: this.getLatLng(lat, lng),
            map: this.map,
            title: titulo,
            icon: this.getIcon(tipo)
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

            this.map.panTo(this.getLatLng(lat, lng));
            this.lastMarker = this.actualMarker;
        };

        google.maps.event.addListener(marker, "click", this.abrir.bind(this));

        this.todos.push(marker);
    };

    cls.prototype.initialize = function initialize() {
        var mapOptions, i;

        mapOptions = {
            zoom: this.zoom,
            center: this.centro,
            disableDefaultUI: true
        };

        this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        for (i = 0; i < this.alojamientos.length; i = i + 1) {
            this.addMark(
                this.alojamientos[i].titulo,
                this.alojamientos[i].lat,
                this.alojamientos[i].lng,
                this.alojamientos[i].descripcion,
                this.alojamientos[i].img,
                this.alojamientos[i].url,
                this.alojamientos[i].tipo
            );
        }

        this.mc = new MarkerClusterer(this.map, this.todos, this.mcOptions);
    };

    return cls;

}());

var mapa = new MapaAlojamientos();
