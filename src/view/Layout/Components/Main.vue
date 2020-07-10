<template>
	<div id="main-wrap">
		<div class="main-content">
			<div class="content"></div>
			</div>
		<router-view />
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style lang="scss" scoped>
#main-wrap{
		height: 100vh;
	}
.main-content{
	width: 100%;
	height: 100%;
	padding-top:75px ;
	padding-left:250px ;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}	
.content{
	width: 100%;
	height: 100%;
	padding: 30px 30px 0 30px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	background-color: #fff;
}
</style>