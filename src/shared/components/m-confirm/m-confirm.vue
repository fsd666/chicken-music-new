<!--
 * File: m-confirm.vue
 * Project: chicken-music
 * File Created: Tuesday, 15th October 2019 3:08:56 pm
 * Author: Lenovo
 * Description: 弹框
 * -----
 * Last Modified: Tuesday, 12th November 2019 10:55:00 am
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 -->
<template>
    <transition name="bounce">
        <div id="m-confirm" v-show="isShow">
            <div class="confirm-wrapper" v-show="isShow">
                <div class="confirm-content">
                    <div class="text">{{text}}</div>
                    <div class="button">
                        <p class="left" @click.stop="cancel">{{leftButton}}</p>
                        <p @click="confirm">{{rightButton}}</p>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data () {
        return {
            isShow: false
        };
    },
    props: {
        text: {
            type: String,
            required: true
        },
        leftButton: {
            type: String,
            default: '取消'
        },
        rightButton: {
            type: String,
            default: '确认'
        }
    },
    methods: {
        show () {
            this.isShow = true;
        },
        hide () {
            this.isShow = false;
        },
        cancel () {
            this.hide();
            this.$emit('cancel');
        },
        confirm () {
            this.hide();
            this.$emit('confirm');
        }
    }
};
</script>
<style lang='scss'>
#m-confirm {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 998;
    &.bounce-enter-active {
        animation: confirm-fadein 0.3s;
        .confirm-content {
            animation: bounce-in 0.3s;
        }
    }
    .confirm-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
        .confirm-content {
            width: 540px;
            text-align: center;
            border-radius: $font-size-small;
            background: $gray-color;
            .text {
                padding: 38px 30px;
                font-size: $font-size-big;
                line-height: 44px;
                color: hsla(0, 0%, 100%, 0.5);
            }
            .button {
                display: flex;
                align-items: center;
                justify-content: center;
                color: $transparent-color;
                border-top: 2px solid rgba(0, 0, 0, 0.3);
                .left {
                    border-right: 1px solid rgba(0, 0, 0, 0.3);
                }
                p {
                    flex: 1;
                    padding: 20px 0;
                    line-height: 44px;
                }
            }
        }
    }
    @keyframes confirm-fadein {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
}
</style>
