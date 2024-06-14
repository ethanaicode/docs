# Laravel 学习笔记

> **调试技巧**
>
> 可以使用`dd()`来打印显示出变量。（dd 也就是 dump）
>
> 可以使用`->toArray()`来将对象转为数组(`[object]`应该也可以达到同样的目的)
>
> 数据库链式查询，可以用`->toSql()`来打印出原生的 sql 语句

## 继续深入

### 辅助函数

**now()**

`now` 函数为当前时间创建一个新的 `Illuminate\Support\Carbon` 实例

实现：可以直接用这个来处理时间。

```PHP
now()->toDateTimeString() //显示现在的年月日及时间
now()->toDateString()    //显示现在的年月日
```

**request()**

`request` 函数返回当前的 [request](https://learnku.com/docs/laravel/8.5/requests) 实例或从当前请求中获取输入字段的值：

```PHP
$request = request();

$value = request('key', $default); //支持给个默认值，如果没有数值时使用
```

**optional()**

`optional` 函数接受任何参数，并允许您访问该对象的属性或调用方法。如果给定的对象为 null，属性和方法将返回 null 而不是导致错误：

```PHP
return optional($user->address)->street;

{!! old('name', optional($user)->name) !!}
```

`optional` 函数也接受闭包作为第二个参数。如果第一个参数提供的值不为空，闭包将被调用：

```PHP
return optional(User::find($id), function ($user) {
    return $user->name;
});
```

## 数据库

> 一般都可以接 Raw，来输入原生语句，比如：whereRaw('id=3')

### Ordering, Grouping, Limit & Offset

#### orderBy 方法

允许您按给定列对查询结果进行排序。

orderBy 方法接受的第一个参数应该是您希望排序的列，而第二个参数确定排序的方向，可以是 asc 或 desc，不填的话默认是 asc 升序;

要按多列排序，您可以根据需要多次调用 orderBy()

例如：

```PHP
$info=sys_express_sign::where($where)
            ->orderBy('use_flag')->orderBy('id')
            ->get();
```

知识点链接：[Ordering](https://learnku.com/docs/laravel/8.5/queries/10404#625496)

#### When()

允许设置条件选择，执行相应的 SQL 语句。

例如：

```PHP
$user = DB::table('user')->when(true,function($query){
    $query->where('id',19);
},function($query){
    $query->where('id',20);
})->get();
```

#### orWhere()

#### whereColum()

## **Eloquent ORM**

### 模型入门

#### 查询作用域

**局部作用域**

局部作用域允许定义通用的约束集合以便在应用程序中重复使用。

例如，你可能经常需要获取所有「流行」的用户。

要定义这样一个范围，只需要在对应的 Eloquent 模型方法前添加 `scope` 前缀。🌟

**作用域总是返回一个查询构造器实例。**

实现：查询语句的重复使用，也符合代码规范，更轻的控制器，更胖的模型（似乎标准的做法不是这样，但是通过 scope 作用域前缀确实可以实现这个）

例如：

```PHP
<?php
namespace App\Models\Communal;
use  Illuminate\Database\Eloquent\Model;
class sys_menu extends Model{
    /** 获取父级菜单的数据 */
    public function scopeParentinfo($q,$where_node,$select_node)
    {
        return $q->with(['parent' => function ($qq) use ($where_node,$select_node) {
            $qq->where($where_node)->select($select_node);
        }]);
    }
}

// 控制器中使用
use App\Models\Communal\sys_menu;

$where = [
            ['id','=',$id],
            ['guide_flag','=',1],
            ['delete_flag','=',1]
        ];
$select=['id','level','node','delete_flag','guide_flag','name','platform_name','supplier_name','guide_details','guide_config_flag'];
$select_node=['id','node','name','platform_name','supplier_name'];
$data['info']=sys_menu::parentinfo($select_node)->where($where)->select($select)->first();
```

### 模型关联

#### 定义关联

**一对一**

一对一是最基本的数据库关系。

例如：

- 模型中定义

```PHP
<?php

namespace App\Models\Communal;
use  Illuminate\Database\Eloquent\Model;

class sys_menu extends Model
{
    public function parent(){
        //参数：关联模型名称，外键，主键
        //如果主键是id可以省略
        return $this->hasOne('App\Models\Communal\sys_menu','id','node');
    }
}
//可以理解成，在Parent这个模型函数中，node=id，且是一对一关系
//一对多，就是把hasOne，换成hasMany
```

- 控制器中使用

```PHP
$info=sys_menu::with(['parent' => function ($query) use ($select_node) {
            $query->select($select_node);
        }])->where($where)->offset($firstrow)->limit($listrows)->orderBy('id','desc')
            ->select($select)->get();
// 配合wherehas可以实现更厉害的功能，具体可以看下面案例
```

知识点链接：[一对一关联](https://learnku.com/docs/laravel/8.5/eloquent-relationships/10410#dd7768)

#### 查询关联

**查询已存在的关联**

检索模型记录时，您可能希望根据关系的存在限制结果。

实现：通过关联的模型，来筛选或者限制查询的数据。

例如：

- 模型中的定义

```PHP
<?php

namespace App\Models\Communal;
use  Illuminate\Database\Eloquent\Model;

class system_group_settle extends Model{
{
    public function system_group(){
        //参数：关联模型名称，外键，主键
        //如果主键是id可以省略
        return $this->hasOne('App\Models\Group\system_group','id','group_id');
    }
}
```

- 控制器中使用

```PHP
use App\Models\Communal\system_group_settle;
use App\Models\Group\system_group;

//数据只是为了参考，请根据应用场景填写
$where = [
    ['delete_flag', '=', 1],
];
$user_track_where2 = [
    ['delete_flag', '=', '1'],
];
$select = ['id'];
$selectGroup = ['id', 'group_name'];
$info = system_group_settle::wherehas('system_group', function ($query) use ($user_track_where2) {
                    $query->where($user_track_where2);
                })->with(['system_group' => function ($query) use ($selectGroup) {
                    $query->select($selectGroup);
                }])->where($where)
                    ->offset($firstrow)->limit($listrows)->orderBy('create_time', 'desc')
                    ->select($select)->get();
// with实现了关联查询
// wherehas，通过添加where条件，实现了筛选
```

知识点链接：[查询已存在的关联](https://learnku.com/docs/laravel/8.5/eloquent-relationships/10410#d361f0)

## config 的使用

这个无需引入任何类，可以直接使用 config(config_name)即可引入 config 文件里面的内容。

案例：

```PHP
//  首先我在config下面建立一个grade.php的文件，内容为：

<?php
/**
 * 等级数据配置中心
 */
return[
    'basic'=>[
        [   'key' => 1,
            'name' => '临时粉',      ],
        [   'key' => 2,
            'name' => '普通会员',    ],
        [   'key' => 3,
            'name' => 'VIP',        ],
        [   'key' => 4,
            'name' => '合伙人',      ],
        [   'key' => 5,
            'name' => '联创',        ],
        [   'key' => 6,
            'name' => '股东',        ],
        [   'key' => 9,
            'name' => '内部测试员',   ],
    ],
];

//  那么如果我想要这个配置的内容，只需要这一句即可：

$grade_info = config('grade');

// 现在如果输出这个$grade_info，就可以看到完整的内容了。
```

需要注意的是，config 的配置数据那块，需要用单引号括起来，别忘了！
