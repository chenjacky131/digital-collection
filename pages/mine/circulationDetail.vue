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
			<view class="circulationdetail-content">
				<view class="tit">获得数字藏品：街舞喷绘</view>
				<view class="sub-tit">发送方</view>
				<view class="sub-cont" @click="copyText('测试文字')"><text class="iconfont icon-fuzhi"></text>0x8673a1……8e65994b6</view>
				<view class="sub-tit">接收方</view>
				<view class="sub-cont" @click="copyText('测试文字')"><text class="iconfont icon-fuzhi"></text>0x5863a1……8e6598745</view>
				<view class="sub-tit">交易哈希</view>
				<view class="sub-cont" @click="copyText('测试文字')"><text class="iconfont icon-fuzhi"></text>0x5863a1……8e6545465</view>
				<view class="sub-tit">类型</view>
				<view class="sub-cont">购买</view>
				<view class="sub-tit">时间</view>
				<view class="sub-cont">2022-03-10</view>
				<view class="sub-tit">金额</view>
				<view class="sub-cont">￥300</view>
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
				fixed: false,
				title: '流转详情',
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
			},
			copyText(txt) {
				if(copy(txt)){
					uni.showToast({title:"复制成功", icon:"none"});					
				}
			}
		},
		computed:{
		}
	}
</script>

<style lang="scss" scoped>
	.circulationdetail-content{
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
		.iconfont{
			color: #0092EF;
			font-size: 16px;
		}
	}
</style>
