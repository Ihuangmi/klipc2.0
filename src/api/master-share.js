import axios from "axios";
// import store from '@/store'
// import router from '@/router'
// import { getToken } from '@/utils/token'
import i18n from '@/utils/lang'
// import { Message } from 'element-ui'

// create an axios instance
const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 5000 // request timeout
})

// request interceptor
request.interceptors.request.use(
    config => {
        config.headers['Accept-Language'] = i18n.locale
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// response interceptor
request.interceptors.response.use(
    response => response.data,
    error => {
        // console.log(error.response)
        return Promise.reject(error)
    }
)

export function getMasterInfo(id) {
    return request({
        url: `/v2/account/master_page_share/master_accounts/${id}/`,
        method: 'get',
    })
}
export function getAccountInfo(id) {
    return request({
        url: `/v2/account/master_page_share/account_info/${id}/`,
        method: 'get',
    })
}
export function getEcharts(data) {
    return request({
        url: '/v2/account/master_page_share/equity_balance_chart/',
        method: 'get',
        params: data,
    })
}
export function getMonthRate(id) {
    return request({
        url: `/v2/account/master_page/month_roi?account=${id}`,
        method: 'get',
    })
}
export function getPieData(id) {
    return request({
        url: `/v2/account/master_page/product_profit_loss_chart?account=${id}`,
        method: 'get',
    })
}
export function getProductList(id) {
    return request({
        url: `/v2/account/master_page_share/product_info?account=${id}`,
        method: 'get',
    })
}