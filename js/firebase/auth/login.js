import { getAuth, signInWithRedirect, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { authCheck } from './authenticationCheck.js';
const provider = new GoogleAuthProvider();
const auth = getAuth();

async function login(){
  
  const user = await authCheck;
  if (user === null) {
    signInWithRedirect(auth, provider);
  } else {
    window.location.href = "index.html";
  }
  
};

login();

//console.log(user);