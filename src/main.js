import store from './store.js';
import Vue from 'vue';
import router from './router/index.js';
import axios from 'axios';
import Home from './view/Layout/Components/Nav.vue';
import App from './App.vue'
import Login from './view/Login/index.vue'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'
import style from './style/main.css'
//自定义全局组件
// Vue.component('svg-icon',{
// 	template:"<div></div>",
// 	data(){
// 		return{
// 			msg:""
// 		}
// 	}
// })
Vue.config.productionTip=false;

Vue.use(ElementUI);
new Vue({
        router,
        render: h => h(App)
    }).$mount('#app');


