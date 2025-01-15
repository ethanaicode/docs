## 验证器使用

- 此验证器的使用只针对于后台控制器
- 需要先继承该类`app\common\controller\AdminController`

验证规则的编写参考 ThinkPHP 的文档。

调用`validate`方法进行验证，如果验证未通过，会直接调用`$this->error();`方法。

> 代码示例

```php
<?php
namespace app\admin\controller;

use app\common\controller\AdminController;

class Test extends AdminController{

    public function login(){
        $post = $this->request->post();
        $rule = [
            'username|用户名' => 'require',
            'password|密码'  => 'require',
        ];
        $this->validate($post, $rule);
        $this->success('成功');
    }
}
```
