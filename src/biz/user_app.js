/*!
 * oauth2.biz
 * Copyright(c) 2016 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

const EventProxy = require('eventproxy');
const uuid = require('node-uuid');

const utils = require('speedt-utils').utils;

const mysql = require('./oauth2/mysql');
const redis = require('./oauth2/redis');

(() => {
  var sql = 'SELECT a.* FROM s_user_app a WHERE a.status=? AND a.id=?';

  /**
   * 获取应用及授权信息
   *
   * @return
   */
  exports.getUserAuth = function(id, cb){
    mysql.query(sql, [1, id], (err, docs) => {
      if(err) return cb(err);
      cb(null, mysql.checkOnly(docs) ? docs[0] : null);
    });
  };
})();

(() => {
  const seconds = 10 * 60;
  const numkeys = 5;
  const sha1 = '4256ff8e6431d71e6f7084696c9eeca11a0c843a';

  /**
   * 获取授权码
   *
   * @return 授权码
   */
  exports.authorize = function(u, cb){
    var code = utils.replaceAll(uuid.v4(), '-', '');

    redis.evalsha(sha1, numkeys, 'code', 'client_id', 'redirect_uri', 'user_id', 'seconds', code, u.client_id, u.redirect_uri, u.user_id, seconds, (err, code) => {
      if(err) return cb(err);
      cb(null, code);
    });
  };
})();

(() => {
  const seconds = 60 * 60;
  const numkeys = 4;
  const sha1 = 'c99e793c2bd5f99f694c322c09ca04c75a25846f';

  /**
   *
   *
   * @param code 授权码
   * @return 获取令牌
   */
  exports.token = function(code, cb){
    var access_token = utils.replaceAll(uuid.v4(), '-', '');
    var refresh_token = utils.replaceAll(uuid.v1(), '-', '');

    redis.evalsha(sha1, numkeys, 'code', 'access_token', 'refresh_token', 'seconds', code, access_token, refresh_token, seconds, (err, code) => {
      if(err) return cb(err);
      if('OK' !== code) return cb(null, code);
      cb(null, null, {
        access_token: access_token,
        token_type: 'bearer',
        refresh_token: refresh_token,
        expires_in: seconds,
        scope: ''
      });
    });
  };
})();

(() => {
  const sha1 = '0d894cb8d15ab899b0da7bf8424a3ad3a0351667';

  /**
   *
   * @param token
   * @return session
   */
  exports.getSession = function(token, cb){
    redis.evalsha(sha1, 1, 'token', token, (err, code) => {
      if(err) return cb(err);
      if(!code) return cb();

      let doc = code.split(',');

      cb(null, {
        client_id: doc[0],
        user_id: doc[1],
        scope: doc[2]
      });
    });
  };
})();