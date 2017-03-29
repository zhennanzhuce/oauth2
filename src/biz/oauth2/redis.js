/*!
 * oauth2.biz
 * Copyright(c) 2016 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

const path = require('path'),
      cwd = process.cwd();

const Redis = require('speedt-redis');

const conf = require(path.join(cwd, 'settings')).oauth2.redis;

exports = module.exports = new Redis(conf);