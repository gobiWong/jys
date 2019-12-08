<template>
	<view class="pmain">

		<view class="item pamain-thead"> 
			<text class="price">{{lang.pricerr}}</text>
			<view style="display: inline-flex;align-items: center;justify-content: center;min-width:100upx" @tap="showactions">
				<text style="text-align: center;font-size: 23upx;">{{depthText}}</text>
				<image src="/static/assert/arrLeft-fill.png" mode="" style="width:16upx ;height: 8upx;"></image>
			</view>

			<text class="num">{{lang.numberr}}</text>
		</view>

		<view class="item uni-down" v-for="(item,index) in bidsList" :key="index+100" v-if="defaultIndex!=1">
			<text class="price">{{item[0]}}</text>
			<text class="num">{{item[1]}}</text>
			<!-- <view class="bg buybg" :style="{width: item[2]+'%'}"></view> -->
		</view>
		<view class="current-price">
			<view class="uni-h5 uni-bold uni-up usdt">{{price}}</view>
			<view class="uni-h7 cny uni-text-gray">≈{{cnyPirce}} CNY</view>
		</view>
		<view class="item uni-up" v-for="(item,index) in asksList" :key='index' v-if="defaultIndex!=2">
			<text class="price">{{item[0]}}</text>
			<text class="num">{{item[1]}}</text>
			<!-- <view class="bg sellbg" :style="{width: item[2]+'%'}"></view> -->
		</view>

		<view class="tabs-pan">
			<text :class="{actived:defaultIndex==0}" @tap="panChange(0)">{{lang.defaul}}</text>
			<text :class="{actived:defaultIndex==1,}" @tap="panChange(1)" :style="{color:defaultIndex==1? '#4CDFB0':''}">{{lang.buying}}</text>
			<text :class="{actived:defaultIndex==2}" :style="{color:defaultIndex==2? '#d14b64':''}" @tap="panChange(2)">{{lang.selling}}</text>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import {getDepthByTwoCoins,DataByTwoCoinName} from '@/api/assert'
	export default {
		props: {
			item: Object
		},
		data() {
			return {
				popoverVisible: false,
				depthValue: 'step0',

				asks: [],
				bids: [],
				depthLength: 5,
				defaultIndex: 0,

				price: '',
				cnyPirce: ''
			}
		},
		props: ['childCoinName',
			'motherCoinName'
		],

		created() {
			this.getData();
			this.getCyn();
			setInterval(() => {
				this.getData();
				this.getCyn();
			}, 3000)

		},
		computed: {
			...mapState(['lang']),
			depthText() {
				let str = ''
				switch (this.depthValue) {
					case 'step0':
						str = '深度1'
						break;
					case 'step1':
						str = '深度2'
						break;
					case 'step2':
						str = '深度3'
						break;
					case 'step3':
						str = '深度4';
						break;
					case 'step4':
						str = '深度5';
						break;
					case 'step5':
						str = '深度6';
						break;
					
				}
				return str;
			},
			asksList() {
				let list = [];
				this.asks.map((item, index) => {
					if (index >= this.depthLength) {
						return false;
					}

					list.push([this.asks[index].price, this.asks[index].totalAmount, this.randomNumber(100)]);
				})
				if (this.asks.length < this.depthLength) {
					for (var i = 0; i < this.depthLength - this.asks.length; i++) {
						list.push(['---', '---', 0])
					}
				}
				return list;
			},
			bidsList() {
				let list = [];

				this.bids.map((item, index) => {
					if (index >= this.depthLength) {
						return false;
					}
					list.push([this.bids[index].price, this.bids[index].totalAmount, this.randomNumber(100)]);
				})
				if (this.bids.length < this.depthLength) {
					for (var i = 0; i < this.depthLength - this.bids.length; i++) {
						list.push(['---', '---', 0])
					}
				}

				return list;
			}
		},

		methods: {
			getCyn() {
				DataByTwoCoinName({
					'childCoinName': this.$props.childCoinName,
					'motherCoinName': this.$props.motherCoinName
				}).then(res => {

					this.price = res.data.close;
					this.cnyPirce = (res.data.close * res.data.motherRateForCNY).toFixed(2);
				})
			},
			showactions() {
				var _self = this;
				uni.showActionSheet({
					itemList: ['1', '2', '3', '4', '5', '6'],
					success: function(res) {
						_self.depthValue = 'step' + res.tapIndex;
					},
				})
			},
			getData() {
				getDepthByTwoCoins({
					'childCoinName': this.$props.childCoinName,
					'motherCoinName': this.$props.motherCoinName,
					depth: this.depthValue
				}).then(res => {
					if (res.data.code == 200) {
						this.asks = res.data.data.buyList;
						this.bids = res.data.data.sellList;
					}


				})
			},
			panChange(index) {

				this.defaultIndex = index;


				if (index != 0) {
					this.depthLength = 10;

				} else {
					this.depthLength = 5;

				}
				this.getData();


			},
			randomNumber(number) {
				return Math.floor(Math.random() * number)
			},
			depthClick(e) {
				this.popoverVisible = !this.popoverVisible;
			},
			depthChange(e) {
				this.depthValue = e;
				this.$emit('depthChange', e);
			}
		}
	}
</script>

<style scoped>
	.pmain {
		width: 100%;
		height: 600upx;
		position: relative;
		justify-content: space-between;
		text-align: left;
		padding-right: 20upx;
		box-sizing: border-box;
	}

	.pmain .item {
		position: relative;
		width: 100%;
		display: flex;
		font-size: 24upx;
		margin-bottom: 8upx;
	}

	.pmain .item .bg {
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		z-index: -9999;
	}

	.pmain .item .buybg {
		background: #fdf4f7;
	}

	.pmain .item .sellbg {
		background: #f0faf9;
	}

	.pmain .item .price {
		display: block;
		width: 50%;
		text-align: left;
	}

	.position .item .num {
		display: block;
		width: 50%;
		text-align: right;
		padding-right: 10upx;
	}

	.pmain .current-price {
		margin: 10upx 0;
	}

	.pmain .current-price .usdt {}

	.pmain .depth {
		position: relative;
		margin-top: 10upx;
		margin-right: 10upx;
	}

	.pmain .depth .uni-h6 {
		text-align: center;
		height: 60upx;
		line-height: 60upx;
	}

	.pmain .depth .popover {
		position: absolute;
		top: 80upx;
		width: 100%;
		z-index: 9999999999;
		background: #ffffff;
		display: inline-block;
		border-radius: 20px;
	}

	.pmain .depth .popover .item {
		width: 100%;
		height: 60upx;
		line-height: 60upx;
		display: block;
		text-align: center;
	}

	.pmain .depth .kailong {
		position: absolute;
		left: 50%;
		top: 74upx;
		transform: translate(-50%, -50%);
		max-width: 50%;
		width: 0;
		height: 0;
		border-right: 20px solid transparent;
		border-left: 20px solid transparent;
		border-bottom: 20px solid #E0E0E0;
	}

	.popover-wrap .uni-thinner-border:before {
		border-radius: 15px !important;
	}

	.pamain-thead {
		font-size: 22upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(140, 151, 157, 1);

	}

	.tabs-pan {
		display: flex;
		justify-content: space-between;

	}

	.tabs-pan>text {
		width: 80upx;
		height: 48upx;
		border: 1px solid rgba(196, 206, 212, 1);
		border-radius: 10px;
		text-align: center;
		line-height: 46upx;
		font-size: 22px;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(140, 151, 157, 1);
		box-sizing: border-box;
	}

	.tabs-pan>text.actived {
		border: 0;
		line-height: 48upx;
		background-color: #F7F7FD;
	}
</style>
