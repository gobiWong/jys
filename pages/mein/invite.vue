<template>
	<view class="page-body">
		<view class="page-header">
			<statusBar></statusBar>
			<view class='header'>
				<view>
					<image @tap="back" src="/static/img/back-icon-white.png" class='back-icon'></image>
					<view>
						<text class='header-title'>{{lang.Invite}}</text>
					</view>
					<text></text>
				</view>
			</view>
		</view>
		<view class="page-body">
			<view class="card-container">
				<view class="top">
					<tkiQrcode class="qrcode" :size="230" :val='userinfo.invitationCode' ref="qrcode" background='#fff' foreground='#000'
					 pdground='#000' />
				</view>
				<view class="line"></view>
				<view class="mian">
					<view class="invite-code">
						<text>{{lang.Invitecode}}</text>
						<text>{{userinfo.invitationCode}}</text>
					</view>
					<view class="tootips">{{lang.download}}APP</view>
					<text class="share-button">{{lang.share}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {

			}
		},
		methods: {
			back() {

				uni.switchTab({
					url:'/pages/mein/index'
				});
			},
			onresult(val) {
				console.log(val);
			}
		},
		components: {
			tkiQrcode
		},
		computed: {
			...mapState('user', ['userinfo']),
			...mapState(['lang'])
		},
		mounted() {
			// uni.showLoading({
			// 	mask:true,
			// 	title:"二维码加载中",
			// })
			this.$refs.qrcode._makeCode('asdf');

		}

	}
</script>

<style lang="scss">
	uni-page-body {
		height: 100%;
	}

	.page-body {
		min-height: 100%;
		background: linear-gradient(232deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
	}

	.header {
		&>view:first-child {
			width: 100%;
			height: 96upx;
			display: flex;
			justify-content: space-between;
			padding: 0 30upx;
			box-sizing: border-box;
			align-items: center;
		}

	}

	.header-title {
		font-size: 30px;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}

	.back-icon {
		width: 17upx;
		height: 32upx;
	}

	.card-container {
		margin: 0 auto;
		margin-top: 150upx;
		height: 881upx;
		background-image: url('/static/assert/invate-bg.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		// transform: rotate(180deg);
		width: 496upx;

		.top {
			display: flex;
			justify-content: center;
			padding-top: 100upx;
		}

		.line {
			margin: 0 auto;
			margin-top: 87upx;
			border-bottom: 2upx dashed rgba(221, 221, 234, 1);
			width: 374px;
		}

		.mian {
			display: flex;
			flex-direction: column;
			align-items: center;

			.invite-code {
				font-size: 32px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(105, 132, 255, 1);
				margin-top: 80upx;
			}

			.tootips {
				font-size: 22px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(45, 47, 86, 1);
				margin-top: 20upx;
			}

			.share-button {
				margin-top: 44upx;
				width: 307px;
				height: 61px;
				text-align: center;
				line-height: 61upx;
				background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
				border-radius: 10px;
				font-size: 32px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
			}
		}
	}
</style>
