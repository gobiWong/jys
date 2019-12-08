<template>
	<view>
		<statusBar/>
		<!-- 导航栏 -->
		<navHead @open='openDrawer'></navHead>
		<!-- 导航栏结束 -->
		<view class="container">
			<view class="content">
				<!-- 买卖部分 -->
				<view class="trade">
					
				 <tradePanel ref="trade" @onsubmit='submit' :type="type" :motherCoinName='motherCoinName' :childCoinName='childCoinName'></tradePanel>

				</view>
				<!-- 深度部分 -->
				<view class="position">
					<positionList v-on:depthChange="depthChange" :motherCoinName='motherCoinName' :childCoinName='childCoinName'></positionList>
				</view>
			</view>
			<!-- 线 -->
			<view class="uni-gap"></view>
			<!-- 委托列表部分 -->
			<entrustOrderList :entrustType='type' ref='entrustOrderList'></entrustOrderList>
			
			<!-- 侧滑部分 -->
			<uni-drawer :visible="drawerVisible" mask="false" mode="left" @close="closeDrawer">
				<marketDrawer :areaList="motherCoinNames" @onchange='symbolChange'></marketDrawer>
			</uni-drawer>
		</view>
	</view>

</template>

<script>
	import {mapState, mapActions, mapGetters} from 'vuex'
	import { uniDrawer } from '@dcloudio/uni-ui'
	import positionList from '../../components/positionList.vue'
	import tradePanel from '../../components/tradePanel.vue'
	import entrustOrderList from '../../components/entrustOrderList.vue'
	import marketDrawer from '../../components/marketDrawer.vue';
	import navHead from '../../components/nav/nav.vue';
	
	export default {
		onReady() {
		
		},

		onShow() {
			let _this = this;
			uni.getStorage({
				key: 'market',
				success: function(res) {
					this.market = res.data;
					this.type = res.data.type;
					setTimeout(() => {
						_this.$refs.trade.onChangeType(res.data.type)
					}, 10)
					
				}
			});
		},
		onHide() {
			this.$refs.trade.onChangeType(1)
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.drawerVisible = true;
			} else {
				
			}
		},
		components: {
			navHead,
			uniDrawer,
			positionList,
			entrustOrderList,
			tradePanel,
			marketDrawer
		},
		data() {
			return {
				market: {},
				drawerVisible:false,
				scrollLeft: 0,
				areaList: [], 
				depthValue: 1,
				type: 1,
				motherCoinName:'',
				childCoinName:''
			}
		},
		mounted() {
			this.areaList = [];
			
			
		},
		created() {
			this.childCoinName=this.defaultWalletPair.name.split('/')[0];
			this.motherCoinName=this.defaultWalletPair.name.split('/')[1];
		},
		computed: {
			...mapGetters(['motherCoinNames']),
			...mapState('quotation',['defaultWalletPair']),
			
		},
		methods: {
			symbolChange(obj){//交易对发送改变时
				this.motherCoinName=obj.motherCoinName;
				this.childCoinName=obj.childCoinName;	
				this.closeDrawer();
				this.$refs.entrustOrderList.getData();
				this.$refs.trade.typeChange()
				this.$refs.trade.getPriceData()
			},
			submit(){
				this.$refs.entrustOrderList.getData();
			},
			openDrawer(){
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

<style scoped>
	.content {
		margin-top: 20upx;
		display: flex;
	}

	.content .trade {
		width: 60%;
		padding-left: 20upx;
		padding-right: 20upx;
	}

	.content .position {
		width: 40%;
	}

	.status-contents {
		height: var(--status-bar-height);
	}

	.top-view {
		width: 100%;
		position: fixed;
		top: 0;
	}

	.status {
		height: var(--status-bar-height);
	}
</style>
