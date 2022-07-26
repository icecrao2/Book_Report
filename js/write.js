const writer = document.querySelector("#writer");
const dateForm = document.querySelector("#today");

const userInfo = localStorage.getItem('user');
const JSONUserInfo = JSON.parse(userInfo);


console.dir(JSONUserInfo);
writer.value = JSONUserInfo.displayName;

var date = new Date();
var year = date.getFullYear();
var month = ("0" + (1 + date.getMonth())).slice(-2);
var day = ("0" + date.getDate()).slice(-2);

var today =  year + "-" + month + "-" + day;

dateForm.value = today;