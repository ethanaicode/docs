## table 列表

虽然 layui 已经提供了很多方便的方法，但是还是不够简便，目前系统对 layui table 模块进行了重新封装，并兼容所有的 layui table 的方法。

使得开发起来更加得心应手，减轻工作量。

## `init`初始化配置

建议在此处统一配置 table 容器以及相关的链接地址。另外还可以自己进行扩展属性。

> 初始化的参数有

| 参数            | 说明               | 类型       | 是否必填 | 备注                                     |
| :-------------- | :----------------- | :--------- | :------- | :--------------------------------------- |
| table_elem      | table 容器或者 dom | string/dom | 是       |                                          |
| table_render_id | 容器唯一 id        | string     | 否       |                                          |
| index_url       | 列表接口           | string     | 是       |                                          |
| add_url         | 添加接口           | string     | 否       | 需用添加功能必填                         |
| edit_url        | 编辑接口           | string     | 否       | 需用编辑功能必填                         |
| delete_url      | 删除接口           | string     | 否       | 需用删除功能必填                         |
| export_url      | 导出接口           | string     | 否       | 需用导出功能必填                         |
| modify_url      | 属性修改接口       | string     | 否       | 需用属性修改功能必填（例如：状态的切换） |

> 实例，下方`stock_url`就是扩展属性

```js
var init = {
  table_elem: "#currentTable",
  table_render_id: "currentTableRenderId",
  index_url: "mall.goods/index",
  add_url: "mall.goods/add",
  edit_url: "mall.goods/edit",
  delete_url: "mall.goods/delete",
  export_url: "mall.goods/export",
  modify_url: "mall.goods/modify",
  stock_url: "mall.goods/stock",
};
```

## 表格实例化

表格实例化方法为`ea.table.render()`, 兼容 layui table 的所有功能，另外还扩展了一些新的功能。

## 扩展表格参数

这些是基于 layui 的 table 的进行扩展的基础参数，如需查看其他的参数，请去 layui 官网查看。

| 参数         | 说明                   | 类型   | 是否必填 | 默认值                              | 备注                                     |
| :----------- | :--------------------- | :----- | :------- | :---------------------------------- | :--------------------------------------- |
| init         | `init`初始化配置       | object | 是       |                                     | 一般情况下，请传入上方配置好的初始化参数 |
| search       | 是否开启搜索功能       | bool   | 否       | true                                | 开启会自动根据`列`生成搜索表单           |
| modifyReload | 修改属性时是否刷新表格 | bool   | 否       | true                                |                                          |
| toolbar      | table 操作栏           | object | 否       | ['refresh','add','delete','export'] | 除了这些内置的，还可以自己进行扩展       |

> 代码示例

```js
ea.table.render({
        init: init,
        toolbar: [...表格toolbar...],
        cols: [...请参考下方列参数...],
    });
```

## 表格 toolbar 操作栏

- 默认内置有四种 toolbar 操作方法，分别是：
  - `refresh`
  - `add`
  - `delete`
  - `export`
- 另外可以根据下方提供的参数进行自定义扩展

| 参数     | 说明     | 类型   | 是否必填 | 默认值                | 备注                                                              |
| :------- | :------- | :----- | :------- | :-------------------- | :---------------------------------------------------------------- |
| class    | 样式信息 | string | 否       |                       |                                                                   |
| icon     | 图标信息 | string | 否       |                       | 在行操作里面，不建议使用图标                                      |
| title    | 提示信息 | string | 否       | 为空则读取`text`属性  |                                                                   |
| text     | 文本信息 | string | 否       | 为空则读取`title`属性 |                                                                   |
| method   | 执行方式 | string | 否       | open                  | 可用值，请参考下方参数说明                                        |
| url      | 请求链接 | string | 是       |                       |                                                                   |
| auth     | 权限规则 | string | 是       |                       | 权限规则，具体请参考配置`auth权限验证`模块                        |
| checkbox | 是否多选 | bool   | 否       | false                 | 如果为 true, 不管是弹出层还是直接请求, 请求时会携带上勾选的 id 值 |
| extend   | 扩展属性 | string | 否       |                       | 例如弹出层全屏操作，可以加上：`data-full="true"`                  |

> 相关参数说明

- `method`执行方式：

  - `open` 弹出层打开
  - `request` 直接请求
  - `none` 需要配合 extend 自定义参数内容

> 示例

```js
toolbar: ['refresh',
       [{
          text: '添加',
          url: init.add_url,
          method: 'open',
          auth: 'add',
          class: 'layui-btn layui-btn-normal layui-btn-sm',
          icon: 'fa fa-plus ',
          extend: 'data-full="true"',
        }],
       'delete', 'export'],
```

## 扩展列参数

列参数完美兼容 layui 的 table 所有列参数，具体请查看 layui 官网。

## 搜索表单生成器

提供快捷搜索表单生成器，根据 table 表格初始化时的列参数进行动态生成。

> 下方是相关的表格列参数

| 参数        | 说明         | 类型        | 是否必填 | 默认值                        | 备注                                 |
| :---------- | :----------- | :---------- | :------- | :---------------------------- | :----------------------------------- |
| search      | 搜索类型     | string/bool | 否       | true                          | 可用值，请参考下方参数说明           |
| searchOp    | 搜索条件     | string      | 否       | %\*%                          | 可用值，请参考下方参数说明           |
| searchTip   | 搜索提示语   | string      | 否       | 默认获取`title`参数值自动生成 |                                      |
| searchValue | 表单初始化值 | string      | 否       |                               |                                      |
| selectList  | 下拉列表值   | object      | 否       |                               | 需要`search`参数等于`select`时才生效 |
| fieldAlias  | 字段别名     | string      | 否       | 与`field`参数相等             | 某些特殊情况下才需要，正常用不上     |

> 相关参数说明

- `search`搜索类型：

  - `false` 关闭搜索
  - `true` 开启搜索
  - `select` 下拉选择
  - `range` 时间范围
  - `time` 时间格式

- `searchOp`搜索条件：

  - `=` 精确搜索
  - `%*%` 模糊搜索
  - `*%` 右匹配模糊搜索
  - `%*` 左匹配模糊搜索
  - `range` 范围搜索

> 代码示例

```js
cols: [[
        {type: "checkbox"},
        {field: 'id', width: 80, title: 'ID'},
        {field: 'sort', width: 80, title: '排序', edit: 'text'},
        {field: 'title', minWidth: 80, title: '商品名称'},
        {field: 'logo', minWidth: 80, title: '分类图片', search: false, templet: ea.table.image},
        {field: 'status', title: '状态', width: 85, selectList: {0: '禁用', 1: '启用'}, templet: ea.table.switch},
        {field: 'create_time', minWidth: 80, title: '创建时间', search: 'range'},
    ]],
```

## 列 operat 操作栏

- 默认内置有两种 operat 操作方法，分别是：
  - `edit`
  - `delete`
- 另外可以根据下方提供的参数进行自定义扩展

| 参数   | 说明       | 类型   | 是否必填 | 默认值                       | 备注                                             |
| :----- | :--------- | :----- | :------- | :--------------------------- | :----------------------------------------------- |
| class  | 样式信息   | string | 否       |                              |                                                  |
| icon   | 图标信息   | string | 否       |                              | 在行操作里面，不建议使用图标                     |
| title  | 提示信息   | string | 否       | 为空则读取`text`属性         |                                                  |
| extra  | 提示信息   | string | 否       | 表格内的欲加入标题中的行字段 |                                                  |
| text   | 文本信息   | string | 否       | 为空则读取`title`属性        |                                                  |
| method | 执行方式   | string | 否       | open                         | 可用值，请参考下方参数说明                       |
| url    | 请求链接   | string | 是       |                              |                                                  |
| auth   | 权限规则   | string | 是       |                              | 权限规则，具体请参考配置`auth权限验证`模块       |
| field  | 绑定行字段 | string | 否       | id                           | 会自动根据此字段生成链接后缀                     |
| extend | 扩展属性   | string | 否       |                              | 例如弹出层全屏操作，可以加上：`data-full="true"` |

> 相关参数说明

- `method`执行方式：

  - `open` 弹出层打开
  - `request` 直接请求
  - `none` 需要配合 extend 自定义参数内容

> 示例

```js
operat: [
  [
    {
      text: "编辑",
      extra: "name",
      url: init.edit_url,
      method: "open",
      auth: "edit",
      class: "layui-btn layui-btn-xs layui-btn-success",
      extend: 'data-full="true"',
    },
    {
      text: "入库",
      url: init.stock_url,
      method: "open",
      auth: "stock",
      class: "layui-btn layui-btn-xs layui-btn-normal",
    },
  ],
  "delete",
];
```

## 列内置 templet 方法

| 方法             | 说明                               | 备注                                |
| :--------------- | :--------------------------------- | :---------------------------------- |
| ea.table.list    | 根据行的`selectList`返回对应列表值 | 一般类型之类的会用到                |
| ea.table.image   | 显示图片                           | 行参数`imageHeight`是控制图片的高度 |
| ea.table.url     | 格式化显示链接                     |                                     |
| ea.table.switch  | 生成开关组件                       |                                     |
| ea.table.price   | 格式化为价格                       |                                     |
| ea.table.percent | 格式化为百分比                     |                                     |
| ea.table.icon    | 显示图标                           |                                     |
| ea.table.value   | 格式化数据                         | 多层对象数据的显示                  |
| ea.table.tool    | 列操作栏                           | 自动生成列操作栏                    |

> 示例

```js
cols: [[
        {field: 'head_img', minWidth: 80, title: '头像', templet: ea.table.image},
        {field: 'status', title: '状态', width: 85, search: 'select', selectList: {0: '禁用', 1: '启用'}, templet: ea.table.switch},
        {width: 250, title: '操作', templet: ea.table.tool}
    ]],
```

## 完整例子

```js
define(["jquery", "easy-admin"], function ($, ea) {
  var init = {
    table_elem: "#currentTable",
    table_render_id: "currentTableRenderId",
    index_url: "mall.goods/index",
    add_url: "mall.goods/add",
    edit_url: "mall.goods/edit",
    delete_url: "mall.goods/delete",
    export_url: "mall.goods/export",
    modify_url: "mall.goods/modify",
    stock_url: "mall.goods/stock",
  };

  var Controller = {
    index: function () {
      ea.table.render({
        init: init,
        toolbar: [
          "refresh",
          [
            {
              text: "添加",
              url: init.add_url,
              method: "open",
              auth: "add",
              class: "layui-btn layui-btn-normal layui-btn-sm",
              icon: "fa fa-plus ",
              extend: 'data-full="true"',
            },
          ],
          "delete",
          "export",
        ],
        cols: [
          [
            { type: "checkbox" },
            { field: "id", width: 80, title: "ID" },
            { field: "sort", width: 80, title: "排序", edit: "text" },
            { field: "cate.title", minWidth: 80, title: "商品分类" },
            { field: "title", minWidth: 80, title: "商品名称" },
            {
              field: "logo",
              minWidth: 80,
              title: "分类图片",
              search: false,
              templet: ea.table.image,
            },
            {
              field: "market_price",
              width: 100,
              title: "市场价",
              templet: ea.table.price,
            },
            {
              field: "discount_price",
              width: 100,
              title: "折扣价",
              templet: ea.table.price,
            },
            { field: "total_stock", width: 100, title: "库存统计" },
            { field: "stock", width: 100, title: "剩余库存" },
            { field: "virtual_sales", width: 100, title: "虚拟销量" },
            { field: "sales", width: 80, title: "销量" },
            {
              field: "status",
              title: "状态",
              width: 85,
              selectList: { 0: "禁用", 1: "启用" },
              templet: ea.table.switch,
            },
            {
              field: "create_time",
              minWidth: 80,
              title: "创建时间",
              search: "range",
            },
            {
              width: 250,
              title: "操作",
              templet: ea.table.tool,
              operat: [
                [
                  {
                    text: "编辑",
                    url: init.edit_url,
                    method: "open",
                    auth: "edit",
                    class: "layui-btn layui-btn-xs layui-btn-success",
                    extend: 'data-full="true"',
                  },
                  {
                    text: "入库",
                    url: init.stock_url,
                    method: "open",
                    auth: "stock",
                    class: "layui-btn layui-btn-xs layui-btn-normal",
                  },
                ],
                "delete",
              ],
            },
          ],
        ],
      });

      ea.listen();
    },
    add: function () {
      ea.listen();
    },
    edit: function () {
      ea.listen();
    },
    stock: function () {
      ea.listen();
    },
  };
  return Controller;
});
```
