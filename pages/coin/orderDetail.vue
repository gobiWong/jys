<template>
	<view class="page-body" :style="{ height: winHieght }">
		<view class="top">
			<statusBar></statusBar>
			<view class="head">
				<image @tap="orderRd" src="/static/img/back-icon-white.png" class="back-icon"></image>
				<text>记录详情</text>
				<text></text>
			</view>
			<view class="coin-card">
				<view>
					<!-- <view class="coin-icon">{{ this.browser.virtualWalletId }}</view> -->
					<!-- <view class="coin-name">{{ this.browser.typeDesc }}</view>
					<view class="coin-fullname">{{ this.browser.virtualWalletName }}</view> -->
				</view>
			</view>
		</view>
		<!-- 记录详情信息 -->
		<view class="detail-card">
			<view class="detail-container">
				<view class="head">
					<view>
						<text>数量</text>
						<text>{{ this.browser.virtualWalletWithdrawNumber }}</text>
					</view>
					<view>
						<text>状态</text>
						<text>{{ this.browser.tradeStatusDesc }}</text>
					</view>
					<!-- <view>
						<text>区块确认数</text>
						<text>2</text>
					</view> -->
				</view>
				<view class="main">
					<view>
						<text>地址</text>
						<text class="addr">{{ this.browser.virtualWalletWithdrawAddress }}</text>
					</view>
					<view>
						<text>Txid</text>
						<view class="Txid-container">
							<text class="Txid">{{ this.browser.txHash }}</text>
							<text class="copybtn" @tap="onCopyResult">复制Txid</text>
						</view>
					</view>
					<view>
						<text>时间</text>
						<text>{{ this.browser.createTime }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="button-fixed"><button @tap="onCopyRes">查看区块浏览器</button></view>
	</view>
</template>

<script>
import { toast } from '@/utils/toast';
import request from '@/utils/request';
import { mapState, mapActions } from 'vuex';

export default {
	data() {
		return {
			uuid: '', //接收的id
			browser: [],
			fullName: '',
			currency: '',
			option: '',
			name: ''
		};
	},
	onLoad(options) {
		this.uuid = options.id;
		this.orderId();
		// debugger
		// uni.getStorage({
		// 	key:'uuid',
		// 	success(e){
		// 		this.uuid = JSON.parse(e.data)
		// 		console.log(this.uuid,987)
		// 	}
		// })
	},
	methods: {
		winHieght() {
			return uni.getSystemInfoSync().windowHeight + 'px';
		},
		// 订单详情
		orderId() {
			request('/coinTrade/showDetail', 'POST', {
				token: this.userinfo.token, //用户token
				id: this.uuid //订单id
			}).then(res => {
				if (res.data.code == 200) {
					this.browser = res.data.data;
				}
				// try {
				// 	this.browser = JSON.parse(res.data).data;
				// } catch (e) {
				// 	//TODO handle the exception
				// 	this.browser = res.data.data;
				// }
			});
		},
		orderRd() {
			let that = this;
			uni.navigateBack({
				delta: 1
			});
		},
		// 点击复制
		onCopyResult() {
			// #ifdef APP-PLUS
			let _self = this;
			uni.setClipboardData({
				data: _self.txHash,
				success: function() {
					console.log('success');
					toast('复制成功');
				}
			});
			// #endif

			// #ifndef APP-PLUS
			toast('当前功能不支持H5环境,请在手机上运行');
			// #endif
		},
		// 跳链接
		onCopyRes() {
			uni.navigateTo({
				url: './new_file'
			});
		}
	},
	computed: {
		...mapState('user', ['userinfo'])
	}
};
</script>

<style scoped lang="scss">
uni-page-body {
	min-height: 100%;
}
.page-body {
	background-color: #f7f7fd;
}
.top {
	background: linear-gradient(232deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
	height: 500px;

	.head {
		height: 96upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
		font-size: 30px;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);

		.back-icon {
			width: 17px;
			height: 30px;
		}
	}

	.coin-card {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 60upx;

		.coin-icon {
			width: 82upx;
			height: 82upx;
			vertical-align: middle;
			margin-right: 30px;
		}

		.coin-name {
			font-size: 30px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}

		.coin-fullname {
			font-size: 24px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
		}
	}
}

.detail-card {
	height: 725upx;
	width: 713upx;
	margin: 0 auto;
	margin-top: -170upx;
	background: url('/static/assert/orderDetail-bg.png') no-repeat;
	background-size: 100%;

	.detail-container {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		padding: 47upx 46upx 52upx 65upx;

		.head,
		.main {
			& > view {
				display: flex;
				justify-content: space-between;

				& > text:first-child {
					font-size: 26px;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(186, 197, 203, 1);
				}

				& > text:last-child {
					font-size: 26px;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(45, 47, 86, 1);
				}
			}
		}

		.head {
			position: relative;

			& > view {
				margin-bottom: 42upx;
				line-height: 26upx;
			}
		}

		.head:after {
			position: absolute;
			bottom: -50upx;
			content: ' ';
			height: 4upx;
			width: calc(100% - 40upx);
			left: 20upx;
			border-bottom: 4px dashed rgba(240, 240, 240, 1);
		}

		.main {
			overflow: hidden;

			& > view {
				margin-top: 36upx;
			}

			.addr {
				max-width: 387upx;
				word-break: break-all;
				text-align: right;
			}

			.Txid-container {
				display: flex;
				flex-direction: column;
				align-items: flex-end;

				.Txid {
					max-width: 483upx;
					word-break: break-all;
					text-align: right;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.copybtn {
					width: 108px;
					height: 40px;
					line-height: 40upx;
					text-align: center;
					background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
					border-radius: 10px;
					font-size: 22px;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					padding: 0 6upx;
					margin-top: 5upx;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
	}
}

.button-fixed {
	position: fixed;
	bottom: 63upx;
	width: 100%;
	padding: 0 30upx;
	box-sizing: border-box;
	button {
		height: 80px;
		line-height: 80upx;
		background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
		border-radius: 10px;
		font-size: 26px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
	}
}
</style>
