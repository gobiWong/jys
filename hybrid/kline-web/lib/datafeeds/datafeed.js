var detafeed_historyTime = 0
var detafeed_lastResolution = null
var detafeed_lastSymbol = null
var t_init = null;




function FeedBase() { }
FeedBase.prototype.onReady = function (callback) {
    callback(this._configuration)
}
FeedBase.prototype.getSendSymbolName = function (symbolName, index) {
    var name = symbolName.split('/');
    return (name[index]).toLocaleUpperCase()
}
FeedBase.prototype.resolveSymbol = function (symbolName, onResolve, onError) {
    onResolve({
        'name': symbolName,
        'timezone': 'Asia/Shanghai',
        'pricescale': 100,
        'minmov': 1,
        'minmov2': 0,
        'ticker': symbolName,
        'description': '',
        'session': '24x7',
        'volume_precision': 10,
        'has_intraday': true,
        'intraday_multipliers': ['1','3', '5', '15','30', '60', '240', 'D','W'],
        'has_weekly_and_monthly': false,
        'has_no_volume': false,
        'regular_session': '24x7'
    })
}
FeedBase.prototype.getApiTime = function (resolution) {
    switch (resolution) {
		case '1':
		
		    return '1min'
        case '3':

            return '3min'
        case '5':

            return '5min'
        case '15':

            return '15min'
        case '30':

            return '30min'
        case '60':

            return '60min'
        case '240':

            return '4h'
        case 'D':

            return '1day'
        case 'W':

            return '1week'
        default:

            return '15m'
    }
}

FeedBase.prototype.getBars = function (symbolInfo, resolution, rangeStartDate, rangeEndDate, onResult, onError) {

    if (!detafeed_historyTime || (resolution !== detafeed_lastResolution) || detafeed_lastSymbol !== symbolInfo.name) {   // 储存请求过的产品 
        detafeed_lastSymbol = symbolInfo.name    // 记录目前时间搓，就用目前的目前时间搓往前请求历史数据    
        detafeed_historyTime = Date.now()
    }

    clearInterval(t_init)
  

    const e_time = Number((Date.now() + '').substr(0, 9) + '0000');

    const r_data = { intervalTime:  this.getApiTime(resolution), childCoinName: this.getSendSymbolName(symbolInfo.name, 0), motherCoinName: this.getSendSymbolName(symbolInfo.name, 1) }
    
    $.ajax({
        type: 'GET',
        url: 'http://103.214.146.192:81/quotations/getKlineDataByIntervalTimeForHttp',
        contentType: 'application/x-www-form-urlencoded',
        data: r_data,
        dataType: 'json',
        success: function (data) {

            if (data.data && Array.isArray(data.data)) {        // 记录这次请求的时间周期    
                const k_list = data.data;
              
                detafeed_lastResolution = resolution;
               
                var meta = { noData: false };

                var bars = []
				// k_list.reverse();
                if (k_list.length) {
                    localStorage.setItem('k_open', Number(k_list[k_list.length - 1].open).toFixed(2))
                    localStorage.setItem('k_high', Number(k_list[k_list.length - 1].high).toFixed(2))
                    localStorage.setItem('k_low', Number(k_list[k_list.length - 1].low).toFixed(2))
                    localStorage.setItem('k_close', Number(k_list[k_list.length - 1].close).toFixed(2))
                    localStorage.setItem('k_volume', Number(k_list[k_list.length - 1].volume).toFixed(2))
                    localStorage.setItem('k_time', k_list[k_list.length - 1].timeFormat);
                    detafeed_historyTime = e_time;
                    for (var i = 0; i < k_list.length; i++) { bars.push({ time: k_list[i].time*1, close: k_list[i].close, open: k_list[i].open, high: k_list[i].high, low: k_list[i].low, volume: k_list[i].volume }) }
               
                } else { meta = { noData: true } }
        
                onResult(bars, meta);
           
           

            }
        }, error: function (message) { console.log(message) }
    })

}

FeedBase.prototype.subscribeBars = function (symbolInfo, resolution, onTick, listenerGuid, onResetCacheNeededCallback) {
    const self = this;
 
    t_init = setInterval(function () {

        const e_time = Number((Date.now() + '').substr(0, 9) + '0000')
        const r_data = { intervalTime: self.getApiTime(resolution), childCoinName: self.getSendSymbolName(symbolInfo.name, 0), motherCoinName: self.getSendSymbolName(symbolInfo.name, 1) }
      
        $.ajax({
            type: 'GET', url: 'http://103.214.146.192:81/quotations/getKlineDataByIntervalTimeForHttp',
            contentType: 'application/x-www-form-urlencoded',
            data: r_data,
            dataType: 'json',
            success: function (data) {

                if (data.data && Array.isArray(data.data)) {
                    const k_list = data.data;
                    k_list.reverse();
                  
                    if (k_list.length) {
						localStorage.setItem('k_open', Number(k_list[k_list.length - 1].open).toFixed(2))
						localStorage.setItem('k_high', Number(k_list[k_list.length - 1].high).toFixed(2))
						localStorage.setItem('k_low', Number(k_list[k_list.length - 1].low).toFixed(2))
						localStorage.setItem('k_close', Number(k_list[k_list.length - 1].close).toFixed(2))
						localStorage.setItem('k_volume', Number(k_list[k_list.length - 1].volume).toFixed(2))
						localStorage.setItem('k_time', k_list[k_list.length - 1].timeFormat);
						
                        detafeed_historyTime = e_time;
                    
                       
                        if(localStorage.k_time==k_list[0].timeFormat){
                          
                          for (var i = 0; i < 1; i ++) {  onTick({ time: Number(k_list[i].time), close: k_list[i].close, open: k_list[i].open, high: k_list[i].high, low: k_list[i].low, volume: k_list[i].volume }) }
                          
                        }else{
							
                           // for (var i = 0; i < k_list.length; i ++) { onTick({ time: Number(k_list[i].time), close: k_list[i].close, open: k_list[i].open, high: k_list[i].high, low: k_list[i].low, volume: k_list[i].volume }) }
                         onResetCacheNeededCallback();
                        }
                       
                        localStorage.setItem('k_time', k_list[0].timeFormat);
                    }
                }
            }, error: function (message) { console.log(message) }
        })
    }, 5000)

}
FeedBase.prototype.unsubscribeBars = function (listenerGuid) {
    // 取消订阅产品的callback
    

}
