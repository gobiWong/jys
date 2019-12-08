<template>
	<view class="">
		<view class="head-drawer" :animation='animationData'>
			<view>
				<view>
					<slot></slot>
				</view>
				<view class="option-buttons">
					<button>重置</button>
					<button>确定</button>
				</view>
			</view>
			
		</view>
		<view class="after" :style="{height:winHeight}" v-show="bgshow">
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				animationData: {},
				animation: '',
				bgshow:false,
				
			}
		},
		created() {
			var animation = uni.createAnimation({
				duration: 200,
				timingFunction: 'ease',
				transformOrigin: "0% 0% 0",
			})
			this.animation = animation;
		},
		computed: {
			winHeight: function() {
				console.log(uni.getSystemInfoSync().windowHeight)
				return uni.getSystemInfoSync().windowHeight + 'px';
			}
		},
		methods: {
			open: function() {
				this.animation.scaleY(1).step();
				this.animationData = this.animation.export();
				this.bgshow=true;
			},
			close: function() {
				this.animation.scaleY(0).step();
				this.animationData = this.animation.export();
				this.bgshow=false;
			}
		},

	}
</script>

<style lang="scss" scoped>
	uni-page-body {
		height: 100%;
	}

	.head-drawer {
		transform: scaleY(0);
		width: 100%;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 1);

		position: absolute;
		top: 90upx;
		z-index: 10;

		&>view:first-child {
			padding: 0 30upx;
			background-color: #FFF;
			box-shadow: inset 2px 0px 20px 0px rgba(0, 0, 0, 0.05);

			z-index: 10;
			position: relative;
			overflow: hidden;
			border-radius: 0px 0px 20px 20px;
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
		top: 150upx;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.4)
	}
</style>
