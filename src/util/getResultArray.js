import genetator from "./generator";
const getResultArray = (translateArray, options) => {
    let resultArray = [];
    options.map((tranlateId) => {
      resultArray.push(genetator[tranlateId](translateArray));
    });
    return resultArray;
  };
export default getResultArray