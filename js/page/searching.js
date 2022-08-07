

export const search = function(publicBookArray, publicBookKeyArray, text) {
  let indexNum = [];

  let keyNewArray = [];
  let i = 0;
  const newArray = publicBookArray.filter(
    (item, index) => {
      
      let title = item.title;
      
      if (title.includes(text)) {
        keyNewArray[i] = publicBookKeyArray[index];
        i++;
        return true;
      }
      else {
        return false;
      }
    }
  );
  return [newArray, keyNewArray];

}
