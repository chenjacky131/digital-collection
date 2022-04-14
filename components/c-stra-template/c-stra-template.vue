<template>
	<view>
		<view class="top-row flex-row space-between align-center">
			<view class="l flex-row align-center" @click="chooseApi">
				<image v-if="curApiObj.exchange" class="img" :src="require(`../../static/${curApiObj.exchange}.png`)"></image>
				<view>
					<view class="name">{{curApiObj.apiName}}</view>
					<view class="small-text color-gray" v-if="curApiObj.remark">({{curApiObj.remark}})</view>
				</view>
				<text class="iconfont icon-arrow-down"></text>
			</view>
			<view class="r small-text color-gray">
				手续费 <text class="color-main">{{serviceCharge}}</text>
			</view>
		</view>
		<view class="top-row flex-row space-between align-center">
			<view class="l flex-row small-text align-center" @click="chooseMoney">
				<view class="name">计价货币</view>
				<view class="color-main">{{middlewareMoney}}</view>
				<text class="iconfont icon-arrow-down"></text>
			</view>
			<view class="r small-text color-gray" @click="clearTradepairList">
				清除
			</view>
		</view>
		<view class="trade-pair">
			<template v-if="type === 1">
				<view v-for="(item,index) in strategyInfo.tradePairListOneClick" :key="item.id" class="trade-pair-item flex-row space-between align-center" @click="chooseTradePair(index,item.name)">
					<view class="l">
						<view class="name color-main">{{item.name}}</view>
					</view>
					<view class="r flex-row align-center">
						<view class="text-right" :class="[$getColorClass(item.rate)]">
							<view class="num">{{item.price}}</view>
							<view class="small-text">({{item.rate | transformPercent}})</view>
						</view>
						<text class="iconfont color-main icon-close" @click.stop="deleteTradeparisOneClick(item)"></text>
					</view>
				</view>				
			</template>
			<template v-else>
				<view v-for="(item,index) in strategyInfo.tradePairListDiy" :key="item.id" class="trade-pair-item flex-row space-between align-center" @click="chooseTradePair(index,item.name)">
					<view class="l">
						<view class="name color-main">{{item.name}}</view>
					</view>
					<view class="r flex-row align-center">
						<view class="text-right" :class="[$getColorClass(item.rate)]">
							<view class="num">{{item.price}}</view>
							<view class="small-text">({{item.rate | transformPercent}})</view>
						</view>
						<text class="iconfont color-main icon-close" @click.stop="deleteTradeparisDiy(item)"></text>
					</view>
				</view>				
			</template>
			<view class="trade-pair-item add text-center flex-row align-center" @click="addTradePair">
				<view class="flex1">
					<text class="iconfont icon-add"></text>
					<text>添加交易对</text>									
				</view>
			</view>
		</view>
		<template v-if="type === 1">
			<view class="sub-tit">策略类型</view>
			<view class="btn-list flex-row">
				<view class="btn flex1" v-for="(item, index) in strategyOneClickObjList" :class="selectedStrategyType === index ? '':'disabled'" @click="selectedStrategyType = index">{{item.strategyType}}</view>
			</view>			
		</template>
		<template v-if="type === 2">
			<view class="remark">备注:自定义交易对按照保守型保存默认参数，如需要修改，请在交易对下点击内容修改对应参数</view>
			<view class="sub-tit">参数设置</view>
			<view class="btn-outline" @click="paramSettingBatch">批量设置参数</view>
		</template>
		<c-money-input 
			:money.sync="money" 
			:middlewareMoney="middlewareMoney" 
			:max="availableMoney"
			:availableMoney.sync="availableMoney"
			:minVest="minVest"></c-money-input>
		<view class="other-setting color-main" :class="{show: showOtherSetting}" @click="showOtherSetting = !showOtherSetting">
			<text>其他设置</text>
			<text class="iconfont icon-arrow-down"></text>
		</view>
		<view v-show="showOtherSetting">
			<view class="sub-tit">总收益止盈</view>
			<view class="input-box">
				<input type="text" class="uin-input" v-model="stopProfit" placeholder="选填">
				<text class="txt">
					<text class="line">|</text>
					<text>%</text>
				</text>
			</view>
			<view class="sub-tit">总亏损止损</view>
			<view class="input-box">
				<input type="text" class="uin-input" v-model="stopLoss" placeholder="选填">
				<text class="txt">
					<text class="line">|</text>
					<text>%</text>
				</text>
			</view>
			<view class="sub-tit">定时自动终止</view>
			<view class="input-box">
				<uni-datetime-picker :border="false" :value="autoStop" @change="bindTimeChange"></uni-datetime-picker>
			</view>
			<view class="sub-tit">循环做单终止</view>
			<view class="input-box">
				<input type="text" class="uin-input" v-model="cycleStop" placeholder="选填">
				<text class="txt">
					<text class="line">|</text>
					<text>次</text>
				</text>
			</view>
			<view class="switch-list">
				<view class="switch-line flex-row space-between align-center">
					<view class="t1">终止后撤销未成交订单</view>
					<view><switch @change="handleSwitchOne" class="switch" :color="'#ED9D04'" :checked="withdrawUnsuccessOrder"/></view>
				</view>
				<view class="switch-line flex-row space-between align-center">
					<view class="t1">终止后自动兑换投入币种</view>
					<view><switch @change="handleSwitchTwo" class="switch" :color="'#ED9D04'" :checked="autoTransformIntoCooin"/></view>
				</view>							
			</view>			
		</view>

		<view class="btn" :class="{disabled: disabledSend}" @click="handleStart">启动</view>
		<uni-popup ref="popup" type="bottom" style="max-height: 100%;">
			<view class="popup-list">
				<view class="popup-list-item title flex-row space-between">
					<text>选择API</text>
					<text class="iconfont icon-add" @click="addApi"></text>
				</view>
				<scroll-view class="api-scroll-wrap" scroll-y="true" >
					<view v-for="(item, index) in apiList" :key="item.id" class="popup-list-item flex-row space-between" @click="closePopUp(index)">
						<view>
							<image class="img" :src="require(`../../static/${item.exchange}.png`)"></image>
							<text>{{item.apiName}} <text class="color-gray small-text" v-if="item.remark">({{item.remark}})</text></text>					
						</view>
						<text v-if="index === checkedApiIndex" class="iconfont icon-check color-main"></text>
					</view>										
				</scroll-view>	
			</view>
		</uni-popup>
		<uni-popup ref="popupMoney" type="bottom">
			<view class="popup-list">
				<view class="popup-list-item title flex-row space-between">
					<text>选择计价货币</text>
				</view>
				<view v-for="(item,index) in middlewareMoneyList" class="popup-list-item flex-row space-between" @click="closeMoneyPopUp(item)">
					<view>
						<text>{{item}} </text>				
					</view>
					<text v-if="middlewareMoney === item" class="iconfont icon-check color-main"></text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Vue from 'vue'
	import { StartStrategy, GetAvalibleMoney, GetStrategyConfigList} from '@/config/ajax.js'
	export default {
		name:"c-stra-template",
		props:['type','strategyId','tradePair','curApiObjP','selectedStrategyTypeP'],
		data() {
			return {
				showOtherSetting: false,	//	显示其它设置
				money: 0,	//	总投入资金
				strategyInfo: {
					tradePairListDiy: [],	//添加的交易对信息
					tradePairListOneClick: []	//添加的交易对信息
				},
				apiList: [],	//	api列表
				checkedApiIndex: 0,	//	当前选中的api index
				stopProfit: '',
				stopLoss: '',
				autoStop:'',
				cycleStop: '',
				withdrawUnsuccessOrder: false,
				autoTransformIntoCooin: false,
				middlewareMoneyList:['USDT','BTC','ETH'],
				middlewareMoney: 'USDT',	//	计价货币
				availableMoney: 0,	//	当前api里面可用的资金
				strategyOneClickObjList:[],	//	一键启动策略类型对象列表
				selectedStrategyType:0,	//	选中的策略类型
				strategyDiyObj: {},	//	自定义启动策略类型对象，理论上只有一个，取第一个
				curSelectedLevel:{},	//	参数里面的交易数率
				symbolParameter:[],	//	交易对对应的参数列表
				disabledSend: false
			};
		},
		created(){
			if(this.selectedStrategyTypeP != undefined){
				this.selectedStrategyType = Number(this.selectedStrategyTypeP)
			}
			this.getApiListAndAvailableMoney()
			this.getStrateType()
			if(this.tradePair){
				this.strategyInfo.tradePairListDiy = this.$getLocalStorage('tradePairListDiy') || []
				this.strategyInfo.tradePairListOneClick = this.$getLocalStorage('tradePairListOneClick') || []
				this.middlewareMoney = this.tradePair.split('/')[1]
			}
		},
		methods:{
			chooseApi(){
				this.$refs.popup.open()
			},
			chooseMoney(){
				this.$refs.popupMoney.open()
			},
			closePopUp(index){
				if(index !== undefined){
					this.checkedApiIndex = index
					this.$emit('update:curApiObjP', this.apiList[index])
					this.money = 0
					this.getAvailibelMoney(this.apiList[index])
					uni.setStorage({
						key:'curApiObj',
						data: this.apiList[index]
					})
				}
				this.$refs.popup.close()
			},
			closeMoneyPopUp(type){	//	处理计价货币列表的选择
				this.middlewareMoney = type
				this.$refs.popupMoney.close()
				this.money = 0
				this.getAvailibelMoney(this.apiList[this.checkedApiIndex])
				this.clearTradepairList()
			},
			addApi(){
				uni.navigateTo({
					url:`../../pages/mine/apiAdd?from=create&id=${this.strategyId}`
				})
				this.closePopUp()
			},
			addTradePair(){	//	添加交易对
				if(this.type === 1){	//	一键启动
					uni.navigateTo({
						url:`../../pages/collection/addTradePair?addType=${'oneClick'}&&exchange=${this.curApiObj.exchange}&basicSymbol=${this.middlewareMoney}&id=${this.strategyId}&selectedStrategyType=${this.selectedStrategyType}`
					})
				}else{	//	自定义启动
					uni.navigateTo({
						url:`../../pages/collection/addTradePair?addType=${'diy'}&exchange=${this.curApiObj.exchange}&basicSymbol=${this.middlewareMoney}&id=${this.strategyId}`
					})					
				}
			},
			chooseTradePair(index,name){
				if(this.type === 1 && index === 0){
					uni.navigateTo({
						url: `../../pages/collection/chooseTradePari?exchange=${this.curApiObj.exchange}&id=${this.strategyId}`
					})					
				}else if(this.type === 2){
					if(!this.strategyDiyObj){
						uni.showToast({
							title: '后台未配置策略参数，请先配置', 
							icon:"none"
						});
						return ;
					}
					uni.navigateTo({
						url:`../../pages/collection/paramSetting?id=${this.strategyDiyObj.basicConfigId}&strategyId=${this.strategyId}&tradePair=${name}`
					})		
				}		
			},
			paramSettingBatch(){	//	批量设置参数
				if(this.strategyInfo.tradePairListDiy.length === 0){
					uni.showToast({
						title: '请先添加交易对', 
						icon:"none"
					});
					return ;
				}
				uni.navigateTo({
					url:`../../pages/collection/paramSettingBatch?id=${this.strategyDiyObj.basicConfigId}&strategyId=${this.strategyId}`
				})
			},
			getStrateType(){
				GetStrategyConfigList({	//	获取一键启动的策略类型
					configType: '默认',
					strategyId: this.strategyId
				}).then(res => {
					if(res.code === 200){
						this.strategyOneClickObjList = res.data.records
					}
				})
				GetStrategyConfigList({	//	获取自定义启动的策略类型
					configType: '自定义',
					strategyId: this.strategyId
				}).then(res => {
					if(res.code === 200){
						this.strategyDiyObj = res.data.records[0]
						uni.setStorage({
							key:'strategyDiyObj',
							data: res.data.records[0]
						})
					}
				})
			},
			getApiListAndAvailableMoney(){	//	获取api列表和可用的余额
				const apiList = this.$getLocalStorage('apiList')
				if(apiList != ''){
					this.apiList = apiList
					apiList.map((item,index) => {
						if(item.apiName === this.curApiObj.apiName){
							this.checkedApiIndex = index
						}
					})
					this.getAllApiMoney(apiList).then(res => {	//	遍历API获取余额
						if(res.length > 0){
							res.map(api => {
								uni.setStorage({
									key: api.apiName,
									data: api.datas
								})
							})
						}
						this.getAvailibelMoney(this.apiList[this.checkedApiIndex])	
					}).catch(err => {
						console.error(err)
					})			
				}
			},
			handleSwitchOne(e){
				this.withdrawUnsuccessOrder = e.target.value
			},
			handleSwitchTwo(e){
				this.autoTransformIntoCooin = e.target.value
			},
			handleStart(){
				if(this.disabledSend){
					return false
				}
				if(this.money < this.minVest){
					uni.showToast({
						title: `投入金额不能小于${Vue.filter('myTofixed')(this.minVest, 6)}`, 
						icon:"none"
					});
					return ;
				}
				if(this.type === 1){	//	一键启动的参数				
					this.symbolParameter = this.strategyInfo.tradePairListOneClick.map(item => {
						return {
							"dealRate": 0,
							"parameter": this.strategyOneClickObjList[this.selectedStrategyType]&&this.strategyOneClickObjList[this.selectedStrategyType]['setting'] || '{}',
							"symbol": item.name
						}
					})					
				}else{	//	自定义启动
					if(!this.strategyDiyObj){
						uni.showToast({
							title: '后台未配置策略参数，请先配置', 
							icon:"none"
						});
						return ;
					}
					//	如果参数未修改过
					const symbolParameter = this.$getLocalStorage('symbolParameter')
					this.symbolParameter = []	//	情况下之前的参数
					if(symbolParameter === ''){
						this.symbolParameter = this.strategyInfo.tradePairListDiy.map(item => {
							return {
								"dealRate": 0,
								"parameter": this.strategyDiyObj['setting'],
								"symbol": item.name
							}
						})							
					}else{
						this.strategyInfo.tradePairListDiy.map(item => {
							let exist = false
							let obj = {}
							symbolParameter.map(item2 => {
								if(item.name === item2.symbol){
									exist = true
									obj = item2
								}
							})
							if(exist){	//	如果这个币对的参数修改过
								this.symbolParameter.push({
									...obj,
									parameter: JSON.stringify(obj.parameter)
								})
							}else{
								this.symbolParameter.push({
									"dealRate": 0,
									"parameter": this.strategyDiyObj['setting'],
									"symbol": item.name
								})
							}
						})				
					}
				}
				const data = {
					apiToken: this.curApiObj.token,
					autoStopTime: this.autoStop ? new Date(this.autoStop).getTime() : 0,
					endCancelOrder: this.withdrawUnsuccessOrder ? 1:0,
					endChangeBasic: this.autoTransformIntoCooin ? 1:0,
					stopTotalLossRate: this.stopLoss ? this.stopLoss / 100 : 0,
					stopTotalProfitRate: this.stopProfit ? this.stopProfit / 100 : 0,
					repeatCnt: this.cycleStop ? this.cycleStop : 0,
					strategyId: this.strategyId,
					symbolParameter: this.symbolParameter,
					token: this.middlewareMoney,
					totalPosition: this.money,
					strategyType: this.type === 1 ? (this.strategyOneClickObjList[this.selectedStrategyType].strategyType) : '自定义'
				}
				this.disabledSend = true
				StartStrategy(data).then(res => {
					setTimeout(() => {
						this.disabledSend = false
					}, 1500)					
					if(res.code === 200){
						uni.showToast({
							title: res.msg, 
							icon:"none",
							success: () => {
								uni.setStorage({
									key:'curTab',
									data: 1
								})
								setTimeout(() => {	
									uni.removeStorage({
											key: 'tradePairListDiy'
									})			
									uni.removeStorage({
											key: 'tradePairListOneClick'
									})									
									uni.navigateTo({
										url: '../../pages/collection/collection'
									})
								}, 1500)
							}
						});
					}
				}).catch(err => {
					setTimeout(() => {
						this.disabledSend = false
					}, 1500)
				})
			},
			deleteTradeparisOneClick(item){
				let tempArr = []
				tempArr = this.strategyInfo.tradePairListOneClick.filter(tradePair => {
					return item.name != tradePair.name
				})
				this.strategyInfo.tradePairListOneClick = tempArr
				uni.setStorage({	// 删除交易对
						key: 'tradePairListOneClick',
						data: tempArr,
						success: function () {
							uni.showToast({title:"删除成功", icon:"none"});
						}
				});
				//	清除交易对参数
				let storagedParameter = this.$getLocalStorage('symbolParameter')
				if(storagedParameter){
					let tempParameterArr = []
					tempParameterArr = storagedParameter.filter(parameter => {
						return item.name != parameter.symbol
					})
					uni.setStorage({	// 删除交易对
							key: 'symbolParameter',
							data: tempParameterArr
					});
				}
				// 清楚选中状态
				let dataType = 'oneClick'
				let tradeparis = this.$getLocalStorage(`${this.curApiObj.exchange}-${this.middlewareMoney}-${dataType}-tradepairs`)
				tempArr.map(temp => {
					tradeparis.map(trade => {
						if(temp.name === trade.name){
							trade.checked = true
						}else{
							trade.checked = false
						}
					})
				})
				uni.setStorage({
					key:`${this.curApiObj.exchange}-${this.middlewareMoney}-${dataType}-tradepairs`,
					data: tradeparis
				})
			},
			deleteTradeparisDiy(item){
				let tempArr = []
				tempArr = this.strategyInfo.tradePairListDiy.filter(tradePair => {
					return item.name != tradePair.name
				})
				this.strategyInfo.tradePairListDiy = tempArr
				uni.setStorage({	// 删除交易对
						key: 'tradePairListDiy',
						data: tempArr,
						success: function () {
							uni.showToast({title:"删除成功", icon:"none"});
						}
				});
				//	清除交易对参数
				let storagedParameter = this.$getLocalStorage('symbolParameter')
				if(storagedParameter){
					let tempParameterArr = []
					tempParameterArr = storagedParameter.filter(parameter => {
						return item.name != parameter.symbol
					})
					uni.setStorage({	// 删除交易对
							key: 'symbolParameter',
							data: tempParameterArr
					});
				}
				// 清楚选中状态
				let dataType = 'diy'
				let tradeparis = this.$getLocalStorage(`${this.curApiObj.exchange}-${this.middlewareMoney}-${dataType}-tradepairs`)
				tempArr.map(temp => {
					tradeparis.map(trade => {
						if(temp.name === trade.name){
							trade.checked = true
						}else{
							trade.checked = false
						}
					})
				})
				uni.setStorage({
					key:`${this.curApiObj.exchange}-${this.middlewareMoney}-${dataType}-tradepairs`,
					data: tradeparis
				})
			},
			getAvailibelMoney(api){
				const moneyObj = this.$getLocalStorage(`${api.apiName}`)
				if(moneyObj!= ''&&moneyObj[this.middlewareMoney]){
					this.availableMoney = Number(moneyObj[this.middlewareMoney])
				}else{
					this.availableMoney = 0
				}
			},
			bindTimeChange(time){
				this.autoStop = time
			},
			clearTradepairList(){	//	清除交易对
				if(this.type === 1){
					this.strategyInfo.tradePairListOneClick = []
					uni.removeStorage({	//	清除交易对参数
							key: 'tradePairListOneClick',
							success: function (res) {
							}
					});
				}else{
					this.strategyInfo.tradePairListDiy = []
					uni.removeStorage({	//	清除交易对参数
							key: 'tradePairListDiy',
							success: function (res) {
							}
					});
					uni.removeStorage({	//	清除交易对参数
							key: 'symbolParameter',
							success: function (res) {
							}
					});					
				}
				let dataType = this.type === 1 ? 'oneClick' : 'diy'
				let tradeparis = this.$getLocalStorage(`${this.curApiObj.exchange}-${this.middlewareMoney}-${dataType}-tradepairs`)
				tradeparis = tradeparis.map(item => {
					return {
						...item,
						checked: false
					}
				})
				uni.setStorage({
					key:`${this.curApiObj.exchange}-${this.middlewareMoney}-${dataType}-tradepairs`,
					data: tradeparis
				})
			},
			getAllApiMoney(records){
				let temp = records.map(record => {
					return new Promise((resolve, reject) => {
						const param = {
							apiToken: record.token
						}
						GetAvalibleMoney(param).then(res => {
							if(res.code == 200){
								resolve({
									datas:res.data,
									apiName: record.apiName
								})
							}
						}).catch(err => {
							reject(err)
						})				
					})
				})				
				return Promise.all(temp)
			}
		},
		computed:{
			curApiObj(){	//	当前的api对象
				return this.curApiObjP
			},
			serviceCharge(){
				let fee = 0
				switch(this.curApiObjP.exchange){
					case 'BINANCE':
						fee = '0.1%'
					break;
					case 'HUOBI':
						fee = '0.2%'
					break;
					case 'OKEX':
						fee = '0.15%'
					break;
					default:
						fee = '--'
				}
				return fee
			},
			minVest(){	//	最低投入
				if(this.type === 1&&this.strategyOneClickObjList[this.selectedStrategyType]){
					let first_rate = Number(JSON.parse(this.strategyOneClickObjList[this.selectedStrategyType].setting)['first_rate'])
					return first_rate === 0 ? 0 : 15/first_rate * this.strategyInfo.tradePairListOneClick.length
				}else if(this.type === 2&&this.strategyDiyObj.setting){
					let first_rate = Number(JSON.parse(this.strategyDiyObj.setting)['first_rate'])
					return first_rate === 0 ? 0 : 15/first_rate * this.strategyInfo.tradePairListDiy.length
				}else{
					return 0
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.api-scroll-wrap{
		max-height: 50vh;
	}
	.remark{
		margin-bottom: 10px;
		font-size: 12px;
		color: #666;
	}
	/deep/{
		.uni-date__icon-clear{
			bottom: 0;
			line-height: 30px;
			border: 0 !important;
		}
		.uni-date{
			width: 100%;
		}
		.uni-date-x{
			background-color: transparent;
		}
	}	
	.top-row{
		margin-bottom: 15px;
		.name{
			color: #333;
		}
		.img{
			width: 20px;
			height: 20px;
		}
		.iconfont{
			font-size: 20px;
			color: $color-gray;
		}
	}
	.trade-pair{
		margin-bottom: 10px;
		.trade-pair-item{
			height: 40px;
			background: #F8F5F1;
			border-radius: 4px;
			padding-left: 14px;
			padding-right: 8px;
			border: 1px solid #F8F5F1;
			&.add{
				border: 1px solid $main-color;
				color: $main-color;
				background: #fff;
				.iconfont{
					color: $main-color;
				}
			}
			&+.trade-pair-item{
				margin-top: 10px;
			}
			.name{
				font-size: 15px;
			}
			.num{
				font-size: 15px;
			}
			.iconfont{
				font-size: 14px;
				margin-left: 13px;
				margin-right: 0;
				&.icon-add{
					margin-left: 0;
				}
			}
		}
	}
	.sub-tit{
	}
	.btn-list{
		margin-bottom: 23px;
		.btn{
			@include btn;
			&+.btn{
				margin-left: 6px;
			}
		}
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
	.other-setting{
		margin-bottom: (53px / 2);
		&.show{
			.iconfont{
				transform: rotate(180deg);
			}
		}
		.iconfont{
			color: $main-color;
			font-size: 14px;
			margin-left: 4px;
			margin-right: 0;
			display: inline-block;
			transform-origin: center center;
		}
	}
	.btn{
		@include btn;
	}
	.btn-outline{
		@include btn;
		width: (343px / 2);
		border: 1px solid $main-color;
		color: $main-color;
		background: #fff;
		margin-bottom: 23px;
	}
	.switch-list{
		margin-bottom: 37px;
	}
	.switch-line{
		&+.switch-line{
			margin-top: 2px;
		}
	}

</style>
