/*!
 * oauth2.isv
 * Copyright(c) 2016 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

const URL = require('url');

const conf = require('../settings');

exports.indexUI = function(req, res, next){
  res.render('index', {
    conf: conf,
    title: 'isv | '+ conf.corp.name,
    data: {
      query: URL.parse(req.url, true).query,
      user: req.session.user
    }
  });
};