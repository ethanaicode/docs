# Sql

## 常用命令

- show databases;
- use [database] 选择用哪个数据库
- show tables
- desc [tableName]
- status 查看版本等信息

### 批量更新数据

可以加上 where 条件来更新部分数据。

```sql
UPDATE time_tracker
SET user_id = 51

WHERE user_id = 119
```

### 批量插入数据

```sql
INSERT INTO rental.`rentalproperties` (`id`, `propertieName`, `propertyDescription`, `type`, `checkBoxStr`, `deletestatus`, `is_alert`)
VALUES
(29, 'Business-Paket', 'DB3', 1, '', 'NOT_DELETED', 0),
(30, 'Park-Paket mit 360°-Kamera', 'P47', 1, '', 'NOT_DELETED', 0);
```

## 数据类型

### DECIMAL(long,decimal) - 带精度的十进制数字

例如：DECIMAL(10,2)

The `DECIMAL` type allows you to specify the total number of digits (precision) and the number of digits after the decimal point (scale).

In the above example, `10` represents the total number of digits, and `2` represents the number of digits after the decimal point.

### ENUM(...value) - 预设单选值

例如：ENUM('Active', 'Inactive', 'Pending')

It allows you to specify a list of acceptable values for the field, and each field can only hold one of those specified values.

### TIMESTAMP - 时间类型

可以选择给默认值为 `CURRENT_TIMESTAMP`，来实现默认填充当前时间的操作。

例如：

```sql
ALTER TABLE users
ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
```

## 基础操作

### DELETE 删除行

要记得放 where 条件，不然就是清空数据库表了。

```sql
DELETE FROM customer
WHERE id_customer NOT IN (2,3,4,5,6,8,9,11,44,138,179,275,459,464);
```

### ALTER 新增字段

```sql
ALTER TABLE tm_tt.customer
ADD delete_status tinyint(1) DEFAULT 0 NOT NULL COMMENT '0 not deleted, 1 deleted';

-- or other

ALTER TABLE customer
ADD `deletestatus` enum('NOT_DELETED','USER_DELETED','TRASH_DELETED','DELETED') DEFAULT 'NOT_DELETED';

-- AUTO_INCREMENT=1

ALTER TABLE rental_db.logs
AUTO_INCREMENT=1;
```

### CONCAT 拼接字符

拼接多个字符串：

```sql
SELECT CONCAT("SQL ", "Tutorial ", "is ", "fun!") AS ConcatenatedString;
```

**CONCAT_WS: **拼接多个表达式，并以符号分割他们：

```sql
SELECT CONCAT_WS("-", "SQL", "Tutorial", "is", "fun!") AS ConcatenatedString;
```

### GROUP_CONCAT 数据分组处理

```sql
-- 查出所有customer_id并去重
SELECT GROUP_CONCAT(DISTINCT customer_id SEPARATOR ',') AS customer_ids
FROM task;
```

### FIND_IN_SET() 查找字符串位置

返回一个字符串的位置，从一个字符串列表里面：

```sql
SELECT FIND_IN_SET("q", "s,q,l");
```

## 高级操作

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

使用了 FOUND_ROW() 函数，配合 SQL_CALC_FOUND_ROWS 一起使用。

```sql
-- 告诉MySQL将sql处理的数量记下来

SELECT SQL_CALC_FOUND_ROWS * FROM table_name LIMIT 0,10;

-- 取到这个记录

SELECT FOUND_ROW() AS total
```

这个只有当 where 限制条件多时才会快点。

有覆盖索引时这个性能高，有覆盖索引时使用 COUNT() 性能高。

### 特殊查询

```sql
-- Mysql Vesion
SELECT VERSION();
```

## 常用案例

### 日期区间查询

开始和结束时间包含在某区间，比如包含当日（2023 年 4 月 18 日）：

```sql
AND BeginDateTime <= '2023-04-18 23:59:59' AND EndDateTime>= '2023-04-18 00:00:00'
```

### 查询相关内容出现的次数 COUNT

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
-- 控制不同的排序

ORDER BY
CASE
  WHEN type = 'project' THEN CONCAT(project_id, 'a')
  ELSE CONCAT(project_id, 'b', order_id)
END
ASC

-- 选择匹配值

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
