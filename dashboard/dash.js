import {db , collection , addDoc , getDocs ,signOut  ,auth , onAuthStateChanged} from "../firebase.js"

let body = document.querySelector('body');
let toggleButton = document.querySelector('#toggleButton');
let lightFontColor = document.querySelector('#dark-mode-color');
let creatModal = document.querySelector("#creatModal")
let description = document.querySelector("#description")
let tital = document.querySelector("#tital")
let creatModalButton = document.querySelector("#creat-project")
let hideicon = document.querySelector("#hideicon")
let postDiv = document.querySelector("#post-div")
let loaderCSS = document.querySelector("#loader")
let LogoutButton = document.querySelector("#Logout-button")
creatModal.style.display = "none"

document.addEventListener("DOMContentLoaded", ()=> {
    toggleButton.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        lightFontColor.classList.toggle('light-font-color');
        mainHeadingDiv.classList.toggle('dark-header-main-heading');
    });
});



const ceratUserFuntion = async ()=>{
  loaderCSS.style.display = "block"
  postFuntion()
   if (tital.value.trim() === "") {
    Swal.fire({
      position: "top-center",
      icon: "error",
      title: "Oops...",
      text: "Tital is empty",
    });
    console.log("tital is empty");
    
   } else if (description.value.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Decriptions is empty",
    });
   }
   else {
    postDiv.innerHTML = ""
    creatModal.style.display = "none"
    try {
      loaderCSS.style.display = "none"
      const docRef = await addDoc(collection(db, "post"), {
        userTital: tital.value,
        userDescription: description.value
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    finally{
      tital.value = ""
      description.value = ""
    }
   }
}
creatModalButton.addEventListener("click" , ceratUserFuntion);



const postFuntion = async ()=>{
  loaderCSS.style.display = "block"
    const querySnapshot = await getDocs(collection(db, "post"));
querySnapshot.forEach((doc) => {
  loaderCSS.style.display = "none"
    const {userDescription , userTital} = doc.data();
    postDiv.innerHTML += `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${userTital}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary"></h6>
    <p class="card-text">${userDescription}</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>`
console.log(userDescription , userTital);
});
}
postFuntion()

const logoutFuntion = ()=>{
  signOut(auth).then(() => {
    Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Logout succesfuly",
          showConfirmButton: false,
          timer: 1500
        });
        window.location.href = "../auth/signup.html"
  }).catch((error) => {
    console.log(error);
  });
}
LogoutButton.addEventListener("click" , logoutFuntion)



 let plusIcon = document.querySelector("#plus-icon")
function showcreatfuntion() {
  creatModal.style.display = "block"
}
plusIcon.addEventListener("click" , showcreatfuntion)

function hideModalCrossIcon() {
  creatModal.style.display = "none"
}
hideicon.addEventListener("click" , hideModalCrossIcon)


function stateChangedFuntion() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      const uid = user.uid;
      console.log(`state change nahi howa ${uid}`);
      window.location.href = "../auth/signup.html"
    }
  });
}
stateChangedFuntion()