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
			<view class="setting-content">
				<view class="setting-list">
					<view class="setting-item flex-row space-between">
						<view class="sub-tit">个人资料</view>
						<view class="opt color-blue">修改</view>
					</view>
					<view class="setting-item flex-row space-between">
						<view class="sub-tit">登录密码</view>
						<view class="opt color-blue">修改</view>
					</view>
					<view class="setting-item flex-row space-between">
						<view class="sub-tit">修改手机号</view>
						<view class="opt">175****4151</view>
					</view>
					<view class="setting-item flex-row space-between">
						<view class="sub-tit">支付密码</view>
						<view class="opt color-blue">修改</view>
					</view>
				</view>
				<view class="btn default">退出登录</view>
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
				title: '设置',
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
			}
		},
		computed:{
		}
	}
</script>

<style lang="scss" scoped>
	.setting-content{
		padding: 51px 0 0 0;
		.setting-list{
			padding-left: 22px;
			.setting-item{
				line-height: calc(26px * 3 / 2);
				padding-right: 30px;
				border-bottom: 1px solid #EFEFEF;
				font-size: 14px;
				font-weight: bold;
				.sub-tit{
					color: #252525;
				}
			}
		}
	}
</style>
