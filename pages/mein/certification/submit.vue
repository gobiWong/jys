<template>
	<view class="">
		<view class="top">
			<statusBar></statusBar>
			<view class="head">
				<image src="/static/img/back-icon-white.png" class="back-icon"></image>
				<text>实名认证</text>
				<text></text>
			</view>
			<!-- 认证队列 -->
			<view class="time-line-row">
				<view>
					<view>
						<image src="/static/assert/center-err.png" style="width: 22upx;height: 22upx;"></image>
					</view>
					<text>信息认证</text>
				</view>
				<view>
					<view>
						<image src="/static/assert/center-err.png" style="width: 22upx;height: 22upx;"></image>
					</view>
					<text>身份认证</text>
				</view>
				<view>
					<view>
						<image src="/static/assert/center-err.png" style="width: 22upx;height: 22upx;"></image>
					</view>
					<text>视频认证</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	@import './common.scss';
</style>
