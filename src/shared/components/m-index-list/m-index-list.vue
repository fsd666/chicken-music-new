<template>
    <div id="m-index-list">
        <m-scroll
            class="index-scroll-wrap"
            :probeType="3"
            :listenScroll="true"
            :data="list"
            @scroll="scroll"
            ref="indexList"
        >
            <ul ref="indexList">
                <li class="index-item" v-for="(value,index) in list" :key="index" ref="list">
                    <h2 class="letter">{{value.letter}}</h2>
                    <ul>
                        <li
                            class="min-li"
                            v-for="(item, idx) in value.list"
                            :key="'list' + idx"
                            @click="selectSinger(item)"
                        >
                            <div class="lazy-img-warp">
                                <img
                                    class="lazy-img"
                                    v-lazy="imgBaseUrl + item.photoUrl"
                                />
                            </div>
                            <span>{{item.singerName}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="index-title" v-show="scrollY < 0">{{title}}</div>
            <div
                class="index-short"
                v-if="letters.length > 0"
                @touchstart.stop.prevent="_scrollToElement"
                @touchmove.stop.prevent="_scrollToElement"
            >
                <ul ref="letters">
                    <li v-for="(letter, idx) in letters" :key="idx" class="short-li" ref="letter">
                        <a :class="{'current': idx === currentIdx}">{{letter}}</a>
                    </li>
                </ul>
            </div>
        </m-scroll>
    </div>
</template>
<script>
export default {
    data () {
        return {
            currentIdx: 0,
            scrollY: 0,
            indexLetter: ''
        };
    },
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        selectSinger (singer) {
            this.$emit('selectSinger', singer);
        },
        scroll (pos) {
            this.scrollY = pos.y;
        },
        countHeight (index) {
            if (index < 0) {
                return 0;
            }
            return this.countHeight(index - 1) + this.$refs.list[index].clientHeight;
        },
        _scrollToElement (event) {
            let topDis = this.$refs.letters.getBoundingClientRect().top;
            let height = this.$refs.letter[0].clientHeight;
            let index = parseInt((event.touches[0].pageY - topDis) / height);
            if (index < 0) {
                index = 0;
            }
            if (index > this.list.length - 1) {
                index = this.list.length - 1;
            }
            this.currentIdx = index;
            this.$refs.indexList.scrollToElement(this.$refs.list[index], 0);
        }
    },
    computed: {
        letters () {
            return this.list.map(item => {
                return item.letter.substr(0, 1);
            });
        },
        title () {
            return this.list[this.currentIdx] ? this.list[this.currentIdx].letter : '';
        }
    },
    watch: {
        scrollY (newValue, oldValue) {
            if (Math.abs(newValue) > this.countHeight(this.currentIdx)) {
                this.currentIdx++;
            } else if (Math.abs(newValue) < this.countHeight(this.currentIdx - 1)) {
                this.currentIdx--;
                if (this.currentIdx < 0) {
                    this.currentIdx = 0;
                }
            }
        }
    }
};
</script>
<style lang="scss">
#m-index-list {
    position: fixed;
    top: 176px;
    bottom: 0;
    width: 100%;
    .index-scroll-wrap {
        height: 100%;
        overflow: hidden;
    }
    .index-item {
        padding-bottom: 60px;
        .letter {
            padding-left: 40px;
            height: 60px;
            font-size: $font-size-tiny;
            line-height: 60px;
            background: $gray-color;
            color: hsla(0, 0%, 100%, 0.5);
        }
        .min-li {
            display: flex;
            align-items: center;
            padding: 40px 0 0 60px;
            color: hsla(0, 0%, 100%, 0.5);
            .lazy-img-warp {
                width: 100px;
                height: 100px;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            span {
                margin-left: 40px;
                color: hsla(0, 0%, 100%, 0.5);
                font-size: $font-size-medium;
            }
        }
    }
    .index-title {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 60px;
        padding-left: 40px;
        line-height: 60px;
        font-size: $font-size-tiny;
        color: hsla(0, 0%, 100%, 0.5);
        background: $gray-color;
        z-index: 10;
    }
    .index-short {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
        width: 40px;
        padding: 40px 0;
        text-align: center;
        color: $text-color;
        border-radius: 20px;
        background: rgba(0, 0, 0, 0.3);
        z-index: 30;
        .short-li {
            padding: 6px;
            line-height: 1;
            font-size: $font-size-tiny;
            font-family: Helvetica;
        }
        a {
            color: hsla(0, 0%, 100%, 0.5);
        }
        .current {
            position: relative;
            color: #ffcd32;
        }
    }
}
</style>