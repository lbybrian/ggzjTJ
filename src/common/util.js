import Vue from "vue";

/**
 * 公共方法
 * @constructor
 */
var Utils;
Utils = {
  stringToObject: function (str, flag) {
    function getObj(data) {
      return data;
    }
    if (flag) {
      try {
        var temp = unescape(str);
        str = temp;
      } catch (e) {
        console.log(e);
      }
    }
    var data = eval("(\n" + str + "\n)");
    return data;
  },
  objectToString: function (obj, flag) {
    if (obj && obj.constructor.name === "Object") {
      var str = "{";
      for (var k in obj) {
        if (typeof (obj[k]) === "string") {
          if (obj[k].search("'") !== -1) {
            str += "\"" + k + '\":"' + obj[k] + '",';
          } else {
            str += "\"" + k + "\":'" + obj[k] + "',";
          }

        } else {
          str += "\"" + k + "\":" + this.objectToString(obj[k]) + ","
        }
      }
      if (str.length === 1) {
        str = "{}"
      } else {
        str = str.slice(0, str.length - 1) + "}";
      }
    } else if (obj && (obj.constructor.name === "Array")) {
      if (obj.length > 0) {
        var str = "[ " + this.objectToString(obj[0]);
        for (var i = 1; i < obj.length; i++) {
          str += "," + this.objectToString(obj[i]);
        }
        str += "]"
      } else {
        var str = "[]";
      }
    } else if (obj && (obj.constructor.name === "Function")) {
      var str = obj.toString();
    } else if (obj && (typeof (obj) === "string")) {
      if (flag) {
        var str = "\'" + escape(obj) + "\'";
      } else {
        var str = "\'" + obj.replace(/\'/g, "\\'") + "\'";
      };
    } else if ((typeof (obj) === "number") || (typeof (obj) === "boolean")) {
      var str = obj;
    } else {
      var str = "''";
    }
    return str;
  }

};
export default Utils
