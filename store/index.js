import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)


// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	// set './app.js' => 'app'
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')

	const value = modulesFiles(modulePath)
	modules[moduleName] = value.default
	return modules
}, {})


// 国际化相关代码
try {
	// 1. 分析用户已经选择的语言 
	var userLang = uni.getStorageSync("userLang");
	// 2. 如果用户没有选择过获取用户手机的语言
	if (!userLang) {
		
		const sys = uni.getSystemInfoSync();	
		userLang = sys.language;
	}
	console.log(userLang);
	// 以中英文切换为例, 其他语言请使用 getSystemInfoSync 获取语言对应的字符串
	// 然后扩展语言包即可
	if (userLang.substring(0, 2) == 'zh') {
		var lang = require('../language/zh.js');
	} else {
		var lang = require('../language/en.js');
	}
} catch (e) {
	// error
}
const store = new Vuex.Store({
	modules,
	getters,
	state: {
		lang: lang
	},
	mutations: {
		changeLang: function(state) {
			uni.setTabBarItem({
			  index: 0,
			  text: 'english',
			})
			uni.showActionSheet({
				itemList: ['简体中文', 'English'],
				success: function(e) {
					if (e.tapIndex == 0) {
						lang = require('../language/zh.js');
					} else {
						lang = require('../language/en.js');
					}
					state.lang = lang;
				}
			})
		}
	}
})

export default store
