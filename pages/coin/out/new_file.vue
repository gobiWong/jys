<template>
	<view class="">
		<!-- 	<my-head title='提币'>
			<template slot='right'>
				<image @click="gomoney" src="/static/assert/recording.png" class='recording-icon'></image>
			</template>
		</my-head> -->
		<statusBar></statusBar>
		<view class="header">
			<!-- head left -->
			<view><image @tap="onreturn" src="../../../static/assert/fanhui.png" class="drawer-icon"></image></view>
			<view>
				<text class="symbol-text">{{ symbol }}</text>
			</view>
			<!-- head right -->
			<view><image @tap="gomoney(2, coinInfo.quanming, coinInfo.bannerUrl)" src="/static/assert/recording.png" class="recording-icon"></image></view>
		</view>
		<view class="">
			<view class="select-coin-cell">
				<view class="unselect-text">选择币种</view>
				<view v-show="coinInfo.name" class="coin-info">
					<!-- 缩写 -->
					<text class="coin-name">{{ coinInfo.name }}-</text>
					<!-- id -->
					<text v-show="!false" class="coin-name">{{ coinInfo.fullname }}-</text>
					<!-- 全拼 -->
					<text v-show="!false" class="coin-name">{{ coinInfo.quanming }}</text>
				</view>
				<image src="/static/assert/more-icon.png" class="more-icon"></image>
			</view>
			<!-- 未选择状态 -->
			<view v-show="!MoneyItem">
				<scroll-view scroll-x>
					<view v-for="(item, index) in Money" :key="index" @tap="selectCoin(item.id)" class="coin-names">{{ item ? item.virtualWalletName : '暂无数据' }}</view>
				</scroll-view>
			</view>
			<!-- 已选择状态 -->
			<view v-show="MoneyItem">
				<view class="coin-in-card">
					<!-- 提币账户 内部转账时  提币地址 普通提币-->
					<view class="coin-in-cell">
						<view class="lable-container">
							<label>提币地址</label>
							<image src="/static/assert/help-icon.png" class="help-icon"></image>
						</view>
						<view class="coin-inputs">
							<input v-model="address" type="text" class="input" placeholder-class="placeholder-class" placeholder="输入或长按粘贴地址" />
							<image src="/static/assert/scan-icon.png" class="scan-icon"></image>
						</view>
					</view>
					<!-- 地址备注 -->
					<view class="coin-in-cell">
						<view class="lable-container"><label>地址备注</label></view>
						<view class="coin-inputs">
							<input v-model="remark" type="text" class="input" placeholder-class="placeholder-class" placeholder="输入备注信息" />
							<image src="/static/assert/edit-icon.png" class="edit-icon"></image>
						</view>
					</view>
					<!-- 提币数量 -->
					<view class="coin-in-cell">
						<view class="lable-container"><label>提币数量</label></view>
						<view class="coin-inputs">
							<input v-model="coinNumber" type="text" class="input" placeholder-class="placeholder-class" placeholder="最低提币1个" />
							<text class="fill-all" @tap="extract">提取全部</text>
						</view>
						<text class="input-tip">
							当前可提{{ this.WalletList.virtualWallet ? this.WalletList.virtualWallet.allowCount : '暂无数据' }}

							{{ this.WalletList.virtualWallet ? this.WalletList.virtualWallet.virtualWalletName : '暂无数据' }}
						</text>
					</view>
					<!-- 网络手续费 -->
					<view class="os-fee">
						<view>网络手续费</view>
						<view>
							{{ this.WalletList.virtualWallet ? this.WalletList.virtualWallet.withdrawHandlingFee : '暂无数据' }}

							{{ this.WalletList.virtualWallet ? this.WalletList.virtualWallet.virtualWalletName : '暂无数据' }}
						</view>
					</view>
				</view>
				<view class="coin-in-tips">
					<view>提币须知</view>
					<view>1、支持金额：{{ this.WalletList.userVirtualWallet ? this.WalletList.userVirtualWallet.availableAmount : '暂无数据' }}</view>
					<view>
						2、提币额度： {{ this.WalletList.virtualWallet ? this.WalletList.virtualWallet.withdrawMin : '暂无数据' }}——
						{{ this.WalletList.virtualWallet ? this.WalletList.virtualWallet.withdrawMax : '暂无数据' }}
					</view>
					<view>3、提币手续费：{{ this.WalletList.virtualWallet ? this.WalletList.virtualWallet.withdrawHandlingFee : '暂无数据' }}</view>
				</view>
				<view class="coin-button"><button @tap="ForWithdraw(2, coinInfo.name, coinInfo.quanming, coinInfo.bannerUrl)">提交</button></view>
			</view>
		</view>
	</view>
</template>

<script>
import { toast } from '@/utils/toast';
import { mapState, mapActions } from 'vuex';
import request from '@/utils/request';
export default {
	data() {
		return {
			symbol: '提币',
			typeIndex: 0,
			coinInfo: {},
			WalletList: {}, //详情数据对象
			paddingTop: 0,
			Money: [],
			MoneyItem: false,
			coinNumber: '', //提币数量
			address: '',
			remark: '',
			availableAmount: '', //可用
			withdrawHandlingFee: '',
			withdrawMin: '', //最少
			withdrawMax: '', //最多
			virtualWalletName: '',
			fullcoin: '',
			currency: ''
		};
	},
	onLoad() {
		this.MoneyItem = false;
	},
	created() {
		this.MoneyId();
	},
	computed: {
		...mapState('user', ['userinfo'])
	},

	methods: {
		onreturn() {
			uni.navigateBack({
				delta: 1
			});
		},
		// 提取全部
		extract() {
			let that = this;
			that.coinNumber = that.availableAmount - that.withdrawHandlingFee;
		},
		// 记录
		gomoney(num, num1, num2) {
			// console.log(num.toString(),num1,num2,987654)
			// uni.setStorage({
			// key:'msg',
			// data:JSON.stringify({
			// 	typeIndex:num,
			// 	fullName:num1,
			// 	currency:num2
			// })
			// })

			// 这里转换成 字符串
			// this.num1 = JSON.parse(this.num1);
			// this.num2 = JSON.parse(this.num2);
			uni.navigateTo({
				url: '../order?typeIndex=' + num + '&fullName=' + num1 + '&currency=' + num2
				// url: '../order'
			});
		},
		//获取币种id
		selectCoin(id) {
			//快捷选择币种

			var _that = this;
			_that.MoneyItem = !_that.MoneyItem;
			console.log(id, '222222222311111111111111111111111');
			let virtualWalletId = id;
			request('/coinTrade/getUserVirtualWalletInfo', 'POST', {
				token: this.userinfo.token,
				virtualWalletId: virtualWalletId
			}).then(res => {
				this.$nextTick(function() {
					// 此时已经渲染完成
				});
				if (res.data.code == 200) {
					console.log(res, '999999999999999999');
					_that.WalletList = { ...res.data.data };
					console.log(_that.WalletList);
					// this.availableAmount = res.data.data.userVirtualWallet.availableAmount;
					// this.withdrawHandlingFee = res.data.data.virtualWallet.withdrawHandlingFee;
					// this.withdrawMin = res.data.data.virtualWallet.withdrawMin;
					// this.withdrawMax = res.data.data.virtualWallet.withdrawMax;
				}
				// try {
				// 	this.availableAmount = JSON.parse(res.data).data.userVirtualWallet.availableAmount;
				// 	this.withdrawHandlingFee = JSON.parse(res.data).data.virtualWallet.withdrawHandlingFee;
				// 	this.withdrawMin = JSON.parse(res.data).data.virtualWallet.withdrawMin;
				// 	this.withdrawMax = JSON.parse(res.data).data.virtualWallet.withdrawMax;
				// } catch (e) {
				// 	//TODO handle the exception
				// 	this.availableAmount = res.data.data.userVirtualWallet.availableAmount;
				// 	this.withdrawHandlingFee = res.data.data.virtualWallet.withdrawHandlingFee;
				// 	this.withdrawMin = res.data.data.virtualWallet.withdrawMin;
				// 	this.withdrawMax = res.data.data.virtualWallet.withdrawMax;
				// }
			});
		},
		// 接口
		MoneyId() {
			var that = this;
			request('/coinTrade/listVirtualWallet', 'POST', {}).then(res => {
				if (res.data.code == 200) {
					that.Money = res.data.data;
					console.log(res.data.data, '2255555555555555555555');
				}
				// for (var i = 0; i < this.Money.length; i++) {
				// 	this.fullcoin = this.Money[i].fullName;
				// 	console.log(this.fullcoin, 888);
				// 	this.currency = this.Money[i].imgUrl;
				// }
				// try {
				// 	this.Money = JSON.parse(res.data).data;
				// } catch (e) {
				// 	//TODO handle the exception
				// 	this.Money = res.data.data;
				// }
			});
		},

		// 提币：发出提币申请
		ForWithdraw(num, num1, num2, num3) {
			console.log(num, num1, num2, num3, '22222222222');
			if (this.address == '') {
				toast('请输入提币地址');
			} else if (this.remark == '') {
				toast('请输入备注信息');
			} else if (this.coinNumber == '') {
				toast('请输入提币数量');
			} else {
				request('/coinTrade/askForWithdraw', 'POST', {
					token: this.userinfo.token,
					virtualWalletId: this.coinInfo.fullname,
					coinNumber: this.coinNumber,
					toAddress: this.address,
					remark: this.remark
				}).then(res => {
					if (res.data.code == 200) {
						toast(res.data.msg);
						this.coinNumber = this.address = this.remark = '';

						uni.navigateTo({
							url: './results?typeIndex=' + num + '&fullName=' + num2 + '&currency=' + num3
							// url: './results'
						});
					}
				});
			}
		}
	},
	mounted() {}
};
</script>

<style lang="scss" scoped>
.header > view {
	display: flex;
	align-items: center;
}

.header {
	display: flex;
	height: 90upx;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 0 30upx;
	box-sizing: border-box;
	// margin-top: 30upx;
	box-shadow: rgba(53, 48, 15, 0.07) 0px 3px 8px 0px;

	.drawer-icon {
		width: 16upx;
		height: 30upx;
	}

	.symbol-text {
		text-align: center;
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(45, 47, 86, 1);
	}

	.more-icon {
		width: 33upx;
		height: 32upx;
	}
}
.tabs {
	height: 51upx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 17upx;
	overflow: hidden;
	width: 100%;

	& > text {
		width: 233px;
		height: 51px;
		line-height: 51upx;
		background: #f7f7fb;
		text-align: center;
		border-radius: 5px;
		font-size: 28px;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}

	& > text.actived {
		border: 1px solid rgba(104, 129, 255, 1);
		color: rgba(104, 129, 255, 1);
		line-height: 49upx;
		box-sizing: border-box;
	}
}

.recording-icon {
	width: 43upx;
	height: 40upx;
	vertical-align: middle;
}

.select-coin-cell {
	padding: 0 30upx;
	display: flex;
	justify-content: space-between;
	height: 40upx;
	margin-top: 32upx;
	align-items: center;
	position: relative;
	padding-bottom: 13upx;

	.unselect-text {
		font-size: 26px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(186, 197, 203, 1);
	}
}

.coin-info {
	margin-left: -300upx;

	.coin-name {
		font-size: 26upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(45, 47, 86, 1);
	}

	.coin-fullname {
		font-size: 26upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(186, 197, 203, 1);
		margin-left: 28upx;
	}
}

.select-coin-cell::after {
	content: ' ';
	position: absolute;
	bottom: 0;
	left: 30upx;
	height: 2px;
	width: calc(100% - 60upx);
	background-color: #f0f0f0;
}

.more-icon {
	width: 19upx;
	height: 34upx;
}

.coin-names {
	width: 16%;
	height: 100%;
	font-size: 26upx;
	font-family: PingFang-SC-Medium;
	font-weight: 500;
	color: rgba(104, 129, 255, 1);
	margin-top: 25upx;
	display: inline-block;
	text-align: center;
}

.coin-in-card {
	// height: 761px;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 2px 18px 0px rgba(64, 64, 112, 0.1);
	border-radius: 10px;
	margin: 0 30px;
	padding: 0 48upx 51upx;
	margin-top: 26upx;

	.coin-in-cell {
		overflow: hidden;

		label {
			font-size: 28px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(45, 47, 86, 1);
		}

		.lable-container {
			display: flex;
			align-items: center;
			height: 30upx;
			margin-top: 34px;
		}

		.edit-icon {
			width: 33upx;
			height: 33upx;
		}

		.scan-icon {
			width: 33upx;
			height: 33upx;
		}

		.fill-all {
			font-size: 26upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(104, 129, 255, 1);
		}

		.help-icon {
			margin-left: 20upx;
			width: 24upx;
			height: 24upx;
		}

		.coin-inputs {
			margin-top: 16px;
			display: flex;

			height: 70upx;
			align-items: center;
			border-bottom: 1px solid #f0f0fa;

			input {
				flex: 1;
			}
		}

		.input-tip {
			font-size: 22px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(140, 151, 157, 1);
		}
	}

	.os-fee {
		& > view:first-child {
			font-size: 28px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(45, 47, 86, 1);
			margin-top: 30upx;
		}

		& > view:last-child {
			font-size: 26px;
			font-family: PingFang-SC-Bold;
			font-weight: bold;
			color: rgba(45, 47, 86, 1);
		}
	}
}

.coin-in-tips {
	margin-top: 20upx;
	padding-bottom: 130upx;

	view {
		font-size: 20px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(157, 171, 179, 1);
		line-height: 30px;
		padding-left: 81upx;
	}
}

.coin-button {
	padding: 0 30upx;
	box-sizing: border-box;
	position: fixed;
	transform: translateZ(0);
	bottom: 20upx;
	width: 100%;

	button {
		height: 80px;
		line-height: 80upx;
		background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
		border-radius: 10px;
		font-size: 32px;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
}
</style>
