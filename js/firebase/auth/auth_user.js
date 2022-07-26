import { getAuth, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const provider = new GoogleAuthProvider();
const auth = getAuth();
let userInfo;

const sign_in = document.querySelector(".header__href--sign-in");
const sign_out = document.querySelector(".header__href--sign-out");

if (auth.onAuthStateChanged(function(user) {

  //not loged in
  if (!user) {
    sign_out.classList.add("hidden");
    sign_in.classList.remove("hidden");
  }
  //loged in
  else {
    sign_out.classList.remove("hidden");
    sign_in.classList.add("hidden");

    console.log(user.email);
    userInfo = user;  
    const stringUserInfo = JSON.stringify(userInfo);
    localStorage.setItem('user', stringUserInfo);
    console.log(userInfo);
  }
}));
