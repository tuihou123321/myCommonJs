## mycommonjs

### 项目说明

此项目包含常用的js代码片段，无依赖，通过原生js实现，可通过npm,cnpm下载; 
为了兼容SSR，去掉了所有的window对象；


#### 字符串处理
```
removeBlank(str) 
//删除string空格
//返回值类型：string


delHtmlTag(str) 
// 去掉string中所有的html标记
//返回值类型：string


getLastParam()  
//获取url上最后一个路由参数
//返回值类型：string


getParameterByName(name,url) 
//获取url上的参数
//返回值类型：string


tagsLimit(tags, maxNum)  
//标签数量限制，并返回一个限制后的string，用“,”分割
//返回值类型：string


```

#### 类型校验、设备检测
```
checkPhone(number)  
//判断是不是手机号
//返回值类型：bool

checkPassword(string) 
//密码校验，只能包含字母和数字
//返回值类型：bool

isIosOrAndroid()  
//android,ios来判断当前设备
//返回值类型:string

isPC()  
//判断是不是pc设备
//返回值类型:bool

isAliOrWx()   
//判断当前app设备
//返回值：ali=支付宝，wx=微信

```


#### 其他
```
getPreDay(n)
//返回N天前的年/月/日
//返回值类型：string

```


单独引用： import {getCookies,delCookies} from "mycommonjs/cookies" 
#### cookies处理
```
getCookie(key) 
//获取cookies
//返回值类型：string

delCookie(key) 
//删除cookies
//返回值类型：null

```
