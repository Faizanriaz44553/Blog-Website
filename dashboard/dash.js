import {db , collection , addDoc , getDocs ,signOut  ,auth , onAuthStateChanged , ref , storage , uploadBytes , getDownloadURL , uploadBytesResumable} from "../firebase.js"

let body = document.querySelector('body');
let toggleButton = document.querySelector('#toggleButton');
let lightFontColor = document.querySelector('#dark-mode-color');
let creatModal = document.querySelector("#creatModal")
let description = document.querySelector("#description")
let tital = document.querySelector("#tital")
let creatModalButton = document.querySelector("#creat-project")
let hideicon = document.querySelector("#hideIcon")
let postDiv = document.querySelector("#post-div")
let loaderCSS = document.querySelector("#loader")
let LogoutButton = document.querySelector("#Logout-button")
let linkBlog = document.querySelector("#link-blog")
let postImages = document.querySelector("#post-images")
let imageModal = document.querySelector("#imageModal")
let postModal = document.querySelector("#postModal")
let nextButton = document.querySelector("#nextButton")
let cencelButton = document.querySelector("#cencelButton")
creatModal.style.display = "none"
cencelButton.style.display = "none"
postModal.style.display = "none"
imageModal.style.display = "none"
let getImage;


document.addEventListener("DOMContentLoaded", ()=> {
    toggleButton.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        lightFontColor.classList.toggle('light-font-color');
        mainHeadingDiv.classList.toggle('dark-header-main-heading');
    });
});


let plusIcon = document.querySelector("#plus-icon")
function showcreatfuntion() {
  imageModal.style.display = "block"
  creatModal.style.display = "block"
  body.classList.add('modal-open')
}
plusIcon.addEventListener("click" , showcreatfuntion)

function hideModalCrossIcon() {
  body.classList.remove('modal-open')
  creatModal.style.display = "none"
}
hideicon.addEventListener("click" , hideModalCrossIcon)


const PostUploadImages =()=>{
  postModal.style.display = "none"
  cencelButton.style.display = 'none'
  if (!postImages.files.length) {
    Swal.fire({
      position: "top-center",
      icon: "error",
      title: "Please select an image before proceeding",
      showConfirmButton: true,
    });
    cencelButton.style.display = 'none'
  postImages.disabled = false;
  nextButton.disabled = false;
  nextButton.innerHTML = "Next";
  }
 else{
  cencelButton.style.display = 'block'
  let files = postImages.files[0];
  console.log(files);
  const mountainsRef = ref(storage, files.name);
     console.log(mountainsRef);
const uploadTask = uploadBytesResumable(mountainsRef, files);
uploadTask.on('state_changed', 
  (snapshot) => {
    postImages.disabled = true;
  nextButton.disabled = true;
  nextButton.innerHTML = "Next...";
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
   console.log(error);
   nextButton.disabled = false;
   nextButton.innerHTML = "Next";
   postImages.disabled = false;
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref)
    .then((downloadURL) => {
      nextButton.disabled = false;
   nextButton.innerHTML = "Next";
   postImages.disabled = false;
   cencelButton.style.display = 'none'
      imageModal.style.display = 'none'
      postModal.style.display = "block"
      getImage = downloadURL;
      console.log('File available at', downloadURL);
    });
  }
);
 }
}

nextButton.addEventListener("click" , PostUploadImages)

const ceratUserFuntion = async ()=>{
  loaderCSS.style.display = "block"
  body.classList.remove('modal-open')
   if (tital.value.trim() === "" && tital.value.length < 10 || tital.value.length > 50) {
    Swal.fire({
      position: "top-center",
      icon: "error",
      title: "Oops...",
      text: "Title must be between 10 and 50 characters.",
    });
    console.log("tital is empty");
   } 
   else if (description.value.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Description must be between 100 and 200 characters.",
    });
   }
   else {
    postDiv.innerHTML = ""
    creatModal.style.display = "none"
    try {           
      const docRef = await addDoc(collection(db, "post"), {
        userTital: tital.value,
        userDescription: description.value,
        userLink: linkBlog.value,
        image: getImage,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    finally{
      postFuntion()
      imageModal.style.display = 'none'
      postModal.style.display = "none"
    }
   }
   loaderCSS.style.display = "block"
}
creatModalButton.addEventListener("click" , ceratUserFuntion);



const postFuntion = async ()=>{
  loaderCSS.style.display = "block"
    try {
      const querySnapshot = await getDocs(collection(db, "post"));
    if (querySnapshot.empty) {
      postDiv.innerHTML = `<p class="card-text">Post Not Avalaible</p>`
    }
querySnapshot.forEach((doc) => {
  loaderCSS.style.display = "none"
    const {userDescription , userTital , userLink , image} = doc.data();
    postDiv.innerHTML += `<div class="card" style="width: 18rem;">
  <img src="${image}" class="card-img-top" alt="..." style="height: 200px; object-fit: cover;">
  <div class="card-body">
    <h5 class="card-title">${userTital}</h5>
    <p class="card-text">${userDescription}</p>
    <a href="${userLink}" target="blank" class="btn btn-primary">Read Blog</a>
  </div>
</div>`
console.log(userDescription , userTital , userLink);
});
    } catch (error) {
      console.log(error);
    }
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


cencelButton.addEventListener('click' , ()=>{
  console.log('cancel');
  let can = uploadTask.cancel();
  console.log(can);
  
  imageModal.style.display = 'block'
  postModal.style.display = "none"
  postImages.disabled = false;
  nextButton.disabled = false;
  nextButton.innerHTML = "Next";
})