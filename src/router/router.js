/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 16:51:27
 * @LastEditTime: 2019-08-14 14:52:20
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
const user = () => import('../pages/user/user');
const recommend = () => import('../pages/recommend/recommend');
const singer = () => import('../pages/singer/singer');
const rank = () => import('../pages/rank/rank');
const search = () => import('../pages/search/search');
const disc = () => import('../pages/recommend/m-disc/m-disc');
const top = () => import('../pages/rank/m-top-list/m-top-list');
const detail = () => import('../pages/singer/m-singer-song/m-singer-song');
const routes = [{
    path: '/',
    redirect: '/recommend'
},
{
    path: '/recommend',
    name: 'recommend',
    component: recommend,
    children: [{
        path: ':songListId',
        component: disc
    }]
},
{
    path: '/singer',
    name: 'singer',
    component: singer,
    children: [{
        path: ':singerId',
        component: detail
    }]
},
{
    path: '/rank',
    name: 'rank',
    component: rank,
    children: [{
        path: ':rankId',
        component: top
    }]
},
{
    path: '/search',
    name: 'search',
    component: search,
    children: [{
        path: ':singerId',
        component: detail
    }]
},
{
    path: '/user',
    component: user
}
];
Vue.use(VueRouter);
export default new VueRouter({
    mode: 'history',
    routes: routes,
    linkActiveClass: 'active'
});