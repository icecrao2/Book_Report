import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";


const auth = getAuth();
signOut(auth).then(() => {
  window.location.href="index.html";
}).catch((error) => {
  
});

//console.log(user);