<template> 
<view>
	<view class="Perpetual">
		<view>BTC/USDT</view>
		<view><image src="../../static/assert/jiantou.png" mode=""></image></view>
	</view>
	<!-- 列表 -->
	<view class="Perpetual-one">
		<view class="petual">2019-07</view>
		<!-- 持仓利息 -->
		<view class="interest-top">
			<view class="inactive">
				<view>持仓利息</view>
				<view>2019-07-10 12:00:00</view>
			</view>
			<view class="inactive-one">
				<view>-0.00018</view>
				<view>利息</view>
			</view>
		</view>
		<!-- 开仓手续费 -->
		<view class="interest-top">
			<view class="inactive">
				<view>开仓手续费</view>
				<view>2019-07-10 12:00:00</view>
			</view>
			<view class="inactive-one">
				<view>-0.00018</view>
				<view>手续费</view>
			</view>
		</view>
		<!-- 平仓 -->
		<view class="interest-top">
			<view class="inactive">
				<view>平仓</view>
				<view>2019-07-10 12:00:00</view>
			</view>
			<view class="inactive-one">
				<view style="color:#4CDFB0">+0.00018</view>
				<view>收益</view>
			</view>
		</view>
		<!-- 强平 -->
		<view class="interest-top">
			<view class="inactive">
				<view>强平</view>
				<view>2019-07-10 12:00:00</view>
			</view>
			<view class="inactive-one">
				<view>-0.00018</view>
				<view>收益</view>
			</view>
		</view>
		<!-- 开仓保证金 -->
		<view class="interest-top">
			<view class="inactive">
				<view>开仓保证金</view>
				<view>2019-07-10 12:00:00</view>
			</view>
			<view class="inactive-one">
				<view>-0.00018</view>
				<view>保证金</view>
			</view>
		</view>
	</view>
</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Perpetual{
		padding: 0 30upx;
		display:flex;
		& > view:nth-child(1) {
			font-size:28upx;
			font-family:PingFang SC;
			font-weight:500;
			color:#2D2F56;
		}
		& > view:nth-child(2) image {
			width: 16upx;
			height: 10upx;
			margin-left: 21upx;
		}
	}
	.petual{
		height:45upx;
		background:rgba(247,247,251,1);
		display: flex;
		padding: 0 30upx;
		margin-top: 30upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(186,197,203,1);
	}
	// 列表
  .interest-top{
	  border-bottom:1upx solid #F1F1F1;
	  padding-bottom:30upx;
	  padding-top:30upx;
	  .inactive{
		  display: flex;
		  justify-content:space-between;
		  padding: 0 30upx;
		  & > view:nth-child(1) {
			  font-size:28upx;
			  font-family:PingFang SC;
			  font-weight:400;
			  color:rgba(45,47,86,1);
		  }
		  & > view:nth-child(2) {
		  	 font-size:24upx;
		  	 font-family:PingFang SC;
		  	 font-weight:400;
		  	 color:rgba(186,197,203,1);		  
		  }
	  }
	  .inactive-one{
		  display: flex;
		  justify-content:space-between;
		  padding: 0 30upx;
		  margin-top:28upx;
		  & > view:nth-child(1) {
		  	 font-size:28upx;
		  	 font-family:PingFang SC;
		  	 font-weight:400;
		  	 color:#EB375D;
		  }
		  & > view:nth-child(2) {
		  	 font-size:28upx;
		  	 font-family:PingFang SC;
		  	 font-weight:400;
		  	 color:#2D2F56;		  
		  }
	  }
  }
	
</style>
