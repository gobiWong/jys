import {
	login,
	listCountryaz
} from '@/api/auth';
import {
	toast
} from '@/utils/toast';

const state = {
	userinfo: {},
	listCountryaz: {},
	isLogin: false,
}

const mutations = {
	LOGIN_INFO: (state, info) => {
		state.userinfo = info;
		state.isLogin = true;
		uni.setStorage({
			key: 'userinfo',
			data: info
		})
	},
	logout(state) { //退出登录 
		console.log(state)
		state.userinfo = {}
		state.isLogin = false;

		uni.removeStorageSync('userinfo');

	},
	listCountryaz: (state, listCountryaz) => {
		state.listCountryaz = listCountryaz;
	},
	changeLoginStatus(state, isLogin) {
		state.isLogin = isLogin;
	}
}
const actions = {
	changeLoginStatus: ({
		commit
	}, Bool) => {
		commit('changeLoginStatus', Bool)
	},
	loginInfo: ({
		commit
	}, form) => {
		login({ ...form
			})
			.then(res => {


				try {
					var info = JSON.parse(res.data);
				} catch (e) {
					var info = res.data;

				}

				if (info.code == 200) {
					toast('登录成功');

					uni.setStorage({
						key: 'flag',
						data: true
					})

					uni.switchTab({

						url: '/pages/quotation/main',
                      

					})



					commit('LOGIN_INFO', info.data)
				} else {
					toast(info.msg)

				}


			})

	},
	listCountryaz: ({
		commit
	}, form) => {
		listCountryaz()
			.then(res => {
				if (res.data.code == 200) {

					commit('listCountryaz', res.data.data)
				}
			})

	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
