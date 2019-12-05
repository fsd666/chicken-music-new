<!--
 * File: m-icon.vue
 * Project: chicken-music
 * File Created: Monday, 4th November 2019 3:28:29 pm
 * Author: Fan
 * Description: icon
 * -----
 * Last Modified: Monday, 4th November 2019 4:57:18 pm
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 -->
<template>
    <i
        class="iconfont"
        :class="`icon-${type}`"
        :style="{fontSize:`${size}px`,color: color}"
        @click="iconClick"
    ></i>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            default: 18
        },
        color: {
            type: String,
            default: '#ffcd32'
        }
    },
    methods: {
        iconClick () {
            this.$emit('iconClick');
        }
    }
};
</script>
