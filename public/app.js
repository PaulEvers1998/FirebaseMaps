document.addEventListener("DOMContentLoaded", event => {
    console.log("app.js loaded");

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

function createMap(){
    let map = null;
}