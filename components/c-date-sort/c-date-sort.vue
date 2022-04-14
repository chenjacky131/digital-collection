<template>
	<view class="wrap">
		<view class="tit">日期筛选</view>
		<view class="btn-list">
			<view class="btn" :class="{cur: curOption === 'yesterday'}" @click="getYesterday">昨天</view>
			<view class="btn" :class="{cur: curOption === 'thisWeek'}" @click="getThisWeek">本周</view>
			<view class="btn" :class="{cur: curOption === 'thisMonth'}" @click="getThisMonth">本月</view>
			<view class="btn outline" @click="showDialog">自定义</view>
		</view>		
		<c-dialog class="dialog" :show.sync="cDialogShow" @ok="cDialogOk">
			<template v-slot:title>自定义时间</template>
			<template v-slot:content>
				<view class="row">
					<view class="sort-opt">
						<view class="tit">开始时间</view>
						<view class="sort">
							 <picker mode="date" :value="startTimeThis" @change="handleStartTime">
									<view class="uni-input">{{startTimeThis.split(' ')[0]}}</view>
								</picker>
						</view>
					</view>			
					<view class="line">-</view>
					<view class="sort-opt">
						<view class="tit">结束时间</view>
						<view class="sort">
							 <picker mode="date" :value="endTimeThis" @change="handleEndTime">
									<view class="uni-input">{{endTimeThis.split(' ')[0]}}</view>
								</picker>
						</view>
					</view>			
				</view>
				<view class="row">
					<view class="sort-opt">
						<view class="tit">筛选交易对</view>
						<view class="sort">
							<picker @change="bindPickerChange($event,'tradePair')" :value="index" :range="tradePair">
								<view class="uni-input">{{tradePair[index]}}</view>
							</picker>
						</view>
					</view>	
					<view class="line"></view>
					<view class="sort-opt" v-if="showBasicSymbol">
						<view class="tit">筛选计价货币</view>
						<view class="sort">
							<picker @change="bindPickerChange($event,'basicSymbol')" :value="basicSymbolIndex" :range="basicSymbolList">
								<view class="uni-input">{{basicSymbolList[basicSymbolIndex]}}</view>
							</picker>
						</view>
					</view>
				</view>
			</template>
		</c-dialog>
	</view>
</template>

<script>
	export default {
		name:"c-date-sort",
		props:{
			startTime:{
				type: String,
				default: ''
			},
			endTime:{
				type: String,
				default: ''
			},
			moneyType:{
				type: String,
				default: ''
			},
			tradePair:{
				type: Array,
				default:() => []
			},
			showBasicSymbol:{
				type: Boolean,
				default: () => undefined
			}
		},
		data() {
			return {
				cDialogShow: false,
				index:0,
				basicSymbolIndex:0,
				curOption: '',
				startTimeThis: '',
				endTimeThis: '',
				basicSymbolList:['USDT']
			};
		},
		methods:{
			cDialogOk(){
				this.cDialogShow = false;
				this.$emit('update:moneyType', this.tradePair[this.index])
				this.$emit('update:startTime', this.startTimeThis)
				this.$emit('update:endTime', this.endTimeThis)
				this.$emit('update:basicSymbol', this.basicSymbolList[this.basicSymbolIndex])
				this.$emit('search')
			},
			handleStartTime(e){
				this.startTimeThis = this.$dayjs(e.target.value).format('YYYY-MM-DD 00:00:00')
			},
			handleEndTime(e){
				this.endTimeThis = this.$dayjs(e.target.value).format('YYYY-MM-DD 23:59:59')
			},
			bindPickerChange(e,type){
				if(type === 'tradePair'){
					this.index = e.target.value
				}else{
					this.basicSymbolIndex = e.target.value
				}
			},
			getYesterday(){
				this.curOption = 'yesterday'
				this.$emit('update:startTime',this.$dayjs().subtract(1,'day').format('YYYY-MM-DD 00:00:00'))
				this.$emit('update:endTime',this.$dayjs().subtract(1,'day').format('YYYY-MM-DD 23:59:59'))
				this.$emit('search')
			},
			getThisWeek(){
				this.curOption = 'thisWeek'
				this.$emit('update:startTime',this.$dayjs.thisWeek()[0].format('YYYY-MM-DD 00:00:00'))
				this.$emit('update:endTime',this.$dayjs.thisWeek()[1].format('YYYY-MM-DD 23:59:59'))
				this.$emit('search')
			},
			getThisMonth(){
				this.curOption = 'thisMonth'
				this.$emit('update:startTime',this.$dayjs.thisMonth()[0].format('YYYY-MM-DD 00:00:00'))
				this.$emit('update:endTime',this.$dayjs.thisMonth()[1].format('YYYY-MM-DD 23:59:59'))
				this.$emit('search')
			},
			showDialog(){
				this.startTimeThis = this.$dayjs().subtract(1,'day').format('YYYY-MM-DD 00:00:00')
				this.endTimeThis = this.$dayjs().format('YYYY-MM-DD 23:59:59')
				this.cDialogShow = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		&>.tit{
			margin-left: 25px;
		}
	}
	.btn-list{
		padding: 0 25px 12px;
		@include flexRow;
		.btn{
			flex: 1;
			font-size: 13px;
			color: #666;
			text-align: center;
			background: #F2F2F2;
			border-radius: 4px;
			height: 35px;
			line-height: 35px;
			&.cur{
				background: $main-color;
				color: #fff;
			}
			&.outline{
				border: 1px solid $main-color;
				color: $main-color;
				background: transparent;
			}
			&+.btn{
				margin-left: 4px;
			}
		}
	}
	.dialog{
		.row{
			@include flexRow;
			align-items: flex-end;
			.line{
				height: (25px + 18px);
				width: 6px;
				color: #666;
			}
		}
		.sort-opt{
			width: 48%;
			margin-bottom: 18px;
			.tit{
				font-size: 12px;
				color: #333;
				margin-bottom: 12px;
			}
			.sort{
				height: (50px / 2);
				line-height: (50px / 2);
				padding: 0 10px;
				background: #F2F2F2;
				border-radius: 4px;
				font-size: 12px;
			}
		}
	}
</style>
