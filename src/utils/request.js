import axios from "axios";
// import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/token'
import i18n from '@/utils/lang'
import { Message } from 'element-ui'

// console.log(`VUE_APP_BASE_API=`, process.env.VUE_APP_BASE_API)
// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // baseURL: 'http://dev.klipc.com.cn:8008/',
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        const token = getToken("user-token")

        if (token) {
            // console.log(i18n.locale)
            // let each request carry token
            config.headers['Authorization'] = 'jwt ' + token
            config.headers['Content-Type'] = 'application/json'
            config.headers['Accept-Language'] = i18n.locale
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => response.data,
    error => {
        console.log(error.response)
        if (error.response.status === 401) {
            Message({
                message: '登录信息已过期，请重新登录',
                type: 'error',
                duration: 3 * 1000
            })
            router.replace('/login')
        }
        return Promise.reject(error)
    }
)

export default service; 