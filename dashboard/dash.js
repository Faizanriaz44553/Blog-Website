import {db , collection , addDoc} from "../firebase.js"

let body = document.querySelector('body');
let toggleButton = document.querySelector('#toggleButton');
let lightFontColor = document.querySelector('#dark-mode-color');





document.addEventListener("DOMContentLoaded", ()=> {
    toggleButton.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        lightFontColor.classList.toggle('light-font-color');
        mainHeadingDiv.classList.toggle('dark-header-main-heading');
    });
});

let creatModal = document.querySelector("#creatModal")
let description = document.querySelector("#description")
let tital = document.querySelector("#tital")
let creatModalButton = document.querySelector("#creat-project")
const ceratUserFuntion = async ()=>{
    try {
        const docRef = await addDoc(collection(db, "post"), {
          userTital: tital.value,
          userDescription: description.value
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

creatModalButton.addEventListener("click" , ceratUserFuntion);


