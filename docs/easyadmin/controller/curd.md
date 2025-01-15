## Curd trait 引入

后台使用 Curd trait, 能大大提高开发效率以及代码的可复用性, 文件位置：`app/admin/traits/Curd.php`

> 默认的 CURD 方法有：

| 参数   | 说明     |
| :----- | :------- |
| index  | 列表     |
| add    | 添加     |
| edit   | 编辑     |
| delete | 删除     |
| export | 导出     |
| modify | 属性修改 |

## 使用方法

- 在类里面引入`use \app\admin\traits\Curd;`
- 在类直接引入`use EasyAdmin\annotation\NodeAnotation;`,（备注：因为方法内有使用到权限注解，至少要引入该类，不然会在节点更新的时候报出异常）
- 初始化当前模型

> 代码示例

```php
<?php
namespace app\admin\controller;

use app\admin\model\SystemConfig;
use app\common\controller\AdminController;
use EasyAdmin\annotation\ControllerAnnotation;
use EasyAdmin\annotation\NodeAnotation;
use think\App;

/**
 * @ControllerAnnotation(title="测试控制器")
 */
class Test extends AdminController{

    use \app\admin\traits\Curd;

    public function __construct(App $app){
        parent::__construct($app);
        $this->model = new SystemConfig();
    }
}
```

## 覆盖方法修改

> 因为默认的 Curd 不适用你的需求，请复制`app/admin/traits/Curd.php`对应的方法到你的控制器下进行覆盖修改。

## `index()`列表关联查询

- 修改控制器的属性`relationSerach`为 true
- 模型关联请使用该方法`withJoin()`

> 代码示例`控制器`

```php
<?php
namespace app\admin\controller\mall;

use app\admin\model\MallGoods;
use app\admin\traits\Curd;
use app\common\controller\AdminController;
use EasyAdmin\annotation\ControllerAnnotation;
use EasyAdmin\annotation\NodeAnotation;
use think\App;

/**
 * @ControllerAnnotation(title="商城商品管理")
 */
class Goods extends AdminController
{

    use Curd;

    protected $relationSerach = true;

    public function __construct(App $app)
    {
        parent::__construct($app);
        $this->model = new MallGoods();
    }

    /**
     * @NodeAnotation(title="列表")
     */
    public function index()
    {
        if ($this->request->isAjax()) {
            if (input('selectFields')) {
                return $this->selectList();
            }
            list($page, $limit, $where) = $this->buildTableParames();
            $count = $this->model
                ->withJoin('cate', 'LEFT')
                ->where($where)
                ->count();
            $list = $this->model
                ->withJoin('cate', 'LEFT')
                ->where($where)
                ->page($page, $limit)
                ->order($this->sort)
                ->select();
            $data = [
                'code'  => 0,
                'msg'   => '',
                'count' => $count,
                'data'  => $list,
            ];
            return json($data);
        }
        return $this->fetch();
    }
}
```

> 代码示例`模型`

```php
<?php
namespace app\admin\model;

use app\common\model\TimeModel;

class MallGoods extends TimeModel
{

    protected $deleteTime = 'delete_time';

    public function cate()
    {
        return $this->belongsTo('app\admin\model\MallCate', 'cate_id', 'id');
    }

}
```

## `modify()`属性修改限制

> 为了安全，modify 方法默认允许修改的字段有：

- status
- sort
- remark
- is_delete
- is_auth
- title

> 如果默认字段不适用你的需求请, 请在控制器下覆盖该属性`allowModifyFileds`值即可。

```php
<?php
namespace app\admin\controller;

use app\common\controller\AdminController;
use EasyAdmin\annotation\ControllerAnnotation;
use EasyAdmin\annotation\NodeAnotation;

/**
 * @ControllerAnnotation(title="测试控制器")
 */
class Test extends AdminController{

    use \app\admin\traits\Curd;

    protected $allowModifyFileds = ['username','sort'];

}
```
