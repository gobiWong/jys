<template>
	<view class='uni-app-header' :style="{boxShadow:showBorderShadow?  '0px 3px 8px 0px rgba(53, 48, 15, 0.07)': ''}">
		<statusBar></statusBar>
		<view class='header-common'>
			<view>
				<image src="/static/img/back-gray.png" class='back-icon' @tap='back'></image>
				<slot name='center'>
					<text class='header-title'>{{title}}</text>
				</slot>
				<view>
					<slot name='right'></slot>
				</view>
			</view>
			<view >
				<slot name='bottom'></slot>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * @props
	 * @param {Stging}   title
	 * 
	 * */
	export default {
		data() {
			return {

			}
		},
		props: {
			title: {
				default: '',
				type: String
			},
			showBorderShadow:{
				default:true,
				type:Boolean
			},
			bg:{
				default:true,
				type:Boolean
			}
		},
		mounted() {
		
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style scoped lang='scss'>
	.uni-app-header {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 100;
		background-color: #fff;
		-webkit-transform: translateZ(0);
		/* overflow: hidden; */
	}

	.header-common {
		flex-direction: column;
		
		&>view:first-child{
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
		font-size: 36upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(45, 47, 86, 1);
	}

	.back-icon {
		width: 17upx;
		height: 32upx;
	}
</style>
