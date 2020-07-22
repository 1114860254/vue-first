import service from "@/utils/request";
/**
 * 增加，修改用户
 */
export function AddInfo(data){
	return service.request({
	  method: 'get',
	  url: '/user/saveUser/',
	  data
	});
}