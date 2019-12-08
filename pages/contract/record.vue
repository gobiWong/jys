<template>
	<view>
		<statusBar></statusBar>
		<view class="header">
			<!-- head left -->
			<view>
				<image @tap="onreturn" src="../../static/assert/fanhui.png" class="drawer-icon"></image>
			</view>
			<view>
				<text class="symbol-text">{{ symbol }}</text>
			</view>
			<!-- head right -->
			<view>
				<image @tap="clone" src="../../static/assert/filter-icon-black.png" class="more-icon"></image>
			</view>
		</view>
		<!-- 记录 -->
		<view class="record">
			<!-- 做空 -->
			<view class="record-two">
				<view class="record-one">
					<view>做空 50X</view>
					<view @tap="shareInfo">
						<image src="../../static/assert/fenx.png" mode=""></image><text>分享</text>
					</view>
				</view>
				<view class="record-free">
					<view>BTC合约 <text>自动平仓</text></view>
					<view>2019-07-16 10:23:05</view>
				</view>


			</view>
			<!-- 平仓价格 -->
			<view class="plice-ito">
				<view class="plice">
					<view>平仓价格</view>
					<view>收益率</view>
				</view>
				<view class="pliceone">
					<view>9666.3307 USDT</view>
					<view>+20.66%</view>
				</view>
			</view>
			<!-- 开仓价格 -->
			<view class="Opening">
				<view>开仓价格</view>
				<view>9715.1400 USDT</view>
			</view>
			<!-- 已实现盈亏 -->
			<view class="Opening">
				<view>已实现盈亏</view>
				<view style="color: #6881FF;">+1.1728 USDT</view>
			</view>
			<!-- 平仓数量 -->
			<view class="Opening">
				<view>平仓数量</view>
				<view>0.0300 BTC</view>
			</view>
			<!-- 持仓利息 -->
			<view class="Opening">
				<view>持仓利息</view>
				<view>0.0300 BTC</view>
			</view>
		</view>
		<!-- 弹框 -->
		<view v-if="stop" id="myModal" class="modal">
			<view class="modal-content">
				<!-- 手动平仓 -->
				<view v-for="(item,index) in manual" :key="index" @tap="addCountrys(index)" class="Manual">
					<view>{{item.stopClose}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import share from "@/common/share.js";
	export default {
		data() {
			return {
				symbol: '平仓记录',
				stop:false,
				manual:[
					{
						stopClose: "手动平仓",
						salesStatus: "0"
					},
					{
						stopClose: "自动平仓",
						salesStatus: "1"
					},
					{
						stopClose: "强制平仓",
						salesStatus: "2"
					}
				],
				
			}
		},
		onBackPress() {
			//监听back键，关闭弹出菜单
			if (this.shareObj.shareMenu.isVisible()) {
				this.shareObj.shareMenu.hide();
				this.shareObj.alphaBg.hide();
				return true
			}
		},
		methods:{
			// 返回上一级
			onreturn() {
			     uni.switchTab({
			     	url: './index'
			     })
			       
			     
			   },
			clone(){
				this.stop= true
			},
			// 点击筛选
			addCountrys(index){
				this.stop=false
				
			},
			// 分享
			shareInfo(){
				let shareInfo={
					href:"https://uniapp.dcloud.io",
					title:"分享测试",
					desc:"分享测试",
					imgUrl:"/static/assert/tupian.png"
				};
				let shareList=[
					{
						icon:"/static/sharemenu/wx.png",
						text:"微信好友",
					},
					{
						icon:"/static/sharemenu/pyq.png",
						text:"朋友圈"
					},
					{
						icon:"/static/sharemenu/weibo.png",
						text:"微博"
					},
					{
						icon:"/static/sharemenu/qq.png",
						text:"QQ"
					},
					{
						icon:"/static/sharemenu/copy.png",
						text:"复制"
					},
					{
						icon:"/static/sharemenu/more.png",
						text:"更多"
					},
				];
				this.shareObj=share(shareInfo,shareList,function(index){
					console.log("点击按钮的序号: " + index);
					let shareObj={
						href:shareInfo.href||"",
						title:shareInfo.title||"",
						summary:shareInfo.desc||"",
						success:(res)=>{
							console.log("success:" + JSON.stringify(res));
						},
						fail:(err)=>{
							console.log("fail:" + JSON.stringify(err));
						}
					};
					switch (index) {
						case 0:
							shareObj.provider="weixin";
							shareObj.scene="WXSceneSession";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 1:
							shareObj.provider="weixin";
							shareObj.scene="WXSenceTimeline";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 2:
							shareObj.provider="sinaweibo";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 3:
							shareObj.provider="qq";
							shareObj.type=1;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 4:
							uni.setClipboardData({
								data:shareInfo.href,
								complete() {
									uni.showToast({
										title: "已复制到剪贴板"
									})
								}
							})
							break;
						case 5:
							plus.share.sendWithSystem({
								type:"web",
								title:shareInfo.title||"",
								thumbs:[shareInfo.imgUrl||""],
								href:shareInfo.href||"",
								content: shareInfo.desc||"",
							})
							break;
					};
				});
				this.$nextTick(()=>{
					this.shareObj.alphaBg.show();
					this.shareObj.shareMenu.show();
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.header>view {
		display: flex;
		align-items: center;
	}

	.header {
		display: flex;
		height: 90upx;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		margin-top: 30upx;
		border-bottom: 1upx solid #E0E0E0;

		.drawer-icon {
			width: 16upx;
			height: 30upx;
		}

		.symbol-text {
			text-align: center;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(45, 47, 86, 1);
		}

		.more-icon {
			width: 33upx;
			height: 32upx;
		}
	}

	// 记录
	.record {
		width: 90%;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0upx 0upx 15upx 1upx rgba(102, 102, 102, 0.16);
		border-radius: 10upx;
		margin: 31upx auto;
        padding-bottom:54upx;
		// 做空
		.record-two {

			background: rgba(247, 247, 251, 1);
			border-radius: 10upx 10upx 0upx 0upx;
			padding: 0 29upx 28upx;

			.record-one {
				display: flex;
				justify-content: space-between;

				&>view:nth-child(1) {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(235, 55, 93, 1);
					margin-top: 20upx;
				}

				&>view:nth-child(2) image {
					width: 27upx;
					height: 26upx;
					margin-top: 30upx;
				}

				&>view:nth-child(2) text {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(104, 129, 255, 1);
					margin-left: 20upx;
					margin-top: 30upx;
				}
			}

			// 自动平仓
			.record-free {
				display: flex;
				justify-content: space-between;

				&>view:nth-child(1) {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(45, 47, 86, 1);
					margin-top: 27upx;

					&>text {
						padding: 0 8upx;
						padding-bottom: 18upx;
						padding-top: 18upx;
						background: rgba(104, 129, 255, 1);
						border-radius: 20upx 19upx 19upx 0upx;
						margin-left: 22upx;
						font-size: 22upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
					}
				}

				&>view:nth-child(2) {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(186, 197, 203, 1);
					margin-top: 27upx;
				}

			}


		}

		// 平仓价格
		.plice-ito {
			border-bottom: 1upx solid #E6E6E6;
			padding-bottom: 31upx;
			width: 90%;
			margin: 0 auto;

			.plice {
				display: flex;
				justify-content: space-around;
				margin-top: 38upx;

				&>view:nth-child(1) {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(140, 151, 157, 1);
				}

				&>view:nth-child(2) {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(140, 151, 157, 1);
				}
			}

			.pliceone {
				display: flex;
				justify-content: space-around;
				margin-top: 38upx;

				&>view:nth-child(1) {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(45, 47, 86, 1);
				}

				&>view:nth-child(2) {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(45, 47, 86, 1);
				}
			}
		}

		// 开仓价格
		.Opening {
			display: flex;
			justify-content: space-between;
			padding: 0 31upx;
			margin-top: 39upx;

			&>view:nth-child(1) {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(186, 197, 203, 1);
			}

			&>view:nth-child(2) {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(45, 47, 86, 1);
			}
		}

	}
   // 弹框
   .modal {
	display: block;
	/* 默认隐藏 */
	/*生成绝对定位的元素，相对于浏览器窗口进行定位。*/
	position: fixed;
	z-index: 999;
	right: 0;
	top: 0;
	/*设置弹窗位置*/
	padding-top: 20%;
	padding-bottom: 100upx;
	/*浮在全屏上*/
	width: 100%;
	height: 100%;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.5);
	.modal-content{
		background-color: #fefefe;
		    
		    background: white;
		    border-radius: 5px;
		    padding-bottom: 15px;
		    position: absolute;
		    right: 29upx;
			.Manual{
				border-bottom: 1upx solid #F1F1F1;
				padding-bottom: 29upx;
				font-size:28upx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(38,37,80,1);
				padding: 10upx 36upx 20upx 36upx;
			}
	}
	}
</style>
