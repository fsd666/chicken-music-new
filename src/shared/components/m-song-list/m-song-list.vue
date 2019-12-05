<!--
 * File: m-song-list.vue
 * Project: chicken-music
 * File Created: Wednesday, 6th November 2019 3:25:04 pm
 * Author: Fan
 * Description: 音乐列表
 * -----
 * Last Modified: Wednesday, 4th December 2019 2:40:58 pm
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 -->
<template>
    <div class="m-song-list">
        <ul>
            <li
                class="m-song-list-item"
                v-for="(item,index) in data"
                :key="index"
                @click="play(index,data)"
            >
                <template v-if="isShow">
                    <div class="icon-wrap">
                        <i class="img champion" v-if="(index+1)===1"></i>
                        <i class="img second" v-else-if="(index+1)===2"></i>
                        <i class="img third" v-else-if="(index+1)===3"></i>
                        <span class="num" v-else>{{index+1}}</span>
                    </div>
                </template>
                <div class="song-info">
                    <span class="name">{{item.songName}}</span>
                    <span class="desc">{{item.singerName}}·{{item.songName}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { playMixin } from '../../mixin/mixins';
export default {
    mixins: [playMixin],
    props: {
        data: {
            type: Array,
            default: () => []
        },
        isShow: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang='scss'>
.m-song-list {
    padding: 40px 60px;
    font-size: $font-size-medium;
    &-item {
        display: flex;
        align-items: center;
        height: 128px;
        .icon-wrap {
            margin-right: 60px;
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            .num {
                font-size: $font-size-big;
                color: $yellow-color;
            }
            .img {
                display: block;
                width: 100%;
                height: 100%;
                background-size: cover;
            }
            .champion {
                background-image: url("../../../assets/images/champion.png");
            }
            .second {
                background-image: url("../../../assets/images/second.png");
            }
            .third {
                background-image: url("../../../assets/images/third.png");
            }
        }
        .song-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            line-height: 40px;
            overflow: hidden;
            .name {
                @extend %fn-text-overflow;
                color: $text-color;
            }
            .desc {
                @extend %fn-text-overflow;
                margin-top: 8px;
                color: $transparent-color;
            }
        }
    }
}
</style>