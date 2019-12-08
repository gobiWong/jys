<template>
	<view>
		<!-- 蓝色背景部分 -->
		<view class="c2c-head">
			<statusBar />
			<view class="head-container">
				<!-- top -->
				<view class="head-container--top">
					<view class="menu-left">
						<text :class="{actived:typeIndex==0}" @tap="typeIndex=0">我要买币</text>
						<text :class="{actived:typeIndex==1}" @tap="typeIndex=1">我要卖币</text>
					</view>
					<view class="menu-right">
						<image src="/static/assert/filter-icon.png" class="filter-icon"></image>
						<image src="/static/assert/menu-icon.png" class="menu-icon" @tap="menushow=!menushow"></image>
						<!-- 二级菜单 -->
						<view class="tooltips" :animation='animationData' >
							<view>
								<image src="/static/assert/ad-icon-release.png"></image>
								<text>发布广告</text>
							</view>
							<view>
								<image src="/static/assert/ad-icon.png"></image>
								<text>我的广告</text>
							</view>
							<view>
								<image src="/static/assert/my-evaluation-icon.png"></image>
								<text>我的评价</text>
							</view>
						</view>
					</view>
				</view>
				<!-- bottom -->
				<view class="head-container--bottom">
					<scroll-view scroll-x>
						<view class="coin-li" v-for="(item, index) in coinList" :key="index" @tap="currentIndex=index" :class="index == currentIndex   ? 'actived' : ''">
							<label>{{item.name}}</label>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- 列表部分 -->
		<view class="card-list">
			<!-- 一个卡片模板 -->
			<view class="card-cell">
				<view class="userinfo">
					<view>
						<text class="name">郭本聪</text>
						<image src="/static/assert/vip-icon.png" class="vip-icon"></image>
					</view>
					<view class="user-price">
						<text>133760</text>
						<text>99%</text>
					</view>
				</view>
				<view class="numinfo">
					<view>
						<text>数量0.123123123 BTC</text>
					</view>
					<view>
						<text>单价</text>
					</view>
				</view>
				<view class="priceinfo">
					<view>
						<text>限额</text>
						<text>￥500 - ￥2800</text>
					</view>
					<view>
						<text>￥85454540.21</text>
					</view>
				</view>
				<view class="option">
					<view>
						<image src="/static/assert/alipay-cion.png"></image>
						<image src="/static/assert/wechat-icon.png"></image>
						<image src="/static/assert/card-icon.png"></image>
					</view>
					<view>
						<button class="submit-button" @tap="buy" v-show="!typeIndex">购买</button>
						<button class="submit-button" @tap="sell" v-show="typeIndex">出售</button>

					</view>
				</view>
			</view>
		</view>
		<!-- 底部弹窗 -->
		<dialogs ref='dialog' />
		<!-- 订单悬窗 -->
		<view class="link-order" :style="{bottom: linkHeight}">订单</view>
	</view>
</template>

<script>
	import dialogs from './dialog'
	export default {
		data() {
			return {
				coinList: [{
						name: "BTC",
						id: 1
					},
					{
						name: "EOS",
						id: 1
					},
					{
						name: "USDT",
						id: 1
					},
				],
				typeIndex: 0,
				currentIndex: 0,
				dialogsVisiabel: true,
				menushow: false,
				animationData: {},
				animation:'',
			}
		},
		onShow() {
			var animation = uni.createAnimation({
				duration: 500,
				timingFunction: 'ease',
				transformOrigin: "0% 0% 0",
			})
			this.animation=animation;
		},
		watch: {
			menushow(val){
				if(!val){
					  this.animation.scaleY(0).step();
					  this.animationData=this.animation.export();
				}else{
					this.animation.scaleY(1).step()
				
					this.animationData=this.animation.export();
				}
			},

		},
		components: {
			dialogs
		},
		computed: {
			linkHeight: function() {
				return uni.getSystemInfoSync().windowBottom + 10 + 'px';
			}
		},
		mounted() {

		},
		methods: {
			go(url) {
				uni.navigateTo({
					url: url
				});
			},
			buy() {
				this.$refs.dialog.open();

			},
			sell() {

				var userhastype = false;
				if (userhastype) {
					uni.showModal({
						cancelText: "取消",
						cancelColor: "#8C979D",
						content: "出售前需要将币划转至法币账户，是否需要划转？",
						confirmText: "划转",
						confirmColor: "#2D2F56",
						success: function() {

						}
					})
				} else {
					uni.showModal({
						cancelText: "取消",
						content: "买家仅支持通过银行卡向您付款，您需要添加并激活相应收款方式。",
						cancelColor: "#8C979D",
						confirmText: "添加",
						confirmColor: "#2D2F56"
					})
				}
			},
		},

	}
</script>

<style scoped lang="scss">
	.c2c-head {
		height: 305upx;
		width: 100%;
		background: linear-gradient(0deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));

	}

	.head-container {
		padding: 0 30upx;
		padding-top: 50upx;

		.head-container--top {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.menu-left {

				text {
					font-size: 24upx;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: #FFF;
					position: relative;
					padding-bottom: 10upx;
				}

				&>text.actived {
					font-size: 36upx;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
				}

				&>text:last-child {
					margin-left: 40upx;
				}

				&>text.actived:after {
					content: ' ';
					position: absolute;
					width: 53upx;
					height: 5upx;
					left: calc(50% - 53upx / 2);
					bottom: 0;
					background-color: #FFF;
				}
			}

			.menu-right {
				display: flex;
				align-items: center;
				position: relative;

				.filter-icon {
					width: 34upx;
					height: 34upx;

				}

				.menu-icon {
					width: 34upx;
					height: 34upx;
					margin-left: 40upx;
				}


				.tooltips {
				
					position: absolute;
					z-index: 10;
					width: 228px;
					height: 289px;
					transform: scaleY(0);
					background: rgba(255, 255, 255, 1);
					box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.09);
					border-radius: 10px;
					bottom: -299px;
					right: 0;
					padding-left: 28upx;
					padding-right: 39upx;
					box-sizing: border-box;

					&>view {
						height: 33%;
						min-height:100upx; 
						display: flex;
						justify-content: space-between;
						align-items: center;

						image {
							width: 24upx;
							height: 24upx;
							vertical-align: middle;
						}

						text {
							font-size: 28px;
							font-family: PingFang-SC-Regular;
							font-weight: 400;
							color: rgba(45, 47, 86, 1);
						}
					}
				}
			}
		}

		.head-container--bottom {
			margin-top: 40upx;

			.coin-li {
				display: inline-block;
				font-size: 24upx;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				padding: 5upx 14upx;
				margin-right: 10upx;

				label {
					position: relative;
					// z-index: 100;
				}
			}

			.coin-li.actived {
				background: rgba(255, 255, 255, 0.1);

				border-radius: 10px;
			}
		}

	}

	.card-list {
		margin-top: -20upx;
		padding: 0 30upx;

		.card-cell {
			padding: 40upx 30upx 30upx;
			box-shadow: 0px 5upx 10upx 0px rgba(0, 0, 0, 0.02);
			border-radius: 20upx;
			background-color: #fff;

			.user-price {
				font-size: 20upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(140, 151, 157, 1);

				text {
					position: relative;
				}

				&>text:first-child {
					padding-right: 9upx;
				}

				&>text:first-child::after {
					content: ' ';
					position: absolute;
					right: 0px;
					top: 2px;
					width: 2px;
					height: 15upx;
					background-color: rgba(140, 151, 157, 1);
				}

				&>text:last-child {
					margin-left: 9upx;
				}
			}

			.vip-icon {
				width: 25upx;
				height: 25upx;
				vertical-align: middle;
				margin-left: 10upx;
			}

			&>view {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.numinfo {
				view>text {
					font-size: 22upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(140, 151, 157, 1)
				}
			}

			.priceinfo {
				&>view:first-child>text {
					font-size: 22upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(140, 151, 157, 1);
				}

				&>view:last-child>text {
					font-size: 32upx;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(104, 129, 255, 1);
				}

			}

			.option {
				margin-top: 10upx;

				image {
					width: 30upx;
					height: 30upx;
					margin-right: 15upx;
					vertical-align: middle;
				}

				button {
					width: 160upx;
					height: 51upx;
					line-height: 51upx;
					background-color: #6C5C9F;
					border-radius: 5upx;
					border: 0;
					font-size: 24upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
	}

	.link-order {
		position: fixed;
		right: 29upx;
		width: 70px;
		height: 70px;
		line-height: 70upx;
		background: linear-gradient(0deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
		box-shadow: 0px 9px 25px 0px rgba(21, 31, 154, 0.33);
		border-radius: 50%;
		font-size: 24px;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		z-index: -1;
	}
</style>
