import { authCheck } from '../firebase/auth/authenticationCheck.js';
import { changeHeader } from '../components/header_maker.js';
import { writePostData } from '../firebase/DB/post_data.js';

const writng_submit = document.querySelector("#writng_submit");

const title = document.querySelector("#title");
const book_name = document.querySelector("#book_name");
const writer = document.querySelector("#writer");
const dateForm = document.querySelector("#today");
const textArea = document.querySelector("textarea");
const scope = document.querySelector("#scope");


let email;


const inputDefaultValue = function(user) {
  writer.value = user.displayName;

  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  var today = year + "-" + month + "-" + day;

  dateForm.value = today;
}

const submitBtnEvent = async function(evt) {

  const ISBN = '9788972917038';
  console.log(scope.value);
  writePostData(writer.value, title.value, ISBN, scope.value, dateForm.value, textArea.value, email).then(() => {
    window.location.href = "index.html";
  });

  //window.location.href = "index.html";


  evt.preventDefault();

}

const pageMaker = async function() {

  const user = await authCheck;
  email = user.email;
  changeHeader(user);

  if (user === null) {
    alert("로그인하세요!");
    window.location.href = "index.html";
  }

  inputDefaultValue(user);

  writng_submit.addEventListener("click", submitBtnEvent);

};

pageMaker();