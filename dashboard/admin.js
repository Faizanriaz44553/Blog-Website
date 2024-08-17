import { db , collection , getDocs  } from "../firebase.js";

let userInformation = document.querySelector("#user-information")
const postFuntion = async ()=>{
    const querySnapshot = await getDocs(collection(db, "post"));
querySnapshot.forEach((doc) => {
    const {userDescription , userTital} = doc.data();
    userInformation.innerHTML += ` <ul class="list-group">
        <li class="list-group-item"><h2>${userTital}</h2></li>
        <li class="list-group-item"><h2>${userDescription}</h2></li>
        <li class="list-group-item"><button type="button" class="btn btn-primary">Edit</button></li>
        <li class="list-group-item"><button type="button" class="btn btn-danger">Delete</button></li>
      </ul> </br>`
console.log(userDescription , userTital);
});
}
postFuntion()



