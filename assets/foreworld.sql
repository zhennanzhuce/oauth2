/*
Navicat MySQL Data Transfer

Source Server         : opena
Source Server Version : 50623
Source Host           : 127.0.0.1:22306
Source Database       : foreworld

Target Server Type    : MYSQL
Target Server Version : 50623
File Encoding         : 65001

Date: 2017-03-27 11:38:32
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
  `sex` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of s_user
-- ----------------------------
INSERT INTO `s_user` VALUES ('1', 'huangxin', 'e10adc3949ba59abbe56e057f20f883e', '1', '1');
INSERT INTO `s_user` VALUES ('3bae9ec1e33a4a5c8082fb2e5f7f8330', 'wuyu', 'e10adc3949ba59abbe56e057f20f883e', '1', '2');
