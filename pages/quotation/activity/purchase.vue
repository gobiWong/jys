<template>
	<view>
		<!-- 图 -->
		<view class="image-one"><image :src="showImg" mode=""></image></view>
		<view class="home">
			<view class="home-one">
				<view>项目名称:</view>
				<view>{{ projectName }}</view>
			</view>
			<!-- 申购签号 -->
			<view class="home-two">
				<view>申购签号:</view>
				<view>{{ listUserPurchaseNumber }}</view>
			</view>
			<view class="home-free">
				<view>申购价格:</view>
				<view>{{ unitPrice }} {{ virtualWalletName }}</view>
			</view>
			<view class="home-free">
				<view>申购数量:</view>
				<view>{{ purchase }} TOKEN</view>
			</view>
			<view class="home-free">
				<view>申购时间:</view>
				<view>{{ purchaseStartTime }}</view>
			</view>
			<!-- 查看订单详情 -->
			<view class="enough"><button @tap="details(id)">查看订单详情</button></view>
		</view>
		<!-- 恭喜中签弹框 -->
		<view v-if="sign" class="congratulations">
			<view class="purge">
				<view>恭喜您已中签！</view>
				<view class="home-free">
					<view>项目名称:</view>
					<view>{{ JSONdate.projectName }}</view>
				</view>
				<view class="home-free">
					<view>中签号码数:</view>
					<view>{{ JSONdate.actualSignNumber }}</view>
				</view>
				<view class="home-free">
					<view>未中签号码数:</view>
					<view>{{ JSONdate.unsignNumber }}</view>
				</view>
				<view class="home-two">
					<view>中签号码:</view>
					<view style="color:#4CDFB0" v-show="item.status == 1 ? true : false" v-for="(item, index) in JSONdate.listUserPurchaseNumber" :key="index">
						{{ item.purchaseNumber }}
					</view>
				</view>
				<view class="home-free">
					<view>未中签号码:</view>
					<view style="color:red" v-show="item.status == 0 ? true : false" v-for="(item, index) in JSONdate.listUserPurchaseNumber" :key="index">
						{{ item.purchaseNumber }}
					</view>
				</view>
				<view class="home-free">
					<view>申购价格:</view>
					<view>{{ JSONdate.unitPrice }} {{ JSONdate.virtualWalletName }}</view>
				</view>
				<view class="home-free">
					<view>成交数量:</view>
					<view>{{ JSONdate.actualTransactionAccount }} TOKEN</view>
				</view>
				<view style="border: none;" class="home-free">
					<view>中签时间:</view>
					<view>{{ JSONdate.createTime }}</view>
				</view>
				<view class="home-six"><view @tap="detailsr(id)">查看订单详情</view></view>
			</view>
			<!-- 关闭 -->
			<view class="Through"><image @tap="Shutdown" src="../../../static/assert/guanbi.png" mode=""></image></view>
		</view>
	</view>
</template>

<script>
import request from '@/utils/request';
import { mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			showImg: '', //图片
			virtualWalletName: '',
			projectName: '',
			unitPrice: '',
			results: '',
			purchaseStartTime: '',
			purchase: '',
			id: '',
			JSONdate: [],
			Winning: [],
			sign: false,
			status: '',
			listUserPurchaseNumber: '',
			Week: [],
			openSign: ''
		};
	},
	onLoad(options) {
		this.id = options.id;
		this.listUserPurchaseNumber = options.listUserPurchaseNumber;
		this.showImg = options.showImg;
		this.virtualWalletName = options.virtualWalletName;
		this.projectName = options.projectName;
		this.unitPrice = options.unitPrice;
		this.results = options.results;
		this.purchaseStartTime = options.purchaseStartTime;
		this.purchase = options.purchase;

		setInterval(() => {
			this.Checkbox();
		}, 20000);
	},
	created() {
		// this.Checkbox();
	},
	methods: {
		Shutdown() {
			let params = [];
			if (this.JSONdates.length != '') {
				this.JSONdates.forEach(item => {
					params.push(item.openSignRecordId);
				});
			}
			request('/userPurchaseNumber/popUpType', 'POST', {
				openSignRecordId: params
			}).then(res => {
				// if (res.data.code == 200) {
				this.sign = false;
				// }
			});
		},

		// 查看订单详情
		details(num) {
			uni.navigateTo({
				url: './details?id=' + num
			});
		},
		detailsr(num) {
			uni.navigateTo({
				url: './details?id=' + num
			});
		},
		// 中签弹框
		Checkbox() {
			request('/userPurchaseNumber/signNumberPopUp', 'GET', {
				token: this.userinfo.token
			}).then(res => {
				console.log(res.data, 5555);
				if (res.data.code == 200) {
					this.JSONdate = res.data.data[0];
					this.JSONdates = res.data.data;
					// if (res.data.data[0].actualSignNumber == 0) {
					// 	this.sign = false;
					// } else {
					// 	this.JSONdate = res.data.data[0];
					// 	this.JSONdates = res.data.data;
					// }
				}
				try{
					this.JSONdate = JSON.parse(res.data).data[0];
					this.JSONdates = JSON.parse(res.data).data.data;
				}catch(e){
					//TODO handle the exception
					this.JSONdate = res.data.data[0];
					this.JSONdates = res.data.data;
				}

				// 判断
				if (res.data.data.actualSignNumber != 0) {
					this.sign = true;
				} else {
					this.sign = false;
				}
			});
		}
	},
	computed: {
		...mapState('user', ['userinfo'])
	}
};
</script>

<style scoped lang="scss">
.image-one image {
	width: 196upx;
	height: 196upx;
	border-radius: 50%;
	top: 50upx;
	margin: 0 auto;
	display: flex;
}
.home {
	padding: 0 30upx;
	.home-one {
		display: flex;
		justify-content: space-between;
		height: 2upx;
		width: 100%;
		height: 90upx;
		border-bottom: 2upx solid #e6e6e6;
		margin-top: 110upx;
		& > view:nth-child(1) {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 90upx;
		}
		& > view:nth-child(2) {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 90upx;
		}
	}
	.home-two {
		display: flex;
		justify-content: space-between;
		height: 2upx;
		width: 100%;
		height: 100%;
		border-bottom: 2upx solid #e6e6e6;
		margin-top: 39upx;
		padding-bottom: 30upx;
		& > view:nth-child(1) {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 39upx;
		}
		& > view:nth-child(2) {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(104, 129, 255, 1);
			line-height: 39upx;
			width: 70%;
			height: 100%;
			text-align: right;
		}
	}
	.home-free {
		display: flex;
		justify-content: space-between;
		height: 2upx;
		width: 100%;
		height: 90upx;
		border-bottom: 2upx solid #e6e6e6;
		margin-top: 39upx;
		& > view:nth-child(1) {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 45upx;
		}
		& > view:nth-child(2) {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 45upx;
		}
	}
	.enough button {
		position: absolute;
		bottom: 100upx;
		width: 90%;
		height: 76upx;
		background: linear-gradient(135deg, rgba(104, 129, 255, 1), rgba(111, 111, 255, 1));
		border-radius: 10upx;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
}
// 中签弹框
.congratulations {
	width: 100%;
	height: 100%;
	display: block;
	/* 默认隐藏 */
	/*生成绝对定位的元素，相对于浏览器窗口进行定位。*/
	position: fixed;
	z-index: 999;
	left: 0;
	top: 0;
	/*设置弹窗位置*/
	padding-top: 134upx;
	padding-bottom: 58upx;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.5);
	text-align: center;
	.purge {
		padding: 0 30upx;
		width: 85%;
		padding-bottom: 58upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		margin: 0 auto;
		& > view:nth-child(1) {
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(104, 129, 255, 1);
			padding-top: 59upx;
		}
		.home-free {
			display: flex;
			justify-content: space-between;
			height: 2upx;
			width: 100%;
			height: 90upx;
			border-bottom: 2upx solid #e6e6e6;
			// margin-top: 90upx;
			& > view:nth-child(1) {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 90upx;
			}
			& > view:nth-child(2) {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 90upx;
			}
		}
		.home-two {
			display: flex;
			justify-content: space-between;
			height: 2upx;
			width: 100%;
			height: 100%;
			border-bottom: 2upx solid #e6e6e6;
			margin-top: 39upx;
			padding-bottom: 30upx;
			& > view:nth-child(1) {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 39upx;
			}
			& > view:nth-child(2) {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(104, 129, 255, 1);
				line-height: 39upx;
				width: 70%;
				height: 100%;
				text-align: right;
			}
		}
		.home-six view {
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(104, 129, 255, 1);
			margin-top: 54upx;
		}
	}
	// 关闭
	.Through image {
		width: 50upx;
		height: 50upx;
		margin-top: 30upx;
	}
}
</style>
