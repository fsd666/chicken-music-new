/**
 * File: rank.js
 * Project: chicken-music
 * File Created: Thursday, 17th October 2019 12:13:09 pm
 * Author: Lenovo
 * Description: 排行页面接口定义
 * -----
 * Last Modified: Wednesday, 4th December 2019 11:59:15 am
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 */
import { get } from '../shared/utils/http';

/* 获取排行列表 */
export const getRankList = () => get('/myapi/GET/rankListAndMusic');

/* 获取排行列表对应歌曲 */
export const getRankDetail = (obj) => get('/myapi/GET/rank/detail', obj);
