/*!
 * oauth2.biz
 * Copyright(c) 2016 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

const EventProxy = require('eventproxy');

const md5 = require('speedt-utils').md5;

const mysql = require('./foreworld/mysql');

(() => {
  var sql = 'SELECT a.* FROM s_user a WHERE a.user_name=?';

  /**
   *
   * @return
   */
  exports.getByName = function(user_name, cb){
    mysql.query(sql, [user_name], (err, docs) => {
      if(err) return cb(err);
      cb(null, mysql.checkOnly(docs) ? docs[0] : null);
    });
  };
})();

(() => {
  var sql = 'SELECT a.* FROM s_user a WHERE a.id=?';

  /**
   *
   * @return
   */
  exports.getById = function(id, cb){
    mysql.query(sql, [id], (err, docs) => {
      if(err) return cb(err);
      cb(null, mysql.checkOnly(docs) ? docs[0] : null);
    });
  };
})();

/**
 *
 * @return
 * @code 10001 用户名或密码输入错误
 * @code 10002 禁止登陆
 * @code 10003 用户名或密码输入错误
 */
exports.login = function(logInfo, cb){
  this.getByName(logInfo.user_name, (err, doc) => {
    if(err) return cb(err);
    if(!doc) return cb(null, '10001');
    if(1 !== doc.status) return cb(null, '10002');

    if(md5.hex(logInfo.user_pass) !== doc.user_pass)
      return cb(null, '10003');

    cb(null, null, doc);
  });
};

(() => {
  const seconds = 60 * 60;
  const numkeys = 5;
  const sha1 = 'c99e793c2bd5f99f694c322c09ca04c75a25846f';

  /**
   *
   *
   * @param user_id
   * @param client_id
   * @return 获取令牌
   */
  exports.token = function(user_id, client_id, cb){
    var access_token = utils.replaceAll(uuid.v4(), '-', '');
    var refresh_token = utils.replaceAll(uuid.v1(), '-', '');

    redis.evalsha(sha1, numkeys, 'user_id', 'client_id', 'access_token', 'refresh_token', 'seconds', user_id, client_id, access_token, refresh_token, seconds, (err, code) => {
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