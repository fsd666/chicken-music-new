<!--
 * File: userCenter.vue
 * Project: chicken-music
 * File Created: Thursday, 15th August 2019 10:44:50 pm
 * Author: xdf2508 (you@you.you)
 * -----
 * Last Modified: Tuesday, 12th November 2019 2:43:10 pm
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 -->

<template>
    <transition name="slide">
        <div id="user">
            <m-icon class="back" type="left-arrow" :size="26" @iconClick="back"></m-icon>
            <div class="header-wrap">
                <ul class="header-wrap-item">
                    <li
                        class="unactive"
                        :class="{active:currentIndex===item.idx}"
                        v-for="item in header"
                        :key="item.idx"
                        @click="currentIndex=item.idx"
                    >
                        <span>{{item.text}}</span>
                    </li>
                </ul>
            </div>
            <div class="play-wrapper" ref="playBtn">
                <div class="play" @click="randomPlay(currentIndex===0?favoriteList:playHistory)">
                    <m-icon type="play" :size="16" color="hsla(0,0%,100%,.5);"></m-icon>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="list-wrapper">
                <m-scroll
                    class="user-scroll-wrap"
                    :listenScroll="true"
                    :data="favoriteList"
                    v-if="currentIndex===0"
                >
                    <m-song-list :data="favoriteList" v-if="favoriteList.length>0"></m-song-list>
                    <div class="no-data-wrapper" v-else>
                        <m-norecord text="暂无收藏歌曲"></m-norecord>
                    </div>
                </m-scroll>
                <m-scroll
                    class="user-scroll-wrap"
                    :listenScroll="true"
                    :data="playHistory"
                    v-if="currentIndex===1"
                >
                    <m-song-list :data="playHistory" v-if="playHistory.length>0"></m-song-list>
                    <div class="no-data-wrapper" v-else>
                        <m-norecord text="您还没有听过歌曲"></m-norecord>
                    </div>
                </m-scroll>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapGetters } from 'vuex';
import MSongList from '../../shared/components/m-song-list/m-song-list';
import { playMixin } from '../../shared/mixin/mixins';
export default {
    mixins: [playMixin],
    components: {
        MSongList
    },
    data () {
        return {
            currentIndex: 0,
            header: [
                { idx: 0, text: "我喜欢的" },
                { idx: 1, text: "最近听的" }
            ]
        };
    },
    methods: {
        back () {
            this.$router.back();
        }
    },
    computed: {
        ...mapGetters({
            favoriteList: 'GET_FAVORITE_LIST',
            playHistory: 'GET_PLAY_HISTORY'
        })
    }
};
</script>
<style lang="scss">
#user {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $black-color;
    z-index: 100;
    .back {
        position: absolute;
        top: 0;
        left: 12px;
        padding: 20px;
        z-index: 50;
    }
    .header-wrap {
        margin: 20px 0 60px;
        &-item {
            display: flex;
            align-items: center;
            margin: 0 auto;
            width: 480px;
            border: 1px solid $gray-color;
            border-radius: 10px;
            .unactive {
                flex: 1;
                padding: 16px;
                text-align: center;
                font-size: $font-size-medium;
                color: $transparent-color;
            }
            .active {
                color: $text-color;
                background: $gray-color;
            }
        }
    }
    .play-wrapper {
        margin: 0 auto;
        .play {
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            width: 270px;
            padding: 14px 0;
            margin: 0 auto;
            text-align: center;
            color: hsla(0, 0%, 100%, 0.5);
            border: 1px solid hsla(0, 0%, 100%, 0.5);
            border-radius: 200px;
        }
        .text {
            margin-left: 6px;
            line-height: 1.5;
            font-size: $font-size-tiny;
        }
    }
    .list-wrapper {
        position: absolute;
        top: 220px;
        bottom: 0;
        width: 100%;
        .user-scroll-wrap {
            height: 100%;
            overflow: hidden;
            .list-content {
                padding: 40px 60px;
                font-size: $font-size-medium;
                &-item {
                    display: flex;
                    flex-direction: column;
                    align-content: center;
                    padding: 20px 0;
                    line-height: 40px;
                    .song {
                        color: $text-color;
                    }
                    .singer {
                        margin-top: 8px;
                        color: $transparent-color;
                    }
                }
            }
        }
        .no-data-wrapper {
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>