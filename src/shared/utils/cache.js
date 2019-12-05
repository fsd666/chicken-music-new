/**
 * File: cache.js
 * Project: chicken-music
 * File Created: Friday, 20th September 2019 4:00:49 pm
 * Author: Lenovo
 * Description: 本地缓存工具
 * -----
 * Last Modified: Thursday, 5th December 2019 2:24:42 pm
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 */
import storage from 'good-storage';

const SEARCH_MAX_LENGTH = 10;
const SEARCH_KEY = '__search__';
const COLLECT_KEY = '__collect__';
const PLAY_KEY = '__play__';

export function querySearchHistory () {
    return storage.get(SEARCH_KEY, []);
}

export function saveSearchHistory (value) {
    let history = querySearchHistory();
    if (!history.includes(value)) {
        if (history.length === SEARCH_MAX_LENGTH) {
            history.pop();
        }
        history.unshift(value);
        storage.set(SEARCH_KEY, history);
    }
    return querySearchHistory();
}

export function deleteSearchHistory (value) {
    let history = querySearchHistory();
    history.forEach((item, idx) => {
        if (item === value) {
            history.splice(idx, 1);
            storage.set(SEARCH_KEY, history);
        }
    });
    return querySearchHistory();
}

export function cleanSearchHistory () {
    storage.remove(SEARCH_KEY);
    return querySearchHistory();
}

export function queryFavoriteList () {
    return storage.get(COLLECT_KEY, []);
}

export function addFavorite (value) {
    let favoriteList = queryFavoriteList();
    favoriteList.unshift(value);
    storage.set(COLLECT_KEY, favoriteList);
    return queryFavoriteList();
}

export function removeFavorite (value) {
    let favoriteList = queryFavoriteList();
    const cancelIndex = favoriteList.findIndex(item => item.songId === value.songId);
    favoriteList.splice(cancelIndex, 1);
    storage.set(COLLECT_KEY, favoriteList);
    return queryFavoriteList();
}

export function queryPlayHistory () {
    return storage.get(PLAY_KEY, []);
}

export function addPlayHistory (value) {
    let history = queryPlayHistory();
    const index = history.findIndex(item => item.songId === value.songId);
    if (index === -1) {
        history.unshift(value);
        storage.set(PLAY_KEY, history);
    }
    return queryPlayHistory();
}