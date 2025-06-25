# Redis

## Redis 安装

Redis 安装可以通过包管理器或从源代码编译安装。

### 包管理器安装

```bash
sudo apt install redis
```

如果直接安装 `redis`，默认会安装最新版本的 `redis-server` 和 `redis-cli`。

可以通过以下命令查看版本：

```bash
redis-server -v
redis-cli -v
```

在 systemd 管理中，可以用 `redis` 来启动和停止服务：

```bash
sudo systemctl start redis
sudo systemctl stop redis
sudo systemctl restart redis
```

## 基础使用

### redis-cli 命令行工具

Redis 提供了一个命令行工具 `redis-cli`，用于与 Redis 服务器交互。可以通过以下命令启动：

```bash
redis-cli
```

如果 Redis 服务器运行在非默认端口（6379）或非本地地址，可以使用以下命令连接：

```bash
redis-cli -h 127.0.0.1 -p 6379
```

连接到本地 Redis 服务器后，可以输入 Redis 命令进行操作。

### 基础配置

Redis 的配置文件通常位于 `/etc/redis/redis.conf`。可以使用文本编辑器打开并修改配置。

_MacOS 用户可以通过 Homebrew 安装 Redis，配置文件通常位于 `/usr/local/etc/redis.conf`。_

#### 设置密码

通常在生产环境中，建议设置密码以保护 Redis 实例。可以在配置文件中找到以下行并取消注释：

```bash
# requirepass foobared
```

之后连接 Redis 时需要提供密码：

```bash
redis-cli -a yourpassword
```

### 常用命令

以下是按类别整理的 **常用 Redis 命令清单**，适合初学者查阅和实操：

---

#### 🧭 基本操作

| 命令            | 说明                         |
| --------------- | ---------------------------- |
| `PING`          | 测试连接（返回 `PONG`）      |
| `AUTH password` | 验证密码                     |
| `SELECT index`  | 选择数据库（0~15）           |
| `FLUSHDB`       | 清空当前库                   |
| `FLUSHALL`      | 清空所有数据库               |
| `DBSIZE`        | 当前数据库键数               |
| `KEYS *`        | 查看所有键（不推荐用于生产） |
| `EXISTS key`    | 判断 key 是否存在            |
| `DEL key1 key2` | 删除 key                     |
| `EXPIRE key 60` | 设置 key 过期（秒）          |
| `TTL key`       | 查看剩余有效时间（秒）       |
| `TYPE key`      | 查看 key 的类型              |

---

#### 🧾 字符串（String）

| 命令                      | 说明             |
| ------------------------- | ---------------- |
| `SET key value`           | 设置字符串       |
| `GET key`                 | 获取字符串       |
| `SETEX key seconds value` | 设置值并过期时间 |
| `INCR key`                | 自增（整数）     |
| `DECR key`                | 自减（整数）     |
| `APPEND key "more"`       | 追加字符串       |

---

#### 📋 列表（List）

| 命令                      | 说明         |
| ------------------------- | ------------ |
| `LPUSH key value1 value2` | 从左插入元素 |
| `RPUSH key value1 value2` | 从右插入元素 |
| `LPOP key`                | 弹出最左元素 |
| `RPOP key`                | 弹出最右元素 |
| `LRANGE key 0 -1`         | 获取所有元素 |
| `LLEN key`                | 获取列表长度 |

---

#### 📌 集合（Set）

| 命令                       | 说明           |
| -------------------------- | -------------- |
| `SADD key member1 member2` | 添加元素到集合 |
| `SREM key member`          | 移除元素       |
| `SMEMBERS key`             | 获取所有元素   |
| `SISMEMBER key member`     | 判断是否存在   |
| `SCARD key`                | 获取集合长度   |

---

#### 🧾 哈希（Hash）

| 命令                   | 说明             |
| ---------------------- | ---------------- |
| `HSET key field value` | 设置字段值       |
| `HGET key field`       | 获取字段值       |
| `HGETALL key`          | 获取所有字段和值 |
| `HDEL key field`       | 删除字段         |
| `HEXISTS key field`    | 判断字段是否存在 |
| `HINCRBY key field 1`  | 对字段值自增     |

---

#### 📊 有序集合（Sorted Set / ZSet）

| 命令                            | 说明                 |
| ------------------------------- | -------------------- |
| `ZADD key score1 member1`       | 添加元素（带分值）   |
| `ZRANGE key 0 -1 WITHSCORES`    | 正序取所有元素及分数 |
| `ZREVRANGE key 0 -1 WITHSCORES` | 倒序取所有元素及分数 |
| `ZREM key member`               | 移除成员             |
| `ZSCORE key member`             | 获取成员分值         |

---

#### 🛠 其他工具命令

| 命令                 | 说明                              |
| -------------------- | --------------------------------- |
| `MONITOR`            | 实时打印 Redis 所有请求（调试用） |
| `INFO`               | 查看 Redis 状态信息               |
| `CONFIG GET *`       | 查看所有配置项                    |
| `CONFIG SET key val` | 修改配置项（如 maxmemory）        |
| `SAVE`               | 同步保存快照（RDB）               |
| `BGSAVE`             | 异步保存快照（RDB）               |
| `CLIENT LIST`        | 当前连接客户端列表                |

### 数据类型

Redis 支持多种**数据类型**，使它不仅仅是一个简单的 Key-Value 存储，而是一个功能丰富的内存数据库。以下是 Redis 主要的数据类型及其用途：

#### 🧾 1. String（字符串）

- **最基本的类型**，可存储字符串、整数或浮点数。
- 一个 key 对应一个 value（最多 512MB）。

**常用命令**：

```bash
SET key value
GET key
INCR key      # 自增
DECR key      # 自减
APPEND key value
```

**典型用途**：缓存数据、计数器、配置项等。

#### 📋 2. List（列表）

- 有序、可重复元素集合，底层是双向链表。
- 支持从两端插入/弹出，适合做队列或栈结构。

**常用命令**：

```bash
LPUSH key value
RPUSH key value
LPOP key
RPOP key
LRANGE key 0 -1  # 获取列表全部元素
```

**典型用途**：消息队列、任务队列、聊天记录等。

#### 🧮 3. Hash（哈希表）

- 每个数组元素有唯一标识（key），类似<u>对象数组</u>。
- 你希望通过 key 快速访问或修改元素。

**常用命令**：

```bash
HSET user:1 name "Alice"
HGET user:1 name
HGETALL user:1
HDEL user:1 name
```

**典型用途**：用户资料、商品信息等结构化数据。

#### 🔘 4. Set（集合）

- 无序、不重复元素集合。
- 需要去重或集合运算（交集、并集、差集）。

**常用命令**：

```bash
SADD key member
SREM key member
SMEMBERS key            # 获取所有成员
SISMEMBER key member    # 判断成员是否存在
```

**典型用途**：标签、关注列表、去重记录、抽奖等。

#### 📊 5. Sorted Set（有序集合 / ZSet）

- 每个元素关联一个分数（score），**按分数排序**。
- 分数可重复，元素唯一。

**常用命令**：

```bash
ZADD rank 100 Alice
ZRANGE rank 0 -1 WITHSCORES     # 获取所有元素及分数
ZREVRANGE rank 0 -1 WITHSCORES  # 倒序获取
ZINCRBY rank 10 Alice           # 增加分数
```

**典型用途**：排行榜、权重排序、计分系统等。

#### 🔁 6. Bitmaps（位图）

- 基于 String 类型进行位操作。
- 可用于高效记录布尔状态（例如是否签到）。

**命令**：

```bash
SETBIT key offset 1
GETBIT key offset
BITCOUNT key
```

**典型用途**：用户打卡、活跃状态、签到统计。

#### 🔢 7. HyperLogLog（基数估算）

- 用于 **统计唯一元素数量**，占用内存极小（≈12KB）。
- 是一种近似计数结构。

**命令**：

```bash
PFADD key element
PFCOUNT key
```

**典型用途**：UV（独立访客）、去重统计。

#### 🛎 8. Geospatial（地理空间）

- 基于 Sorted Set 存储位置坐标，可进行地理位置计算。

**命令**：

```bash
GEOADD cities 116.40 39.90 "Beijing"
GEODIST cities Beijing Shanghai km
GEORADIUS cities 116.4 39.9 100 km
```

**典型用途**：附近的人、LBS 定位等。

#### 📢 9. Pub/Sub（发布/订阅）

- 类似消息广播机制，不存数据，仅负责转发。

**命令**：

```bash
PUBLISH news "Hello"
SUBSCRIBE news
```

**典型用途**：消息推送、实时通知。

#### ✅ 总结对比表：

| 类型        | 是否有序 | 可否重复 | 典型用途           |
| ----------- | -------- | -------- | ------------------ |
| String      | 否       | 否       | 缓存、计数器       |
| List        | 是       | 是       | 队列、聊天记录     |
| Hash        | 否       | 键唯一   | 用户信息、对象数据 |
| Set         | 否       | 否       | 标签、去重         |
| ZSet        | 按分数   | 否       | 排行榜、权重排序   |
| Bitmap      | 否       | 位操作   | 签到、状态记录     |
| HyperLogLog | 否       | 近似值   | 去重统计（省空间） |
| Geo         | 按坐标   | 否       | 地理定位查询       |
| Pub/Sub     | 无存储   | 广播     | 实时消息系统       |

### 操作示例

#### 基础案例

```bash
# 连接 Redis CLI
redis-cli

# 设置值并读取
SET site "redis.io"
GET site

# 存哈希
HSET user:1 name "Alice" age 23
HGETALL user:1

# 设置过期
EXPIRE site 60
TTL site
```

## 持久化机制

### RDB 和 AOF 的区别

### 配置建议

## 发布订阅

## 高可用部署

## 性能优化与运维

## 项目实战或最佳实践
