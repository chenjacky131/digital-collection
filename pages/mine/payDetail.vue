<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}"></view>
		<scroll-view scroll-y="true" :show-scrollbar="false" class="scrollY" :class="{fixed: fixed}">
			<c-navbar class="header" @clickLeft="back" :fixed="fixed">
				<template v-slot:left>
					<view class="iconSet">
						<text class="iconfont icon-fanhui"></text>
						<text class="title">{{title}}</text>
					</view>
				</template>
				<template v-slot:title>
				</template>
			</c-navbar>
			<view class="paydetail-content">
				<view class="tit">购买数字藏品：街舞喷绘</view>
				<view class="sub-tit">订单编号</view>
				<view class="sub-cont">12313213213254</view>
				<view class="sub-tit">订单类型</view>
				<view class="sub-cont">购买</view>
				<view class="sub-tit">订单时间</view>
				<view class="sub-cont">2022-03-10</view>
				<view class="sub-tit">订单金额</view>
				<view class="sub-cont">￥300</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import noHeader from '@/common/vue/noHeaderMixin.js'
	export default {
		data() {
			return {
				fixed: false,
				title: '支付详情',
			};
		},
		mixins: [noHeader],
		onLoad(param){
			
		},
		methods: {
			back() {
				uni.navigateTo({
					url:'/pages/mine/recordHistory'
				})
			}
		},
		computed:{
		}
	}
</script>

<style lang="scss" scoped>
	.paydetail-content{
		padding: calc(72px /2 ) 30px;
		.tit{
			font-size: 14px;
			font-weight: bold;
			color: #252525;
			line-height: 1;
			margin-bottom: calc(65px / 2);
		}
		.sub-tit{			
			font-size: 12px;
			font-weight: 500;
			color: #ABABAB;
			line-height: 1;
			margin-bottom: 10px;
		}
		.sub-cont{
			font-size: 14px;
			font-weight: bold;
			color: #252525;
			line-height: 1;
			margin-bottom: 10px;
		}
	}
</style>
