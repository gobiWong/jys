<template>
	<view>
		<view class="top">
			<statusBar></statusBar>
			<view class="head">
				<image @tap="back" src="/static/img/back-icon-white.png" class="back-icon"></image>
				<text>{{lang.RealNameAuthentication}}</text>
				<text></text>
			</view>
			<!-- 认证队列 -->
			<view class="time-line-row">
				<view>
					<view>
						<!-- 未认证 -->
						<image v-if="userinfo.authorizeLevel==0" src="/static/assert/center-err.png" style="width: 22upx;height: 22upx;"></image>
						<!-- 已认证 -->
						<image v-if="!userinfo.authorizeLevel==0" src="/static/assert/duigou.png" style="width: 30upx;height: 21upx;"></image>
					</view>
					<text>{{lang.InformationAuthentication}}</text>
				</view>
				<view>
					<view>
						<!-- 未认证 -->
						<image v-if='userinfo.authorizeLevel==0 || userinfo.authorizeLevel==1' src="/static/assert/center-err.png" style="width: 22upx;height: 22upx;"></image>
						<!-- 已认证 -->
						<image v-if="userinfo.authorizeLevel==2" src="/static/assert/duigou.png" style="width: 30upx;height: 21upx;"></image>
					</view>
					<text>{{lang.identity}}</text>
				</view>
			</view>
		</view>
		<!-- 认证列表 -->
		<view v-show="recognize" class="certification-list">
			<!-- 个人信息 -->
			<view class="certification-li actived">
				<!-- 等级图标 -->
				<image v-if="userinfo.authorizeLevel==0" src="/static/assert/level-1.png" mode=""></image>
				<image v-if="!userinfo.authorizeLevel==0" src="/static/assert/actived.png" mode=""></image>
				<!-- 白色背景部分 -->
				<view class="card">
					<view>
						<!-- 未认证 -->
						<image v-if="userinfo.authorizeLevel==0" src="/static/assert/level-info.png" class="card-icon"></image>
						<!-- 已认证 -->
						<image v-if="!userinfo.authorizeLevel==0" src="/static/assert/level-info-actived.png" class="card-icon"></image>
						<view class="level-info">
							<view>{{lang.PersonalInformation}}</view>
							<view>{{lang.information}}</view>
						</view>
					</view> 
					<view>
						<!-- 未认证 -->
						<text v-if="userinfo.authorizeLevel==0" @touchstart.stop.prevent="point('0')">{{lang.certification}}</text>
						<!-- 已认证 -->
						<text v-if="!userinfo.authorizeLevel==0" @touchstart.stop.prevent="point('0')" style="background: #DDDDEA;">{{lang.certified}}</text>
					</view>
				</view>
			</view>
			<!-- 证件信息 -->
			<view class="certification-li">
				<!-- 等级图标 -->
				<image v-if="userinfo.authorizeLevel!==2" src="/static/assert/level-2.png" mode=""></image>
				<image v-if="userinfo.authorizeLevel==2" src="/static/assert/actiive.png" mode=""></image>
				<!-- 白色背景部分 -->
				<view class="card">
					<view>
						<image v-if="userinfo.authorizeLevel!==2" src="/static/assert/level-identity.png" class="card-icon"></image>
						<image v-if="userinfo.authorizeLevel==2" src="/static/assert/level-identity-actived.png" class="card-icon"></image>
						<view class="level-info">
							<view>{{lang.Certificate}}</view>
							<view>24H{{lang.Withdrawal}}：50 BTC</view>
						</view>
					</view>
					<view>
						<text v-if="userinfo.authorizeLevel!==2" @touchstart.stop.prevent="point('1')">{{lang.certification}}</text>
						<!-- 已认证 -->
						<text v-if="userinfo.authorizeLevel==2" @touchstart.stop.prevent="point('1')" style="background: #DDDDEA;">{{lang.certified}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 认证 -->
        <!-- 0：审核中 1：审核通过，2：已拒绝（拒绝理由） -->
		<view v-show="theIcd" style="padding: 0upx;" class="certification-list">
			<swiper class="swiper" :current="current" :indicator-dots="indicatorDots" :autoplay="autoplay" :style="{height:swierHeight+'px'}" :interval="interval"
			 :duration="duration">
				<swiper-item v-if="userinfo.authorizeLevel==0">
					<view class="swiper-item">
						<view>{{lang.InformationAuthentication}}</view>
						<!-- 国家地区 -->
						<view class="countries">
							<view>
								<!-- 未认证 -->
								<view style="background:#DDDDEA"></view>
							</view>
							<view>{{lang.region}}</view>
						</view>
						<!-- 选择国家 -->
						<view class="choose">
							<view></view>
							<view class="region">
								<!-- <view>请选择国家/地区</view> -->
								<picker @change="bindPickerChange" :value="index" :range="array">
									<view class="uni-input">{{array[index]}}</view>
								</picker>
								<view>
									<image src="../../../static/assert/more-icon.png" mode=""></image>
								</view>
							</view>
						</view>
						<!-- 姓名 -->
						<view style="margin-top: -40upx;" class="countries">
							<view>
								<!-- 未认证 -->
								<view style="background:#DDDDEA"></view>
							</view>
							<view>{{lang.name}}</view>
						</view>
						<!-- 选择国家 -->
						<view class="choose">
							<view></view>
							<view class="region">
								<input v-model="name" style="font-size: 24upx;" type="text" value="" :placeholder="lang.entername" />
							</view>
						</view>
						<!-- 证件类型 -->
						<view style="margin-top: -40upx;" class="countries">
							<view>
								<!-- 未认证 -->
								<view style="background:#DDDDEA"></view>
							</view>
							<view>{{lang.Document}}</view>
						</view>
						<!-- 选择证件类型 -->
						<view class="choose">
							<view></view>
							<view class="region">
								<picker @change="bindPickerChange1" :value="index1" :range="array1">
									<view class="uni-input">{{array1[index1]}}</view>
								</picker>
								<view>
									<image src="../../../static/assert/more-icon.png" mode=""></image>
								</view>
							</view>
						</view>
						<!-- 证件号码 -->

						<view style="margin-top: -40upx;" class="countries">
							<view>
								<!-- 未认证 -->
								<view style="background:#DDDDEA"></view>
							</view>
							<view>{{lang.certificate}}</view>
						</view>

						<view class="choose">
							<view style="border:none"></view>
							<view class="region">
								<input v-model="idCard" style="font-size: 24upx;" type="text" value="" :placeholder="lang.enterid" />
							</view>
						</view>
						<!-- 提交 -->
						<view class="pupickButtom">
							<button style="background: #6881FF;" @tap="identity">{{lang.submit}}</button>
						</view>
					</view>
				</swiper-item>
				<!-- 认证后的身份认证 -->
				<swiper-item v-if="!userinfo.authorizeLevel==0">
					<view class="swiper-item">
						<view>{{lang.InformationAuthentication}}</view>
						<!-- 国家地区 -->
						<view class="countries">
							<view>
								<!-- 未认证 -->
								<view style="background:#6B87FF"></view>
							</view>
							<view>{{lang.region}}</view>
						</view>
						<!-- 选择国家 -->
						<view class="choose">
							<view></view>
							<view class="region">
								<view v-html="severe==null? '':severe.countryName"></view>
								<view>
									<image src="../../../static/assert/more-icon.png" mode=""></image>
								</view>
							</view>
						</view>
						<!-- 姓名 -->
						<view style="margin-top: -40upx;" class="countries">
							<view>
								<view style="background:#6B87FF"></view>
							</view>
							<view>{{lang.name}}</view>
						</view>
						<!-- 选择国家 -->
						<view class="choose">
							<view></view>
							<view class="region">
								<view v-html="severe==null? '':severe.cname"></view>

							</view>
						</view>
						<!-- 证件类型 -->
						<view style="margin-top: -40upx;" class="countries">
							<view>
								<view style="background:#6B87FF"></view>
							</view>
							<view>{{lang.Document}}</view>
						</view>
						<!-- 选择证件类型 -->
						<view class="choose">
							<view></view>
							<view class="region">

								<view v-html="severe==null? '':severe.credentialsType"></view>
								<view>
									<image src="../../../static/assert/more-icon.png" mode=""></image>
								</view>
							</view>
						</view>
						<!-- 证件号码 -->

						<view style="margin-top: -40upx;" class="countries">
							<view>
								<view style="background:#DDDDEA"></view>
							</view>
							<view>{{lang.certificate}}</view>
						</view>

						<view class="choose">
							<view style="border:none"></view>
							<view class="region">
								<view v-html="severe==null? '':severe.cardNum"></view>
							</view>
						</view>
						<!-- 提交 -->
						<view class="pupickButtom">
							<button style="background: #DDDDEA;">{{lang.submit}}</button>
						</view>
					</view>
				</swiper-item>
				<!-- 身份证照片上传 -->
				<swiper-item v-if="userinfo.authorizeLevel!==2">
					<view class="swiper-itemId">
						<view>{{lang.identity}}</view>
						<view class="surface">
							<view>{{lang.positive}}</view>
							<view>{{lang.reverse}}</view>
						</view>
						<!-- 照片 -->
						<view>
							<view class="surface" @tap="upload">
								<view>
									<image src="../../../static/assert/shenfenzhengmian.png" mode=""></image>
								</view>
								<view>
									<image  src="../../../static/assert/fanmian.png" mode=""></image>
								</view>
							</view>
							<view class="surfaceimg" @tap="upload1">
								<view>
									<image  src="../../../static/assert/tianjia.png" mode=""></image>
								</view>
								<view>
									<image  src="../../../static/assert/tianjia.png" mode=""></image>
								</view>
							</view>
						</view>
						<!-- 手持身份证照片 -->
						<view class="handheld">
							<view>{{lang.photo}}</view>
							<view>
								<image src="../../../static/assert/shouchi.png" mode=""></image>
							</view>
							<view>
								<image @tap="upload2" src="../../../static/assert/tianjia.png" mode=""></image>
							</view>
							<view>{{lang.visible}}
							</view>
						</view>
						<!-- 提交 -->
						<view class="pupickButtom">
							<button @tap="uploadEd">{{lang.submit}}</button>
						</view>

					</view>
				</swiper-item>
				<!-- 已认证身份上传 -->
               	<swiper-item v-if="userinfo.authorizeLevel==2">
               	<view class="swiper-itemId">
               		<view>{{lang.identity}}</view>
               		<view class="surface">
               			<view>{{lang.positive}}</view>
               			<view>{{lang.reverse}}</view>
               		</view>
               		<!-- 照片 -->
               		<view>
               			<view  class="surface">
               				<view>
               					<image :src="imgurl" mode=""></image>
               				</view>
               				<view>
               					<image :src="picture" mode=""></image>
               				</view>
               			</view>
               			<view class="surfaceimg">
               				<view>
               					<image style="width: 147upx;height: 97upx;" src="../../../static/assert/chenggong.png" mode=""></image>
               				</view>
               				<view>
               					<image style="width: 147upx;height: 97upx;" src="../../../static/assert/chenggong.png" mode=""></image>
               				</view>
               			</view>
               		</view>
               		<!-- 手持身份证照片 -->
               		<view class="handheld">
               			<view style="margin-top: -38px;">{{lang.photo}}</view>
               			<view>
               				<image  :src="imgurlImg" mode=""></image>
               			</view>
               			<view>
               				<image style="width: 147upx;height: 97upx;" src="../../../static/assert/chenggong.png" mode=""></image>
               			</view>
               			<view style="margin-top: -30upx;">{{lang.visible}}
               			</view>
               		</view>
               		<!-- 提交 -->
               		<view class="pupickButtom">
               			<button style="background: #DDDDEA;">{{lang.submit}}</button>
               		</view>
               
               	</view>
               </swiper-item>


			</swiper>
		</view>
	</view>
</template>
 
<script>
	import request from '@/utils/request';
	import {toast} from '@/utils/toast';
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				whole: true,
				identityTd: true,
				severe: [], //查看认证后的信息一级
				idCard: "", //证件号
				name: "", //名字
				title: 'picker',
				array: [],
				array1: ['身份证','护照', '驾照', ],
				index: 0,
				index1: 0,
				recognize: true,
				theIcd: false,
				indicatorDots: false,
				autoplay: false,
				interval: 2000,
				duration: 500,
				current: 0,
				listCountry: "",
				countryId: 140,
				picList:[],
				imgurl:"",
				picture:"",
				imgurlImg:"",
				front:"",//照片前面
                backend:"",//背面
                hand:""//手持
			}
		},
		onLoad(){
			this.countriesId();
			this.checkEd();
			this.checkId()
		},
		computed: {
			...mapState('user', ['userinfo']),
			...mapState(['lang']),
			swierHeight() {
				return uni.getSystemInfoSync().windowHeight;
			
			}
		},
		methods: {
			point(num) {
				this.recognize = false;
				this.theIcd = true;
				this.current = num
			},

			back() {
				uni.switchTab({
					url: '../index'
				});
			},

			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				console.log(this.array[this.index])
				for (var i = 0; i < this.listCountry.length; i++) {
					if (this.listCountry[i].name == this.array[this.index]) {
						this.countryId = this.listCountry[i].id
					}
				}
				console.log(this.countryId)
			},
			bindPickerChange1: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index1 = e.target.value

				console.log(this.countryId)
			},
			// 接口数据
			
			countriesId() {		
				request('/countryCity/listCountry', 'GET', {
						page: 1,
						rows: 239,
					})
					.then(res => {
						if (res.data.code == 200) {
							this.listCountry = res.data.data
						}else{
							toast(res.data.msg);
						}
						var aa = []
						for (var i = 0; i < res.data.data.length; i++) {
							aa.push(res.data.data[i].name)
						}
						this.array = aa
						// console.log(aa)
					})
			
			},

			// 一级身份证认证接口
			identity() {				
				request('/app/idCard/add', 'POST', {
						token: this.userinfo.token,
						idCard: this.idCard,
						name: this.name,
						credentialsType: this.index,
						countryId: this.countryId
					})
					.then(res => {
						if (res.data.code == 200) {
							toast("提交成功")
							uni.switchTab({
								url:'../index'
							})
						}else{
							toast(res.data.msg);
						}
						
					})
			
			},
		

			// 已认证后查看信息
			checkEd() {
				request('/app/idCard/lookIdCardInfo', 'GET', {
						token: this.userinfo.token,
						type: 0
					})
					.then(res => {
						console.log(res.data);
						if(res.data.code==200){
							this.severe = res.data.data
						}
						try{
							this.severe = JSON.parse(res.data).data
						}catch(e){
							//TODO handle the exception
							this.severe = res.data.data
						}
						
					})
			
			},

			// 二级
			checkId() {
				
				request('/app/idCard/lookIdCardInfo', 'GET', {
						token: this.userinfo.token,
						type: 1
					})
					.then(res => {
                        console.log(res,1)
                        console.log(res.data.data,123);
						// console.log(JSON.parse(res.data.data[0]),321321);
                        
						if(res.data.code==200){
                            
                            // if(res.data.data == 0){
                            //     this.imgurl = this.picture = this.imgurlImg = ''
                            //     toast('请上传照片认证');
                            //     return false
                            // }
                            console.log(res.data.data,321)
                            
							this.imgurl = res.data.data.front
							this.picture = res.data.data.backend
							this.imgurlImg = res.data.data.hand
// =======321
       //                      console.log(res.data.data[0].front,103)
							// this.imgurl = res.data.data[0].front
							// this.picture = res.data.data[0].backend
							// this.imgurlImg = res.data.data[0].hand
// >>>>>>> 767f41ceca8753c00a3bdf8227281bf778edbd7b
                            console.log(this.imgurl,this.picture,this.imgurlImg,321)
						}
						try{
							this.imgurl = JSON.parse(res.data).data.front
							this.picture = JSON.parse(res.data).data.backend
							this.imgurlImg = JSON.parse(res.data).data.hand
						}catch(e){
							//TODO handle the exception
							this.imgurl = res.data.data.front
							this.picture = res.data.data.backend
							this.imgurlImg = res.data.data.hand
						}
						
					})
			
			},
			// 上传正面
			upload: function() {
                console.log('正面')
				uni.chooseImage({
					sizeType: ['compressed'],
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: 'http://104.143.37.43:8080/storage/listUpload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file1',
							success: (uploadFileRes) => {
								// console.log(typeof(uploadFileRes.data));							
								if(JSON.parse(uploadFileRes.data).code==200){
									toast("上传成功")
									this.front = JSON.parse(uploadFileRes.data).data
									console.log(this.front,88888888888888)
								}else{
									toast(JSON.parse(uploadFileRes.data).msg)
								}
								
								
							}
						});
					}
				});

			},
			// 反面
			upload1: function() {
				uni.chooseImage({
					sizeType: ['compressed'],
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
                        console.log(tempFilePaths,131313)
						uni.uploadFile({
							url: 'http://104.143.37.43:8080/storage/listUpload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file2',
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data,131313);							
								if(JSON.parse(uploadFileRes.data).code==200){
									toast("上传成功")
									this.backend = JSON.parse(uploadFileRes.data).data
									console.log(this.backend,321321)
								}else{
									toast(JSON.parse(uploadFileRes.data).msg)
								}
								
								
							}
						});
					}
				});
			
			},
			// 手持身份证
			upload2: function() {
				uni.chooseImage({
					sizeType: ['compressed'],
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: 'http://104.143.37.43:8080/storage/listUpload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file3',
							success: (uploadFileRes) => {
								// console.log(typeof(uploadFileRes.data));							
								if(JSON.parse(uploadFileRes.data).code==200){
									toast("上传成功")
									this.hand = JSON.parse(uploadFileRes.data).data
									console.log(this.hand,88888888888888)
								}else{
									toast(JSON.parse(uploadFileRes.data).msg)
								}
								
								
							}
						});
					}
				});
			
			},
			// 二级身份证认证接口
			uploadEd() {
                // console.log(this.picList,9999)
                let data = {
						token: this.userinfo.token,
						front: this.front.file1Url,
                        backend: this.backend.file2Url,
                        hand: this.hand.file3Url,
					}
                    
				request('/app/idCard/addIdCardImg', 'POST', data)
					.then(res => {
						console.log(res.data);
						if(res.data.code==200){
							toast("提交成功")
                            this.authorizeLevel = 2
							uni.switchTab({
								url:'../index'
							})
						}else{
							toast(res.data.msg);
						}
						
					})
			
			},
		




		}
	}
</script>

<style scoped lang="scss">
	@import './common.scss';

	/deep/.uni-input {
		height: 21upx;
		padding: 0upx;
	}

	.top .time-line-row {
		margin-top: 12upx;
		display: flex;
		justify-content: space-between;
		padding: 0 220upx;
	}

	.certification-list {
		padding: 0 30upx;
		margin-top: -140upx;

		// 身份认证
		.swiper-item {
			width: 80%;
			margin: 0 auto;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0upx 9upx 18upx 0upx rgba(64, 64, 112, 0.13);
			border-radius: 10upx;
			border: 1upx solid rgba(255, 255, 255, 1);
			padding-bottom: 54upx;

			// 信息认证
			&>view:nth-child(1) {
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(45, 47, 86, 1);
				text-align: center;
				margin-top: 37upx;
			}

			// 国家
			.countries {
				display: flex;
				padding: 0 24upx;

				&>view:nth-child(1)>view {
					width: 28upx;
					height: 28upx;
					border-radius: 50%;
					margin-top: 66upx;
				}

				&>view:nth-child(2) {
					font-size: 24upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(45, 47, 86, 1);
					margin-left: 22upx;
					margin-top: 60upx;
				}
			}

			.choose {
				display: flex;
				padding: 0 24upx;

				&>view:nth-child(1) {
					width: 2upx;
					height: 110upx;
					border: 2upx dashed rgba(221, 221, 234, 1);
					margin-left: 10upx;
				}

				&>view:nth-child(2) {
					font-size: 24upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(186, 197, 203, 1);
					margin-left: 35upx;
				}

				.region {
					width: 82%;
					height: 100%;
					padding-top: 17upx;
					padding-bottom: 17upx;
					border-bottom: 2upx solid #F0F0FA;
					margin-left: 35upx;
					display: flex;
					justify-content: space-between;

					&>view:nth-child(1) {
						font-size: 24upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(186, 197, 203, 1);
					}

					&>view:nth-child(2) image {
						width: 11upx;
						height: 26upx;
					}

				}
			}

			// 姓名
			.name {
				display: flex;
				padding: 0 24upx;

				&>view:nth-child(1) {
					width: 28upx;
					height: 28upx;
					background: #6B87FF;
					border-radius: 50%;
					margin-top: 20upx;
				}

				&>view:nth-child(2) {
					font-size: 24upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(45, 47, 86, 1);
					margin-left: 22upx;
					margin-top: 12upx;
				}
			}

			// 提交
			.pupickButtom button {
				width: 80%;
				height: 80upx;
				margin: 0 auto;
				background: #DDDDEA;
				border-radius: 10upx;
				margin-top: 92upx;
				font-size: 32upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				border:none !important;
				
			}
		}

		// 身份认证上传图片
		.swiper-itemId {
			width: 80%;
			margin: 0 auto;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0upx 9upx 18upx 0upx rgba(64, 64, 112, 0.13);
			border-radius: 10upx;
			border: 1upx solid rgba(255, 255, 255, 1);
			padding-bottom: 54upx;

			&>view:nth-child(1) {
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(45, 47, 86, 1);
				text-align: center;
				margin-top: 37upx;
			}

			// 正面反面
			.surface {
				display: flex;
				justify-content: space-around;

				&>view {
					font-size: 21upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(45, 47, 86, 1);
					margin-top: 54upx;

					image {
						width: 200upx;
						height: 136upx;
						margin-top: -20upx;
						position: relative;
					}

				}

			}

			.surfaceimg {
				display: flex;
				justify-content: space-around;

				image {
					width: 70upx;
					height: 70upx;
					position: relative;
					top: -115px;
				}
			}

			// 手持身份证
			.handheld {
				&>view:nth-child(1) {
					font-size: 21upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(45, 47, 86, 1);
					text-align: center;
					margin-top: -20upx;
				}

				&>view:nth-child(2) image {
					width: 426upx;
					height: 248upx;
					margin: 0 auto;
					display: flex;
					position: relative;
				}

				&>view:nth-child(3) image {
					width: 70upx;
					height: 70upx;
					position: relative;
					top: -115px;
					margin: 0 auto;
					display: flex;
				}

				&>view:nth-child(4) {
					width: 372upx;
					height: 88upx;
					font-size: 22upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(186, 197, 203, 1);
					margin-top: 46upx;
					text-align: center;
					margin: 0 auto;
				}
			}

			// 提交
			.pupickButtom button {
				width: 80%;
				height: 80upx;
				margin: 0 auto;
				background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
				border-radius: 10upx;
				margin-top: 92upx;
				font-size: 32upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
			}
		}

		.certification-li {
			font-size: 0;

			&>.card {
				&>view:first-child {
					display: flex;
					align-items: center;

					.level-info {
						margin-left: 29upx;
					}
				}

				&>view:last-child {
					text {
						display: inline-block;
						text-align: center;
						font-size: 24px;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(255, 255, 255, 1);
						background-color: #DDDDEA;
						border-radius: 20px;
						line-height: 40upx;
						width: 114px;
						height: 40px;
					}
				}

				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left: 46upx;
				padding-right: 84upx;
				box-shadow: 0px 9px 18px 0px rgba(64, 64, 112, 0.13);
				border-radius: 10px;
				background-color: #F6F6F6;
				height: 178upx;
				margin-bottom: 86upx;

				.card-icon {
					width: 57upx;
					height: 48upx;
					vertical-align: middle;
				}

			}

			&>image {
				width: 73upx;
				height: 37upx;
			}
		}

		.certification-li.actived {
			&>.card {
				height: 194upx;
				margin-bottom: 56upx;
				background-color: #FFFFFF;

				.card-icon {
					width: 62upx;
					height: 62upx;
					vertical-align: middle;
				}

				&>view:last-child {
					text {
						font-size: 24px;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(255, 255, 255, 1);

						background: linear-gradient(51deg, rgba(249, 151, 39, 1), rgba(250, 210, 91, 1));
						border-radius: 20px;
						height: 40px;
						line-height: 40upx;
						padding: 0 10upx;
					}
				}
			}

		}
	}

	/deep/uni-swiper .uni-swiper-wrapper {
		overflow: hidden;
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-transform: translateZ(0);
		transform: translateZ(0);
	}
</style>
