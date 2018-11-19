document.addEventListener("DOMContentLoaded", event => {
    console.log("auth.js loaded");


    firebase.auth().onAuthStateChanged(function (user) {
        if(user){
            console.log("User logged in " + user.displayName);
            window.location.href = 'map.html'
        }
    });
})

function signInGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => {
            const user = result.user;
            document.getElementById("login").remove();
    });
}
