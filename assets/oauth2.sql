/*
Navicat MySQL Data Transfer

Source Server         : opena
Source Server Version : 50623
Source Host           : 127.0.0.1:22306
Source Database       : oauth2

Target Server Type    : MYSQL
Target Server Version : 50623
File Encoding         : 65001

Date: 2017-03-27 11:38:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `s_user`
-- ----------------------------
DROP TABLE IF EXISTS `s_user`;
CREATE TABLE `s_user` (
  `id` varchar(32) NOT NULL,
  `user_name` varchar(32) DEFAULT NULL,
  `user_pass` varchar(32) DEFAULT NULL,
  `status` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of s_user
-- ----------------------------
INSERT INTO `s_user` VALUES ('9c012a33aa8b4ecc8aaf20ea149a6f25', 'mega', 'e10adc3949ba59abbe56e057f20f883e', '1');

-- ----------------------------
-- Table structure for `s_user_app`
-- ----------------------------
DROP TABLE IF EXISTS `s_user_app`;
CREATE TABLE `s_user_app` (
  `id` varchar(32) NOT NULL,
  `app_name` varchar(128) DEFAULT NULL,
  `app_desc` varchar(255) DEFAULT NULL,
  `user_id` varchar(32) DEFAULT NULL,
  `seckey` varchar(255) DEFAULT NULL COMMENT '私钥',
  `redirect_uri` varchar(255) DEFAULT NULL COMMENT '授权回调地址',
  `status` int(4) DEFAULT NULL COMMENT '状态：1启用0禁用',
  `create_time` datetime DEFAULT NULL,
  `website` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of s_user_app
-- ----------------------------
INSERT INTO `s_user_app` VALUES ('2', '应用B', null, '2', '123456', null, '1', '2017-02-08 17:36:51', null);
INSERT INTO `s_user_app` VALUES ('3', '应用C', null, '3', '123456', null, '1', '2017-02-08 17:36:54', null);
INSERT INTO `s_user_app` VALUES ('513ae2a0f0d611e68376e3b0bc3e1d71', '洪荒', null, '1', '123456', null, '1', '2017-02-08 17:36:46', 'http://www.foreworld.net/');
