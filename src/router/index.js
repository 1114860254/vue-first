import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
// const originalPush = Router.prototype.push
//    Router.prototype.push = function push(location) {
//    return originalPush.call(this, location).catch(err => err)
// }
export default new Router({
	routes:[
		{
			path:"/",
			redirect:"login",
			hidden:true,
			meta:{
				name:'主页'
			},
		},
		{
			path:"/login",
			name:"Login",
			hidden:true,
			meta:{
				name:'登录'
			},
			component:()=>import("../view/Login/index.vue")
		},
		{
			path:"/console",
			name:"Console",
			meta:{
				name:'控制台',
				icon:'el-icon-menu'
			},
			redirect:"/index",
			component:()=>import("../view/Layout/index.vue"),
			children:[
				{
					path:"/index",
					name:"index",
					meta:{
						name:'首页'
					},
					component:()=>import("../view/Console/index.vue")
				}
			]
			
		},
		{
			path:"/info",
			name:"Info",
			meta:{
				name:'后台管理',
				icon:'el-icon-setting'
			},
			redirect:"index",
			component:()=>import("../view/Layout/index.vue"),
			children:[
				{
					path:"/user",
					name:"User",
					meta:{
						name:'用户管理'
					},
					component:()=>import("../view/Info/index.vue")
				},
				{
					path:"/role",
					name:"Role",
					meta:{
						name:'角色管理'
					},
					component:()=>import("../view/Info/role.vue")
				},
				{
					path:"/menu",
					name:"Menu",
					meta:{
						name:'菜单管理'
					},
					component:()=>import("../view/Info/menu.vue")
				}
			]
			
		}
	]
})
