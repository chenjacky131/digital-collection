/**
*验证数据格式
*notEmpty:非空的验证必须放第一位
*maxLegth:最大长度，配合maxLength属性一起使用
*phoneNo:手机号
*sameValue:判断相同值,配合sameWith属性一起使用
*formData:{
	account:{
		value:'',
		rules:[
			{checkType: 'notEmpty',errMsg:'账号不能为空'},
			{checkType: 'maxLength',maxLength: 8, errMsg:'账号长度不能超过8位'},
			{checkType: 'phoneNo', errMsg:'手机号格式错误'},
			{checkType: 'sameValue', sameWith: 'passwordTwo', errMsg:'两次输入的密码不一致'},			
			{checkType: 'numberWithLetters', errMsg:'密码必须包含数字和字母'},
		]
	}
}
*/
module.exports = {
	error:'',
	check : function (formData){
		for(let key in formData){
			for(let i = 0; i < formData[key].rules.length; i++){
				switch(formData[key].rules[i].checkType){
					case 'notEmpty':	//	非空
					if(!formData[key].value){
						this.error = formData[key].rules[i].errMsg;
						i = formData[key].rules.length;	//	不再验证其它内容直接退出
						return false;
					}
					break;
					case 'maxLength':	//	最大长度
					if(formData[key].value.length > formData[key].rules[i].maxLength){
						this.error = formData[key].rules[i].errMsg;
						i = formData[key].rules.length;
						return false;
					}
					break;
					case 'minLength':	//	最小长度
					if(formData[key].value.length < formData[key].rules[i].minLength){
						this.error = formData[key].rules[i].errMsg;
						i = formData[key].rules.length;
						return false;
					}
					break;
					case 'numberWithLetters':	//	要包含数字和字母
					if(!(/[a-zA-Z]/.test(formData[key].value)&&/[0-9]/.test(formData[key].value))){
						this.error = formData[key].rules[i].errMsg;
						i = formData[key].rules.length;
						return false;
					}
					break;					
					case 'phoneNo':	//	手机号格式验证
					const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
					if(!reg.test(formData[key].value)){
						this.error = formData[key].rules[i].errMsg;
						i = formData[key].rules.length;
						return false;
					}
					break;
					case 'sameValue':	//	验证两次输入的值是否一致
					if(formData[key].value != formData[formData[key].rules[i].sameWith].value){
						this.error = formData[key].rules[i].errMsg;
						i = formData[key].rules.length;
						return false;
					}
					break;
				}
			}
		}
		return true;
	},
}