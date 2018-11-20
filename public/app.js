document.addEventListener('DOMContentLoaded', event => {
    console.log('app.js loaded');

    checkAuthState();


})

function checkAuthState(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("User is logged in " + user.displayName);
        } else {
            window.location.href = 'index.html'
        }
    });
}

function signOut() {
    firebase.auth().signOut();
}

function initMap(){
    console.log('Create map');
    let start = {lat: 51.440196, lng: 5.478276 };
    let map = new google.maps.Map(
        document.getElementById('map'), {zoom: 8, center: start, disableDefaultUI: true, styles:[
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "hue": "#ffa500"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "gamma": "1.82"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "gamma": "1.96"
                    },
                    {
                        "lightness": "-9"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": "25"
                    },
                    {
                        "gamma": "1.00"
                    },
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#ffa500"
                    },
                    {
                        "saturation": "-43"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffa500"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#ffaa00"
                    },
                    {
                        "saturation": "-70"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "30"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "40"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.station.airport",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "gamma": "0.80"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ]});
}