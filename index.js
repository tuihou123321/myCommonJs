import {baseHostUrl} from "../config/config";
import $ from "jquery"
import {RouterX} from "./public";

export function removeBlank(str){
  if(str){
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/ /ig,'');//去掉
    str=str.replace(/^[\s　]+|[\s　]+$/g, "");//去掉全角半角空格
    str=str.replace(/[\r\n]/g,"");//去掉回车换行
    str=str.replace(/\$\$/gi,"");
  }
    return str;
}

export function checkPhone(str){
    //去掉空格
    str=removeBlank(str);
    let re = /^1[2|3|4|5|7|8][0-9]{9}$/;
    if(re.test(str)){
        //手机号通过
        return true;
    }
    else if(str===""){
        //手机号不能为空
        return false;
    }
    else{
        //手机号错误
        return false;
    }
}

//只能包含字母和数字
export function checkPassword(value){
  let jgpattern =/^[A-Za-z0-9]+$/;
  if(!jgpattern.test(value)){
    return false;
  }
  else{
    return true
  }
}


export function getCompanyPY(){
  //判断是不是本地调试环境
  return "geely";
}

export function delHtmlTag(str)
{
  //去掉所有的html标记
  if(str){str=str.replace(/<[^>]+>/g,"");}
  str=str.replace(/&nbsp;/gi,"")
  str = str.replace(/\s+/g,"");
  str=removeBlank(str);
  return str;
}

//阻止浏览器的默认行为
export function stopDefault( e ) {
  //阻止默认浏览器动作(W3C)
  if ( e && e.preventDefault )
    e.preventDefault();
  //IE中阻止函数器默认动作的方式
  else
    window.event.returnValue = false;
  return false;
}

//判断用户是不是IOS手机
export function isIOS(){
  let a=false;
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
     a = true;
  }
  return a;
}
//从右到左依次算
export function getLastParam(index=0,url){
  return url.split("?")[0].split("/").reverse()[index];
}

//转换成时/分/秒
export function changeTimeType(arr){
  let a="";
  if(arr[0]!==0){
    a=arr[0]+"时"
  }
  if(arr[1]!=="00"){
    a+=arr[1]+"分"
  }
  if(arr[2]!=="00"){
    a+=arr[2]+"秒"
  }
  return a;
}

export  function formatSeconds(value,isTest) {
  let secondTime = parseInt(value);// 秒
  let minuteTime = 0;// 分
  let hourTime = 0;// 小时
  if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60);
    //获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(secondTime % 60);
    //如果分钟大于60，将分钟转换成小时
    if(minuteTime > 60) {
      //获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60);
      //获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt(minuteTime % 60);
    }
  }
  if(minuteTime<10){
    if(minuteTime===0){
      minuteTime="00";
    }
    else{
      minuteTime="0"+minuteTime;
    }
  }
  if(secondTime<10){
    if(secondTime===0){
      secondTime="00";
    }
    else{
      secondTime="0"+secondTime;
    }
  }
  let result="";
  if(isTest){
    let arr=[hourTime,minuteTime,secondTime];
    result=changeTimeType(arr);
  }
  else{
    if(hourTime!==0){
      hourTime=hourTime+":";
    }
    else{
      hourTime="";
    }
     result=hourTime+minuteTime+":"+secondTime;
  }
  return result;
}



export let noShowFooterNav=["/confide/detail","/confide/calling","/course/detail"];

export function scrollToBottom(){
  let h=$(document).height()-window.innerHeight
  $(document).scrollTop(h);
}

export function tagsLimit(tags,maxNum){
    if(tags.length>maxNum){
      //含有多个标签
      if(tags.indexOf(",")>0){
        let tagsArr=tags.split(",");
        //当arr[index]<20,arr[index+1]>20时取出index的值
        let length=tagsArr.length;
        let bb="";
        let indexX=0;
        for(let i=0;i<length;i++) {
          bb =bb+ ","+tagsArr[i];
          if (bb.length > maxNum) {
            indexX = i;
            break;
          }
        }
        tagsArr=tagsArr.slice(0,indexX)
        tags=tagsArr.toString();
      }
      else{
        tags="";  //如果只有一个标签，那一个也不展示
      }
    }
  return tags;
}

export function getBase64Image (img){
  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  let ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
  console.log(canvas)
  let dataURL="";
  try{
    dataURL = canvas.toDataURL("image/jpeg");
  }
  catch(err){
    console.log(err);
  }
  return dataURL;
}

//页面中调用的方法
export function getContentTxt(url){
  return new Promise((resolve, reject)=> {
    let image = new Image();
    image.src = url;
    //解决canvas无法读取画布问题
    image.setAttribute('crossOrigin', 'anonymous');
    let base64="";
    image.onload = ()=> {
      base64 = getBase64Image(image);
      resolve(base64);
    };
    image.onerror = ()=> {
      try {
        resolve(loadImage("defaultBj.jpg"));
        // reject(new Error('Could not load image at ' + url));
      }
      catch (e) {
        console.log("图片加载错误");
      }
    };
    return base64;
  });
}

//动态加载图片（兼容next.js和　ｒｅａｃｔ项目写法）
export function loadImage(imageName){
  return `/static/images/${imageName}`
}


//保留 X.X 万格式
export function changeNumber(number){
  if(number>10000){
    number=number.toString();
    number=number.substring(0,number.length-4)+"."+number.charAt(number.length-4)+"万+"
  }
  return number;
}


export const setCookie = (key, value, expiredays = 29) => {
  const exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = `${key}=${encodeURIComponent(value)};expires=${exdate.toUTCString()}`
}

export const getCookie = (key) => {
  try {
    const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`)
    const arr = document.cookie.match(reg)
    if (arr) return decodeURIComponent(arr[2])
  }
  catch (e) {
    console.log(e);
  }
  return null
}

export const delCookie = (key) => {
  const exdate = new Date()
  exdate.setTime(exdate.getTime() - 1)
  const value = getCookie(key)
  if (value) document.cookie = `${key}=${encodeURIComponent(value)};expires=${exdate.toUTCString()}`
}

//判断用户是否登陆
export function isUserLogin(){
  //没登陆直接跳转到登陆(判断有没有cookies)
  return getCookie("accessToken");
}

//获取url参数
export function getParameterByName(name,url) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


//去登陆
export function goToLogin(url){
  window.location.href=(`${baseHostUrl}/login?sourceUrl=${url}`);
  // try{
  //   window.location.href=(`${baseHostUrl}/login?sourceUrl=${url}`);
  // }catch (e) {
  //   RouterX(`/login?sourceUrl=${url}`)
  // }
}

export function isInsideJumpFun(url){
  //如果不是测评模块全部使用window跳转；
  let isInsideJump=false;
  if(url.indexOf("/ceshi")>=0 && url.indexOf("/login?")<0){
    isInsideJump=true;
  }
  return isInsideJump;
}

//判断是不是字母
export function isLetter(jumpIndex){
  if(!jumpIndex){return false}
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return str.indexOf(jumpIndex)>=0
}

//获取完整url地址
export function getFullUrl(url){
    return baseHostUrl+url;
}

//判断是否是客户端
export function isWebview () {
  var ua = navigator.userAgent;
  var platform = navigator.platform;
  var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
  var webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/);
  return webview;
}


