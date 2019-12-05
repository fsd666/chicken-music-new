/**
 * File: search.js
 * Project: chicken-music
 * File Created: Thursday, 17th October 2019 12:04:21 pm
 * Author: Lenovo
 * Description: 搜索页面接口定义
 * -----
 * Last Modified: Wednesday, 4th December 2019 2:48:01 pm
 * Modified By: Fan
 * -----
 * Copyright 2017 - 2019 Your Company, Your Company
 */
import { get } from '../shared/utils/http';

export const getHotKey = () => get('/myapi/GET/hotSearch');

export const search = (obj) => get('/myapi/GET/search', obj);
