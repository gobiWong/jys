<template>
	<view class="status-contents">
		<view class="status top-view"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			}
		},
		methods: {

		}
	}
</script>

<style>
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
