<template>
    <div id="rank">
        <m-scroll class="rank-scroll-wrap" :data="topList" v-if="topList.length>0">
            <div>
                <ul v-for="item in topList" :key="item.id">
                    <li class="list-item" @click="toTopList(item.rankId)">
                        <div class="image-wrapper">
                            <img v-lazy="imgBaseUrl + item.rankImage" />
                        </div>
                        <ul class="music-rank">
                            <li
                                class="music-rank-song"
                                v-for="(song,index) in item.musicList"
                                :key="index"
                            >{{index + 1}} {{song.songName + '-' + song.singerName}}</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </m-scroll>
        <div class="rank-loading-wrapper" v-else>
            <m-loading></m-loading>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import { getRankList } from "../../api/rank";
export default {
    data () {
        return {
            topList: []
        };
    },
    created () {
        // 获取排行列表
        this.getRankList();
    },
    methods: {
        async getRankList () {
            const res = await getRankList();
            this.topList = res;
        },
        toTopList (rankId) {
            this.$router.push(`/rank/${rankId}`);
        }
    }
};
</script>
<style lang="scss">
#rank {
    position: fixed;
    top: 176px;
    bottom: 0;
    width: 100%;
    padding-bottom: 40px;
    .rank-scroll-wrap {
        height: 100%;
        overflow: hidden;
    }
    .list-item {
        display: flex;
        margin: 0 40px;
        padding-top: 40px;
        .image-wrapper {
            width: 200px;
            height: 200px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .music-rank {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            padding: 0 40px;
            font-size: $font-size-tiny;
            line-height: 52px;
            color: $transparent-color;
            background: $gray-color;
            overflow: hidden;
            &-song {
                @extend %fn-text-overflow;
            }
        }
    }
    .rank-loading-wrapper {
        position: absolute;
        top: 50%;
        width: 100%;
    }
}
</style>