import Vue from 'vue'
/**
 * @description: ajax请求方法封装
 * @param {String} url	请求地址
 * @param {String} Type	请求类型
 * @param {Object} data	请求的数据
 * @param {Object} header	请求的头
 * @return {Promise}	请求后的Promise对象
 */
const PromiseFunc = (url, type, data,header) => {
	const token = Vue.prototype.$getLocalStorage('access_token')&&Vue.prototype.$getLocalStorage('access_token').content
	// url 请求地址 type 请求类型 data 请求数据。 走/api拦截的请求
	return new Promise((resolve, reject) => {
		Vue.prototype.$request(`${
			(Vue.prototype.$platform === 'APP' ? Vue.prototype.$baseUrl : '/api')
			+ url}`, type, data, {
			'Blade-Auth': `bearer ${token}`,
			'User-Type': 'app',
			'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
			'Tenant-Id': '000000',
			'showLoading': true,
			...header
		}).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})			
	})
}
/**
 * @description: ajax请求方法封装
 * @param {String} url	请求地址
 * @param {String} Type	请求类型
 * @param {Object} data	请求的数据
 * @param {Object} header	请求的头
 * @return {Promise}	请求后的Promise对象
 */
const PromiseFunc2 = (url, type, data, header) => {
	const token = Vue.prototype.$getLocalStorage('access_token')&&Vue.prototype.$getLocalStorage('access_token').content
	// url 请求地址 type 请求方法。 走/admin拦截的请求
	return new Promise((resolve, reject) => {
		Vue.prototype.$request(`${
			(Vue.prototype.$platform === 'APP' ? Vue.prototype.$baseUrl2 : '/admin')
			 + url
			}`, type, data, {
			'Blade-Auth': `bearer ${token}`,
			'User-Type': 'app',
			'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
			'Tenant-Id': '000000',
			'showLoading': true,
			...header
		}).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})			
	})
}
// 登录
export const Login = (data) => {
	return PromiseFunc2('/blade-auth/oauth/token' + data, 'POST')
}
// 注册
export const Register = (data) => {
	return PromiseFunc('/blade-app-user/appuser/register', 'POST', data)
}
//	获取用户信息
export const UserInfo = () => {
	return PromiseFunc('/userInfo', 'GET')
}
//	获取图形验证码
export const GetCode = () => {
	return PromiseFunc('/blade-auth/oauth/captcha', 'GET')
}
//	验证手机
export const CheckPhone = (data) => {
	return PromiseFunc('/blade-app-user/appuser/verifyPhone', 'POST', data)
}
//	获取短信验证码
export const GetSmsCode = (data) => {
	return PromiseFunc('/blade-app-user/captcha/register-validate', 'POST', data)
}
//	快捷登录时获取短信验证码
export const GetSmsCodeLogin = (data) => {
	return PromiseFunc('/blade-app-user/captcha/login-validate', 'POST', data)
}
//	快捷登录时获取短信验证码
export const GetSmsCodeForgetPass = (data) => {
	return PromiseFunc('/blade-app-user/captcha/forget-validate', 'POST', data)
}
//	验证短信验证码
export const CheckSmsCode = (data) => {
	return PromiseFunc('/checkSmsCode', 'POST', data)
}
//	设置密码
export const SetPassword = (data) => {
	return PromiseFunc('/blade-app-user/appuser/forgetPwd', 'POST', data)
}
//	获取API列表
export const GetApiList = (data) => {
	return PromiseFunc('/blade-quant/userapi/list', 'GET', data)
}
//	删除API
export const DeleteApi = (data) => {
	return PromiseFunc(`/blade-quant/userapi/remove${Vue.prototype.$bodyParse(data)}`, 'POST')
}
//	添加API 
export const AddApi = (data) => {
	return PromiseFunc('/blade-quant/userapi/save', 'POST', data)
}
//	验证API 
export const VerifyApi = (data) => {
	return PromiseFunc('/blade-quant/userapi/validKey', 'POST', data)
}
//	续期PI 
export const RenewalApi = (data) => {
	return PromiseFunc('/blade-quant/userapi/renewal', 'POST', data)
}
//	修改API 
export const EditApi = (data) => {
	return PromiseFunc('/blade-quant/userapi/update', 'POST', data)
}
//	获取交易记录
export const TradingRecords = (data) => {
	return PromiseFunc('/tradingRecords', 'GET', data)
}
//	获取执行中的策略
export const ExecutingStrategy = () => {
	return PromiseFunc('/executingStrategy', 'GET')
}
//	获取收益记录
export const StrategyDetail = (data) => {
	return PromiseFunc(`/blade-quant/strategyrecord/detail?id=${data.id}`, 'GET')
}
//	获取收益记录
export const CoinDetail = (data) => {
	return PromiseFunc('/coinDetail', 'GET', data)
}
//	获取基础策略参数
export const BasicStrategyInfo = (data) => {
	return PromiseFunc('/blade-quant/strategybasicconfig/detail', 'GET', data)
}
//	启动策略 
export const StartStrategy = (data) => {
	return PromiseFunc('/blade-quant/strategyrecord/startStrategy', 'POST', data)
}
//	获取交易对列表
export const GetTradeParis = (data) => {
	return PromiseFunc(`/blade-quant/token/getSymbolList${Vue.prototype.$bodyParse(data)}`, 'GET', '', {showLoading:false})
}

//	获取未添加的一键启动交易对列表
export const GetNotAddedOneClickTradeParis = (data) => {
	return PromiseFunc(`/blade-quant/strategysymbol/getSymbol?exchange=${data.exchange}&basicSymbol=${data.basicSymbol}`, 'POST')
}
//	获取可用资金
export const GetAvalibleMoney = (data) => {
	return PromiseFunc('/blade-quant/userapi/getExchangeAmount', 'GET', data, {showLoading:false})
}
//	获取策略列表
export const GetStrategyList = (data) => {
	return PromiseFunc(`/blade-quant/strategy/list${Vue.prototype.$bodyParse(data)}`, 'GET', '', {showLoading:false})
}
//	获取策略配置列表
export const GetStrategyConfigList = (data) => {
	return PromiseFunc('/blade-quant/strategyconfig/list', 'GET', data)
}
//	获取策略执行记录
export const GetStrategyRecords = (data) => {
	return PromiseFunc(`/blade-quant/strategyrecord/user/page${Vue.prototype.$bodyParse(data)}`, 'GET')
}
//	终止策略
export const StopStrategy = (data) => {
	return PromiseFunc('/blade-quant/strategyrecord/stopStrategy', 'POST', data)
}
//	基础参数列表
export const BasicConfigList = (data) => {
	return PromiseFunc(`/blade-quant/strategybasicconfig/list?strategyId=${data.strategyId}`, 'GET')
}
//	策略总表
export const StrategyAllDetail = (data) => {
	return PromiseFunc(`/blade-quant/strategy/detail?strategyId=${data.strategyId}`, 'GET')
}
//	策略交易信息
export const StrategyTradeInfo = (data) => {
	return PromiseFunc(`/blade-quant/strategysymbol/list${Vue.prototype.$bodyParse(data)}`, 'GET')
}
//	策略详情里的实时监控
export const RealtimeMonitor = (data) => {
	return PromiseFunc(`/blade-quant/strategylog/list${Vue.prototype.$bodyParse(data)}`, 'GET')
}
//	策略交易记录
export const StrategyTradingRecord = (data) => {
	return PromiseFunc(`/blade-quant/strategytrade/list${Vue.prototype.$bodyParse(data)}`, 'GET')
}
//	更具交易时间获取收益
export const GetBenefitByTime = (data) => {
	return PromiseFunc(`/blade-quant/strategytrade/profit${Vue.prototype.$bodyParse(data)}`, 'GET')
}
//	重启交易对
export const RestartTradePair = (data) => {
	return PromiseFunc(`/blade-quant/strategysymbol/restartSymbol${Vue.prototype.$bodyParse(data)}`, 'GET')
}
//	暂停交易对
export const PauseTradePair = (data) => {
	return PromiseFunc(`/blade-quant/strategysymbol/pauseSymbol${Vue.prototype.$bodyParse(data)}`, 'GET')
}
//	终止交易对
export const EndTradePair = (data) => {
	return PromiseFunc(`/blade-quant/strategysymbol/endSymbol`, 'POST',data)
}
//	获取币对详情
export const TradePairDetail = (data) => {
	return PromiseFunc(`/blade-quant/strategysymbol/detail${Vue.prototype.$bodyParse(data)}`, 'GET')
}
//	策略参数修改
export const TradePairParamUpdate = (data) => {
	return PromiseFunc(`/blade-quant/strategyrecord/updateStrategy`, 'POST',data)
}
//	加仓
export const AddPosition = (data) => {
	return PromiseFunc(`/blade-quant/strategyrecord/addTotalPosition`, 'POST',data)
}
//	刷新token
export const RefreshToken = (data) => {
	return PromiseFunc2(`/blade-auth/oauth/token${Vue.prototype.$bodyParse({
		...data,
		grant_type: "refresh_token",
		scope: "all",
	})}`, 'POST','',{showLoading: false})
}
//	查询币对价格
export const GetTradePairPrice = (data, showLoading) => {
	return PromiseFunc(`/blade-quant/price/blockChainExchangeRate${Vue.prototype.$bodyParse(data)}`, 'GET','',{showLoading:false})
}
//	统计信息
export const GetStatistics = (data) => {
	return PromiseFunc(`/blade-quant/strategytrade/statistics${Vue.prototype.$bodyParse(data)}`, 'GET','',{showLoading:false})
}
//	获取昨日收益
export const GetYesterdayBenefit = (data) => {
	return PromiseFunc(`/blade-quant/strategytrade/getYesterdayProfit${Vue.prototype.$bodyParse(data)}`, 'GET','',{showLoading:false})
}
//	获取交易所总资产
export const GetAllMoney = (data) => {
	return PromiseFunc(`/blade-quant/userapi/getExchangeAsset${Vue.prototype.$bodyParse(data)}`, 'GET','',{showLoading:false})
}

//	app版本校验
export const appVersionCheck = (data) => {
	return PromiseFunc(`/blade-app-user/appinfo/checkAppInfo${Vue.prototype.$bodyParse(data)}`, 'POST')
}