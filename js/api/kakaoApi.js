
const API_KEY = 'KakaoAK 82a3eb01f6a14c4666820fc97ddb209d';



export const getBook = async function(target, query){
    
  let res =
    await fetch(`https://dapi.kakao.com/v3/search/book?target=${target}&query=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': API_KEY
      },
       encoding: 'UTF-8',
    });
  
  let parseRes = await res.json();

  return parseRes;
};

