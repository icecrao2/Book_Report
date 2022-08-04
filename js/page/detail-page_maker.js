import { authCheck } from '../firebase/auth/authenticationCheck.js';
import { changeHeader } from '../components/header_maker.js';
import { writePostData } from '../firebase/DB/post_data.js';
import { getBookByTitle } from '../api/getBookByKakao.js';

const writng_submit = document.querySelector("#writng_submit");

const title = document.querySelector("#title");
const book_name = document.querySelector("#book_name");
const writer = document.querySelector("#writer");
const dateForm = document.querySelector("#today");
const textArea = document.querySelector("textarea");
const scope = document.querySelector("#scope");
const book_searching_btn = document.querySelector(".book-searching-btn");
const isbn = document.querySelector("#isbn");
const form = document.querySelector("form");

let email;


const submitBtnEvent = async function(evt) {

  evt.preventDefault();

  const ISBN = isbn.value;
  console.log(scope.value);


  await writePostData(writer.value, title.value, ISBN, scope.value, dateForm.value, textArea.value, email).then(() => {
    window.location.href = "index.html";
  });

}

const getBookISBN = async function() {
  if (book_name.value === null || book_name.value === undefined || book_name.value === '') {

  }
  else {
    const bookArray = await getBookByTitle(book_name.value);

    const popup = window.open(`book_popup.html?name=${encodeURI(book_name.value, 'utf-8')}`, "search-book", "width = 1000, height = 800, top = 100, left = 200, location = no");
  }
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
  changeHeader(user);
  email = user.email;

  form.addEventListener("submit", submitBtnEvent);
  book_searching_btn.addEventListener("click", getBookISBN);

};

pageMaker();