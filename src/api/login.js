import service from "@/utils/request";
/**
 * 获取验证码
 */
export function GetSms(){
	service.request({
	  method: 'post',
	  url: '/user',
	  data: {
	    firstName: 'Fred',
	    lastName: 'Flintstone'
	  }
	});
}
/**
 * 获取用户角色
 */

/**
 * 登录
 */

/**
 * 注册
 */