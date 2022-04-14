<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}"></view>
		<scroll-view class="scroll-y">
			<view class="cont-c">
				<c-app-logo-title />
				<template v-if="curTab === 'passwordLogin'">
				<view class="h2">登录账号</view>
					<form class="form" @submit="formSubmit($event)">
						<view class="uni-form-item uni-column">
							<view class="tab-title">
								<text @click="curTab = 'codeLogin'">快捷登录</text>
							</view>
							<view class="input-wrapper">
								<input class="uni-input" v-model="formData1.account.value" placeholder="账号" />
							</view>
						</view>
						<view class="uni-form-item uni-column">
							<view>
								<view class="input-wrapper">
									<input v-model="formData1.password.value" class="uni-input" placeholder="密码" :password="showPassword" />
									<text class="line-wrap" v-if="formData1.password.value">
										<text class="iconfont icon-close-cricle" @click="formData1.password.value = ''"></text>
										<text class="line">|</text>
									</text>
									<text class="iconfont " :class="[!showPassword ? 'icon-password-hide' : 'icon-password']"
										@click="changePassword"></text>
								</view>
							</view>
							<button class="btn-login" :class="{disabled: disabledPasswordLoginBtn}" form-type="submit">登录</button>
							<view class="forget-pas" @click="forgetPassword">忘记密码</view>
						</view>
					</form>
				</template>
				<template v-else-if="curTab === 'codeLogin'">
				<view class="h2">快捷登录</view>
					<form class="form" @submit="formSubmit($event)">
						<view class="uni-form-item uni-column">
							<view class="tab-title">
								<text @click="curTab = 'passwordLogin'">密码登录</text>
							</view>
							<view class="input-wrapper">
								<input class="uni-input" v-model="formData2.phone.value" placeholder="输入手机号" />
							</view>
						</view>
						<view class="column-code">
							<view class="input-wrapper">
								<input class="uni-input" v-model="formData2.code.value" placeholder="短信验证码" />
							</view>
							<c-sms-code :phone="formData2.phone.value" :smsCode.sync="smsCode" :login="true" :form="formData2"></c-sms-code>
						</view>
						<button class="btn-login" :class="{disabled: disabledSmsLoginBtn}" form-type="submit">登录</button>
					</form>
				</template>
				<view class="register-txt">
					<text>还没有账号？</text><navigator class="color-main" url="../register/register" open-type="redirect">注册</navigator>
				</view>					
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import noHeader from '@/common/vue/noHeaderMixin.js'
	const validator = require('@/common/js/formValidate.js')
	import {Login} from '@/config/ajax.js'
	import md5 from 'js-md5'

	export default {
		data() {
			return {
				curTab: 'passwordLogin',
        showPassword: true,
				middlewareMoneyList: ['USDT','BTC','ETH'],
				formData1:{
					account:{
						value: '',
						rules:[
							{checkType: 'notEmpty',errMsg:'账号不能为空'},
							{checkType: 'maxLength',maxLength: 11, errMsg:'账号长度不能超过11位'},
						]
					},
					password:{
						value: '',
						rules:[
							{checkType: 'notEmpty',errMsg:'密码不能为空'},
							{checkType: 'maxLength',maxLength: 20, errMsg:'密码长度不能超过20位'},
							{checkType: 'numberWithLetters', errMsg:'密码必须包含数字和字母'},
							{checkType: 'minLength',minLength: 6, errMsg:'密码长度不能少于6位'},
						]
					}
				},
				formData2:{
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
		onLoad() {
			
		},
		onShow(){
			if(this.$getLocalStorage('userInfo')){
				uni.navigateTo({
					url:'../collection/collection'
				})
			}
		},
		methods: {
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
				let data = '';
				if(this.curTab === 'passwordLogin'){	//	密码登录
					if(this.disabledPasswordLoginBtn){
						return false;
					}
					data = this.formData1
				}else{
					data = this.formData2
					if(this.disabledSmsLoginBtn){
						return false;
					}
				}
				if(validator.check(data)){
					this.login(data, this.curTab)
				}else{
					uni.showToast({title: validator.error, icon:"none"});
				}				
			},
			login(data, type){
				let param = {}
				if(type === 'passwordLogin'){
					param = {
						username: data.account.value,
						password: md5(data.password.value),
						grant_type: 'password',
						scope: 'all',
						type: 'account'
					}					
				}else{
					param = {
						username: data.phone.value,
						grant_type: 'sms',
						scope: 'all',
						type: 'account',
						code: data.code.value
					}
				}
				Login(this.$bodyParse(param)).then(res => {
					if(res.access_token){
						this.$store.commit('SET_EXPIRE_NOTICE_COUNT', 0) //	重置过期提醒的次数计数
						try {
							uni.setStorageSync('access_token', {content: res.access_token, time: new Date().getTime()});
							uni.setStorageSync('refresh_token', res.refresh_token);
						} catch (e) {
							console.warn(e)
						}
						uni.setStorage({
								key: 'userInfo',
								data: res,
								success: () => {
									uni.navigateTo({
										url: '/pages/collection/collection'
									})
								}
						})
					}
				}).catch(err => {
					uni.showToast({title:err.error_description, icon:"none"});
				})
			}
		},
		computed:{
			disabledPasswordLoginBtn(){
				return !(this.formData1.account.value && this.formData1.password.value)
			},
			disabledSmsLoginBtn(){
				return !(this.formData2.phone.value && this.formData2.code.value)
			}
		},
		mounted(){
		}
	}
</script>

<style lang="scss" scoped>
@import './login.scss'
</style>
