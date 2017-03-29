
-- huangxin <3203317@qq.com>



redis.call('SELECT', 3);


local exist = redis.call('EXISTS', ARGV[1]);
if 1 ~= exist then return; end;


local client_id = redis.call('HGET', ARGV[1], 'client_id');
local user_id = redis.call('HGET', ARGV[1], 'user_id');
local scope = redis.call('HGET', ARGV[1], 'scope');

return client_id ..','.. user_id ..','.. scope;