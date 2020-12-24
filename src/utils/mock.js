//引入mockjs
import Mock from 'mockjs'
let baseurl='https://dev.klipc.com.cn/api'
//使用mockjs模拟数据
//卡片
let topcard = [];
for (let i = 0; i <= 5; i++) {
	let acccell = {
		"value": /(-?)[1-9]{2,4}\d/,
		"pl": /(-?)[0-1]{0,1}\d/,
		// "title": "@cname(1,4)",//随机生成中文名字
	}
	topcard.push(acccell)
}
Mock.mock(baseurl+'/user/topcard', {
	success: true,
	"data": topcard
});
// 跟单管理
let docmanage = [];
for (let i = 0; i <= 10; i++) {
	let acccell = {
		"name": 'choice',
		"plat": '@name(4,8)',
		"type|1-2": 1,
		"account": /\d{5,10}/,
		'number': /\d{5,10}/,
		"dk|1-2": 1,
		"prod": '@name(1,2)',
		"closetime": '@date("yyyy-MM-dd")',
		"closeprice":/(-?)[1-9]{0,3}\d/,
		'interest':/(-?)[0-1]{0,1}\d/,
		'pl':/(-?)[1-9]{0,4}\d/
		// "title": "@cname(1,4)",//随机生成中文名字
	}
	docmanage.push(acccell)
}
Mock.mock(baseurl+'/user/docmanage', {
	success: true,
	"data": docmanage
});
let subdocmanage = [];
for (let i = 0; i <= 3; i++) {
	let acccell = {
		"name": 'mike',
		"plat": '@name(4,8)',
		"type": 'MT4',
		"account": /\d{5,10}/,
		'number': /\d{5,10}/,
		"dk|1-2": 1,
		"prod": '@name(1,2)',
		"closetime": '@date("yyyy-MM-dd")',
		"closeprice":/\d{0,2}/,
		'interest':/(-?)[0-1]{0,1}\d/,
		'pl':/(-?)[0-1]{0,1}\d/
		// "title": "@cname(1,4)",//随机生成中文名字
	}
	subdocmanage.push(acccell)
}
Mock.mock(baseurl+'/user/subdocmanage', {
	success: true,
	"data": subdocmanage
});
//关联账号
let acclist = [];
for (let i = 0; i <= 10; i++) {
	let acccell = {
		// "mtime": "@datetime",//随机生成日期时间
		"real|1-2": 1,//1为真实账号，2为模拟账号
		"link|1-2": 1,//link1为联接，2为未连接
		"num": /\d{5,10}/,//随机一个账号
		"role|1-2": 2,//1  展示中 2 未展示
		"nickname": "@name(1,2)",//随机生成中文名字
		"img": '@image()',
	}
	acclist.push(acccell)
}
Mock.mock(baseurl+'/user/userinfo', {
	success: true,
	"data": acclist
});
//账户分析
let accanalysis = [];
for (let i = 0; i <= 20; i++) {
	let acccell = {
		"ktime": "@time",//开仓时间
		"ctime": "@time",//关藏时间
		"real|1-2": 1,//1为真实账号，2为模拟账号
		"prod": "@name(1,2)",//产品名
		"num": /\d{5,10}/,//随机一个账号
		"ss": /\d[0-9]/,//随机一个手数
		"kprice": /\d[0-9]{3}/,//随机一个开仓价格
		"cprice": /\d[0-9]{3}/,//随机一个平仓价格
		"lx": /\d[0-9]{3}/,//隔夜利息
		"yl": /\d[0-9]{2}/,//盈利
		"buy|1-2": 2,//1 买 2 卖
		"pt": "@name(1,2)",//随机生成平台
	}
	accanalysis.push(acccell)
}
Mock.mock(baseurl+'/user/prod', {
	success: true,
	"data": accanalysis
});
//已关注交易员
let acctrader = [];
for (let i = 0; i <= 10; i++) {
	let acccell = {
		"user": "@cname(1,2)",//随机生成用户名
		"jz": /(-?)[0-9]{1,4}\d/,//净值
		"jryk": /(-?)[0-9]{0,3}\d/,//今日盈亏
		"qryk": /(-?)[0-9]{0,3}\d/,//七日盈亏
		"rq": /\d[0-9]{2,5}/,//人气
		"sc": true,
		"gd": false,

		"pt": "@name(0,1)",//随机生成平台
	}
	acctrader.push(acccell)
}
Mock.mock(baseurl+'/user/trader', {
	success: true,
	"data": acctrader
});
//关联账号
let accconnect = [];
for (let i = 0; i <= 20; i++) {
	let acccell = {
		"platform|1-2": 1,//平台
		"company": "@name(0,1)",//公司
		"acc": /\d{5}/,//账号
		"types|1-2": 1,//真实虚拟
		"networth": /(-?)[0-9]{1,4}\d/,//净值
	}
	accconnect.push(acccell)
}
Mock.mock(baseurl+'/user/acctrader', {
	success: true,
	"data": accconnect
});
let merist = [];
for (let i = 0; i <= 20; i++) {
	let acccell = {
		"company": "@name(0,1)",//订单
		"acc": /\d[0-9]/,//手数
		"types|1-2": 1,//方向
		"networth": /(-?)[1-9]{1,3}\d/,//盈亏金额
	}
	merist.push(acccell)
}
Mock.mock(baseurl+'/user/merlist', {
	success: true,
	"data": merist
});
// 跟单列表




// 持仓汇总
let topList = [];
for (let i = 0; i <= 10; i++) {
	let acccell = {
		// title: 'EURUSD',
		value: '@float(50, 10000, 2, 2)',
		profit: '@float(-10, 10)',
	}
	topList.push(acccell)
}
Mock.mock(baseurl+'/top_list', {
	success: true,
	data: topList
});

// link-accounted list
let links = [];
for (let i = 0; i <= 19; i++) {
	let acccell = {
		'platform|1': ['MT4', 'MT5'],
		'platform_server|1': ['ICMmarkets-Live11', 'GMI-Live03'],
		account: '@integer(100000000, 999999999)',
		username: '@first',
		balance: '@integer(10000, 99999)',
		net_worth: '@integer(-1000, 1000)',
		total_pl: '@integer(-1000, 1000)',
		profit: '@float(0, 100, 2, 2)',
		seven_days: '@float(0, 100, 2, 2)',
		thirty_days: '@float(0, 100, 2, 2)',	
		account_nick_name: '@cname',
	}
	links.push(acccell)
}
Mock.mock(baseurl+'/v2/account/my_accounts2/', {
	success: true,
	data: links
});

// 持仓汇总
let sum = [];
for (let i = 0; i <= 20; i++) {
	let acccell = {
		symbol: 'EURUSD',
		volume: '@float(0, 10, 2, 2)',
		'type|1': ['buy', 'sell'],
		profit: '@integer(-100, 100)',
	}
	sum.push(acccell)
}
Mock.mock(baseurl+'/v2/account/my_accounts/position_summary2', {
	success: true,
	data: sum
});

// subscription
let sub = [];
for (let i = 0; i <= 10; i++) {
	let acccell = {
		date: '2020-02-02 12:12:12',
		account: '@integer(12345678, 123456789)',
		name: 'EURUSD',
		profit: '@integer(-100, 100)',
	}
	sub.push(acccell)
}
Mock.mock(baseurl+'/my_assets/subscription', {
	success: true,
	data: sub
});

// message
let message = [];
for (let i = 0; i <= 2; i++) {
	let acccell = {
		id: '@guid',
		date: '2020-02-02 12:12:12',
		'type|1': ['交易类', '登录信息', '资金类'],
		msg: '您成功充值了$1000，当前余额$1000',
	}
	message.push(acccell)
}
Mock.mock(baseurl+'/my_assets/message', {
	success: true,
	data: message
});

// 关联账户
let accountlist = [];
for (let i = 0; i <= 12; i++) {
	let acccell = {
		'platform_server|1': ['XM-Live 02', 'ICMmarkets-Live11'],
		account_number: "@integer(123456789, 1234567890)",
		account_nick_name: "@last",
		'account_type|1': ['真实账户', '模拟账户'],
		'platform|1': ['MT4', 'MT5'],
		'login_type|1': ['主密码', '投资密码'],
		'status|1': ['linked', 'linking', 'notlinked'],
	}
	accountlist.push(acccell)
}
Mock.mock(baseurl+'/v2/account/link_accounts2/', {
	success: true,
	results: accountlist
});

// 历史费用
let history = [];
for (let i = 0; i <= 18; i++) {
	let acccell = {
		date: '2020-10-10 10:10:10',
		account: "@integer(123456789, 1234567890)",
		charge: "@float(0, 10000, 2, 2)",
		'use|1': ['订阅费'],
		'source|1': ['支付宝', '微信'],
	}
	history.push(acccell)
}
Mock.mock(baseurl+'/house/history', {
	success: true,
	data: history
});

// report
let re = [];
for (let i = 0; i <= 20; i++) {
	let acccell = {
		name: "@cname",
		platform: "XM-Live 02",
		account: "@integer(123456789, 1234567890)",
		order: "@integer(123456789, 1234567890)",
		'type|1': ['buy', 'sell'],
		lot: "@integer(0, 10)",
		product: "USD JPY",
		open_dt: '2020-10-10 10:10:10',
		close_dt: '2020-10-10 10:10:10',
		open_price: '@integer(1234, 123450)',
		close_price: '@integer(1234, 12345)',
		stop_p: '@float(0, 10, 2, 2)',
		stop_l: '@float(0, 10, 2, 2)',
		interest: '@integer(1234, 12345)',
		pl: '@integer(-1000, 1000)',
	}
	re.push(acccell)
}
Mock.mock(baseurl+'/v2/account/reports2', {
	success: true,
	results: re
});

// 表格头部展示数据
let headers = [];
for (let i = 0; i <= 5; i++) {
	let acccell = {
		name: '@cname',
		date: 'EURUSD',
		account: '@float(0, 10, 2, 2)',
		pl: '@integer(-100, 100)',
	}
	headers.push(acccell)
}
Mock.mock(baseurl+'/risk/header', {
	success: true,
	data: headers
});

// 仓位敞口list
let list1 = [];
for (let i = 0; i <= 15; i++) {
	let acccell = {
		product: 'AUD JPY',
		'type|1': ['buy', 'sell'],
		cang: '@float(0, 10, 2, 2)',
		open: '2020-10-10 10:10:10',
		account: '@integer(12345678, 123456789)',
		name: '@cname',
		'server|1': ['ICMmarkets-Live01', 'GMI-Live03'],
		kai: '@integer(1000, 10000)',
		pl: '@integer(-1000, 1000)',
	}
	list1.push(acccell)
}
Mock.mock(baseurl+'/v2/account/risk/individual_position_exposures2', {
	success: true,
	results: list1
});

// 净敞口list
let list2 = [];
for (let i = 0; i <= 15; i++) {
	let acccell = {
		product: 'AUD JPY',
		'type|1': ['buy', 'sell'],
		name: '@float(0, 10, 2, 2)',
		server: '@float(0, 10, 2, 2)',
		kai: '@integer(1000, 10000)',
		pl: '@integer(-1000, 1000)',
	}
	list2.push(acccell)
}
Mock.mock(baseurl+'/v2/account/risk/combined_position_exposures2', {
	success: true,
	results: list2
});

// 货币敞口list
let list3 = [];
for (let i = 0; i <= 15; i++) {
	let acccell = {
		symbol: 'AUD JPY',
		value: '@integer(1000, 10000)',
		dollar: '@integer(-1000, 1000)',
	}
	list3.push(acccell)
}
Mock.mock(baseurl+'/v2/account/risk/currency_exposures2', {
	success: true,
	results: list3
});

// 仓位细节list
let details = [];
for (let i = 0; i <= 15; i++) {
	let acccell = {
		platform_type: 'MT4',
		name: 'ICMmarkets-Live01',
		account: '@integer(12345678, 123456789)',
		accounts: '@integer(12345678, 123456789)',
		'account_type|1': ['真实', '虚拟'],
		net_worth: '@integer(1000, 10000)',
	}
	details.push(acccell)
}
Mock.mock(baseurl+'/v2/account/risk/position_details2', {
	success: true,
	results: details
});

// 信号池list
let signal = [];
for (let i = 0; i <= 13; i++) {
	let acccell = {
		platform: 'ICMmarkets-Live01',
		traditional_calculate_roi: '@float(0, 10, 2, 2)',
		ratio_pl_initial_equity: '@float(0, 10, 2, 2)',
		earnings: '@integer(1234, 12345)',
		max_draw_down: '@float(10, 100, 2, 2)',
		equity: '@integer(1000, 10000)',
		strategy_cycle: '@integer(0, 100)',
		monthly_transactions: '@integer(0, 100)',
		subscription_fee: '@integer(0, 100)',
		acct: {
			period: '@integer(0, 100)',
			platform_server: 'FairTradingGlobal-Asia',
			subscribe_fee: '@integer(0, 100)',
		},
		user: {
			id: "@integer(1234, 12345)",
			avatar: '',
			nick_name: '@last',
			hot: "@integer(0, 100)",
			user_labels: '日内|交易机器人|AI交易|震荡|趋势跟踪'
		}
	}
	signal.push(acccell)
}
Mock.mock(baseurl+'/v2/account/signal_pool/all_signal2/', {
	success: true,
	data: signal
});

// 高手月收益率
let rates = [];
for (let i = 0; i <= 3; i++) {
	let acccell = {
		rate: '2019',
		Jan: '@float(-100, 100, 2, 2)',
		Feb: '@float(-100, 100, 2, 2)',
		Mar: '@float(-100, 100, 2, 2)',
		Apr: '@float(-100, 100, 2, 2)',
		May: '@float(-100, 100, 2, 2)',
		Jun: '@float(-100, 100, 2, 2)',
		Jul: '@float(-100, 100, 2, 2)',
		Aug: '@float(-100, 100, 2, 2)',
		Sep: '@float(-100, 100, 2, 2)',
		Oct: '@float(-100, 100, 2, 2)',
		Nov: '@float(-100, 100, 2, 2)',
		Dec: '@float(-100, 100, 2, 2)',
	}
	rates.push(acccell)
}
Mock.mock(baseurl+'/v2/account/master_page/month_roi', {
	success: true,
	data: rates
});

// 衡量指标
let metrics = [];
for (let i = 0; i < 1; i++) {
	let acccell = {
		time: '@float(0, 1000, 2, 2)',
		profit: '@float(0, 10000, 2, 2)',
		max_profit: '@float(0, 10000, 2, 2)',
		ave_lot: '@float(0, 1, 2, 2)',
		pl_ratio: '@float(0, 100, 2, 2)',
		loss: '@float(0, 10000, 2, 2)',
		max_loss: '@float(0, 10000, 2, 2)',
		ave_yield: '@float(0, 10000, 2, 2)',
	}
	metrics.push(acccell)
}
Mock.mock(baseurl+'/master/metrics', {
	success: true,
	data: metrics
});
// 跟随者
let follower = [];
for (let i = 0; i < 20; i++) {
	let acccell = {
		'server|1': ['ICMmarkets-Live11', 'GMI-Live03'],
		"type|1-2": 1,
		"createtime": '@date("yyyy-MM-dd")',
		'number':'0.5',
		"name": 'choice',
		"account": /\d{5,10}/,
		"money": /\d{1,5}/,
		"fee": /\d{1,5}/,
		"gg": /\d{1,2}/,
		"model|1":  ['固定', '比例'],
		'pl':/(-?)[1-9]{0,4}\d/,
		'equity':/(-?)[1-9]{0,4}\d/,
	}
	follower.push(acccell)
}
Mock.mock(baseurl+'/follower', {
	success: true,
	data: follower
});
