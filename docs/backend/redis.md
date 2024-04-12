> /etc/redis/redis.conf 

select

hSet

expire

hGetAll

del

TTL 返回剩余时间（秒）

PTTL 返回剩余时间（微秒）

lPush

rPop

## Redis-CLi

### connect

```bash
redis-cli -h 127.0.0.1 -p 6379 -a "mypass"
```

### set password

```bash
config set requirepass youpassword
```

但这个配置如果redis被重启就失效了，如果需要永久有效需要修改配置文件。

一般路径为：`/usr/local/etc/redis.conf`

编辑时可以直接搜索 `requirepass foobared` 找到对应的位置（输入`/`可以在vim中搜索）

然后输入自己的密码即可：

```bash
# requirepass foobared
requirepass 123456
```

