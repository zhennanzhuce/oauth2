/*!
 * oauth2.isv
 * Copyright(c) 2016 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

const URL = require('url');
const http = require('http');
const uuid = require('node-uuid');

const index = require('../controllers/index');

const utils = require('speedt-utils').utils;
const ajax = require('speedt-utils').ajax;
const rest = require('speedt-utils').rest;

module.exports = function(app){
  app.get('/', index.indexUI);

  app.post('/tokenByPw$', (req, res, next) => {
    var query = req.body;

    var uri = [];
    uri.push('/oauth/2.0/token');
    uri.push('?grant_type=password');

    var data = {
      client_id: '513ae2a0f0d611e68376e3b0bc3e1d71',
    };

    ajax(http.request, {
        host: '127.0.0.1',
        port: 80,
        path: uri.join(''),
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic '+ query.auth
        }
      }, data, null).then(html => {
        res.send(html);
      }).catch(next);

  });

  app.get('/3rd$', (req, res, next) => {
    var uri = [];
    uri.push('http://127.0.0.1/oauth/2.0/authorize');
    uri.push('?client_id=513ae2a0f0d611e68376e3b0bc3e1d71');
    uri.push('&response_type=code');
    uri.push('&redirect_uri='+ encodeURIComponent('http://127.0.0.1:3003/3rd/login'));
    uri.push('&scope=');
    uri.push('&state='+ utils.replaceAll(uuid.v1(), '-', ''));
    res.redirect(302, uri.join(''));
  });

  app.all('/3rd/login$', (req, res, next) => {
    var query = URL.parse(req.url, true).query;

    var uri = [];
    uri.push('/oauth/2.0/token');
    uri.push('?grant_type=authorization_code');
    // uri.push('&redirect_uri='+ encodeURIComponent('http://127.0.0.1:3003/3rd/login'));
    // uri.push('&code='+ query.code);

    var data = {
      // grant_type: 'authorization_code',
      redirect_uri: 'http://127.0.0.1:3003/3rd/login',
      code: query.code
    };

    ajax(http.request, {
        host: '127.0.0.1',
        port: 80,
        path: uri.join(''),
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic NTEzYWUyYTBmMGQ2MTFlNjgzNzZlM2IwYmMzZTFkNzE6MTIzNDU2'
        }
      }, data, null).then(html => {
        var jo = JSON.parse(html);

        getUser(jo.access_token, function (err, data){
          if(err) return next(err);
          req.session.user = data;
          res.redirect('/');
        });
      }).catch(next);
  });
};


/**
 * 获取用户
 */
var getUser = function(session, cb){
  var params = {
    appkey: '513ae2a0f0d611e68376e3b0bc3e1d71',
    method: 'cme.user.get',
    session: session
  }

  var sign = rest.genSignature(params, '123456');
  sign = encodeURIComponent(sign);

  ajax(http.request, {
    host: '127.0.0.1',
    port: 80,
    path: '/api?method=cme.user.get&appkey=513ae2a0f0d611e68376e3b0bc3e1d71&signature='+ sign +'&session='+ session,
    method: 'GET',
  }, null, null).then(html => {
    var jo = JSON.parse(html);
    cb(null, jo.data);
  }).catch(cb);
}