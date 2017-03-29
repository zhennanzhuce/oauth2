-- huangxin <3203317@qq.com>

local var = ngx.var;
local util = require 'util';

--[[
session
--]]
local _session = var.arg_session;
_session = util:isEmpty(_session);

if nil == _session then
  return 'general';
end;

return 'scope';
