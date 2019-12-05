/**
 * File: music.js
 * Project: chicken-music
 * File Created: Thursday, 5th December 2019 11:12:48 am
 * Author: Fan
 * Description: 音乐相关接口定义
 * -----
 * Last Modified: Thursday, 5th December 2019 11:15:43 am
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 */
import { get } from '../shared/utils/http';

/* 获取歌词 */
export const getLyric = (obj) => get('/myapi/GET/song/lyric', obj);