-- huangxin <3203317@qq.com>

local var = ngx.var;
local util = require 'util';

--[[
--]]
local _grant_type = var.arg_grant_type;
_grant_type = util:isEmpty(_grant_type);

if 'authorization_code' == _grant_type then
  return 'auth/';
end;

if 'password' == _grant_type then
  return 'pw/';
end;

return nil;