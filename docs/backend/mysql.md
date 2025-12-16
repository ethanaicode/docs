---
title: MySQL 数据库学习指南，SQL 基础语法、常用函数、高级操作
---

# SQL

以 **MySQL** 为例，介绍 SQL 的基础使用，包括安装、常用语法、函数以及高级操作。

## 开始使用

### 安装 MySQL

MySQL 的安装包通常包含两个主要组件：

- **`mysql-server`**
  - MySQL 数据库服务器，负责处理数据库的存储、查询、事务等操作。
  - 适合需要提供数据库服务的场景。
- **`mysql-client`**
  - MySQL 客户端工具，提供命令行工具用于连接和管理 MySQL 数据库。
  - 如果只需要远程连接管理数据库（而不在本机运行服务端），只需安装 `mysql-client`。

注意：

- 安装 `mysql-server` 时通常会自动安装 `mysql-client`（作为依赖）。
- 一般情况下，不需要单独安装 `mysql-client`。

**安装命令示例**

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server
# CentOS/RHEL
sudo yum install mysql-server
```

安装完成后，可以通过以下命令检查 MySQL 是否运行：

```bash
systemctl status mysql
```

### 用户及权限管理

#### 管理用户登录方式

查看用户登录方式可以使用以下命令：

```sql
SELECT user, host, plugin, authentication_string FROM mysql.user;
```

- `plugin`: 验证插件，表示登录验证方式。

  - 常见的值有：

    - `mysql_native_password`: 传统的密码验证方式。
    - `caching_sha2_password`: 使用缓存的 SHA-2 密码验证方式（MySQL 8.0 默认）
    - `auth_socket`: 使用 Unix 套接字验证方式，不需要密码（通常用于本地连接）
    - `sha256_password`: 使用 SHA-256 密码验证方式

- `authentication_string`: 加密的密码（如果为空则可能未设置密码）。

**如何切换为密码登录方式**

如果你希望改为通过密码验证，可以使用如下命令：

```sql
ALTER USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'new_password';
FLUSH PRIVILEGES;
```

#### 创建一个新用户

```sql
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

- `CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';`: 创建用户

  `username` 新用户的用户名

  `localhost` 新用户的主机名

  `password` 新用户的密码

- `GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' WITH GRANT OPTION;`: 授权

  `ALL PRIVILEGES` 用户被授予所有权限

  `*.*` 数据库名.表名

  `WITH GRANT OPTION` 允许用户将自己的权限授予其他用户

- `FLUSH PRIVILEGES;`: <u>刷新权限</u>，使权限更改生效

#### 用户及权限管理

- `REVOKE ALL PRIVILEGES ON *.* FROM 'username'@'localhost';`: 撤销权限

- `SHOW GRANTS FOR 'username'@'localhost';`: 查看用户权限

- `SELECT user, host FROM mysql.user;`: 查看所有用户

- `ALTER USER 'username'@'localhost' IDENTIFIED BY 'new password';`: 修改密码（低版本中可能会报错）

  在 5.7.5 及以下版本 中，ALTER USER 不支持，需使用：

  `SET PASSWORD FOR 'username'@'localhost' = PASSWORD('newpassword');`

- `DROP USER 'username'@'localhost';`: 删除用户

### 相关文件及目录

#### 配置文件

位置通常在 `/etc/my.cnf` 或 `/etc/mysql/my.cnf`。

配置文件中包含了 MySQL 的配置信息，如端口、数据目录、日志文件等。

注意：配置文件中分 `[mysql]` 和 `[mysqld]`，前者是客户端配置，后者是服务器配置，不可以混用，否则会报错。

#### 数据库目录

数据库文件通常存储在 `/var/lib/mysql` 目录下。

通常包含了数据库文件、日志文件、配置文件等。

也可以通过 MySQL 命令查看目录信息: `SHOW VARIABLES LIKE 'datadir';`

#### 二进制日志

在数据库目录下，有一组文件名如 `mysql-bin.000001` 的二进制日志文件。

这些文件记录了数据库的所有更改（例如插入、更新、删除等），可以用于数据恢复、主从复制等。

请勿随意删除这些文件，否则可能导致数据丢失，你可以通过以下方式安全管理和清理这些文件：

- `SHOW BINARY LOGS;`: 查看二进制日志文件

- `SHOW MASTER STATUS;`: 查看主服务器当前正在使用的日志文件

- `PURGE BINARY LOGS TO 'mysql-bin.000003';`: 删除指定日志文件之前的所有日志文件（编号小于等于 `000003` 的文件）

- `PURGE BINARY LOGS BEFORE '2023-04-18 00:00:00';`: 删除指定时间之前的所有日志文件

还可以在配置文件 `my.cnf` 中设置 `expire_logs_days` 等参数来自动清理日志文件:

```ini
[mysqld]
expire_logs_days = 10
```

或者可以在配置文件中禁用它:

```ini
[mysqld]
skip-log-bin
```

### 常用数据类型

以下是常用的数据类型：

- `INT(size)`: 用于存储整数，`size` 是整数的长度

- `VARCHAR(size)`: 用于存储字符串，`size` 是字符串的长度

- `TEXT`: 用于存储大文本数据

- `DATE`: 用于存储日期

- `TIME`: 用于存储时间

- `DATETIME`: 用于存储日期和时间

- `TIMESTAMP`: 用于存储时间戳

- `FLOAT`: 用于存储单精度浮点数

- `DOUBLE`: 用于存储双精度浮点数

- `DECIMAL(long, decimal)`: 用于存储精确的十进制数字，`long` 表示数字的最大总位数，`decimal` 表示小数点后的位数

  例如：`DECIMAL(10,2)` 表示允许 10 位数字，其中包括 2 位小数

- `ENUM('value1', 'value2', ...)`: 用于存储预定义的值

  例如：`ENUM('Active', 'Inactive', 'Pending')`

## 查询语句

> 多行 SQL 语句可以使用 `;` 分隔，也可以使用 `GO` 分隔。

### 登录登出

- `mysql -u root -p`: 登录 MySQL 数据库

  `root` 是用户名，`-p` 表示需要输入密码

- `mysql -u root -p database_name`: 登录指定数据库

- `exit`: 退出数据库

### 基础语法

- `SELECT`: 从数据库中提取数据

- `SELECT DISTINCT`: 仅返回不同的值

- `WHERE`: 用于过滤结果集

- `AND`: 用于连接多个条件

- `OR`: 用于连接多个条件

- `NOT`: 用于否定条件

- `LIKE`: 用于模糊查询

  - `%` 表示任意多个字符

  - `_` 表示一个字符

    这个要特别注意，**不然很容易匹配到不期待的结果**。

    如果是真的想匹配 `_` 字符本身，可以使用 `ESCAPE` 关键字来定义转义字符，如

    ```sql
     SELECT * FROM table_name WHERE column_name LIKE 'abc\_' ESCAPE '\';
    ```

    表示定义 `\` 为转义字符，匹配 `abc_` 字符串

- `UPDATE`: 更新数据库中的数据

- `DELETE`: 从数据库中删除数据，没有 `WHERE` 会删除所有数据

- `INSERT INTO`: 向数据库中插入新数据

- `ORDER BY`: 按照指定列对结果集进行排序

- `GROUP BY`: 按照一个或多个列对结果集进行分组

- `HAVING`: 用于<u>过滤分组后的结果集</u>，类似于 `WHERE`，但是 `HAVING` 是在 `GROUP BY` 之后执行的

  如：`SELECT column, COUNT(*) FROM table GROUP BY column HAVING COUNT(*) > 1;`

  _如果使用 `WHERE` 过滤，会在分组前进行过滤，而 `HAVING` 在分组后进行过滤_

- `LIMIT`: 限制结果集的行数

  `LIMIT 5` 返回前 5 条记录

  `LIMIT 5, 10` 返回从第 6 条记录开始的 10 条记录

### 库及表操作

- `SHOW DATABASES`: 查看所有数据库

- `CREATE DATABASE database_name`: 创建数据库

- `ALTER DATABASE database_name`: 修改数据库

- `USE <database>`: 选择用哪个数据库

- `DROP DATABASE database_name`: 删除数据库

- `SHOW TABLES`: 查看所有表

- `CREATE TABLE table_name (<column1> <data_type>, <column2> <data_type>, ...);`: 创建表

- `RENAME TABLE old_table_name TO new_table_name`: 重命名表

- `DESC table_name`: 查看表结构

- `ALTER TABLE table_name ADD <column> <data_type>;`: 修改表，添加字段

- `DROP TABLE table_name`: 删除表

- `CREATE INDEX <indexName> ON table_name (<columnName>);`: 创建索引

- `DROP INDEX <indexName> ON table_name;`: 删除索引

- `TRUNCATE TABLE table_name`: 清空表

  `DELETE FROM table_name` 也可以清空表，但是 `TRUNCATE TABLE` 会重置自增 ID，而且会直接释放数据页，速度更快

- `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'database_name' AND TABLE_TYPE='VIEW';`: 查看数据库中的所有**视图**

  _这在备份数据库时想要忽略视图时会很有用_

### 导入导出

> 如果是为了找参考代码，可以直接看 [导入导出高级操作](#导入导出高级操作) 部分

- `mysqldump -u root -p database_name > file_name.sql`: 导出数据库

- `mysqldump -u root -p --single-transaction database_name > file_name.sql`: 导出大型数据库，使用单个事务以确保数据一致性

- `mysqldump -u root -p -d database_name > file_name.sql`: 导出数据库结构（不包含数据）

- `mysqldump -u root -p database_name table1 table2 > file_name.sql`: 导出指定表

- `mysql -u root -p database_name < file_name.sql`: 导入数据库

### 其它命令

- `STATUS`: 查看版本等信息

- `SHOW WARNINGS`: 显示警告信息

## 函数

### 常用函数

- `COUNT(<column>)`: 返回匹配条件的行数

- `SUM(<column>)`: 返回匹配条件的总和

- `AVG(<column>)`: 返回匹配条件的平均值

- `MIN(<column>)`: 返回匹配条件的最小值

### 字符串函数

- `CONCAT(<string1>, <string2>, ...)`: 连接字符串

- `CONCAT_WS(',', <string1>, <string2>, ...)`: 连接字符串，使用指定分隔符

- `LENGTH(<string>)`: 返回字符串长度

- `LOWER(<string>)`: 将字符串转换为小写

- `UPPER(<string>)`: 将字符串转换为大写

- `LEFT(<string>, <length>)`: 返回字符串左边的字符

- `RIGHT(<string>, <length>)`: 返回字符串右边的字符

- `SUBSTRING(<string>, <start>, <length>)`: 返回字符串的子串

- `REPLACE(<string>, 'old', 'new')`: 替换字符串

  ```sql
  -- 例如：替换旧域名为新域名
  UPDATE database_name.table_name
  SET field_name = REPLACE(field_name, 'old.example.com', 'new.example.com')
  WHERE field_name LIKE '%old.example.com%';
  ```

- `FIND_IN_SET(<string>, <string>)`: 查找字符串在另一个字符串中的位置

  示例: `SELECT FIND_IN_SET('b', 'a,b,c,d');` 返回 `2`

### 日期时间函数

- `TIMESTAMPDIFF(unit, start, end)`: 返回两个日期之间的差值

  `unit` 可以是 `YEAR`, `MONTH`, `DAY`, `HOUR`, `MINUTE`, `SECOND`

  示例: `SELECT TIMESTAMPDIFF(MINUTE, create_time, update_time) AS duration_minutes`

### 特殊函数

> 不可以在命令行中直接使用，需要在 SQL 语句中使用（配合 SELECT 等）

- `PASSWORD(<string>)`: 返回字符串的加密密码

- `VERSION()`: 返回 MySQL 版本

- `USER()`: 返回当前用户

- `DATABASE()`: 返回当前数据库

> [!TIP] 注意事项
>
> - 特殊函数是 MySQL 特有的函数，不是标准 SQL 函数。
>
> - 使用时需要注意，不同的数据库可能不支持。

## 使用案例

### 基础使用

#### INSERT 插入行

```sql
INSERT INTO customer (customer_name, customer_email)
VALUES ('John Doe', 'svip2011@qq.com');
```

批量插入行也是可以的：

```sql
INSERT INTO customer (customer_name, customer_email)
VALUES ('John Doe', 'JohnDoe@gmail.com'),
       ('Jane Doe', 'JaneDOe@gmail.com'),
       ('John Smith', 'JohnSmith@gmail.com');
```

#### UPDATE 更新行

```sql
UPDATE tablename
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

#### ALTER TABLE 新增或修改字段

```sql
-- 添加字段
ALTER TABLE tablename
ADD column1 datatype;

-- 添加字段并指定位置
ALTER TABLE tablename
ADD column1 datatype
AFTER column2;

-- 修改字段
ALTER TABLE tablename
MODIFY column1 datatype;

-- 修改自增长
ALTER TABLE tablename
AUTO_INCREMENT = value;
```

#### GROUP_CONCAT 聚合函数

```sql
-- 查出所有 customer_id 并去重
SELECT GROUP_CONCAT(DISTINCT customer_id SEPARATOR ',') AS customer_ids
FROM task;
```

#### DISTINCT 去重

```sql
-- 去重
SELECT DISTINCT column1, column2, ...
FROM table_name;
-- 统计去重后的数量
SELECT COUNT(DISTINCT column_name)
FROM table_name;
```

### 设置默认值及自动更新时间

在 `TIMESTAMP` 类型的字段上可以设置默认值 `CURRENT_TIMESTAMP`，这样在插入数据时如果没有指定时间，就会自动使用当前时间。

还可以设置 `ON UPDATE CURRENT_TIMESTAMP`，这样在更新数据时，时间也会自动更新。

```sql
ALTER TABLE tablename
ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
```

### 利用唯一键实现有则更新无则插入

使用 `INSERT ... ON DUPLICATE KEY UPDATE` 语句可以实现有则更新无则插入的效果。

这个需要在表中设置唯一键（`UNIQUE`）或主键（`PRIMARY KEY`）。

```sql
INSERT INTO tablename (id, column1, column2)
VALUES (1, 'value1', 'value2')
ON DUPLICATE KEY UPDATE
column1 = 'value1', column2 = 'value2';
```

如果是在 thinkphp 中使用，可以这样写：

```php
$data = [
    'column1' => 'value1',
    'column2' => 'value2',
];
Db::execute('INSERT INTO tablename (column1, column2) VALUES (:column1, :column2) ON DUPLICATE KEY UPDATE column1 = VALUES(column1), column2 = VALUES(column2)', $data);
```

### 区间日期查询

开始和结束时间包含在某区间，比如包含当日（2023 年 4 月 18 日）：

```sql
AND BeginDateTime <= '2023-04-18 23:59:59' AND EndDateTime >= '2023-04-18 00:00:00'
```

### 使用 COUNT 统计次数

查出一个表内容，并查处相关表中这个内容出现的次数。

```sql
SELECT t.*, COUNT(o.id) AS order_count
FROM task t
LEFT JOIN orders o ON t.id = o.task_id
GROUP BY t.id;
```

### 利用 CASE 进行自定义排序

_`CASE` 语句类似于 `if-else` 结构，但需要注意的是，它按顺序评估每个条件，并返回第一个为真的条件的结果（如果没有条件为真，则返回默认值）。_

```sql
-- 控制不同的排序（部分查询语句）
ORDER BY
CASE
  WHEN type = 'project' THEN CONCAT(project_id, 'a')
  ELSE CONCAT(project_id, 'b', order_id)
END
ASC

-- 选择匹配值（部分查询语句）
LEFT JOIN customer c ON c.id_customer =
CASE
    WHEN t.customer_id IS NOT NULL THEN t.customer_id
    WHEN o.customer_id IS NOT NULL THEN o.customer_id
    WHEN p.customer_id IS NOT NULL THEN p.customer_id
END

-- 计算结果（完整查询语句）
SELECT COUNTRY,
SUM(CASE WHEN GENDER ='1' THEN SALARY ELSE 0 END) AS COUNTG ，
SUM(CASE WHEN GENDER ='2' THEN SALARY ELSE 0 END) AS COUNTB
FROM EMPLOYEES
GROUP BY COUNTRY
```

## 高级操作

### 快速登录 MySQL

登录命令中可以直接指定用户名和密码，而避免手动输入密码：

```bash
mysql -u root -pYourPassword
```

注意：这种方式不安全，因为密码会出现在命令历史和 `ps` 进程列表里，其他用户可能看到，不建议在生产环境用这种写法。

或者在配置文件 `~/.my.cnf` 中添加以下内容：

```ini
[client]
user=root
password=YourPassword
```

并设置文件权限为只读：`chmod 600 ~/.my.cnf`

这样就可以直接使用 `mysql` 命令登录了：

它会自动读取用户名和密码。

### 查询和设置数据库时区

#### 查询时区

```sql
SELECT @@global.time_zone, @@session.time_zone;
```

- `SYSTEM`: 表示使用操作系统的时区

#### 设置时区

**临时设置（当前会话有效）**

_一旦关闭连接或重启 MySQL，就会失效_

```sql
SET time_zone = '+8:00'; -- 设置为东八区
SET time_zone = 'Asia/Shanghai'; -- 设置为上海时区
```

**全局设置（新会话有效）**

_重启 MySQL 后会失效_

```sql
SET GLOBAL time_zone = 'Asia/Singapore'; -- 设置为新加坡时区
```

**永久设置（重启 MySQL 后有效）**

_需要修改配置文件_

编辑配置文件，例如 `/etc/mysql/my.cnf` 或 `/etc/mysql/mysql.conf.d/mysqld.cnf`，在 `[mysqld]` 段落中添加：

```ini
[mysqld]
default-time-zone = 'Asia/Singapore'
```

然后重启 MySQL 服务：

```bash
sudo systemctl restart mysql
```

**确认当前时间**

```sql
SELECT NOW(), CURRENT_TIMESTAMP, @@global.time_zone, @@session.time_zone;
```

**注意**: MySQL **只在启动时**读取 `SYSTEM` 时区（即系统当前时区）。如果你是 **在 MySQL 启动之后才设置的服务器时区**，MySQL 不会自动同步。需要**重启 MySQL 服务**才会生效。

**补充：确认 MySQL 是否支持 named 时区**

如果你设置了 `Asia/Singapore` 但 MySQL 报错，说明没有加载时区表，用这个命令导入：

```bash
mysql_tzinfo_to_sql /usr/share/zoneinfo | mysql -u root -p mysql
```

### INFORMATION_SCHEMA 系统数据库

`INFORMATION_SCHEMA` 是 MySQL 提供的一个系统数据库，用来存放**元数据（metadata）**——也就是数据库本身的结构信息，而不是业务数据。

它是一个**只读的虚拟数据库**，里面的“表”其实是**视图**，查询时会实时从 MySQL 内部生成结果。

存放的是：

- 库、表、列的定义
- 索引信息
- 用户权限
- 存储过程、视图、触发器等对象信息
- 运行时统计信息（MySQL 5.7+ 部分转移到了 `performance_schema`）

#### 常见用途

```sql
-- 查看所有数据库
SELECT SCHEMA_NAME
FROM INFORMATION_SCHEMA.SCHEMATA;

-- 查看某个数据库的所有表
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'database_name';

-- 查看某个表的所有列
SELECT COLUMN_NAME, DATA_TYPE, COLUMN_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'database_name' AND TABLE_NAME = 'table_name';

-- 查看某个表的索引
SELECT TABLE_NAME, INDEX_NAME, COLUMN_NAME, NON_UNIQUE
FROM INFORMATION_SCHEMA.STATISTICS
WHERE TABLE_SCHEMA = 'database_name' AND TABLE_NAME = 'table_name';

--  查存储过程、函数
SELECT ROUTINE_NAME, ROUTINE_TYPE
FROM INFORMATION_SCHEMA.ROUTINES
WHERE ROUTINE_SCHEMA = 'database_name';
```

#### 用法案例

**找出所有占用空间最大的表**

```sql
SELECT TABLE_SCHEMA, TABLE_NAME,
       ROUND((DATA_LENGTH+INDEX_LENGTH)/1024/1024,2) AS MB
FROM INFORMATION_SCHEMA.TABLES
ORDER BY MB DESC
LIMIT 10;
```

### 实时查看 MySQL 连接状态

- `SHOW FULL PROCESSLIST;`: 会显示当前<u>所有连接的状态</u>

  `Command` 列显示执行类型，关键：Query、Sleep、Connect

  `Time` 列显示执行时间，单位是秒

- `SHOW PROCESSLIST;`: 会显示当前所有连接的状态，但不显示完整的 SQL 语句

- `SHOW ENGINE INNODB STATUS;`: 会显示 InnoDB 的状态信息

- `SHOW STATUS LIKE 'Threads%';`: 会显示当前线程的状态信息

- `SHOW VARIABLES LIKE 'max_connections';`: 会显示最大连接数

- `SHOW VARIABLES LIKE 'max_connections';`: 会显示最大连接数

- `SHOW VARIABLES LIKE 'max_allowed_packet';`: 会显示最大允许的包大小

### 导入导出高级操作

#### mysqldump 导出选项

`mysqldump` 是 MySQL 提供的一个命令行工具，用于导出数据库或表的结构和数据。

常用的导出选项包括：

- `-d` 或 `--no-data`: 只导出表结构，不导出数据

- `-t` 或 `--no-create-info`: 只导出数据，不导出表结构

- `--single-transaction`: 在导出大型数据库时，使用单个事务可以不锁表，快照一致（仅 InnoDB）

- `--quick`: 在导出大型数据库时，使用快速模式可以边取边写，降低内存占用

- ` --skip-lock-tables`: 避免 LOCK TABLES，导出时不会锁表

- `--ignore-table=database_name.table_name`: 忽略指定的表

#### 导出时压缩

使用 `mysqldump` 配合管道输出到 `gzip`，将导出的 SQL 文件进行压缩，以节省存储空间。

```bash
mysqldump -u root -p database_name | gzip > database_name.sql.gz
```

如果是导出备份，可以添加更多参数和文件名时间戳，就可以组合成一个完整的备份命令：

```bash
mysqldump --single-transaction --quick --skip-lock-tables \
  -u root -p database_name \
| gzip > /path/to/backup/db/database_name_$(date +%Y%m%d_%H%M%S).sql.gz
```

如果是**大型数据库**，还可以设置 CPU & 磁盘调度优先级，，减少对线上影响。

```bash
nice -n 15 ionice -c2 -n7 \
mysqldump --single-transaction --quick --skip-lock-tables \
  -u root -p database_name \
| pv -q -L 5m \
| gzip > /path/to/backup/db/database_name_$(date +%Y%m%d_%H%M%S).sql.gz
```

- `nice -n 15`: 设置 CPU 调度优先级，-20 到 19，-20 优先级最高，19 优先级最低，默认是 0

- `ionice -c2 -n7`: 设置磁盘调度优先级，`-c2` 表示选择**Best Effort 模式**，优先级为 0 到 7，0 优先级最高，7 优先级最低，默认是 0

- `pv -q -L 5m`: 设置限制管道吞吐率，`-q` 表示静默模式（没有这个参数可以看到传输进度），`-L 5m` 表示每分钟传输 5MB 数据

  `pv` 命令在部分系统中可能没有安装，可以先用 `pv --version` 检查是否安装

#### 压缩包导入数据

```bash
# 注意要有 < 符号
gunzip < database_name.sql.gz | mysql -u root -p database_name
# 或者用 zcat
zcat database_name.sql.gz | mysql -u root -p database_name
# 8.0+ 版本导入时如果报错，可以用 sed 替换字符集
gunzip < database_name.sql.gz \
| sed 's/utf8mb4_0900_ai_ci/utf8mb4_unicode_ci/g' \
| mysql -u root -p database_name
```

**注意**: `gunzip` 后面要加一个 `<` 符号，不然只是简单的解压

#### 高版本导出数据兼容低版本

8.0+ 版本的 MySQL 导出的 SQL 文件可能会包含一些低版本不支持的语法。

导出是我们可以添加一些参数来兼容低版本。

```bash
mysqldump -u root -p --databases database_name --default-character-set=utf8mb4  --skip-tz-utc --set-gtid-purged=OFF > database_name.sql
```

- `--default-character-set=utf8mb4`: 设置字符集为 `utf8mb4`，以支持更广泛的字符集

- `--skip-tz-utc`: 跳过时区设置，避免低版本不支持的时区语法

- `--set-gtid-purged=OFF`: 禁用 GTID 相关的语法，避免低版本不支持的 GTID 语法

- 在导出大型数据库时，使用 `--single-transaction` 可以确保导出过程中的一致性，避免锁表

- 在导出大型数据时，使用 `--quick` 可以提高导出效率，避免一次性加载所有数据到内存中

MySQL 5.7 及以下版本不支持 `utf8mb4_0900_ai_ci`，可以用 sed 快速处理：

```bash
sed -i 's/utf8mb4_0900_ai_ci/utf8mb4_general_ci/g' database_name.sql
```

### SQL 性能分析

有时候发现 SQL 执行很慢，或者感觉 MySQL 占用过高，可以参考以下方式进行分析

#### 慢查询日志（✅ 推荐）

**打开慢查询日志**

```sql
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;
```

**查看日志路径**

日志文件通常默认写在：`/var/lib/mysql/your-hostname-slow.log`，比如我的是 `/var/lib/mysql/izbpz-slow.log`

也可以通过以下命令查看日志路径：

```sql
SHOW VARIABLES LIKE 'slow_query_log_file';
```

**查看慢查询日志**

```bash
mysqldumpslow -s t -t 10 /path/to/slow-query.log
# 或更详细（Percona Toolkit 强大的日志分析工具）：
pt-query-digest /path/to/slow-query.log
```

#### 观察线程运行情况

高并发也会吃 CPU，`Threads_running` 如果经常 > 10，说明 CPU 很可能在处理高并发 SQL。

`Threads_connected` 很高时，可能程序没及时关闭连接，或者并发太大。

```sql
SHOW STATUS LIKE 'Threads_running';
SHOW STATUS LIKE 'Threads_connected';
```

#### 查看 MySQL 当前最耗 CPU 的 SQL

`performance_schema` 是 MySQL 提供的一个非常强大的监控和诊断功能，它可以记录 SQL 的执行时间、资源消耗、锁情况等，**默认在 MySQL 5.6+ 中通常是开启的**，但某些发行版可能默认关闭，需要你手动开启。

**检查是否已启用**

```sql
SHOW VARIABLES LIKE 'performance_schema';
```

**查询最耗时的 SQL 语句**

可以通过 `performance_schema.events_statements_summary_by_digest` 表来查看 SQL 的执行，找出最耗时的 SQL 语句。

```sql
SELECT
    DIGEST_TEXT,
    COUNT_STAR,
    SUM_TIMER_WAIT / 1000000000000 AS total_time_s,
    (SUM_TIMER_WAIT / COUNT_STAR) / 1000000000000 AS avg_time_s
FROM performance_schema.events_statements_summary_by_digest
ORDER BY SUM_TIMER_WAIT DESC
LIMIT 10;
```

**每个用户执行的 SQL 总耗时**

```sql
SELECT user, SUM_TIMER_WAIT / 1000000000000 AS total_time_s
FROM performance_schema.events_statements_summary_by_user_by_event_name
ORDER BY total_time_s DESC;
```

**查看当前所有监控表**

```sql
SHOW TABLES FROM performance_schema;
```

**定期清理监控表**

`performance_schema.events_statements_summary_by_digest` 表本身不会记录每条语句的具体执行时间戳，

它是一个累计统计表，记录的是“某类 SQL 自数据库启动以来执行的次数和耗时总和”，而不是每次执行的具体信息。

所以如果你想要查看某个时间段内的 SQL 执行情况，可以定期清理这个表。

```sql
TRUNCATE TABLE performance_schema.events_statements_summary_by_digest;
-- 等你执行一段时间后再查询统计值
```

**手动启动 performance_schema**

因为 `performance_schema` 是一个启动参数，必须在启动 MySQL 时就启用。需要修改配置文件，然后重启 MySQL。

通常是 `/etc/my.cnf` 或 `/etc/mysql/my.cnf`，找到 `[mysqld]` 段落，加入：

```ini
[mysqld]
performance_schema=ON
```

#### 错误日志（Error Log）

虽然不是查询日志，但常用于排查查询失败、权限拒绝、连接超时等问题。

查看位置：

```sql
SHOW VARIABLES LIKE 'log_error';
```

### EXPLAIN 查询分析

使用了 `EXPLAIN` 关键字，则查询将返回有关数据库引擎执行查询的信息，而不会返回实际结果。

`EXPLAIN` 语句告诉数据库引擎它将如何执行查询，包括哪些索引将被使用，以及执行查询的步骤。

```sql
EXPLAIN
SELECT * FROM table_name WHERE column_name = 'value';
```

结果从左到右分别会出现以下字段：

- `id`: 查询的序列号

- `select_type`: 查询的类型

  `SIMPLE` 表示简单查询，没有子查询或联合查询。

  `PRIMARY` 表示主查询。

  `UNION` 表示联合查询。

  `SUBQUERY` 表示子查询。

- `table`: 被查询的表名

- `partitions`: 分区信息，NULL 表示没有分区

- `type`: <u>访问表的方式</u>

  `ALL`: 全表扫描，性能差

  `index`: 索引扫描，扫描整个索引（无 WHERE 过滤），效率较低

  `range`: 范围扫描，，如 `BETWEEN`、`IN`，效率较高

  `ref`: 使用非唯一索引查找，效率较高

  `eq_ref`: 使用唯一索引查找，效率最高

  `const`: 常量查找，效率最高

- `possible_keys`: 可能使用的索引

  表示优化器考虑过哪些索引。

- `key`: 实际使用的索引

- `key_len`: 使用的索引的长度

  长度越接近字段实际大小越好

- `ref`: 索引与什么字段比较

- `rows`: 预估扫描的行数

  越少越好（一般小于 1000 才算快）

- `filtered`: 表示查询的过滤条件的估计百分比

  这个表示查询结果中有多少行会被过滤掉，通常是一个百分比，`100` 表示没有过滤。

- `Extra`: <u>关键补充信息</u>

  `Using index`: 表示查询使用了索引

  `Using index condition`: 表示查询使用了索引条件

### 一次主查询记录总数

使用了 `FOUND_ROW()` 函数，配合 `SQL_CALC_FOUND_ROWS` 一起使用。

```sql
-- 告诉MySQL将sql处理的数量记下来
SELECT SQL_CALC_FOUND_ROWS * FROM table_name LIMIT 0,10;

-- 取到这个记录
SELECT FOUND_ROW() AS total
```

- 这个只有当 `WHERE` 限制条件多时才会有意义，因为 `FOUND_ROW()` 只会返回主查询的记录总数。

- 有覆盖索引时这个性能会更好，如果没有索引，使用 `count(*)` 会更好。

### 限制 ip 访问数据库

```sql
-- 指定 ip 访问
GRANT ALL PRIVILEGES ON *.* TO 'root'@'192.168.1.1' IDENTIFIED BY 'password' WITH GRANT OPTION;
-- 设置全部 ip 访问
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;
```

这些记录都被保存在 `mysql.user` 表中。这意味着你也可以通过 `UPDATE` 等命令来修改这些记录。

```sql
use mysql;
select host, user from user;
-- 更新用户的可访问 host
update user set host='%' where user='root';
```

最后记得使用 `FLUSH PRIVILEGES;` 刷新权限，使其生效。

## 常见错误

### 1055 错误 only_full_group_by

`1055 - Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'database.table.column' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by`

这个错误是因为 MySQL 的 `ONLY_FULL_GROUP_BY` 模式导致的。这个模式要求 `SELECT` 语句中的每个列都必须在 `GROUP BY` 子句中，或者必须被聚合函数包裹。

比如：

```sql
SELECT id, name, update_time
FROM table_name
GROUP BY id;
```

在 `ONLY_FULL_GROUP_BY` 下，MySQL 会说，你分组的是 `id`，但你查询的 `name` 和 `update_time` 并没有在 `GROUP BY` 子句中，也没有被聚合函数包裹，所以结果是不确定的，必须拒绝执行。

**解决方法 A：改 SQL 语句**（推荐，最规范）

修改 `SELECT` 语句，将所有列都放到 `GROUP BY` 子句中：

```sql
SELECT id, name, update_time
FROM table_name
GROUP BY id, name, update_time;
```

使用聚合函数包裹所有列：

```sql
SELECT id, MAX(update_time) AS update_time
FROM table_name
GROUP BY id;
```

**方法 B：关闭 `ONLY_FULL_GROUP_BY`**（会放松规则）

临时修改全局设置：

```sql
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
```

永久修改：

修改 MySQL 配置文件，找到 `[mysqld]` 段落，加入：

```ini
[mysqld]
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION
```

**注意**：`ONLY_FULL_GROUP_BY` 是 MySQL 5.7.5 之后默认开启的，如果你使用的是 MySQL 5.7.5 之前的版本，那么这个错误就不会出现。

### 1819 错误 policy requirements

`ERROR 1819 (HY000): Your password does not satisfy the current policy requirements`

这是 MySQL 的**密码校验组件**检测到密码强度不够而触发的拦截（报错 1819）。

可以先查看下当前规则，使用命令：`SHOW VARIABLES LIKE 'validate_password%';`

主要有以下几个参数：

- `validate_password.policy`: 指定密码的强度策略，默认是 `MEDIUM`

- `alidate_password.check_user_name`: 检查密码中是否包含用户名，默认是 `ON`

- `validate_password.length`: 密码的最小长度，默认是 `8`

- `validate_password.mixed_case_count`: 密码中至少要包含的小写字母和大写字母的数量，默认是 `1`

- `validate_password.number_count`: 密码中至少要包含的数字的数量，默认是 `1`

- `validate_password.special_char_count`: 密码中至少要包含的特殊字符的数量，默认是 `1`

按照自己的需求修改这些参数，然后重新设置密码即可，修改可以使用命令：

```sql
-- 长度放宽到 4
SET GLOBAL validate_password.length = 4;
-- SET PERSIST 是确保修改的参数在重启后依然有效
SET PERSIST validate_password.length = 4;
```

## PostgreSQL

> 官网: https://www.postgresql.org/

相较于 MySQL，PostgreSQL 更加符合 SQL 标准，功能也更强大一些。

## SQLite

### 字段类型

SQLite 的字段类型是动态类型的，字段类型并不严格。

而 SQLite 内部会将字段类型转换为以下几种类型：

- `INTEGER`: 整数类型

- `NUMERIC`: 数值类型

- `REAL`: 浮点数类型

- `TEXT`: 字符串类型

- `BLOB`: 二进制数据类型

其它的类型虽然支持，但 SQLite 采用 **类型亲和性** 的方式来处理这些类型，如 `VARCHAR`、`CHAR`、`DATE`、`DATETIME` 等会被转换为 `TEXT` 类型。

### SQLite 命令行

#### 安装

要使用 SQLite 命令行工具，需要先在服务器上安装 SQLite，ubuntu 和 debian 系统可以使用以下命令安装：

```bash
sudo apt-get install sqlite3
```

#### 基础使用

```bash
# 进入
sqlite3 database_name.db
# 查看所有表
.tables
# 查看表结构
.schema table_name
# 格式化输出
.mode column
.headers on
# 执行 sql 文件
.read file_name.sql
# 退出
.exit
```

### 连表查询

要注意，SQLite 是不支持全连接，但是可以通过左连接和右连接来实现。

```sql
SELECT * FROM table1
LEFT JOIN table2 ON table1.id = table2.id;
```

### 日期时间函数

- `date('now')`: 返回当前日期

- `time('now')`: 返回当前时间

- `datetime('now')`: 返回当前日期和时间

  `datetime(<timestamp>, 'unixepoch')` 从 Unix 时间戳转换为日期时间（`<timestamp>` 是 Unix 时间戳）

  `datetime(<timestamp> / 1000, 'unixepoch')` 从毫秒级 Unix 时间戳转换为日期时间

  `unixepoch` 是 SQLite 中将秒级时间戳转换为标准日期时间的格式

- `strftime('%Y-%m-%d %H:%M:%S', 'now')`: 返回当前日期和时间

  `strftime('%Y-%m-%d', 'now', '-1 day')` 返回昨天的日期

### 查询分析

使用 `EXPLAIN QUERY PLAN` 来分析查询计划。

```sql
EXPLAIN QUERY PLAN
SELECT * FROM table_name WHERE column_name = 'value';
```

## phpmyadmin

由于公司同事习惯用这个工具了，所以在部署服务器时，就难免还要安装一个:(

在这里顺便记录下一些经验。

- 最好的安装方式就是下载压缩包，直接当成一个 php 项目放入项目目录，并手动配置 nginx 等（完全可控）

- **以下是当你用 apt 安装时的默认配置**

  _遇到依赖问题会很烦，而且它会默认给你安装一堆依赖，并不推荐_

  - 默认路径：`/usr/share/phpmyadmin`

  - 默认配置文件：`/etc/dbconfig-common/phpmyadmin.conf`
