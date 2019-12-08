<template>
	<view>
		<view class="status-contents">
			<view class="status top-view"></view>
		</view>
		<view class="head">
			<image src="/static/assert/search-icon.png" class="search-icon"></image>
			<input type="text" value="" placeholder="USDT" confirm-type="search" class="input flex-1" placeholder-class="placeholder-class"
			 @confirm='confirm' v-model='searchValue' />
			<text class="cancel-text" @tap="back">{{lang.cancel}}</text>
		</view>
		<view>
			<view class="no-data" v-if="searchlist.length===0 && searchHistory.length===0">
				<image src="/static/assert/nodata-bg.png" mode=""></image>
				<text>{{lang.Norecord}}</text>
			</view>
			<!-- æœè¿‘æŸ¥çœ-->
			<view class="history" v-if="searchHistory.length!==0" >
				<view class="label">{{lang.recentview}}</view>
				<view class="history-item" @tap="gokline(item)">
					<view v-for="(item,index) in searchHistory" :key='index*10'>
						{{item}}
					</view>
				</view>
			</view>
			<view class='data' v-if="searchlist.length!==0">
				<view v-for='(item,index) in searchlist' :key='index' class='search-data' @tap="onClick(item)">
					<view>{{item.symbol}}</view>
					<view>
						<image src="/static/assert/start-white-icon"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				searchValue: '',
				searchlist: [],
				searchHistory: []
			}
		},
		computed: {
			...mapState('quotation', ['marketList']),
			...mapState(['lang'])

		},
		watch: {
			searchValue: function(val) {
				if (val === '') {

					this.searchlist = []
				} else {
					var list = this.marketList.filter(item => {

						return item.symbol.indexOf(val.toUpperCase()) != -1;
					})
					this.searchlist = list;
				}
			},
		},
		created() {
			this.searchHistory = uni.getStorageSync('searchHistory');
		},
		methods: {
			gokline(symbol){
				// #ifdef APP-PLUS
				uni.navigateTo({
					url: "/pages/trade/kline/main?symbol=" + symbol
				});
				// #endif
				// #ifdef H5
				let windowWidth = uni.getSystemInfoSync().windowWidth;
				let windowheight = uni.getSystemInfoSync().windowHeight;
				let statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
				let url = 'http://apps.infinite-ex.com/kline-web?symbol=' + symbol + '&width=' + windowWidth + "&height=" + windowheight +
					'&statusBarHeight=' + statusBarHeight;
				location.href=url;
				// #endif
			},
			onClick(item) {
				// #ifdef APP-PLUS
				uni.navigateTo({
					url: "/pages/trade/kline/main?symbol=" + item.symbol
				});
				// #endif
				// #ifdef H5
				let windowWidth = uni.getSystemInfoSync().windowWidth;
				let windowheight = uni.getSystemInfoSync().windowHeight;
				let statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
				let url = 'http://apps.infinite-ex.com/kline-web?symbol=' + item.symbol + '&width=' + windowWidth + "&height=" + windowheight +
					'&statusBarHeight=' + statusBarHeight;
				location.href=url;
				// #endif


				uni.setStorage({
					key: 'setDefaultWalletPair',
					data: {
						motherId: item.motherCoin,
						childId: item.childCoin,
						name: item.symbol
					}
				})
				var searchHistory = uni.getStorageSync('searchHistory');

				if (searchHistory === undefined || searchHistory === null || searchHistory === '') {
					searchHistory = [item.symbol]
				} else if (searchHistory.length >= 6) {
					if(searchHistory.indexOf(item.symbol)===-1){
						searchHistory[0] = item.symbol;
					}
				} else {
					if(searchHistory.indexOf(item.symbol)===-1){
						searchHistory.unshift(item.symbol)
					}
					
				}

				uni.setStorage({
					key: 'searchHistory',
					data: searchHistory
				})
				uni.setStorage({
					key: 'setDefaultWalletPair',
					data: {
						motherId: item.motherCoin,
						childId: item.childCoin,
						name: item.symbol
					}
				})
				this.$store.commit('quotation/setDefaultWalletPair', {
					motherId: item.motherCoin,
					childId: item.childCoin,
					name: item.symbol
				});


			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			confirm() {

			}
		},
	}
</script>

<style scoped lang="scss">
	.status-contents {
		height: var(--status-bar-height);
	}

	.top-view {
		width: 100%;
		position: fixed;
		top: 0;
	}

	.status {
		height: var(--status-bar-height);
	}

	.head {
		display: flex;
		align-items: center;
		height: 90upx;
		padding: 0 30upx;
		box-sizing: border-box;
		border-bottom: 2PX solid #E8E8E8;
	}

	.search-icon {
		width: 20upx;
		height: 22upx;
		vertical-align: middle;
		margin-top: -2upx;
	}

	.cancel-text {
		font-size: 24upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: #AFAFAF;
	}

	.flex-1 {
		flex: 1;
		margin-left: 20upx;
		height: 70upx;
		line-height: 70upx;
		margin-right: 20upx;
	}

	.no-data {
		text-align: center;
		margin-top: 106upx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		image {
			width: 379upx;
			height: 311upx;

		}

		text {
			text-align: center;
			font-size: 30upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(140, 151, 157, 1);
			margin-top: 68upx;
		}
	}

	.search-data {
		display: flex;
		padding: 0 30px;
		height: 100upx;
		align-items: center;
		justify-content: space-between;

		&>view:frist-child {
			font-size: 36px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(45, 47, 86, 1);
		}

		image {
			width: 32upx;
			height: 33upx;
		}

	}

	.history>.label {
		margin-left: 31upx;
		margin-top: 19upx;
		font-size: 24px;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(140, 151, 157, 1);
		line-height: 24upx;
		margin-bottom: 22upx;
	}

	.history-item {
		display: flex;
		flex-wrap: wrap;
		padding-left:50upx;
		&>view {
			margin-bottom: 30upx;
			margin-right: 32upx;
			width: 168px;
			height: 56px;
			background: rgba(243, 245, 254, 1);
			border-radius: 5px;
			line-height: 56upx;
			font-size: 26px;
			text-align: center;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(140, 151, 157, 1);
		}
	}
</style>
