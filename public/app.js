this.db;
this.currentUser;
this.map;


document.addEventListener('DOMContentLoaded', event => {
    console.log('app.js loaded');

    // Checks if user is logged in
    checkAuthState();

    // Sets database
    dbInit();

    // Places markers and checks for changes
    markerUpdate();

})

function dbInit() {
    db = firebase.firestore();
    const settings = {
        timestampsInSnapshots: true
    };
    db.settings(settings);
}

function markerUpdate() {
    let locations = db.collection('Locations');

    // Checks for changes in firestore
    locations.onSnapshot(col => {
        locations.get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // Creates marker for each location in database
                    createMarker(doc);;
                });
            })
    });
}

function createMarker(doc) {

    var data = doc.data();

    // Creates infowindow
    var markerString = '<h6>' + data.title + '</h6>' +
                        '<p>By: ' + data.user + '</p>';
    var infowindow = new google.maps.InfoWindow({
        content: markerString
      });


    // Creates marker
    var marker = new google.maps.Marker({
        position: JSON.parse(data.latlng),
        title: data.title
    });

    // Listens for click to show infowindow
    marker.addListener('click', function() {
        infowindow.open(map, marker);
      });

    // Adds marker to map
    marker.setMap(map);
}

function checkAuthState() {
    // Keeps checking wether the user is logged in or not
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('User is logged in ' + user.displayName);
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
                latlng: JSON.stringify(geocode),
                user: currentUser.email
            })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                alert(addressInput + ' has been added to the map.');
            });
    });
}