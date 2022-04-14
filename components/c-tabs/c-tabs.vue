<template>
	<view>
		<view class="tabs-head">
			<view class="tabs-item" :class="{active: curTab === index}" @click="navigateTo(index)" v-for="(item,index) in tabsHead">{{item}}</view>
		</view>
		<view class="tabs-cont-wrap">
			<slot name="cont"></slot>
		</view>
	</view>
</template>

<script>
	// props: curTab当前选中的tab项 tabsHead头部选项
	export default {
		name:"c-tabs",
		props:{
			curTab:{
				type: Number,
				default:0
			},
			tabsHead:{
				type: Array,
				default:[]
			}
		},
		data() {
			return {
			};
		},
		methods:{
			navigateTo(index){
				this.$emit('update:curTab', index)
			}
		}
	}
</script>

<style lang="scss" scoped>
.tabs-head{
	@include flexRow;
	.tabs-item{
		flex: 1;
		text-align: center;
		line-height: 1;
		padding: 10px 0;
		font-size: 13px;
		color: #898989;
		position: relative;
		&.active{
			color: $main-color;
		}
		&+.tabs-item{
			&::before{
				content: '';
				position: absolute;
				width: 1px;
				height: 14px;
				background-color: #898989;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
}
</style>
