<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}"></view>
		<view class="cont-c">
			<scroll-view class="scroll-y">
				<c-app-logo-title />
				<view class="h2">忘记密码</view>
					<form class="form" @submit="formSubmit($event)">
						<view class="uni-form-item uni-column">
							<view class="tab-title">
								<text> </text>
							</view>
							<view class="input-wrapper">
								<input class="uni-input" v-model="formData.phone.value" placeholder="输入手机号" />
							</view>
						</view>
						<view class="column-code">
							<view class="input-wrapper">
								<input class="uni-input" v-model="formData.code.value" placeholder="短信验证码" />
							</view>
							<c-sms-code :phone="formData.phone.value" :forgetPass="true" :form="formData"></c-sms-code>
						</view>
						<button class="btn-login" :class="{disabled: disabledNextBtn}" form-type="submit">下一步</button>
					</form>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import noHeader from '@/common/vue/noHeaderMixin.js'
	const validator = require('@/common/js/formValidate.js')
	import {CheckPhone} from '@/config/ajax.js'
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
				}
			}
		},
		mixins:[noHeader],
		methods: {
			back() {
				getApp().globalData.back()
			},
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			formSubmit(){
				if(this.disabledNextBtn){
					return false
				}
				if(validator.check(this.formData)){
					const param = {
						phone: this.formData.phone.value,
						captcha: this.formData.code.value
					}
					CheckPhone(param).then(res => {
							if(res.code === 200){
								//	设置本地存储参数手机号码，给下一个页面使用
								uni.setStorage({
									key:'phone',
									data: this.formData.phone.value,
									success(){
										uni.navigateTo({
											url:'./setPassword'
										})								
									}
								})
							}			
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
		},
	}
</script>

<style lang="scss" scoped>
@import './login.scss'
</style>
