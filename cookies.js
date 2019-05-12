//获取cookies
export function getCookie(key) {
    try {
        const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
        const arr = document.cookie.match(reg);
        if (arr) return decodeURIComponent(arr[2]);
    } catch (e) {
        console.log(e);
    }
    return null;
}

//删除cookies
export function delCookie(key) {
    const exdate = new Date();
    exdate.setTime(exdate.getTime() - 1);
    const value = getCookie(key);
    if (value) document.cookie = `${key}=${encodeURIComponent(value)};path=/;expires=${exdate.toUTCString()}`;
}
