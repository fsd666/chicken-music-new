<!--
 * File: m-search-result.vue
 * Project: chicken-music
 * File Created: Tuesday, 15th October 2019 10:17:29 am
 * Author: Lenovo
 * Description: 搜索结果
 * -----
 * Last Modified: Wednesday, 4th December 2019 4:55:20 pm
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 -->
<template>
    <div id="m-search-result">
        <m-scroll
            class="m-search-result-scroll"
            :data="searchResult"
            :pullup="true"
            @scrollToEnd="searchMore"
            v-if="searchResult.length > 0"
        >
            <ul class="list">
                <div class="list-item" v-if="singer.singerId" @click="toSingerDetail">
                    <m-icon type="user" :size="12" color="hsla(0,0%,100%,.3)"></m-icon>
                    <span class="list-item-song">{{singer.singerName}}</span>
                </div>
                <li
                    class="list-item"
                    v-for="(item,index) in searchResult"
                    :key="index"
                    @click="selectMusic(item)"
                >
                    <m-icon type="music" :size="12" color="hsla(0,0%,100%,.3)"></m-icon>
                    <span class="list-item-song">{{item.songName}}-{{item.singerName}}</span>
                </li>
                <m-loading></m-loading>
            </ul>
        </m-scroll>
        <m-loading v-if="!searchFlag"></m-loading>
        <div class="no-result-wrapper" v-if="searchFlag&&searchResult.length===0">
            <m-norecord text="抱歉，暂无搜索结果"></m-norecord>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { search } from "../../../api/search";
import { playMixin } from '../../../shared/mixin/mixins';
export default {
    mixins: [playMixin],
    data () {
        return {
            pageSize: 1,
            type: false,
            singer: {},
            searchResult: [],
            searchFlag: false
        };
    },
    props: {
        query: {
            type: String,
            require: true
        },
        perpage: {
            type: Number,
            default: 20
        }
    },
    watch: {
        query (newQuery, oldQuery) {
            this.searchFlag = false;
            this.searchResult = [];
            this.pageSize = 1;
            this._search(newQuery);
        }
    },
    methods: {
        _search () {
            search({
                keyword: this.query,
                pageSize: this.pageSize,
                perpage: this.perpage
            }).then(res => {
                this.searchFlag = true;
                if (res.singerInfo.length > 0) {
                    this.singer = res.singerInfo[0];
                }
                this.searchResult = this.searchResult.concat(res.musicList);
            });
        },
        searchMore () {
            this.pageSize++;
            this._search();
        },
        selectMusic (musicInfo) {
            if (this.musicList.length > 0) {
                this.musicList.splice(this.musicIndex + 1, 0, musicInfo);
                let currentIndex = this.musicIndex + 1;
                this.play(currentIndex, this.musicList);
                this.saveSearchHistory(this.query);
            } else {
                let currentList = [musicInfo];
                this.play(0, currentList);
            }
        },
        toSingerDetail () {
            this.$router.push(`/search/${this.singer.singerId}`);
        },
        ...mapMutations(["saveSearchHistory"])
    },
    computed: {
        ...mapGetters({
            musicIndex: "GET_MUSIC_INDEX",
            musicList: "GET_MUSIC_LIST"
        })
    }
};

</script>
<style lang='scss'>
#m-search-result {
    height: 100%;
    .m-search-result-scroll {
        height: 100%;
        overflow: hidden;
        .list {
            padding: 0 60px;
            &-item {
                display: flex;
                align-items: center;
                padding-bottom: 40px;
                font-size: $font-size-medium;
                color: $transparent-color;
                &-song {
                    @extend %fn-text-overflow;
                    flex: 1;
                    margin-left: 20px;
                }
            }
        }
    }
    .no-result-wrapper {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
