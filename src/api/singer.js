/**
 * File: singer.js
 * Project: chicken-music
 * File Created: Thursday, 17th October 2019 12:12:30 pm
 * Author: Lenovo
 * Description: 歌手页面接口定义
 * -----
 * Last Modified: Wednesday, 4th December 2019 2:36:03 pm
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 */
import { get } from '../shared/utils/http';

export const getSinger = () => get('/myapi/GET/singer/list');

export const getSingerDetail = (obj) => get('/myapi/GET/singer/detail', obj);
