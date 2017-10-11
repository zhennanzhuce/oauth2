#!/bin/bash

echo "authorize.lua"
/root/my/redis/redis-3.2.6/src/redis-cli -a 123456 -p 12379 script load "$(cat /root/my/git/zhennanzhuce/oauth2/assets/redis/authorize.lua)"

echo ""
echo "getSession.lua"
/root/my/redis/redis-3.2.6/src/redis-cli -a 123456 -p 12379 script load "$(cat /root/my/git/zhennanzhuce/oauth2/assets/redis/getSession.lua)"

echo ""
echo "pw.lua"
/root/my/redis/redis-3.2.6/src/redis-cli -a 123456 -p 12379 script load "$(cat /root/my/git/zhennanzhuce/oauth2/assets/redis/pw.lua)"

echo ""
echo "token.lua"
/root/my/redis/redis-3.2.6/src/redis-cli -a 123456 -p 12379 script load "$(cat /root/my/git/zhennanzhuce/oauth2/assets/redis/token.lua)"