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
    cdn: 'http://www.foreworld.net/'
  },
  oauth2: {
    mysql: {
      database: 'oauth2',
      host: '127.0.0.1',
      port: 12306,
      user: 'root',
      password: process.env.MYSQL_PASS || '123456',
      connectionLimit: 50
    },
    redis: {
      port: 12379,
      host: '127.0.0.1',
      password: '123456'
    }
  },
  foreworld: {
    mysql: {
      database: 'foreworld',
      host: '127.0.0.1',
      port: 12306,
      user: 'root',
      password: process.env.MYSQL_PASS || '123456',
      connectionLimit: 50
    }
  }
};
