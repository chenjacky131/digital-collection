<template>
	<view>
		<view class="table">
			<view class="thead">
				<view v-for="(item,index) in column" :key="index">{{item}}  <text class="iconfont icon-sort"></text></view>
			</view>
			<view class="tbody" :class="{withStripe: withStripe}">
				<slot name="tbody"></slot>
			</view>
		</view>				
		<view class="pager" v-if="withPager">
			<view class="btn" @click="prev">上一页</view>
			<view class="page"><text class="cur">{{current}}</text>/{{total}}</view>
			<view class="btn btn-next" @click="next">下一页</view>
		</view>
	</view>
</template>

<script>
	// props: column表格头部 withStripe是否为条纹表格 withPager是否带分页
	export default {
		name: "c-table",
		data() {
			return {

			};
		},
		props:{
			column:{
				type: Array,
				default:[]
			},
			withStripe:{
				type: Boolean,
				default: true
			},
			withPager:{
				type: Boolean,
				default: true
			},
			total:{
				type: Number,
				default: 1
			},
			current:{
				type: Number,
				default: 1
			}
		},
		methods:{
			next(){
				if(this.current === this.total || this.total === 0){
					uni.showToast({title:"已经是最后一页", icon:"none"})
				}else{
					this.$emit('next')
				}
			},
			prev(){
				if(this.current === 1 || this.total === 0){
					uni.showToast({title:"已经是第一页", icon:"none"})
				}else{
					this.$emit('prev')
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.table{
	line-height: 40px;
	text-align: center;
	.thead{
		@include flexRow;
		background: #F8F8F8;
		color: #898989;
		.iconfont{
			margin-right: 0;
			font-size: 14px;
		}
		&>view{
			flex: 1;
		}
	}
	.tbody{
		/deep/ .row{
			@include flexRow;
			align-items: center;
			height: 40px - 16px;
			padding: 8px 0;
			&>view{
				flex: 1;
				line-height: 1.2;
			}
			&.active{
				background-color: $main-color;
				color: #fff;
				.color-gray,.color-red,.color-green{
					color: #fff !important;
				}
			}
		}
		&.withStripe{
			/deep/ .row{
				&:nth-child(even){
					background-color: #F8F8F8;
				}
			}
		}
	}
}
.pager{
	margin-top: 42px;
	padding: 0 42px;
	@include flexRow;
	align-items: center;
	&>view{
		flex:1;
		text-align: center;
		&.btn{
			color: #7d7d7d;
			font-size: 13px;
			width: (227px / 2);
			height: (56px / 2);
			line-height: (56px / 2);
			background: #FFFFFF;
			border: 1px solid #7D7D7D;
			border-radius: 4px;
			&.btn-next{
				border: 1px solid $main-color;
				color: $main-color;
			}
		}
		.cur{
			color: $main-color;
		}
	}
}
</style>
