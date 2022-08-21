
import { getBookByTitle, getBookByIsbn } from '../api/getBookByKakao.js';
import { getParameter } from './util.js';


const ul = document.querySelector("ul");
const search = document.querySelector("#book_name");
const button = document.querySelector(".book-searching-btn");


function removeAllchild(div) {
  while (div.hasChildNodes()) {
    div.removeChild(div.firstChild);
  }
};

const make_search_input = function() {
  const book_name = getParameter();
  search.value = decodeURI(book_name[1]);
};

const click_li_event = function(evt) {

  let id = evt.currentTarget.id;
  let isbn_array = id.split(' ');
  let isbn;
  if (isbn_array[0] == "" || isbn_array[0] === null || isbn_array[0] === undefined)
    isbn = isbn_array[1];
  else
    isbn = isbn_array[0];
  opener.document.querySelector("#isbn").value = isbn;
  opener.document.querySelector("#book_name").value = evt.currentTarget.children[1].innerText;

  window.close();
}

const make_book_list = async function() {
  const book_name = search.value;
  const book_list = await getBookByTitle(book_name);
  const SEARCH_NUMBER = book_list.length;
  console.log(book_list);

  if (!Array.isArray(book_list) || book_list.length == 0) {
    ul.innerHTML = "<li>찾으시는 내용이 없습니다! </li>";
  }
  else {
    for (let i = 0; i < SEARCH_NUMBER; i++) {
      const li = document.createElement("li");
      const title_span = document.createElement("span");
      const author_span = document.createElement("span");
      const img = document.createElement("img");
      title_span.innerHTML = book_list[i].title;
      author_span.innerHTML = book_list[i].authors[0];
      img.src = book_list[i].thumbnail;
      img.alt = "no img";
      li.appendChild(img);
      li.appendChild(title_span);
      li.appendChild(author_span);
      li.id = book_list[i].isbn;
      ul.appendChild(li);
    }
  }


}

const book_searching_event = async function() {
  removeAllchild(ul);
  make_book_list(search.value);
}

const enter_searching_event = function(e) {
   if (e.key === 'Enter'){
    book_searching_event();
   }
}

const popup_maker = async function() {
  make_search_input();
  await make_book_list();

  const li = document.querySelectorAll("li");

  for (let i = 0; i < li.length; i++) {
    li[i].addEventListener("click", click_li_event);
  }

  button.addEventListener("click", book_searching_event);
  search.addEventListener("keypress", enter_searching_event);

};
popup_maker();
