<template>
	<view>
		<view class="image-one">
			<image src="../../../static/assert/attestation.png" mode=""></image>
			<view class="image-two">已提交提币申请</view>
		</view>
		<!-- 查看 -->
		<view class="checkId">
			<button @tap="gomoney">查看提币记录</button>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				typeIndex:""
			}
		},
		
		methods:{
			gomoney() { 
				uni.navigateTo({
					url: '../order?typeIndex=1',
			
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.image-one{
		image {
			width: 87upx;
			height: 87upx;
			padding-top: 100upx;
			margin: 0 auto;
			display: flex;
		}
		.image-two{
			font-size:30upx;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(45,47,86,1);
			padding-top: 43upx;
			text-align: center;
			
		}
		
		
	} 
	.checkId{
		padding: 0 30upx;
		button{
			width: 100%;
			height:80upx;
			background:linear-gradient(-90deg,rgba(104,129,255,1),rgba(115,156,255,1));
			border-radius:10upx;
			font-size:32upx;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(255,255,255,1);
			margin-top: 110upx;
		}
	}
</style>
