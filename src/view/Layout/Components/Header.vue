<template>
	<div id="header-wrap">
		<div class="pull-left head-icon" @click="navMenuState">
			<i class="el-icon-more"></i>   
		</div>
		<div class="pull-right head-icon">
			<div class="user-info pull-left" >
				<!-- <div class="img"><img src="../../../assets/head.png" alt=""></div> -->
				管理员
			</div>
			<div class="head-icon pull-left"><i class="el-icon-remove-outline"></i></div>     
		</div>
	</div>
</template>

<script>
	export default{
		name:'Header',
		// data(){
		// 	return{
		// 		navMenuStatel
		// 	};
	 //    },
		methods:{
			navMenuState(){
				this.$store.commit('SET_COLLAPSE');
			}
		}
	}
</script>

<style lang="scss" scoped>
#header-wrap{
	position: fixed;
	top: 0;
	right: 0;
	left: 250px;
	height: 75px;
	background-color: #fff;
	-webkit-box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
	line-height: 75px;
	-webkit-transition: all .3s ease 0s;
	-moz-transition: all .3s ease 0s;
	-o-transition: all .3s ease 0s;
	-ms-transition: all .3s ease 0s;
	transition: all .3s ease 0s;
}
.open{
	#header-wrap{left: 250px;}
}
.close{
	#header-wrap{
		left: 64px;
	}
}
.head-icon{
	padding:0 30px;
	margin-bottom: -8px;
	font-size: 25px;	
	cursor: pointer;
	
}
.user-info{
	height: 100%;
	padding: 0 32px;
	border-right:1px solid #ededed;
	+.head-icon{
		padding: 0 28px;
	}
}
// .img{
// 	border-radius: 2px;
// }
</style>
