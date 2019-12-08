
const state = {
	assertList: [],
}

const mutations = {
	set_assertList: (state, list) => {
		state.assertList = list;
	},
}

const actions = {
	set_assertList: ({commit}, list) => {
		
		commit('set_assertList', list)
	},
	
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
