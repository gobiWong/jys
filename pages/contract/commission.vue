<template>
	<view>
		<statusBar></statusBar>
		<view class="header">
			<view class="tabs">
				<view @tap="onreturn"><image src="../../static/assert/fanhui.png" mode=""></image></view>
				<view class="tabs-img">
					<text :class="{actived:typeIndex==1}" @tap="typeIndex=1">当前委托</text>
					<text :class="{actived:typeIndex==2}" @tap="typeIndex=2">历史委托</text>
				</view>
				
			</view>
		</view>
		
		<!-- 下拉循环 -->
		<!-- 顶部循环 -->
		<view class="condition-left">
			<view @click="conditionColor = index;conditionCheck(index)" v-for="(item,index) in condition" :key="index" :class="[conditionColor == index?'chooseColor':'']">
				<text>{{item}}</text>
				<image style="width: 16upx;height: 9upx;" src="/static/img/jiantou.png" mode=""></image>
			</view>
		</view>
		<!-- BTC-->
		<view @tap="conditionCheck(0)" class="conditon-type" v-if="show0">
			<view class="source-size-list">
				<view @tap="getSize(item.childName,item.childId)" v-for="(item,index) in sizeList" :key="index" :class="{chooseColor:index == priceColor}" class="source-size-list-detail">{{item.childName}}/USDT永续</view>
			</view>
		</view>
		<!-- 限价委托 -->
		<view @tap="conditionCheck(1)" class="conditon-type" v-if="show1">
			<view class="source-size-list">
				<view @tap="getLimit(item.msg,item.code)" v-for="(item,index) in Limit" :key="index" :class="{chooseColor:index == sizeColor}" class="source-size-list-detail">{{item.msg}}</view>
			</view>
		</view>
      <!-- 全部交易类型 -->
        <view @tap="conditionCheck(2)" class="conditon-type" v-if="show2">
        	<view class="source-size-list">
        		<view @tap="getTypes(item.msg,item.code)" v-for="(item,index) in Types" :key="index" :class="{chooseColor:index == pliceType}" class="source-size-list-detail">{{item.msg}}</view>
        	</view>
        </view>

		<!-- 记录列表 -->
		<!-- 当前委托 -->
		<view style="margin-top: 31upx;" v-if="typeIndex == 1 ? true : false" >
			<view class="content-one" v-for="(item,index) in Drag" :key="index">
				<!-- 买入开多 50X -->
				<view class="more">
					<view v-if="item.tradeType==1">买入开多 {{item.multiple}}</view>
					<view style="color:#EB375D;" v-else>卖出平多 {{item.multiple}}</view>
				</view>
				<view class="more-one">
					<view>{{item.virtualWalletName}}</view>
					<view>{{item.createTime}}</view>
				</view>
				<!-- 委托数量(张) -->
				<view class="orders">
					<!-- 左边 -->
					<view class="order-left">
						<view>委托数量({{buynumber}})</view>
						<view>{{item.totalAmount}}</view>
					</view>
					<!-- 右边 -->
					<view class="order-right">
						<view>已成交数量({{buynumber}})</view>
						<view>0</view>
					</view>
				</view>
				<!-- 委托类型 -->
				<view class="Delegate">
					<view>委托类型</view>
					<view v-if="item.priceType==1">限价</view>
					<view v-else>市价</view>
				</view>
				<view class="Delegate">
					<view>委托价格(USDT)</view>
					<view>{{item.price}}</view>
				</view>
				<view class="Delegate">
					<view>手续费(USDT)</view>
					<view>0.000000</view>
				</view>
				<view class="Delegate">
					<view>保证金(USDT)</view>
					<view>{{item.assureCash}}</view>
				</view>
			</view>
			<view class="loading" @tap="onReachBottoms">{{ contentdown }}</view>
			
		</view>
		<!-- 历史委托 -->
		<view style="margin-top: 31upx;" v-if="typeIndex == 2 ? true : false">
			<view class="content-one">
				<!-- 买入开多 50X -->
				<view class="more">
					<view>买入开多 50X</view>
					<view>撤销</view>
				</view>
				<view class="more-one">
					<view>EOS</view>
					<view>2019-07-15 20:23:05</view>
				</view>
				<!-- 委托数量(张) -->
				<view class="orders">
					<!-- 左边 -->
					<view class="order-left">
						<view>委托数量(张)</view>
						<view>1</view>
					</view>
					<!-- 右边 -->
					<view class="order-right">
						<view>已成交数量(张)</view>
						<view>0</view>
					</view>
				</view>
				<!-- 委托类型 -->
				<view class="Delegate">
					<view>委托类型</view>
					<view>限价</view>
				</view>
				<view class="Delegate">
					<view>委托价格(USDT)</view>
					<view>0.000</view>
				</view>
				<view class="Delegate">
					<view>手续费(USDT)</view>
					<view>0.000000</view>
				</view>
				<view class="Delegate">
					<view>保证金(USDT)</view>
					<view>4.7529</view>
				</view>
			</view>
		</view>
	   
	</view>
	</view>
</template>

<script>
	var _self,
		
		getMove = 5;
		import wsLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import { mapState } from 'vuex';
	import {toast} from '@/utils/toast';
	import request from '@/utils/request';
	
	export default {
		data() {
			return {
				typeIndex: 1,
				condition: ["BTC/USDT永续", "限价委托", "全部交易类型"],
				conditionColor: "-1",
				sizeList: [],
				Limit: [],
				Types:[],
				show0: false,
				show1: false,
				show2:false,
				priceColor:0,
				sizeColor:0,
				pliceType:0,
				coin:"",
				coinId:"",
				buynumber:"",
				Drag:[],
				contentdown: '查看更多'
				
			}
		},
		components: {
			wsLoadMore
		},
    
    
			
	
		created(){
			this.Contract();
			this.Delegate();
			this.Transaction();
			this.getmorenews();
		},
		onLoad(options) {
			this.buynumber = options.buynumber
			this.getmorenews();
		},
		// 下拉刷新
		onPullDownRefresh: function() {
			
			this.getmorenews();
		},
		
		computed: {
			...mapState('user', ['userinfo'])
		},
		methods: {
			onReachBottoms() {
				this.getmorenews();
			},
			// 返回上一级
			 onreturn() {
			      uni.reLaunch({
			        url: './index'
			      });
			    },
			//下拉列表显示与隐藏
			conditionCheck(index) {
				switch (index) {
					case 0:
						this.show0 = !this.show0;
						this.show1 = false;
                        this.show2 = false;
						break;
					case 1:
						this.show1 = !this.show1;
						this.show0 = false;
						this.show2 = false;
						break;
					case 2:
						this.show2 = !this.show2;
						this.show0 = false;
						this.show1 = false;
						break;

				}
			},
			// btc
			getSize(index,num) {
                // this.priceColor = Currency //币种id
				this.condition[0] = index+"/USDT永续" //币种
				console.log(this.condition[0],11111)
				this.coin = num
				console.log(this.coin,23232)
				
			},
			// 市价
			getLimit(index, price) {
				this.sizeColor = price; //市价
				this.condition[1] = index;//市价ID
				console.log(this.sizeColor,11111)
				this.coinId = price
				
			},
			// 全部交易
			getTypes(index,buy){
				this.pliceType = buy; //全部交易
				this.condition[2] = index; //全部交易Id
				console.log(this.pliceType,11111)
				
			},
           
          // 合约类型
		  Contract() {
		  	request('/agreementEntrust/getAllAgreement', 'POST', {})
		  		.then(res => {		  		      
		  			if (res.data.code == 200) {
		  				this.sizeList = res.data.data;
		  			}
					try{
						this.sizeList = JSON.parse(res.data).data
					}catch(e){
						//TODO handle the exception
						this.sizeList = res.data.data;
					}
		  			
		  			
		  		})
		  
		  },
		  // 委托类型
		  Delegate() {
			  
		  	request('/agreementEntrust/getPriceType', 'POST', {
				
			})
		  		.then(res => {
		  		
		  			if (res.data.code == 200) {
		  				this.Limit = res.data.data;
		  			}
					try{
						this.Limit =JSON.parse(res.data).data;
					}catch(e){
						//TODO handle the exception
						this.Limit = res.data.data;
					}
		  			
		  		})
		  
		  },
		  // 交易类型
		  Transaction(){
			  request('/agreementEntrust/getTradeType', 'POST', {})
			  	.then(res => {
			  	
			  		if (res.data.code == 200) {
			  			this.Types = res.data.data;
			  		}	
	               try{
	               	this.Types = JSON.parse(res.data).data;
	               }catch(e){
	               	//TODO handle the exception
					this.Types = res.data.data;
	               }
			  	})
		  },
		  // 全部委托
		  getmorenews(){
			  
			 
			  getMove++;
			 
			  uni.showNavigationBarLoading();
			  request('/agreementEntrust/listEntrust', 'POST', {
				  token:this.userinfo.token,
				  page:1,
				  rows:getMove,

			  })
			  	.then(res => {
			  	   	
			  		if (res.data.code == 200) {
						getMove++;
						this.Drag = res.data.data;		
						
                       uni.stopPullDownRefresh();
                       uni.hideNavigationBarLoading();
			  		}
					try{
						this.Drag = JSON.parse(res.data).data;	
								uni.stopPullDownRefresh();
								uni.hideNavigationBarLoading();
					}catch(e){
					    this.Drag = res.data.data;		
							uni.stopPullDownRefresh();
							uni.hideNavigationBarLoading();
															
				  }
			  	}) 
		     },
		  	   
		}
	}
</script>

<style lang="scss" scoped>
	.tabs {
            padding: 0 30upx;
		    display: flex;

       &>view:nth-child(1) image {
       	
       		width: 16upx;
       		height: 30upx;
       		margin-top: 40upx;
       	
       }
	   .tabs-img{
		   display: flex;
		   justify-content:center;
		   border:3upx solid #6881FF;
		   height:100%;
		   margin-top: 20upx;
		   margin-left:170upx;
		   &>text {
		   	width: 150upx;
		   	background: #FFFFFF;
		   	text-align: center;
		   	font-size: 28upx;
		   	font-family: PingFang-SC-Medium;
		   	font-weight: 500;
		   	color: #6881FF;
		   }
		   
		   &>text.actived {
		   	border: 1upx solid #6881FF;
		   	color: #FFFFFF;
		   	background: #6881FF;
		   	box-sizing: border-box;
		   }
	   }
		

	}

	.condition-left {
		display: flex;
		justify-content: space-between;
		padding: 0 30upx;
		margin-top: 49upx;
		border-bottom:1upx solid #E0E0E0;
        padding-bottom:30upx;
		position:relative;
		
		&>view {
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(45, 47, 86, 1);
		}
	}

	.conditon-type {

		display: block;
		/* 默认隐藏 */
		/*生成绝对定位的元素，相对于浏览器窗口进行定位。*/
		position: absolute;
		z-index: 999999999999;
		left: 0;
		top: 17%;
		/*浮在全屏上*/
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.5);
		/* 弹窗内容 */

		.source-size-list {
			width: 100%;
			background-color: #FFFFFF;
			overflow-y: scroll;

			.source-size-list-detail {
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(140, 151, 157, 1);
				text-align: center;
				padding: 35upx 0upx 35upx 0upx;
				border-bottom: 1upx solid #F1F1F1;

			}
			.chooseColor{
				color: #6881FF;
			}
			
		}

	}

	.tabsId {
		height: 51upx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		margin-top: 20upx;
		overflow: hidden;
		padding-bottom: 30upx;
		border-bottom: 1upx solid #E0E0E0;

		&>text {
			height: 51px;
			line-height: 51upx;
			text-align: center;
			border-radius: 5upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(45, 47, 86, 1);
			padding-bottom: 17upx;

			.image-img {
				width: 16upx;
				height: 9upx;
				margin-left: 10upx;
			}
		}



	}

	.content-one {
		width: 80%;
		padding: 0 30upx;
		margin: 70upx auto;
		padding-bottom: 49upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0upx 0upx 15upx 1upx rgba(102, 102, 102, 0.16);
		border-radius: 10upx;
		padding-top: 29upx;
         
		.more {
			display: flex;
			justify-content: space-between;

			&>view:nth-child(1) {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(76, 223, 176, 1);
			}

			&>view:nth-child(2) {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(104, 129, 255, 1);
			}
		}

		// EOS
		.more-one {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 28upx;

			&>view:nth-child(1) {
				font-size: 34upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(45, 47, 86, 1);
			}

			&>view:nth-child(2) {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(186, 197, 203, 1);
			}
		}

		// 张数
		.orders {
			width: 100%;
			border-bottom: 1upx solid #F3F3F3;
			border-top: 1upx solid #F3F3F3;
			padding: 31upx 0upx 70upx 0upx;
			margin: 29upx auto;
			display: flex;

			.order-left {
				width: 50%;
				height: 100upx;
				border-right: 1upx solid #E6E6E6;

				&>view:nth-child(1) {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(140, 151, 157, 1);
					text-align: center;
				}

				&>view:nth-child(2) {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(45, 47, 86, 1);
					margin-top: 37upx;
					text-align: center;
				}
			}

			.order-right {
				width: 50%;
				height: 100upx;
				border: none;

				&>view:nth-child(1) {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(140, 151, 157, 1);
					text-align: center;
				}

				&>view:nth-child(2) {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(45, 47, 86, 1);
					margin-top: 37upx;
					text-align: center;
				}
			}
		}

		// 委托类型
		.Delegate {
			display: flex;
			justify-content: space-between;

			&>view:nth-child(1) {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(186, 197, 203, 1);
				margin-top: 10upx;
			}

			&>view:nth-child(2) {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(45, 47, 86, 1);
				margin-top: 10upx;
			}
		}
	}
.loading{text-align:center; line-height:80px;}
</style>
