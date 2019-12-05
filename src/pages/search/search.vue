<template>
    <div id="searchList">
        <div class="search-box-wrapper">
            <div class="search-box">
                <m-icon type="search" :size="26" color="#222"></m-icon>
                <input type="text" v-model.trim="keyword" placeholder="搜索歌曲、歌手" />
                <m-icon type="cross" :size="16" color="#222" v-if="keyword" @iconClick="keyword=''"></m-icon>
            </div>
        </div>
        <div class="search-list-wrapper">
            <m-scroll class="search-scroll-wrap" :data="allData" v-show="!keyword">
                <div>
                    <div class="hot">
                        <div class="history-title">热门搜索</div>
                        <ul class="hot-list">
                            <li
                                class="hot-list-key"
                                v-for="item in hotKey"
                                v-bind:key="item.id"
                                @click="keyword = item.keyword"
                            >{{item.keyword}}</li>
                        </ul>
                    </div>
                    <div class="history" v-if="searchHistory&&searchHistory.length>0">
                        <div class="history-title">
                            搜索历史
                            <m-icon
                                type="clean"
                                :size="18"
                                color="hsla(0,0%,100%,.3)"
                                @iconClick="confirmTip"
                            ></m-icon>
                        </div>
                        <ul class="history-list">
                            <li
                                class="history-list-item"
                                v-for="(item,index) in searchHistory"
                                v-bind:key="index"
                            >
                                <span @click="keyword = item">{{item}}</span>
                                <m-icon
                                    type="delete"
                                    :size="18"
                                    color="hsla(0,0%,100%,.3)"
                                    @iconClick="deleteSearchHistory(item)"
                                ></m-icon>
                            </li>
                        </ul>
                    </div>
                </div>
            </m-scroll>
            <m-search-result :query="keyword" v-show="keyword"></m-search-result>
        </div>
        <m-confirm
            ref="confirm"
            :text="'是否清空所有搜索历史'"
            :rightButton="'清空'"
            @confirm="cleanSearchHistory"
        ></m-confirm>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import { getHotKey } from "../../api/search";
import MSearchResult from './m-search-result/m-search-result';
import MConfirm from '../../shared/components/m-confirm/m-confirm';
export default {
    components: {
        MSearchResult,
        MConfirm
    },
    data () {
        return {
            keyword: "",
            hotKey: [],
            searchResult: []
        };
    },
    created () {
        this._getHotKey();
    },
    methods: {
        // 获取热门搜索
        async _getHotKey () {
            this.hotKey = await getHotKey();
        },
        confirmTip () {
            this.$refs.confirm.show();
        },
        deleteSearchHistory (value) {
            this.deleteSearchHistory(value);
        },
        cleanSearchHistory () {
            this.cleanSearchHistory();
        },
        ...mapMutations(["deleteSearchHistory", "cleanSearchHistory"])
    },
    computed: {
        // 搜索历史
        ...mapGetters({
            searchHistory: "GET_SERACH_HISTORY"
        }),
        allData () {
            return this.searchHistory.concat(this.hotKey);
        }
    }
};
</script>
<style lang="scss">
#searchList {
    .search-box-wrapper {
        margin: 40px;
        background: $gray-color;
        border-radius: 12px;
        .search-box {
            display: flex;
            align-items: center;
            padding: 0 12px;
            height: 80px;
            input {
                flex: 1;
                margin-left: 10px;
                font-size: $font-size-medium;
                color: $text-color;
                caret-color: $text-color;
                background: $gray-color;
                border: none;
            }
        }
    }
    .search-list-wrapper {
        position: fixed;
        top: 356px;
        bottom: 0;
        width: 100%;
        .search-scroll-wrap {
            height: 100%;
            overflow: hidden;
        }
        .history-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-height: 80px;
            font-size: $font-size-medium;
            color: hsla(0, 0%, 100%, 0.5);
        }
        .hot {
            margin: 0 40px 40px;
            &-list {
                display: flex;
                flex-wrap: wrap;
                font-size: $font-size-medium;
                &-key {
                    padding: 10px 20px;
                    margin: 0 40px 20px 0;
                    color: $transparent-color;
                    background: $gray-color;
                    border-radius: 12px;
                }
            }
        }
        .history {
            margin: 0 40px;
            &-list {
                display: flex;
                flex-direction: column;
                font-size: $font-size-normal;
                color: hsla(0, 0%, 100%, 0.5);
                &-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    min-height: 80px;
                }
            }
        }
    }
}
</style>