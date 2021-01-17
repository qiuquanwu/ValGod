import MD5 from "./md5"
import {BD_APP_ID,BD_KEY} from "../config"
var to = 'en';
var from = 'zh';
const getSign= (q,salt)=>{
    var str1 = BD_APP_ID + q + salt +BD_KEY;
    return MD5(str1);
 }
const getParam = (q)=>{
    var salt = (new Date).getTime();
    return{
        q: q,
        appid: BD_APP_ID,
        salt: salt,
        from: from,
        to: to,
        sign: getSign(q,salt)
    }
}
export default getParam