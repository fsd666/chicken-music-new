<!--
 * File: m-disc.vue
 * Project: chicken-music
 * File Created: Wednesday, 16th October 2019 10:19:55 am
 * Author: Lenovo
 * Description: 专辑列表
 * -----
 * Last Modified: Wednesday, 4th December 2019 4:05:06 pm
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 -->
<template>
    <m-list
        :title="songListDetail.introduce"
        :imgUrl="songListDetail.coverUrl"
        :list="songListDetail.musicList"
    ></m-list>
</template>

<script>
import MList from "../../../shared/components/m-list/m-list";
import { getSongListDetail } from "../../../api/recommend";
export default {
    components: {
        MList
    },
    data () {
        return {
            songListDetail: {}
        };
    },
    created () {
        this._getSongListDetail();
    },
    methods: {
        _getSongListDetail () {
            let { songListId } = this.$route.params;
            getSongListDetail({ songListId }).then(res => {
                this.songListDetail = res;
            });
        }
    }
};
</script>