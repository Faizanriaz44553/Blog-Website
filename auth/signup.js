import {auth , createUserWithEmailAndPassword , onAuthStateChanged } from "../firebase.js"
let email = document.getElementById('email')
let password = document.getElementById('password')
let errorMassage = document.getElementById('error')
let button = document.getElementById('button')

const signupFuntion = ()=>{
  event.preventDefault()
  button.innerHTML = "Signup..."
  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
     button.innerHTML = "Signup"
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Succesfully Signup",
      showConfirmButton: false,
      timer: 1500
    });
    window.location.href = "./login.html"
    
  })
  .catch((error) => {
    button.innerHTML = "Signup"
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    errorMassage.innerHTML = errorMessage
    setTimeout(() => {
      errorMassage.innerHTML = ""
    }, 1000);
    
  });
}
button.addEventListener('click' , signupFuntion)


onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    window.location.href = "../dashboard/dash.html"
  }
});