export default {
    checkPhone(str){
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
},
//动态加载图片（兼容next.js和　ｒｅａｃｔ项目写法）
 loadImage(imageName){
    return `/static/images/${imageName}`
  }
}