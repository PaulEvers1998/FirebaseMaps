let db;
let currentUser;
let map;

document.addEventListener('DOMContentLoaded', event => {
    console.log('app.js loaded');

    checkAuthState();
    db = firebase.firestore();

})

function checkAuthState() {
    // Keeps checking wether the user is logged in or not
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("User is logged in " + user.displayName);
            currentUser = user;
        } else {
            window.location.href = 'index.html'

        }
    });
}

function signOut() {
    firebase.auth().signOut();
}

// Creates Google Map
function initMap() {
    console.log('Create map');

    // Center position of map in Eindhoven
    let start = {
        lat: 51.440196,
        lng: 5.478276
    };

    // Creates map with settings and custom style
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 8,
            center: start,
            disableDefaultUI: true,
            styles: [{
                    "featureType": "all",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "hue": "#ffa500"
                    }]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#000000"
                    }]
                },
                {
                    "featureType": "administrative",
                    "elementType": "labels",
                    "stylers": [{
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
                    "stylers": [{
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
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [{
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
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [{
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
                    "stylers": [{
                        "color": "#ffa500"
                    }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels",
                    "stylers": [{
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
                    "stylers": [{
                        "visibility": "on"
                    }]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "all",
                    "stylers": [{
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
                    "stylers": [{
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
                    "stylers": [{
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
                    "stylers": [{
                        "visibility": "off"
                    }]
                }
            ]
        });

    // Set adress input to autocomplete
    let adressInput = document.getElementById('adress');
    let autocomplete = new google.maps.places.Autocomplete(adressInput);

}

function addAdress() {
    let titleInput = document.getElementById('title').value;
    let addressInput = document.getElementById('adress').value;

    let geocoder = new google.maps.Geocoder();
    let geocode;

    // Converts adress to latlng values and saves it to database
    geocoder.geocode({
        'address': addressInput
    }, function (results, status) {
        geocode = results[0].geometry.location;

        // Saving to database
        db.collection("Locations").add({
                title: titleInput,
                place: addressInput,
                latlng: geocode.toString(),
                user: currentUser.email
            })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                alert(addressInput + ' has been added to the map.');
            });
    });
}

//var marker = new google.maps.Marker({
//position: geocode,
//title: titleInput
//});
// marker.setMap(map);