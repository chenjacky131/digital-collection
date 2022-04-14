const mixin = {
		data() {
			return {
				iStatusBarHeight: 0,
			};
		},
		onLoad() {
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
		}
}
export default mixin