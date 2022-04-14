import Vue from 'vue'
import App from './App'
//	状态
import store from './store/index.js'
//	全局属性
import '@/common/vue/globalProperties.js'
//	过滤器
import '@/common/vue/filter.js'
//	请求拦截器
import '@/common/js/interceptor.js'
Vue.config.productionTip = false
// 开启拦截,本地开发时，开启，从而获得mockjs编写的模拟数据，切开发环境时需要关掉
Vue.prototype.$mock = true
//接口根地址
Vue.prototype.$baseUrl="http://118.193.44.251:88"
//	接口根地址2
Vue.prototype.$baseUrl2 = "http://118.193.44.251:8000/api"	
 // #ifdef H5
 	Vue.prototype.$platform = 'H5'
 // #endif
 // #ifdef APP-PLUS
 	Vue.prototype.$platform = 'APP'
 // #endif
App.mpType = 'app'
const app = new Vue({
		store,
    ...App
})
app.$mount()
