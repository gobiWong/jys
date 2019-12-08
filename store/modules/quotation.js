import {
	getMotherCoinName
} from '@/api/assert';
const state = {
	marketList: {},
	motherCoinName: [],
	defaultWalletPair:{motherId:234314,childId:234516,name:'ETH/BTC'}
}

const mutations = {
	SET_LIST: (state, info) => {
		state.marketList = info;
	},
	set_motherCoinName(state,list) {
	
		state.motherCoinName = list;
	},
	setDefaultWalletPair(state,Pairinfo){
		state.defaultWalletPair=Pairinfo
	}
}

const actions = {
	setList: ({
		commit
	}, info) => {
		commit('SET_LIST', info)
	},
	set_motherCoinName: ({ commit }) => {
		getMotherCoinName().then(res => {
			if (res.data.code == 200) {
				commit('set_motherCoinName', res.data.data)
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
