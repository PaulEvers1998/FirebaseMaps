document.addEventListener("DOMContentLoaded", event => {
    console.log("app.js loaded");
})

function signInGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => {
            const user = result.user;
            document.getElementById("login").remove();
    });
}