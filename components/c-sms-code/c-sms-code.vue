<template>
	<view class="flex1">
		<view class="btn" :class="{disabled: disabledSend}" @click="handleSend">{{sendBtnTxt}}</view>
		<c-dialog class="dialog" :show.sync="cDialogShow" @ok="sendCode">
			<template v-slot:title>请填写图形验证码</template>
			<template v-slot:content>
				<view class="code-wrap">
					<view class="input-wrapper">
						<input class="uni-input" v-model="code" @confirm="sendCode" placeholder="验证码" />
					</view>
					<view class="code">
						<image :src="codeImg" @click="getCode"></image>
					</view>					
				</view>
			</template>
		</c-dialog>
	</view>	
</template>

<script>
	import {GetSmsCode, GetSmsCodeLogin, GetSmsCodeForgetPass, GetCode, CheckCode} from '@/config/ajax.js'
	const validator = require('@/common/js/formValidate.js')
	export default {
		name:"c-sms-code",
		props:['phone','login','forgetPass','form'],
		data() {
			return {
				disabledSend: false,				
				sendBtnTxt: '发送',
				getCodeTimer: '',
				waitNextSendTime: 60,
				cDialogShow: false,
				codeImg: '',
				codeKey: '',
				code: '',
				smsCode: '',
				checkObj:{
					phone:{
						value: '',
						rules:[
							{checkType: 'notEmpty',errMsg:'手机号不能为空'},
							{checkType: 'phoneNo', errMsg:'手机号格式错误'},
						]
					}
				}
			};
		},
		created(){
		},
		methods:{
			getCode(){	//	获取图形验证码	
				GetCode().then(res => {
					if(res.image){
						this.codeImg = res.image				
						this.codeKey = res.key
					}else{
						console.log(res)
					}
				}).catch(err => {
					uni.showToast({title:err, icon:"none"});
				})
			},
			getSmsCode(){	// 发送图形验证码，获取短信验证码
				const param = {
					"captchaCode": this.code,
					"captchaKey": this.codeKey,
					"phone": this.phone
				}
				if(this.login){
					GetSmsCodeLogin(param).then(res => {
						if(res.code === 200){
							this.cDialogShow = false
							this.$emit('update:smsCode',res.data)
						}
					}).catch(err => {
						uni.showToast({title:err, icon:"none"});
					})					
				}else if(this.forgetPass){
					GetSmsCodeForgetPass(param).then(res => {
						if(res.code === 200){
							this.cDialogShow = false
							this.$emit('update:smsCode',res.data)
						}
					}).catch(err => {
						uni.showToast({title:err, icon:"none"});
					})	
				}else{		
					GetSmsCode(param).then(res => {
						if(res.code === 200){
							this.cDialogShow = false
							this.$emit('update:smsCode',res.data)
						}
					}).catch(err => {
						uni.showToast({title:err, icon:"none"});
					})			
				}
			},
			handleSend(){
				this.checkObj.phone.value = this.form.phone.value
				if(validator.check(this.checkObj)){
					if(!this.disabledSend){
						this.getCode()
						this.cDialogShow = true
						this.disabledSend = true
						this.sendBtnTxt = `发送 (${this.waitNextSendTime}s)`
						this.waitNextSendTime--
						this.getCodeTimer = setInterval(() => {
							this.sendBtnTxt = `发送 (${this.waitNextSendTime}s)`
							if(this.waitNextSendTime === 0){
								clearInterval(this.getCodeTimer)
								this.disabledSend = false
								this.sendBtnTxt = `发送`
								this.waitNextSendTime = 60
								return false
							}
							this.waitNextSendTime--
						}, 1000)
					}
				}else{
					uni.showToast({title: validator.error, icon:"none"});
				}
			},
			sendCode(){
				if(!this.code){
					uni.showToast({title:"验证码不能为空", icon:"none"});
				}else{
					this.getSmsCode()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.flex1{
	flex: 1;
	&>.btn{
		height: 40px;
		line-height: 40px;
		border-radius: 5px;
		background: $main-color;
		flex: 1;
		margin-left: 15px;
		font-size: 16px;
		color: #fff;
		text-align: center;
		&.disabled{
			background: #B4B4B4;
		}
	}
}

@include dialog;
	.code-wrap{
		@include flexRow;
		.input-wrapper{
			@include input;
		}
		.code{
			margin-left: 15px;
			image{
				width: (197px / 2);
				height: 40px;
			}
		}
	}
</style>
