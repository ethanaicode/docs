
# Phinx Migrations

> 官方首页：[https://phinx.org/](https://phinx.org/)

**Phinx** 是一个强大的数据库迁移工具，允许开发者以编程方式管理数据库结构的变更。它支持多种数据库系统，包括 MySQL、PostgreSQL、SQLite 和 SQL Server。

目前主流的 PHP 框架（如 Laravel、CakePHP、ThinkPHP 等）都集成了类似的迁移工具，Phinx 提供了一个独立且灵活的解决方案，适用于各种项目。

## 使用

### 基础使用

在包含 Migrations 的项目中，您可以使用以下命令来管理数据库迁移：

- **创建迁移文件**：

  ```bash
  php vendor/bin/phinx create CreateUsersTable
  # ThinkPHP
  php think make:migration CreateUsersTable
  ```

- **运行迁移**：

  ```bash
  php vendor/bin/phinx migrate
  # ThinkPHP
  php think migrate:run
  ```

### 自己定义迁移

- 迁移的文件位于 `database/migrations` 目录下

- 每个迁移文件包含一个类，类名与文件名对应，继承自 `AbstractMigration` 类

- 文件名格式为 `YYYYMMDDHHMMSS_create_users_table.php`，其中 `YYYYMMDDHHMMSS` 是时间戳，确保迁移的顺序，`create_users_table` 是描述迁移内容的名称，需要和类名对应

  **文件名需要严格遵循该格式，否则 Phinx 无法识别**

- 迁移类中包含两个主要方法：

  - `up()`: 定义应用迁移时的操作，如创建表、添加列等

  - `down()`: 定义回滚迁移时的操作，如删除表、移除列等

- 简单点的话，可以只实现 `change()` 方法，Phinx 会自动推断出 `up()` 和 `down()` 的操作

- 迁移类示例：

  ```php
  use Phinx\Migration\AbstractMigration;
  
  class CreateUsersTable extends AbstractMigration
  {
      public function change()
      {
          $this->_createUsersTable();
      }
  
      protected function _createUsersTable()
          // 创建 users 表
          $table = $this->table('users', [
                'engine' => 'InnoDB', // 数据库引擎
                'collation' => 'utf8mb4_general_ci', // 字符集
                'comment' => '用户表' // 表注释
          ]);
          $table->addColumn('name', 'string', ['limit' => 100])
                ->addColumn('email', 'string', ['limit' => 100])
                ->addColumn('created_at', 'datetime')
                ->addColumn('updated_at', 'datetime')
                ->create();
      }
  }
  ```