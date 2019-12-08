<template>
	<view>
		<view class="message">
			<view class="message-one">
				<view @tap="notice" class="message-two">
					<view class="message-image">
						<image src="../../static/assert/gao.png" mode=""></image>
						<text>{{lang.notice}}</text>
						<view class="message-freeze">
							{{lang.Youraccount}}
							<span class="time">{{createTimeItem}}</span>
						</view>
					</view>
				</view>
			</view>
			<!-- 公告 -->
			<view class="message-one">
				<view @tap="announcement" class="message-two">
					<view class="message-image">
						<image src="../../static/assert/gonggaou.png" mode=""></image>
						<text>{{lang.announcement}}</text>
						<view class="message-freeze">
							{{titleItem}}
							<span class="time">{{createTimeId}}</span>
						</view>
					</view>
				</view>
			</view>
			<!-- 活动 -->
			<view class="message-one">
				<view @tap="activity" class="message-two">
					<view class="message-image">
						<image src="../../static/assert/huodon.png" mode=""></image>
						<text>{{lang.activity}}</text>
						<view class="message-freeze">
							{{title}}
							<span class="time">{{createTime}}</span>
						</view>			
					</view>
				</view>
			</view> 
		</view>
	</view>
</template>

<script>
	import { mapState,mapActions} from 'vuex'
	export default {
		data() {
			return {
               titleItem:"",
			   createTimeId:"",
			   title:"",
			   createTime:"",
			   createTimeItem:""
			}
		},
		created(){
			this.eliminate();
			this.washItem();
			this.noticeru();
			this.aaa()
		},
		computed:{
			...mapState('user',['userinfo']),
			...mapState(['lang'])
		},
		methods: {
			// 语言
			aaa(){
				 uni.setNavigationBarTitle({
				     title:this.lang.message
				 });
			},
			// 跳转
           notice(){
			   uni.navigateTo({
			   	//里面是一个对象形式的参数
			   	url: 'notice/notice'
			   })
		   },
		   announcement(){
			   uni.navigateTo({
			   	//里面是一个对象形式的参数
			   	url: 'notice/announcement'
			   })
		   },
		   activity(){
			   uni.navigateTo({
			   	//里面是一个对象形式的参数
			   	url: 'notice/activity'
			   })
		   },
		   // 接口
		   // 通知
		  
         noticeru() {
         	var that = this;
         	uni.request({
         		header: {
         			'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
         		},
         		dataType: 'json',
         		url: 'http://103.214.146.192/app/loginLog/ipManage',
         		data: {
         			page:1,
         			rows:1,
         			token: that.userinfo.token,		
         		},
         
         		method: "GET",
         		success: (res) => {
         			console.log(res.data);
                    that.createTimeItem = res.data.data[0].createTime
         				  
         		}
         
         	})
         },
		   eliminate() {
		   	var that = this;
		   	uni.request({
		   		header: {
		   			'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
		   		},
		   		dataType: 'json',
		   		url: 'http://103.214.146.192/message/regularAnnouncement',
		   		data: {
		   			page:1,
					rows:1,
					type:0
		   		},
		   
		   		method: "GET",
		   		success: (res) => {
		   			console.log(res.data);
		           that.titleItem = res.data.data[0].title
				   that.createTimeId = res.data.data[0].createTime
				  
		   		}
		   
		   	})
		   },
		   washItem() {
		   	var that = this;
		   	uni.request({
		   		header: {
		   			'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
		   		},
		   		dataType: 'json',
		   		url: 'http://103.214.146.192/message/regularAnnouncement',
		   		data: {
		   			page:1,
		   			rows:1,
		   			type:1
		   		},
		   
		   		method: "GET",
		   		success: (res) => {
		   			console.log(res.data);
					that.title = res.data.data[0].title
		            that.createTime = res.data.data[0].createTime
		   				  
		   		}
		   
		   	})
		   },
		}
	}
</script>

<style lang="scss" scoped>
	.message {
		padding: 0 30upx;

		.message-one {
			display: flex;
			justify-content: space-between;

			.message-two {
				width: 100%;
				// height: 100upx;
				border-bottom: 1upx solid #E6E6E6;
				padding-top: 29upx;
				padding-bottom: 29upx;

				.message-image {
					image {
						width: 41upx;
						height: 41upx;

					}

					text {
						font-size: 30upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						margin-left: 17upx;

					}

					.message-freeze {
						font-size: 26upx;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
						margin-left: 59upx;
					}

					.time {
						font-size: 26upx;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						float: right;
                        clear: both;

					}
				}
			}

		}
	}
</style>
