/*!
 * oauth2.authorize
 * Copyright(c) 2016 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

const URL = require('url');

const conf = require('../settings');
const utils = require('speedt-utils').utils;

const biz = require('oauth2.biz');

exports.index = function(req, res, next){
  var query = req.body;

  let info = {
    user_name: req.auth.username,
    user_pass: req.auth.password
  };

  return biz.user.login(info, (err, code, user) => {
    if(err) return next(err);
    if(code) return res.send({ error: { code: code } });

    biz.user_app.getUserAuth(query.client_id, (err, doc) => {
      if(err) return next(err);
      if(!doc) return res.send({ error: { code: 'invalid_client' } });
      res.send({
        a: 1,
        b: 2
      });
    });
  });

};

exports.index_params = function(req, res, next){
  var query = req.body;

  res.header('Expires', -1);
  res.header('Pragma', 'no-cache');
  res.header('Cache-Control', 'no-store');

  if(!utils.isEmpty(query.code)){
    return res.send({ error: { code: 'invalid_code' } });
  }

  if(!utils.isEmpty(query.redirect_uri)){
    return res.send({ error: { code: 'invalid_redirect_uri' } });
  }

  next();
};