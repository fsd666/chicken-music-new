<!--
 * File: m-singer-song.vue
 * Project: chicken-music
 * File Created: Wednesday, 23rd October 2019 4:20:52 pm
 * Author: Lenovo
 * Description: 歌手音乐列表
 * -----
 * Last Modified: Wednesday, 4th December 2019 3:40:07 pm
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 -->
<template>
    <m-list
        :title="singerDetail.singerName"
        :imgUrl="singerDetail.photoUrl"
        :list="singerDetail.musicList"
        :isShow="true"
    ></m-list>
</template>

<script>
import { getSingerDetail } from '../../../api/singer';
import MList from '../../../shared/components/m-list/m-list';
export default {
    components: {
        MList
    },
    data () {
        return {
            singerDetail: {}
        };
    },
    created () {
        this._getSingerDetail();
    },
    methods: {
        _getSingerDetail () {
            let { singerId } = this.$route.params;
            getSingerDetail({ singerId }).then(res => {
                this.singerDetail = res;
            });
        }
    }
};
</script>
