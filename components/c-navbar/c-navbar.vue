<template>
	<view class="header" :class="{fixed: fixed, transparent: transparent}">
		<view class="status-bar"></view>
		<view class="cont">
			<view class="header-left" @click="clickLeft">
				<slot name="left"></slot>
			</view>
			<view class="header-title">
				<slot name="title"></slot>
			</view>
			<view class="header-right" @click="clickRight">
				<slot name="right"></slot>
			</view>			
		</view>
	</view>
</template>

<script>
	// props: fixex是否置顶 transparent:背景是否透明
	export default {
		name:'c-navbar',
		props:{
			fixed:{
				type: Boolean,
				default: false
			},
			transparent:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			}
		},
		methods:{
			clickLeft(){
				this.$emit('clickLeft')
			},
			clickRight(){
				this.$emit('clickRight')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header{
		background-color: #fff;
		&.transparent{
			background-color: transparent;
		}
		&.fixed{
			position: fixed;
			z-index: 4;
			top: 0;
			left: 0;
			right: 0;
			.status-bar{
				height: var(--status-bar-height);
			}
		}
		/deep/ .iconfont{
			font-size: 30px;
		}
		.cont{
		display: flex;
		height: 44px;
		line-height: 44px;
		}
		.header-left{
			width: 240px;
			padding-left: 10px;
		}
		/deep/ .iconSet{
			display: flex;
			line-height: 44px;
			.title{
				font-size: 20px;
				font-weight: bold;
			}
		}
		.header-title{
			flex: 1;
			text-align: center;
			font-size: 18px;
			color: #333;
			white-space: nowrap;
		}
		.header-right{
			width: 100px;
			padding-right: 10px;
			text-align: right;
			font-size: 15px;
			color: $main-color;
		}
		/deep/ .wrap{
			@include flexRow;
		}
	}
</style>
