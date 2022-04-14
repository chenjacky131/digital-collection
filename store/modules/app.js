export default {
	state: {
		showUpdateDialog: false,
		updateAppInfo: null,
		expireNoticeCount: 0
	},
	mutations: {
		SET_UPDATE_DIALOG(state, show){
			state.showUpdateDialog = show
		},
		SET_UPDATE_APPINFO(state, param){
			state.updateAppInfo = param
		},
		SET_EXPIRE_NOTICE_COUNT(state, param){
			state.expireNoticeCount = param
		}
	},
	actions: {
	},
	modules: {
	}
}