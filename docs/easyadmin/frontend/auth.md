## 前端 auth 权限验证

> 为什么前端也做权限认证，权限认证不应该是后端做的吗？ 这里的权限认证指的是前端判断是否有权限查看的数据（例如：添加、删除、编辑之类的按钮），这些只有在点击到对应的 url 之后，后端才会进行权限认证。 为了避免用户困扰，可以在此用上前端的权限认证，判断是否显示还是隐藏

## 视图页面内权限例子

- 第一种示例, 通过 php 的`auth()`方法生成`layui-hide`样式属性。

```html
<button
  class="layui-btn layui-btn-normal layui-btn-sm {if !auth('system.menu/add')}layui-hide{/if}"
  data-open="system.menu/add"
  data-title="添加"
  data-full="true"
>
  <i class="fa fa-plus"></i> 添加
</button>
```

1

- 第二种, 通过 php 的`auth()`方法判断, 是否显示 html

```html
{if !auth('system.menu/add')}
<button
  class="layui-btn layui-btn-normal layui-btn-sm"
  data-open="system.menu/add"
  data-title="添加"
  data-full="true"
>
  <i class="fa fa-plus"></i> 添加
</button>
{/if}
```

## table 表格内权限例子

- table 表格里面，一种 table 表格`上方`的操作栏`toolbar`需要权限判断是否显示。
- 另外一种是 table 表格`里面`的列操作栏`operat`也需要权限判断是否显示。

### 事先定义权限规则

- 需要在对应的表格的`dom`事先全好对应的权限规则。
- 权限规则为：`data-auth-` + 规则名
- 例如：data-auth-`add`="{:auth('goods.cate/add')}", `add`就是对应的权限规则。

> 下方例子中共定义了：`add` `edit` `delete` `stock` 四种权限规则

```html
<div class="layuimini-container">
  <div class="layuimini-main">
    <table
      id="currentTable"
      class="layui-table layui-hide"
      data-auth-add="{:auth('mall.goods/add')}"
      data-auth-edit="{:auth('mall.goods/edit')}"
      data-auth-delete="{:auth('mall.goods/delete')}"
      data-auth-stock="{:auth('mall.goods/stock')}"
      lay-filter="currentTable"
    ></table>
  </div>
</div>
```

### 表格上方的`toolbar`权限验证

下面简单讲解权限验证，完整的`toolbar`的使用和配置请查看`table`模块。

- `toolbar`内置三个内置权限验证：`add`,`delete`,`export`

```js
toolbar: ["refresh", "add", "delete", "export"];
```

1

- 自定义`toolbar`, 在`auth`属性上填写`权限规则`

```js
toolbar: ['refresh',
      [{
         text: ' 添加',
         open: init.add_url,
         class: 'layui-btn layui-btn-normal layui-btn-sm',
         icon: 'fa fa-plus ',
         title: '添加',
         auth: 'add',
         extend: ' data-full="true"',
       }],
      'delete', 'export'],
```

### 表格内列操作`operat`的权限验证

- `operat`内置三个内置权限验证：`edit`,`delete`

```js
operat: ["edit", "delete"];
```

1

- 自定义`operat`, 在`auth`属性上填写`权限规则`

```js
operat: [
  [
    {
      class: "layui-btn layui-btn-xs layui-btn-success",
      method: "open",
      text: "编辑",
      auth: "edit",
      url: init.edit_url,
      extend: 'data-full="true"',
    },
    {
      class: "layui-btn layui-btn-xs layui-btn-normal",
      method: "open",
      text: "入库",
      auth: "stock",
      url: init.stock_url,
      extend: "",
    },
  ],
  "delete",
];
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
    del_url: "mall.goods/del",
    export_url: "mall.goods/export",
    modify_url: "mall.goods/modify",
    stock_url: "mall.goods/stock",
  };

  var Controller = {
    index: function () {
      ea.table.render({
        init: init,
        modifyReload: true,
        toolbar: [
          "refresh",
          [
            {
              text: " 添加",
              open: init.add_url,
              class: "layui-btn layui-btn-normal layui-btn-sm",
              icon: "fa fa-plus ",
              title: "添加",
              auth: "add",
              extend: ' data-full="true"',
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
                    class: "layui-btn layui-btn-xs layui-btn-success",
                    method: "open",
                    text: "编辑",
                    auth: "edit",
                    url: init.edit_url,
                    extend: 'data-full="true"',
                  },
                  {
                    class: "layui-btn layui-btn-xs layui-btn-normal",
                    method: "open",
                    text: "入库",
                    auth: "stock",
                    url: init.stock_url,
                    extend: "",
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
