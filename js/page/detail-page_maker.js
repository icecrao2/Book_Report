import { authCheck } from '../firebase/auth/authenticationCheck.js';
import { changeHeader } from '../components/header_maker.js';
import { getPostDataByKey } from '../firebase/DB/post_data.js';
import { getBookByIsbn } from '../api/getBookByKakao.js';
import { getParameter } from './util.js';


const form = document.querySelector("form");
const main__h1 = document.querySelector(".main__h1");
const main__div__second = document.querySelector(".main__div--second");
const book_name = document.querySelector("#book_name");
const writer = document.querySelector("#writer");
const textArea = document.querySelector("textarea");

const inputDefaultValue = async function() {
  const value = await getPostData();
  main__h1.innerHTML = value.title;
  const book = await getBookByIsbn(value.ISBN);
  const src = book.thumbnail;
  const img = document.createElement("img");
  img.src = src;
  main__div__second.appendChild(img);
  img.id = "img--detail";

  book_name.value = book.title;
  writer.value = value.writer;
  today.value = value.today;
  textArea.value = value.text;
  console.log(value);
};

const getPostData = async function() {
  const value = getParameter();
  const postData = await getPostDataByKey('public', value[1]);
  console.log(postData);
  return postData;
}


const preventEnterKey = function() {
  form.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {

      var key = window.event.keyCode;
      if (key === 13) {
        textArea.value = textArea.value + `\n`;
        console.log(textArea.value);
      }
      event.preventDefault();

    };
  });
};


const pageMaker = async function() {

  const user = await authCheck;

  if (user === null) {
    alert("로그인하세요!");
    window.location.href = "index.html";
  }
  preventEnterKey();
  inputDefaultValue();
  changeHeader(user);



};

pageMaker();
getPostData();