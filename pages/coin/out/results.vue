<template>
	<view>
		<view class="image-one">
			<image src="../../../static/assert/attestation.png" mode=""></image>
			<view class="image-two">已提交提币申请</view>
		</view>
		<!-- 查看 -->
		<view class="checkId"><button @tap="gomoney(2, fullName, currency)">查看提币记录</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			typeIndex: '',
			fullName: '',
			currency: ''
		};
	},
	onLoad(options) {
		console.log(options, '99999999900000000000000');
		this.typeIndex = JSON.stringify(options.typeIndex);
		this.fullName = JSON.stringify(options.fullName);

		this.currency = JSON.stringify(options.currency);
	},
	methods: {
		gomoney(num, num1, num2) {
			
			uni.navigateTo({
				url: '../order?typeIndex=' + this.typeIndex + '&fullName=' + this.fullName + '&currency=' + this.currency
				// url: `../order?${this.typeIndex}=${num}&${this.fullName}=${num1}&${this.currency}=${num2}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.image-one {
	image {
		width: 87upx;
		height: 87upx;
		padding-top: 100upx;
		margin: 0 auto;
		display: flex;
	}
	.image-two {
		font-size: 30upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(45, 47, 86, 1);
		padding-top: 43upx;
		text-align: center;
	}
}
.checkId {
	padding: 0 30upx;
	button {
		width: 100%;
		height: 80upx;
		background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
		border-radius: 10upx;
		font-size: 32upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		margin-top: 110upx;
	}
}
</style>
