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

  console.log(query)

  res.send({
    a: 1,
    b: 2
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