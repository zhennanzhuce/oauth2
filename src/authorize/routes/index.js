/*!
 * oauth2.authorize
 * Copyright(c) 2016 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

const authorize = require('../controllers/authorize');
const login = require('../controllers/login');
const token = require('../controllers/token');

module.exports = function(app){
  app.post('/', authorize.index_params, authorize.index);
  app.get('/', login.indexUI_params, login.indexUI);
  app.post('/token/', token.index_params, token.index);
};