/*!
 * oauth2.authorize
 * Copyright(c) 2016 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

const authorize = require('../controllers/authorize');
const login = require('../controllers/login');
const token_pw = require('../controllers/token_pw');
const token_auth = require('../controllers/token_auth');

module.exports = function(app){
  app.post('/', authorize.index_params, authorize.index);
  app.get('/', login.indexUI_params, login.indexUI);
  app.post('/token/auth/', token_auth.index_params, token_auth.index);
  app.post('/token/pw/', token_pw.index_params, token_pw.index);
};