<!--
 * File: m-norecord.vue
 * Project: chicken-music
 * File Created: Monday, 11th November 2019 3:16:43 pm
 * Author: Fan
 * Description: 缺省展示
 * -----
 * Last Modified: Monday, 11th November 2019 4:52:34 pm
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 -->

<template>
    <div id="m-norecord">
        <div class="img"></div>
        <p class="tip">{{text}}</p>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: "暂无记录"
        }
    }
};
</script>

<style lang="scss">
#m-norecord {
    text-align: center;
    .img {
        width: 172px;
        height: 180px;
        margin: 0 auto;
        background-image: url("../../../assets/images/no-data.png");
        background-size: 172px 180px;
    }
    .tip {
        margin-top: 60px;
        font-size: $font-size-tiny;
        color: $transparent-color;
    }
}
</style>
