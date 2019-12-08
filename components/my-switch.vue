<template>
	<view>
		<view class="weui-switch" :class="{'weui-switch-on' : isChecked}" :value="value" :sid="index" @click="toggle" :style="{color:bgcolor, width: width+'upx'}">
			<view v-if="isChecked && direction.length > 0" class="switch-checked">
				{{direction[0]}}
			</view>
			<view v-if="!isChecked && direction.length > 0" class="switch-ischecked">
				{{direction[1]}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'switchComponent',
		props: {
			value: {
				type: Boolean,
				default: true
			},
			//背景颜色
			// bgcolor: {
			// 	type: String,
			// 	default: "#00bfff"
			// },
			//宽度 upx
			width: {
				type: Number,
				default: 125
			},
			text: {
				type: String,
				default: '接单中|未接单'
			},
			sid: {
				type: Number,
				default: 0,
			}
		},
		data() {
			return {
				isChecked: this.value,
			}
		},
		computed: {
			direction() {
				if (this.text) {
					return this.text.split('|')
				} else {
					return []
				}
			}
		},
		watch: {
			value(val) {
				this.isChecked = val
			},
			isChecked(val) {
				let textTemp = '';
				if (val) {
					textTemp = this.text.split('|')[0];
				}
				if (!val) {
					textTemp = this.text.split('|')[1];
				}
				let ob = {
					sid: this.sid,
					value: val,
					text: textTemp
				}
				this.$emit('change', ob);
			}
		},
		methods: {
			toggle(e) {
				this.isChecked = !this.isChecked;
			}
		}
	}
</script>

<style>
	.weui-switch {
		position: relative;
		display: block;
		position: relative;
		width: 125upx;
		height: 40px;

		outline: 0;
		border-radius: 20upx;
		box-sizing: border-box;
		background-color: #DFDFDF;
		transition: background-color 0.1s, border 0.1s;
		cursor: pointer;
	}

	/* .weui-switch:before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 22px;
        border-radius: 15px;
        background-color: #FDFDFD;
        transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
    } */

	.weui-switch:after {
		content: " ";
		position: absolute;
		top: 2upx;
		left: 0;
		width: 36px;
		height: 36px;
		border-radius: 15px;
		background-color: #FFFFFF;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
		transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
		border-radius: 100%;
	}

	.weui-switch-on {
		border-color: #FFFFFF;
		background-color: #6881FF;
	}

	/* 背景颜色设计 */
	.weui-switch-on:before {
		border-color: #353535;
		background-color: #09BB07;
	}

	.weui-switch-on:after {
		border-color: #fcc038;
		transform: translateX(calc(125upx - 36upx));
	}

	.switch-checked {
		width: 100%;
		height: 100%;
		position: absolute;
	
		line-height: 40px;
		color: #FFF;
		user-select: none;
		font-size: 20px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		padding-left:10upx;
		
	}

	.switch-ischecked {
		padding-left:10upx;
		width: 100%;
		height: 100%;
		position: absolute;
		line-height: 40px;
		text-align: center;
		user-select: none;
		font-size: 20px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(186, 197, 203, 1);
	}
</style>
