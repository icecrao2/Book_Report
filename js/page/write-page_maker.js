import { authCheck } from '../firebase/auth/authenticationCheck.js';
import { changeHeader } from '../components/header_maker.js';

const writer = document.querySelector("#writer");
const dateForm = document.querySelector("#today");



const inputDefaultValue = function(user) {
  writer.value = user.displayName;

  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  var today = year + "-" + month + "-" + day;

  dateForm.value = today;
}

const pageMaker = async function() {

  const user = await authCheck;
  
  changeHeader(user);
  
  if (user === null) {
    alert("로그인하세요!");
    window.location.href = "index.html";
  }

  inputDefaultValue(user);

};

pageMaker();