<template>
	<c-navbar class="header" :fixed="fixed" @clickRight="linkTo('../mine/mine')">
		<template v-slot:left>
			<c-app-logo-title :imageType="'img'" />
		</template>
		<template v-slot:right>
			<image class="icon-mine" src="../../common/img/icon-mine.png"></image>
		</template>
	</c-navbar>
</template>

<script>
	export default {
		data() {
			return {
				fixed: true,
			};
		},
		components: {},
		onReachBottom() {},
		onPullDownRefresh() {},
		onHide() {},
		onUnload() {},
		beforeDestroy() {},
		onShow() {},
		computed: {},
		methods: {
			linkTo(link){
				uni.navigateTo({
					url: link
				})
			}
		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.header {		
		border-bottom: 1px solid #F0F0F0;
		/deep/ {
			.header-left {
				width: 100%;
	
				.name {
					.t1 {
						font-size: 20px;
					}
	
					.t2 {
						font-size: 14px;
					}
				}
			}
	
			.header-right {
				line-height: 44px;
			}
		}
	
		.icon-mine {
			width: 20px;
			height: 20px;
			vertical-align: middle;
		}
	}
</style>
