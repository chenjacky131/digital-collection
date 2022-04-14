<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}"></view>
		<view class="cont-c">
			<scroll-view class="scroll-y">
				<c-app-logo-title />
				<view class="h2">设置密码</view>
					<form class="form" @submit="formSubmit($event, 'password')">
						<view class="uni-form-item uni-column">
								<view class="input-wrapper">
									<input v-model="formData.passwordOne.value" class="uni-input" placeholder="输入密码" :password="showPassword1" />
									<text class="line-wrap" v-if="formData.passwordOne.value">
										<text class="iconfont icon-close-cricle" @click="formData.passwordOne.value = ''"></text>
										<text class="line">|</text>
									</text>
									<text class="iconfont " :class="[!showPassword1 ? 'icon-password-hide' : 'icon-password']"
										@click="changePassword('showPassword1')"></text>
								</view>
						</view>
						<view class="uni-form-item uni-column">
								<view class="input-wrapper">
									<input v-model="formData.passwordTwo.value" class="uni-input" placeholder="确认密码" :password="showPassword2" />
									<text class="line-wrap" v-if="formData.passwordTwo.value">
										<text class="iconfont icon-close-cricle" @click="formData.passwordTwo.value = ''"></text>
										<text class="line">|</text>
									</text>
									<text class="iconfont " :class="[!showPassword2 ? 'icon-password-hide' : 'icon-password']"
										@click="changePassword('showPassword2')"></text>
								</view>
						</view>
						<view class="uni-form-item uni-column">
								<view class="input-wrapper">
									<input class="uni-input" v-model="invite" placeholder="邀请码" />
								</view>
						</view>
						<button class="btn-login" :class="{disabled: disabledSubmitBtn}" form-type="submit">完成</button>
					</form>
				<view class="register-txt">
					<text>已有账号?</text><navigator class="color-main" url="../login/login" open-type="redirect">登录</navigator>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import noHeader from '@/common/vue/noHeaderMixin.js'
	const validator = require('@/common/js/formValidate.js')
	import {Register} from '@/config/ajax.js'
	export default {
		data() {
			return {
				curTab: 'passwordLogin',
        showPassword1: true,
        showPassword2: true,
				formData:{
					passwordOne:{
						value: '',
						rules:[
							{checkType: 'notEmpty',errMsg:'密码不能为空'},
							{checkType: 'maxLength',maxLength: 20, errMsg:'密码长度不能超过20位'},
							{checkType: 'minLength',minLength: 6, errMsg:'密码长度不能少于6位'},
							{checkType: 'numberWithLetters', errMsg:'密码必须包含数字和字母'},
							{checkType: 'sameValue', sameWith: 'passwordTwo', errMsg:'两次输入的密码不一致'},
						]
					},
					passwordTwo:{
						value: '',
						rules:[
							{checkType: 'notEmpty',errMsg:'确认密码不能为空'},
						]
					}
				},
				invite: ''
			}
		},
		mixins:[noHeader],
		onShow: () => {
			uni.$on('registerKey', (data) => {
				console.log(data)
			})
		},
		methods: {
			goRegister() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			changePassword(showPassword) {
				this[showPassword] = !this[showPassword];
			},
			forgetPassword(){
				uni.navigateTo({
					url:'forgetPassword'
				})
			},
			formSubmit(){
				if(validator.check(this.formData)){
					let registerKey = this.$getLocalStorage('registerKey')
					const param = {
						"captcha": registerKey.captcha,
						"invite": this.invite,
						"password": this.formData.passwordOne.value,
						"phone": registerKey.phone,
						"repeatPassword": this.formData.passwordTwo.value
					}
					Register(param).then(res => {
						if(res.success){
							uni.showToast({title: res.msg, icon:"none"});
							uni.removeStorage({
							    key: 'registerKey',
							    success: function (res) {
							        console.log('registerKeyRemoved');
							    }
							});
							uni.navigateTo({
								url: '../mine/mine'
							})
						}			
					}).catch(err => {
						uni.showToast({title:err, icon:"none"});
					})
				}else{
					uni.showToast({title: validator.error, icon:"none"});
				}		
			}
		},
		computed:{
			disabledSubmitBtn(){
				return !(this.formData.passwordOne.value && this.formData.passwordTwo.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../login/login.scss'
</style>
