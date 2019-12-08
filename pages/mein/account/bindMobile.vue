<template>
	<view>
		<common-head></common-head>
		<view class='page-title'>{{lang.Bind}}</view>
		<view class="form">
			<view class='input-cell'> 
				<view class='label'>
					<image src="/static/assert/bind-email.png" mode="" style='width: 38upx;height: 32upx;margin-right: 25upx;'></image>
					<text>{{lang.phone}}</text>
				</view>
				<view class='input-contianers'>
					<view class='input-wrapper code-input'>
						<view class="area-code" @tap='showSheet'>+{{areaNo}}</view>
						<input type="text" value="" :placeholder='lang.number' placeholder-class='placeholder-class' class='input' v-model='form.phoneNo ' />
					</view>
				</view>
			</view>
			<view class='input-cell'>
				<view class='label'>
					<image src="/static/assert/bind-code.png" mode="" style='width: 38upx;height: 28upx;margin-right: 31upx;margin-right: 23upx;'></image>
					<text>{{lang.code}}</text>
				</view>
				<view class='input-contianers'>
					<view class='input-wrapper'>
						<input type="text" value="" :placeholder='lang.Please' placeholder-class='placeholder-class' class='input' v-model='form.verificationCodePhone' />
					</view>
					<view class='button-submit'>
						<button @touchmove.stop.prevent='getCode'>{{time>=60?lang.Getcode:time+'s'}}</button>
					</view>
				</view>
			</view>
			<view>
				<button class='submit' @tap='submit'>{{lang.step}}</button>
			</view>
		</view>
		<draw ref='draw' :type='1' @callBack='getVerificationCodePhone'></draw>
	</view>
</template>

<script>
	import commonHead from './commonHead';
	import draw from './draw.vue';
	import {sendCode} from '@/api/auth';
	import {bindPhone} from '@/api/user';
	import {toast} from '@/utils/toast';
	import bus from '@/utils/server.js';
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				timer: null,
				time: 60,
				areaNo: '86',
				form: {
					phoneNo : '',
					verificationCodeMailbox: '',
					verificationCodePhone: '',
				}
			}
		},
		
		methods: {
			showSheet() {
				this.$nav('../../auth/country')
				bus.$on('countryChange', (val) => {
					this.areaNo = val;
				})
			},
			getVerificationCodePhone(val) {
				this.$refs.draw.closePopup();
				this.form.verificationCodeMailbox = val;
				bindPhone({areaCode:this.areaNo,...this.form}).then(res=>{
					if(res.data.code==200){
						toast('绑定成功')
                        setTimeout(() => {
                              uni.redirectTo({
                                  url: './safety'
                              });
                        }, 500);
					}
				});
			},

			submit() {
				if (this.form.phoneNo  == '' || this.form.verificationCodePhone == '') {
					toast('请先输入相关信息');

				} else if(this.userinfo.mailbox == 0 || this.userinfo.mailbox == null){
					toast('还未绑定邮箱,请先绑定邮箱');
				}else {
					this.$refs.draw.openPopup();
				}
			},
			getCode() {
				if (this.form.phoneNo  == '') {
					toast('请先输入邮箱验证码');
				} else{
					this.sendMSM()
				}
			},
			sendMSM() {
				if (this.time < 60) {
					return false
				};
		
				sendCode({
						type: 0,
						number: this.form.phoneNo,
						areaNo:this.areaNo
					})
					.then(res => {
						if (res.data.code == 200) {
							clearInterval(this.timer);
							this.timer = setInterval(() => {
								this.time--;
								if (this.time <= 0) {
									clearInterval(this.timer);
									this.time = 60
								}
							}, 1000)
						}

					})
			}
		},
		components: {
			commonHead,
			draw
		},
		computed: {
			...mapState('user', ['userinfo']),
			...mapState(['lang'])
		},
	}
</script>

<style lang='scss' scoped>
	@import './common.scss';

	.area-code {
		padding-right: 18upx;
		position: relative;
		background: url('/static/assert/down-arow.png') no-repeat;
		background-position: right bottom;
		background-size: 15upx;
		font-size: 28upx;
		line-height: 28upx;
		height: 28upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(45, 47, 86, 1);
		font-size: 26px;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(157, 171, 179, 1);
	}

	.code-input {
		display: flex;
		padding-left: 0 !important;
		input{
			margin-left: 10upx;
		}
	}
</style>
