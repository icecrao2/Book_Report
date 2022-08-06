import { authCheck } from '../firebase/auth/authenticationCheck.js';
import { changeHeader } from '../components/header_maker.js';
import { getPostDataByKey, deletePostData } from '../firebase/DB/post_data.js';
import { getBookByIsbn } from '../api/getBookByKakao.js';
import { getParameter } from './util.js';


const form = document.querySelector("form");
const main__h1 = document.querySelector(".main__h1");
const main__div__second = document.querySelector(".main__div--second");
const book_name = document.querySelector("#book_name");
const writer = document.querySelector("#writer");
const textArea = document.querySelector("textarea");
const detail_btns = document.querySelectorAll('.detail-btns');
const del = document.querySelector('#delete');
const update = document.querySelector('#update');

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
  const postData = await getPostDataByKey(value[2], value[1]);
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

const checkPostAuth = async function(userEmail) {
  const value = await getPostData();
  const email = value.email;

  if (email === userEmail) {
    makeBtn(value[1]);
  }
};

const makeBtn = function() {

  del.addEventListener("click", deleteBtnEvent);
  update.addEventListener("click", updateBtnEvent);
  for (let i = 0; i < detail_btns.length; i++) {
    detail_btns[i].classList.remove('hidden');
  }
}

const deleteBtnEvent = async function(evt) {

  evt.preventDefault();
  const value = getParameter();
  const scope = value[2];
  const key = value[1];
  await deletePostData(scope, key);
  window.location.href = "index.html";
}

const updateBtnEvent = function(evt) {

  evt.preventDefault();

  const value = getParameter();
  window.location.href = `update.html?id=${encodeURI(value[1] + '=' + value[2], 'utf-8')}`;

}

const pageMaker = async function() {

  const user = await authCheck;

  if (user === null) {
    alert("로그인하세요!");
    window.location.href = "index.html";
  }
  preventEnterKey();
  await inputDefaultValue();
  checkPostAuth(user.email);
  changeHeader(user);


};

pageMaker();
getPostData();