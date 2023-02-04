//控制权限，处理token的方法
//储存token到本地存储
export function setToken(token){
    return sessionStorage.setItem("token",token)
}
export function setNickname(nickname){
    return sessionStorage.setItem("nickname",nickname)
}
//从本地获取token
export function getToken(){
    return sessionStorage.getItem("token")
}

//退出登陆时，清除本地存储
export function removeToken(){
    return sessionStorage.clear()
}