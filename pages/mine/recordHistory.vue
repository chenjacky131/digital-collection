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
			<view class="history-content">
				<c-tabs :tabsHead="tabsHead" :curTab.sync="curTab">
					<template v-slot:cont>
						<template v-if="curTab === 0">
							<view class="list-cont">
								<view class="list-item">
									<view class="tit">
										2022年3月
									</view>
									<view class="sub-list">
										<view class="sub-list-item flex-row space-between align-flexEnd" @click="linkToPayDetail">
											<view>
												<view class="sub-tit">购买数字藏品：街舞喷绘</view>
												<view class="tim">2022-03-09</view>
											</view>
											<view>
												<view class="rit-txt">￥300s</view>
											</view>
										</view>
										<view class="sub-list-item flex-row space-between align-flexEnd">
											<view>
												<view class="sub-tit">购买数字藏品：街舞喷绘</view>
												<view class="tim">2022-03-09</view>
											</view>
											<view>
												<view class="rit-txt">￥300s</view>
											</view>
										</view>
										<view class="sub-list-item flex-row space-between align-flexEnd">
											<view>
												<view class="sub-tit">购买数字藏品：街舞喷绘</view>
												<view class="tim">2022-03-09</view>
											</view>
											<view>
												<view class="rit-txt">￥300s</view>
											</view>
										</view>
									</view>
								</view>
								<view class="list-item">
									<view class="tit">
										2022年3月
									</view>
									<view class="sub-list">
										<view class="sub-list-item flex-row space-between align-flexEnd">
											<view>
												<view class="sub-tit">购买数字藏品：街舞喷绘</view>
												<view class="tim">2022-03-09</view>
											</view>
											<view>
												<view class="rit-txt">￥300s</view>
											</view>
										</view>
										<view class="sub-list-item flex-row space-between align-flexEnd">
											<view>
												<view class="sub-tit">购买数字藏品：街舞喷绘</view>
												<view class="tim">2022-03-09</view>
											</view>
											<view>
												<view class="rit-txt">￥300s</view>
											</view>
										</view>
										<view class="sub-list-item flex-row space-between align-flexEnd">
											<view>
												<view class="sub-tit">购买数字藏品：街舞喷绘</view>
												<view class="tim">2022-03-09</view>
											</view>
											<view>
												<view class="rit-txt">￥300s</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</template>
						<template v-else>
							<view class="list-cont">
								<view class="list-item">
									<view class="tit">
										2022年3月
									</view>
									<view class="sub-list">
										<view class="sub-list-item flex-row space-between align-flexEnd" @click="linkToCirculationDetail">
											<view>
												<view class="sub-tit">购买数字藏品：街舞喷绘</view>
												<view class="tim">2022-03-09</view>
											</view>
											<view>
												<view class="rit-txt">购买</view>
											</view>
										</view>
										<view class="sub-list-item flex-row space-between align-flexEnd">
											<view>
												<view class="sub-tit">购买数字藏品：街舞喷绘</view>
												<view class="tim">2022-03-09</view>
											</view>
											<view>
												<view class="rit-txt">购买</view>
											</view>
										</view>
										<view class="sub-list-item flex-row space-between align-flexEnd">
											<view>
												<view class="sub-tit">购买数字藏品：街舞喷绘</view>
												<view class="tim">2022-03-09</view>
											</view>
											<view>
												<view class="rit-txt">购买</view>
											</view>
										</view>
									</view>
								</view>
								<view class="list-item">
									<view class="tit">
										2022年3月
									</view>
									<view class="sub-list">
										<view class="sub-list-item flex-row space-between align-flexEnd">
											<view>
												<view class="sub-tit">购买数字藏品：街舞喷绘</view>
												<view class="tim">2022-03-09</view>
											</view>
											<view>
												<view class="rit-txt">购买</view>
											</view>
										</view>
										<view class="sub-list-item flex-row space-between align-flexEnd">
											<view>
												<view class="sub-tit">购买数字藏品：街舞喷绘</view>
												<view class="tim">2022-03-09</view>
											</view>
											<view>
												<view class="rit-txt">购买</view>
											</view>
										</view>
										<view class="sub-list-item flex-row space-between align-flexEnd">
											<view>
												<view class="sub-tit">购买数字藏品：街舞喷绘</view>
												<view class="tim">2022-03-09</view>
											</view>
											<view>
												<view class="rit-txt">购买</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</template>
					</template>
				</c-tabs>
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
				title: '订单记录',
				tabsHead: ['支付记录', '流转记录'],
				curTab: 0,
			};
		},
		mixins: [noHeader],
		onLoad(param){
			
		},
		methods: {
			back() {
				uni.navigateTo({
					url:'/pages/mine/mine'
				})
			},
			linkToPayDetail() {
				uni.navigateTo({
					url:'/pages/mine/payDetail'
				})
			},
			linkToCirculationDetail() {
				uni.navigateTo({
					url:'/pages/mine/circulationDetail'
				})
			}
		},
		computed:{
		}
	}
</script>

<style lang="scss" scoped>
	.history-content{
		padding-top: calc(73px / 2);
		/deep/ .tabs-head{
			height: calc(34px / 2);
			font-weight: bold;
			color: #94918D;
			.tabs-item{
				padding: 0;
				line-height: calc(34px / 2);
				font-size: calc(36px / 2);
				position: relative;
				&.active{
					&::after{
						content: '';
						width: calc(55px);
						height: 2px;
						position: absolute;
						left: 50%;
						bottom: -10px;
						margin-left: calc(-55px / 2);
						background: #0092EF;
						border-radius: 2px;
					}
				}
				&+.tabs-item{
					&::before{
						content: none;
					}
				}
			}
		}
		.list-cont{
			padding-top: 33px;
			.tit{
				font-size: 12px;
				font-weight: 500;
				color: #ADADAD;
				padding: 0 calc(45px / 2);
				line-height: calc(63px / 2);
				border-bottom: 1px solid #EFEFEF;
			}
			.list-item{
				&+.list-item{
					margin-top: calc(55px / 2);
				}
			}
			.sub-list{
				padding-left: 33px;
				.sub-list-item{
					border-bottom: 1px solid #EFEFEF;
					padding: calc(29px / 2) calc(55px / 2) calc(23px / 2) 0;
					.sub-tit{
						font-size: 14px;
						font-weight: bold;
						color: #252525;
						line-height: 1;
						margin-bottom: 10px;
					}
					.tim{
						font-size: 10px;
						font-weight: bold;
						color: #ADADAD;
						line-height: 1;
					}
					.rit-txt{
						font-size: 14px;
						font-weight: bold;
						color: #252525;
						line-height: 1;
					}
				}
			}
		}
	}
</style>
