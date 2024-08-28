# MySQL

> 本篇额外包含 sqlite 的使用，sqlite 是一个轻量级的数据库，和 mysql 的使用方法类似，所以也就放到一起了。

## 数据类型

### DECIMAL(long,decimal) - 带精度的十进制数字

> DECIMAL(long, decimal)

`DECIMAL` 数据类型用于存储精确的十进制数字。`long` 参数表示数字的最大总位数，而 `decimal` 参数表示小数点后的位数。

例如：DECIMAL(10,2)

在 `DECIMAL(10,2)` 中，`10` 表示总位数，`2` 表示小数点后的位数。这意味着，`DECIMAL(10,2)` 可以存储最大 `10` 位数字，其中 `2` 位是小数位。

### ENUM(...value) - 预设单选值

> ENUM('value1', 'value2', ...)

`ENUM` 数据类型用于存储预定义的值。在 `ENUM` 数据类型中，您可以指定一个值列表，然后列中的值必须是该列表中的一个。

例如：ENUM('Active', 'Inactive', 'Pending')

### TIMESTAMP - 时间类型

可以选择给默认值为 `CURRENT_TIMESTAMP`，来实现默认填充当前时间的操作。

例如：

```sql
ALTER TABLE users
ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
```

## 基础操作

### ORDER BY 排序

```sql
SELECT * FROM table_name ORDER BY column_name ASC|DESC;
```

### DELETE 删除行

要记得放 where 条件，不然就是清空数据库表了。

```sql
DELETE FROM customer
WHERE id_customer NOT IN (2,3,4,5,6,8,9,11,44,138,179,275,459,464);
```

### INSERT 插入行

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

### UPDATE 更新行

```sql
UPDATE customer
SET customer_name = 'New Name'
WHERE customer_id = 1;
```

### ALTER TABLE 修改表

```sql
-- 添加字段
ALTER TABLE tm_tt.customer
ADD delete_status tinyint(1) DEFAULT 0 NOT NULL COMMENT '0 not deleted, 1 deleted';

-- 修改字段

ALTER TABLE rental_db.logs
AUTO_INCREMENT = 1;
```

### CONCAT 拼接字符

拼接多个字符串：

```sql
SELECT CONCAT("SQL ", "Tutorial ", "is ", "fun!") AS ConcatenatedString;
```

**CONCAT_WS**拼接多个表达式，并以符号分割他们：

```sql
SELECT CONCAT_WS("-", "SQL", "Tutorial", "is", "fun!") AS ConcatenatedString;
```

### GROUP_CONCAT 聚合函数

```sql
-- 查出所有 customer_id 并去重
SELECT GROUP_CONCAT(DISTINCT customer_id SEPARATOR ',') AS customer_ids
FROM task;
```

### DISTINCT 去重

```sql
SELECT DISTINCT column1, column2, ...
FROM table_name;
-- 统计数量
SELECT COUNT(DISTINCT column_name)
FROM table_name;
```

## SQL 中的函数

### 常用函数

- **COUNT()**: 返回匹配条件的行数

- **SUM()**: 返回匹配条件的总和

- **AVG()**: 返回匹配条件的平均值

- **MIN()**: 返回匹配条件的最小值

### 字符串函数

- **CONCAT()**: 连接两个或多个字符串

- **LENGTH()**: 返回字符串的长度

- **LOWER()**: 将字符串转换为小写

- **UPPER()**: 将字符串转换为大写

- **LEFT()**: 返回字符串左边的字符

- **RIGHT()**: 返回字符串右边的字符

- **SUBSTRING()**: 返回字符串的一部分

- **REPLACE()**: 替换字符串中的子串

- **FIND_IN_SET()**: 返回一个字符串的位置，从一个字符串列表里面

  ```sql
  SELECT FIND_IN_SET('b','a,b,c,d');
  ```

### 特殊函数

> 特殊函数是 MySQL 特有的函数，不是标准 SQL 函数。
>
> 使用时需要注意，不同的数据库可能不支持。
>
> 函数不可以在命令行中直接使用，需要在 SQL 语句中使用（配合 SELECT 等）。

- **PASSWORD()**: 用于加密字符串（常用于密码）

- **VERSION()**: 返回 MySQL 版本

- **USER()**: 返回当前用户

- **DATABASE()**: 返回当前数据库

## 命令行操作

> 如果是新安装的数据库，请先使用 `mysql_secure_installation` 命令来初始化，设置密码等。

### 基础操作

> 命令都是要以`;`结尾的。

- **mysql -u root -p**: 登录数据库

- **SHOW DATABASES**: 查看所有数据库

- **SHOW TABLES**: 查看所有表

- **USE [database]**: 选择用哪个数据库

- **DESC [tableName]**: 查看表结构

- **CREATE DATABASE [databaseName]**: 创建数据库

- **DROP DATABASE [databaseName]**: 删除数据库

- **CREATE TABLE [tableName] (id int, name varchar(20))**: 创建表

- **DROP TABLE [tableName]**: 删除表

- **STATUS**: 查看版本等信息

- **SHOW WARNINGS**: 显示警告信息

### 导入导出

**导出数据库**

```bash
mysqldump -u root -p database_name > database_name.sql
```

**导入数据库**

```bash
mysql -u root -p database_name < database_name.sql
```

### 用户及权限管理

**创建用户**

```sql
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
```

- `username`：新用户的用户名

- `localhost`：新用户的主机名

- `password`：新用户的密码

**授权**

```sql
GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' WITH GRANT OPTION;
```

- `ALL PRIVILEGES`：用户被授予所有权限

- `*.*`：数据库名.表名

- `WITH GRANT OPTION`：允许用户将自己的权限授予其他用户

**撤销权限**

```sql
REVOKE ALL PRIVILEGES ON *.* FROM 'username'@'localhost';
```

**删除用户**

```
DROP USER 'username'@'localhost';
```

**修改用户密码**

```sql
SET PASSWORD FOR 'username'@'localhost' = PASSWORD('newpassword');
-- 或者（部分身份验证插件不支持上一种方式）
ALTER USER 'username'@'localhost' IDENTIFIED BY 'newpassword';
```

**刷新权限**

对用户的更改不会立即生效，需要刷新权限：

```sql
FLUSH PRIVILEGES;
```

## 常用案例

### 区间日期查询

开始和结束时间包含在某区间，比如包含当日（2023 年 4 月 18 日）：

```sql
AND BeginDateTime <= '2023-04-18 23:59:59' AND EndDateTime >= '2023-04-18 00:00:00'
```

### 使用 COUNT 统计次数

查出一个表内容，并查处相关表中这个内容出现的次数。

```sql
SELECT rp.*, COUNT(rps.rentalpropertiesId) AS total
FROM rentalproperties AS rp
LEFT JOIN rentalpropertiesselection AS rps ON rp.id = rps.rentalpropertiesId
GROUP BY rp.id
```

### 利用 CASE 进行自定义排序

> CASE 语句类似于 if-else 结构，但需要注意的是，它按顺序评估每个条件，并返回第一个为真的条件的结果（如果没有条件为真，则返回默认值）。

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
SELECT COUNTRY ，
SUM(CASE WHEN GENDER ='1' THEN SALARY ELSE 0 END) AS COUNTG ，
SUM(CASE WHEN GENDER ='2' THEN SALARY ELSE 0 END) AS COUNTB
FROM EMPLOYEES
GROUP BY COUNTRY
```

## 高级操作

### EXPLAIN 查询分析

使用了 `EXPLAIN` 关键字，则查询将返回有关数据库引擎执行查询的信息，而不会返回实际结果。`EXPLAIN` 语句告诉数据库引擎它将如何执行查询，包括哪些索引将被使用，以及执行查询的步骤。

```sql
EXPLAIN
SELECT COUNT(DISTINCT requester_ip)
FROM zai_ma.api_requests_logs
WHERE request_timestamp >= '2024-05-14 00:00:00'
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

### 查询所有的表名并输出为 array()

```php
public function getTableList()
{
    $sql = 'SHOW TABLES';
    $result = DB::link()->query($sql); // FEACHALL
    $result = array_column($result, 'Tables_in_' . DB_NAME);
    return $result;
}
```

### 一次主查询记录总数

使用了`FOUND_ROW()` 函数，配合``SQL_CALC_FOUND_ROWS` 一起使用。

```sql
-- 告诉MySQL将sql处理的数量记下来
SELECT SQL_CALC_FOUND_ROWS * FROM table_name LIMIT 0,10;

-- 取到这个记录
SELECT FOUND_ROW() AS total
```

这个只有当 WHERE 限制条件多时才会有意义。

有覆盖索引时这个性能会更好，如果没有索引，使用 count(\*)会更好。

### 指定 ip 或者全部 ip 访问

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

最后记得刷新权限，使其生效：

```sql
FLUSH PRIVILEGES;
```

## SQLite

### 连表查询

要注意，SQLite 是不支持全连接，但是可以通过左连接和右连接来实现。

```sql
SELECT * FROM table1
LEFT JOIN table2 ON table1.id = table2.id;
```
