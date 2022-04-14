<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}"></view>
		<view class="cont-c">
			<scroll-view class="scroll-y">
				<c-app-logo-title />
				<view class="h2">注册账号</view>
				
					<form class="form" @submit="formSubmit($event, 'password')">
						<view class="uni-form-item uni-column">
							<view class="tab-title">
							</view>
							<view class="input-wrapper">
								<input class="uni-input" v-model="formData.phone.value" placeholder="输入手机号" />
							</view>
						</view>
						<view class="column-code">
							<view class="flex1 input-wrapper">
								<input class="uni-input" v-model="formData.code.value" placeholder="短信验证码" />
							</view>
							<c-sms-code :phone="formData.phone.value" :smsCode.sync="smsCode" :form="formData"></c-sms-code>
						</view>
						<button class="btn-login" :class="{disabled: disabledNextBtn}" form-type="submit">下一步</button>
					</form>

				<view class="register-txt">
					<text>已有账号？</text><navigator class="color-main" url="../login/login" open-type="redirect">登录</navigator>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import noHeader from '@/common/vue/noHeaderMixin.js'
	const validator = require('@/common/js/formValidate.js')
	import {CheckSmsCode, CheckPhone} from '@/config/ajax.js'
	export default {
		data() {
			return {
				curTab: 'passwordLogin',
        showPassword: true,
				formData:{
					phone:{
						value: '',
						rules:[
							{checkType: 'notEmpty',errMsg:'手机号不能为空'},
							{checkType: 'phoneNo', errMsg:'手机号格式错误'},
						]
					},
					code:{
						value: '',
						rules:[
							{checkType: 'notEmpty',errMsg:'验证码不能为空'},
							{checkType: 'maxLength',maxLength: 6, errMsg:'验证码长度不能超过4位'},
						]
					}
				},
				smsCode:''
			}
		},
		mixins:[noHeader],
		created(){
			uni.removeStorage({
				key: 'registerPhoneNo'
			})
		},
		methods: {
			back() {
				getApp().globalData.back()
			},
			goRegister() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			forgetPassword(){
				uni.navigateTo({
					url:'forgetPassword'
				})
			},
			formSubmit(){
				if(validator.check(this.formData)){
					const paramCheckPhone = {
						"captcha": this.formData.code.value,
						"phone": this.formData.phone.value
					}
					CheckPhone(paramCheckPhone).then(res => {
						if(res.code === 200){
							const param = {
								phone: this.formData.phone.value,
								code: this.formData.code.value
							}
							//	设置本地存储参数注册表单提交对象，给下一个页面使用
							uni.setStorage({
								key:'registerKey',
								data: {
									phone: this.formData.phone.value,
									captcha: this.formData.code.value
								},
								success(){
									uni.navigateTo({
										url:'setPassword'
									})		
								}
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
			disabledNextBtn(){
				return !(this.formData.phone.value && this.formData.code.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../login/login.scss'
</style>
