import { getDatabase, ref, set, child, get, onValue, push, update, remove, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

export const writePostData = (writer, title, ISBN, scope, today, text, email) =>
  new Promise((resolve, reject) => {


    const db = getDatabase();

    const key = push(child(ref(db), 'posts')).key;

    set(ref(db, `posts/${scope}/` + key), {
      writer: writer,
      title: title,
      ISBN: ISBN,
      today: today,
      text: text,
      email: email
    }).then(() => {
      console.log("complete!");
      resolve();
    }).catch(() => {
      console.log("error!");
      reject();
    });


  });

export const getPostDataByKey = (scope, key) =>
  new Promise(async (resolve, reject) => {

    const db = getDatabase();
    const dbRef = ref(db);

    get(child(dbRef, `posts/${scope}/${key}`)).then((snapshot) => {
      if (snapshot.exists()) {
        resolve(snapshot.val());
      } else {
        resolve();
      }
    });
  });

export const getPostDataByUser = (scope, user) =>
  new Promise(async (resolve, reject) => {

    const db = getDatabase();
    const dbRef = ref(getDatabase());

    const recentPostsRef = query(ref(db, `posts/${scope}`), orderByChild('email'), equalTo(user));

    get(recentPostsRef, `posts/${scope}`).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach(function(child) {
          console.log(child.val());
        });
        resolve(snapshot);
      }
    });

  });

//get userData by snapshot
export const getPostData = (scope, title) =>
  new Promise(async (resolve, reject) => {

    const db = getDatabase();
    const dbRef = ref(getDatabase());

    const recentPostsRef = query(ref(db, `posts/${scope}`), orderByChild('today'));

    get(recentPostsRef, `posts / ${scope}`).then((snapshot) => {

      if (snapshot.exists()) {
        snapshot.forEach(function(child) {
        });


        //  console.log(snapshot.val());
        resolve(snapshot);
      } else {
        console.log("No data available"); s
      }
    }).catch((error) => {

      console.error(error);

    });

  });

//userId is key
//if you want change user's info,  you must know userId 
export const updatePostData = (writer, title, ISBN, scope, today, text, email, key) =>
  new Promise(async (resolve, reject) => {
    const db = getDatabase();

    // A post entry.
    const postData = {
      writer: writer,
      title: title,
      ISBN: ISBN,
      today: today,
      text: text,
      email: email
    };

    const updates = {};
    //key:value structure
    updates[`/posts/${scope}/${key}`] = postData;
    //updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    update(ref(db), updates).then(() => {
      console.log("complete!");
      resolve();
    }).catch(() => {
      console.log("error!");
    });
  });

export const deletePostData = (scope, key) =>
  new Promise(async (resolve, reject) => {
    const db = getDatabase();
    remove(ref(db, `posts/${scope}/${key}`)).then(() => {
      console.log("complete!");
      alert('삭제되었습니다');
      resolve();
    }).catch(() => {
      console.log("error1");
    })

  });