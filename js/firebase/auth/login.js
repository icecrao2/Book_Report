import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const provider = new GoogleAuthProvider();
const auth = getAuth();
let userInfo = {};

console.log(userInfo);

if (auth.onAuthStateChanged(function(user) {
  
  console.log(user);

  //not loged in
  if (!user) {
    signInWithRedirect(auth, provider).then((result) => { 
      setTimeout(10000);
      console.dir(result);
    });
  }
  //loged in
  else {
    window.location.href="index.html";
  }
}));


//console.log(user);