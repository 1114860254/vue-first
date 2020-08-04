import service from "@/utils/request";
/**
 * 增加，修改用户
 */
export function AddInfo(data){
	return service.request({
	  method: 'post',
	  url: '/user/saveUser',
	  data
	});
}
/**
 * 分页
 */
export function GetList(data){
	return service.request({
	  method: 'get',
	  url: '/user/pageList',
	  data
	});
}
/**
 * 删除
 */
export function DeleteInfo(data){
	return service.request({
	  method: 'get',
	  url: '/user/delUser',
	  data
	});
}
/**
 * 编辑
 */
export function sumbitEdit(data){
	return service.request({
	  method: 'post',
	  url: '/user/saveUser',
	  data
	});
}