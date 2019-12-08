<template>
	<view>
		<view class="detail">
			<view>{{title}}</view>
			<!-- 房产网 -->
			<view class="dataTime">
				<view>房产网</view>
				<view>{{days}}天前. 更新于</view>
			</view>
			<view class="detail-one">
				
				                            尊敬的用户：<br>
											
                         {{content}}<br>
				{{createTime}}
				
				
				
				
				                        
			</view>
		    <!-- 分享 -->
			<view class="share">
				<button>分享</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"",
				createTime:"",
				content:"",
				days:""
			};
		},
		onLoad(options) {
			this.title = options.title,
			this.createTime = options.createTime,
			this.content = options.content,
			this.days = options.days
		},
		
		}
</script>

<style lang="scss" scoped>
	.detail{
		padding: 0 30upx;
		padding-bottom:89upx;
		&>view:nth-child(1) {
			font-size:42upx;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
		.dataTime{
			display: flex;
			margin-top:66upx;
			&>view:nth-child(1) {
				font-size:26upx;
				font-family:PingFang-SC-Medium;
				font-weight:500;
				color:rgba(104,129,255,1);
			}
			&>view:nth-child(2) {
				font-size:26upx;
				font-family:PingFang-SC-Medium;
				font-weight:500;
				color:rgba(102,102,102,1);
				margin-left: 19upx;
			}
		}
		.detail-one{
			font-size:32upx;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(51,51,51,1);
			margin-top: 85upx;
		}
		// 分享
		.share{
			button{
				width: 90%;
				height:76upx;
				background:rgba(104,129,255,1);
				border-radius:10upx;
				display: flex;
				margin: 0 auto;
				margin-top: 166upx;
				font-size:32upx;
				font-family:PingFang-SC-Medium;
				font-weight:500;
				color:rgba(255,255,255,1);
				justify-content: center;
				align-items: center;
			}
		}
		
	}
</style>
