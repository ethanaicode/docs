# PHP 后台管理框架 - ThinkAdmin/FastAdmin/EasyAdmin

## ThinkAdmin

> 官方首页：[https://thinkadmin.top/](https://thinkadmin.top/)

**ThinkAdmin** 是一个基于 **ThinkPHP 6 & 8** 开发的强大后台管理框架，专为简化后台管理流程而设计。后台用户界面基于 LayUI 和 RequireJS 构建。

### 安装使用

安装框架前，请确保您的服务器已经安装了 **PHP 8.1+**(虽然官方说还支持 PHP7，但由于 composer 的安全机制，已经不支持了) 和 **Composer**。

#### 通过 Composer 安装

推荐方式，默认只安装 **admin** 模块

**注意**: 默认使用 Sqlite 数据库，若使用其他数据库请<u>修改配置后再执行初始化数据库</u>操作。

```bash
### 创建项目（ 需要在英文目录下面执行 ）
composer create-project zoujingli/thinkadmin

### 进入项目根目录
cd thinkadmin

### 数据库初始化并安装
php think migrate:run
```

#### 新版本 PHP 兼容性解决

实测使用 PHP8.5 安装该框架后，会出现兼容性报错：

- `Case statements followed by a semicolon (;) are deprecated, use a colon (:) instead`

   修改文件 `vendor/zoujingli/think-library/src/Plugin.php`，包含 `case 'getapppackage';` 的行，`;` 改为 `:`

- `Function imagedestroy() is deprecated since 8.5, as it has no effect since PHP 8.0`

   修改文件 `vendor/zoujingli/think-library/src/extend/ImageVerify.php` 和 `vendor/zoujingli/think-library/src/service/CaptchaService.php` 

   去掉 `imagedestroy($img)` 代码行

### 经验技巧

- 创建新的菜单后，需要创建对应的控制器和视图文件

### 开发文档

#### 权限配置

创建权限后，需要为权限配置可访问的功能节点。例如，若权限`A`仅允许访问特定的功能节点，您需要在配置中勾选这些节点。

**配置应用名称**

在配置授权时，若需展示应用名称，请前往 `config/app.php` 文件设置 `app_names` 的应用名称。

**配置示例**：

```php
// config/app.php
return [
    // 应用名称配置（用于权限管理界面显示）
    'app_names' => [
        'admin' => '系统管理',
        'wechat' => '微信管理',
        'plugin-account' => '账号管理'
    ],
];
```

**注意事项**：

- 这些名称在显示前会经过 `lang()` 函数进行语言转换处理
- 确保在不同语言环境下均能正确显示
- 如果应用名称未配置，将显示应用代码（如 `admin`）

**忽略权限检查**

若您不希望某个应用受到后台权限控制，可以通过配置 `rbac_ignore` 选项来实现。

**配置示例**：

```php
// config/app.php
return [
    // 忽略 RBAC 权限检查，可以配置多个应用
    'rbac_ignore' => ['index', 'wap', 'api'],
];
```

**使用场景**：

- **前台应用**：`index` 应用通常不需要权限控制
- **移动端应用**：`wap` 应用可能需要不同的权限机制
- **API 应用**：`api` 应用可能使用 Token 验证

**注意事项**：

- 被忽略的应用不会进行权限检查
- 所有用户都可以访问被忽略的应用
- 建议只忽略确实不需要权限控制的应用

### 数据助手

#### 表单助手

> → [相关文档](https://thinkadmin.top/system/helper-form.html)

**FormHelper** 是 ThinkAdmin 提供的快捷表单助手，能够根据提交的表单数据自动处理保存与更新操作，大幅提升开发效率。

**功能5：回调处理**

支持前置和后置回调，灵活处理业务逻辑：

```php
// 前置回调：数据保存前处理
protected function _form_filter(array &$data)
{
    // 验证和处理数据
}

// 后置回调：数据保存后处理
protected function _form_result(bool $result, array $data)
{
    // 处理保存结果
}
```

## Phinx-Migrations

> 官方首页：[https://phinx.org/](https://phinx.org/)

**Phinx** 是一个强大的数据库迁移工具，允许开发者以编程方式管理数据库结构的变更。它支持多种数据库系统，包括 MySQL、PostgreSQL、SQLite 和 SQL Server。

目前主流的 PHP 框架（如 Laravel、CakePHP、ThinkPHP 等）都集成了类似的迁移工具，Phinx 提供了一个独立且灵活的解决方案，适用于各种项目。

### 使用

#### 基础使用

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

#### 自己定义迁移

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

## FastAdmin

> 官方首页：[https://www.fastadmin.net/](https://www.fastadmin.net/)
>
> 开源地址：[GitHub](https://github.com/karsonzhang/fastadmin) | [Gitee](https://gitee.com/fastadminnet/fastadmin)
>
> 最新版下载：[FastAdmin 开源框架完整包](https://www.fastadmin.net/download/full.html?ref=docs)