import request from '@/utils/request'

export function test() {
  return request.get('/user/topcard')
}
export function docmanage() {
  return request.get('/user/docmanage')
}
export function subdocmanage() {
  return request.get('/user/subdocmanage')
}
export function indexHead() {
  return request.get('/users/title_message/')
}

// export function follower() {
//   return request.get('/follower')
// }
// export function docAcc() {
//   return request.get('/v2/account/documentary_management/')
// }
//信号管理
export function signalManage() {
  return request.get('/v2/account/my_signals/accounts/?is_signal=1')
}
export function signalManageAcc(data) {
  return request.get('/v2/account/my_signals/accounts/?is_signal=1&account_number_or_platform_server='+data)
}
//获取所有非信号
export function signalget() {
  return request.get('/v2/account/my_signals/accounts/?is_signal=0')
}
//跟单设置
export function signalSetting(id) {
  return request.get('/v2/account/documentary_management/documentary_settings/?master_hand_account=' + id)
}
//获取跟单设置
export function getSignal(id) {
  return request.get('/v2/account/strategy/following_settings/?account=' + id)
}
//修改跟单设置
export function signalChange(data) {
  return request.post('/v2/account/documentary_management/update_documentary_settings', data)
}
//产品盈亏图
export function PLchart(data) {
  return request.get('/v2/account/strategy/product_profit_loss_chart?account=' + data)
}
//产品盈亏图
export function gdsetting(data) {
  return request.get('/v2/account/strategy/following_settings?account=' + data)
}
//策略列表
export function followdetail(id) {
  return request.get('/v2/account/strategy/following_detail/?account=' + id)
}
//策略曲线
export function Linechart(data) {
  return request.get('/v2/account/strategy/charts?account=' + data)
}
//策略列表
export function renew(data) {
  return request.get('/v2/account/strategy/following_renew/' + data + '/')
}
//跟单账号
export function gdAcc() {
  return request.get('/v2/account/documentary_management/')
}
export function searchAcc(data) {
  return request.get('/v2/account/documentary_management/?account_number_or_platform_server='+data)
}
export function gdAccSearch(search) {
  return request.get('/v2/account/documentary_management/?'+search.account_number_or_platform_server)
}
//跟单账号 
export function follow(id, plat, type, server) {
  return request.get('/v2/account/my_signals/followers?account=[' + id + ']&platform_type=' + plat + '&documentary_type=' + type + '&account_number_or_platform_server=' + server)
}
//跟随者详情-平仓
export function follow_p(id, page) {
  return request.get('/v2/account/my_signals/close_order_detail/?account=[' + id + ']' + '&page=' + page)
}
//跟随者详情 持仓
export function follow_c(id) {
  return request.get('/v2/account/my_signals/position_order_detail?account=[' + id + ']')
}
export function followsort_c(id,sort) {
  return request.get('/v2/account/my_signals/position_order_detail?account=[' + id + ']&ordering='+sort)
}
//跟随者详情-平仓
export function followsearch_p(id, page, select) {
  return request.get('/v2/account/my_signals/close_order_detail/?account=[' + id + ']&platform_type=' + select.platform_type+'&account_number=' + select.account_number + '&broker=' + select.broker + '&close_time_after=' + select.start_time + '&close_time_before=' + select.end_time + '&page=' + page)
}
//跟随者详情 持仓
export function followsearch_c(id, select) {
  return request.get('/v2/account/my_signals/position_order_detail?account=[' + id + ']&platform_type=' + select.platform_type + '&account_number_or_platform_server=' + select.account_number_or_platform_server + '&start_time=' + select.start_time + '&end_time=' + select.end_time)
}
//策略 持仓
export function detail_p(id) {
  return request.get('/v2/account/strategy/order_detail/position_order?account=' + id)
}
//策略 平仓
export function detail_c(id) {
  return request.get('/v2/account/strategy/order_detail/close_order/?account=' + id)
}
//提交续费
export function renewOk(data) {
  return request.post('/v2/account/documentary_management/following_renew/', data)
}
//订单细节收益
export function detail(data) {
  return request.get('/v2/account/strategy/order_detail/order_volume_and_profit?account=' + data)
}
//信号续费
export function checkrenew(data) {
  return request.post('/v2/account/strategy/following_renew/', data)
}
//跟单续费
export function renewinfo(data) {
  return request.get('/v2/account/documentary_management/following_renew/' + data + '/')
}
//信号策略指标
export function strategy(data) {
  return request.get('/account/strategy/index?account=' + data)
}
//添加信号
export function addSignal(id, data) {
  return request.patch('/v2/account/my_signals/accounts/' + id + '/', data)
}
//获取信号设置
export function infoSignal(id) {
  return request.patch('/v2/account/my_signals/accounts/' + id + '/')
}


export function login(data) {
  return request({
    url: '/api-token-auth/',
    method: 'post',
    data,
  })
}
export function checkUserLogin() {
  return request({
    url: '/v2/user/status/check',
    method: 'post',
  })
}
export function getAreaCode() {
  return request({
    url: '/v2/basic/area_code',
    method: 'get',
  })
}
export function getVerifyCode(data) {
  return request({
    url: '/v2/user/send/verification/code',
    method: 'post',
    data,
  })
}
export function resetPass(data) {
  return request({
    url: '/v2/user/reset/password',
    method: 'post',
    data,
  })
}
export function register(data) {
  return request({
    url: '/v2/user/register',
    method: 'post',
    data,
  })
}
export function logout() {
  return request({
    url: '/v2/user/logout',
    method: 'POST',
  })
}

export function getUserId() {
  return request({
    url: '/v2/user/manage_page/user_id',
    method: 'get',
  })
}
export function getUserInfo(id) {
  return request({
    url: `/v2/user/manage_page/my_info/${id}/`,
    method: 'get',
  })
}
export function setUserInfo(id, data) {
  return request({
    url: `/v2/user/manage_page/my_info/${id}/`,
    method: 'PATCH',
    data,
  })
}
export function getBankInfo(id) {
  return request({
    url: `/v2/user/manage_page/bank_info/${id}/`,
    method: 'get',
  })
}
export function setBankInfo(id, data) {
  return request({
    url: `/v2/user/manage_page/bank_info/${id}/`,
    method: 'PATCH',
    data,
  })
}
export function getUserGrade(id) {
  return request({
    url: `/v2/user/manage_page/user_vip_info/${id}/`,
    method: 'get',
  })
}
export function upgradeMember(data) {
  return request({
    url: '/v2/user/manage_page/upgrade_to_vip/',
    method: 'post',
    data,
  })
}
export function renewMember(data) {
  return request({
    url: '/v2/user/manage_page/renew_vip/',
    method: 'post',
    data,
  })
}
export function getHistoryList(data) {
  return request({
    url: '/v2/user/manage_page/historical_cost/',
    method: 'get',
    params: data,
  })
}
export function getWithdraw(data) {
  return request({
    url: '/v2/user/manage_page/withdraw_money/',
    method: 'post',
    data,
  })
}
export function getAlipay(data) {
  return request({
    url: '/v2/alipaypay/alipay_order/',
    method: 'post',
    data,
  })
}
export function getOrderStatus(data) {
  return request({
    url: '/v2/alipaypay/alipay_order_result/',
    method: 'post',
    data,
  })
}
export function getWechatCode(data) {
  return request({
    url: '/express_order/',
    method: 'post',
    data,
  })
}
export function getUnionPay(data) {
  return request({
    url: '/operation/order/',
    method: 'post',
    data,
  })
}
export function getPaypal(data) {
  return request({
    url: '/paypalpay/order/',
    method: 'post',
    data,
  })
}
export function getWarning() {
  return request({
    url: '/v2/user/manage_page/warning',
    method: 'get',
  })
}
export function getotherMsg() {
  return request({
    url: '/v2/user/manage_page/deposit_withdraw_message',
    method: 'get',
  })
}