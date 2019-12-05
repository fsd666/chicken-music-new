<!--
 * File: m-play-list.vue
 * Project: chicken-music
 * File Created: Sunday, 10th November 2019 12:26:38 pm
 * Author: Fan
 * Description: 播放列表
 * -----
 * Last Modified: Wednesday, 4th December 2019 4:48:14 pm
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 -->
<template>
    <transition name="list-fade">
        <div id="m-play-list" v-show="show" @click="hide">
            <div class="play-list-wrapper" @click.stop>
                <div class="list-header">
                    <div class="left">
                        <m-icon
                            class="icon"
                            :type="playMode"
                            :size="30"
                            color="rgba(255,205,49,.5)"
                            @iconClick="switchPlayForm"
                        ></m-icon>
                        <span>{{playModeText}}</span>
                    </div>
                    <m-icon type="clean" color="hsla(0,0%,100%,.3)" @iconClick="confirmTip"></m-icon>
                </div>
                <m-scroll class="m-play-list-scroll" :listenScroll="true" :probe-type="3">
                    <ul>
                        <li class="list-item" v-for="(item,index) in musicList" :key="index">
                            <p class="list-item-play">
                                <m-icon
                                    type="play"
                                    :size="14"
                                    color="rgba(255,205,49,.5)"
                                    v-if="index===musicIndex"
                                ></m-icon>
                            </p>
                            <span
                                class="list-item-text"
                                @click="play(index,musicList)"
                            >{{item.songName}}</span>
                            <m-icon
                                class="list-item-favorite"
                                type="not-favorite"
                                :size="16"
                                @iconClick="addFavorite(item)"
                                v-if="isFavorite(item.songId)"
                            ></m-icon>
                            <m-icon
                                class="list-item-favorite"
                                type="favorite"
                                color="#d93f30"
                                :size="16"
                                @iconClick="removeFavorite(item)"
                                v-else
                            ></m-icon>
                            <m-icon type="delete" :size="16" @iconClick="removeMusic(index)"></m-icon>
                        </li>
                    </ul>
                </m-scroll>
                <div class="add-song">
                    <div class="add-song-btn">
                        <m-icon
                            class="add-song-btn-icon"
                            type="add"
                            :size="14"
                            color="hsla(0,0%,100%,.3)"
                        ></m-icon>
                        <span>添加歌曲到队列</span>
                    </div>
                </div>
                <div class="close-btn" @click="hide">关闭</div>
            </div>
            <m-confirm
                ref="confirm"
                :text="'是否清空播放列表'"
                :rightButton="'清空'"
                @confirm="setMusicList([])"
            ></m-confirm>
        </div>
    </transition>
</template>

<script>
import MConfirm from '../m-confirm/m-confirm';
import { favoriteMixin, playMixin } from '../../mixin/mixins';
export default {
    mixins: [favoriteMixin, playMixin],
    components: {
        MConfirm
    },
    data () {
        return {
            show: false
        };
    },
    methods: {
        open () {
            this.show = true;
        },
        hide () {
            this.show = false;
        },
        confirmTip () {
            this.$refs.confirm.show();
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
        removeMusic (index) {
            let newMusicList = this.musicList;
            if (index < this.musicIndex) {
                let newMusicIndex = this.musicIndex - 1;
                this.setMusicIndex(newMusicIndex);
            }
            newMusicList.splice(index, 1);
            this.setMusicList(newMusicList);
        }
    },
    computed: {
        playModeText () {
            if (this.playMode === 'loop') {
                return '顺序播放';
            } else if (this.playMode === 'single-cycle') {
                return '单曲循环';
            } else {
                return '随机播放';
            }
        }
    }
};
</script>

<style lang="scss">
#m-play-list {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    color: hsla(0, 0%, 100%, 0.5);
    background: rgba(0, 0, 0, 0.3);
    z-index: 200;
    &.list-fade-enter-active,
    &.list-fade-leave-active {
        transition: opacity 0.3s;
        .play-list-wrapper {
            transition: all 0.3s;
        }
    }
    &.list-fade-enter,
    &.list-fade-leave-to {
        opacity: 0;
        .play-list-wrapper {
            transform: translate3d(0, 100%, 0);
        }
    }
    .play-list-wrapper {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: $gray-color;
        z-index: 201;
        .list-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 40px 60px 20px 40px;
            .left {
                display: flex;
                align-items: center;
                font-size: $font-size-medium;
                .icon {
                    margin-right: 20px;
                }
            }
        }
        .m-play-list-scroll {
            max-height: 480px;
            overflow: hidden;
            .list-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 60px 0 40px;
                height: 80px;
                &-text {
                    flex: 1;
                    font-size: $font-size-medium;
                }
                &-play {
                    width: 40px;
                }
                &-favorite {
                    margin-right: 20px;
                }
            }
        }
        .add-song {
            width: 280px;
            margin: 40px auto 60px;
            &-btn {
                display: flex;
                align-items: center;
                padding: 16px 32px;
                font-size: $font-size-tiny;
                color: hsla(0, 0%, 100%, 0.5);
                border: 1px solid hsla(0, 0%, 100%, 0.5);
                border-radius: 200px;
                &-icon {
                    margin-right: 10px;
                }
            }
        }
        .close-btn {
            text-align: center;
            line-height: 100px;
            background: $black-color;
        }
    }
}
</style>
