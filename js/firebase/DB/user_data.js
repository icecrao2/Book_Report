import { getDatabase, ref, set, child, get, onValue, push, update, remove } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";



export const writeUserData = function(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  }).then(()=>{
    console.log("complete!");
  }).catch(()=>{
    console.log("error!");
  });
};

//get userData by snapshot
export const getUserData = function(userId){
  const dbRef = ref(getDatabase());
  
  get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    
    console.error(error);
    
  });
};

//this get loged in people's info
export const testData = function(){
  const db = getDatabase();
  const auth = getAuth();
  
  const userId = auth.currentUser.uid;
  return onValue(ref(db, '/users/' + userId), (snapshot) => {
    const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    console.log(username);
  }, {
    onlyOnce: true
  });
};

//userId is key
//if you want change user's info,  you must know userId 
export const updateUserData = function(userId, name, email, imageUrl) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    name: name,
    email: email,
    imageUrl: imageUrl
  };

  const updates = {};
  //key:value structure
  updates['/users/' + userId] = postData;
  //updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  update(ref(db), updates).then(()=>{
    console.log("complete!");
  }).catch(()=>{
    console.log("error!");
  });
};


export const deleteUserData = function(userId){
  const db = getDatabase();
  remove(ref(db, 'users/'+userId)).then(()=>{
    console.log("complete!");
  }).catch(()=>{
    console.log("error1");
  })
}



//updateUserData(5,16,16,16);
//deleteUserData(5);
getUserData(9);