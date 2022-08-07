

export const getParameter = function() {
  const url = location.href;
  const parameter = url.slice(url.indexOf('?') + 1, url.length);
  const value = parameter.split('=');
  return value;
};


export const getTodayDate = function() {

  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  var today = year + "-" + month + "-" + day;
  return today;
}