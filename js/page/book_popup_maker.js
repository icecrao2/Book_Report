
import { getBookByTitle, getBookByIsbn } from '../api/getBookByKakao.js';


const ul = document.querySelector("ul");
const search = document.querySelector("#book_name");


const make_search_input = function() {
  const url = location.href;
  const parameter = url.slice(url.indexOf('?') + 1, url.length);
  const book_name = parameter.split('=');
  search.value = decodeURI(book_name[1]);
};

const click_li_event = async function(evt) {

  let id = evt.target.id;
  let isbn_array = id.split(' ');
  let isbn;
  console.log(id);
  if (isbn_array[0] == "")
    isbn = isbn_array[1];
  else
    isbn = isbn_array[0];
  console.log(isbn);
  const book_info = await getBookByIsbn(isbn);
  console.log(book_info);
  opener.document.querySelector("#isbn").value = isbn;
  window.close();
}

const make_book_list = async function() {
  const SEARCH_NUMBER = 10;
  const book_name = search.value;
  const book_list = await getBookByTitle(book_name);
  console.log(book_list);
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

const popup_maker = async function() {
  make_search_input();
  await make_book_list();

  const li = document.querySelectorAll("li");

  for (let i = 0; i < li.length; i++) {
    li[i].addEventListener("click", click_li_event);
  }

};
popup_maker();