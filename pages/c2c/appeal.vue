<template>
	<view>
		<view class="from-tilte">申诉</view>
		<view class="page-title">申诉理由</view>
		<view class="from">
			<view class="checkbox-view">
				<switch type="checkbox" color="#6881ff" />
				<label for="">我并没有收到买家的转款</label>
			</view>
			<view class="checkbox-view">
				<switch type="checkbox" color="#6881ff" />
				<label for="">收到买家付款，但金额不符</label>
			</view>
			<view class="checkbox-view">
				<switch type="checkbox" color="#6881ff" />
				<label for="">收到买家付款，但是付款信息与买家实名信息不符</label>
			</view>
			<view class="checkbox-view">
				<switch type="checkbox" id='other' color="#6881ff" @change='textareashowChange' />
				<label for="other">其他</label>
			</view>
			<view class="textarea-container" v-show="textareashow">
				<view class="head">备注</view>
				<textarea placeholder="请填写备注" placeholder-class="placeholder-class" class="input" />
				</view>
				
		</view>
		
		<view class="tips">提起申诉后资产将会冻结，申诉专员将介入本次交易，直至申诉结束。恶意申诉属于扰乱平台正常运营秩序的行为，情结严重将冻结账户</view>
		<view class="submit-buttons">
			<button>提交申诉</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 index: 0,
				 textareashow:false
			}
		},
		methods: {
			textareashowChange(e){
				console.log(JSON.stringify(e));
				const value=e.detail.value;
				this.textareashow=value
			}	
		},
		
	}
</script>

<style lang="scss">
	@import './common.scss';
	.textarea-container{
		border: 1px solid #E6E6E6;
		margin-top: 50upx;
		border-radius:10upx;
		.head{
			padding: 6upx 28upx;
			height:70upx;
			background:rgba(247,247,251,1);
			border-radius:10upx;
			box-sizing: border-box;
			font-size:26upx;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(140,151,157,1);
			display: flex;
			align-items: center;
		}
		textarea{
			padding: 29upx 25upx;
		}
	}
	.submit-buttons{
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 30upx;
		position: fixed;
		bottom: 126upx;
		box-sizing: border-box;
		button{
			width: 100%;
			height: 80upx;
			line-height: 80upx;
			font-size:28upx;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(255,255,255,1);
			border-radius:10upx;
			margin: 0;
			background:linear-gradient(-90deg,rgba(104,129,255,1),rgba(115,156,255,1));
		}
		
	}
	.page-title{
		font-size:26px;
		font-family:PingFang-SC-Medium;
		font-weight:500;
		color:rgba(140,151,157,1);
		margin-left: 30upx;
	}
	.checkbox-view{
		margin-top: 31px;
		&>label{
			vertical-align: middle;
			font-size:26px;
			font-family:PingFang-SC-Regular;
			font-weight:400;
			color:rgba(140,151,157,1);
			margin-left: 31upx;
		}
	}
	.tips{
		font-size:24px;
		font-family:PingFang-SC-Regular;
		font-weight:400;
		color:rgba(140,151,157,1);
		word-break: break-all;
		width: 690upx;
		margin: 0 auto;
		background-color: #F7F7FB;
		padding: 36upx 25upx ;
		box-sizing: border-box;
		margin-top: 50upx;
		
	}
</style>
