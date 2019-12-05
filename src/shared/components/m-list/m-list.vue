<!--
 * File: m-list.vue
 * Project: chicken-music
 * File Created: Wednesday, 16th October 2019 9:57:33 am
 * Author: Lenovo
 * Description: 音乐列表
 * -----
 * Last Modified: Wednesday, 4th December 2019 10:58:31 am
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 -->
<template>
    <div id="m-list">
        <m-icon class="back" type="left-arrow" :size="26" @iconClick="back"></m-icon>
        <h1 class="title">{{title}}</h1>
        <div
            class="bg"
            :style="{backgroundImage: `url(${imgUrl?imgBaseUrl+imgUrl:''})`}"
            ref="bgImage"
        >
            <div class="play-wrapper" ref="playBtn">
                <div class="play" @click="randomPlay(list)">
                    <m-icon type="play" :size="16"></m-icon>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter" ref="filter"></div>
        </div>
        <div class="bg-layer" ref="layer"></div>
        <m-scroll
            class="m-list-scroll-wrap"
            ref="list"
            :data="list"
            :listenScroll="true"
            :probe-type="3"
            @scroll="scroll"
        >
            <m-song-list :isShow="isShow" :data="list"></m-song-list>
        </m-scroll>
    </div>
</template>

<script>
import MSongList from '../m-song-list/m-song-list';
import { playMixin } from '../../mixin/mixins';
const RESERVED_HEIGHT = 40;
export default {
    mixins: [playMixin],
    components: {
        MSongList
    },
    data () {
        return {
            scrollY: 0
        };
    },
    props: {
        title: {
            type: String,
            default: ""
        },
        imgUrl: {
            type: String,
            default: ""
        },
        list: {
            type: Array,
            default: () => []
        },
        isShow: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        back () {
            this.$router.back();
        },
        scroll (pos) {
            this.scrollY = pos.y;
        }
    },
    mounted () {
        this.imageHeight = this.$refs.bgImage.clientHeight;
        this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
        this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`;
    },
    watch: {
        scrollY (newY) {
            let translateY = Math.max(this.minTranslateY, newY);
            let zIndex = 0;
            let scale = 1;
            let blur = 0;
            this.$refs.layer.style.transform = `translate3d(0,${translateY}px,0)`;
            const percent = Math.abs(newY / this.imageHeight);
            if (newY > 0) {
                scale = 1 + percent;
                zIndex = 10;
            } else {
                blur = Math.min(20 * percent, 20);
            }
            this.$refs.filter.style.filter = `blur(${blur}px)`;
            if (newY < this.minTranslateY) {
                zIndex = 10;
                this.$refs.bgImage.style.paddingTop = 0;
                this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
                this.$refs.playBtn.style.display = "none";
            } else {
                this.$refs.bgImage.style.paddingTop = "70%";
                this.$refs.bgImage.style.height = 0;
                this.$refs.playBtn.style.display = "";
            }
            this.$refs.bgImage.style.zIndex = zIndex;
            this.$refs.bgImage.style.transform = `scale(${scale})`;
        }
    }
};
</script>
<style lang='scss'>
#m-list {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background: $black-color;
    .back {
        position: absolute;
        top: 0;
        left: 12px;
        padding: 16px;
        z-index: 50;
    }
    .title {
        position: absolute;
        top: 0;
        left: 10%;
        width: 80%;
        line-height: 80px;
        text-align: center;
        font-size: $font-size-big;
        font-weight: $font-weight-r;
        color: $text-color;
        z-index: 40;
    }
    .bg {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 70%;
        transform-origin: top;
        background-size: cover;
        .play-wrapper {
            position: absolute;
            bottom: 40px;
            width: 100%;
            z-index: 50;
            .play {
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                width: 270px;
                padding: 14px 0;
                margin: 0 auto;
                text-align: center;
                color: $yellow-color;
                border: 2px solid $yellow-color;
                border-radius: 200px;
            }
            .text {
                margin-left: 6px;
                line-height: 1.5;
                font-size: $font-size-tiny;
            }
        }
        .filter {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(7, 17, 27, 0.4);
        }
    }
    .bg-layer {
        position: relative;
        height: 100%;
        background: $black-color;
    }
    .m-list-scroll-wrap {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
}
</style>
