<template>
	<view>
		<common-head pageTitle='设置资金密码'></common-head>
		<view class="form">
			<!-- 资金密码 -->
			<view class='input-cell'>
				<view class='label'>
					<image src="/static/assert/bind-mobile.png" mode="" style='width: 31upx;height: 46upx;margin-right: 31upx;'></image>
					<text>资金密码</text>
				</view>
				<view class='input-contianers'>
					<view class='input-wrapper'>
						<input type="text" password value="" placeholder='请输入资金密码' placeholder-class='placeholder-class' class='input' v-model='form.newPassword' />
					</view>
				</view>
			</view>
			<!-- 确认密码 -->
			<view class='input-cell'>
				<view class='label'>
					<image src="/static/assert/bind-mobile.png" mode="" style='width: 31upx;height: 46upx;margin-right: 31upx;'></image>
					<text>确认密码</text>
				</view>
				<view class='input-contianers'>
					<view class='input-wrapper'>
						<input type="text" password value="" placeholder='请输入确认密码' placeholder-class='placeholder-class' class='input' v-model='form.confirmPassword' />
					</view>
				</view>
			</view>

			<!-- 短信/邮箱验证码 -->
			<view class='input-cell'>
				<view class='label'>
					<image src="/static/assert/bind-code.png" mode="" style='width: 38upx;height: 28upx;margin-right: 31upx;margin-right: 23upx;'></image>
					<text>短信/邮箱验证码</text>
				</view>
				<view class='input-contianers'>
					<view class='input-wrapper'>
						<input type="text" value="" placeholder='请输入您的验证码' placeholder-class='placeholder-class' class='input' v-model='form.verificationCode ' />
					</view>
					<view class='button-submit'>
						<button @tap='sendMSM'>{{time>=60?'获取验证码':time+'s'}}</button>
					</view>
				</view>
			</view>
			<view>
				<button class='submit' @tap='submit' :disabled='disable' >确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import commonHead from './commonHead';
	import {
		sendCode
	} from '@/api/auth';
	import {
		setAssterPass
	} from '@/api/user';
	import {
		toast
	} from '@/utils/toast';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				
				timer: null,
				time: 60,
				form: {
					newPassword: '',
					confirmPassword: '',
					verificationCode: ''
				},
				disable: true,
			}
		},
		watch: {
			form: {
				handler(val) {
					let j=0;
					for(var i in val){
						j++;
						if(val[i]==''){ break;}
					};
					if(j==3){
						this.disable=false;
					}
				},
				deep: true
			}
		},
		components: {
			commonHead
		},
		computed: {
			...mapState('user', ["userinfo"])
		},
		methods: {
			submit() {

				setAssterPass(this.form).then(res => {
					if(res.code==200){
						toast('设置成功');
						uni.redirectTo({
							url:'./safety'
						})
					}
				})
			},
			sendMSM() {
				if (this.time < 60) {
					return false
				};
				sendCode({
						type: 0,
						number: this.userinfo.phoneNo,
						areaNo: this.userinfo.areaCode
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
		submit() {

		}
	}
</script>

<style lang='scss' scoped>
	@import './common.scss';
</style>
