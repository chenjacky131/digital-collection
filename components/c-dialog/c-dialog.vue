<template>
	<view class="dialog-wrap" v-if="show">
		<view class="dialog-container">
			<view class="dialog-head">
				<view class="title">
					<slot name="title"></slot>
				</view>
				<text class="iconfont icon-close" @click="close"></text>
			</view>
			<view class="dialog-cont">
				<slot name="content"></slot>
			</view>
			<view class="dialog-footer" v-if="withFooter">
				<view class="btn" @click="close">取消</view>
				<view class="btn btn-ok" @click="ok">确定</view>
			</view>			
		</view>
	</view>
</template>

<script>
	// props: show显示隐藏弹窗
	export default {
		name:"c-dialog",
		props:{
			show:{
				type: Boolean,
				default: false
			},
			withFooter:{
				type: Boolean,
				default: true
			},
			computedShow:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			close(){
				if(this.computedShow){
					this.$emit('close')
				}else{
					this.$emit('update:show', false)
				}
			},
			ok(){
				this.$emit('ok')
			}
		}
	}
</script>

<style lang="scss" scoped>
@include dialog;
</style>
