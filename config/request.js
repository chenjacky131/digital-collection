import Vue from 'vue';
import store from '../store/index.js'
// url:请求地址 method:请求方法 data:请求数据
function request(url, method, data, header){
	return new Promise((resolve, reject) => {
		const requestTask = uni.request({
			header: header,
			method: method,
			data: data,
			url: url, 
			success: (res) => {
				if(res.data.error){	// 拦截/admin接口的错误
					uni.showToast({title: res.data.error_description, icon:"none"});
				}
				if(res.data.code === 401){	//	如果token过期，跳转到重新登录
					Vue.prototype.$clearRequestArr()
					uni.clearStorageSync()
					if(store.state.app.expireNoticeCount === 0){
						store.commit('SET_EXPIRE_NOTICE_COUNT', store.state.app.expireNoticeCount + 1)
						uni.showToast({
							title: '登录信息已过期，请重新登录', 
							icon:"none",
							success: () => {
								uni.navigateTo({
										url:'/pages/login/login'
								})
							}
						})							
					}				
				}
				if(res.data.code === 400){
					if(res.data.msg != '获取余额异常' && res.data.msg !='当前已是最新版本'){
						uni.showToast({
							title: res.data.msg, 
							icon:"none"
						});						
					}
				}
				resolve(res.data);
			},
			fail:(err) => {
				reject(err)
			}
		});
		Vue.prototype.$requestArr.push(requestTask)
	})
}

export default request;