onmessage = (e) => {
	self.importScripts('./ajax.js') //请求封装
	self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.min.js')
	self.importScripts('https://www.promisejs.org/polyfills/promise-6.1.0.js')
	let name = self.name;
	(function getData() {
		setTimeout(getData, 3000);

		Promise.all([
			new Promise(function(resolve, reject) {
				ajax({
					type: 'GET',
					url: 'http://103.214.146.192:81/quotations/getDealRecord',
					contentType: 'application/x-www-form-urlencoded',
					data: {
						childCoinName: name.split('/')[0],
						motherCoinName: name.split('/')[1]
					},
					success: function(res) {

						resolve(res)
					}
				})
			}),
			new Promise(function(resolve, reject) {
				ajax({
					type: 'GET',
					url: 'http://103.214.146.192:81/coinInfo/getCoinInfoByName',
					contentType: 'application/x-www-form-urlencoded',
					data: {
						virtualWalletName: name.split('/')[0]
					},
					success: function(res) {

						resolve(res)
					}
				})
			}),
			new Promise(function(resolve, reject) {
				ajax({
					type: 'GET',
					url: 'http://103.214.146.192:81/quotations/getBuySellData',
					contentType: 'application/x-www-form-urlencoded',
					data: {
						childCoinName: name.split('/')[0],
						motherCoinName: name.split('/')[1]
					},
					success: function(res) {
						resolve(res)
					}
				})
			}),
			new Promise(function(resolve, reject) {
				ajax({
					type: 'GET',
					url: 'http://103.214.146.192:81/quotations/get24hrDataByTwoCoinName',
					contentType: 'application/x-www-form-urlencoded',
					data: {
						childCoinName: name.split('/')[0],
						motherCoinName: name.split('/')[1]
					},
					success: function(res) {
			
						resolve(res)
					}
				})
			})
		]).then(res => {

			postMessage(res);
		})

	})();

}
