<template>
	<view>
		<view class="pay-dialog" v-if="dialogFormVisible" @tap="change(!closeOnClickModal)">
			<view class="dialog-content" :style="{marginTop:top}" @tap.stop="change(true)">
				<view class="head">
					<view class="title">请输入交易密码</view>
					<image src="/static/pay-close-icon.png" class="pay-close-icon" @tap.stop="hide"></image>
				</view>
				<view class="content">
					<view class="inputbox" ref='inputbox'>
						<input type="password" maxlength="6" class='pwd-input' @input="input" />
						<input type="password" class="password" readonly='' v-model="form.onePass" />
						<input type="password" class="password" readonly='' v-model="form.twoPass" />
						<input type="password" class="password" readonly='' v-model="form.threePass" />
						<input type="password" class="password" readonly='' v-model="form.frouPass" />
						<input type="password" class="password" readonly='' v-model="form.fivePass" />
						<input type="password" class="password" readonly='' v-model="form.sixPass" />
					</view>
					<view class="nav" @tap="nav">忘记密码</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					onePass: '',
					twoPass: '',
					threePass: '',
					frouPass: '',
					fivePass: '',
					sixPass: '',
				},
				dialogFormVisible: false,
			}
		},
		methods: {
			nav(){
				// this.$navigateTo('/pages/person/sofaCenter/forgetTransferPassword/forget');
			},
			change(dialogFormVisible) {
				this.dialogFormVisible = dialogFormVisible;
			},
			show() {
				this.dialogFormVisible = true;
			},
			hide() {
				this.dialogFormVisible = false;
				for (var i in this.form) {
					this.form[i] = '';
				}
			},
			input(event) {
				var {
					value
				} = event.detail;
				var len = value.length;
				var index = 0
				for (let i in this.form) {
					index++;
					if (index > len) {
						this.form[i] = '';
					}
				}
				switch (value.length) {
					case 6:
						this.form.sixPass = value[value.length - 1];
						this.$props.callback(value)
						break;
					case 5:
						this.form.fivePass = value[value.length - 1]
						break;
					case 4:
						this.form.frouPass = value[value.length - 1]
						break;
					case 3:
						this.form.threePass = value[value.length - 1]
						break;
					case 2:
						this.form.twoPass = value[value.length - 1];

						break;
					case 1:
						this.form.onePass = value
						break;

				}

			}
		},
		props: {
			'callback': {
				default: ''
			},
			'close-on-click-modal': {
				type: Boolean,
				default: false
			},
			top: {
				type: String,
				default: '20vh'
			}
		},
		directives: {

		},
	}
</script>

<style>
	.pay-dialog {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.pay-dialog:after {
		content: ' ';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1001;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.pay-dialog>.dialog-content {
		background-color: #fff;
		position: relative;
		z-index: 1002;
		width: 85%;
		margin: 0 auto;
		padding: 0;
		padding-bottom: 65upx;
		border-radius: 16upx;

	}

	.dialog-content>.head {
		position: relative;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		border-bottom: 1px solid #EEEEEE;
	}

	.dialog-content>.head .title {
		font-size: 36upx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(42, 47, 68, 1);
	}

	.dialog-content>.head>image {
		width: 44upx;
		height: 44upx;
		position: absolute;
		top: 25upx;
		right: 25upx;
	}

	.content>.inputbox {
		display: flex;
		position: relative;
		margin: 0 auto;
		width: 540upx;
		height: 90upx;
		margin-top: 60upx;

	}

	.content>.inputbox .password {
		width: 90upx;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		border: 1px solid #EEEEEE;
		font-size: 36upx;
	}

	.content>.inputbox .pwd-input {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 100;
		opacity: 0;


	}

	.content>.inputbox .pwd-input input {
		height: 100%;
	}

	.nav {
		text-align: right;
		font-size: 24upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(50, 110, 246, 1);
		width: 540upx;
		margin: 0 auto;
		margin-top: 31upx;
	}
</style>
