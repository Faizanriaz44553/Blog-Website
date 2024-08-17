import {db , collection , addDoc , getDocs } from "../firebase.js"

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
creatModal.style.display = "none"
let description = document.querySelector("#description")
let plusIcon = document.querySelector("#plus-icon")
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

function showcreatfuntion() {
  creatModal.style.display = "block"
}
plusIcon.addEventListener("click" , showcreatfuntion)

let postDiv = document.querySelector("#post-div")
const postFuntion = async ()=>{
    const querySnapshot = await getDocs(collection(db, "post"));
querySnapshot.forEach((doc) => {
    const {userDescription , userTital} = doc.data();
    postDiv.innerHTML += `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${userTital}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
    <p class="card-text">${userDescription}</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>`
console.log(userDescription , userTital);
});
}
postFuntion()
creatModalButton.addEventListener("click" , ceratUserFuntion);


