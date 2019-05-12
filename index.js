//字符串处理

//删除空格
export function removeBlank(str) {
    if (str) {
        str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
        str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
        str = str.replace(/ /gi, ''); //去掉
        str = str.replace(/^[\s　]+|[\s　]+$/g, ''); //去掉全角半角空格
        str = str.replace(/[\r\n]/g, ''); //去掉回车换行
        str = str.replace(/\$\$/gi, '');
    }
    return str;
}

//去掉所有的html标记
export function delHtmlTag(str) {
    if (str) {
        str = str.replace(/<[^>]+>/g, '');
    }
    str = str.replace(/&nbsp;/gi, '');
    str = str.replace(/\s+/g, '');
    str = removeBlank(str);
    return str;
}


//判断是不是手机号
export function checkPhone(str) {
    //去掉空格
    str = removeBlank(str);
    let re = /^1[2|3|4|5|7|8][0-9]{9}$/;
    if (re.test(str)) {
        //手机号通过
        return true;
    } else if (str === '') {
        //手机号不能为空
        return false;
    } else {
        //手机号错误
        return false;
    }
}

//密码验证：只能包含字母和数字
export function checkPassword(value) {
    let jgpattern = /^[A-Za-z0-9]+$/;
    if (!jgpattern.test(value)) {
        return false;
    } else {
        return true;
    }
}


//从右到左依次算
export function getLastParam(index = 0, url) {
    return url.split('?')[0].split('/').reverse()[index];
}


//限制标签数量
export function tagsLimit(tags, maxNum) {
    if (!tags) {
        return '';
    }
    if (tags.length > maxNum) {
        //含有多个标签
        if (tags.indexOf(',') > 0) {
            let tagsArr = tags.split(',');
            //当arr[index]<20,arr[index+1]>20时取出index的值
            let length = tagsArr.length;
            let bb = '';
            let indexX = 0;
            for (let i = 0; i < length; i++) {
                bb = bb + ',' + tagsArr[i];
                if (bb.length > maxNum) {
                    indexX = i;
                    break;
                }
            }
            tagsArr = tagsArr.slice(0, indexX);
            tags = tagsArr.toString();
        } else {
            tags = ''; //如果只有一个标签，那一个也不展示
        }
    }
    return tags;
}

//获取url参数
export function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//返回N天前的年/月/日
export function getPreDay(n){
    let now=new Date();
    let date=new Date(now.getTime()-n*24*3600*1000);
    let year=date.getFullYear();
    let month=date.getMonth()+1>9?date.getMonth()+1:"0"+(date.getMonth()+1);
    let day=date.getDate()>9?date.getDate():"0"+date.getDate();
    return year+"/"+month+"/"+day;
}

