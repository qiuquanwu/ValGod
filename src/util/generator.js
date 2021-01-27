const genetator = {
  bigHumpNaming: (translateArray) => {
    const res = translateArray.map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    });
    return {
      id: "bigHumpNaming",
      //example: "FirstName",
      title: "大驼峰",
      value: res.join(""), //大驼峰
    };
  },
  smallHumpNaming: (translateArray) => {
    const res = translateArray.map((str, index) => {
      if (index == 0) {
        return str.charAt(0).toLowerCase() + str.slice(1);
      }
      return str.charAt(0).toUpperCase() + str.slice(1);
    });
    return {
      id: "smallHumpNaming",
      //example: "firstName",
      title: "小驼峰",
      value: res.join(""),
    };
  },
  underlineNaming: (translateArray) => {
    const res = translateArray.map((str) => {
        return str.toLowerCase();
      });
    return {
      id: "underlineNaming",
      //example: "first_name",
      title: "下划线",
      value: res.join("_"),
    };
  },
  constant: (translateArray) => {
    const res = translateArray.map((str) => {
        return str.toUpperCase();
      });
    return {
      id: "constant",
      //example: "FIRST_NAME",
      title: "常量",
      value: res.join("_"),
    };
  },
  php: (translateArray) => {
    const res = translateArray.map((str, index) => {
      if (index == 0) {
        return str.charAt(0).toLowerCase() + str.slice(1);
      }
      return str.charAt(0).toUpperCase() + str.slice(1);
    });
    return {
      id: "php",
      //example: "$firstName",
      title: "php变量",
      value: "$"+res.join(""),
    };
  },
  controller: (translateArray) => {
    const res = translateArray.map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    });
    return {
      id: "controller",
      //example: "FirstNameController",
      title: "控制器",
      value: res.join("")+"Controller", 
    };
  },
  cssStyle: (translateArray) => {
    const res = translateArray.map((str) => {
        return str.toLowerCase();
      });
    return {
      id: "cssStyle",
      //example: "first-name",
      title: "css类名",
      value: res.join("-"),
    };
  }
};

export default genetator;
