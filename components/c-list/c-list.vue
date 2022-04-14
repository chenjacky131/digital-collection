<template>
	<view class="list-wrap">
		<view class="list">
			<view class="list-body">
				<slot name="list-body"></slot>
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
	export default {
		name: "c-list",
		data() {
			return {

			};
		},
		props:{
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
.list-wrap{
	overflow: hidden;
}
.list{
	line-height: 40px;
	text-align: center;
	border-top: 1px solid #EAEAEA;
	padding: 0 25px;
	.list-body{
		/deep/ .list-item{
			border-bottom: 1px solid #EAEAEA;
			padding-bottom: 8px;
			.text-left{
				text-align: left;
			}
			.text-symbol{
				margin-left: 8px;
			}
			.color-black{
				color: #333 !important;
			}
			.font-16{
				font-size: 16px;
			}
			.line-height-18{
				line-height: 18px;
				&>uni-text{
					width: 33.33%;
				}
			}
		}
	}
}
.pager{
	margin-top: 30px;
	margin-bottom: 30px;
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
