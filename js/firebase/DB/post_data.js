import { getDatabase, ref, set, child, get, onValue, push, update, remove } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";



export const writePostData = (writer, title, ISBN, scope, today, text, email) =>
  new Promise((resolve, reject) => {


    const db = getDatabase();

    const key = push(child(ref(db), 'posts')).key;

    set(ref(db, 'posts/' + key), {
      writer: writer,
      title: title,
      ISBN: ISBN,
      today: today,
      text: text,
      scope: scope,
      email: email
    }).then(() => {
      console.log("complete!");
      resolve();
    }).catch(() => {
      console.log("error!");
      reject();
    });


  });




//get userData by snapshot
export const getPostData = function(userId) {
  const dbRef = ref(getDatabase());

  get(child(dbRef, `posts/${userId}`)).then((snapshot) => {

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
export const testData = function() {
  const db = getDatabase();
  const auth = getAuth();

  const userId = auth.currentUser.uid;
  return onValue(ref(db, '/posts/' + userId), (snapshot) => {
    const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    console.log(username);
  }, {
    onlyOnce: true
  });
};

//userId is key
//if you want change user's info,  you must know userId 
export const updatePostData = function(userId, name, email, imageUrl) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    name: name,
    email: email,
    imageUrl: imageUrl
  };

  const updates = {};
  //key:value structure
  updates['/posts/' + userId] = postData;
  //updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  update(ref(db), updates).then(() => {
    console.log("complete!");
  }).catch(() => {
    console.log("error!");
  });
};


export const deletePostData = function(userId) {
  const db = getDatabase();
  remove(ref(db, 'posts/' + userId)).then(() => {
    console.log("complete!");
  }).catch(() => {
    console.log("error1");
  })
}



//updateUserData(5,16,16,16);
//deleteUserData(5);
//getPostData(9);