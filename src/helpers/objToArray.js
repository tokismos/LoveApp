export default (Obj) => {
  let arr = [];
  for (let key in Obj) {
    arr.push({ key, data: Obj[key] });
  }
  return arr;
};
