/**
 * File: mixins.js
 * Project: chicken-music
 * File Created: Tuesday, 12th November 2019 1:39:36 pm
 * Author: Fan
 * Description: 混入
 * -----
 * Last Modified: Wednesday, 4th December 2019 4:47:19 pm
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 */
import { mapMutations, mapGetters } from 'vuex';
export const playMixin = {
    methods: {
        // 左右闭区间 返回随机数
        getRandomIntInclusive (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        // 随机播放
        randomPlay (musicList) {
            if (musicList.length > 0) {
                let musicIndex = this.getRandomIntInclusive(0, musicList.length - 1);
                this.play(musicIndex, musicList);
                this.setPlayMode(2);
            }
        },
        // 播放
        play (musicIndex, musicList) {
            this.setMusicIndex(musicIndex);
            this.setMusicList([...musicList]);
            this.setFullScreen(true);
        },
        singerFormat (arr) {
            return arr.map(n => n.name).join('/');
        },
        ...mapMutations(["setMusicIndex", "setMusicList", "setFullScreen", "setPlayMode"])
    },
    computed: {
        ...mapGetters({
            musicList: "GET_MUSIC_LIST",
            musicIndex: "GET_MUSIC_INDEX",
            playMode: "GET_PLAY_MODE"
        })
    }
};

export const favoriteMixin = {
    methods: {
        isFavorite (songId) {
            let index = this.favoriteList.findIndex(item => songId === item.songId);
            return index === -1;
        },
        ...mapMutations(["addFavorite", "removeFavorite"])
    },
    computed: {
        ...mapGetters({
            favoriteList: "GET_FAVORITE_LIST"
        })
    }
};