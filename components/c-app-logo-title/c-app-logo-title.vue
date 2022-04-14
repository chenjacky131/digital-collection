<template>
	<view class="wrap">
		<template v-if="imageType === 'img'">
			<image @click="showMenu" class="img" src="../../common/img/icon-menu.png"></image>	
			<uni-drawer class="drawer" ref="showLeft" mode="left" :mask-click="true">
				<scroll-view style="height: 100%;" scroll-y="true">
					<view class="link-item" @click="linkTo('../collection/collection')">首页</view>
				</scroll-view>
			</uni-drawer>
		</template>
		<template v-else>
			<image class="logo" src="../../static/logo.png"></image>
		</template>
		<view class="name">
			<text class="t1">{{$appName}}</text>
			<text class="t2">NFT</text>
		</view>
		<view v-if="false" class="test-txt">测试版</view>
	</view>
</template>

<script>
	export default {
		name:"c-app-logo-title",
		data() {
			return {
				
			};
		},
		props:{
			imageType: {
				type: String,
				default: 'logo'
			}
		},
		methods:{
			showMenu(){
				this.$refs.showLeft.open();
			},
			linkTo(item){
				uni.navigateTo({
					url: item
				})
				this.$refs.showLeft.close();
			}
		}
	}
</script>

<style lang="scss">
	.logo{
		width: 60px;
		height: 60px;
		margin-bottom: (51px / 2);
	}
	.img{
		width: 20px;
		height: 20px;
		margin-top: 10px;
		margin-right: 10px;
	}
	.name{
		font-weight: bold;
		@include flexRow;
		align-items: flex-end;
		line-height: 1;
		.t1{
			font-size: 30px;
			color: $main-color;
		}
		.t2{
			font-size: 20px;
			color: #010101;
			margin-left: 9px;
		}
	}
	.test-txt{
		margin-top: 10px;
	}
	.drawer{
		.link-item{
			text-align: center;
			line-height: 48px;
			font-size: 18px;
			border-bottom: 1px solid #ccc;
		}
	}
</style>
