<template>
	<div id="nav-wrap">
	<h1 class="logo"><img src="../../../assets/logo.png" alt=""></h1>
<el-menu default-active="1-4-1" class="el-menu-vertical-demo" 
  :collapse="isCollapse" 
  background-color="transparent" 
  text-color="#fff"active-text-color="#fff"
  router>
 <template v-for="(item,index) in routers">
  <el-submenu v-if="!item.hidden" :key="item.id" :index="index+''">
	  <!-- 一级菜单 -->
    <template slot="title">
      <i :class="item.meta.icon"></i>
      <span slot="title">{{item.meta.name}}</span>
    </template>
	<!-- 子级菜单 -->
      <el-menu-item  v-for="subItem in item.children":key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
  </el-submenu>
 </template>
</el-menu>
</div>
</template>
<style lang="scss" scoped>
.logo{
	text-align: center;
	img{
		margin: 10px auto 0; 
		width: 90px;
		-webkit-transition: all .3s ease 0s;
		-moz-transition: all .3s ease 0s;
		-o-transition: all .3s ease 0s;
		-ms-transition: all .3s ease 0s;
		transition: all .3s ease 0s;
	}
}

 #nav-wrap{
	 position: fixed;
	 top: 0;
	 left: 0;
	 height: 100vh;
	 background-color: #344a5f;
	 -webkit-transition: all .3s ease 0s;
	 -moz-transition: all .3s ease 0s;
	 -o-transition: all .3s ease 0s;
	 -ms-transition: all .3s ease 0s;
	 transition: all .3s ease 0s;
 }
 .open{
	
	 #nav-wrap{
		 width:250px ;
	 }
 }
 .close{
	 .logo img{
		 width:70%;
	 };
	 #nav-wrap{
		 width:64px;
	 }
 }
</style>

<script>

  export default { 
    name:'navMenu',
	computed:{
		isCollapse(){
			return this.$store.state.isCollapse
		}
	},
	data() {
		return{
			routers:this.$router.options.routes
			
		};
     },
    methods:{
	}
  }
</script>