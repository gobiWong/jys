<template>
	<view class="page-body">
		<common-head></common-head>
		<view class='page-title'>{{lang.bind}}</view>
		<view class="form">
			<view class='input-cell'>
				<view class='label'>
					<image src="/static/assert/bind-email.png" mode="" style='width: 38upx;height: 32upx;margin-right: 25upx;'></image>
					<text>{{lang.email}}</text>
				</view> 
				<view class='input-contianers'>
					<view class='input-wrapper'>
						<input type="text" value="" :placeholder='lang.please' placeholder-class='placeholder-class' class='input' v-model='form.mailbox'/>
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
						<input type="text" value="" :placeholder='lang.Please' placeholder-class='placeholder-class' class='input' v-model='form.verificationCodeMailbox'/>
					</view>
					<view class='button-submit'>
						<button @tap='getCode'>{{time>=60?lang.Getcode:time+'s'}}</button>
					</view>
				</view>
			</view>
			<view>
				<button class='submit'  @tap='submit'>{{lang.step}}</button>
			</view>
		</view>
		<draw ref='draw' :type='0'  @callBack='getVerificationCodePhone'></draw>
	</view>
</template>

<script>
	import commonHead from './commonHead';
	import draw from './draw.vue';
	import {
		mapState
	} from 'vuex';
	import {
		sendCode
	} from '@/api/auth';
	import {
		bindEmail
	} from '@/api/user';
	import {
		toast
	} from '@/utils/toast';
	
	export default {
		data() {
			return {
				timer: null,
				time: 60,

				form: {
					mailbox: '',
					verificationCodeMailbox: '',
					verificationCodePhone: '',
				}
			}
		},
		methods: {
			getVerificationCodePhone(val){
				this.$refs.draw.closePopup();
				this.form.verificationCodePhone=val;
				bindEmail(this.form).then(res=>{
					if(res.data.code==200){
						toast('绑定成功')
					}
				});
			},
			
			submit(){
				if(this.form.mailbox=='' || this.form.verificationCodeMailbox==''){
					toast('请先输入相关信息');
					
				} else if(this.form.mailbox.indexOf('@')==-1){
					toast('邮箱格式错误');
				}else if(this.form.verificationCodeMailbox.length!=6){
					toast('验证码格式错误');
				}else{
					this.$refs.draw.openPopup();
				}
			},
			getCode() {
				if (this.form.mailbox == '') {
					toast('请先输入邮箱验证码');
				}else{
					this.sendMSM();
				}
			},
			sendMSM() {
				if (this.time < 60) {
					return false
				};
				
				sendCode({
					type: 1,
					number: this.form.mailbox
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
		mounted() {
			
		},
		computed:{
			...mapState('user', ["userinfo"]),
			...mapState([
				'lang'
			]),
		
			areaNo(){
				return this.type==0? this.userinfo.areaCode:null;
			}
		},
		components: {
			commonHead,
			draw
		}
	}
</script>

<style lang='scss' scoped>
	@import './common.scss';
	uni-page-body {
		height: 100%;
	}
	.page-body{
		min-height: 100%;
	}
</style>
