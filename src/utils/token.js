
export function getToken(key){
    return sessionStorage.getItem(key)
}
export function setToken(key, value){
    sessionStorage.setItem(key, value)
}
export function removeToken(key){
    sessionStorage.removeItem(key)
}
export function clearAllToken(){
    sessionStorage.clear()
}