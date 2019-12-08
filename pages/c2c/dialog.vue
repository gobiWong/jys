<template>
	<view class="dialog-body" v-show="show" @tap="close">
		<!-- 内容部分 遮罩以:after的形式表现 -->
		<view class="dialog-conte" @tap.stop="'void(o)'">
			<view class="dialog-thead">
				<view class="dialog-thead--left">
					<view>购买 BTC</view>
					<view class="">
						<text>单价</text>
						<text>￥82100.00</text>
					</view>
				</view>
				<view class="dialog-thead--right">
					<image src="/static/assert/btc-icon.png" class="coin-picture"></image>
				</view>
			</view>

			<view class="dialog-tbody">
				<view>
					<!-- tabs 切换 -->
					<view class="tabs">
						<text :class="{activetabs:tabsIndex==0}" @tap="tabsIndex=0">按价格购买</text>
						<text :class="{activetabs:tabsIndex==1}" @tap="tabsIndex=1">按数量购买</text>
					</view>
					<!-- 输入部分 -->
					<view class="dialog-input-cell">
						<view class="dialog-input"><input type="digit" placeholder-class="placeholder-class" class="input " placeholder="请输入购买金额" /></view>
						<view class="input-label">
							<text>CNY</text>
							<text>全部买入</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 数量价格显示及操作按钮 -->
			<view class="dialog-tfoot">
				<view class="transaction-num">
					<text>交易数量0.00000 BTC</text>
				</view>
				<view class="transaction-amount">
					<text>交易总额</text>
					<text>￥ 0.00</text>
				</view>
				<view class="order-option-cell">
					<button>30S自动取消</button>
					<button  @tap="go('./pay')">下单</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabsIndex: 0,
				show:false,
			}
		},
		props:{
			
		},
		methods:{
			open(){
				this.show=true;
				uni.hideTabBar();
			},
			close(){
				this.show=false;
				uni.showTabBar();
			},
			go(url) {
				uni.navigateTo({
					url: url
				});
			},
		}
	}
</script>

<style lang="scss">
	.dialog-body {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;

	}

	.dialog-body:after {
		content: ' ';
		background-color: rgba(0, 0, 0, 0.4);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 101
	}

	.dialog-conte {
		height: 650upx;
		position: absolute;
		bottom: 0;
		width: 100%;
		z-index: 102;
		background-color: #FFFFFF;
	}

	.coin-picture {
		width: 60upx;
		height: 60upx;
	}

	.dialog-thead {
		width: 100%;
		height: 144upx;
		background: rgba(247, 247, 251, 1);
		border-radius: 20upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30upx;
		box-sizing: border-box;

		.dialog-thead--left {
			&>view:first-child {
				font-size: 36upx;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(45, 47, 86, 1);
			}

			&>view:last-child {

				&>text:first-child {
					font-size: 26upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}

				&>text:last-child {
					font-size: 26upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(104, 129, 255, 1);
				}
			}
		}
	}

	.dialog-tbody {
		padding: 0 30upx;
		box-sizing: border-box;

		.tabs {

			height: 65upx;
			margin-top: 28upx;
			font-size: 0;

			text {
				display: inline-block;
				width: 200upx;
				height: 100%;
				background-color: #F7F7FB;
				border-radius: 10px;
				line-height: 67upx;
				text-align: center;
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: #BAC5CB;
				padding: 1px;
				vertical-align: middle;
			}

			text.activetabs {
				padding: 0;
				height: 65upx;
				line-height: 67upx;
				background: rgba(255, 255, 255, 1);
				border: 1px solid #6881FF;
				border-radius: 10upx;
				position: relative;

				color: #6881FF;


			}
		}

		.dialog-input-cell {
			border: 1px solid rgba(230, 230, 230, 1);
			border-radius: 10upx;
			display: flex;
			margin-top: 33upx;
			height: 80upx;
			align-items: center;

			.dialog-input {
				flex: 1;

				padding-left: 20upx;
				box-sizing: border-box;
			}

			.input-label {
				width: 250upx;
				padding-left: 20upx;
				box-sizing: border-box;
				text-align: center;

				text {
					vertical-align: middle;
					position: relative;
				}

				&>text:first-child {
					font-size: 26upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(45, 47, 86, 1);
					margin-right: 19upx;
				}

				&>text:first-child::after {
					content: ' ';
					position: absolute;
					right: -20upx;
					top: 4upx;
					width: 3upx;
					height: 30upx;
					background: rgba(247, 247, 251, 1);
				}

				&>text:last-child {
					font-size: 26upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(104, 129, 255, 1);
					margin-left: 19upx;
				}
			}
		}
	}

	.dialog-tfoot {
		padding: 0 30upx;
		margin-top: 60upx;

		.transaction-num {
			text-align: right;
			font-size: 22upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(140, 151, 157, 1);
		}

		.transaction-amount {
			display: flex;
			justify-content: space-between;

			&>text:first-child {
				font-size: 26upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(140, 151, 157, 1);
			}

			&>text:last-child {
				font-size: 36upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(104, 129, 255, 1);
			}
		}

		.order-option-cell {
			display: flex;
			justify-content: space-between;
			margin-top: 20upx;
			button {
				border: 0;
				font-size: 26upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				border-radius: 5upx;
				width: 300upx;
				height: 80upx;
				line-height: 80upx;
				margin: 0;
			}

			&>button:first-child {
				background: linear-gradient(-90deg, rgba(130, 133, 174, 1), rgba(152, 156, 208, 1));
				
			}
			&>button:last-child {
				background:linear-gradient(-90deg,rgba(197,207,213,1),rgba(218,228,233,1));
				
			}
		}
	}
</style>
