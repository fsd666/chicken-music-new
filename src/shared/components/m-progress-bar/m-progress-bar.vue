<!--
 * File: m-progress-bar.vue
 * Project: chicken-music
 * File Created: Thursday, 31st October 2019 10:18:52 am
 * Author: Fan
 * Description: 进度条
 * -----
 * Last Modified: Tuesday, 5th November 2019 11:58:17 am
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 -->
<template>
    <div class="m-progress-bar-wrap" @touchend="touchend">
        <div class="m-progress-bar">
            <div ref="barBg" class="bar-bg"></div>
            <div class="bar-inner" ref="barInner"></div>
            <div class="btn" ref="barBtn" @touchmove.prevent="touchmove" @touchend="touchend"></div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            percentage: 0,
            isMove: false
        };
    },
    props: {
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        defaultValue: {
            type: Number,
            default: 0
        }
    },
    methods: {
        touchmove (e) {
            if (!this.isMove) {
                this.isMove = true;
            }
            const touch = e.touches[0];
            this.slide(touch);
            this.$emit("moveBar", this.percentage);
        },
        touchend (e) {
            const touch = e.changedTouches[0];
            this.slide(touch);
            this.isMove = false;
            this.$emit("touchBar", this.percentage);
        },
        slide (touch) {
            const barBg = this.$refs.barBg.getBoundingClientRect();
            const clientX = touch.clientX - barBg.left;
            this.percentage = Math.max(this.min, Math.min(this.max, ((clientX / barBg.width) * 100)));
            this.$refs.barInner.style.width = `${this.percentage}%`;
            this.$refs.barBtn.style.left = `${this.percentage}%`;
        }
    },
    watch: {
        defaultValue (currValue, prevValue) {
            if (!this.isMove) {
                const percentage = Math.max(0, Math.min(this.max, currValue));
                this.$refs.barInner.style.width = `${percentage}%`;
                this.$refs.barBtn.style.left = `${percentage}%`;
            }
        }
    }
};
</script>

<style lang="scss">
.m-progress-bar-wrap {
    display: flex;
    align-items: center;
    height: 60px;
    .m-progress-bar {
        position: relative;
        width: 100%;
        height: 8px;
        .bar-bg {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
        }
        .bar-inner {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: $yellow-color;
        }
        .btn {
            position: absolute;
            left: 0%;
            width: 32px;
            height: 32px;
            margin-top: -20px;
            border: 6px solid $text-color;
            border-radius: 50%;
            background: $yellow-color;
            transform: translate(-50%, 0);
            z-index: 10;
        }
    }
}
</style>
