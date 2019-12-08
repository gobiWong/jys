<template>
	<view class="page-body">
		<commonHead></commonHead>
		<!-- 评价信息 -->
		<view class="evaluation-info">
			<view class="info-head">
				<view>
					<view>郭本聪</view>
				</view>
				<view>
					<image src="/static/assert/vip-icon.png"></image>
					<text>加V用户</text>
					<text>注册时间 2019-07-04</text>
				</view>
			</view>
			<view class="info-mian">
				<view @tap="currentIndex=0">
					<image :src="currentIndex==0 ? ('/static/assert/evaluation-2.png') :('/static/assert/evaluation-2-gray.png')"></image>
					<text>好评</text>
				</view>
				<view @tap="currentIndex=1">
					<image :src="currentIndex==1 ? ('/static/assert/evaluation-1.png') :('/static/assert/evaluation-1-gray.png')"></image>
					<text>中评</text>
				</view>
				<view @tap="currentIndex=2">
					<image :src="currentIndex==2 ? ('/static/assert/evaluation-0.png') :('/static/assert/evaluation-0-gray.png')"></image>
					<text>差评</text>
				</view>
			</view>
		</view>
		<view>
			<textarea placeholder="请输入评价内容......" class="textarea" placeholder-class="textarea-placeholder" />
			</view>
		<view class="eveluation-star">
			<!-- 放币时间 -->
			<view>
				<text>放币时间</text>
				<view style="{height: 30upx;font-size:0;}">
					<image :src="item<=timeStar ? '/static/assert/full-star-icon.png':'/static/assert/star-icon.png'" class="star-icon" v-for="item in list" :key='item' @tap='timeStar=item'></image>
				</view>
			</view>
			<!-- 放币态度 -->
			<view>
				<text>放币态度</text>
				<view style="{height: 30upx;font-size:0;}">
					<image :src="item<=attitudeStar ? '/static/assert/full-star-icon.png':'/static/assert/star-icon.png'" class="star-icon" v-for="item in list" :key='item' @tap='attitudeStar=item'></image>
				</view>
			</view>
		</view>
		<!-- 匿名评价 -->
		<view>
			<label class="radio">
				<radio checked style="transform:scale(0.6)"/>匿名评价
			</label>
		</view>
		<view class="submit-button">
			<button>提交评价</button>
		</view>
	</view>
</template>

<script>
	import commonHead from '../commonHead'
	export default {
		data() {
			return {
				currentIndex:null,
				list:[0,1,2,3,4],
				timeStar:null,
				attitudeStar:null,
			}
		},
		components: {
			commonHead
		}
	}
</script>

<style scoped lang="scss">
	
	.evaluation-info {
		width: 690px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.02);
		border-radius: 20px;
		margin: 0 auto;
		padding: 30upx 21upx;
		box-sizing: border-box;
		margin-top: -150px;

		.info-head {
			border-bottom: 1px solid #F3F3F3;
			padding-bottom: 19upx;

			&>view:first-child {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			&>view:last-child {

				image {
					width: 25upx;
					height: 21upx;
					vertical-align: middle;
					margin-right: 12upx;
				}

				text {
					font-size: 22px;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(140, 151, 157, 1);
					margin-right: 10upx;
					vertical-align: middle;
				}
			}

			.evaluation-icon {
				width: 22upx;
				height: 22upx;
				vertical-align: middle;
				margin-right: 13upx;
			}

		}
	}

	.info-mian {
		display: flex;
		justify-content: space-between;
		margin-top: 32upx;

		&>view {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 30%;

			image {
				width: 46upx;
				height: 46upx;
			}

			text {
				font-size: 22px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(153, 153, 153, 1);
			}
		}
	}
	.textarea{
		height:372px;
		width:690px;
		background:rgba(247,247,251,1);
		border-radius:20px;
		margin:0 auto;
		padding: 30upx 39upx;
		box-sizing: border-box;
		margin-top: 30upx;
		font-size:26px;
		font-family:PingFang-SC-Regular;
		font-weight:400;
		color:#2D2F56;
	}
	.textarea-placeholder{
		font-size:26px;
		font-family:PingFang-SC-Regular;
		font-weight:400;
		color:rgba(186,197,203,1);
	}
	
	.eveluation-star {
		padding-left: 30upx;
		margin-top: 40upx;
		
		&>view {
			height: 36upx;
			display: flex;
			align-items: center;
			margin-top: 20upx;
			.star-icon {
				width: 36upx;
				height: 36upx;
				vertical-align: middle;
				margin-right: 30upx;
			}
	
			text {
				font-size: 24px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(140, 151, 157, 1);
				vertical-align: middle;
				margin-right: 50upx;
			}
		}
	}
	.radio{
		font-size:24px;
		font-family:PingFang-SC-Regular;
		font-weight:400;
		color:rgba(186,197,203,1);
		padding-left: 30upx;
		margin-top: 51upx;
		display: block;
	}
	.submit-button{
		padding: 0 30upx;
		margin-top: 29upx;
		button{
			margin: 0;
			padding: 0;
			border: 0;
			height:80px;
			line-height: 80upx;
			background:linear-gradient(-90deg,rgba(104,129,255,1),rgba(115,156,255,1));
			border-radius:10px;
			font-size:28px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(255,255,255,1);
			
		}
	}
</style>