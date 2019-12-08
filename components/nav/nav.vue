<template>
	<view>
	<view class="header">
		<!-- head left -->
		<view>
			<image src="/static/assert/fold.png" class="drawer-icon" @tap="open"></image>
			<text class="symbol-text">{{defaultWalletPair.name}}</text>
		</view>
		<!-- head right -->
		<view>
			<image src="/static/assert/zoushi.png" class="chart-icon" @tap="tokline"></image>
			<!-- <image src="/static/assert/gengduo.png" class="more-icon" @tap="show"></image> -->
		</view>
		
	</view>
		<view class="head-drawer" :animation='animationData'>
			<view class="menu-options">
				<view @tap="$nav('/pages/coin/in/index')">
					<image src="/static/assert/coinIn-icon.png" style='width: 32upx;height: 28upx;'></image>
					<text>充币</text>
				</view>
				<view> 
					<image src="/static/assert/start-white-icon.png" style='width: 31upx;height: 30upx;'></image>
					<text>添加自选</text>
				</view>
			</view>
		</view>
		<view class="after" :style="{height:winHeight}" v-show="bgshow" @tap="hide"></view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				symbol:"EOS/USDT",
				animationData: {},
				animation: '',
				bgshow:false
			};
		},
		computed:{
			...mapState('quotation',['defaultWalletPair']),
			winHeight: function() {
				
				return uni.getSystemInfoSync().windowHeight + 'px';
			}
		},
		created() {
			var animation = uni.createAnimation({
				duration: 200,
				timingFunction: 'ease',
				transformOrigin: "0% 0% 0",
			})
			
		},
		methods:{ 
			onCoinChange(){
				
			},
			open(){
				this.$emit('open')
			},
			tokline(){
				uni.navigateTo({
					url: "/pages/trade/kline/main?symbol="+this.defaultWalletPair.name
				})
			},
			show: function() {
				this.animation.scaleY(1).step();
				this.animationData = this.animation.export();
				this.bgshow=true;
			},
			hide: function() {
				this.animation.scaleY(0).step();
				this.animationData = this.animation.export();
				this.bgshow=false;
			}
		},
		
	}
</script>

<style lang="scss">
.header>view{
	display: flex;
	align-items: center;
	
}
.header{
	display: flex;
	height: 90upx;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 0 30upx;
	box-sizing: border-box;
}

.drawer-icon{
	width: 30upx;
	height: 31upx;
}
.more-icon{
	width:33upx;
	height: 7upx;
}
.chart-icon{
	width: 37upx;
	height: 35upx;
	margin-right: 52upx;
}
.symbol-text{
	margin-left: 30upx;
}

uni-page-body {
		height: 100%;
	}

	.head-drawer {
		transform: scaleY(0);
		width: 100%;
		box-sizing: border-box;
		

		position: absolute;
		top: 0upx;
		z-index: 101;

		&>view {
			padding: 10upx 30upx;
			background-color: #FFF;
			box-shadow: inset 2px 0px 20px 0px rgba(0, 0, 0, 0.05);
			border-radius:10upx;
			z-index: 10;
			position: relative;
			overflow: hidden;
			width: 200upx;
			position: absolute;
			right: 30upx;
			top:100upx;
			&>view{
				display: flex;
				align-items: center;
				height: 70upx;
				text{
					margin-left:12upx;
				}
			}
		}




		.option-buttons {
			display: flex;
			margin-bottom: 42upx;
			margin-top: 50upx;

			&>button {
				width: 320px;
				height: 80px;
				line-height: 80upx;
				background: rgba(255, 255, 255, 1);
				border: 1px solid rgba(230, 230, 230, 1);
				border-radius: 10px;
				font-size: 26px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: #2D2F56;
			}

			&>button:last-child {
				width: 320px;
				height: 80px;
				background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
				border-radius: 10px;
				color: #FFF;
			}
		}
	}

	 .after {
		position: fixed;
		top: 0upx;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 100;
	}

</style>
