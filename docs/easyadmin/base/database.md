## 表名规范

> 好的表命名规范会让你开发起来更加心情开朗，下面是一些建议：

### 命名规则 `前缀 + 模块名 + 表标识`

- 例如 `系统` 模块：

  - ea_system_admin
  - ea_system_config

- 例如 `博客` 模块：

  - ea_blog_user
  - ea_blog_config

## 字段规范

- 字段名使用`下划线风格`
- 字段一定要清晰, 尽量`避免使用缩写`命名
- `create_time`、`update_time`、`delete_time`三个字段以 int 类型保存时间信息
