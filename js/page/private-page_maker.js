import { getBookByIsbn } from '../api/getBookByKakao.js';
import { authCheck } from '../firebase/auth/authenticationCheck.js';
import { changeHeader } from '../components/header_maker.js';
import { getPostDataByUser } from '../firebase/DB/post_data.js';

const main__article = document.querySelector(".main__article");
const SCOPE = 'private';


const getBookList = async function(email) {

  const publicBookArrayFunc = await getPostDataByUser("private", email);
  let publicBookArray = [];
  let publicBookKeyArray = [];
  //이런식으로 받아야지 정렬됨
  publicBookArrayFunc.forEach(function(child) {
    publicBookArray.push(child.val());
    publicBookKeyArray.push(child.key);
  });
  publicBookArray.reverse();
  publicBookKeyArray.reverse();

  const page = 1;
  let startArrayIndex = (page - 1) * 10;
  let endArrayIndex = (page) * 10;

  if (publicBookArray.length < endArrayIndex) {
    endArrayIndex = publicBookArray.length;
  }

  console.log(publicBookArray);

  for (let i = startArrayIndex; i < endArrayIndex; i++) {


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

};

const main__article__section_clickEvent = function(event) {
  console.log(event.currentTarget);
  const id = event.currentTarget.id + '=' + SCOPE;
  window.location.href = `detail.html?id=${encodeURI(id, 'utf-8')}`;

};

const pageMaker = async function() {

  const user = await authCheck;
  changeHeader(user);

  if (user === null) {

  } else {
    await getBookList(user.email);

    //console.log(user);
  }

};

pageMaker();





