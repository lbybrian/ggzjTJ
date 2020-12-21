import config from './config';
import axios from 'axios';
let qs = require('qs')

let AxiosRequest = function (url, method, bodyType) {
  this.url = url;
  this.method = method;
  this.bodyType = bodyType;
  var _self = this;
  return function (query, callback) {
    var method = _self.method;
    var url = _self.url;
    var cTypeHeader = {
      'Content-Type': bodyType || "application/x-www-form-urlencoded; charset=utf-8"
    }

    var token = localStorage.getItem("token");

    if ((method === "get" || method === "delete") && query && !query._path) {
      let t = qs.stringify(query);
      url += "?" + t;
    } else if (query._path) {
      url += "/" + query._path;
      delete query._path;
      let t = qs.stringify(query);
      url += "?" + t;
    } else {
      
    }
    // if (token) {
    //   if (url.search(/\?/) === -1) {
    //     url += "?token=" + token;
    //   } else {
    //     url += "&token=" + token;
    //   }
    // }
    

    if (cTypeHeader['Content-Type'].search("application/x-www-form-urlencoded") !== -1) {
      query = qs.stringify(query);
    }

    var options = {
      headers: cTypeHeader,
    }




    axios[method](url, query, options).then(function (data) {

      if(data.data.status < 0) {
        location.href = "#/";
      }
  
      if (typeof (callback) === "function") {
        callback(data);
      }
    })
  }
}

const adapter = {}
for (let k in config) {
  var item = config[k];
  if (item.url && item.method) {
    adapter[k] = new AxiosRequest(item.url, item.method, item.bodyType);
  }
}
adapter.config = config;


export default adapter
