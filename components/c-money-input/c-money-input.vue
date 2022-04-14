<template>
	<view class="wrap">
		<view class="sub-tit">{{des === 2 ? '增加投入资金':'总投入资金'}}</view>
		<view class="zstr small-text color-gray">至少投入资金: <text class="color-main">{{minVest | myTofixed(6)}}</text>{{middlewareMoney}}</view>
		<view class="input-box">
			<input type="text" ref="input" v-model="cMoney" @keyup="checkValue(cMoney)" class="uin-input" placeholder="请输入">
			<text class="txt two-item">
				<text @click="allMoney">全部</text>
				<text class="line">|</text>
				<text>{{middlewareMoney}}</text>
			</text>
		</view>
		<view>
			<c-slider :min="0" :max="availableMoney" @change="handleSliderChange"></c-slider>
		</view>
		<view class="kyzj text-right small-text color-gray">
			可用资金：<text class="color-main">{{availableMoney | myTofixed(6)}}</text> {{middlewareMoney}}
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		name:"c-money-input",
		props:{
			money:{
				type: Number,
				default:() => 0
			},
			availableMoney:{
				type: Number,
				default:() => 0
			},
			middlewareMoney:{
				type: String
			},
			max:{
				type: Number,
				default:() => 0
			},
			minVest:{
				type: Number,
				default: () => 0
			},
			des:{
				type: Number,
				default:() => 0
			}
		},
		data() {
			return {
				cMoney: 0
			}
		},
		methods:{
			handleSliderChange(value){
				const money = parseFloat(value / 100 * (this.availableMoney - 0) + 0)
				this.$emit('update:money', Number(Vue.filter('myTofixed')(money, 6)))
				this.cMoney = Vue.filter('myTofixed')(money, 6)
			},
			checkValue(cMoney){	//	去除以0开头数字的0,但是可以输入小数
				const curV = this.$refs.input.value
				if(cMoney.length >= 2 && cMoney[0] === '0'){	//	去除0开头的整数
					if(curV[curV.length - 1] !== '.'){	//	小数不去除0
						this.cMoney = cMoney.substr(1)
					}
				}
				this.$emit('update:money', Number(this.cMoney))
			},
			allMoney(){
				this.cMoney = this.availableMoney
				this.$emit('update:money', Number(Vue.filter('myTofixed')(this.cMoney, 6)))
			}
		},
		watch:{
			money(val,oldVal){
				this.cMoney = val
			}
		}
	}
</script>

<style lang="scss" scoped>
.wrap{
	.sub-tit{
	}
	.input-box{
		@include input;
		margin-bottom: 17px;
		.txt.two-item{
			width: 90px;
		  .line{
				margin: 0 4px;
			}
		}
	}
	.kyzj{
		margin-bottom: 20px;
	}
	.zstr{
		margin-bottom: 12px;
	}
}
</style>
