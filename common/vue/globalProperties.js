/*
 * @Date: 2021-05-18 11:24:30
 * @LastEditTime: 2021-06-10 14:47:35
 * @Description: 全局属性
 * @FilePath: \ticapp\common\vue\globalProperties.js
 */

import Vue from 'vue'
import request from '@/config/request.js'
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn') // 全局使用
dayjs.extend(relativeTime)

Vue.prototype.$request = request	//	请求函数
Vue.prototype.$dayjs = dayjs
Vue.prototype.$appName = '数字藏品'
/**
 * @description: 本周
 * @return {String} 返回本周开始到今天的时间字符串，以逗号分隔
 */
Vue.prototype.$dayjs.thisWeek = () => {
	const startTime = dayjs().set('day',1)
	const endTime = dayjs()
	return [startTime,endTime]
}
/**
 * @description: 本月
 * @return {String} 返回本月开始到今天的时间字符串，以逗号分隔
 */
Vue.prototype.$dayjs.thisMonth = () =>{
	const startTime = dayjs().set('date',1)
	const endTime = dayjs()
	return [startTime,endTime]
}
/**
 * @description: 设置颜色class
 * @param {Number} val
 * @return {String} 返回颜色的字符串
 */
Vue.prototype.$getColorClass = (val) => {
	if(val <=0 ){
		return 'color-green'
	}else{
		return 'color-red'
	}
}
/**
 * @description: 获取本地存储的数据
 * @param {String} name: 需要读取的数据key名字
 * @return {Any} :返回之前存储的数据，无数据的时候返回空字符串
 */
Vue.prototype.$getLocalStorage = (name) => {	
	try {
	    return uni.getStorageSync(name)
	} catch (e) {			
		uni.showToast({title: e, icon:"none"});
	}
}
/**
 * @description: json对象转化为queryParam形式
 * @param {Object} json:需要转换的对象格式数据
 * @return {*}
 */
Vue.prototype.$bodyParse = (json) => {
	if(!json){
		return ''
	}
	let url = '?'
	const length = Object.keys(json).length;
	for(let i = 0; i < length; i++){
		url+= `${Object.keys(json)[i]}=${json[Object.keys(json)[i]]}${i === (length - 1) ? '':'&' }`
	}
	return url
}
//	存放请求的放回对象
Vue.prototype.$requestArr = []
/**
 * @description: 终止未完成的请求
 */
Vue.prototype.$clearRequestArr = () => {	
	Vue.prototype.$requestArr.map(item => {
		item.abort()
	})
}