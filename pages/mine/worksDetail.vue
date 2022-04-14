<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 45 + 'px'}"></view>
		<scroll-view scroll-y="true" :show-scrollbar="false" class="scrollY withHeader" :class="{fixed: fixed}">
			<c-logo-header />
			<c-navbar class="cont-header" @clickLeft="back">
				<template v-slot:left>
					<view class="iconSet">
						<text class="iconfont icon-fanhui"></text>
						<text class="title">查看详情</text>
					</view>
				</template>
				<template v-slot:title>
				</template>
			</c-navbar>
			<view class="cont-top">
				<image class="work" src="../../common/img/home-head-img.png"></image>
				<view class="r1 flex-row space-between">
					<view>
						<view class="sub-tit">街舞喷绘</view>
						<view class="small-text color-light-gray">绘彩系列</view>
					</view>
					<view class="text-right">
						<view class="sub-tit"><text class="small-text color-light-gray">￥</text>300.00</view>
						<view class="small-text color-light-gray">限量 203/500</view>
					</view>
				</view>
				<view class="r2">
					<view class="flex-row space-between align-flexStart">
						<view>
							<view class="sub-tit-2">作者</view>
							<view class="sub-cont">时尚艺术</view>
						</view>
						<view class="flex-row align-center">
							<text class="color-light-gray">800</text>
							<view class="icon-heart"></view>
						</view>
					</view>
					<view class="sub-tit-2">发布时间</view>
					<view class="sub-cont">2022-02-22</view>
				</view>
			</view>
			<c-tabs :tabsHead="tabsHead" :curTab.sync="curTab">
				<template v-slot:cont>
					<template v-if="curTab === 0">
						<view class="cont-bot">
							<view class="spe-tit">
								<view class="txt">作品介绍</view>
								<view class="line"></view>
							</view>
							<view class="p-t1">
								<p>The Survival Alpaca
									灵感来自电影莱昂纳多·迪卡普里奥主演 Catch me if you can《猫鼠游戏》。</p>
								<p>被全球警察追捕的坏蛋每天扮演著不同角色来掩护自己，成功逃过众人法眼！究竟它犯了什么弥天大罪呢？</p>
							</view>
							<view class="sub-tit-2 color-blue">类型</view>
							<view class="sub-cont">时尚艺术</view>
							<view class="sub-tit-2 color-blue">特性</view>
							<view class="grid">
								<view class="grid-item">
									<view class="flex-row space-between small-text color-light-gray">
										<view>名称</view>
										<view>8%</view>
									</view>
									<view>
										内容
									</view>
								</view>
								<view class="grid-item">
									<view class="flex-row space-between small-text color-light-gray">
										<view>名称</view>
										<view>8%</view>
									</view>
									<view>
										内容
									</view>
								</view>
								<view class="grid-item">
									<view class="flex-row space-between small-text color-light-gray">
										<view>名称</view>
										<view>8%</view>
									</view>
									<view>
										内容
									</view>
								</view>
								<view class="grid-item">
									<view class="flex-row space-between small-text color-light-gray">
										<view>名称</view>
										<view>8%</view>
									</view>
									<view>
										内容
									</view>
								</view>
							</view>
						</view>
					</template>
					<template v-else>
						<view class="cont-bot hy">
							<view class="sub-tit">合约地址</view>
							<view class="sub-cont" @click="copyText('测试文字')"><text
									class="iconfont icon-fuzhi"></text>0x8673a1……8e946d</view>
							<view class="sub-tit">藏品编号</view>
							<view class="sub-cont" @click="copyText('测试文字')"><text
									class="iconfont icon-fuzhi"></text>sdfaldf #12121</view>
							<view class="sub-tit">查询网址</view>
							<view class="sub-cont">www.chaxun.com</view>
							<view class="sub-tit">持有人</view>
							<view class="sub-cont">0x151512213……154611</view>
							<view class="sub-tit">购买时间</view>
							<view class="sub-cont">2022-03-09</view>
						</view>
					</template>
				</template>
			</c-tabs>
			
			<view class="cont-bot" v-if="showBuyBtn">
				<view class="spe-tit">
					<view class="txt">购买须知</view>
					<view class="line"></view>
				</view>
				<view class="p-t1 txt-indent">
					您在购买数字藏品前，应知晓本数字藏品为虚拟物品，而非实物，数字藏品的版权由艺术家或艺术机构所有，用户不得将数字藏品用于任何商业用途，包括但不限于出售数字藏品的副本、使用权、衍生作品。本数字藏品一经出售，不支持退换。请勿对数字藏品进行炒作、场外交易、欺诈，或以任何其他非法方式进行使用
				</view>
				<view class="btn default">立即购买</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import noHeader from '@/common/vue/noHeaderMixin.js';
	import copy from 'copy-text-to-clipboard';
	export default {
		data() {
			return {
				fixed: true,
				tabsHead: ['详细信息', '链上信息'],
				curTab: 0,
				showBuyBtn: false
			};
		},
		mixins: [noHeader],
		components: {},
		onReachBottom() {},
		onPullDownRefresh() {},
		onHide() {},
		onUnload() {},
		beforeDestroy() {},
		onLoad(option) {
			option.showBuyBtn ? this.showBuyBtn = true : '';
		},
		computed: {},
		methods: {
			linkTo(link) {
				uni.navigateTo({
					url: link
				})
			},
			back() {
				uni.navigateTo({
					url: '/pages/mine/mine'
				})
			},
			copyText(txt) {
				if(copy(txt)){
					uni.showToast({title:"复制成功", icon:"none"});					
				}
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

	.cont-top {
		padding: 0 23px;

		.work {
			width: 100%;
			margin-bottom: 25px;
		}

		.r1 {
			.sub-tit {
				@include sub-tit();
			}

			padding-bottom: 14px;
			border-bottom: 1px solid #F0F0F0;
		}

		.r2 {
			margin-top: 14px;
		}
	}

	.sub-tit-2 {
		@include sub-tit-2();
	}

	.sub-cont {
		@include sub-cont()
	}

	/deep/ .tabs-head {
		height: calc(55px / 2);
		background: #F4F4F4;

		.tabs-item {
			font-size: 12px;
			font-weight: 500;
			color: #898989;
			padding: 0;
			line-height: calc(55px / 2);

			&.active {
				color: $main-color;

				&::after {
					content: '';
				}
			}

			&::before {
				content: none !important;
			}
		}
	}

	.icon-heart {
		transform: scale(1.5);
	}

	.cont-bot {
		padding: 25px 23px;

		.spe-tit {
			margin-bottom: 30px;
		}

		.p-t1 {
			margin-bottom: calc(54px / 2);
			&.txt-indent{
				margin-bottom: 0;
			}
		}
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		row-gap: 8px;
		column-gap: 18px;

		.grid-item {
			border: 1px solid #E2E2E2;
			border-radius: 5px;
			padding: 6px 10px;
		}
	}
.hy{	
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
	.iconfont{
		color: #0092EF;
		font-size: 16px;
	}
}
</style>
