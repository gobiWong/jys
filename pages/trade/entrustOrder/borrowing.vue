<template>
	<view class="container">
		<view class="head-text">借贷</view>
		<view class="select">
			<text :class="{actived:selectIndex==0}" @tap="selectIndex=0">EOS 用于做空</text>
			<text :class="{actived:selectIndex==1}" @tap="selectIndex=1">USDT 用于做多</text>
		</view>
		<view class="mian">
			<view class="main-container">
				<view>
					<text>已借</text>
					<text>30.0000000 EOS</text>
				</view>
				<view>
					<text>最大额度</text>
					<text>1.000000 EOS</text>
				</view>
				<view>
					<text>利率</text>
					<text>0.00%</text>
				</view>
			</view>
		</view>
		<view class="foot">
			<view class="head">数量</view>
			<view class="input-cell">
				<input type="number" placeholder='最少30.000000' placeholder-class='placeholder-class' @focus="buttonShow=false"	 @blur="buttonShow=true"/>
				<view class="cell-left">
					<text>EOS</text>
					<text>全部</text>
				</view>
			</view>
			<view class="tip">可借122.134  EOS</view>
		</view>
		<view class="button-cell" v-show="buttonShow">
			<button >借贷</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectIndex: 0,
				buttonShow:true,
			};
		}
	}
</script>

<style lang="scss" scoped>
	.head-text {
		font-size: 40upx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(38, 37, 80, 1);
		padding: 0 30upx;
	}

	.select {
		padding: 0 30upx;
		box-sizing: border-box;
		margin-top: 15upx;

		&>text {
			width: 50%;
			text-align: center;
			display: inline-block;
			height: 60upx;
			line-height: 60upx;
			border: 1px solid rgba(229, 229, 229, 1);
			box-sizing: border-box;
			color: rgba(69, 127, 208, 1);
		}

		&>text:first-child {
			border-top-left-radius: 5px;
			border-bottom-left-radius: 5px;
		}

		&>text:last-child {
			border-top-right-radius: 5px;
			border-bottom-right-radius: 5px;
			border-left: 0;
		}

		&>text.actived {
			background-color: rgba(69, 127, 208, 1);
			color: #FFF;
		}
	}

	.mian {
		padding: 0 30upx;
		box-sizing: border-box;
		width: 100%;
		margin-top: 29upx;

		&>.main-container {
			background: rgba(247, 247, 251, 1);
			border-radius: 5upx;
			padding: 39upx 41upx 50upx;

			view {
				line-height: 90upx;
				display: flex;
				justify-content: space-between;

				&>text:first-child {
					font-size: 28upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(177, 181, 197, 1);
				}

				&>text:last-child {
					font-size: 24upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(71, 70, 104, 1);
				}
			}
		}
	}

	.foot {
		padding: 0 30upx;
		margin-top: 38upx;

		.head {
			font-size: 24upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(38, 37, 80, 1);
		}
		.input-cell{
			display: flex;
			margin-top: 50upx;
			border-bottom: 1px solid  #E4E4E4;
			align-items: center;
			.cell-left{
				padding: 10upx;
				padding-left: 20upx;
				min-width: 150upx;
				&>text:first-child{
					position: relative;
					font-size:28upx;
					font-family:PingFang-SC-Medium;
					font-weight:500;
					color:rgba(177,181,197,1);
					padding-right: 20upx;
					box-sizing: border-box;
					vertical-align: middle;
				}
				&>text:last-child{
					padding-left: 20upx;
					font-size:28upx;
					font-family:PingFang-SC-Medium;
					font-weight:500;
					color:rgba(38,37,80,1);
					vertical-align: middle;
				}
				&>text:first-child:after{
					content: ' ';
					position: absolute;
					width: 2px;
					height: 25upx;
					background-color: #B1B5C5;
					right: 0;
					top: calc(50% - 25upx / 2);
					
				}
			}
			input{
				flex:1;
				color: $input-color;
				font-size: $input-size;
				font-family: $input-family;
				font-weight:$input-weight;
			}
		}
	}
	.placeholder-class	{
		color: $input-p-color;
		font-size: $input-size;
		font-family: $input-family;
		font-weight:$input-weight;
	}
	.tip{
		font-size:22upx;
		font-family:PingFang-SC-Medium;
		font-weight:500;
		color:rgba(203,204,210,1);
		margin-top: 10upx;
	}
	.button-cell{
		position: fixed;
		bottom: 43upx;
		left: 0;
		padding: 0 30upx;
		width: 100%;
		height: 70upx;
		box-sizing: border-box;
		button{
			width: 100%;
			height: 100%;
			line-height: 70upx;
			border: 0;
			background: #457FD0;
			border-radius:5upx;
			font-size:34upx;
			font-family:PingFang-SC-Bold;
			font-weight:bold;
			color:rgba(255,255,255,1);
		}
	}
</style>
