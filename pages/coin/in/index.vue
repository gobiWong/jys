<template>
	<view>
		<!-- <my-head title="充币">
			<template slot="right">
				<image @tap="gomoney" src="/static/assert/recording.png" class="recording-icon"></image>
			</template>
		</my-head> -->
		<statusBar></statusBar>
		<view class="header">
			<!-- head left -->
			<view>
				<image @tap="onreturn" src="../../../static/assert/fanhui.png" class="drawer-icon"></image>
			</view>
			<view>
				<text class="symbol-text">{{ symbol }}</text>
			</view>
			<!-- head right -->
			<view>
				<image @tap="gomoney(1,fullcoin,currency)" src="/static/assert/recording.png" class="recording-icon"></image>
			</view>
		</view>
		<view class="page">
			<view class="select-coin-cell">
				<view class="unselect-text">选择币种</view>
				<view v-show="coinInfo.name" class="coin-info">
					<text class="coin-name">{{ coinInfo.name }}</text>
					<text class="coin-fullname">{{ coinInfo.fullid }}</text>
				</view>
				<image src="/static/assert/more-icon.png" class="more-icon"></image>
			</view>
			<view>
				<scroll-view scroll-x>
					<view v-for="item in Money" :key="item.index" @tap="selectCoin(item.virtualWalletName, item.id, item.virtualWalletPublicAddress,item.imgUrl)" class="coin-names">
						{{ item.virtualWalletName }}
					</view>
				</scroll-view>
			</view>
			<view v-show="MoneyItem">
				<view class="coin-addr">
					<!-- <tki-qrcode ref="qrcode" :val="coinInfo.addr" :onval="true" :showLoading="false" :size="363" /> -->
                    <img :src="coinInfo.imgUrl" class="imgUrl" alt="">
					<view>
						<text class="coin-help-text">充币地址</text>
						<image src="/static/assert/help-icon.png" class="coin-help"></image>
					</view>
					<view class="addr-container">{{ coinInfo.addr }}</view>
				</view>
				<button @tap="onCopyResult" class="copy-button">复制地址</button>
			</view>			
		</view>
	</view>
</template>

<script>
import {toast} from '@/utils/toast';
import request from '@/utils/request';
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
export default {
	data() {
		return {
			Money: [],
			MoneyItem: false,
			coinInfo: {},
			symbol:'充币',
			fullcoin:"",
			currency:"",
			
		};
	},
	watch: {
		coinInfo() {
	
			// uni.showLoading({
			// 	mask: true,
			// 	title: '二维码加载中..'
			// });
		}
	},
	created() {
		this.MoneyId();
	},
	methods: {
		// 返回上一级
		onreturn() {
		     uni.navigateBack({
		         delta: 1
		     })
		   },
		// 记录
		gomoney(num,num1,num2) {
			uni.navigateTo({
				url: '../order?typeIndex='+num +'&fullName='+num1 + '&currency='+num2
			});
		},

		selectCoin(num, num1, num2,num3) {
			//快捷选择币种
			this.MoneyItem = true;
			this.coinInfo = {
				name: num,
				fullid: num1,
				addr: num2,
                imgUrl:num3
			};
		},
		// 点击复制
		onCopyResult() {
			
			// #ifdef APP-PLUS
				let _self=this;
				uni.setClipboardData({
				    data: _self.coinInfo.addr,
				    success: function () {
				        console.log('success');
                        toast('复制成功');
				    }
				});
			// #endif
			
			// #ifndef APP-PLUS
				toast('当前功能不支持H5环境,请在手机上运行');
			// #endif
			
		},
		

		// 接口
		MoneyId() {
			request('/coinTrade/listVirtualWallet', 'POST', {})
				.then(res => {
				
					if (res.data.code == 200) {
						this.Money = res.data.data;
					}
					for(var i =0 ; i< this.Money.length;i++){
						
							this.fullcoin = this.Money[i].fullName
							console.log(this.fullcoin,888)
							this.currency = this.Money[i].imgUrl
							
						
					}
					try {
						this.Money = JSON.parse(res.data).data;
					} catch (e) {
						this.Money = res.data.data;
						//TODO handle the exception
					}
					
				})
		
		},
	
	},
	components: {
		tkiQrcode
	}
};
</script>

<style lang="scss" scoped>
	.header>view {
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
.recording-icon {
	width: 43upx;
	height: 40upx;
	vertical-align: middle;
}

.more-icon {
	width: 19upx;
	height: 34upx;
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
    border-bottom:1upx solid #F0F0F0;
	.unselect-text {
		font-size: 26px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(186, 197, 203, 1);
	}
}
.imgUrl {
    width: 60%;
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

.coin-info {
	margin-left: -300upx;
}

.coin-addr {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 80upx;

	.coin-help {
		width: 24upx;
		height: 24upx;
		margin-left: 11upx;
		vertical-align: middle;
	}

	.coin-help-text {
		display: inline-block;
		margin-top: 79upx;
		font-size: 24upx;
		line-height: 24upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(45, 47, 86, 1);
	}

	.addr-container {
		margin: 0 30upx;
		width: calc(100% - 60upx);
		text-align: center;
		background: rgba(247, 247, 251, 1);
		border-radius: 10upx;
		font-size: 24upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(45, 47, 86, 1);
		margin-top: 12upx;
	}
}

.copy-button {
	margin-top: 52upx;
	width: 260upx;
	height: 80upx;
	line-height: 80upx;
	background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
	border-radius: 10upx;
	font-size: 32upx;
	font-family: PingFang-SC-Regular;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
}
</style>
