<template>
	<view>
		<statusBar></statusBar>
		<view class="header">
			<!-- head left -->
			<view @tap="openDrawer"><image src="../../static/assert/fold.png" class="recording-icon"></image></view>
			<view class="symbol-text">{{ symbol }}</view>
		</view>

		<view class="contentId">
			<!-- BTC/USDT永续 -->
			<view class="headerdr">
				<!-- head left -->
				<view @tap="showDrawer">
					<text class="symbol-text">{{ childNameId }}/USDT永续</text>
					<image style="width: 16upx;height: 10upx;margin-left: 20upx;" src="../../static/assert/jiantou.png" mode=""></image>
				</view>
				<!-- head right -->
				<view>
					<image @tap="record" src="/static/assert/jilu.png" class="chart-icon"></image>
					<image @tap="tokline" src="/static/assert/zoushi.png" class="more-icon"></image>
				</view>
			</view>
			<!-- 合约权益(USDT) -->

			<view class="Contract">
				<view class="Contract-one">
					<view>合约权益(USDT)</view>
					<view>收益(USDT)</view>
					<view>风险率</view>
				</view>
				<view class="Contract-two">
					<!-- 没有登录 -->
					<view class="user-one" v-if="!userinfo.token">
						<view>--</view>
						<view>--</view>
						<view>--</view>
					</view>
					<!-- 登录后 -->
					<view v-if="userinfo.token" class="user-one">
						<view>{{ PositionsList.holdWarehouseInterest }}</view>
						<view>
							+{{ PositionsList.income }}
							<image src="../../static/assert/shangshen.png" mode=""></image>
						</view>
						<view>无风险</view>
					</view>
				</view>
			</view>
			<!-- 开仓持仓 -->
			<view class="Open-position">
				<view class="opend">
					<text :class="{ actived: typeIndex == 1 }" @tap="typeIndex = 1">开仓</text>
					<text style="margin-left: 20upx;" :class="{ actived: typeIndex == 2 }" @tap="typeIndex = 2">持仓</text>
				</view>
				<!-- 切换开仓 -->
				<view class="page-container" v-if="typeIndex == 1 ? true : false">
					<view class="edge">
						<!-- 左边买入 -->
						<view class="page-left">
							<view class="tabs">
								<view class="buy " :class="type == 1 ? 'normal' : ''" @click="onChangeType(1)">买入</view>
								<view class="sell " :class="type == 2 ? 'normal' : ''" @click="onChangeType(2)">卖出</view>
							</view>
							<!-- 1 -->
							<view v-if="type == 1 ? true : false">
								<view class="normal-one">
									<view class="normal-left">
										<view @tap="openPopup">{{ currentEd }}</view>
										<view><image src="../../static/assert/jiantou.png" mode=""></image></view>
										<uni-popup ref="popup" type="bottom">
											<view class="pay">
												<view v-for="(item, index) in countrys" :key="index" @tap="addCountrysClass(item.msg, item.code)">{{ item.msg }}</view>
												<view style="color: #6881FF;" @tap="closePopup">取消</view>
											</view>
										</uni-popup>
									</view>

									<view class="normal-right">
										<view @tap="openPopupr">{{ currentRRd }}</view>
										<view><image src="../../static/assert/jiantou.png" mode=""></image></view>
										<uni-popup ref="popupr" type="bottom">
											<view class="pay">
												<view v-for="(item, index) in count" :key="index" @tap="addCountrys(index)">{{ item.proceed }}</view>
												<view style="color: #6881FF;" @tap="closePopupr">取消</view>
											</view>
										</uni-popup>
									</view>
								</view>
								<!-- 限价开仓 -->
								<view class="Price">
									<view><input v-model="equivalent" type="text" placeholder="限价开仓" /></view>
									<view>USDT</view>
								</view>
								<view class="Price">
									<view><input v-model="amount" type="text" placeholder="买入数量" /></view>
									<view>{{ buynumber }}</view>
								</view>
								<!-- 可用数量 -->
								<view v-if="userinfo.token" class="number">
									<view>可用{{ availableAmount }} USDT</view>
									<view>可开{{ getcan }}张</view>
								</view>
								<!-- 止盈止损(选填) -->
								<view class="price-one">
									<view>止盈止损(选填)</view>
									<view><image src="../../static/assert/shiyi.png" mode=""></image></view>
								</view>
								<!-- 止盈价位 -->
								<view class="Check">
									<view class="check-one"><input v-model="stopProfitPrice" type="text" placeholder="止盈价位" /></view>
									<view class="check-one"><input v-model="stopLossPrice" type="text" placeholder="止损价位" /></view>
								</view>
								<!-- 总金额 -->
								<view class="price-two">
									总金额
									<text>{{ totalamount }}</text>
								</view>
								<!-- 登录 -->
								<view class="login-one">
									<button style="background: #4CDFB0;" v-if="!userinfo.token">登录</button>
									<button @tap="contractDate('1', assignment, currentRRd, marketprice)" style="background: #4CDFB0;" v-if="userinfo.token">买入开多</button>
								</view>
							</view>
							<!-- 2 -->
							<view v-if="type == 2 ? true : false">
								<view class="normal-one">
									<view class="normal-left">
										<view @tap="openPopup">{{ currentEd }}</view>
										<view><image src="../../static/assert/jiantou.png" mode=""></image></view>
										<uni-popup ref="popup" type="bottom">
											<view class="pay">
												<view v-for="(item, index) in countrys" :key="index" @tap="addCountrysClass(item.msg, item.code)">{{ item.msg }}</view>
												<view style="color: #6881FF;" @tap="closePopup">取消</view>
											</view>
										</uni-popup>
									</view>
									<view class="normal-right">
										<view @tap="openPopupr">{{ currentRRd }}</view>
										<view><image src="../../static/assert/jiantou.png" mode=""></image></view>
										<uni-popup ref="popupr" type="bottom">
											<view class="pay">
												<view v-for="(item, index) in count" :key="index" @tap="addCountrys(index)">{{ item.proceed }}</view>
												<view style="color: #6881FF;" @tap="closePopupr">取消</view>
											</view>
										</uni-popup>
									</view>
								</view>
								<!-- 限价开仓 -->
								<view class="Price">
									<view><input v-model="equivalent" type="text" placeholder="限价开仓" /></view>
									<view>USDT</view>
								</view>
								<view class="Price">
									<view><input v-model="amount" type="text" placeholder="买入数量" /></view>
									<view>{{ buynumber }}</view>
								</view>
								<!-- 可用数量 -->
								<view v-if="userinfo.token" class="number">
									<view>可用{{ availableAmount }} USDT</view>
									<view>可开{{ getcan }}张</view>
								</view>
								<!-- 止盈止损(选填) -->
								<view class="price-one">
									<view>止盈止损(选填)</view>
									<view><image src="../../static/assert/shiyi.png" mode=""></image></view>
								</view>
								<!-- 止盈价位 -->
								<view class="Check">
									<view class="check-one"><input v-model="stopProfitPrice" type="text" placeholder="止盈价位" /></view>
									<view class="check-one"><input v-model="stopLossPrice" type="text" placeholder="止损价位" /></view>
								</view>
								<!-- 总金额 -->
								<view class="price-two">
									总金额
									<text>{{ totalamount }}</text>
								</view>
								<!-- 登录 -->
								<view class="login-one">
									<button v-if="!userinfo.token" style="background: #EB375D;">登录</button>
									<button @tap="contractDate('3', assignment, currentRRd, marketprice)" v-if="userinfo.token" style="background:#EB375D;">卖出开空</button>
								</view>
							</view>
						</view>
						<!-- 右边卖出 -->
						<view class="page-right">
							<!-- 张 -->
							<view class="name">
								<view class="layout">
									<view :class="{ to_end: ends == 1 }" @tap="starting(numberDate)">{{ numberDate }}</view>
									<view style="margin-left:-20px" :class="{ to_end: ends == 2 }" @tap="start(childNameId)">{{ childNameId }}</view>
								</view>
								<!-- 切换 -->
								<!-- 1 -->
								<view class="layout-one">
									<!-- 左边 -->
									<view v-if="underway">
										<view class="inderway-one">
											<view>价格(USDT)</view>
											<view>数量(张)</view>
										</view>
										<!-- 列表 -->
										<view class="inderway-two">
											<view v-for="(item, index) in Amount" :key="index" class="list">
												<view>{{ item.price }}</view>
												<view>{{ item.amount }}</view>
											</view>
										</view>
										<!-- 10307.79 -->
										<view class="dynamic">{{ add }}</view>
										<!-- 列表 -->
										<view class="inderway-two">
											<view v-for="(item, index) in total" :key="index" class="list">
												<view style="color:#4CDFB0">{{ item.price }}</view>
												<view>{{ item.amount }}</view>
											</view>
										</view>
									</view>
									<!-- 2右边 -->
									<view v-if="begin">
										<view class="inderway-one">
											<view>价格(USDT)</view>
											<view>数量({{ childNameId }})</view>
										</view>
										<!-- 列表 -->
										<view class="inderway-two">
											<view v-for="(item, index) in Amount" :key="index" class="list">
												<view>{{ item.price }}</view>
												<view>{{ item.amount }}</view>
											</view>
										</view>
										<!-- 10307.79 -->
										<view class="dynamic">{{ add }}</view>
										<!-- 列表 -->
										<view class="inderway-two">
											<view v-for="(item, index) in total" :key="index" class="list">
												<view style="color:#4CDFB0">{{ item.price }}</view>
												<view>{{ item.amount }}</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 当前委托 -->
					<view class="current">
						<view class="current-left">当前委托</view>
						<view @tap="commission(buynumber)" class="current-right">
							<view><image src="../../static/assert/quanbu.png" mode=""></image></view>
							<view>全部委托</view>
						</view>
					</view>
					<!-- 图片没有记录时 -->
					<view v-if="!islogin || Current.length == 0">
						<view class="Charge-img"><image src="../../static/assert/nodata-bg.png" mode=""></image></view>
						<view class="record-one">暂无记录</view>
					</view>
					<!-- 有记录时 -->
					<view style="margin-top: 31upx;" v-if="islogin && Current.length != 0" v-for="(item, index) in Current" :key="index">
						<view class="content-one">
							<!-- 买入开多 50X -->
							<view class="more">
								<view v-if="item.tradeType == 1">买入开多 {{ item.multiple }}</view>
								<view style="color:#EB375D;" v-else>卖出平多 {{ item.multiple }}</view>
								<view @tap="Undo(item.id)">撤销</view>
							</view>
							<view class="more-one">
								<view>{{ childNameId }}</view>
								<view>{{ item.createTime }}</view>
							</view>
							<!-- 委托数量(张) -->
							<view class="orders">
								<!-- 左边 -->
								<view class="order-left">
									<view>委托数量({{ buynumber }})</view>
									<view>{{ item.totalAmount }}</view>
								</view>
								<!-- 右边 -->
								<view class="order-right">
									<view>已成交数量({{ buynumber }})</view>
									<view>0</view>
								</view>
							</view>
							<!-- 委托类型 -->
							<view class="Delegate">
								<view>委托类型</view>
								<view v-if="item.priceType == 1">限价</view>
								<view v-else>市价</view>
							</view>
							<view class="Delegate">
								<view>委托价格(USDT)</view>
								<view>{{ item.price }}</view>
							</view>
							<view class="Delegate">
								<view>手续费(USDT)</view>
								<view>0.000000</view>
							</view>
							<view class="Delegate">
								<view>保证金(USDT)</view>
								<view>{{ item.assureCash }}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 切换持仓 -->
				<view class="page-container" v-if="typeIndex == 2 ? true : false">
					<!-- BTC/USDT永续 -->
					<view class="Position">
						<view class="Position-one">
							<view>{{ PositionsList.virtualWalletName }}/USDT永续</view>
							<view>多</view>
							<view class="Position-two">
								<view>{{ currentRRd }}</view>
							</view>
							<!-- 保证金 -->
							<view class="Margin">保证金</view>
						</view>
					</view>
					<!-- 开仓价格 -->
					<view class="Opening-price">
						<view>开仓价格(USDT)</view>
						<view>{{ PositionsList.openWarehousePrice }}</view>
					</view>
					<!-- 收益(USDT) -->
					<view class="income">
						<view class="income-one">
							<!-- 1 -->
							<view class="income-two">
								<view>收益(USDT)</view>
								<view>{{ PositionsList.income }}</view>
							</view>
							<!-- 2 -->
							<view class="income-line"></view>
							<!-- 3 -->
							<view class="income-free">
								<view>收益率</view>
								<view>{{ PositionsList.incomeRate }}%</view>
							</view>
						</view>
					</view>
					<!-- 未实现盈亏 -->
					<view class="Unrealized">
						<!-- 1 -->
						<view class="Unrealized-one">
							<view>
								未实现盈亏
								<text><image src="../../static/assert/usdt.png" mode=""></image></text>
							</view>
							<view>{{ PositionsList.unrealizedProfitLoss }}</view>
						</view>
						<!-- 2 -->
						<view class="Unrealized-two">
							<view>
								保证金
								<text><image src="../../static/assert/usdt.png" mode=""></image></text>
							</view>
							<view>{{ PositionsList.assureCash }}</view>
						</view>
						<!-- 3 -->
						<view class="Unrealized-free">
							<view>持仓量({{ buynumber }})</view>
							<view>{{ PositionsList.holdWarehouseAmount }}</view>
						</view>
						<view class="Unrealized-four">
							<view>可平量({{ buynumber }})</view>
							<view>{{ PositionsList.closeWarehouseAmount }}</view>
						</view>
					</view>
					<!-- 止盈止损按钮 -->
					<view class="Stop-Loss">
						<view @tap="Loss">止盈止损</view>
						<view @tap="CloseLoss">平仓</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 侧滑 -->
		<uni-drawer :visible="drawerVisible" mask="false" mode="left" @close="closeDrawer">
			<!-- 永续合约 -->
			<view class="permanent">
				<view>永续合约</view>
				<view @tap="Perpetual">合约账单</view>
				<view>合约介绍</view>
			</view>
			<!-- 合约权益(USDT) -->
			<view style="padding:0 30upx">
				<view class="interest">
					<view>合约权益(USDT)</view>
					<view v-if="userinfo.token">{{ PositionsList.holdWarehouseInterest }}</view>
					<view v-if="!userinfo.token">---</view>
				</view>
				<view class="interest">
					<view>保证金(USDT)</view>
					<view v-if="userinfo.token">{{ PositionsList.assureCash }}</view>
					<view v-if="!userinfo.token">---</view>
				</view>
				<view class="interest">
					<view>总资产(USDT)</view>
					<view v-if="userinfo.token">{{ availableAmount }}</view>
					<view v-if="!userinfo.token">---</view>
				</view>
				<!-- 未实现盈亏(USDT) -->
				<view class="interest">
					<view>未实现盈亏(USDT)</view>
					<view v-if="userinfo.token">{{ PositionsList.unrealizedProfitLoss }}</view>
					<view v-if="!userinfo.token">---</view>
				</view>
				<!-- 已实现盈亏(USDT) -->
				<view class="interest">
					<view>已实现盈亏(USDT)</view>
					<view v-if="userinfo.token">{{ PositionsList.income }}</view>
					<view v-if="!userinfo.token">---</view>
				</view>
				<!-- 风险率 -->
				<view class="Riskrate">
					<view>风险率</view>
					<view><image src="../../static/assert/shiyi.png" mode=""></image></view>
				</view>
				<!-- 无风险 -->
				<view class="no-risk"><view>无风险</view></view>
			</view>
		</uni-drawer>
		<!-- 止盈止损弹框 -->
		<view class="LossStop">
			<!-- 弹窗内容 -->
			<view v-if="stopp" id="myModal" class="modal">
				<view class="modal-content">
					<view>
						止盈止损修改
						<image @tap="Modify" src="../../static/assert/close.png" mode=""></image>
					</view>
					<!-- 止盈设置 -->
					<view class="profit">
						<view>止盈设置</view>
						<view class="profit-one">
							<view><input type="text" placeholder="止盈价位" /></view>
							<view>USDT</view>
						</view>
					</view>
					<!-- 止损设置 -->
					<view class="profit-two">
						<view>止损设置</view>
						<view class="profit-one">
							<view><input type="text" placeholder="止损价位" /></view>
							<view>USDT</view>
						</view>
					</view>
					<!-- 确定 -->
					<view class="login"><button>确定</button></view>
				</view>
			</view>
		</view>
		<!-- 平仓弹框 -->
		<view class="Closed">
			<!-- 弹窗内容 -->
			<view @tap="lossCloseiD" v-if="lossClose" id="myModal" class="modal">
				<view class="modal-content">
					<view>平仓</view>
					<!-- 平仓类型 -->
					<view class="Closing-type">
						<view>平仓类型</view>
						<view v-if="PositionsList.priceType == 1">
							限价平仓
							<!-- <text><image src="../../static/assert/jiantou.png" mode=""></image></text> -->
						</view>
						<view v-else>
							市价平仓
							<!-- <text><image src="../../static/assert/jiantou.png" mode=""></image></text> -->
						</view>
					</view>
					<!-- 平仓数量 -->
					<view class="Closing-type">
						<view>平仓数量</view>
						<view>{{ PositionsList.closeWarehouseAmount }} {{ buynumber }}</view>
					</view>
					<!-- 平仓价 -->
					<view class="Closing-type">
						<view>平仓价</view>
						<view>{{ PositionsList.stopProfitPrice }} USDT</view>
					</view>
					<!-- 盈亏 -->
					<view class="Closing-type">
						<view>盈亏</view>
						<view>{{ PositionsList.income }} USDT</view>
					</view>
					<!-- 确定平仓 -->
					<view @tap="determine" class="login"><button>确定平仓</button></view>
				</view>
			</view>
		</view>
		<!-- BTC永续弹框 -->
		<view class="sustainable">
			<!-- 弹窗内容 -->
			<view @tap="Opendrade" v-if="drawerOpen" class="drawer">
				<view class="modal-content">
					<view v-for="(item, index) in Forever" :key="index" @tap="blow(item.agreementId, item.symbol, item.virtualWalletPairId)" class="drawer-one">
						<view>{{ item.symbol }} 永续</view>
						<view>{{ item.close }}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 买入卖出开多 -->
		<view class="much">
			<!-- 弹窗内容 -->
			<view @tap="Buysell" v-if="muchIdate" class="modal">
				<view class="modal-content">
					<view v-if="type == 1 ? true : false">买入/开多 {{ buynumber }}</view>
					<view v-if="type == 2 ? true : false">卖出/开空 {{ buynumber }}</view>

					<!-- 平仓类型 -->
					<view class="Closing-type">
						<view>开仓价</view>
						<view>{{ equivalent }} USDT</view>
					</view>
					<!-- 平仓数量 -->
					<view class="Closing-type">
						<view>数量</view>
						<view>{{ amount }} {{ buynumber }}</view>
					</view>
					<!-- 总金额 -->
					<view class="Closing-type">
						<view>总金额</view>
						<view>400 USDT</view>
					</view>
					<!-- 保证金 -->
					<view class="Closing-type">
						<view>盈亏</view>
						<view>400 USDT</view>
					</view>
					<!-- 确定平仓 -->
					<view class="login"><button>确定</button></view>
				</view>
			</view>
		</view>
		<!-- 止盈止损说明 -->
		<view class="Description">
			<!-- 弹窗内容 -->
			<view v-if="ending" class="modal">
				<view class="modal-content">
					<!-- 说明 -->
					<view class="loss">止盈止损说明</view>
					<view>当开仓订单的盈亏达到一定程度时，以预先设置好的止盈止损价位自动平仓订单。 （例如，开多时，设置止盈位为9000U，若最新开空价格触达9000U时，自动平仓）</view>
					<view @tap="profitbuy" class="login"><button>知道了</button></view>
				</view>
			</view>
		</view>
		<!-- 风险率说明 -->
		<view class="statement">
			<!-- 弹窗内容 -->
			<view v-if="Risk" class="modal">
				<view class="modal-content">
					<!-- 风险率说明 -->
					<view class="loss">风险率说明</view>
					<view>
						1.风险率=账户权益/冻结保证金;
						<br />
						2.风险率≤150%时，将无法买入合约，风险率≥ 200%默认无风险；
						<br />
						3.风险率≤100%时，系统将自动平仓。
					</view>
					<view @tap="Riskbuy" class="login"><button>知道了</button></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { uniDrawer } from '@dcloudio/uni-ui';
import request from '@/utils/request';
import { getBuySellData, get24hrDataForAll, get24hrDataForAgreement } from '@/api/assert.js';
import { mapState, mapGetters } from 'vuex';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import { toast } from '@/utils/toast';
export default {
	data() {
		return {
			delegate: '', //平仓id
			PositionsList: [], //持仓列表
			Current: [], //当前委托
			totalamount: 0, //总金额
			Risk: false, //风险说明
			ending: false, //止盈止损说明弹框
			muchIdate: false, //买入卖出弹框
			buynumber: '张',
			Forever: [],
			drawerOpen: false, //BTC弹框
			stopp: false, //止盈止损弹框
			lossClose: false, //平仓弹框
			drawerVisible: false,
			symbol: '永续合约',
			typeIndex: 1,
			type: 1,
			ends: 1,
			underway: true,
			begin: false,
			currentEd: '限价',
			currentRRd: '10',
			count: [
				{
					proceed: '10',
					salesStatus: '0'
				},
				{
					proceed: '20',
					salesStatus: '1'
				},
				{
					proceed: '30',
					salesStatus: '2'
				},
				{
					proceed: '50',
					salesStatus: '3'
				}
			],
			countrys: [], //交易类型
			assignment: '1', //合约id
			availableAmount: '', //可用
			Amount: [], //红色
			total: [], //绿色
			childNameId: '',
			numberDate: '张',
			market: {},
			add: 0,
			virtualWalletPa: 2, //获取可开ID
			getcan: '', //张数
			equivalent: '', //价格
			stopProfitPrice: '', //止盈
			stopLossPrice: '', //止损
			amount: '', //委托数量
			marketprice: '1', //限价id
			stateTab: true,
			Pair: ''
		};
	},
	filters: {
		aaa(val) {
			val.substring(0, val.indexOf('/'));
		}
	},
	components: {
		uniPopup,
		uniDrawer
	},
	onLoad() {
		this.Transaction();
		this.Gets(this.virtualWalletPa); //获取可开
		if (this.userinfo.token) {
			this.ending = true;
		}
		this.tateTab = true;
	},
	onShow() {
		if (this.stateTab) {
			this.Transaction();
			this.Gets(this.virtualWalletPa); //获取可开
			if (this.userinfo.token) {
				this.ending = true;
			}
			this.tateTab = true;
		}
		this.tateTab = false;
	},
	mounted() {
		// this.flags()
	},
	onShow() {
		if (!this.islogin) {
			this.$nav('/pages/auth/login');
			console.log(111);
		} else {
			// this.flags()
			// setTimeout(() => {
				this.continueId();
				this.Available();
				// 当前委托
				this.Commissioned();
				// 持仓
				this.Interface();
				setInterval(() => {
					this.dish(this.childNameId);
					this.Clonecny();
				}, 5000);
			// }, 10);
		}
		console.log(222);
	},
	created() {
		
	},
	methods: {
		tokline() {
			uni.navigateTo({
				url: '/pages/trade/kline/main?symbol=' + this.Pair
			});
		},

		// 侧滑功能
		openDrawer() {
			this.drawerVisible = true;
			if ((this.drawerVisible = true)) {
				this.Risk = true;
			} else {
				this.Risk = false;
			}
		},
		closeDrawer() {
			this.drawerVisible = false;
		},
		// 限价下拉
		openPopup() {
			this.$refs.popup.open();
		},
		closePopup() {
			this.$refs.popup.close();
		},
		addCountrysClass(num, num1) {
			this.closePopup();
			this.currentEd = num; //限价市价
			console.log(this.currentEd, 222222);
			this.marketprice = num1; //限价id
			console.log(this.marketprice, 22222222333);
		},

		// 50x下拉
		openPopupr() {
			this.$refs.popupr.open();
		},
		closePopupr() {
			this.$refs.popupr.close();
		},
		addCountrys(index) {
			this.closePopupr();
			console.log(this.count[index].proceed);
			this.currentRRd = this.count[index].proceed;
			// 获取可开
			this.Gets(this.virtualWalletPa);
			console.log(this.virtualWalletPa, 676767);
		},
		// 切换
		chooseChange(val) {
			this.chooseType = val;
		},
		onChangeType(e) {
			this.type = e;
		},
		// 张
		starting(num) {
			this.buynumber = num;
			this.ends = 1;

			(this.underway = true), (this.begin = false);
		},
		// BTC
		start(num) {
			this.buynumber = num;
			this.ends = 2;

			(this.underway = false), (this.begin = true);
		},
		//永续合约账单跳转
		Perpetual() {
			uni.navigateTo({
				url: './Perpetual'
			});
		},
		// 全部委托跳转
		commission(num) {
			uni.navigateTo({
				url: './commission?buynumber=' + num
			});
		},
		// 止盈止损弹框
		Loss() {
			this.stopp = false;
		},
		// 关闭止盈止损
		Modify() {
			this.stopp = false;
		},
		// 打开平仓
		CloseLoss() {
			this.lossClose = true;
		},
		// 关闭平仓
		lossCloseiD() {
			this.lossClose = false;
		},
		// 打开btc弹框
		showDrawer() {
			this.drawerOpen = !this.drawerOpen;
		},
		Opendrade() {
			this.drawerOpen = false;
		},
		// 买入卖出弹框
		Buysell() {
			this.muchIdate = false;
		},
		// 止盈止损说明关闭弹框
		profitbuy() {
			this.ending = false;
		},
		// 风险说明弹框关闭
		Riskbuy() {
			this.Risk = false;
		},
		// 点击BTC赋值
		blow(num1, num2, num3) {
			this.assignment = num1; //ID
			this.childNameId = num2.substring(0, num2.indexOf('/')); //Btc名字
			(this.virtualWalletPa = num3), //获取可开virtualWalletPairId的Id
				// 可用可开
				this.Available(this.assignment);
			// 盘口
			this.dish(this.childNameId);
			this.Clonecny(this.childNameId); //价格更新
		},
		// 平仓记录跳转
		record() {
			uni.navigateTo({
				url: './record'
			});
		},
		// 接口
		continueId() {
			get24hrDataForAgreement({}).then(res => {
				console.log(res.data, 1111);
				if (res.data.code == 200) {
					this.Forever = res.data.data;
					this.childNameId = res.data.data[0].symbol.substring(0, res.data.data[0].symbol.indexOf('/'));
					this.dish(this.childNameId);
				}
				for (let i = 0; i < this.Forever.length; i++) {
					this.Pair = this.Forever[i].symbol;
				}

				console.log(this.Pair, 99997777);
			});
		},
		// 合约可用
		Available() {
			request('/app/userVirtualWallet/userVirtualWallet', 'GET', {
				token: this.userinfo.token,
				virtuaWalletName: 'USDT'
			}).then(res => {
				console.log(res.data, 67676767);
				console.log(this.availableAmount, 11111122);
				if (res.data.code == 200) {
					this.availableAmount = res.data.data[0].availableAmount.toFixed(4);
				}
				try {
					this.availableAmount = JSON.parse(res.data).data[0].availableAmount.toFixed(4);
				} catch (e) {
					// this.availableAmount = res.data.data[0].availableAmount;
				}
			});
		},

		// 盘口接口
		dish(id) {
			getBuySellData({
				childCoinName: id,
				motherCoinName: 'USDT'
			}).then(res => {
				console.log(res.data, 1111);
				if (res.data.code == 200) {
					if (res.data.data.buyList.length > 5) {
						res.data.data.buyList.length = 5;
					} else if (res.data.data.buyList.length < 5) {
						res.data.data.buyList.length = res.data.data.buyList.length;
					}
					if (res.data.data.sellList.length > 5) {
						res.data.data.sellList.length = 5;
					} else if (res.data.data.sellList.length < 5) {
						res.data.data.sellList.length = res.data.data.sellList.length;
					}
					
					this.Amount = res.data.data.sellList.slice(res.data.data.buyList.length - 5, res.data.data.buyList.length);
					this.total = res.data.data.buyList.slice(0, 5);
				}
				try {
					this.Amount = res.data.data.sellList.slice(res.data.data.buyList.length - 5, res.data.data.buyList.length);
					this.total = res.data.data.buyList.slice(0, 5);
				} catch (e) {
					this.Amount = res.data.data.sellList.slice(res.data.data.buyList.length - 5, res.data.data.buyList.length);
					this.total = res.data.data.buyList.slice(0, 5);
				}
			});
		},
		// close*cny
		Clonecny() {
			get24hrDataForAll({}).then(res => {
				// console.log(res.data, 777);
				if (res.data.code == 200) {
					res.data.data.forEach(item => {
						if (item.childCoinName == this.childNameId && item.motherCoinName == 'USDT') {
							this.market = item;
							this.add = item.entity.close * item.entity.motherRateForCNY;
						}
					});
				}
			});
		},
		// 交易类型
		Transaction() {
			request('/agreementEntrust/getPriceType', 'POST', {}).then(res => {
				if (res.data.code == 200) {
					this.countrys = res.data.data;
				} else {
					toast(res.data.msg);
				}
				try {
					this.countrys = JSON.parse(res.data).data;
				} catch (e) {
					this.countrys = res.data.data;
				}
			});
		},
		// 获取可开可张数
		Gets() {
			request('/agreementEntrust/getAvailableZhangNumber', 'GET', {
				token: this.userinfo.token,
				lever: this.currentRRd,
				virtualWalletPairId: this.virtualWalletPa
			}).then(res => {
				console.log(res.data, 67676767);
				if (res.data.code == 200) {
					this.getcan = res.data.data;
				}
				try {
					this.getcan = JSON.parse(res.data).data;
				} catch (e) {
					this.getcan = res.data.data;
				}
			});
		},
		// 添加合约
		contractDate(num, num1, num2, num3) {
			if (this.equivalent == '') {
				toast('请输入价格');
			} else if (this.amount == '') {
				toast('请输入数量');
			} else {
				request('/agreementEntrust/add', 'POST', {
					token: this.userinfo.token,
					agreementId: num1,
					tradeType: num,
					leverMultiple: num2,
					price: this.equivalent,
					stopProfitPrice: this.stopProfitPrice,
					stopLossPrice: this.stopLossPrice,
					amount: this.amount,
					unitType: this.ends,
					pendingOrder: num3
				}).then(res => {
					// console.log(res.data, 123456789);
					// if (res.data.code == 200) {
					this.muchIdate = true;
					this.Commissioned();
					// }
				});
			}
		},
		// 当前委托列表
		Commissioned() {
			request('/agreementEntrust/listEntrust', 'POST', {
				token: this.userinfo.token,
				page: 1,
				rows: 5
				// entrustType:this.marketprice
			}).then(res => {
				console.log(res.data, 67676767);
				if (res.data.code == 200) {
					this.Current = res.data.data;
				}
				try {
					this.Current = JSON.parse(res.data).data;
				} catch (e) {
					this.Current = res.data.data;
				}
			});
		},

		// 持仓列表接口
		Interface() {
			request('/agreementEntrust/listHoldWarehouse', 'GET', {
				token: this.userinfo.token,
				page: 1,
				rows: 1
			}).then(res => {
				console.log(res.data, 67676767);
				if (res.data.code == 200) {
					this.PositionsList = res.data.data[0];
					this.delegate = res.data.data[0].agreementEntrustId;
					console.log(this.delegate, 6543212);
				}
				if (res.data.data == null || res.data.data == '') {
					this.PositionsList = '0';
				}
				try {
					this.PositionsList = JSON.parse(res.data).data[0];
				} catch (e) {
					//TODO handle the exception
					this.PositionsList = res.data.data[0];
				}
			});
		},
		// 撤销接口
		Undo(id) {
			request('/agreementEntrust/delete', 'POST', {
				agreementEntrustId: id
			}).then(res => {
				console.log(res.data, 6);
				if (res.data.code == 200) {
					toast('撤销成功');
				} else {
					toast(res.data.msg);
				}
			});
		},
		// 确认平仓接口
		determine() {
			request('/agreementEntrust/closeThePosition', 'POST', {
				agreementEntrustId: this.delegate
			}).then(res => {
				console.log(res.data, 6);
				if (res.data.code == 200) {
					toast('已平仓');
					this.lossClose = false;
				} else {
					toast(res.data.msg);
				}
			}); 
		}
	},
	computed: {
		...mapState('user', ['userinfo']),
		...mapGetters(['islogin']),
		...mapState('quotation', ['defaultWalletPair'])
	}
};
</script>

<style lang="scss" scoped>
/deep/.uni-popup__wrapper.uni-custom.bottom .uni-popup__wrapper-box {
	width: 100%;
	max-height: 100%;
	overflow-y: scroll;
}

/deep/.uni-popup__wrapper-box {
	padding: 12upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 0upx 0upx 0upx 0upx;
}

/deep/.uni-popup__wrapper-box {
	width: 100%;
	height: 320upx;
}
/deep/.uni-drawer__content {
	display: block;
	position: relative;
	top: 0;
	left: 0;
	width: 61.8%;
	height: 100%;
	background: #ffffff;
	-webkit-transition: all 0.3s ease-out;
	-o-transition: all 0.3s ease-out;
	transition: all 0.3s ease-out;
	-webkit-transform: translatex(-100%);
	-ms-transform: translatex(-100%);
	transform: translatex(-100%);
	z-index: 99999999999999;
}

// 导航条
.header {
	display: flex;
	height: 90upx;
	align-items: center;
	width: 100%;
	padding: 0 30upx;
	box-sizing: border-box;
	// position: fixed;
	// z-index: 999;
	background: #ffffff;
	& > view:nth-child(1) image {
		width: 30upx;
		height: 30upx;
		margin-top: 40upx;
	}
	& > view:nth-child(2) {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(45, 47, 86, 1);
		margin-top: 30upx;
		margin-left: 36%;
	}
}

.contentId {
	height: 100%;
	padding-top: 40upx;
	padding-bottom: 100upx;

	.headerdr > view {
		display: flex;
		align-items: center;
	}

	.headerdr {
		display: flex;
		height: 90upx;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		border-bottom: 1upx solid #f1f1f1;

		.drawer-icon {
			width: 30upx;
			height: 31upx;
		}

		.more-icon {
			width: 36upx;
			height: 32upx;
		}

		.chart-icon {
			width: 37upx;
			height: 35upx;
			margin-right: 52upx;
		}

		.symbol-text {
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(45, 47, 86, 1);
		}
	}

	// 合作权益
	.Contract {
		border-bottom: 20upx solid #f7f7fb;
		padding-bottom: 37upx;
		padding: 0 30upx;

		.Contract-one {
			display: flex;
			justify-content: space-between;
			margin-top: 17upx;

			& > view {
				font-size: 22upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(186, 197, 203, 1);
			}
		}

		.Contract-two {
			// display: flex;
			// justify-content: space-between;
			margin-top: 29upx;

			.user-one {
				margin-top: 21upx;
				display: flex;
				justify-content: space-between;
				text-align: center;

				& > view:nth-child(1) {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(45, 47, 86, 1);
				}

				& > view:nth-child(2) {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(76, 223, 176, 1);

					image {
						width: 14upx;
						height: 19upx;
						margin-left: 7upx;
					}
				}

				& > view:nth-child(3) {
					font-size: 22upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 186, 65, 1);
				}
			}
		}
	}

	// 开仓 持仓
	.Open-position {
		margin-top: 34upx;

		.opend {
			display: flex;
			border-bottom: 1upx solid #f1f1f1;
			padding: 0 30upx;

			& > text {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(140, 151, 157, 1);
			}

			& > text.actived {
				font-size: 34upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(45, 47, 86, 1);
				border-bottom: 2upx solid #2d2f56;
				padding-bottom: 14upx;
			}
		}

		.edge {
			padding: 0 30upx;
			display: flex;
			justify-content: space-between;
			padding-bottom: 30upx;
			border-bottom: 20upx solid #f7f7fb;

			// 左边
			.page-left {
				width: 52%;

				.tabs {
					height: 60upx;
					background: rgba(255, 255, 255, 1);
					border: 1px solid rgba(230, 230, 230, 1);
					border-radius: 10px;
					display: flex;
					align-items: center;
					justify-content: center;

					.buy {
						color: #ffffff;
						font-weight: bold;
						width: 50%;
						height: 60upx;
						line-height: 60upx;
						font-size: 28upx;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
						font-size: 28px;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(45, 47, 86, 1);
						text-align: center;
					}

					.sell {
						color: #ffffff;
						font-weight: bold;
						width: 50%;
						height: 60upx;
						line-height: 60upx;
						font-size: 28upx;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
						font-size: 28px;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(45, 47, 86, 1);
						text-align: center;
					}

					.sell.normal {
						z-index: 10;
						color: #ffffff;
						background: #eb375d;
					}

					.buy.normal {
						z-index: 10;
						color: #ffffff;
						background: #4cdfb0;
					}

					.normal {
						font-size: 28upx;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(38, 37, 80, 1);
						background: rgba(247, 247, 253, 1);
						box-shadow: 0px 3upx 1px 0px rgba(53, 48, 15, 0.08);
						width: 50%;
						height: 60upx;
						margin-top: -2upx;
					}
				}

				// 限价
				.normal-one {
					display: flex;
					justify-content: space-between;
					margin-top: 31upx;

					// 左边
					.normal-left {
						width: 40%;
						height: 60upx;
						background: rgba(247, 247, 251, 1);
						border-radius: 5upx;
						padding: 0 22upx;
						display: flex;
						justify-content: space-between;

						& > view:nth-child(1) {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(45, 47, 86, 1);
						}

						& > view:nth-child(2) image {
							width: 12upx;
							height: 8upx;
						}

						.pay {
							position: relative;
							z-index: 999;

							& > view {
								border-bottom: 1upx solid #f4f4f4;
								padding-bottom: 22upx;
								text-align: center;
								padding-top: 30upx;
							}
						}
					}

					// 右边
					.normal-right {
						width: 30%;
						height: 60upx;
						background: rgba(247, 247, 251, 1);
						border-radius: 5upx;
						padding: 0 22upx;
						display: flex;

						justify-content: space-between;

						& > view:nth-child(1) {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(45, 47, 86, 1);
						}

						& > view:nth-child(2) image {
							width: 12upx;
							height: 8upx;
						}

						.pay {
							& > view {
								border-bottom: 1upx solid #f4f4f4;
								padding-bottom: 22upx;
								text-align: center;
								padding-top: 30upx;
							}
						}
					}
				}

				// 开仓
				.Price {
					height: 66upx;
					border: 1upx solid rgba(196, 206, 212, 1);
					border-radius: 10upx;
					margin-top: 30upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 22upx;

					& > view:nth-child(1) input {
						outline: none;
						border: none;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(186, 197, 203, 1);
					}

					& > view:nth-child(2) {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(140, 151, 157, 1);
					}
				}

				// 可用数量
				.number {
					display: flex;
					justify-content: space-between;
					margin-top: 20upx;

					& > view {
						font-size: 22upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(140, 151, 157, 1);
					}
				}

				// 选填
				.price-one {
					display: flex;
					justify-content: space-between;
					margin-top: 78upx;

					& > view:nth-child(1) {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(45, 47, 86, 1);
					}

					& > view:nth-child(2) image {
						width: 25upx;
						height: 25upx;
					}
				}

				// 止盈价位
				.Check {
					display: flex;
					justify-content: space-between;
					margin-top: 30upx;

					.check-one input {
						width: 95%;
						height: 60upx;
						background: rgba(255, 255, 255, 1);
						border: 1upx solid rgba(196, 206, 212, 1);
						border-radius: 10upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(186, 197, 203, 1);
						align-items: center;
						display: flex;
						justify-content: center;
					}

					.check-one input {
						width: 95%;
						height: 60upx;
						background: rgba(255, 255, 255, 1);
						border: 1upx solid rgba(196, 206, 212, 1);
						border-radius: 10upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(186, 197, 203, 1);
						align-items: center;
						display: flex;
						justify-content: center;
					}
				}

				// 总金额
				.price-two {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(140, 151, 157, 1);
					margin-top: 45upx;
				}

				// 登录
				.login-one button {
					height: 70upx;

					border-radius: 5upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}
			}

			// 右边
			.page-right {
				width: 44%;

				.layout {
					display: flex;
					justify-content: flex-start;

					& > view {
						width: 130upx;
						height: 50upx;
						background: #ffffff;
						border-radius: 25px;
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(140, 151, 157, 1);
						margin: 0 auto;
						display: flex;
						align-items: center;
						justify-items: center;
						justify-content: center;
					}
				}

				.to_end {
					font-size: 24px !important;
					font-family: PingFang-SC-Bold !important;
					font-weight: bold !important;
					color: #2d2f56 !important;
					background: #f3f5fe !important;
				}

				.layout-one {
					margin-top: 60upx;

					.inderway-one {
						display: flex;
						justify-content: space-between;
						border-bottom: 1upx solid #f1f1f1;
						padding-bottom: 24upx;

						& > view:nth-child(1) {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(140, 151, 157, 1);
						}

						& > view:nth-child(2) {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(140, 151, 157, 1);
						}
					}

					// 列表
					.inderway-two {
						border-bottom: 1upx solid #f1f1f1;
						padding-bottom: 24upx;
						margin-top: 30upx;

						.list {
							display: flex;
							justify-content: space-between;

							& > view:nth-child(1) {
								font-size: 24px;
								font-family: PingFang SC;
								font-weight: 400;
								color: rgba(235, 55, 93, 1);
							}

							& > view:nth-child(2) {
								font-size: 24px;
								font-family: PingFang SC;
								font-weight: 400;
								color: rgba(152, 172, 184, 1);
							}
						}
					}

					// 动态
					.dynamic {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(45, 47, 86, 1);
						padding-top: 23upx;
						padding-bottom: 23upx;
						border-bottom: 1upx solid #f1f1f1;
					}
				}
			}
		}

		// 当前委托
		.current {
			padding: 0 30upx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1upx solid #f1f1f1;
			padding-bottom: 30upx;

			.current-left {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(45, 47, 86, 1);
				margin-top: 29upx;
			}

			.current-right {
				display: flex;

				& > view:nth-child(1) image {
					width: 34upx;
					height: 32upx;
					margin-top: 31upx;
				}

				& > view:nth-child(2) {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(140, 151, 157, 1);
					margin-top: 31upx;
					margin-left: 14upx;
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

				& > view:nth-child(1) {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(76, 223, 176, 1);
				}

				& > view:nth-child(2) {
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

				& > view:nth-child(1) {
					font-size: 34upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(45, 47, 86, 1);
				}

				& > view:nth-child(2) {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(186, 197, 203, 1);
				}
			}

			// 张数
			.orders {
				width: 100%;
				border-bottom: 1upx solid #f3f3f3;
				border-top: 1upx solid #f3f3f3;
				padding: 31upx 0upx 70upx 0upx;
				margin: 29upx auto;
				display: flex;

				.order-left {
					width: 50%;
					height: 100upx;
					border-right: 1upx solid #e6e6e6;

					& > view:nth-child(1) {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(140, 151, 157, 1);
						text-align: center;
					}

					& > view:nth-child(2) {
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

					& > view:nth-child(1) {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(140, 151, 157, 1);
						text-align: center;
					}

					& > view:nth-child(2) {
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

				& > view:nth-child(1) {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(186, 197, 203, 1);
					margin-top: 10upx;
				}

				& > view:nth-child(2) {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(45, 47, 86, 1);
					margin-top: 10upx;
				}
			}
		}

		// 图片
		.Charge-img image {
			width: 379upx;
			height: 311upx;
			margin-top: 30upx;
			margin: 0 auto;
			display: flex;
			align-items: center;
		}
		.record-one {
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(140, 151, 157, 1);
			margin-top: 21upx;
			text-align: center;
		}

		// 持仓
		.Position {
			display: flex;
			justify-content: space-between;
			padding: 0 30upx;
			border-bottom: 1upx solid #f1f1f1;
			padding-bottom: 40upx;

			.Position-one {
				display: flex;

				& > view:nth-child(1) {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(45, 47, 86, 1);
				}

				& > view:nth-child(2) {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(76, 223, 176, 1);
					margin-left: 21upx;
				}

				.Position-two {
					width: 93upx;
					height: 40upx;
					background: rgba(247, 247, 251, 1);
					margin-left: 23upx;
					display: flex;
					padding: 0 11upx;
					padding-bottom: 10upx;

					& > view:nth-child(1) {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(104, 129, 255, 1);
					}

					& > view:nth-child(2) image {
						width: 10upx;
						height: 8upx;
						margin-left: 10upx;
					}

					.pay {
						& > view {
							border-bottom: 1upx solid #f4f4f4;
							padding-bottom: 22upx;
							text-align: center;
							padding-top: 30upx;
						}
					}
				}

				// 保证金
				.Margin {
					width: 110upx;
					height: 50upx;
					border: 1upx solid rgba(45, 47, 86, 1);
					border-radius: 25upx;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(45, 47, 86, 1);
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					right: 30upx;
				}
			}
		}

		// 开仓价格
		.Opening-price {
			padding: 0 30upx;
			margin-top: 39upx;
			display: flex;

			& > view:nth-child(1) {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(140, 151, 157, 1);
			}

			& > view:nth-child(2) {
				font-size: 38upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(45, 47, 86, 1);
				margin-left: 40upx;
				margin-top: -10upx;
			}
		}

		// 收益
		.income {
			padding: 0 30upx;

			// 1
			.income-one {
				width: 100%;
				height: 144upx;
				background: rgba(255, 250, 251, 1);
				border: 1upx solid rgba(243, 243, 243, 1);
				margin-top: 40upx;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.income-two {
					& > view:nth-child(1) {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(140, 151, 157, 1);
					}

					& > view:nth-child(2) {
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(235, 55, 93, 1);
					}
				}
			}

			// 2
			.income-line {
				width: 1px;
				height: 96px;
				background: rgba(243, 243, 243, 1);
				border: 1upx solid #f3f3f3;
			}

			// 3
			.income-free {
				& > view:nth-child(1) {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(140, 151, 157, 1);
				}

				& > view:nth-child(2) {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(235, 55, 93, 1);
				}
			}
		}

		// 未实现盈亏
		.Unrealized {
			padding: 0 30upx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin-top: 35upx;

			// 1
			.Unrealized-one {
				width: 46%;
				border-bottom: 1upx solid #f1f1f1;
				padding-bottom: 26upx;
				margin: 41upx auto;
				display: flex;
				height: 50upx;
				justify-content: space-between;

				& > view:nth-child(1) {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(140, 151, 157, 1);

					& > text image {
						width: 20upx;
						height: 19upx;
						margin-left: 10upx;
					}
				}

				& > view:nth-child(2) {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(45, 47, 86, 1);
				}
			}

			// 2
			.Unrealized-two {
				width: 46%;
				height: 100upx;
				height: 50upx;
				border-bottom: 1upx solid #f1f1f1;
				padding-bottom: 26upx;
				margin: 41upx auto;
				display: flex;
				justify-content: space-between;

				& > view:nth-child(1) {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(140, 151, 157, 1);

					& > text image {
						width: 20upx;
						height: 19upx;
						margin-left: 10upx;
					}
				}

				& > view:nth-child(2) {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(45, 47, 86, 1);
				}
			}

			// 3
			.Unrealized-free {
				width: 46%;
				height: 50upx;
				border-bottom: 1upx solid #f1f1f1;
				padding-bottom: 26upx;
				margin: 41upx auto;
				display: flex;
				justify-content: space-between;

				& > view:nth-child(1) {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(140, 151, 157, 1);
				}

				& > view:nth-child(2) {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(45, 47, 86, 1);
				}
			}

			// 4
			.Unrealized-four {
				width: 46%;
				height: 50upx;
				border-bottom: 1upx solid #f1f1f1;
				padding-bottom: 26upx;
				margin: 41upx auto;
				display: flex;
				justify-content: space-between;

				& > view:nth-child(1) {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(140, 151, 157, 1);
				}

				& > view:nth-child(2) {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(45, 47, 86, 1);
				}
			}
		}

		// 止盈止损按钮
		.Stop-Loss {
			padding: 0 30upx;
			display: flex;
			justify-content: space-between;
			margin-top: 50upx;

			& > view:nth-child(1) {
				width: 46%;
				height: 80upx;
				margin: 0 auto;
				background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
				border-radius: 10upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				align-items: center;
				justify-content: center;
				display: flex;
			}

			& > view:nth-child(2) {
				width: 46%;
				height: 80upx;
				margin: 0 auto;
				background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
				border-radius: 10upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				align-items: center;
				justify-content: center;
				display: flex;
			}
		}
	}
}

/deep/.page-container {
	padding-top: calc(80upx);
}

// 侧滑功能css
.permanent {
	padding: 31upx;

	& > view:nth-child(1) {
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(45, 47, 86, 1);
	}

	& > view:nth-child(2) {
		width: 304upx;
		height: 80upx;
		background: rgba(255, 255, 255, 1);
		border: 1upx solid rgba(104, 129, 255, 1);
		border-radius: 10upx;
		margin-top: 60upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(104, 129, 255, 1);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	& > view:nth-child(3) {
		width: 304upx;
		height: 80upx;
		background: rgba(255, 255, 255, 1);
		border: 1upx solid rgba(104, 129, 255, 1);
		border-radius: 10upx;
		margin-top: 30upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(104, 129, 255, 1);
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

// 合作权益
.interest {
	padding-bottom: 19upx;
	border-bottom: 1upx solid #f1f1f1;
	margin-top: 40upx;

	& > view:nth-child(1) {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(140, 151, 157, 1);
	}

	& > view:nth-child(2) {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(45, 47, 86, 1);
		margin-top: 34upx;
	}
}

// 风险率
.Riskrate {
	display: flex;

	& > view:nth-child(1) {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(140, 151, 157, 1);
		margin-top: 52upx;
	}

	& > view:nth-child(2) image {
		width: 20upx;
		height: 20upx;
		margin-left: 30upx;
		margin-top: 63upx;
	}
}

// 无风险
.no-risk {
	& > view:nth-child(1) {
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(255, 186, 65, 1);
		margin-top: 41upx;
	}
}

// 止盈止损弹框
.modal {
	display: block;
	/* 默认隐藏 */
	/*生成绝对定位的元素，相对于浏览器窗口进行定位。*/
	position: fixed;
	z-index: 999;
	left: 0;
	top: 0;
	/*设置弹窗位置*/
	padding-top: 50%;
	padding-bottom: 100upx;
	/*浮在全屏上*/
	width: 100%;
	height: 100%;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.5);
	/* 弹窗内容 */

	.modal-content {
		/*弹窗背景色设置*/
		background-color: #fefefe;
		margin: auto;
		width: 80%;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		padding-bottom: 30upx;
		position: relative;

		& > view:nth-child(1) {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(45, 47, 86, 1);
			padding-top: 40upx;
			text-align: center;

			image {
				width: 23upx;
				height: 23upx;
				margin-left: 114upx;
				position: absolute;
				right: 30upx;
				margin-top: 20upx;
			}
		}

		// 止盈设置
		.profit {
			padding: 0 41upx;

			& > view:nth-child(1) {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(140, 151, 157, 1);
				margin-top: 57upx;
			}

			.profit-one {
				display: flex;
				justify-content: space-between;
				height: 80upx;
				background: rgba(255, 255, 255, 1);
				border: 1px solid rgba(230, 230, 230, 1);
				border-radius: 10upx;
				margin-top: 30upx;
				padding: 0 33upx;
				align-items: center;

				& > view:nth-child(1) input {
					border: none;
					outline: none;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(186, 197, 203, 1);
				}

				& > view:nth-child(2) {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(45, 47, 86, 1);
				}
			}
		}

		// 止损设置
		.profit-two {
			padding: 0 41upx;

			& > view:nth-child(1) {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(140, 151, 157, 1);
				margin-top: 57upx;
			}

			.profit-one {
				display: flex;
				justify-content: space-between;
				height: 80upx;
				background: rgba(255, 255, 255, 1);
				border: 1px solid rgba(230, 230, 230, 1);
				border-radius: 10upx;
				margin-top: 30upx;
				padding: 0 33upx;
				align-items: center;

				& > view:nth-child(1) input {
					border: none;
					outline: none;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(186, 197, 203, 1);
				}

				& > view:nth-child(2) {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(45, 47, 86, 1);
				}
			}
		}

		// 确定
		.login {
			padding: 0 40upx;
			margin-top: 53upx;

			button {
				height: 74upx;
				background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
				border-radius: 10upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
			}
		}

		// 平仓弹框
		.Closing-type {
			width: 80%;
			margin: 0 auto;
			padding-bottom: 29upx;
			border-bottom: 1upx solid #f1f1f1;
			margin-top: 40upx;
			display: flex;
			justify-content: space-between;

			& > view:nth-child(1) {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(140, 151, 157, 1);
			}

			& > view:nth-child(2) {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(45, 47, 86, 1);

				& > text image {
					width: 16upx;
					height: 10upx;
					margin-left: 21upx;
				}
			}
		}
	}
}
// BTC永续弹框
.sustainable {
	// 止盈止损弹框
	.drawer {
		padding: 0 30upx;
		margin-top: 60upx;
		display: block;
		/* 默认隐藏 */
		/*生成绝对定位的元素，相对于浏览器窗口进行定位。*/
		position: fixed;
		z-index: 999;
		left: 0;
		top: 0;
		/*设置弹窗位置*/
		padding-top: 200upx;
		// padding-bottom: 100upx;
		/*浮在全屏上*/
		width: 100%;
		height: 100%;
		/* 弹窗内容 */

		.modal-content {
			/*弹窗背景色设置*/
			width: 60%;
			background-color: #fefefe;
			box-shadow: 0px 1px 24px 0px rgba(0, 0, 0, 0.17);
			border-radius: 10upx;
			padding-bottom: 30upx;
			position: relative;
			padding: 30upx 20upx 40upx 20upx;
			.drawer-one {
				width: 95%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				border-bottom: 1upx solid #f1f1f1;
				padding-bottom: 29upx;
				margin-top: 20upx;
				& > view:nth-child(1) {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(45, 47, 86, 1);
				}
				& > view:nth-child(2) {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(76, 223, 176, 1);
				}
			}
		}
	}
}
// ,买入卖出弹框
.much {
	.modal {
		display: block;
		/* 默认隐藏 */
		/*生成绝对定位的元素，相对于浏览器窗口进行定位。*/
		position: fixed;
		z-index: 999;
		left: 0;
		top: 0;
		/*设置弹窗位置*/
		padding-top: 50%;
		padding-bottom: 100upx;
		/*浮在全屏上*/
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.5);
		/* 弹窗内容 */

		.modal-content {
			/*弹窗背景色设置*/
			background-color: #fefefe;
			margin: auto;
			width: 80%;
			background: rgba(255, 255, 255, 1);
			border-radius: 10upx;
			padding-bottom: 30upx;
			position: relative;

			& > view:nth-child(1) {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(45, 47, 86, 1);
				padding-top: 40upx;
				text-align: center;

				& > text image {
					width: 23upx;
					height: 23upx;
					margin-left: 114upx;
					// position: absolute;
					// right: 30upx;
					margin-top: 20upx;
				}
			}

			// 止盈设置
			.profit {
				padding: 0 41upx;

				& > view:nth-child(1) {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(140, 151, 157, 1);
					margin-top: 57upx;
				}

				.profit-one {
					display: flex;
					justify-content: space-between;
					height: 80upx;
					background: rgba(255, 255, 255, 1);
					border: 1px solid rgba(230, 230, 230, 1);
					border-radius: 10upx;
					margin-top: 30upx;
					padding: 0 33upx;
					align-items: center;

					& > view:nth-child(1) input {
						border: none;
						outline: none;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(186, 197, 203, 1);
					}

					& > view:nth-child(2) {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(45, 47, 86, 1);
					}
				}
			}

			// 止损设置
			.profit-two {
				padding: 0 41upx;

				& > view:nth-child(1) {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(140, 151, 157, 1);
					margin-top: 57upx;
				}

				.profit-one {
					display: flex;
					justify-content: space-between;
					height: 80upx;
					background: rgba(255, 255, 255, 1);
					border: 1px solid rgba(230, 230, 230, 1);
					border-radius: 10upx;
					margin-top: 30upx;
					padding: 0 33upx;
					align-items: center;

					& > view:nth-child(1) input {
						border: none;
						outline: none;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(186, 197, 203, 1);
					}

					& > view:nth-child(2) {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(45, 47, 86, 1);
					}
				}
			}

			// 确定
			.login {
				padding: 0 40upx;
				margin-top: 53upx;

				button {
					height: 74upx;
					background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
					border-radius: 10upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
	}
}
// 止盈止损说明
.Description {
	.modal {
		display: block;
		/* 默认隐藏 */
		/*生成绝对定位的元素，相对于浏览器窗口进行定位。*/
		position: fixed;
		z-index: 999;
		left: 0;
		top: 0;
		/*设置弹窗位置*/
		padding-top: 50%;
		padding-bottom: 100upx;
		/*浮在全屏上*/
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.5);
		/* 弹窗内容 */

		.modal-content {
			/*弹窗背景色设置*/
			background-color: #fefefe;
			margin: auto;
			width: 80%;
			background: rgba(255, 255, 255, 1);
			border-radius: 10upx;
			padding-bottom: 30upx;
			position: relative;
			padding: 0 30upx 30upx;
			.loss {
				padding-top: 46upx;
				padding-bottom: 29upx;
				border-bottom: 1upx solid #f1f1f1;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(45, 47, 86, 1);
				text-align: center;
				margin: 0 auto;
			}
			& > view:nth-child(2) {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(45, 47, 86, 1);
				margin-top: 40upx;
			}
			// 确定
			.login {
				margin-top: 53upx;

				button {
					height: 74upx;
					background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
					border-radius: 10upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
	}
}
//风险说明
.statement {
	.modal {
		display: block;
		/* 默认隐藏 */
		/*生成绝对定位的元素，相对于浏览器窗口进行定位。*/
		position: fixed;
		z-index: 999;
		left: 0;
		top: 0;
		/*设置弹窗位置*/
		padding-top: 50%;
		padding-bottom: 100upx;
		/*浮在全屏上*/
		width: 100%;
		height: 100%;
		z-index: 99999;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.5);
		/* 弹窗内容 */

		.modal-content {
			/*弹窗背景色设置*/
			background-color: #fefefe;
			margin: auto;
			width: 80%;
			background: rgba(255, 255, 255, 1);
			border-radius: 10upx;
			padding-bottom: 30upx;
			position: relative;
			padding: 0 30upx 30upx;

			.loss {
				padding-top: 46upx;
				padding-bottom: 29upx;
				border-bottom: 1upx solid #f1f1f1;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(45, 47, 86, 1);
				text-align: center;
				margin: 0 auto;
			}
			& > view:nth-child(2) {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(45, 47, 86, 1);
				margin-top: 40upx;
			}
			// 确定
			.login {
				margin-top: 53upx;

				button {
					height: 74upx;
					background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
					border-radius: 10upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
	}
}
</style>
