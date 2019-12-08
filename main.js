import Vue from 'vue'
import App from './App'
import empty from "./components/empty.vue";
import statusBar from "./components/statusBar/statusBar.vue";
import Head from "./components/head.vue";
import store from '@/store'
import validCode from './components/p-validCode/validCode.vue'


Vue.component('validcode', validCode)

Vue.config.productionTip = false
Vue.prototype.$store = store

Vue.component('empty', empty);
Vue.component('statusBar', statusBar);
Vue.component('myHead', Head);
App.mpType = 'app'





const app = new Vue({
    store,
    ...App
})
app.$mount()

function nav(url) {
    uni.navigateTo({
        url,
    })
}

function showLoading(title) {
    uni.showLoading({
        title: title,
        mask: true,
        icon: 'none'
    });
}

Vue.prototype.$nav = nav;
Vue.prototype.$showLoading = showLoading;