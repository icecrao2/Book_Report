import { getBookByIsbn } from '../api/getBookByKakao.js';
import { authCheck } from '../firebase/auth/authenticationCheck.js';
import { changeHeader } from '../components/header_maker.js';
import { getPostData } from '../firebase/DB/post_data.js';
import { search } from './searching.js';
import { getParameter } from './util.js';

const main__article = document.querySelector(".main__article");
const SCOPE = 'public';
const main__serach_form = document.querySelector(".main__serach-form");


const makeBookList = async function(publicBookArray, publicBookKeyArray) {
  for (let i = 0; i < publicBookArray.length; i++) {


    const data = await getBookByIsbn(publicBookArray[i].ISBN);

    const main__article__section__img = document.createElement("img");
    main__article__section__img.classList.add("main__article__section__img");
    main__article__section__img.src = data.thumbnail;


    const main__article__section = document.createElement("section");
    const main__article__section__div = document.createElement("div");
    const main__article__section__div__h1 = document.createElement("h1");
    const main__article__section__div__p = document.createElement("p");

    //DB에서 불러와야함
    if (publicBookArray[i].title.length >= 18)
      main__article__section__div__h1.innerText = publicBookArray[i].title.substring(0, 19);
    else
      main__article__section__div__h1.innerText = publicBookArray[i].title;

    main__article__section.id = publicBookKeyArray[i];

    if (publicBookArray[i].text.length >= 120)
      main__article__section__div__p.innerText = publicBookArray[i].text.substring(0, 121);
    else
      main__article__section__div__p.innerText = publicBookArray[i].text;



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
  console.log(publicBookArray);
}

const getBookList = async function(searching) {

  const publicBookArrayFunc = await getPostData("public");
  let publicBookArray = [];
  let publicBookKeyArray = [];
  //이런식으로 받아야지 정렬됨
  publicBookArrayFunc.forEach(function(child) {
    publicBookArray.push(child.val());
    publicBookKeyArray.push(child.key);
  });
  publicBookArray.reverse();
  publicBookKeyArray.reverse();

  //수정해야됨
  const val = search(publicBookArray, publicBookKeyArray, searching);
  const bookArray = val[0];
  const keyArray = val[1];
  makeBookList(bookArray, keyArray);
  // makeBookList(publicBookArray, publicBookKeyArray);
};

const main__article__section_clickEvent = function(event) {

  const id = event.currentTarget.id + '=' + SCOPE;
  window.location.href = `detail.html?id=${encodeURI(id, 'utf-8')}`;

};

const searchFormEvt = function(evt) {
  evt.preventDefault();
  const text = evt.target.children[0].value;
  console.log(text);
  window.location.href = `index.html?search=${encodeURI(text, 'utf-8')}`;
}

const pageMaker = async function() {


  const param = getParameter();
  const searchText = decodeURI(param[1], 'utf-8');

  
  if (searchText === undefined || searchText=="undefined"
      || searchText === '' || searchText === null)
    await getBookList('');
  
  else
    await getBookList(searchText);

  main__serach_form.addEventListener("submit", searchFormEvt);


  const user = await authCheck;
  changeHeader(user);

  if (user === null) {

  } else {

    //console.log(user);
  }

};

pageMaker();





