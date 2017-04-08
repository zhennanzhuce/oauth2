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
  // var query = URL.parse(req.url, true).query;
  var query = req.body;
  // console.log(query)
  // var result = {
  //   'access_token': '2YotnFZFEjr1zCsicMWpAA',
  //   'token_type': 'bearer',
  //   'expires_in': 3600,
  //   'refresh_token': 'tGzv3JOkF0XG5Qx2TlKWIA',
  //   'scope': ''
  // };

  if('password' === query.grant_type){
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
        res.send({});
      });
    });
  }

  if('authorization_code' === query.grant_type){
    return biz.user_app.token(query.code, (err, code, token) => {
      if(err) return next(err);
      if(code){
        return res.send({ error: { code: code } });
      }
      res.send(token);
    });
  }

};

exports.index_params = function(req, res, next){
  // var query = URL.parse(req.url, true).query;
  var query = req.body;

  res.header('Expires', -1);
  res.header('Pragma', 'no-cache');
  res.header('Cache-Control', 'no-store');

  if(!utils.isEmpty(query.code)){
    return res.send({ error: { code: 'invalid_code' } });
  }

  // if('authorization_code' !== utils.isEmpty(query.grant_type)){
  //   return res.send({ error: { code: 'invalid_grant_type' } });
  // }

  if(!utils.isEmpty(query.redirect_uri)){
    return res.send({ error: { code: 'invalid_redirect_uri' } });
  }

  switch(query.grant_type){
    case 'authorization_code': return next();
    case 'password':
      if(utils.isEmpty(query.client_id)) return next();
      return res.send({ error: { code: 'invalid_client_id' } });
    default: return res.send({ error: { code: 'invalid_grant_type' } });
  }

  next();
};