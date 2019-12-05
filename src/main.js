/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 15:06:27
 * @LastEditTime: 2019-08-15 14:31:17
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import store from './store/store';
import load from './shared/utils/script';
import VueLazyload from 'vue-lazyload';
import fastClick from 'fastclick';
import hacks from 'viewport-units-buggyfill/viewport-units-buggyfill.hacks';
import viewportUnitsBuggyfill from 'viewport-units-buggyfill';
import './shared/index';
import './assets/style/fonts/iconfont.css';

/* 开发环境下开启eruda */
if (process.env.NODE_ENV === 'development') {
    load('//cdn.jsdelivr.net/npm/eruda', function () {
        window.eruda.init();
    });
}

/* 将视口单位转换为像素 */
viewportUnitsBuggyfill.init({ hacks });

fastClick.attach(document.body);

/* 阻止启动生产消息 */
Vue.config.productionTip = false;

/* 设置图片服务器地址 */
Vue.prototype.imgBaseUrl = "http://49.234.97.85:4000";
/* 设置音乐服务器地址 */
Vue.prototype.musicBaseUrl = "http://49.234.97.85:4000";

Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: '/static/images/default-image.png',
    attempt: 1
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');