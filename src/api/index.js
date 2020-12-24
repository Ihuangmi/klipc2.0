import request from '@/utils/request'

export function getPlatformType() {
    return request({
        url: '/v2/basic/platform_type',
        method: 'get',
    })
}
export function getBrokers(data) {
    return request({
        url: `/v2/basic/brokers`,
        method: 'get',
        timeout: 5000,
        params: data,
    })
}
export function getTopList() {
    return request({
        url: '/top_list',
        method: 'get',
    })
}
export function getPlChartData(data) {
    return request({
        url: '/v2/account/my_accounts/profit_loss_chart',
        method: 'get',
        params: data
    })
}
export function getPplChartData() {
    return request({
        url: '/v2/account/my_accounts/product_profit_loss_chart',
        method: 'get',
    })
}
export function getAllLinksList() {
    return request({
        url: '/v2/account/my_accounts/display_setting/',
        method: 'get',
    })
}
export function getFilterList(data) {
    return request({
        url: `/v2/account/my_accounts/set_display`,
        method: 'POST',
        data,
    })
}
export function getlinksList(data) {
    return request({
        url: '/v2/account/my_accounts/',
        method: 'get',
        params: data,
    })
}
export function getSummaryList() {
    return request({
        url: '/v2/account/my_accounts/position_summary',
        method: 'get',
    })
}
export function getSubscriptionList(data) {
    return request({
        url: '/v2/account/my_accounts/everyday_profit',
        method: 'get',
        params: data,
    })
}
export function getHotSignal() {
    return request({
        url: '/v2/user/my_accounts/favourite_signals/',
        method: 'get',
    })
}
export function getMessage(data) {
    return request({
        url: `/v2/user/my_accounts/user_messages`,
        method: 'get',
        params: data,
    })
}
export function deleteUser(data) {
    return request({
        url: `/v2/account/my_accounts/cancel_favor_user`,
        method: 'post',
        data,
    })
}
export function getLinksList(data) {
    return request({
        url: '/v2/account/link_accounts/',
        method: 'get',
        params: data,
    })
}
export function linkAccount(data) {
    return request({
        url: '/v2/account/link_accounts/',
        method: 'post',
        data,
    })
}
export function removeAccount(id) {
    return request({
        url: `/v2/account/link_accounts/${id}/`,
        method: 'delete',
    })
}
export function changePass(data) {
    return request({
        url: `/v2/account/update_account_password/${data.id}/`,
        method: 'PATCH',
        data,
    })
}
export function getRebateSet() {
    return request({
        url: '/v2/account/rebate_setting',
        method: 'get',
    })
}
export function getAccountsList(data) {
    return request({
        url: `/v2/account/reports/my_accounts/`,
        method: 'get',
        params: data,
    })
}
export function getFilterLists(data) {
    return request({
        url: `/v2/account/reports/reports`,
        method: 'get',
        params: data,
        responseType: 'blob',
    })
}
export function getRebateSetting(data) {
    return request({
        url: '/v2/account/reports/rebate_setting/',
        method: 'get',
        params: data,
    })
}
export function updateRebateSet(data) {
    return request({
        url: '/v2/account/reports/update_rebate_setting',
        method: 'post',
        data,
    })
}
export function getPositionList() {
    return request({
        url: '/v2/account/risk/individual_position_exposures',
        method: 'get',
    })
}
export function getNetList() {
    return request({
        url: '/v2/account/risk/combined_position_exposures',
        method: 'get',
    })
}
export function getCurrencyList() {
    return request({
        url: '/v2/account/risk/currency_exposures',
        method: 'get',
    })
}
export function getDetailsList() {
    return request({
        url: '/v2/account/risk/position_details',
        method: 'get',
    })
}
export function getsymbol(symbol) {
    return request({
        url: `/v2/account/risk/quotes?symbol=${symbol}`,
        method: 'get',
        // baseURL: 'http://dev.klipc.com.cn:8008/'
    })
}
export function getCurveChart(data) {
    return request({
        url: '/v2/account/analysis/profit_loss_chart/',
        method: 'get',
        params: data,
    })
}
export function getYieldChart(data) {
    return request({
        url: '/v2/account/analysis/close_profit_and_volume_every_day/',
        method: 'get',
        params: data,
    })
}
export function getPieChart(data) {
    return request({
        url: '/v2/account/analysis/product_profit_loss_chart/',
        method: 'get',
        params: data,
    })
}
export function getStatistics(data) {
    return request({
        url: '/v2/account/analysis/account_message',
        method: 'get',
        params: data,
    })
}

export function getSelectList() {
    return request({
        url: '/v2/account/signal_pool/KlipC_selected/',
        method: 'get',
    })
}
export function getAllLists(data) {
    return request({
        url: '/v2/account/signal_pool/all_signal/',
        method: 'get',
        params: data,
    })
}
export function getSubscribe(data) {
    return request({
        url: '/v2/account/signal_pool/signal_subscribe_information/',
        method: 'get',
        params: data,
    })
}
export function getHotSignals(data) {
    return request({
        url: '/v2/account/signal_pool/hot_signal/',
        method: 'get',
        params: data,
    })
}
export function addCollected(data) {
    return request({
        url: '/v2/account/signal_pool/favor_user/',
        method: 'post',
        data,
    })
}
export function delCollected(data) {
    return request({
        url: '/v2/account/signal_pool/cancel_favor_user',
        method: 'post',
        data,
    })
}
export function getUserAccounts(id) {
    return request({
        url: `/v2/account/signal_pool/follow_account/?master_hand_id=${id}`,
        method: 'get',
    })
}
export function onfollowUp(data) {
    return request({
        url: '/v2/account/signal_pool/follow_account/',
        method: 'post',
        data,
    })
}
export function getList() {
    return request({
        url: '/master/list',
        method: 'get',
    })
}
export function getMasterInfo(id) {
    return request({
        url: `/v2/account/master_page/master_accounts/${id}/`,
        method: 'get',
    })
}
export function getAccountInfo(id) {
    return request({
        url: `/v2/account/master_page/account_info/${id}/`,
        method: 'get',
    })
}
export function getUserAccount(id) {
    return request({
        url: `/v2/account/master_page/follow_account/?master_hand_account_id=${id}`,
        method: 'get',
    })
}
export function followUp(data) {
    return request({
        url: '/v2/account/master_page/follow_account/',
        method: 'post',
        data,
    })
}
export function addCollect(data) {
    return request({
        url: '/v2/account/master_page/favor_user/',
        method: 'post',
        data,
    })
}
export function delCollect(data) {
    return request({
        url: '/v2/account/master_page/cancel_favor_user',
        method: 'post',
        data,
    })
}
export function getEcharts(data) {
    return request({
        url: '/v2/account/master_page/equity_balance_chart/',
        method: 'get',
        params: data,
    })
}
export function getPieData(id) {
    return request({
        url: `/v2/account/master_page/product_profit_loss_chart?account=${id}`,
        method: 'get',
    })
}
export function getMonthRate(id) {
    return request({
        url: `/v2/account/master_page/month_roi?account=${id}`,
        method: 'get',
    })
}
export function getProductList(id) {
    return request({
        url: `/v2/account/master_page/product_info?account=${id}`,
        method: 'get',
    })
}
export function getDetailLists(data) {
    return request({
        url: '/v2/account/master_page/close_order_detail',
        method: 'get',
        params: data,
    })
}




