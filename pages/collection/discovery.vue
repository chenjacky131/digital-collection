<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 45 + 'px'}"></view>
		<scroll-view scroll-y="true" :show-scrollbar="false" class="scrollY withHeader" :class="{fixed: fixed}">
			<c-logo-header />			
			<view class="cont">
				<view class="h1">发现</view>
				<view class="sub-h small-text color-light-gray">探索数字藏品</view>
				<view class="form-row">
					<input type="text" class="search" placeholder="搜索">
					<view class="flex-row align-center justify-center">分组 <text class="iconfont icon-xiala"></text></view>
					<view class="flex-row align-center justify-center">排序 <text class="iconfont icon-xiala"></text></view>
				</view>
				<view class="c1 flex-list flex-row space-between">
					<view class="flex-item" @click="linkTo('../mine/worksDetail?showBuyBtn=true')">
						<image class="img" src="../../common/img/home-head-img.png"></image>
						<view class="bot">
							<view class="tit">街舞喷绘</view>
							<view>￥ <span class="bold-text">300.00</span></view>
							<view class="line-wrap flex-row align-center">
								<view class="line"></view>
								<view class="coll">203/500</view>
							</view>
							<view class="bot-txt flex-row space-between align-center">
								<view class="sub-tit flex-row">
									<image class="img-avatar" src="../../common/img/icon-avatar.png"></image>
									<view>时尚艺术</view>
								</view>
								<view class="flex-row align-baseline">
									<view class="t">1</view>
									<view class="icon-heart"></view>
								</view>
							</view>
						</view>
					</view>
					<view class="flex-item">
						<image class="img" src="../../common/img/home-head-img.png"></image>
						<view class="bot">
							<view class="tit">街舞喷绘</view>
							<view>￥ <span class="bold-text">300.00</span></view>
							<view class="line-wrap flex-row align-center">
								<view class="line"></view>
								<view class="coll">203/500</view>
							</view>
							<view class="bot-txt flex-row space-between align-center">
								<view class="sub-tit flex-row">
									<image class="img-avatar" src="../../common/img/icon-avatar.png"></image>
									<view>时尚艺术</view>
								</view>
								<view class="flex-row align-baseline">
									<view class="t">1</view>
									<view class="icon-heart"></view>
								</view>
							</view>
						</view>
					</view>
					<view class="flex-item">
						<image class="img" src="../../common/img/home-head-img.png"></image>
						<view class="bot">
							<view class="tit">街舞喷绘</view>
							<view>￥ <span class="bold-text">300.00</span></view>
							<view class="line-wrap flex-row align-center">
								<view class="line"></view>
								<view class="coll">203/500</view>
							</view>
							<view class="bot-txt flex-row space-between align-center">
								<view class="sub-tit flex-row">
									<image class="img-avatar" src="../../common/img/icon-avatar.png"></image>
									<view>时尚艺术</view>
								</view>
								<view class="flex-row align-baseline">
									<view class="t">1</view>
									<view class="icon-heart liked"></view>
								</view>
							</view>
						</view>
					</view>
					<view class="flex-item">
						<image class="img" src="../../common/img/home-head-img.png"></image>
						<view class="bot">
							<view class="tit">街舞喷绘</view>
							<view>￥ <span class="bold-text">300.00</span></view>
							<view class="line-wrap flex-row align-center">
								<view class="line"></view>
								<view class="coll">203/500</view>
							</view>
							<view class="bot-txt flex-row space-between align-center">
								<view class="sub-tit flex-row">
									<image class="img-avatar" src="../../common/img/icon-avatar.png"></image>
									<view>时尚艺术</view>
								</view>
								<view class="flex-row align-baseline">
									<view class="t">1</view>
									<view class="icon-heart"></view>
								</view>
							</view>
						</view>
					</view>
				</view>				
				<view class="flex-row justify-center txt">— 没有更多 —</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import noHeader from '@/common/vue/noHeaderMixin.js'
	export default {
		data() {
			return {
				fixed: true
			};
		},
		mixins: [noHeader],
		components: {},
		onReachBottom() {},
		onPullDownRefresh() {},
		onHide() {},
		onUnload() {},
		beforeDestroy() {},
		onShow() {},
		computed: {},
		methods: {
			linkTo(txt){
				uni.navigateTo({
					url: txt
				})
			}
		},
		watch: {}
	}
</script>

<style lang="scss" scoped>

	.scrollY {
		position: absolute;
		top: 0;
		height: 100%;
	}

	.cont {
		padding: calc(35px / 2) calc(48px / 2) calc(48px / 2);
	}

	.txt{
		color: #9C9C9C;
		font-size: 10px;
	}
	.h1{
		@include h1();
		margin-bottom: 10px;
	}
	.sub-h{
		margin-bottom: 19px;
	}
	.form-row{
		margin-bottom: 20px;
		display: grid;
		grid-template-columns: 50% 25% 25%;
	}
	.icon-xiala{
		font-size: 16px;
		margin-left: 6px;
	}
</style>
