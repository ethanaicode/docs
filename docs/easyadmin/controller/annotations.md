## 注解权限

> 注解权限只能获取后台的控制器，也就是该`app/admin/controller`下

## 控制器注解权限

> 控制器类注解 tag `@ControllerAnnotation`

- 注解类： `EasyAdmin\annotation\ControllerAnnotation`
- 作用范围： `CLASS`
- 参数说明：
  - `title` 控制器的名称（必填）
  - `auth` 是否开启权限控制，默认为 true （选填，Enum:`{true, false}`）

### 示例

> 备注：注解前请先引用`use EasyAdmin\annotation\ControllerAnnotation;`

```php
<?php
namespace app\admin\controller;

use app\common\controller\AdminController;
use EasyAdmin\annotation\ControllerAnnotation;

/**
 * @ControllerAnnotation(title="测试控制器")
 */
class Test extends AdminController
{

}
```

## 方法节点注解权限

> 方法节点类注解 tag `@NodeAnotation`

- 注解类： `EasyAdmin\annotation\NodeAnotation`
- 作用范围： `METHOD`
- 参数说明：
  - `title` 方法节点的名称（必填）
  - `auth` 是否开启权限控制，默认为 true （选填，Enum:`{true, false}`）

### 示例

> 备注：注解前请先引用`use EasyAdmin\annotation\NodeAnotation;`

```php
<?php
namespace app\admin\controller;

use app\common\controller\AdminController;
use EasyAdmin\annotation\ControllerAnnotation;
use EasyAdmin\annotation\NodeAnotation;

/**
 * @ControllerAnnotation(title="测试控制器")
 */
class Test extends AdminController
{

    /**
     * @NodeAnotation(title="列表")
     */
    public function index(){
        echo __METHOD__;
    }
}
```

## 更新权限节点

- 使用命令`php think node`进行更新权限节点。
- 或者在后台节点管理里面点击更新。

![执行命令行](https://pic.shejibiji.com/i/2025/01/15/67877c05c800f.png)
