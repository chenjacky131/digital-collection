<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 45 + 'px'}"></view>
		<scroll-view scroll-y="true" :show-scrollbar="false" class="scrollY withHeader" :class="{fixed: fixed}">
			<c-logo-header />
			<image class="head-bg" src="../../common/img/home-head-bg.png"></image>
			<view class="head-img">
				<image class="img" src="../../common/img/home-head-img.png"></image>
				<view class="bot flex-row space-between">
					<view>
						<view class="tit bold-text">梦幻天空</view>
						<view class="sub-tit flex-row">
							<image class="img-avatar" src="../../common/img/icon-avatar.png"></image>
							<view>时尚艺术</view>
						</view>
					</view>
					<view>
						￥<span class="bold-text">300.00</span>
					</view>
				</view>
			</view>
			<view class="swiper-wrap">
				<swiper class="swiper" :indicator-dots="true" :autoplay="false" :previous-margin="'30px'"
					:next-margin="'30px'" :active-class="'cur'" :indicator-color="'#D3D3D3'"
					:indicator-active-color="'#0092EF'" :circular="true">
					<swiper-item>
						<view class="swiper-item">
							<view class="inner-wrap">
								<image class="img" src="../../common/img/home-head-img.png"></image>
								<view class="txt bold-text">数字藏品活动开始</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<view class="inner-wrap">
								<image class="img" src="../../common/img/home-head-img.png"></image>
								<view class="txt bold-text">数字藏品活动开始</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<view class="inner-wrap">
								<image class="img" src="../../common/img/home-head-img.png"></image>
								<view class="txt bold-text">数字藏品活动开始</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="cont">
				<view class="com-tit flex-column">
					<view class="tit">热门推荐</view>
					<view class="line"></view>
					<view class="sub-tit">寻找喜欢的数字藏品</view>
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
				<view class="btn-more" @click="linkTo('./discovery')">发现更多</view>
				<view class="com-tit flex-column">
					<view class="tit">创作者</view>
					<view class="line"></view>
					<view class="sub-tit">特别的艺术家</view>
				</view>
				<view class="c2 flex-list flex-row space-between">
					<view class="flex-item flex-row" @click="linkTo('../mine/mine?visitor=true')">
						<image class="img-avatar" src="../../common/img/icon-avatar.png"></image>
						<view>时尚艺术</view>
					</view>
					<view class="flex-item flex-row">
						<image class="img-avatar" src="../../common/img/icon-avatar.png"></image>
						<view>时尚艺术</view>
					</view>
					<view class="flex-item flex-row">
						<image class="img-avatar" src="../../common/img/icon-avatar.png"></image>
						<view>时尚艺术</view>
					</view>
					<view class="flex-item flex-row">
						<image class="img-avatar" src="../../common/img/icon-avatar.png"></image>
						<view>时尚艺术</view>
					</view>
				</view>
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

	.head-bg {
		width: 100%;
		height: calc(525px / 2);
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		z-index: -1;
	}

	.head-img {
		display: block;
		margin: calc(58px / 2) auto 0;
		box-shadow: 1px 1.5px 34px 0px rgba(59, 59, 59, 0.19);
		width: calc(617px / 2);
		@include normal-radius;
		overflow: hidden;

		image {
			vertical-align: middle;
		}

		.img {
			width: calc(617px / 2);
			height: calc(443px / 2);
		}

		.bot {
			box-sizing: border-box;
			width: calc(617px / 2);
			height: calc(117px / 2);
			margin: 0 auto;
			background: #fff;
			padding: 10px;

			.tit {
				color: #252525;
				font-size: 14px;
				margin-bottom: calc(18px / 2);
			}

			@include icon-text;
		}
	}

	.swiper-wrap {
		.swiper {
			height: calc(150px + 42px / 2);
		}

		.inner-wrap {
			box-shadow: 1px 1.5px 10px 0px rgba(59, 59, 59, 0.3);
			@include normal-radius;
			overflow: hidden;
		}

		.swiper-item {
			width: calc(630px / 2);
			margin: 0 auto;
			padding: calc(42px / 2) 8px 0;
			box-sizing: border-box;
			position: relative;

			.img {
				width: 100%;
				height: calc(240px / 2);
				vertical-align: middle;
			}

			.txt {
				position: absolute;
				bottom: calc(10px / 2);
				left: calc(32px / 2);
				font-size: 15px;
				color: #fff;
			}
		}

		/deep/ .uni-swiper-dots {
			bottom: 0;

			.uni-swiper-dot-active {
				width: 20px;
				border-radius: 12px;
			}
		}
	}

	.cont {
		padding: calc(35px / 2) calc(48px / 2) calc(48px / 2);
	}

	.com-tit {
		margin-bottom: 15px;

		.tit {
			font-size: 20px;
			font-weight: bold;
			color: #010101;
			margin-bottom: 10px;
		}

		.line {
			width: calc(77px / 2);
			height: 2px;
			background: #0092EF;
			margin-bottom: 6px;
		}

		.sub-tit {
			font-size: 1px;
			font-weight: bold;
			color: #BEBEBE;
		}
	}
	.btn-more {
		@include btn;
		width: calc(151px / 2);
		height: calc(50px / 2);
		line-height: calc(50px / 2);
		background: #EFEFEF;
		font-size: 12px;
		color: #9C9C9C;
		margin: 0 auto 13px;
		border-radius: calc(50px / 2 / 2);
	}
</style>
