import {YD_APP_KEY,YD_KEY} from "../config"

// const appKey = '78ab6bc4c8f5e1a5';
// const key = 'jYOJPLr0Mu9rCp77YAMWGYX1GirBe92w';//注意：暴露appSecret，有被盗用造成损失的风险
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
const from = 'zh-CHS';
const to = 'en';
const truncate=(q)=>{
    var len = q.length;
    if(len<=20) return q;
    return q.substring(0, 10) + len + q.substring(len-10, len);
}

const getSign= (q,salt,curtime)=>{
   let str = YD_APP_KEY + truncate(q) + salt + curtime + YD_KEY;
   return CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex)
}
const getParam = (q)=>{
    var salt = (new Date).getTime();
    var curtime = Math.round(new Date().getTime()/1000);
    return{
        q: q,
        appKey: YD_APP_KEY,
        salt: salt,
        from: from,
        to: to,
        sign: getSign(q,salt,curtime),
        signType: "v3",
        curtime: curtime,
    }
}
export default getParam