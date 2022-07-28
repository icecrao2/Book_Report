import { getBook } from "./kakaoApi.js";

const ISBN = 'isbn';
const TITLE = 'title';


export const getBookByIsbn = async function(query) {

  const data = await getBook(ISBN, query);

  return data.documents[0];

}

export const getBookByTitle = async function(query) {

  const data = await getBook(TITLE, query);

  return data.documents;

}