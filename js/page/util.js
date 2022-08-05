

export const getParameter = function() {
  const url = location.href;
  const parameter = url.slice(url.indexOf('?') + 1, url.length);
  const value = parameter.split('=');
  return value;
};