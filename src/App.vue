<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 10:44:46
 * @LastEditTime: 2019-08-15 22:32:00
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div id="app">
        <m-header></m-header>
        <m-tab></m-tab>
        <keep-alive>
            <router-view class="m-container-bg"></router-view>
        </keep-alive>
        <m-player></m-player>
    </div>
</template>   

<script>
import MHeader from './shared/components/m-header/m-header';
import MTab from './shared/components/m-tab/m-tab';
import MPlayer from './shared/components/m-player/m-player';
export default {
    name: 'app',
    components: {
        MHeader,
        MTab,
        MPlayer
    }
};
</script>
<style lang="scss" scoped>
#app {
    touch-action: none;
    .m-container-bg {
        background: $black-color;
    }
}
</style>