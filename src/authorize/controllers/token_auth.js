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

  biz.user_app.token(query.code, (err, code, token) => {
    if(err) return next(err);
    if(code) return res.send({ error: { code: code } });
    res.send(token);
  });
};

exports.index_params = function(req, res, next){
  var body = req.body;

  res.header('Expires', -1);
  res.header('Pragma', 'no-cache');
  res.header('Cache-Control', 'no-store');

  if(!utils.isEmpty(body.code)){
    return res.send({ error: { code: 'invalid_code' } });
  }

  if(!utils.isEmpty(body.redirect_uri)){
    return res.send({ error: { code: 'invalid_redirect_uri' } });
  }

  let query = URL.parse(req.url, true).query;

  switch(query.grant_type){
    case 'authorization_code': return next();
    case 'password':
    default: return res.send({ error: { code: 'invalid_grant_type' } });
  }

  next();
};