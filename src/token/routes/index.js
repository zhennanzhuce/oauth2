/*!
 * oauth2.token
 * Copyright(c) 2016 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

const token = require('../controllers/token');

module.exports = function(app){
  app.post('/', token.index_params, token.index);
};