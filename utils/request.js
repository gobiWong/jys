
const baseURL = `http://103.214.146.192`;
import {toast} from '@/utils/toast'


const request = function(url, method, data,isSys=false) {
 return new Promise((resove,reject)=>{

	 	uni.request({
	 		header: {
	 			'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
	 		},
	 		dataType:'JSON',
	 		url: baseURL + url,
	 		method,
	 		data,
			success:function(data){
				if(data.statusCode>=500){
					toast('服务异常,请稍后再试');
				}
				if(data.data.code!=200 && data.data.code!=undefined){
					toast(data.data.msg);
				}
				resove(data)
				
			},
	 		fail:function(res){
				console.log(res)
				reject('服务异常')
	 			toast('服务异常,请稍后再试');
	 			uni.hideLoading();
	 		}
	 	})
	
 })
	 
}


export default request
