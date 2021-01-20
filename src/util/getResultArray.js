import genetator from "./generator";
const getResultArray = (translateArray, options, optionState) => {
  let resultArray = [];
  options.map((tranlateId) => {
    if (optionState[tranlateId]) {
      resultArray.push(genetator[tranlateId](translateArray));
    }
  });
  return resultArray;
};
export default getResultArray