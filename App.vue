<script>
	import App from './config/app.js'
	import {RefreshToken, appVersionCheck} from '@/config/ajax.js'
	export default {
		globalData:{
			refreshtokenTimer:'',
			back(){
				uni.navigateBack()
			}
		},
		onLaunch: function() {
			this.refreshToken()
			//#ifdef APP-PLUS
			this.updateApp()
			//#endif  
		},
		methods:{
			refreshToken(){	//	刷新token
				getApp().globalData.refreshtokenTimer = setInterval(() => {
					const token = this.$getLocalStorage('access_token')
					const mSecond = token.time || 0
					if(this.calTime(mSecond, new Date().getTime()) > App.tokenTime && token){
						const refreshToken = this.$getLocalStorage('refresh_token')
						RefreshToken({refresh_token: refreshToken}).then(res => {
							try {
								uni.setStorageSync('access_token', {content: res.access_token, time: new Date().getTime()});
								uni.setStorageSync('refresh_token', res.refresh_token);
							} catch (e) {
								console.warn(e)
							}
						})
					}
				}, 10000)
			},
			calTime(time1, time2){
				return time2 - time1
			},
			updateApp(){	//	检查新版本
				uni.getSystemInfo({
					success:(obj) => {
						let platform = obj.platform === 'ios' ? 1 : 0
						this.checkAppVersion(platform)
					}
				})
			},
			checkAppVersion(platform){
				appVersionCheck({
					platform: platform
				}).then(res => {
					if(res.code === 200){
						if(plus.runtime.versionCode < res.data.appVersionNo){
							this.$store.commit('SET_UPDATE_DIALOG', true)
							this.$store.commit('SET_UPDATE_APPINFO', {
								...res.data
							})
						}
					}
				})
			}
		}
	}
</script>>
<style lang="scss">
	/*每个页面公共css */
	@import  '~@/common/css/iconfont.scss';
	@import  '~@/common/css/common.scss';
</style>
