import Vue from 'vue';
const mock = require('@/config/mock.js');
//	拦截器
let requestCount = 0	//	请求次数
let requestUrl = ''	//	请求地址变量
let showLoading = true	//	是否需要显示loading
uni.addInterceptor('request', {
  invoke(args) {
		if(args.header.showLoading){	//	当需要显示loading时，进行loading的显示和计数操作
			showLoading = true
			// request 触发前拼接 url 
			if(requestCount === 0){
				uni.showLoading({
						mask: true
				});
			}	
		}else{
			showLoading = false
		}
		requestCount++;		
		requestUrl = args.url
  },
  success(args) {
		requestCount--
		// 修改拦截的请求返回的数据
		if(Vue.prototype.$mock){
			mock(requestUrl, args)
		}
  }, 
  fail(err) {
		requestCount--
  }, 
  complete(res) {
		requestUrl = ''
		if(requestCount === 0){
			uni.stopPullDownRefresh()
			Vue.prototype.$requestArr = []
		}
		if(requestCount === 0&&showLoading || !showLoading){			
			uni.hideLoading()
		}
  }
})