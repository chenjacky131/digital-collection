import Vue from "vue"
import Vuex from 'vuex'
import app from './modules/app.js'
import collection from './modules/collection.js'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
		title: '测试'
  },
  mutations: {
		SET_TITLE(state, title){
			state.title = title
		}
  },
  actions: {
  },
  modules: {
		app: app,
		collection: collection,
  }
})
