<template>
	<view>
		<my-head :title='lang.all'>
			<template slot='right'>
				<image @tap='openDrawer' src="../../../static/assert/filter-icon-black.png" class='recording-icon'></image>
			</template>
			<template slot='bottom'>
				<view class="tabs">
					<text @tap="chooseChange(0)" :class="[chooseType == 0?'chooseNow':'']">{{lang.Commissioned}}</text>
					<text @tap="chooseChange(1)" :class="[chooseType == 1?'chooseNow':'']">{{lang.history}}</text>
					<text @tap="chooseChange(2)" :class="[chooseType == 2?'chooseNow':'']">{{lang.detail}}</text>
				</view>
			</template>
		</my-head>
		<view class="container" :style="{paddingTop: paddingTop}">


			<!-- 当前委托 -->
			<view v-if="chooseType == 0">
				<!-- 委托列表 -->
				<view class="data-list">
					<view class="data-li" v-for="(item,index) in dataList_" :key='index'>
						<view class="data-head">
							<view class="head-left">
								<text style="color: #4CDFB0;font-size: 32upx;">{{item.tradeType}}</text>
								<text style="color: #2D2F56;font-size: 32upx;">{{item.virtualWalletPairName}}</text>
								<text style="margin-left: 21upx;">{{item._createTime}}</text>
							</view>
							<text class="undo" @tap="update(item.id)">{{lang.undo}}</text>

						</view>
						<view class="data-body">
							<view>
								<view>
									<text>{{lang.pricerr}}({{item.motherCoinName}})</text>
									<text>{{item.tradePrice}}个</text>
								</view>
								<view>
									<text>{{lang.numberr}}({{item.childCoinName}})</text>
									<text>{{item.tradeAmount}}个</text>
								</view>
								<view>
									<text>{{lang.clinch}}({{item.childCoinName}})</text>
									<text>{{item.alreadyAmount}}个</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 历史委托 -->
			<view v-if="chooseType == 1">
				<!-- 委托列表 -->
				<view class="data-list">
					<view class="data-li" v-for="(item,index) in dataList_" :key='index*10'>
						<view class="data-head">
							<view class="head-left">
								<text style="color: #4CDFB0;font-size: 32upx;">{{item.tradeType}}</text>
								<text style="color: #2D2F56;font-size: 32upx;">{{item.virtualWalletPairName}}</text>
							</view>
							<text class="undo" v-if="item.tradeStatus == 0" style="color: #2D2F56;font-size: 32upx;">{{lang.Trading}}</text>
                            <text class="undo" v-if="item.tradeStatus == 1" style="color: #2D2F56;font-size: 32upx;">{{lang.completed}}</text>
                            <text class="undo" v-if="item.tradeStatus == 2" style="color: #2D2F56;font-size: 32upx;">{{lang.removed}}</text>
						</view>
						<view class="data-body">
							<view>
								<view>
									<text>{{lang.time}}</text>
									<text>{{item._createTime}}</text>
								</view>
								<view>
									<text>{{lang.Entrusted}}(USDT)</text>
									<text>{{item.tradePrice}}个</text>
								</view>
								<view>
									<text>{{lang.amount}}({{item.childCoinName}})</text>
									<text>{{item.tradeAmount}}个</text>
								</view>
							</view>
							<view>
								<view>
									<text>{{lang.Clincha}}({{item.motherCoinName}})</text>
									<text>{{item.alreadyAmount*item.tradePrice}}个</text>
								</view>
								<view>
									<text>{{lang.pricerr}}({{item.motherCoinName}})</text>
									<text>{{item.tradePrice}}个</text>
								</view>
								<view>
									<text>{{lang.volume}}({{item.childCoinName}})</text>
									<text>{{item.alreadyAmount}}个</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 成交明细 -->
			<view v-if="chooseType == 2">
				<!-- 委托列表 -->
				<view class="data-list">
					<view class="data-li" v-for="(item,index) in dataList_" :key='index*100'>
						<view class="data-head">
							<view class="head-left">
								<text style="color: #4CDFB0;font-size: 32upx;">{{item.tradeType}}</text>
								<text style="color: #2D2F56;font-size: 32upx;">{{item.virtualWalletPairName}}</text>
							</view>
							<text class="undo" style="color: #2D2F56;font-size: 32upx;">{{lang.been}}</text>
						</view>
						<view class="data-body">
							<view>
								<view>
									<text>{{lang.time}}</text>
									<text>{{item._createTime}}</text>
								</view>
								<view>
									<text>{{lang.Entrusted}}(USDT)</text>
									<text>{{item.tradePrice}}</text>
								</view>
								<view>
									<text>{{lang.amount}}({{lang.a}})</text>
									<text>{{item.tradeAmount}}</text>
								</view>
							</view>
							<view>
								<view>
									<text>{{lang.Clincha}}({{item.childCoinName}}个)</text>
									<text>{{item.totalAmount}}</text>
								</view>
								<!-- <view>
									<text>成交价({{item.motherCoinName}})</text>
									<text>{{tradePrice}}</text>
								</view> -->
								<view>
									<text>{{lang.poundage}}({{item.motherCoinName}}个)</text>
									<text>0</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 侧滑部分 -->
		</view>
		<uni-drawer :visible="drawerVisible" mask="false" mode="right" @close="closeDrawer">
			<view class="uni-drawer-title">{{lang.screening}}</view>
			<view class="uni-drawer-content">
				<view>
					<view class="row-title">{{lang.data}}</view>
					<view class="option-tabs">
						<text :class="{actived:timeIndex===0}" @tap="timeIndex=0">1{{lang.day}}</text>
						<text :class="{actived:timeIndex===1}" @tap="timeIndex=1">7{{lang.day}}</text>
						<text :class="{actived:timeIndex===2}" @tap="timeIndex=2">1{{lang.months}}</text>
						<text :class="{actived:timeIndex===3}" @tap="timeIndex=3">三{{lang.months}}</text>
					</view>

				</view>
				<view>
					<view class="row-title">{{lang.trading}}</view>
					<view class="par-input">
						<input type="text" :placeholder="lang.currency" class="child-coin" v-model='childCoinName' />
						<text>/</text>
						<view @tap="showcoin=!showcoin" class="mother-coin">
							<input type="text" :placeholder="lang.Selective" disabled :value='motherCoinName' />
							<image src="/static/assert/coin_select.png"  :class="['coin_select_icon',showcoin?'show':''] "
							 style="width: 18upx;height: 10upx;"></image>
						</view>
					</view>
					<view class="coin-list" v-if="showcoin">
						<text v-for="(item,index) in motherCoinNames" :key='index'  @tap="selectCoin(item)">{{item}}</text>
					</view>
				</view>
				<view>
					<view class="row-title">{{lang.direction}}</view>
					<view class="option-tabs">
						<text :class="{actived:entrustType===''}" @tap="entrustType=''">{{lang.all}}</text>
						<text :class="{actived:entrustType===0}" @tap="entrustType=0">{{lang.buy}}</text>
						<text :class="{actived:entrustType===1}" @tap="entrustType=1">{{lang.sell}}</text>
					</view>
				</view>
				<!-- <view>
					<view class="row-title">隐藏已撤销的订单</view>
					<view class="option-tabs">
						<text>显示</text>
						<text>隐藏</text>
					</view>
				</view> -->
			</view>
			<view class="confirm-buttons">
				<text @tap="reset">{{lang.reset}}</text>
				<text @tap="submit">{{lang.screening}}</text>
			</view>
		</uni-drawer>

	</view>
</template>

<script>
	import {mapGetters,mapState} from 'vuex';
	import {uniDrawer} from '@dcloudio/uni-ui'
	import {listEntrust,transactionDetails,update,getChildWallet} from '@/api/quotation';
	import {toast} from '@/utils/toast'
	import {getCoinId} from '@/utils/server'
	export default {
		data() {
			return {
				pageNum: 1,
				chooseType: 0,
				drawerVisible: false,
				type: 1,
				dataList: [],
				showcoin: false,
				timeIndex: 3,
				entrustType: '',
				childCoinName: '',
				motherCoinName: '',
				childVirtualWalletPairId:'',
				motherVirtualWalletPairId:'',
				CoinList:[]
			};
		},

		components: {
			uniDrawer
		},
		created() {
			this.getData();
	
		},
		computed: {
            ...mapState(['lang']),
			...mapGetters(['motherCoinNames']),

			endTime() {
				var timestamp = new Date();

				let year = timestamp.getFullYear(),
					month = (timestamp.getMonth() + 1) < 10 ? '0' + (timestamp.getMonth() + 1) : (timestamp.getMonth() + 1),
					date = timestamp.getDate() < 10 ? '0' + timestamp.getDate() : timestamp.getDate();
				return year + '-' + month + '-' + date+' 23:59:59';
			},
			startTime() {
				let str;
				let timestamp = new Date();
				let year = timestamp.getFullYear(),
					month = (timestamp.getMonth() + 1),
					date = timestamp.getDate();
				// 0 1天 1 7天 2 一个月 3三个月
				switch (this.timeIndex) {
					case 0:

						break;
					case 1:
						if (date > 7) {
							date = date - 7;
						} else if (month > 1 && date <= 7) { //当月份大于1 天数小于7的时候 月数减一个 天数等于 下个天数加这个月天数减去 要倒退的7天

							date = (date - 7) + this.getMouthDays(year, month);
							month = month - 1;
						} else if (month <= 1 && date <= 7) {
							year = year - 1;
							date = (date - 7) + this.getMouthDays(year, month);
							month = 12;
						}
						break;

					case 2:
						if(month<=1){
							year=year-1;
							month=12;
						}else if (month === 3) {
							date = this.getMouthDays(year, month);
							month = month - 1;
							
						} else if (this.getMouthDays(year, month + 1) == date) { //如果是天数 等于这个月的所有天数 下个月到上个月的最后一天 如果不等月数减1
							date = this.getMouthDays(year, month)
							month = month - 1;
						} else {
							month = month - 1;
						}

						break;

					default:
						if (month === 5) {
							date = this.getMouthDays(year, month-2);
							month = month - 3;
							
						} else if (this.getMouthDays(year, month + 1) == date) { //如果是天数 等于这个月的所有天数 下个月到上个月的最后一天 如果不等月数减1
							
							date = this.getMouthDays(year, month-2)
							month = month - 3;
						} else {
							month = month - 3;
						}
						
						break;
				}
				str = year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date) +' 00:00:00';
				return str;
			},
			paddingTop() {
				return 89 + uni.getSystemInfoSync().statusBarHeight + 'px';
			},
			dataList_() {
				let list = [];
				this.dataList.map((ele) => {

					let createTimeList = ele.createTime.split(' ');
					let yearCreateTimeList = createTimeList[0].split('-');
					let secondCreateTimeList = createTimeList[1].split(':');
					let createTimeStr = secondCreateTimeList[0] + ':' + secondCreateTimeList[1] + ' ' + yearCreateTimeList[1] + '/' +
						yearCreateTimeList[2];
					ele._createTime = createTimeStr;
					try {
						ele.childCoinName = ele.virtualWalletPairName.split('/')[0];
						ele.motherCoinName = ele.virtualWalletPairName.split('/')[1];
					} catch (e) {
						ele.childCoinName = '';
						ele.motherCoinName = '';
					}


					list.push(ele);
				})
				return list;
			},
		},
		onReachBottom() {
			this.pageNum++;
			this.getData();
		},
		watch:{
			childCoinName(val){
				let item=this.CoinList.find((ele)=>{
					return ele.virtualWalletName===val.toUpperCase()
				})
				if(item!=undefined){
					this.childVirtualWalletPairId=item.childCoin;
				}else{
					this.childVirtualWalletPairId='';
				}
			},
			motherCoinName(val){
				
				getCoinId(this,val).then(id=>{
					this.motherVirtualWalletPairId=id;
					getChildWallet(id).then(res=>{
						if(res.data.code==200){
							this.CoinList=res.data.data;
						}else{
							this.CoinList=[];
						}
					})
				})
				
			},
		},
		methods: {
			update(id){
				update(id).then(res=>{
					if(res.data.code==200){
						this.getData();
					}else{
						toast(res.data.msg)
					}
				})
				
				
			},
			getMouthDays(year, mouth) { //查找上个月的天数
				mouth = mouth - 1;
				
				let count30Mouth = [4, 6, 9, 11];
				let count = '';
				if (mouth == 2) {
					if ((year % 4 === 0 && year % 100 != 0) || year % 400 === 0) {
						count = 29;
					} else {
						count = 28;
					}
				} else if (count30Mouth.includes(mouth)) {
					count = 30
				} else {
					count = 31;
				}
				return count;
			},
			selectCoin(val) {
				this.motherCoinName = val;
				this.showcoin = false;
			},
			chooseChange(val) {
				this.chooseType = val;
				this.getData();
			},
			getData() {
				if (this.chooseType != 2) {
					

			
					listEntrust({
						historyIs: this.chooseType,
						page: this.pageNum,
						startTime:this.startTime,
						endTime:this.endTime,
						childVirtualWalletPairId:this.childVirtualWalletPairId,
						motherVirtualWalletPairId:this.motherVirtualWalletPairId,
						entrustType:this.entrustType,
						type:this.entrustType
					}).then(res => {
						if (res.data.code == 200) {
							if (this.pageNum == 1) {
								this.dataList = res.data.data;
							} else {
								if (res.data.data.length != 0) {
									this.dataList = Array(...this.dataList.concat(res.data.data));
								}
							}
						}else{
							this.dataList=[];
						}
					})
				} else {
					
					transactionDetails({
						page: this.pageNum,
						startTime:this.startTime,
						endTime:this.endTime,
						childVirtualWalletPairId:this.childVirtualWalletPairId,
						motherVirtualWalletPairId:this.motherVirtualWalletPairId,
						type:this.entrustType
					}).then(res => {
						if (res.data.code == 200) {
							if (this.pageNum == 1) {
								this.dataList = res.data.data;
							} else {
								if (res.data.data.length != 0) {
									this.dataList = Array(...this.dataList.concat(res.data.data));
								}
							}
						}else{
							this.dataList=[];
						}
					})
				}
			},
			submit(){
				this.closeDrawer();
				this.getData();
			},
			reset() {
				this.timeIndex = 3;
				this.entrustType = '';
				this.childCoinName = '';
				this.motherCoinName = '';
			},
			openDrawer() {
				this.drawerVisible = true;
			},
			closeDrawer() {
				this.drawerVisible = false;
			},
			depthChange(e) {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.recording-icon {
		width:35upx;
		height: 31upx;
		vertical-align: middle;
	}


	.tabs {
		height: 51upx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		margin-top: 20upx;
		overflow: hidden;
		padding-bottom: 10upx;

		&>text {
			width: 160px;
			height: 51px;
			line-height: 51upx;
			text-align: center;
			border-radius: 5upx;
			font-size: 32upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(175, 174, 174, 1);
			padding-bottom: 17upx;

		}

		&>text.chooseNow {
			color: #6881FF;
			border-bottom: 2upx solid #6881FF;
			padding-bottom: 14upx;
		}

	}

	.container {
		// margin-top: 220upx;
		background: #FFFFFF;
	}

	.data-list {
		padding-bottom: 20upx;
		background: #FFFFFF;

		&>.data-li {
			height: 100%;
			background: #FFF;
			// margin-top: 14upx;
			padding-bottom: 39upx;

			box-shadow: 0upx 0upx 9upx 0upx rgba(53, 48, 15, 0.11);

			&>.data-head {
				padding: 0 30upx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;

				.icon {
					width: 58upx;
					height: 51upx;
					margin-top: 21upx;
				}

				.head-left {
					margin-top: 19upx;

					text {
						display: inline-block;
					}

					&>text:first-child {
						margin-right: 10upx;
					}
				}

				.undo {
					font-size: 28upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(104, 129, 255, 1);
					margin-top: 20upx;
				}
			}
		}
	}

	.data-body {
		padding: 0 30upx;
		box-sizing: border-box;
		margin-top: 18upx;
	}

	.data-body>view {
		display: flex;
		justify-content: space-between;
	}

	.data-body>view>view {
		width: 33%;
	}

	.data-body>view>view:last-child {
		width: 25%;

	}

	.data-body>view>view>text {
		display: block;
		font-size: 24upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(125, 125, 125, 1);
	}

	.uni-drawer-title {
		font-size: 36px;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(45, 47, 86, 1);
		margin-top: 65upx;
		margin-left: 30upx;
	}

	.uni-drawer-content {
		padding-left: 30upx;
		box-sizing: border-box;

		&>view {
			border-bottom: 1px solid #F1F1F1;
			padding: 30upx 0;
		}
	}

	.row-title {
		font-size: 28px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(140, 151, 157, 1);
		line-height: 28upx;
		margin-bottom: 30upx;
	}

	.option-tabs {
		display: flex;

		&>text {
			width: 106px;
			height: 56px;
			background: rgba(243, 245, 254, 1);
			border-radius: 10px;
			line-height: 56upx;
			text-align: center;
			margin-left: 40upx;
		}

		&>text.actived {
			background: rgba(104, 129, 255, 1);
			color: #FFF;
		}

		&>text:first-child {
			margin-left: 0;
		}
	}

	.par-input {
		display: flex;

		&>text {
			margin-left: 31upx;
			margin-right: 30upx;
		}
	}

	.child-coin {
		width: 156px;
		height: 56px;
		background: rgba(243, 245, 254, 1);
		border-radius: 10px;
		font-size: 26px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(175, 175, 175, 1);
		text-align: center;
	}

	.mother-coin {
		width: 300px;
		height: 56px;
		background: rgba(243, 245, 254, 1);
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
        font-size: 20upx;
		&>input {
			width: 70%;
			font-size: 26upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(175, 175, 175, 1);
			text-align: center;

		}
	}

	.coin_select_icon {
		transform: rotate(180deg);
		transition: 0.5s;
	}

	.coin_select_icon.show {
		transform: rotate(0deg);
	}

	.coin-list {
		display: flex;

		&>text {
			width: 106px;
			height: 46px;
			border: 1px solid rgba(196, 206, 212, 1);
			border-radius: 10px;
			font-size: 26px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			margin-top: 20upx;
			color: rgba(140, 151, 157, 1);
			margin-left: 40upx;
			text-align: center;
		}

		&>text:first-child {
			margin-left: 0;

		}
	}

	.confirm-buttons {
		margin-left: 30upx;
		margin-top: 60upx;

		&>text:first-child {
			display: inline-block;
			text-align: center;
			width: 166upx;
			height: 60upx;
			border: 1px solid rgba(224, 224, 224, 1);
			border-radius: 10px;
			font-size: 30px;
			line-height: 60upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			margin-right: 40upx;
		}

		&>text:last-child {
			display: inline-block;
			text-align: center;
			width: 286upx;
			height: 60upx;
			line-height: 60upx;
			background: rgba(104, 129, 255, 1);
			border-radius: 10px;
			font-size: 30px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
		}
	}
</style>
