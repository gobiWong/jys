<template>
	<view class="">
		<my-head title="活动" :showBorderShadow="false">
			<view slot="right"><image @tap="Toview" src="/static/assert/recording.png" style="width: 35upx;height: 36upx;"></image></view>
		</my-head>
		<view class="page-container">
			<!-- 项目简单信息 -->
			<view class="activity-head">
				<view class="project-name">{{ JSONdata.projectName }}</view>
				<view class="project-des">{{ JSONdata.projectIntroduction }}</view>
				<view class="project-tags">
					<view v-if="JSONdata.purchaseStatus === 0">
						<image src="/static/assert/yure.png" style="width: 23upx;height: 29upx;" mode=""></image>
						<text>预热</text>
					</view>
					<view v-if="JSONdata.purchaseStatus === 1">
						<image src="/static/assert/yure.png" style="width: 23upx;height: 29upx;" mode=""></image>
						<text>申购</text>
					</view>
					<view v-if="JSONdata.purchaseStatus >= 2">
						<image src="/static/assert/yure.png" style="width: 23upx;height: 29upx;" mode=""></image>
						<text>公布中签</text>
					</view>
					<view v-if="JSONdata.purchaseStatus >= 2"><text>摇号</text></view>
				</view>
			</view>
			<!-- 申购信息 -->
			<view class="activity-top">
				<view class="project-form">
					<view>
						<view v-if="JSONdata.purchaseStatus === 1">申购开始时间:</view>
						<view v-if="JSONdata.purchaseStatus >= 2">摇号结束时间:</view>
						<view>{{ JSONdata.purchaseStartTime }}</view>
					</view>
					<view>
						<view>销售价格:</view>
						<view>{{ JSONdata.unitPrice }}{{ virtualWalletName }}</view>
					</view>
					<view>
						<view>销售总量:</view>
						<view>{{ JSONdata.issuanceTotalAmount }}TOKEN</view>
					</view>
					<view>
						<view>申购下限:</view>
						<view>{{ JSONdata.personalReservationBottomLimit }}TOKEN</view>
					</view>
					<view>
						<view>申购上限:</view>
						<view>{{ JSONdata.personalReservationTopLimit }}TOKEN</view>
					</view>
					<view>
						<view>锁仓机制:</view>
						<view>{{ JSONdata.lockedWarehouseStatus }}</view>
					</view>
					<view class="form-link">
						<view @tap="webLink(JSONdata.officialWebsitePath)">
							<image src="/static/assert/inter-icon.png" mode="" style="vertical-align: middle;width: 30upx;height: 30upx;"></image>
							<text>官网</text>
						</view>
						<view>
							<image src="/static/assert/white-book.png" mode="" style="vertical-align: middle;width: 31upx;height: 31upx;"></image>
							<text>白皮书</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 分割线 -->
			<view class="activity-line"></view>
			<!-- 申购周期 -->
			<view class="subscription-cycle">
				<view class="cycle-head">
					<text>申购周期</text>
					<text>查看规则详情</text>
				</view>
				<view class="cycle-timeline">
					<view class="timeline-item  " :class="{ actived: JSONdata.purchaseStatus >= 0, current: JSONdata.purchaseStatus === 0 }">
						<view class="tail"></view>
						<view class="node"></view>
						<view class="wrapper">
							<view class=""><view class="">预热</view></view>
							<view v-if="JSONdata.purchaseStatus === 0">预热阶段-即将开启申购</view>
						</view>
					</view>
					<view class="timeline-item" :class="{ actived: JSONdata.purchaseStatus >= 1, current: JSONdata.purchaseStatus === 1 }">
						<view class="tail"></view>
						<view class="node"></view>
						<view class="wrapper">
							<view>
								<view>申购</view>
								<view>{{ JSONdata.purchaseStartTime }}</view>
							</view>
							<view v-if="JSONdata.purchaseStatus === 1">申购阶段-请您在规定时间内完成申购确认</view>
						</view>
					</view>
					<view class="timeline-item" :class="{ actived: JSONdata.purchaseStatus >= 2, current: JSONdata.purchaseStatus === 2 }">
						<view class="tail"></view>
						<view class="node"></view>
						<view class="wrapper">
							<view class="">
								<view class="">摇号</view>
								<view>{{ JSONdata.purchaseEndTime }}</view>
							</view>
						</view>
					</view>
					<view class="timeline-item" :class="{ actived: JSONdata.purchaseStatus >= 3, current: JSONdata.purchaseStatus === 3 }">
						<view class="tail"></view>
						<view class="node"></view>
						<view class="wrapper">
							<view class="">
								<view class="">公布结果</view>
								<view>{{ JSONdata.signedTheTime }}</view>
							</view>
							<view v-if="JSONdata.purchaseStatus === 3">中签公示·如若您中签，平台将对您的账号进行扣款</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 中签公示 -->
			<view class="publicity" v-if="JSONdata.purchaseStatus === 3">
				<view class="activity-line"></view>
				<view class="publicity-head">
					<text>中签公示</text>
					<text>查看规则详情</text>
				</view>
				<view class="publicity-body">
					<view>
						<text>中签号总数</text>
						<text>{{ signNumber }}</text>
					</view>
					<view>
						<text>中签率</text>
						<text>{{ signNumberRate }}%</text>
					</view>
				</view>
			</view>
			<!-- 中签结果 -->
			<view class="result" v-if="JSONdata.purchaseStatus === 3">
				<view class="activity-line"></view>
				<view class="result-head"><text>中签结果</text></view>
				<view class="result-body">
					<view v-show="results.length != 0">
						<view v-for="(item, index) in results" :key="index" class="result-numbers">
							<text>{{ item.purchaseNumber }}</text>
						</view>
					</view>
					<view v-show="results.length != 0" @tap="single" class="order-detail">查看订单详情</view>
					<!-- 暂无中签号码 -->
					<view class="chaImg"><image src="../../../static/assert/chahua.png" mode=""></image></view>
					<view class="chaImg-one" v-show="results.length == 0">未中签</view>
				</view>
			</view>
			<!-- 申购信息米有数据 -->
			<view class="result" v-show="listUserPurchaseNumber.length == 0" v-if="JSONdata.purchaseStatus === 1 && userinfo.token">
				<view class="activity-line"></view>
				<view class="result-head"><text>申购信息</text></view>
				<view class="result-body">
					<view></view>
					<!-- 暂无中签号码 -->
					<view class="chaImg"><image style="width: 294upx;height: 236upx;" src="../../../static/assert/zanwushengou.png" mode=""></image></view>
					<view class="chaImg-one">暂无申购信息</view>
				</view>
			</view>
			<!-- 申购信息有数据 -->
			<view class="result" v-show="listUserPurchaseNumber.length != 0" v-if="JSONdata.purchaseStatus === 1 && userinfo.token">
				<view class="activity-line"></view>
				<view class="result-head"><text>申购信息</text></view>
				<view class="result-body">
					<view>
						<view class="result-numbers">
							<text v-for="(item, index) in listUserPurchaseNumber" :key="index">{{ item }}</text>
						</view>
					</view>
					<view @tap="singleId(id)" class="order-detail">查看订单详情</view>
				</view>
			</view>
			<!-- 分割线 -->
			<view class="activity-line"></view>
			<!-- 项目详情 -->
			<view class="project-details">
				<view class="project-details--name">项目详情</view>
				<view class="project-introduction">
					<view class="introduction-name">项目简介</view>
					<view class="introduction-text">{{ JSONdata.projectDescription }}</view>
					<view class="introduction-from">
						<view>
							<text>发行总量</text>
							<text>{{ JSONdata.issuanceTotalAmount }}</text>
						</view>
						<view>
							<text>代币种类</text>
							<text>{{ JSONdata.tokenType }}</text>
						</view>
						<view>
							<text>私募发行价格</text>
							<text>{{ JSONdata.privatePlacementPrice }}</text>
						</view>
						<view>
							<text>私募发行量</text>
							<text>{{ JSONdata.privatePlacementNumber }}</text>
						</view>
						<view>
							<text>私募锁仓时间</text>
							<text>{{ JSONdata.privatePlacementLockTime }}个月</text>
						</view>
						<view>
							<text>私募日期</text>
							<text>{{ JSONdata.privatePlacementDate }}</text>
						</view>
					</view>
				</view>
			</view>
			<view>
				<view class="chart-head">代币分配比例及解锁时间</view>
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchRing" />
				
			</view>
			<view class="tips">
				<view>投票奖励:不锁仓</view>
				<view>基金会募资:不锁仓</view>
				<view>挖矿奖励:主网上线之前不挖矿</view>
				<view>团队激励:上交易所两年后每年解锁50%</view>
				<view>基石轮募资:上交易所第三个月后每月解仓</view>
				<view>基金会生态及社区建设:主网上线后释放，不锁仓</view>
			</view>
		</view>
		<view class="bottom-button">
			<button @tap="loginImg" v-if="!userinfo.token" type="primary">登录</button>
			<button v-if="JSONdata.purchaseStatus === 0" type="primary">距离开始还剩{{ day }}天{{ hour }}时{{ sec }}秒</button>
			<button
				v-if="JSONdata.purchaseStatus === 1"
				@tap="
					purchase(
						id,
						virtualWalletId,
						virtualWalletName,
						JSONdata.unitPrice,
						JSONdata.configurationQuota,
						JSONdata.totalSalesAmount,
						JSONdata.projectName,
						results,
						JSONdata.purchaseStartTime,
						showImg,
						listUserPurchaseNumber,
						JSONdata.personalReservationBottomLimit,
						JSONdata.personalReservationTopLimit
					)
				"
				type="primary"
			>
				申购
			</button>
			<button v-if="JSONdata.purchaseStatus === 2" type="primary">摇号中</button>
			<button style="background: #C9C9C9;color: #666666;" v-if="JSONdata.purchaseStatus === 3">已结束</button>
		</view>
		<!-- 判断是否身份认证 -->
		<view class="mention-one">
			<view v-if="aaa" id="myModal" class="modal">
				<!-- 弹窗内容 -->
				<view class="modal-content">
					<view>申购认证提示</view>
					<view><image src="../../../static/assert/anquantishi.png" mode=""></image></view>
					<view>您还未进行身份认证</view>
					<view class="certification">
						<view @tap="dianji">取消</view>
						<view @tap="$nav('/pages/mein/certification/index')">去认证</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹框 -->
		<view @tap="breakdown" v-if="play" class="bounced">
			<!-- 弹窗内容 -->
			<view class="bounced-content">
				<!-- 上 -->
				<view @tap="tiger(id)" class="bounced-top">
					<view><image src="../../../static/assert/shengouchuli.png" mode=""></image></view>
					<view>申购订单</view>
				</view>
				<!-- 下 -->
				<view @tap="jump(id)" class="bounced-top">
					<view><image src="../../../static/assert/zhongqiangongbu.png" mode=""></image></view>
					<view>中签订单</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
import { makeNewSettingDetails, tokenTypeList, Publicity, signNumber } from '@/api/actved';
import request from '@/utils/request';
var _self;
var canvaRing = null;
export default {
	

	onLoad(options) {
		// 判断是否登录
		if (!this.islogin) {
			this.$nav('/pages/auth/login');
		}
		// 判断身份证
		if (this.userinfo.authorizeLevel != 2) {
			this.aaa = true;
		} else {
			this.aaa = false;
		}
		this.id = options.id;
		this.showImg = options.showImg;
		this.virtualWalletName = options.virtualWalletName;
		this.virtualWalletId = options.virtualWalletId;
		makeNewSettingDetails(this.id).then(res => {
			if (res.data.code == 200) {
				this.JSONdata = res.data.data;
				this.getEndtimeS();
				// this.countDown(); //倒计时
				this.timeDown();
				console.log(res.data, 565656565656);
			}
			try {
				this.JSONdata = JSON.parse(res.data).data;
			} catch (e) {
				//TODO handle the exception
				this.JSONdata = res.data.data;
			}
		});
		tokenTypeList(this.id).then(res => {
			if (res.data.code === 200) {
				this.chartData = res.data.data;
				this.chartDatas();
				// alert(this.chartData)
				this.showRing();
			}
			try {
				this.chartData = JSON.parse(res.data).data;
			} catch (e) {
				this.chartData = res.data.data;
				//TODO handle the exception
			}
		});
		// 中签公示接口
		Publicity(this.id).then(res => {
			console.log(res.data, 888888888);
			if (res.data.code == 200) {
				this.signNumber = res.data.signNumber;
				this.signNumberRate = res.data.signNumberRate;
				console.log(this.signNumber, 77777);
			}
			try {
				this.signNumber = JSON.parse(res.data).signNumber;
				this.signNumberRate = JSON.parse(res.data).signNumberRate;
			} catch (e) {
				//TODO handle the exception
				this.signNumber = res.data.signNumber;
				this.signNumberRate = res.data.signNumberRate;
			}
		});
		// 中签号码
		signNumber(this.id).then(res => {
			console.log(res.data, 1119999999);
			if (res.data.code == 200) {
				this.results = res.data.data;
			}
			try {
				this.results = JSON.parse(res.data).data;
			} catch (e) {
				//TODO handle the exception
				this.results = res.data.data;
			}
		});
		let time = setInterval(() => {
			if (this.flag == true) {
				clearInterval(time);
			}
			this.timeDown();
		}, 500);
	},
	data() {
		return {
			play: false, //弹框
			showImg: '',
			listUserPurchaseNumber: [],
			flag: false,
			endTime: '2018-8-21 16:29:20',
			day: '', //天
			hour: '', //时
			sec: '', //秒
			id: '',
			results: [],
			virtualWalletName: '',
			virtualWalletId: '',
			cWidth: '',
			cHeight: '',
			JSONdata: {},
			aaa: true,
			signNumber: '',
			signNumberRate: '',
			chartData: {
				series: [
					{
						name: '基石轮募资',
						data: 20,
						disableLegend: 'false'
					},
					{
						name: '挖矿奖励',
						data: 18,
						disableLegend: 'false'
					},
					{
						name: '基金会生态及社区建设',
						data: 8,
						disableLegend: 'false'
					},
					{
						name: '投票奖励',
						data: 10,
						disableLegend: 'false'
					}
				]
			}
		};
	},
	computed: {
		...mapState('user', ['userinfo']),
		...mapGetters(['islogin'])

		// 图表
	},
	created() {
		this.cWidth = uni.upx2px(390);
		this.cHeight = uni.upx2px(450);
		this.Available();
	},

	methods: {
		Toview() {
			this.play = true;
		},
		breakdown() {
			this.play = false;
		},
		// 申购列表跳转
		tiger(num) {
			uni.navigateTo({
				url: './details?id=' + num
			});
		},
		// 中签订单APP列表跳转
		jump(num) {
			uni.navigateTo({
				url: './details?id=' + num
			});
		},
		chartDatas() {
			let list = [];
			console.log(this.chartData);
			for (var i = 0; i < this.chartData.length; i++) {
				list.push({ name: this.chartData[i].tokenTypeName, data: this.chartData[i].tokenTypeRate });
			}

			this.chartData = list;
			console.log(this.chartData, 5555555555555555555);
			return list;
		},
		// 申购详情
		Available() {
			var _this = this
			request('/userMakeNewSettingRecord/detail', 'GET', {
				token: this.userinfo.token,
				makeNewSettingId: this.id
			}).then(res => {
				console.log(res.data, 666666111);
				console.log(this.listUserPurchaseNumber, 778787878);
				
				if (res.data.code == 200) {
					if(!res.data.data){
						_this.listUserPurchaseNumber.length = 0;
						console.log(_this)
					}else{
						_this.listUserPurchaseNumber = res.data.data.listUserPurchaseNumber;
					}
				}
				try {
					if(!res.data.data){
						_this.listUserPurchaseNumber.length = 0
					} else {
						_this.listUserPurchaseNumber = JSON.parse(res.data).data.listUserPurchaseNumber;
					}
				} catch (e) {
					if(!res.data.data){
						_this.listUserPurchaseNumber.length = 0
					} else {
						_this.listUserPurchaseNumber = res.data.data.listUserPurchaseNumber;
					}
					
				}
			});
		},
		getEndtimeS() {
			console.log(this.JSONdata.purchaseStatus, 555555555555555555555);
			if (this.JSONdata.purchaseStatus == 0) {
				this.endTime = this.JSONdata.purchaseStartTime;
			}
			if (this.JSONdata.purchaseStatus == 1) {
				this.endTime = this.JSONdata.purchaseEndTime;
			}
			if (this.JSONdata.purchaseStatus == 2) {
				this.endTime = this.JSONdata.signedTheTime;
			}
			if (this.JSONdata.purchaseStatus == 3) {
				this.endTime = this.JSONdata.signedTheTime;
			}
			console.log(this.endTime, 3333333333);
		},
		timeDown() {
			const endTime = new Date(this.endTime);
			const nowTime = new Date();
			let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
			let d = parseInt(leftTime / (24 * 60 * 60));
			let h = this.formate(parseInt((leftTime / (60 * 60)) % 24));
			let m = this.formate(parseInt((leftTime / 60) % 60));
			let s = this.formate(parseInt(leftTime % 60));
			if (leftTime <= 0) {
				this.flag = true;
				this.day = this.hour = this.sec = this.time = 0;
				return false;
			}
			// this.time = `${d}天${h}小时${m}分${s}秒`     // 需要修改时间样式的话 ，比如需要什么30分钟倒计时，就只保留分和秒
			this.day = d;
			this.hour = h;
			// this.minute = m;
			this.sec = s;
		},
		formate(time) {
			if (time >= 10) {
				return time;
			} else {
				return `0${time}`;
			}
		},
		// 关闭
		dianji() {
			this.aaa = false;
		},
		webLink(url) {
			// #ifdef APP-PLUS
			plus.runtime.openURL(url);
			// #endif
			// #ifdef H5
			location.href = url;
			// #endif
		},
		
		showRing() {
			canvaRing = new uCharts({
				$this: this,
				canvasId: 'canvasColumn',
				type: 'ring',
				fontSize: 11,
				legend: false,
				extra: {
					pie: {
						offsetAngle: -45,
						ringWidth: 40,
						labelWidth: 15
					}
				},
				background: '#FFFFFF',
				pixelRatio: 1,
				series: this.chartData.series,
				animation: true,
				width: this.cWidth,
				height: this.cHeight,
				disablePieStroke: false,
				dataLabel: false,
				
			});
		},
		// showRing() {
		// 	canvaRing = new uCharts({
		// 		$this: this,
		// 		canvasId: 'canvasColumn',
		// 		type: 'ring',
		// 		fontSize: 11,
		// 		legend: true,
		// 		extra: {
		// 			pie: {
		// 				offsetAngle: -45,
		// 				ringWidth: 40,
		// 				labelWidth: 15
		// 			}
		// 		},
		// 		background: '#FFFFFF',
		// 		pixelRatio: 1,
		// 		series: this.chartDatas,
		// 		animation: true,
		// 		width: this.cWidth,
		// 		height: this.cHeight,
		// 		disablePieStroke: true,
		// 		dataLabel: true
		// 	});
		// },
		touchRing(e) {
			canvaRing.showToolTip(e, {
				format: function(item) {
					return item.name + ':' + item.data;
				}
			});
		},

		// 跳转详情
		singleId(num) {
			uni.navigateTo({
				url: './details?id=' + num
			});
		},
		// 跳转登录
		loginImg() {
			uni.switchTab({
				url: '../../mein/index'
			});
		},
		// 点击申购
		purchase(num, num1, num2, num3, num4, num5, num6, num7, num8, num9, num10, num11, num12) {
			console.log(num6)
			uni.navigateTo({
				url:
					'./submit?id=' +
					num +
					'&virtualWalletId=' +
					num1 +
					'&virtualWalletName=' +
					num2 +
					'&unitPrice=' +
					num3 +
					'&configurationQuota=' +
					num4 +
					'&totalSalesAmount=' +
					num5 +
					'&projectName=' +
					num6 +
					'&results=' +
					num7 +
					'&purchaseStartTime=' +
					num8 +
					'&showImg=' +
					num9 +
					'&listUserPurchaseNumber=' +
					num10 +
					'&personalReservationBottomLimit=' +
					num11 +
					'&personalReservationTopLimit=' +
					num12
			});
		}
	},
	mounted() {
		this.showRing();
	}
	// computed: {
	// 	...mapState('user', ['userinfo'])
	// }
};
</script>

<style scoped lang="scss">
.activity-head {
	position: relative;
	background-color: #6881ff;
	height: 489upx;
	overflow: hidden;
	padding: 0 30upx;

	& > .project-name {
		font-size: 46px;
		line-height: 46upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		margin-top: 36upx;
	}

	& > .project-des {
		margin-top: 29upx;
		font-size: 26px;
		line-height: 26upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(219, 224, 246, 1);
	}

	& > .project-tags {
		display: flex;
		margin-top: 20upx;

		& > view {
			padding: 0 20upx;
			background: rgba(191, 201, 255, 0.2);
			border-radius: 25px;
			margin-right: 13upx;
			& > text {
				font-size: 28px;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(255, 212, 81, 1);
				line-height: 28upx;
				margin-left: 12upx;
			}
		}
	}
	z-index: -1;
}

.project-form {
	border-radius: 40upx 40upx 0px 0px;
	margin-top: -227upx;
	background-color: #fff;
	padding: 0 52upx;

	& > view {
		height: 86upx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		view {
			font-size: 28px;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
		}

		border-bottom: #f1f1f1 2px solid;
	}

	.form-link {
		& > view {
			display: flex;
			align-items: center;

			text {
				margin-left: 18upx;
				font-size: 30px;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(248, 209, 71, 1);
			}
		}

		& > view:last-child {
			text {
				color: #57c2f9;
			}
		}
	}

	& > view:last-child {
		padding-bottom: 14upx;
		border: 0;
	}
}

.activity-line {
	height: 10px;
	background: rgba(248, 248, 248, 1);
}

.subscription-cycle {
	.cycle-head {
		height: 150upx;
		align-items: center;
		padding: 0 30upx;
		justify-content: space-between;
		display: flex;

		& > text:first-child {
			font-size: 36px;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 36upx;
		}

		& > text:last-child {
			font-size: 24px;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(104, 129, 255, 1);
		}
	}

	.cycle-timeline {
		padding-left: 43upx;
		padding-right: 69upx;

		& > .timeline-item:last-child {
			.tail {
				display: none;
			}
		}

		.timeline-item {
			padding-bottom: 63upx;
			position: relative;
			padding-left: 47upx;

			.tail {
				background-color: #ececec;
				width: 8upx;
				height: 100%;
				position: absolute;
				left: 9upx;
				top: 0;
			}

			.node {
				width: 18upx;
				height: 18upx;
				background-color: #ececec;
				top: 0;
				left: 2upx;
				border-radius: 50%;
				position: absolute;
			}

			.wrapper {
				display: flex;
				justify-content: space-between;
				position: relative;
				top: -6upx;

				& > view:first-child {
					flex: 1;
					display: flex;
					justify-content: space-between;

					view {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						line-height: 30upx;
					}
				}
			}
		}

		.timeline-item.current {
			.tail {
				background-color: #efefef !important;
			}
			.wrapper {
				display: block;
				& > view:first-child {
					flex: 1;
					display: flex;
					justify-content: space-between;

					view {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						line-height: 30upx;
					}
				}
				& > view:last-child {
					font-size: 24px;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(170, 170, 170, 1);
					margin-top: 17upx;
				}
			}
		}

		.timeline-item.actived {
			.tail {
				background-color: #6881ff;
				width: 8upx;
				height: 100%;
				position: absolute;
				left: 9upx;
				top: 0;
			}

			.node {
				width: 18upx;
				height: 18upx;
				background-color: #6881ff;
				top: 0;
				left: 2upx;
				border-radius: 50%;
				position: absolute;
			}

			.node:after {
				content: ' ';
				width: 26upx;
				height: 26upx;
				position: absolute;
				top: -4upx;
				left: -4upx;
				border-radius: 50%;
				background-color: rgba(104, 129, 255, 0.4);
			}
		}
	}
}

.project-details {
	padding: 0 30upx;

	.project-details--name {
		font-size: 36px;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		height: 150upx;
		align-items: center;
		justify-content: space-between;
		display: flex;
	}

	.introduction-name {
		font-size: 30px;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(89, 89, 89, 1);
		line-height: 30upx;
		margin-bottom: 20upx;
	}

	.introduction-text {
		font-size: 28px;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 42px;
	}

	.introduction-from {
		border: 2upx solid #cccccc;
		border-radius: 10px;
		margin-top: 80upx;

		& > view {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 63upx;
			border-bottom: 2upx solid #ccc;

			& > tetx {
				font-size: 24px;
				font-family: PingFang SC;
				font-weight: 400;
			}

			& > text:first-child {
				color: #666666;
				padding-left: 30upx;
			}

			& > text:last-child {
				color: #333333;
				padding-right: 30upx;
			}
		}

		& > view:last-child {
			border-bottom: 0;
		}

		& > view:after {
			position: absolute;
			content: '';
			height: 100%;
			width: 2upx;
			background-color: #ccc;
			left: 50%;
			top: 0;
		}
	}
}

.charts {
	width: 750upx;
	height: 400upx;
	background-color: #ffffff;
}

.chart-head {
	text-align: center;
	font-size: 30px;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(51, 51, 51, 1);
	margin-top: 60upx;
	margin-bottom: 30upx;
}

.tips {
	padding-bottom: 120upx;
	padding-left: 30upx;

	& > view {
		font-size: 28px;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}
}

.bottom-button {
	position: fixed;
	bottom: 0;
	height: 112px;
	width: 100%;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 6px 14px 12px rgba(37, 37, 37, 0.1);
	padding: 21upx 45upx 15upx 45upx;
	box-sizing: border-box;

	& > button {
		height: 76upx;
		line-height: 76upx;
		margin: 0;
		background: linear-gradient(-45deg, #6881ff, #6f6fff);
	}
}

.publicity {
	& > .publicity-head {
		padding: 0 30upx;
		box-sizing: border-box;
		padding-top: 20upx;
		height: 130upx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		& > text:first-child {
			font-size: 36px;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 36upx;
		}

		& > text:last-child {
			font-size: 24px;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(104, 129, 255, 1);
		}
	}

	.publicity-body {
		padding: 0 49upx;
		box-sizing: border-box;

		& > view {
			padding: 0 6upx;
			height: 90upx;
			line-height: 90upx;
			border-bottom: 1px solid #f1f1f1;

			text {
				display: inline-block;
				line-height: 90upx;
				width: 50%;
				height: 100%;
				display: inline-block;
			}

			& > text:last-child {
				text-align: right;
			}
		}

		& > view:last-child {
			border-bottom: 0;
		}
	}
}

.result {
	& > .result-head {
		padding: 0 30upx;
		box-sizing: border-box;
		padding-top: 20upx;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		& > text {
			font-size: 36px;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 36upx;
		}
	}

	.result-body {
		padding: 0 49upx;
		box-sizing: border-box;
		padding-bottom: 39upx;

		& > view:first-child {
			padding: 0 6upx;
			height: 40upx;
			line-height: 40upx;
			border-bottom: 2upx solid #f1f1f1;
			display: flex;
			justify-content: space-between;
			padding-bottom: 29upx;
			.result-numbers {
				& > text {
					font-size: 28px;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					line-height: 28px;
					display: inline-block;
					margin-right: 40upx;
				}
			}
			.result-button {
				font-size: 20px;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(150, 150, 150, 1);
				border: 1px solid rgba(150, 150, 150, 1);
				border-radius: 10upx;
				padding: 0 10upx;
				line-height: 40upx;
			}
		}

		.order-detail {
			font-size: 28px;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(104, 129, 255, 1);
			text-align: center;
			line-height: 28upx;
			margin-top: 39upx;
		}
		// 没有中签
		.chaImg image {
			width: 273upx;
			height: 169upx;
			margin: 39upx auto;
			display: flex;
		}
		.chaImg-one {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			margin-top: 29upx;
			text-align: center;
		}
	}
}
// 判断身份证
.modal {
	display: block;
	/* 默认隐藏 */
	/*生成绝对定位的元素，相对于浏览器窗口进行定位。*/
	position: fixed;
	z-index: 999;
	left: 0;
	top: 0;
	/*设置弹窗位置*/
	padding-top: 210px;
	padding-bottom: 100px;
	/*浮在全屏上*/
	width: 100%;
	height: 100%;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.5);
	text-align: center;
}

/* 弹窗内容 */

.modal-content {
	/*弹窗背景色设置*/
	background-color: #fefefe;
	margin: auto;
	width: 90%;
	background: rgba(255, 255, 255, 1);
	border-radius: 10px;
	padding-bottom: 30px;
	& > view:nth-child(1) {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(104, 129, 255, 1);
		margin-top: 29upx;
	}
	& > view:nth-child(2) image {
		width: 77upx;
		height: 96upx;
		margin-top: 59upx;
	}
	& > view:nth-child(3) {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		margin-top: 59upx;
	}
	.certification {
		width: 100%;
		border-top: 1upx solid #f1f1f1;
		margin-top: 30upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		justify-items: center;
		& > view:nth-child(1) {
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(153, 153, 153, 1);
			margin-top: 45upx;
		}
		& > view:nth-child(2) {
			font-size: 32px;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(104, 129, 255, 1);
			margin-top: 45upx;
		}
	}
}
// 右上角弹框
.bounced {
	display: block;
	/* 默认隐藏 */
	/*生成绝对定位的元素，相对于浏览器窗口进行定位。*/
	position: fixed;
	z-index: 999;
	left: 0;
	top: 0;
	/*设置弹窗位置*/
	padding-top: 100px;
	padding-bottom: 100px;
	/*浮在全屏上*/
	width: 100%;
	height: 100%;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.5);
	text-align: center;
	.bounced-content {
		/*弹窗背景色设置*/
		background-color: #fefefe;
		margin: auto;
		width: 200upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10px;
		padding-bottom: 30px;
		position: absolute;
		right: 30upx;
		.bounced-top {
			display: flex;
			padding: 0upx 21upx;
			margin-top: 40upx;
			& > view:nth-child(1) image {
				width: 33upx;
				height: 33upx;
			}
			& > view:nth-child(2) {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				margin-left: 14upx;
			}
		}
	}
}
</style>
