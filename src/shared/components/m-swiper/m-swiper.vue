<!--
 * File: swiper.vue
 * Project: chicken-music
 * File Created: Monday, 26th August 2019 11:19:46 am
 * Author: xdf2508
 * Description: 轮播图
 * -----
 * Last Modified: Thursday, 5th December 2019 2:55:05 pm
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 -->

<template>
    <div class="m-swiper-wrapper">
        <swiper :options="swiperOption" v-if="swiperSlides.length>0">
            <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                <img class="swiper-img" :src="imgBaseUrl + slide.imageUrl" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
    components: {
        swiper,
        swiperSlide
    },
    data () {
        return {
            swiperOption: {
                pagination: {
                    el: ".swiper-pagination"
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                loop: true
            }
        };
    },
    props: {
        swiperSlides: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style lang="scss">
.m-swiper-wrapper {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 40%;
    .swiper-img {
        width: 100%;
        height: 100%;
    }
    .swiper-pagination-bullet {
        background: hsla(0, 0%, 100%, 0.5);
        opacity: 1;
    }
    .swiper-pagination-bullet-active {
        width: 40px;
        background: $text-color;
        border-radius: 10px;
        background: hsla(0, 0%, 100%, 0.8);
    }
}
</style>
