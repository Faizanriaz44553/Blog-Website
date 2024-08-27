import { db , collection , getDocs  , doc, deleteDoc , updateDoc , onAuthStateChanged , auth} from "../firebase.js";

let userInformation = document.querySelector("#user-information")
let loaderDiv = document.querySelector("#loader-div")
let updateDes = document.querySelector("#update-description")
let updateTit = document.querySelector("#update-title")
let updateButton = document.querySelector("#updatebutton")
let creatModal = document.querySelector("#creatModal")
let hideicon = document.querySelector("#hideicon")
let linkBlog = document.querySelector("#link-blog")
let isEdit = null
loaderDiv.style.display = "none"
creatModal.style.display = "none"




const postFuntion = async ()=>{
    userInformation.innerHTML = ''
    loaderDiv.style.display = "flex"
   try {
    const querySnapshot = await getDocs(collection(db, "post"));
    if (querySnapshot.empty) {
        userInformation.innerHTML = 'data not found'
    }
    querySnapshot.forEach((doc) => {
        loaderDiv.style.display = "none"
        const {userDescription , userTital , userLink} = doc.data();
        userInformation.innerHTML += ` <ul class="list-group">
            <li class="list-group-item"><h2>${userTital}</h2></li>
            <li class="list-group-item"><h3>${userDescription}</h3></li>
            <li class="list-group-item"><a href="${userLink}" target="blank" class="card-link">${userLink}</a></li>
            <li class="list-group-item"><button onclick="editData('${doc.id}')" type="button" class="btn btn-primary">Edit</button></li>
            <li class="list-group-item" onclick="deleteData('${doc.id}')"><button type="button" class="btn btn-danger">Delete</button></li>
          </ul> </br>`
    console.log(userDescription , userTital);
    });
   } catch (error) {
    console.log(error);
    
   }
}
postFuntion()



window.deleteData = async (id)=>{
    loaderDiv.style.display = "flex"
    try {
        await deleteDoc(doc(db, "post", id));
        postFuntion()
    } catch (error) {
        console.log(error);
    }
    finally{
        loaderDiv.style.display = "none"
    }
    console.log(id);
}

window.editData =async (id)=>{
    isEdit = id
    creatModal.style.display = "block"
    console.log(id);
}


const updateData =async ()=>{
    updateButton.innerHTML = `update...`
    console.log(isEdit);

try {
    const washingtonRef = doc(db, "post", isEdit);
await updateDoc(washingtonRef, {
    userDescription: updateDes.value,
    userTital: updateTit.value,
    userLink: linkBlog.value,
});
} 
catch (error) {
    console.log(error);
    
}
finally{
    postFuntion()
    creatModal.style.display = "none"
}
}
updateButton.addEventListener('click' , updateData)


function hideModal() {
    creatModal.style.display = "none"
}
hideicon.addEventListener('click' , hideModal)


function stateChangedFuntion() {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            const uid = user.uid;
            console.log(uid);
            window.location.href = '../auth/login.html'
            
          }
    });
}
stateChangedFuntion()