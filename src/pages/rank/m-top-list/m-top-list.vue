<!--
 * File: m-top-list.vue
 * Project: chicken-music
 * File Created: Friday, 18th October 2019 10:05:09 am
 * Author: Lenovo
 * Description: 排行详情
 * -----
 * Last Modified: Wednesday, 4th December 2019 1:40:58 pm
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 -->
<template>
    <m-list :title="rankDetail.rankName" :imgUrl="rankDetail.rankImageBg" :list="rankDetail.musicList" :isShow="true"></m-list>
</template>

<script>
import MList from '../../../shared/components/m-list/m-list';
import { getRankDetail } from '../../../api/rank';
const NUM = 50; // 取50条歌曲数据
export default {
    components: {
        MList
    },
    data () {
        return {
            rankDetail: {}
        };
    },
    created () {
        this._getRankDetail();
    },
    methods: {
        _getRankDetail () {
            let { rankId } = this.$route.params;
            getRankDetail({ rankId, num: NUM }).then(res => {
                this.rankDetail = res;
            });
        }
    }
};
</script>
