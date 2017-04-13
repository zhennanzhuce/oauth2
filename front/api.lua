-- huangxin <3203317@qq.com>

local var = ngx.var;
local util = require 'util';

local _signature = var.arg_signature;
_signature = util:isEmpty(_signature);

if nil == _signature then
  return 'pub';
end;

--[[
session
--]]
local _session = var.arg_session;
_session = util:isEmpty(_session);

if nil == _session then
  return 'general';
end;

return 'scope';
