<script>
	import {mapActions,mapMutations,mapState} from 'vuex'
	export default {
		
		onLoad() {
			
		},
		onShow(){
			uni.setTabBarItem({
			  index: 0,
			  text:this.lang.symbol,
			 
			}),
			uni.setTabBarItem({
			  index: 1,
			  text: this.lang.COINS,
			 
			}),
			uni.setTabBarItem({
			  index: 2,
			  text: this.lang.contract,
			 
			}),
			uni.setTabBarItem({
			  index: 3,
			  text: this.lang.assets,
			 
			}),
			uni.setTabBarItem({
			  index: 4,
			  text: this.lang.mine,
			 
			})
		},
		computed:{
			...mapState(['lang']),
		},
		onLaunch(){
			// 缓存国家区号信息到vuex
			this.listCountryaz();
			// 从Storage获取登录和用户信息，缓存到vuex
			let _self=this;
			uni.getStorage({
				key:'userinfo',
				success:function(data){
					_self.changeLoginStatus(data.data.token!=undefined);
					_self.$store.commit('user/LOGIN_INFO',data.data);
				}
			})
			//缓存母币信息到母币信息
			this.set_motherCoinName();
			// 获取缓存的交易对 
			uni.getStorage({
				key:'setDefaultWalletPair',
				success:function(data){
				
					_self.$store.commit('quotation/setDefaultWalletPair',data.data);
				}
			})
		},
		methods: {
			...mapActions('user',['listCountryaz','changeLoginStatus']),
			...mapActions('quotation',['set_motherCoinName']),
			
			
			
			async getLocation() {
				return await new Promise((resolve, reject) => {
					wx.getLocation({
						success(location) {
							resolve(location)
						},
						fail(err) {
							
							reject(err)
						}
					})
				})
			}
		}
	}
</script>

<style>
	
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	
	[v-cloak] { display: none }
	/* 自定义的通用文件 */
	.undisButton{
		background:linear-gradient(-90deg,rgba(104,129,255,1),rgba(115,156,255,1)) !important;
	}
	.uni-body.pages-c2c-pay{
		background-color: #F7F7FB;
	}
	html,
	body {
		overflow: hidden;
		height: 100%;
	}
	
	.container {
		font-size: $font-base;
		overflow: hidden;
	}

	.wrapper {
		font-size: $font-base;
		text-align: left;
	}

	* {
		transition: width 2s;
		-moz-transition: width 2s;
		-webkit-transition: width 2s;
		-o-transition: width 2s;
	}

	/* font color */
	

	.gray {
		color: #808080;
	}

	.wxParse {
		text-indent: 2em;
	}

	.wxParse image {
		text-indent: 0;
	}

	.wxParse ._view {
		padding: 0 10rpx;
		text-indent: 0;
	}

	.wxParse .p {
		text-indent: 1em;
	}
	.page-head-title{
		font-size:38upx;
		font-family:PingFang-SC-Bold;
		font-weight:bold;
		color:rgba(38,37,80,1);
		margin-left: 30upx;
	}
	.page-container{
		/* #ifdef APP-PLUS */
			padding-top: calc(96upx + var(--status-bar-height)) ;
		/* #endif */
		/* #ifndef APP-PLUS */
		padding-top: calc(96upx ) ;
		/* #endif */
	}
</style>
