/**
 * File: recommend.js
 * Project: chicken-music
 * File Created: Wednesday, 16th October 2019 3:47:57 pm
 * Author: Lenovo
 * Description: 推荐页面接口定义
 * -----
 * Last Modified: Wednesday, 4th December 2019 11:31:47 am
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 */
import { get } from '../shared/utils/http';

/* 获取轮播图列表 */
export const getBannerList = (obj) => get('/myapi/GET/banner', obj);

/* 获取推荐歌单 */
export const getDiscList = () => get('/myapi/GET/songList');

/* 获取歌单详情 */
export const getSongListDetail = (obj) => get('/myapi/GET/songList/detail', obj);