<template>
	<view>
		<view class="account-header">
			<view class="account-header-bg"><image src="/static/assert/tu.jpg" mode="aspectFill"></image></view>
			<view class="account-money">
				<view class="account-money-one">{{ lang.valuation }}(BTC)</view>
				<!-- 仓位分布图 -->
				<view class="account-money-two">
					<view class="money-two">{{ currencyNum }}</view>
					<view class="money-free">BTC</view>
					<canvas @click="bounced" canvas-id="canvasColumn" id="canvasColumn" class="charts" />
				</view>
				<!-- ≈539.82 CNY -->
				<view class="account-money-three">{{ num | numFilter }} CNY</view>
			</view>
		</view>
		<!-- 弹窗隐藏区域 -->
		<view v-if="isPopupVisible" id="myModal" class="modal">
			<!-- 弹窗内容 -->
			<view class="modal-content">
				<!-- 图表 -->
				<view class="model-one"><canvas canvas-id="canvasId" id="canvasId" class="charts" /></view>
				<view class="model-free">
					<view class="moder-two">
						<view></view>
						<view>WICC</view>
						<view>42.00%</view>
					</view>
					<view class="moder-two">
						<view style="background: #9555F6;"></view>
						<view style="color: #9555F6;">ETH</view>
						<view style="color: #9555F6;">26.00%</view>
					</view>
				</view>
				<view class="model-fix">
					<view class="moder-two">
						<view style="background: #C42DB6;"></view>
						<view style="color: #C42DB6;">BTC</view>
						<view style="color: #C42DB6;">42.00%</view>
					</view>
					<view class="moder-two">
						<view style="background:#FFD64A"></view>
						<view style="color:#FFD64A">其他</view>
						<view style="color:#FFD64A">42.00%</view>
					</view>
				</view>
			</view>
			<!-- 关闭按钮 -->
			<view @tap="bouncedDetic" class="model-image"><image src="../../static/assert/guanbi.png" mode=""></image></view>
		</view>
		<!-- 充币 -->
		<view class="Charge-money">
			<view @tap="Chargemoney" class="Charge">
				<image src="../../static/assert/chongb.png" mode=""></image>
				<view class="filling">{{ lang.Chargemoney }}</view>
			</view>
			<view @tap="Mentionmoney" class="Charge">
				<image src="../../static/assert/tibii.png" mode=""></image>
				<view class="filling">{{ lang.Mention }}</view>
			</view>
		</view>
		<!-- 小额币种 -->
		<view class="forehead">
			<!-- 搜索 -->
			<view class="forehead-one">
				<image @tap="search" src="../../static/assert/search-icon.png"></image>
				<input v-model="searchId" class="input" type="text" value="" :placeholder="lang.search" />
			</view>
			<!-- 隐藏小额币种 -->
			<view class="forehead-two">
				<image v-show="smallitem" @click="small" src="../../static/assert/yincan.png" mode=""></image>
				<image v-show="smallOitn" @click="smallId" src="../../static/assert/yincang.png" mode=""></image>
				<span class="implicit">{{ lang.Hide }}</span>
			</view>
		</view>
		<!-- 没有数据时 -->
		<view v-if="Dateed.length == 0" class="There">
			<image src="../../static/assert/nodata-bg.png" mode=""></image>
			<view>{{ lang.record }}</view>
		</view>
		<!-- USDT -->
		<!-- 有数据时 -->
		<view class="coin-one" v-for="(item, index) in Dateed" :key="index">
			<view @tap="skip1(item.virtuaWalletName, item.availableAmount, item.freezeAmount, item.aaa, item.virtualWalletId)" class="coin-two">
				<view class="coin-code">{{ item.virtuaWalletName }}</view>
				<view class="coin-free"><image src="../../static/assert/arrow-right.png" mode=""></image></view>
			</view>
			<!-- 可用 -->
			<view class="available">
				<view style="flex:1.6">{{ lang.available }}</view>
				<view style="flex:2.4">{{ lang.freeze }}</view>
				<view style="flex:1">{{ lang.equivalent }}(CNY)</view>
			</view>
			<view class="details">
				<view style="flex:1.6">{{ item.availableAmount | numFilter }}</view>
				<view style="flex:2.4">{{ item.freezeAmount | numFilter }}</view>
				<view style="flex:1">{{ item.aaa | numFilter }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
import request from '@/utils/request';
import { getExchangeRateByCoinName } from '@/api/assert.js';
import { mapState, mapActions, mapGetters } from 'vuex';
var _self;
var canvaRing = null;
var canvaRingId = null;
export default {
	data() {
		return {
			num: 0,
			currencyNum: 0,
			totalCNY: '',
			totalBTC: '',
			searchId: '',
			availableAmount: '',
			virtuaWalletName: '',
			Dateed: [],
			isPopupVisible: false,
			smallitem: true,
			smallOitn: false,
			cWidth: '',
			cHeight: '',
			CNY: '',
			chartData: {
				series: [
					{
						name: '基石轮募资',
						data: 20,
						disableLegend: 'true'
					},
					{
						name: '挖矿奖励',
						data: 18,
						disableLegend: 'true'
					},
					{
						name: '基金会生态及社区建设',
						data: 8,
						disableLegend: 'true'
					},
					{
						name: '投票奖励',
						data: 10,
						disableLegend: 'true'
					}
				]
			},
			stateTab: true
		};
	},

	filters: {
		numFilter(value) {
			let transformVal = Number(value).toFixed(3);
			let realVal = transformVal.substring(0, transformVal.length - 1); // num.toFixed(3)获取的是字符串
			return Number(realVal);
		}
	},
	mounted() {
		// this.flags();
	},
	computed: {
		...mapState('user', ['userinfo']),
		...mapGetters(['islogin']),
		...mapState(['lang'])
	},
	components: {
		uCharts,
		uniLoadMore
	},
	created() {
		this.cWidth = uni.upx2px(390);
		this.cHeight = uni.upx2px(450);
		
		this.showRing();
		if (!this.islogin) {
			this.$nav('/pages/auth/login');
			console.log(111);
		} else {
			
			this.information();

			console.log(222);
		}
	},
 
	onLoad() {
		this.tateTab = true;
		this.aaa();
	},
	onShow() {
		if (this.stateTab) {
			this.information();
			this.tateTab = true;
		}
		this.tateTab = false;
		
	},

	onTabItemTap(e) {
		console.log(e);
		if (e.index == 3) {
			if (!this.islogin) {
				this.$nav('/pages/auth/login');
			} else {
				this.information();
			}
		}
	},

	methods: {
		...mapActions('assert', ['set_assertList']),
		// 语言
		aaa() {
			uni.setNavigationBarTitle({
				title: this.lang.Capital
			});
		},
		// flags() {
		// 	uni.getStorage({
		// 		key: 'flag',
		// 		success(e) {
		// 			console.log(e.data);
		// 			if (e.data) {
		// 				uni.navigateBack();
		// 				uni.setStorage({
		// 					key: 'flag',
		// 					data: false
		// 				});
		// 			}
		// 		}
		// 	});
		// },
		// 图表1
		showRing() {
			canvaRing = new uCharts({
				$this: this,
				canvasId: 'canvasColumn',
				type: 'ring',
				fontSize: 11,
				// legend: true,
				extra: {
					pie: {
						offsetAngle: -45,
						ringWidth: 20,
						labelWidth: 15
					}
				},
				background: '#5656E6',
				pixelRatio: 1,
				series: this.chartData.series,
				animation: true,
				width: this.cWidth,
				height: this.cHeight,
				disablePieStroke: true,
				dataLabel: false,
				title: {
					name: '持仓分布',
					color: '#FFFFFF',
					fontSize: 14,
					offsetY: 0
				}
			});
		},

		// 图表2
		showRingId() {
			canvaRingId = new uCharts({
				$this: this,
				canvasId: 'canvasId',
				type: 'ring',
				fontSize: 11,
				legend: true,
				extra: {
					pie: {
						offsetAngle: -45,
						ringWidth: 20,
						labelWidth: 15
					}
				},
				title: {
					name: '持仓分布',
					color: '#333333',
					fontSize: 14,
					offsetY: 0
				},
				background: '#FFFFFF',
				pixelRatio: 1,
				series: this.chartData.series,
				animation: true,
				width: this.cWidth,
				height: this.cHeight,
				disablePieStroke: true,
				dataLabel: false
			});
		},

		// 点击
		small() {
			(this.smallitem = false), (this.smallOitn = true);
		},
		smallId() {
			(this.smallitem = true), (this.smallOitn = false);
		},
		// 打开弹框
		bounced() {
			this.isPopupVisible = true;
			this.showRingId();
		},
		// 关闭
		bouncedDetic() {
			this.isPopupVisible = false;
		},
		// 跳转页面充币
		Chargemoney() {
			uni.navigateTo({
				url: '../coin/in/index'
			});
		},
		// 提币
		Mentionmoney() {
			uni.navigateTo({
				url: '../coin/out/index'
			});
		},
		skip1(num, num1, num2, num3, num4) {
			let that = this;
			uni.navigateTo({
				//里面是一个对象形式的参数
				url: './financial/financial?currency=' + num + '&frozen=' + num1 + '&activity=' + num2 + '&CNYId=' + num3 + '&WalletId=' + num4
			});
		},

		// 接口
		information() {
			// uni.hideNavigationBarLoading();
			request('/app/userVirtualWallet/userVirtualWallet', 'GET', {
				token: this.userinfo.token,
				// virtuaWalletName: this.searchId
			}).then(res => {
				if (res.data.code == 200) {
					// uni.stopPullDownRefresh();//得到数据后停止下拉刷新
					this.Dateed = res.data.data;
					this.set_assertList(this.Dateed);
					// uni.hideNavigationBarLoading();

					this.virtuaWalletName = res.data.data.virtualWalletId;

					for (let i = 0; i < res.data.data.length; i++) {
						var data = {
							childCoinName: res.data.data[i].virtuaWalletName,
							type: res.data.data[i].virtuaWalletType
						};
						var _self = this;
						getExchangeRateByCoinName(data).then(res => {
							if (res.data.code == 200) {
								_self.$set(_self.Dateed[i], 'aaa',"0");
								_self.Dateed[i].aaa = _self.Dateed[i].freezeAmount * res.data.data.coinRate
								// 
								_self.num += _self.Dateed[i].aaa;
								uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
							}
						});

						// currencyNum
						getExchangeRateByCoinName({
							childCoinName: 'BTC',
							type: '0'
						}).then(res => {
							if (res.data.code == 200) {
								// uni.hideNavigationBarLoading();
								// uni.stopPullDownRefresh();//得到数据后停止下拉刷新
								console.log(res.data.data.coinRate, 999);
								_self.currencyNum = (_self.num / res.data.data.coinRate).toFixed(3);
							}
						});
					}
				}
				try {
					this.Dateed = JSON.parse(res.data).data;
				} catch (e) {
					this.Dateed = res.data.data;
				}
			});
		},
		// 搜索
		// search() {
		// 	alert('11');
		// 	this.information();
		// }
	}
};
</script>

<style lang="scss" scoped>
#canvasColumn {
	transform: scale(0.6);
	margin-top: -100upx;
}
#canvasId {
	transform: scale(0.6);
	margin-top: -100upx;
	margin-left: -130upx;
}
.title {
	margin-left: 30upx;
	color: #8f8f94;
}

.account-header {
	padding: 0 15upx;
	box-sizing: border-box;
	position: relative;
	.account-header-bg {
		width: 100%;
		height: 305upx;
		border-radius: 10upx;
		overflow: hidden;
		image {
			width: 100%;
			height: 305upx;
		}
	}

	.account-money {
		position: absolute;
		left: 40upx;
		top: 59upx;
		display: flex;
		flex-direction: column;

		.account-money-one {
			font-size: 30upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
		}

		.account-money-two {
			max-width: 700upx;
			// overflow: hidden;
			display: flex;
			justify-content: space-between;
			height: 120upx;
			.money-two {
				font-size: 60upx;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				margin-top: 20upx;
			}

			.money-free {
				font-size: 30upx;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				margin-top: 50upx;
				margin-left: 20upx;
			}
		}

		.account-money-three {
			font-size: 26upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}
	}
}

// 充币
.Charge-money {
	display: flex;
	justify-content: space-around;

	.Charge image {
		width: 39upx;
		height: 36upx;
		margin-top: 34upx;
	}

	.filling {
		font-size: 24upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(45, 47, 86, 1);
	}
}

//小额币种
.forehead {
	height: 119upx;
	background: rgba(243, 243, 243, 1);
	display: flex;
	justify-content: space-between;
	padding: 0 30upx;
	margin-top: 29upx;
	align-items: center;

	.forehead-one {
		.input {
			width: 270upx;
			height: 62upx;
			border: 2upx solid rgba(195, 195, 195, 1);
			border-radius: 8upx;
			padding-left: 60upx;
			position: relative;
		}

		image {
			width: 29upx;
			height: 32upx;
			position: absolute;
			display: flex;
			margin-left: 20upx;
			margin-top: 18upx;
			z-index: 99999;
		}
	}

	// 小额
	.forehead-two {
		width: 270upx;
		height: 62upx;

		image {
			width: 30upx;
			height: 30upx;
		}

		.implicit {
			font-size: 32upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: #8c979d;
			margin-left: 20upx;
		}
	}
}

// 没有数据时
.There image {
	width: 379upx;
	height: 311upx;
	padding-top: 91upx;
	display: flex;
	margin: 0 auto;
}

.There view {
	font-size: 30upx;
	font-family: PingFang-SC-Regular;
	font-weight: 400;
	color: rgba(140, 151, 157, 1);
	text-align: center;
	margin-top: 68upx;
}

// USDT
.coin-one {
	height: 100%;
	padding-top: 40upx;
	padding: 0 30upx;
	border-bottom: 2upx solid #f1f1f1;

	.coin-two {
		display: flex;
		justify-content: space-between;

		.coin-code {
			font-size: 36upx;
			font-family: PingFang-SC-Bold;
			font-weight: bold;
			color: rgba(104, 129, 255, 1);
			margin-top: 39upx;
		}

		.coin-free image {
			width: 30upx;
			height: 40upx;
			margin-top: 49upx;
		}
	}

	// 可用
	.available {
		font-size: 26upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(192, 192, 192, 1);
		display: flex;
	}

	.details {
		font-size: 28upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(45, 47, 86, 1);
		display: flex;
	}
}

// 弹框
//   弹框
.modal {
	display: block;
	/* 默认隐藏 */
	/*生成绝对定位的元素，相对于浏览器窗口进行定位。*/
	position: fixed;
	z-index: 999;
	left: 0;
	top: 0;
	/*设置弹窗位置*/
	padding-top: 50%;
	padding-bottom: 100upx;
	/*浮在全屏上*/
	width: 100%;
	height: 100%;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
	text-align: center;

	.model-image image {
		width: 50upx;
		height: 50upx;
		margin-top: 30upx;
	}
}

/* 弹窗内容 */

.modal-content {
	/*弹窗背景色设置*/
	background-color: #fefefe;
	margin: auto;
	width: 90%;
	height: 580upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 20upx;
	padding-top: 60upx;

	// 图表
	.model-one {
		width: 226upx;
		height: 226upx;
		margin: 0upx auto;
		border-radius: 50%;
	}

	.model-free {
		display: flex;
		justify-content: space-between;
		padding: 0 27upx;

		.moder-two {
			width: 286upx;
			height: 66upx;
			border: 2upx solid rgba(241, 241, 241, 1);
			border-radius: 5upx;
			margin-top: 60upx;
			display: flex;
			align-items: center;

			& > view:nth-child(1) {
				width: 20upx;
				height: 20upx;
				background: rgba(86, 86, 230, 1);
				margin-left: 22upx;
			}

			& > view:nth-child(2) {
				font-size: 28px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(86, 86, 230, 1);
				margin-left: 15upx;
			}

			& > view:nth-child(3) {
				font-size: 28px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(86, 86, 230, 1);
				margin-left: 29upx;
			}
		}
	}

	.model-fix {
		display: flex;
		justify-content: space-between;
		padding: 0 27upx;

		.moder-two {
			width: 286upx;
			height: 66upx;
			border: 2upx solid rgba(241, 241, 241, 1);
			border-radius: 5upx;
			margin-top: 60upx;
			display: flex;
			align-items: center;

			& > view:nth-child(1) {
				width: 20upx;
				height: 20upx;
				background: rgba(86, 86, 230, 1);
				margin-left: 22upx;
			}

			& > view:nth-child(2) {
				font-size: 28px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(86, 86, 230, 1);
				margin-left: 15upx;
			}

			& > view:nth-child(3) {
				font-size: 28px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(86, 86, 230, 1);
				margin-left: 29upx;
			}
		}
	}
}
</style>
