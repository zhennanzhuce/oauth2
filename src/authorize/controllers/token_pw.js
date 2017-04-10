/*!
 * oauth2.authorize
 * Copyright(c) 2016 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

const URL = require('url');
const basicAuth = require('basic-auth');

const conf = require('../settings');
const utils = require('speedt-utils').utils;

const biz = require('oauth2.biz');

exports.index = function(req, res, next){
  var query = req.body;

  biz.user_app.getUserAuth(query.client_id, (err, doc) => {
    if(err) return next(err);
    if(!doc) return res.send({ error: { code: 'invalid_client' } });

    biz.user.token(req._user_id, query.client_id, (err, code, token) => {
      if(err) return next(err);
      if(code) return res.send({ error: { code: code } });
      res.send(token);
    });
  });

};

exports.index_params = function(req, res, next){
  var query = req.body;

  res.header('Expires', -1);
  res.header('Pragma', 'no-cache');
  res.header('Cache-Control', 'no-store');

  if(!utils.isEmpty(query.client_id)){
    return res.send({ error: { code: 'invalid_client_id' } });
  }

  next();
};

exports.auth = function(req, res, next){
  var user = basicAuth(req);

  if(!user) return res.send({ error: { code: 'invalid_user' } });

  biz.user.login({
    user_name: user.name,
    user_pass: user.pass
  }, (err, code, user) => {
    if(err) return next(err);
    if(code) return res.send({ error: { code: code } });
    req._user_id = user.id;
    next();
  });
};