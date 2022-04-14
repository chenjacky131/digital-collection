/*
 * @Date: 2021-06-10 14:06:56
 * @LastEditTime: 2021-06-10 14:17:43
 * @Description: Vue过滤器
 * @FilePath: \ticapp\common\vue\filter.js
 */

import Vue from 'vue'

/**
 * @description: 返回策略状态的过滤器
 * @param {Array} arr: 表示状态的文字数组[0,1,2]分别代表的停止，运行，暂停的状态文字
 * @return {String} 返回对应状态的中文
 */
 Vue.filter('statusTxt', function (value,arr) {
  return arr[value]
})
/**
 * @description: 小数转换成百分比
 * @param {Number} value: 需要转换的小数
 * @return {String} : 带有%的字符串
 */
Vue.filter('transformPercent', function (value) {
	if(String(value) === "NaN"){
		return '0.00%'
	}else{
		return (value * 100).toFixed(2) + '%'
	}
})
/**
 * @description: 格式话时间为月日 分秒格式
 * @param {String} value: 要格式化的时间字符串2020-01-01 00:00:00格式
 * @return {String} : 格式化后的时间字符串
 */
Vue.filter('formatShortDates', function (value) {
	const firstP = value.split(' ')[0]
	const secondP = value.split(' ')[1]
  return `${firstP.split('-')[1]}-${firstP.split('-')[2]} ${secondP.split(':')[0]}:${secondP.split(':')[1]}`
})
/**
 * @description: 保留小数点位数
 * @param {Number} value: 要保留小数点的小数
 * @param {Number} number: 要保留小数的位数
 * @return {String} : 返回处理过的小数字符串
 */
Vue.filter('myTofixed', function (value, number) {
	if(!number || String(value).indexOf('.') === -1){	//	如果要保留的小数位没指定或者value不是小数，直接返回value
		return Number(value)
	}else{
		const strValue = String(Number(value).toFixed(number))	//	把科学计数法的格式去掉
		const dotIndex = strValue.indexOf('.')
		let temp = []
		for(let i = 0; i < strValue.length; i++){	//	先保留指定位数的小数
			if(i <= dotIndex + number){
				temp.push(strValue[i])
			}
		}
		if(Number(temp.join('')) === 0){	//	如果去除掉不需要的数据后已经是0了，则直接返回0
			return 0
		}
		//	去除小数点后面多余的0
		let reversedArr = temp.reverse()
		let quit = false
		while(!quit){
			if((reversedArr[0] === '0'&&reversedArr.indexOf('.') !== -1) || reversedArr[0] === '.'){
				reversedArr.shift()
			}else{
				quit = true
			}
		}
		return reversedArr.reverse().join('')
	}
})
/**
 * @description: 计算时长
 * @param {Number} value: 时长的毫秒数
 * @return {String} : 返回格式化过的时长字符串
 */
Vue.filter('toDuration', function (value) {
	let day = Math.floor(value/1000/60/60/24)
	let hour = Math.floor(value/1000/60/60%24)
	let minute = Math.floor(value/1000/60%60%24)
	return `${day}天${hour}时${minute}分`
})