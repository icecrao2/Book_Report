import { getBookByIsbn } from '../api/getBookByKakao.js';
import { authCheck } from '../firebase/auth/authenticationCheck.js';
import { changeHeader } from '../components/header_maker.js';
import { getPostData } from '../firebase/DB/post_data.js';

const main__article = document.querySelector(".main__article");
const SECTION_NUMBER = 9;


const getBookList = async function() {

  const publicBookArrayFunc = await getPostData("public");
  let publicBookArray = [];
  //이런식으로 받아야지 정렬됨
  publicBookArrayFunc.forEach(function(child) {
    console.log(child.val());
    publicBookArray.push(child.val());
  });
  console.log(publicBookArray);

  for (let i = 0; i < SECTION_NUMBER; i++) {


    const data = await getBookByIsbn('9788972917038');

    const main__article__section__img = document.createElement("img");
    main__article__section__img.classList.add("main__article__section__img");
    main__article__section__img.src = data.thumbnail;


    const main__article__section = document.createElement("section");
    const main__article__section__div = document.createElement("div");
    const main__article__section__div__h1 = document.createElement("h1");
    const main__article__section__div__p = document.createElement("p");

    //DB에서 불러와야함
    main__article__section__div__h1.innerText = "열여덟글자";
    main__article__section__div__p.innerText = "독후감 내용(짧게)";



    main__article__section.classList.add("main__article__section");
    main__article__section.appendChild(main__article__section__img);

    main__article__section__div.classList.add("main__article__section__div");

    main__article__section__div__h1.classList.add("main__article__section__h1");
    main__article__section__div__p.classList.add("main__article__section__p");
    main__article__section__div.appendChild(main__article__section__div__h1);
    main__article__section__div.appendChild(main__article__section__div__p);
    main__article__section.appendChild(main__article__section__div);

    main__article.appendChild(main__article__section);
  }

};

const pageMaker = async function() {
  getBookList();

  const user = await authCheck;
  changeHeader(user);

  if (user === null) {

  } else {
    //console.log(user);
  }

};


pageMaker();





