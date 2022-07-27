import { getAuth, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const authCheck = new Promise((resolve, reject) => {
  
  
  if (auth.onAuthStateChanged(function(user) {
  
    //not loged in
    if (!user) {
      resolve(null);
    }
    //loged in
    else {
      resolve(user);
    }
  }));

  
});
