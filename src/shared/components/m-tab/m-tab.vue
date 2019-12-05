<!--
 * File: m-tab.vue
 * Project: chicken-music
 * File Created: Monday, 14th October 2019 10:13:36 am
 * Author: Lenovo
 * Description: 
 * -----
 * Last Modified: Friday, 25th October 2019 2:15:47 pm
 * Modified By: Lenovo
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 -->
<template>
    <div id="m-tab">
        <router-link class="tab-item" tag="div" to="/recommend">
            <span class="text">推荐</span>
        </router-link>
        <router-link class="tab-item" tag="div" to="/singer">
            <span class="text">歌手</span>
        </router-link>
        <router-link class="tab-item" tag="div" to="/rank">
            <span class="text">排行</span>
        </router-link>
        <router-link class="tab-item" tag="div" to="/search">
            <span class="text">搜索</span>
        </router-link>
    </div>
</template>
<style lang='scss'>
#m-tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 88px;
    line-height: 88px;
    font-size: $font-size-medium;
    text-align: center;
    .tab-item {
        flex: 1;
        .text {
            color: hsla(0, 0%, 100%, 0.5);
            padding-bottom: 10px;
        }
        &.router-link-exact-active .text {
            color: $yellow-color;
            border-bottom: 4px solid $yellow-color;
        }
    }
}
</style>