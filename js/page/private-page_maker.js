import { getBookByIsbn } from '../api/getBookByKakao.js';
import { authCheck } from '../firebase/auth/authenticationCheck.js';
import { changeHeader } from '../components/header_maker.js';
import { getPostDataByUser } from '../firebase/DB/post_data.js';
import { search } from './searching.js';
import { getParameter } from './util.js';

const main__article = document.querySelector(".main__article");
const SCOPE = 'private';
const main__serach_form = document.querySelector(".main__serach-form");

const makeBookList = async function(privateBookArray, privateBookKeyArray) {
  for (let i = 0; i < privateBookArray.length; i++) {


    const data = await getBookByIsbn(privateBookArray[i].ISBN);

    const main__article__section__img = document.createElement("img");
    main__article__section__img.classList.add("main__article__section__img");
    main__article__section__img.src = data.thumbnail;


    const main__article__section = document.createElement("section");
    const main__article__section__div = document.createElement("div");
    const main__article__section__div__h1 = document.createElement("h1");
    const main__article__section__div__p = document.createElement("p");

    //DB에서 불러와야함
    if (privateBookArray[i].title.length >= 18)
      main__article__section__div__h1.innerText = privateBookArray[i].title.substring(0, 19);
    else
      main__article__section__div__h1.innerText = privateBookArray[i].title;

    main__article__section.id = privateBookKeyArray[i];

    if (privateBookArray[i].text.length >= 120)
      main__article__section__div__p.innerText = privateBookArray[i].text.substring(0, 121);
    else
      main__article__section__div__p.innerText = privateBookArray[i].text;



    main__article__section.classList.add("main__article__section");
    main__article__section.appendChild(main__article__section__img);

    main__article__section__div.classList.add("main__article__section__div");

    main__article__section__div__h1.classList.add("main__article__section__h1");
    main__article__section__div__p.classList.add("main__article__section__p");
    main__article__section__div.appendChild(main__article__section__div__h1);
    main__article__section__div.appendChild(main__article__section__div__p);
    main__article__section.appendChild(main__article__section__div);

    main__article__section.addEventListener("click", main__article__section_clickEvent);

    main__article.appendChild(main__article__section);


  }
}

const getBookList = async function(email, searching) {

  const privatePostArrayFunc = await getPostDataByUser(SCOPE, email);
  let privateBookArray = [];
  let privateBookKeyArray = [];
  //이런식으로 받아야지 정렬됨
  privatePostArrayFunc.forEach(function(child) {
    privateBookArray.push(child.val());
    privateBookKeyArray.push(child.key);
  });

  privateBookArray.reverse();
  privateBookKeyArray.reverse();


  const val = search(privateBookArray, privateBookKeyArray, searching);
  const bookArray = val[0];
  const keyArray = val[1];
  makeBookList(bookArray, keyArray);
  //makeBookList(privateBookArray, privateBookKeyArray);

};

const main__article__section_clickEvent = function(event) {

  const id = event.currentTarget.id + '=' + SCOPE;
  window.location.href = `detail.html?id=${encodeURI(id, 'utf-8')}`;

};


const searchFormEvt = function(evt) {
  evt.preventDefault();
  const text = evt.target.children[0].value;
  console.log(text);
  window.location.href = `private-main.html?search=${encodeURI(text, 'utf-8')}`;
}

const pageMaker = async function() {

  const user = await authCheck;
  changeHeader(user);

  if (user === null) {

  } else {

    const param = getParameter();
    const searchText = decodeURI(param[1], 'utf-8');

    if (searchText === undefined || searchText == "undefined"
      || searchText === '' || searchText === null)
      await getBookList(user.email, '');
    else
      await getBookList(user.email, searchText);

    main__serach_form.addEventListener("submit", searchFormEvt);
    //console.log(user);
  }

};

pageMaker();





