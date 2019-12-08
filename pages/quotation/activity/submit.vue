<template>
	<view>
		<statusBar></statusBar>
		<view class="header">
			<!-- head left -->
			<view @tap="message">
				<image src="../../../static/assert/fanhui.png" class="drawer-icon"></image><text class="symbol-text">{{ projectName  }}</text>
			</view>
			
				
			
		</view>
	
	<view class="activity">
		<view style="padding-top: 47upx;" class="submit-form">
			<view class="input-cell">
				<label>申购价</label>
				<view>1 TOKEN ={{ unitPrice }} {{ virtualWalletName }}</view>
			</view>
			<view class="input-cell">
				<label>申购数量</label>
				<view>
					<view>
						<text>{{ purchase }}</text>
						<text>TOKEN</text>
					</view>
					<view class="opt option-button-cell">
						<view @tap="subtract" class="button">-</view>
						<view @tap="addNum" class="button" style="color:#6800FF;">+</view>
					</view>
				</view>
			</view>
			<view class="amount-tips">
				<view>金额{{ purchaseAmount }} {{ virtualWalletName }}</view>
				<view>可用{{ availableAmount }} {{ virtualWalletName }}</view>
			</view>
			<view class="munber">
				<text>签号数</text>
				<text>{{ signNumber }}</text>
			</view>
			<view class="form-tips">
				<view class="form-tips-title">申购说明：</view>
				<view>1.此项目的申购下限为{{personalReservationBottomLimit}}TOKEN，申购上限为{{personalReservationTopLimit}}TOKEN</view>
				<view>2.一个签号数对应1000TOKEN；</view>
			</view>
		</view>
		<view><button @tap="openPopup" class="activity-button">申购</button></view>
		<!-- 弹框 -->
		<uni-popup ref="popup" type="bottom">
			<view class="popup-one">
				<view>请输入资金密码</view>
				<!-- 输入框 -->
				<view class="popop-input">
					<input v-model="tradePassword" :maxlength="6" type="password" value="" />
					<view class="fosserd">
						<span>忘记密码？</span>
						<span>找回资金密码</span>
					</view>
				</view>
				<!-- 确定 -->
				<view><button @tap="purchased">确定</button></view>
			</view>
		</uni-popup>
		<!-- 验证码弹框 -->
		<uni-popup ref="popuper" type="bottom">
			<view class="popup-one">
				<view style="height: 130upx;">
					<view>安全验证已推送至</view>
					<view>{{ userinfo.phoneNo }}</view>
					<view class="line"></view>
				</view>
				<view style="margin-top:80upx">
					<validcode :maxlength="6" :isPwd="false" @finish="getCode"></validcode></view>
				<!-- 确定 -->
				<view><button @tap="optimal(purchase,virtualWalletName,projectName,results,unitPrice,purchaseStartTime,id,showImg,listUserPurchaseNumber)">确定</button></view>
			</view>
		</uni-popup>
	</view>
	</view>
</template>

<script>
import { toast } from '@/utils/toast';
import request from '@/utils/request';
import { mapState, mapGetters } from 'vuex';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import { userVirtualWallet ,checkTradePassword} from '@/api/actved';
export default {
	data() {
		return {
			price: '',
			id: '',
			virtualWalletName: '',
			virtualWalletId: '',
			unitPrice: '',
			configurationQuota: '',
			totalSalesAmount: '',
			purchase: '',
			signNumber: 1,
			purchaseAmount: '',
			availableAmount: '', //个人账户
			tradePassword:'',
			phoneCode:'',
			projectName:'',//项目名称
			results:[] ,//中签号码
			purchaseStartTime:'',//申购时间
			showImg:'',//传过来的图片
			listUserPurchaseNumber:'',
			personalReservationBottomLimit:"",//下线
			personalReservationTopLimit:"",//上线
		};
	},
	onLoad(options) {
		this.id = options.id;
		this.showImg = options.showImg;
		this.listUserPurchaseNumber = options.listUserPurchaseNumber;
		this.virtualWalletName = options.virtualWalletName;//币种
		this.virtualWalletId = options.virtualWalletId;
		this.unitPrice = options.unitPrice;
		this.price = options.configurationQuota; //价格
		this.totalSalesAmount = options.totalSalesAmount;
		this.purchase = options.configurationQuota;
		this.projectName = options.projectName; //项目名称
		this.results = options.results //中签号码
		this.purchaseStartTime = options.purchaseStartTime//时间
		this.personalReservationBottomLimit = options.personalReservationBottomLimit //下线
		this.personalReservationTopLimit = options.personalReservationTopLimit //上线
		console.log(this.results,4333333333)
		// 账户接口
		userVirtualWallet(this.virtualWalletName).then(res => {
			if (res.data.code == 200) {
				this.availableAmount = res.data.data[0].availableAmount;
			}
		});
	},
	methods: {
		message(){
			uni.navigateBack({
				delta: 1
			});
		},
		openPopup() {
			if(this.purchaseAmount>this.availableAmount){
				toast("余额不足")
			    return false
			}else{
				this.$refs.popup.open();
			}
			
		},
		closePopup() {
			this.$refs.popup.close();
		},
		// 加
		addNum() {
			if(this.purchaseAmount>this.availableAmount){
				toast("余额不足")
				
			    return false
			}
			this.purchase = this.addFun(this.purchase, this.price);
			this.signNumber++;
			this.purchaseAmount = this.mulFun(this.purchase, this.unitPrice);
			
		},
		// 减
		subtract() {
			if (this.purchase - this.price < this.price) return false;
			this.purchase = this.subFun(this.purchase, this.price);
			this.signNumber--;
			this.purchaseAmount = this.mulFun(this.purchase, this.unitPrice);
		},
		mulFun(arg1, arg2) {
			var m = 0,
				s1 = arg1.toString(),
				s2 = arg2.toString();
			try {
				m += s1.split('.')[1].length;
			} catch (e) {}
			try {
				m += s2.split('.')[1].length;
			} catch (e) {}
			return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
		},
		// 加
		addFun(arg1, arg2) {
			var r1, r2, m;
			try {
				r1 = arg1.toString().split('.')[1].length;
			} catch (e) {
				r1 = 0;
			}
			try {
				r2 = arg2.toString().split('.')[1].length;
			} catch (e) {
				r2 = 0;
			}
			m = Math.pow(10, Math.max(r1, r2));
			return (arg1 * m + arg2 * m) / m;
		},
		// 减
		subFun(arg1, arg2) {
			var r1, r2, m, n;
			try {
				r1 = arg1.toString().split('.')[1].length;
			} catch (e) {
				r1 = 0;
			} 
			try {
				r2 = arg2.toString().split('.')[1].length;
			} catch (e) {
				r2 = 0;
			}
			m = Math.pow(10, Math.max(r1, r2));
			n = r1 >= r2 ? r1 : r2;
			return ((arg1 * m - arg2 * m) / m).toFixed(n);
		},
		// 弹框验证码框

		purchased() {
			request('/user/checkTradePassword', 'POST', {
				token: this.userinfo.token,
				tradePassword:this.tradePassword
			}).then(res => {
				if (res.data.code == 200) {
					this.purchaseId()
					this.closePopup();
					this.$refs.popuper.open();
					console.log('111');
					
				}else{
					toast(res.data.msg)
				}
				
			});
		
			
		},
		// 验证码
		purchaseId() {
			request('/user/sendCode', 'GET', {
				token: this.userinfo.token,
				type:0,
				phoneNo:this.userinfo.phoneNo
			}).then(res => {
				if (res.data.code == 200) {
					// this.Verify()
				}else{
					toast(res.data.msg)
				}
				
			});
			
		},
		// 验证手机号
		Verify(){
			request('/user/checkPhoneCode', 'POST', {
				token: this.userinfo.token,
				phoneCode:this.phoneCode
			}).then(res => {
				if (res.data.code == 200) {
					
				}else{
					toast(res.data.msg)
				}
				
			});
		},
		
		optimal(num,num1,num2,num3,num4,num5,num6,num7,num8){
			request('/userMakeNewSettingRecord/userBuy', 'POST', {
				token: this.userinfo.token,
				makeNewSettingId:this.id,
				unitPrice:this.unitPrice,
				purchaseQuantity:this.purchase,
				winningNumber:this.signNumber,
				purchaseTotalAmount:this.purchaseAmount,
				virtualWalletId:this.virtualWalletId
			}).then(res => {
				if (res.data.code == 200) {
					this.$refs.popuper.close();
					uni.navigateTo({
						url: './purchase?purchase='+num+'&virtualWalletName='+num1+'&projectName='+num2+'&results='+num3+'&unitPrice='+num4+'&purchaseStartTime='+num5+'&id='+num6 +'&showImg='+num7+'&listUserPurchaseNumber='+num8
					});
				}else{
					toast(res.data.msg)
				}
				
			});
		},
		// 申购
		
		
		// 验证码
		getCode(val) {
			this.phoneCode = val
			console.log(val);
		},
	},
	computed: {
		...mapState('user', ['userinfo'])
	},
	components: {
		uniPopup
	}
};
</script>

<style scoped lang="scss">
	.header {
		display: flex;
		height: 90upx;
		// align-items: center;
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		margin-top: 30upx;
	}
	.drawer-icon {
		width: 16upx;
		height: 30upx;
	}
	.symbol-text {
		text-align: center;
		font-size: 36upx;
	    margin-left: 280upx;
	}
.activity .submit-form {
	background-color: #fafafa;
	padding-bottom: 50upx;
}
.opt {
	display: flex;
	position: relative;
	top: 2upx;
	right: -6upx;
	width: 180upx;
	height: 70upx;
	line-height: 66upx;
	margin-top: -4px;
	margin-right: -2px;
}
.opt .button {
	border: 0;
	width: 50%;
	height: 66upx;
	line-height: 66px;
	text-align: center;
	font-size: 48upx;
	font-weight: 400;
	text-align: center;
}
.option-button-cell {
	background: rgba(247, 247, 253, 1);
	box-shadow: -2upx 2upx 1px 0px rgba(53, 48, 15, 0.12);
	border-radius: 10upx;
}

.option-button-cell > .button:first-child {
	color: #bcbed5;
}

.option-button-cell:after {
	content: ' ';
	position: absolute;
	width: 2upx;
	height: 33upx;
	top: calc(50% - 33upx / 2);
	left: calc(50% - 2upx / 2);
	background-color: #8285ae;
}
.submit-form {
	padding: 0 50upx;
}
.input-cell {
	& > view:last-child {
		display: flex;
		align-items: center;
		justify-content: space-between;
		& > view:first-child {
			flex: 1;
			display: flex;
			justify-content: space-between;
			& > text:last-child {
				color: #c4ced4;
				margin-right: 10upx;
			}
		}
	}
	& > view {
		position: relative;
		height: 66upx;
		line-height: 66upx;
		border: 2px solid rgba(196, 206, 212, 1);
		border-radius: 10px;
		padding-left: 30upx;
		font-size: 28px;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		view {
			font-size: 28px;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
		}
	}
	label {
		font-size: 30px;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
	}
}
.amount-tips {
	& > view {
		line-height: 24upx;
		font-size: 24px;
		margin-top: 18upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(140, 151, 157, 1);
	}
}
.munber {
	display: flex;
	justify-content: space-between;
	& > text {
		font-size: 30px;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 30upx;
		color: rgba(102, 102, 102, 1);
		margin-top: 39upx;
	}
	& > text:last-child {
		color: #333333;
		margin-right: 49upx;
	}
}
.form-tips {
	view.form-tips-title {
		font-size: 28px;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		line-height: 28upx;
		margin-top: 59upx;
		margin-bottom: 29upx;
	}
	view {
		font-size: 28px;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		line-height: 48px;
	}
}
.activity-button {
	margin-top: 200upx;
	width: 660px;
	height: 76px;
	background: linear-gradient(135deg, rgba(104, 129, 255, 1), rgba(111, 111, 255, 1));
	border-radius: 10px;
	font-size: 32px;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
	line-height: 76px;
}
/deep/.uni-popup__wrapper-box {
	background: rgba(255, 255, 255, 1);
	border-radius: 0upx 0upx 0upx 0upx;
}

/deep/.uni-popup__wrapper.uni-custom.bottom .uni-popup__wrapper-box {
	width: 100%;
	max-height: 100%;
	overflow-y: scroll;
}
/deep/.uni-popup__wrapper.uni-custom .uni-popup__wrapper-box {
	padding: 0px;
	background: #fff;
}
.popup-one {
	& > view:nth-child(1) {
		font-size: 32px;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(35, 35, 35, 1);
		height: 90upx;
		text-align: center;
		border-bottom: 2upx solid #e0e0e0;
		width: 100%;
		padding-top: 41upx;
	}
	.line {
		width: 100%;
		// border:1upx solid rgba(224,224,224,1);
		top: 40upx;
	}
	.popop-input {
		input {
			width: 90%;
			height: 100upx;
			margin: 0 auto;
			border: 2upx solid rgba(224, 224, 224, 1);
			border-radius: 10upx;
			margin-top: 80upx;
			padding-left: 10upx;
		}
		.fosserd {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(104, 129, 255, 1);
			text-align: center;
			margin-top: 35upx;
			span {
				color: rgba(104, 129, 255, 1);
			}
		}
	}
	& > view:nth-child(3) button {
		height: 76upx;
		background: #6881ff;
		border-radius: 10upx;
		width: 90%;
		margin: 200upx auto;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
}
</style>
