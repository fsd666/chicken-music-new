/**
 * File: getters.js
 * Project: chicken-music
 * File Created: Sunday, 25th August 2019 1:19:03 pm
 * Author: Lenovo
 * Description:
 * -----
 * Last Modified: Wednesday, 4th December 2019 2:23:59 pm
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 */
import * as types from './mutation-types';
export default {
    [types.GET_SERACH_HISTORY]: state => state.searchHistory,
    [types.GET_PLAY_HISTORY]: state => state.playHistory,
    [types.GET_FAVORITE_LIST]: state => state.favoriteList,
    [types.GET_PLAYER_STATUS]: state => state.playerStatus,
    [types.GET_MUSIC_INDEX]: state => state.musicIndex,
    [types.GET_MUSIC_LIST]: state => state.musicList,
    [types.GET_FULL_SCREEN]: state => state.fullScreen,
    [types.GET_PLAY_MODE]: state => {
        const playModes = ['loop', 'single-cycle', 'random']; // 播放模式
        return playModes[state.playMode];
    }
};