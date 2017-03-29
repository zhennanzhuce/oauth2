/*!
 * oauth2.authorize
 * Copyright(c) 2016 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

module.exports = {
  corp: {
    name: 'foreworld.net'
  },
  cookie: {
    secret: 'authorize'
  },
  html: {
    cdn: 'http://127.0.0.1/'
  },
  oauth2: {
    mysql: {
      database: 'oauth2',
      host: '127.0.0.1',
      port: 22306,
      user: 'root',
      password: 'password',
      connectionLimit: 50
    },
    redis: {
      port: 22379,
      host: '127.0.0.1',
      password: '123456'
    }
  },
  foreworld: {
    mysql: {
      database: 'foreworld',
      host: '127.0.0.1',
      port: 22306,
      user: 'root',
      password: 'password',
      connectionLimit: 50
    }
  }
};