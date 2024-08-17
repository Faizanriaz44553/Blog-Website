import {auth , signInWithEmailAndPassword  , onAuthStateChanged } from "../firebase.js"
let email = document.getElementById('email')
let password = document.getElementById('password')
let errorMassage = document.getElementById('error')
let button = document.getElementById('button')

const signinFuntion = ()=>{
    event.preventDefault()
      button.innerHTML = "Login..."
    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    button.innerHTML = "Login"
    const user = userCredential.user;
    console.log(user);
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Succesfully Login",
      showConfirmButton: false,
      timer: 1500
    });
    window.location.href = "../dashboard/dash.html"
  })
  .catch((error) => {
    button.innerHTML = "Login"
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    errorMassage.innerHTML = errorMessage
    setTimeout(() => {
      errorMassage.innerHTML = ""
    }, 1000);
  });
}

button.addEventListener("click" , signinFuntion)