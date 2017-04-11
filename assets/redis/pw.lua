
-- huangxin <3203317@qq.com>

redis.call('SELECT', 3);

local client_id = ARGV[2];
local user_id = ARGV[1];

-- access_token = user_id:client_id
local access_token = redis.call('GET', user_id .. client_id);
if access_token then
  redis.call('DEL', user_id .. client_id);
  redis.call('DEL', access_token);
end;

-- user_id:client_id:access_token
redis.call('SET', user_id .. client_id, ARGV[3]);
redis.call('EXPIRE', user_id .. client_id, ARGV[5]);

--[[
{
  access_token: {
    client_id: '',
    user_id: '',
    scope: ''
  }
}
--]]
redis.call('HMSET', ARGV[3], 'client_id', client_id, 'user_id', user_id, 'scope', '');
-- access_token: 3600(s)
redis.call('EXPIRE', ARGV[3], ARGV[5]);


return 'OK';