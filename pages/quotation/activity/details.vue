<template>
	<view>
		<my-head title="订单" :showBorderShadow="false">
			<template slot="right">
				<!-- <image src="/static/assert/recording.png" style="width: 35upx;height: 36upx;"></image> -->
			</template>
			<template slot="bottom">
				<view class="tabs">
					<view @tap="chooseType = 1" :class="[chooseType == 1 ? 'chooseNow' : '']">申购订单</view>
					<view @tap="chooseType = 2" :class="[chooseType == 2 ? 'chooseNow' : '']">中签订单</view>
				</view>
			</template>
		</my-head>
		<!-- 申购订单 -->
		<view  class="purge" v-if="chooseType == 1?true:false">
			<view class="home-free">
				<view>项目名称:</view>
				<view>{{JSONdate.projectName}}</view>
			</view>
			<view class="home-free">
				<view>申购签号数:</view>
				<view>{{JSONdate.winningNumber}}</view>
			</view>
			<view class="home-two">
				<view>申购签号:</view>
				<view v-for="(item,index) in PurchaseUd" :key="index">{{item}}</view>
			</view> 
			<view class="home-free">
				<view>申购价格:</view>
				<view>{{JSONdate.unitPrice}} USDT</view> 
			</view>
			<view class="home-free">
				<view>申购数量：</view>
				<view>{{JSONdate.purchaseQuantity}} TOKEN</view>
			</view>
			<view class="home-free">
				<view>申购总额：</view>
				<view>{{JSONdate.purchaseTotalAmount}} USDT</view>
			</view>
			<view style="border: none;" class="home-free">
				<view>中签时间:</view>
				<view>{{JSONdate.createTime}}</view>
			</view>
		</view>
		<!-- 中签订单 -->
		<view class="purge" v-if="chooseType == 2?true:false">
			<view class="home-free">
				<view>项目名称:</view>
				<view>{{JSONdateitem.projectName}}</view>
			</view>
			<view class="home-free">
				<view>中签号码数:</view>
				<view>{{JSONdateitem.actualSignNumber}}</view>
			</view>
			<view class="home-free">
				<view>未中签签号数:</view>
				<view>{{JSONdateitem.unsignNumber}}</view>
			</view>
			<view class="home-two">
				<view>中签号码:</view>
				<view v-show="item.status == 1 ? true : false" v-for="(item,index) in JSONdateitem.listUserPurchaseNumber" :key="index">{{item.purchaseNumber}}</view>
			</view>
			<view class="home-two">
				<view>未中签号码:</view>
				<view v-show="item.status == 0 ? true : false" v-for="(item,index) in JSONdateitem.listUserPurchaseNumber" :key="index">{{item.purchaseNumber}}</view>
			</view>
			<view class="home-free">
				<view>申购价格:</view>
				<view>{{JSONdateitem.unitPrice}} {{JSONdateitem.virtualWalletName}}</view>
			</view>
			<view class="home-free">
				<view>成交数量：</view>
				<view>{{JSONdateitem.transactionNumber}} TOKEN</view>
			</view>
			<view class="home-free">
				<view>成交总额：</view>
				<view>{{JSONdateitem.actualTransactionAccount}} {{JSONdateitem.virtualWalletName}}</view>
			</view>
			<view class="home-free">
				<view>扣款状态：</view>
				<view>已扣款</view>
			</view>
			<view style="border: none;" class="home-free">
				<view>订单时间:</view>
				<view>{{JSONdateitem.createTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { toast } from '@/utils/toast';
import { mapState, mapGetters } from 'vuex';
import request from '@/utils/request';
export default {
	data() {
		return {
			chooseType: 1, 
			JSONdate:[],
			JSONdateitem:[],
			Codes:[],
			PurchaseUd:[],
			id:"",//传值过来的Id
		};
	},
	onLoad(options){
		this.id = options.id
		
	},
	created() {
		this.Checkbox();
		this.Lucky()
	},
	methods: {
	   // 申购订单接口
	   Checkbox(){
	   	request('/userMakeNewSettingRecord/orderTotal', 'GET', {
	   		token: this.userinfo.token,
	   		makeNewSettingId :this.id
	   	}).then(res => {
			console.log(res.data,33333)
			
	   		if (res.data.code == 200) {
	   			this.JSONdate = res.data.data[0]
	   			this.PurchaseUd = res.data.data[0].listUserPurchaseNumber	   			
	   		} 
			
			try{
				this.JSONdate = JSON.parse(res.data).data[0]
				this.PurchaseUd = JSON.parse(res.data).data[0].listUserPurchaseNumber
			}catch(e){
				//TODO handle the exception
				this.JSONdate = res.data.data[0]
				this.PurchaseUd = res.data.data[0].listUserPurchaseNumber
			}
					
	   	});
	   },
	   // 中签订单
	   Lucky(){
		   request('/userMakeNewSettingRecord/signOrderTotalApp', 'GET', {
		   	token: this.userinfo.token,
		   	makeNewSettingId :this.id
		   }).then(res => {
		   	console.log(res.data,3333300000)
			if(res.data.data == ""){
				this.JSONdateitem = "0"
			}else{
				this.JSONdateitem = res.data.data[0]
			}
			try{
				this.JSONdateitem = JSON.parse(res.data).data[0]
			}catch(e){
				//TODO handle the exception
				this.JSONdateitem = res.data.data[0]
			}
			  
		   
		   			
		   });
	   }
	},
	components: {},
	computed: {
		...mapState('user', ['userinfo'])
	}
};
</script>

<style scoped lang="scss">
.tabs {
	height: 51upx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 90%;
	margin-top: 20upx;
	overflow: hidden;
	padding-bottom: 10upx;
	border-bottom: 2upx solid #f1f1f1;
	margin: 0 auto;
	& > view {
		width: 50%;
		height: 51upx;
		line-height: 51upx;
		text-align: center;
		border-radius: 5upx;
		font-size: 32upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: #afaeae;
		padding-bottom: 17upx;
	}
	.chooseNow {
		color: #6881ff !important;
		border-bottom: 2upx solid #6881ff !important;
		padding-bottom: 14upx;
	}
}
.purge {
	width: 90%;
	padding-bottom: 58upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 10upx;
	margin: 150upx auto;
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
</style>
