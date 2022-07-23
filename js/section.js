import {getBookByIsbn} from './api/getBookByKakao.js';

const main__article = document.querySelector(".main__article");


const SECTION_NUMBER = 9;

const getBookList = async function(){
  
  for(let i = 0 ; i < SECTION_NUMBER ; i++){
  
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
    main__article__section__div__p.innerText="독후감 내용(짧게)";

    
    
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

getBookList();


