---
title: MySQL 数据库学习指南，SQL 基础语法、常用函数、高级操作
---

# SQL

以 MySQL 为例，介绍 SQL 基础语法、常用函数、高级操作等内容。

## SQL 介绍

SQL（Structured Query Language）是一种用于管理关系数据库系统的标准化语言。

### 相关文件及目录

#### 配置文件

位置通常在 `/etc/my.cnf` 或 `/etc/mysql/my.cnf`。

配置文件中包含了 MySQL 的配置信息，如端口、数据目录、日志文件等。

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

## 数据类型

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

- `UPDATE`: 更新数据库中的数据

- `DELETE`: 从数据库中删除数据，没有 `WHERE` 会删除所有数据

- `INSERT INTO`: 向数据库中插入新数据

### 库及表操作

- `SHOW DATABASES`: 查看所有数据库

- `CREATE DATABASE <databaseName>`: 创建数据库

- `ALTER DATABASE <databaseName>`: 修改数据库

- `USE <database>`: 选择用哪个数据库

- `DROP DATABASE <databaseName>`: 删除数据库

- `SHOW TABLES`: 查看所有表

- `CREATE TABLE <tableName> (<column1> <data_type>, <column2> <data_type>, ...);`: 创建表

- `RENAME TABLE <oldTableName> TO <newTableName>`: 重命名表

- `DESC <tableName>`: 查看表结构

- `ALTER TABLE <tableName> ADD <column> <data_type>;`: 修改表，添加字段

- `DROP TABLE <tableName>`: 删除表

- `CREATE INDEX <indexName> ON <tableName> (<columnName>);`: 创建索引

- `DROP INDEX <indexName> ON <tableName>;`: 删除索引

- `TRUNCATE TABLE <tableName>`: 清空表

### 导入导出

- `mysqldump -u root -p <databaseName> > <fileName.sql>`: 导出数据库

- `mysql -u root -p <databaseName> < <fileName.sql>`: 导入数据库

### 用户及权限管理

- `CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';`: 创建用户

  `username` 新用户的用户名

  `localhost` 新用户的主机名

  `password` 新用户的密码

- `GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' WITH GRANT OPTION;`: 授权

  `ALL PRIVILEGES` 用户被授予所有权限

  `*.*` 数据库名.表名

  `WITH GRANT OPTION` 允许用户将自己的权限授予其他用户

- `REVOKE ALL PRIVILEGES ON *.* FROM 'username'@'localhost';`: 撤销权限

- `FLUSH PRIVILEGES;`: <u>刷新权限</u>

- `SHOW GRANTS FOR 'username'@'localhost';`: 查看用户权限

- `SELECT user, host FROM mysql.user;`: 查看所有用户

- `ALTER USER 'username'@'localhost' IDENTIFIED BY 'new password';`: 修改密码

  或者 `SET PASSWORD FOR 'username'@'localhost' = PASSWORD('newpassword');` (部分身份验证插件不支持)

- `DROP USER 'username'@'localhost';`: 删除用户

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

- `FIND_IN_SET(<string>, <string>)`: 查找字符串在另一个字符串中的位置

  示例: `SELECT FIND_IN_SET('b', 'a,b,c,d');` 返回 `2`

### 特殊函数

- `PASSWORD(<string>)`: 返回字符串的加密密码

- `VERSION()`: 返回 MySQL 版本

- `USER()`: 返回当前用户

- `DATABASE()`: 返回当前数据库

> [!TIP] 注意事项
>
> - 特殊函数是 MySQL 特有的函数，不是标准 SQL 函数。
>
> - 使用时需要注意，不同的数据库可能不支持。
>
> - 函数不可以在命令行中直接使用，需要在 SQL 语句中使用（配合 SELECT 等）。

## 使用案例

### 基础语法

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

#### ALTER TABLE 修改表

```sql
-- 添加字段
ALTER TABLE tablename
ADD column1 datatype;

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

### EXPLAIN 查询分析

使用了 `EXPLAIN` 关键字，则查询将返回有关数据库引擎执行查询的信息，而不会返回实际结果。

`EXPLAIN` 语句告诉数据库引擎它将如何执行查询，包括哪些索引将被使用，以及执行查询的步骤。

```sql
EXPLAIN
SELECT * FROM table_name WHERE column_name = 'value';
```

结果从左到右分别会出现以下字段：

- `id`: 查询的序列号

- `select_type`: 查询的类型。

- `table`: 正在访问的表。

- `partitions`: 分区信息，NULL 表示没有分区。

- `type`: 访问表的方式，这里是范围扫描（range），表示在索引上执行了范围查找。

- `possible_keys`: 可能使用的索引，比如有一个索引 `idx_request_timestamp`。

- `key`: 实际使用的索引。

- `key_len`: 使用的索引的长度。

- `ref`: 表示索引的参考。

- `rows`: 预估扫描的行数。

- `filtered`: 表示查询的过滤条件的估计百分比，这里是 100%。

- `Extra`: 额外的信息，这里是使用了索引条件`Using index condition`。

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

## SQLite

### 连表查询

要注意，SQLite 是不支持全连接，但是可以通过左连接和右连接来实现。

```sql
SELECT * FROM table1
LEFT JOIN table2 ON table1.id = table2.id;
```
