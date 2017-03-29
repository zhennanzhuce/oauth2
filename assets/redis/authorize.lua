
-- huangxin <3203317@qq.com>

redis.call('SELECT', 2);

-- code = client_id:user_id
local code = redis.call('GET', ARGV[2] .. ARGV[4]);
if code then return code; end;

--[[
redis.call("HSET", ARGV[1], KEYS[2], ARGV[2]);
redis.call("HSET", ARGV[1], KEYS[3], ARGV[3]);
redis.call("HSET", ARGV[1], KEYS[4], ARGV[4]);
--]]

--[[
{
  code: {
    client_id: '',
    redirect_uri: '',
    user_id: ''
  }
}
--]]
redis.call('HMSET', ARGV[1], KEYS[2], ARGV[2], KEYS[3], ARGV[3], KEYS[4], ARGV[4]);
redis.call('EXPIRE', ARGV[1], ARGV[5]);


-- local uuid = os.execute("cat /proc/sys/kernel/random/uuid");

-- code = client_id:user_id
redis.call('SET', ARGV[2] .. ARGV[4], ARGV[1]);
redis.call('EXPIRE', ARGV[2] .. ARGV[4], ARGV[5]);

local uuid = ARGV[1];
return uuid;


