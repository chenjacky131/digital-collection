<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 45 + 'px'}"></view>
		<scroll-view scroll-y="true" :show-scrollbar="false" class="scrollY withHeader" :class="{fixed: fixed}">
			<c-logo-header />
			<view class="head-bg"></view>
			<view class="icon-setting-row flex-row flex-end" :class="{'visibility-hidden': visitor}">
				<view class="iconfont icon-shezhi" @click="linkTo('../mine/setting')"></view>
			</view>
			<view class="user-info-row flex-row">
				<view>
					<image class="icon-avatar" src="../../common/img/icon-avatar.png"></image>
				</view>
				<view>
					<view class="user-row flex-row">
						<view>用户昵称</view>
						<view class="iconfont icon-bianjimingcheng" :class="{'visibility-hidden': visitor}"></view>
					</view>
					<template v-if="!visitor">
						<view class="info-row flex-row">
							<view class="iconfont icon-shouji"></view>
							<view>170****4125</view>
						</view>
						<view class="info-row flex-row">
							<view class="iconfont icon-dizhi"></view>
							<view>0x151512213……15611</view>
						</view>						
					</template>
				</view>
				<view class="btn-row flex-row" :class="{isVisotor: visitor}">
					<view class="btn">
						<view class="blue-txt">1221</view>关注
					</view>
					<view class="btn">
						<view class="blue-txt">1221</view>粉丝
					</view>
					<view class="btn btn-follow" v-if="visitor">关注</view>
				</view>
			</view>
			<view class="author-info p-t1" v-if="visitor">
				POSTORE数字贩卖机，是一个自动售卖数字藏品的贩卖机，这里也是一个自由流转的聚集地，你可以在这里自由流转。
				不仅存在元宇宙的世界里......
				<text class="iconfont icon-xiala color-blue"></text>
			</view>
			<c-tabs :tabsHead="tabsHead" :curTab.sync="curTab">
				<template v-slot:cont>
					<view class="iconfont icon-lishijilu" @click="linkTo('../mine/recordHistory')"></view>
					<view class="search-row">
						<input class="search" type="text" placeholder="搜索" @confirm="handleSearch" />
					</view>
					<view class="list-wrap">
						<view class="c1 flex-list flex-row space-between">
							<view class="flex-item" @click="linkTo('../mine/worksDetail')">
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
					<view class="empty-holder" v-if="false">
						<!-- 暂无数据 -->
						<view>
							<image class="img" src="../../common/img/icon-empty.png"></image>
							<view class="flex-row justify-center txt">— 没有藏品 —</view>
						</view>
					</view>
				</template>
			</c-tabs>
		</scroll-view>
	</view>
</template>

<script>
	import noHeader from '@/common/vue/noHeaderMixin.js'
	export default {
		data() {
			return {
				fixed: true,
				tabsHead: ['我的藏品', '我喜欢的'],
				curTab: 0,
				visitor: false
			};
		},
		mixins: [noHeader],
		components: {},
		onReachBottom() {},
		onPullDownRefresh() {},
		onHide() {},
		onUnload() {},
		beforeDestroy() {},
		onLoad(options) {
			if(options.visitor){
				this.visitor = true;
				this.tabsHead = ['持有', '收藏']
			}
		},
		computed: {},
		methods: {
			linkTo(link){
				uni.navigateTo({
					url: link
				})
			},
			handleSearch(e) {
				console.log('提交', e.detail.value)
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
		position: absolute;
		top: 0;
		width: 100%;
		height: 90px;
		z-index: -1;
		background: linear-gradient(180deg, #3CAFFF, #0092EF);
	}

	.icon-setting-row {
		padding-top: 15px;

		.iconfont {
			color: #fff;
			min-height: 24px;
		}
	}

	.user-info-row {
		margin-top: 12px;
		padding-left: 28px;
		flex-wrap: wrap;

		.icon-avatar {
			width: calc(150px / 2);
			height: calc(150px / 2);
			margin-right: 11px;
			border: 2px solid #fff;
			border-radius: 50%;
		}

		.user-row {
			line-height: 22px;
			color: #fff;
			font-size: 18px;
			font-weight: bold;
			margin-bottom: 16px;
			margin-top: 6px;

			.iconfont {
				color: #fff;
				margin-left: 10px;
				font-weight: normal;
			}
		}

		.info-row {
			line-height: 1;
			color: #9D9D9D;

			.iconfont {
				font-size: 16px;
			}
		}

		.btn-row {
			margin-top: 24px;
			width: 100%;
			.btn {
				height: calc(52px / 2);
				width: calc(158px / 2);
				line-height: calc(50px / 2);
				background: #FFFFFF;
				border: 1px solid #E1E1E1;
				border-radius: 5px;
				padding: 0 10px;
				font-size: 12px;
				color: #9D9D9D;
				display: flex;
				box-sizing: border-box;
				align-items: center;
				&.btn-follow{
					border-color: $main-color;
					color: $main-color;
					width: 60px;
					justify-content: center;
					&.followed{
						background: $main-color;
						color: #fff;
					}
				}
				.blue-txt {
					font-size: 14px;
					color: #009CFF;
				}

				&+.btn {
					margin-left: 10px;
				}
			}
			&.isVisotor{
				margin-top: -34px;
				padding-left: 90px;
			}
		}
	}

	/deep/ .tabs-head {
		padding-left: 25px;
		margin-top: 35px;
		align-items: flex-end;
		padding-bottom: 9px;

		.tabs-item {
			flex: none;
			color: #999999;
			font-size: 15px;
			padding: 0;
			position: relative;

			&.active {
				font-size: 20px;
				font-weight: bold;
				color: #010101;

				&::after {
					content: '';
					position: absolute;
					width: calc(77px / 2);
					height: 2px;
					background: #0092EF;
					bottom: -8px;
					left: 0;
				}
			}

			&+.tabs-item {
				margin-left: 19px;
			}

			&::before {
				content: none !important;
			}
		}
	}

	.empty-holder {
		position: absolute;
		width: 100%;
		top: 250px;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;

		.img {
			width: calc(285px / 2);
			height: calc(195px / 2);
		}
		.txt{
			margin-top: 17px;
		}
	}

	.icon-lishijilu {
		position: absolute;
		right: 24px;
		top: 220px;
	}

	.search-row {
		margin: 18px 24px calc(33px / 2);
	}

	.txt {
		color: #9C9C9C;
		font-size: 10px;
	}

	.list-wrap {
		padding: 0 25px;
		overflow: hidden;
		.txt{
			margin-bottom: 20px;
		}
	}
	.visibility-hidden{
		visibility: hidden;
	}
	.author-info{
		padding: 0 25px;
		.icon-xiala{
			font-size: 16px;
		}
	}
</style>
