<template>
	<div id="layout" :class="[menuStatus?'close':'open']">
		<LayoutHeader />
		<LayoutMain />
		<LayoutNav />
	</div>
</template>

<script>
	import LayoutHeader from './Components/Header'
	import LayoutMain from './Components/Main'
	import LayoutNav from './Components/Nav'
export default{
	name:'layout',
	computed:{
		menuStatus(){
				return this.$store.state.isCollapse
			}
		},
	components:{LayoutHeader,LayoutMain,LayoutNav}
}
</script>

<style lang='scss' scoped>
	
</style>
