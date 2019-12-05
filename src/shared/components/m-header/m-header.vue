<!--
 * File: m-header.vue
 * Project: chicken-music
 * File Created: Saturday, 12th October 2019 4:07:33 pm
 * Author: Lenovo
 * Description: 头部组件
 * -----
 * Last Modified: Monday, 4th November 2019 3:38:04 pm
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 -->
<template>
    <div id="m-header">
        <div class="center">
            <i class="logo-img"></i>
            <div class="logo-text">Chicken Music</div>
        </div>
        <div class="right">
            <router-link tag="div" to="/user">
                <m-icon type="user" :size="20"></m-icon>
            </router-link>
        </div>
    </div>
</template>
<style lang='scss'>
#m-header {
    position: relative;
    height: 88px;
    color: $yellow-color;
    text-align: center;
    .center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        .logo-img {
            display: block;
            width: 60px;
            height: 88px;
            background: url("../../../assets/images/logo.png") no-repeat center
                center;
            background-size: contain;
        }
        .logo-text {
            margin-left: 20px;
            color: $yellow-color;
            font-size: $font-size-big;
        }
    }
    .right {
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translate(0, -50%);
    }
}
</style>