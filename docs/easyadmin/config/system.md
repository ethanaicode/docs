## 系统配置

### env 配置说明

> 后台模块配置说明`EASYADMIN`

| 参数              | 说明                 | 类型   | 默认             |
| :---------------- | :------------------- | :----- | :--------------- |
| ADMIN             | 后台路径             | string | admin            |
| CAPTCHA           | 后台验证码开关       | bool   | true             |
| IS_DEMO           | 是否为演示环境       | bool   | false            |
| STATIC_PATH       | 静态资源路径         | bool   | /static          |
| OSS_STATIC_PREFIX | OSS 静态文件路径前缀 | bool   | static_easyadmin |

> 配置示例

```bash
APP_DEBUG = true

   [APP]
   DEFAULT_TIMEZONE = Asia/Shanghai

   [DATABASE]
   TYPE = mysql
   HOSTNAME = host.docker.internal
   DATABASE = easyadmin
   USERNAME = root
   PASSWORD = root
   HOSTPORT = 3306
   CHARSET = utf8
   DEBUG = true
   PREFIX = ea_

   [LANG]
   default_lang = zh-cn

   [EASYADMIN]
   ADMIN = admintest
   CAPTCHA = false
   CDN =
   EXAMPLE = true
   OSS_STATIC_PREFIX = static_easyadmin
```

## 超管配置

> 超管不受权限控制，默认获取所有权限

### 超管账号配置

配置文件位置：`app/common/constants/AdminConstant.php`

```php
<?php

namespace app\common\constants;

/**
 * 管理员常量
 * Class AdminConstant
 * @package app\common\constants
 */
class AdminConstant
{

    /**
     * 超级管理员，不受权限控制
     */
    const SUPER_ADMIN_ID = 1;

}
```

- 修改常量：SUPER_ADMIN_ID `管理员对应ID`
