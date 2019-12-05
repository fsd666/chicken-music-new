<!--
 * File: m-player.vue
 * Project: chicken-music
 * File Created: Friday, 25th October 2019 4:06:48 pm
 * Author: Lenovo
 * Description: 音乐播放组件
 * -----
 * Last Modified: Thursday, 5th December 2019 2:16:42 pm
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 -->
 <template>
    <div id="m-player" v-if="musicList.length>0">
        <transition
            name="normal"
            :appear="true"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
            @after-leave="afterLeave"
        >
            <div class="m-player-big" v-show="fullScreen">
                <div class="bg">
                    <img :src="imgBaseUrl + currentMusic.imageUrl" />
                </div>
                <div class="top">
                    <m-icon class="arrow" type="down-arrow" :size="26" @iconClick="hide"></m-icon>
                    <h1 class="name">{{musicList[musicIndex].songName}}</h1>
                    <h2 class="singer">{{currentMusic.singerName}}</h2>
                </div>
                <div
                    class="middle"
                    @touchstart="middleTouchstart"
                    @touchmove="middleTouchmove"
                    @touchend="middleTouchend"
                    ref="lyricWrapper"
                >
                    <div class="middle-l" ref="middleL">
                        <div
                            class="middle-l-img"
                            :class="{'cd-pause':playStatus==='pause','cd-play':playStatus==='play'}"
                        >
                            <img :src="imgBaseUrl + currentMusic.imageUrl" />
                        </div>
                        <div class="middle-l-lyric">{{currentLyric}}</div>
                    </div>
                    <m-scroll class="middle-r" ref="lyricList" :data="lyricArr">
                        <ul class="middle-r-lyric">
                            <li
                                class="text"
                                :class="{'active-text':lyricIndex===index}"
                                v-for="(item,index) in lyricArr"
                                :key="index"
                                ref="lyricText"
                            >{{item.lyric}}</li>
                        </ul>
                    </m-scroll>
                </div>
                <div class="bottom">
                    <div class="dot-wrapper">
                        <p class="dot" :class="{active:currentShow==='cd'}"></p>
                        <p class="dot" :class="{active:currentShow==='lyric'}"></p>
                    </div>
                    <div class="progress-bar-wrap">
                        <span>{{timeFormat(currentTime)}}</span>
                        <div class="bar">
                            <m-progress-bar
                                :defaultValue="progress"
                                @touchBar="touchBar"
                                @moveBar="moveBar"
                            ></m-progress-bar>
                        </div>
                        <span>{{timeFormat(totalTime)}}</span>
                    </div>
                    <div class="play-wrapper">
                        <m-icon :type="playMode" :size="34" @iconClick="switchPlayForm"></m-icon>
                        <m-icon type="previous" :size="34" @iconClick="prevMusic"></m-icon>
                        <m-icon
                            type="play"
                            :size="42"
                            v-if="playStatus==='pause'"
                            @iconClick="setPlayStatus('play')"
                        ></m-icon>
                        <m-icon type="pause" :size="42" @iconClick="setPlayStatus('pause')" v-else></m-icon>
                        <m-icon type="next" :size="34" @iconClick="nextMusic"></m-icon>
                        <m-icon
                            type="not-favorite"
                            :size="34"
                            @iconClick="addFavorite(musicList[musicIndex])"
                            v-if="isFavorite(musicList[musicIndex].songId)"
                        ></m-icon>
                        <m-icon
                            type="favorite"
                            :size="34"
                            color="#d93f30"
                            @iconClick="removeFavorite(musicList[musicIndex])"
                            v-else
                        ></m-icon>
                    </div>
                </div>
            </div>
        </transition>
        <div class="m-player-mini" v-show="!fullScreen">
            <div class="cd-wrapper" @click="open">
                <img
                    :src="imgBaseUrl + currentMusic.imageUrl"
                    :class="{'cd-pause':playStatus==='pause','cd-play':playStatus==='play'}"
                />
            </div>
            <div class="song-msg">
                <span class="song-msg-name">{{musicList[musicIndex].songName}}</span>
                <span class="song-msg-singer">{{currentMusic.singerName}}</span>
            </div>
            <m-icon
                class="mini-icon"
                type="play"
                :size="36"
                v-if="playStatus==='pause'"
                @iconClick="setPlayStatus('play')"
            ></m-icon>
            <m-icon
                class="mini-icon"
                type="pause"
                :size="36"
                @iconClick="setPlayStatus('pause')"
                v-else
            ></m-icon>
            <m-icon class="mini-icon" type="playList" :size="34" @iconClick="openPlayList"></m-icon>
        </div>
        <m-play-list ref="playList"></m-play-list>
        <audio
            ref="audio"
            autoplay
            :src="musicBaseUrl + currentMusic.songUrl"
            @play="playStart"
            @error="playError"
            @timeupdate="timeUpDate"
            @ended="playEnd"
        ></audio>
    </div>
</template>
 
<script>
import { mapGetters, mapMutations } from "vuex";
import { favoriteMixin, playMixin } from '../../mixin/mixins';
import { getLyric } from '../../../api/music';
import animations from 'create-keyframe-animation';
import CryptoJS from "crypto-js";
import MProgressBar from "../m-progress-bar/m-progress-bar";
import MPlayList from '../m-play-list/m-play-list';
export default {
    mixins: [favoriteMixin, playMixin],
    components: {
        MProgressBar,
        MPlayList
    },
    data () {
        return {
            lyricIndex: 0,
            currentTime: 0,
            totalTime: 0,
            currentShow: "cd",
            playStatus: 'play',
            lyricArr: [],
            touch: {},
            isMove: false,
            currentMusic: {}
        };
    },
    methods: {
        open () {
            this.setFullScreen(true);
        },
        hide () {
            this.setFullScreen(false);
        },
        openPlayList () {
            this.$refs.playList.open();
        },
        enter (el, done) {
            const { x, y, scale } = this._getPosAndScale();
            let animation = {
                0: {
                    transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
                },
                60: {
                    transform: `translate3d(0,0,0) scale(1.1)`
                },
                100: {
                    transform: `translate3d(0,0,0) scale(1.0)`
                }
            };
            animations.registerAnimation({
                name: 'move',
                animation,
                presets: {
                    duration: 400,
                    easing: 'linear'
                }
            });
            animations.runAnimation(this.$refs.middleL, 'move', done);
        },
        afterEnter (el, done) {
            animations.unregisterAnimation('move');
            this.$refs.middleL.style.animation = '';
        },
        leave (el, done) {
            this.$refs.middleL.style.transition = 'all 0.4s';
            const { x, y, scale } = this._getPosAndScale();
            this.$refs.middleL.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
            const timer = setTimeout(done, 400);
            this.$refs.middleL.addEventListener('transitionend', () => {
                clearTimeout(timer);
                done();
            });
        },
        afterLeave (el, done) {
            this.$refs.middleL.style.transition = '';
            this.$refs.middleL.style.transform = '';
        },
        _getPosAndScale () {
            const targetWidth = 40;
            const paddingLeft = 40;
            const paddingBottom = 30;
            const paddingTop = 80;
            const width = window.innerWidth * 0.8;
            const scale = targetWidth / width;
            const x = -(window.innerWidth / 2 - paddingLeft);
            const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
            return {
                x,
                y,
                scale
            };
        },
        lyricFormatter (res) {
            if (res) {
                let lyric = CryptoJS.enc.Base64.parse(res).toString(CryptoJS.enc.Utf8);
                let pattern = new RegExp(/\[(\d{2}):(\d{2}).(\d{2})\](.*)/g);
                let arr;
                while ((arr = pattern.exec(lyric)) !== null) {
                    if (arr[4]) {
                        this.lyricArr.push({
                            time:
                                arr[1] * 60 * 1000 + arr[2] * 1000 + arr[3] * 1,
                            lyric: arr[4]
                        });
                    }
                }
            }
        },
        timeFormat (time) {
            let minute = Math.floor(time / 60);
            let second = Math.floor(time % 60);
            return `${minute}:${second > 9 ? second : "0" + second}`;
        },
        middleTouchstart (e) {
            this.touch.initiated = true;
            // 用来判断是否是一次移动
            this.touch.moved = false;
            const touch = e.touches[0];
            this.touch.startX = touch.pageX;
            this.touch.startY = touch.pageY;
        },
        middleTouchmove (e) {
            if (!this.touch.initiated) {
                return;
            }
            const touch = e.touches[0];
            const deltaX = touch.pageX - this.touch.startX;
            const deltaY = touch.pageY - this.touch.startY;
            if (Math.abs(deltaY) > Math.abs(deltaX)) {
                // 上拉时直接结束
                return;
            }
            if (!this.touch.moved) {
                this.touch.moved = true;
            }
            const left = this.currentShow === "cd" ? 0 : -window.innerWidth;
            const offsetWidth = Math.min(
                0,
                Math.max(-window.innerWidth, left + deltaX)
            );
            this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
            this.$refs.lyricList.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`;
            this.$refs.lyricList.$el.style.transitionDuration = 0;
            this.$refs.middleL.style.opacity = 1 - this.touch.percent;
            this.$refs.middleL.style.transitionDuration = 0;
        },
        middleTouchend (e) {
            if (!this.touch.moved) {
                return;
            }
            let offsetWidth, opacity;
            if (this.currentShow === "cd") {
                if (this.touch.percent > 0.1) {
                    offsetWidth = -window.innerWidth;
                    opacity = 0;
                    this.currentShow = "lyric";
                } else {
                    offsetWidth = 0;
                    opacity = 1;
                }
            } else {
                if (this.touch.percent < 0.9) {
                    offsetWidth = 0;
                    this.currentShow = "cd";
                    opacity = 1;
                } else {
                    offsetWidth = -window.innerWidth;
                    opacity = 0;
                }
            }
            const time = 300;
            this.$refs.lyricList.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`;
            this.$refs.lyricList.$el.style.transitionDuration = `${time}ms`;
            this.$refs.middleL.style.opacity = opacity;
            this.$refs.middleL.style.transitionDuration = `${time}ms`;
            this.touch.initiated = false;
        },
        playStart () {
            this.totalTime = this.$refs.audio.duration;
            this.setPlayStatus('play');
        },
        playError () {
        },
        timeUpDate () {
            if (!this.isMove && this.$refs.audio) {
                this.currentTime = this.$refs.audio.currentTime;
            }
        },
        playEnd () {
            this.setPlayStatus('pause');
            switch (this.playMode) {
                case 'loop': {
                    this.nextMusic();
                    break;
                }
                case 'random': {
                    let readyPlayIdx = this.getRandomIntInclusive(0, this.musicList.length - 1);
                    this.setMusicIndex(readyPlayIdx);
                    break;
                }
            }
        },
        moveBar (percentage) {
            this.isMove = true;
            this.currentTime = (percentage / 100) * this.totalTime;
        },
        touchBar (percentage) {
            this.isMove = false;
            this.$refs.audio.currentTime = (percentage / 100) * this.totalTime;
            this.setPlayStatus('play');
        },
        setPlayStatus (status) {
            this.playStatus = status;
        },
        prevMusic () {
            let index = this.musicIndex - 1;
            if (index < 0) {
                index = this.musicList.length - 1;
            }
            this.setMusicIndex(index);
        },
        nextMusic () {
            let index = this.musicIndex + 1;
            if (index > this.musicList.length - 1) {
                index = 0;
            }
            this.setMusicIndex(index);
        },
        switchPlayForm () {
            if (this.playMode === 'loop') {
                this.setPlayMode(1);
            } else if (this.playMode === 'single-cycle') {
                this.setPlayMode(2);
            } else {
                this.setPlayMode(0);
            }
        },
        getRandomIntInclusive (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        ...mapMutations(["addPlayHistory"])
    },
    computed: {
        ...mapGetters({
            fullScreen: "GET_FULL_SCREEN"
        }),
        currentLyric () {
            return this.lyricArr.length > 0 ? this.lyricArr[this.lyricIndex].lyric : "";
        },
        progress () {
            return (this.currentTime / this.totalTime) * 100;
        },
        musicInfo () {
            const { musicList, musicIndex } = this;
            return {
                musicList,
                musicIndex
            };
        }
    },
    watch: {
        musicInfo (newMusicInfo) {
            let { musicList, musicIndex } = newMusicInfo;
            if (musicList.length < 1) {
                this.$refs.playList.hide();
                return;
            }
            this.currentMusic = musicList[musicIndex];
            // 判断是否为同一首歌
            if (this.currentMusic.songId === this.currentSongMid) {
                return;
            }
            this.currentSongMid = this.currentMusic.songId;
            this.addPlayHistory(this.currentMusic);
            this.lyricArr = [];
            this.lyricIndex = 0;
            this.currentTime = 0;
            getLyric({ songId: this.currentMusic.songId }).then(res => {
                this.lyricFormatter(res);
            });
        },
        lyricIndex (newIndex) {
            const lyricWrapperDom = this.$refs.lyricWrapper;
            const offsetY = -(lyricWrapperDom.clientHeight / 2);
            this.$refs.lyricList.scrollToElement(
                this.$refs.lyricText[newIndex],
                1000,
                false,
                offsetY
            );
        },
        currentTime (time) {
            const nowTime = Math.ceil(time * 1000);
            for (let i = 0; i < this.lyricArr.length; i++) {
                let currLyric = this.lyricArr[i];
                let nextLyric = this.lyricArr[i + 1];
                if (nextLyric) {
                    if (nowTime > currLyric.time && nowTime < nextLyric.time) {
                        this.lyricIndex = i;
                        return;
                    }
                } else {
                    if (nowTime > currLyric.time) {
                        this.lyricIndex = i;
                        return;
                    }
                }
            }
        },
        playStatus (newStatus) {
            newStatus === 'play' ? this.$refs.audio.play() : this.$refs.audio.pause();
        },
        playMode (newMode) {
            this.$nextTick(function () {
                this.$refs.audio.loop = newMode === 'single-sycle';
            });
        }
    }
};
</script>
 <style lang='scss'>
#m-player {
    .m-player-big {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: $black-color;
        z-index: 150;
        &.normal-enter-active,
        &.normal-leave-active {
            transition: all 0.4s;
            .top,
            .bottom {
                transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
            }
        }
        &.normal-enter,
        &.normal-leave-to {
            opacity: 0;
            .top {
                transform: translate3d(0, -100px, 0);
            }
            .bottom {
                transform: translate3d(0, 100px, 0);
            }
        }
        .bg {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            opacity: 0.6;
            filter: blur(40px);
            img {
                width: 100%;
                height: 100%;
            }
        }
        .top {
            position: relative;
            margin-bottom: 50px;
            .arrow {
                position: absolute;
                top: 0;
                left: 12px;
                padding: 18px;
                z-index: 50;
            }
            .name {
                @extend %fn-text-overflow;
                width: 70%;
                margin: 0 auto;
                line-height: 80px;
                text-align: center;
                font-size: $font-size-big;
                color: $text-color;
            }
            .singer {
                text-align: center;
                line-height: 40px;
                font-size: $font-size-medium;
                color: $text-color;
            }
        }
        .middle {
            position: fixed;
            width: 100%;
            top: 160px;
            bottom: 340px;
            white-space: nowrap;
            font-size: 0;
            &-l {
                position: relative;
                display: inline-block;
                width: 100%;
                height: 0;
                text-align: center;
                vertical-align: top;
                padding-top: 80%;
                &-img {
                    position: absolute;
                    top: 0;
                    left: 10%;
                    width: 80%;
                    height: 100%;
                    box-sizing: border-box;
                    border: 20px solid hsla(0, 0%, 100%, 0.1);
                    border-radius: 50%;
                    overflow: hidden;
                    img {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                    }
                }
                &-lyric {
                    @extend %fn-text-overflow;
                    width: 80%;
                    margin: 60px auto 0;
                    font-size: $font-size-medium;
                    line-height: 40px;
                    color: hsla(0, 0%, 100%, 0.5);
                }
            }
            &-r {
                display: inline-block;
                width: 100%;
                height: 100%;
                text-align: center;
                overflow: hidden;
                &-lyric {
                    @extend %fn-text-overflow;
                    width: 80%;
                    margin: 0 auto;
                    .text {
                        line-height: 64px;
                        color: hsla(0, 0%, 100%, 0.5);
                        font-size: $font-size-medium;
                    }
                    .active-text {
                        color: $text-color;
                    }
                }
            }
        }
        .bottom {
            position: absolute;
            bottom: 20px;
            width: 100%;
            .dot-wrapper {
                display: flex;
                justify-content: center;
                .dot {
                    margin: 0 8px;
                    width: 16px;
                    height: 16px;
                    border-radius: 10px;
                    background: hsla(0, 0%, 100%, 0.8);
                }
                .active {
                    width: 40px;
                    border-radius: 10px;
                    background: hsla(0, 0%, 100%, 0.8);
                }
            }
            .progress-bar-wrap {
                display: flex;
                align-items: center;
                width: 82%;
                margin: 0 auto;
                padding: 20px 0;
                font-size: $font-size-tiny;
                color: $text-color;
                .bar {
                    flex: 1;
                    margin: 0 24px;
                }
            }
            .play-wrapper {
                display: flex;
                align-items: center;
                width: 88%;
                margin: 20px auto;
                color: $yellow-color;
                .iconfont {
                    flex: 1;
                    text-align: center;
                    font-size: $font-size-attention;
                }
            }
        }
    }
    .m-player-mini {
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 120px;
        background: $gray-color;
        z-index: 200;
        .cd-wrapper {
            flex-basis: 140px;
            padding: 0 20px 0 40px;
            width: 140px;
            height: 80px;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .song-msg {
            @extend %fn-text-overflow;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            &-name {
                font-size: $font-size-medium;
                line-height: 1.5;
                color: $text-color;
            }
            &-singer {
                font-size: $font-size-tiny;
                line-height: 1.5;
                color: $transparent-color;
            }
        }
        .mini-icon {
            flex-basis: 100px;
            padding: 0 20px;
            width: 60px;
        }
    }
    .cd-play {
        animation: cdRotate 20s linear infinite;
    }
    .cd-pause {
        animation-play-state: paused;
    }
    @keyframes cdRotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
}
</style>
