## 必看基础信息

系统做了一些封装，先查看此文档会有效解决你的疑问

### 后台控制器与 JS 的绑定

- 控制器中 JS 的目录对应为：`public/static/admin/js`
- 文件命名为: `小写+下划杠`
- `控制器`的每一个`方法`对应 JS 的`Controller`对象的一个`属性`
- 每一个 JS 文件都需要引入`admin`模块，并执行监听` ea.listen();`;

> 例子

- 控制器对应的 PHP 文件`app/admin/controller/mall/Cate.php`
- 控制器对应的 JS 文件`public/static/admin/js/mall/cate.js`
- 每一个控制里面的`方法`对应 js 里面的`属性`就会自动进行加载

**设计笔记注**：下面案例中 `del_url: "mall.cate/del",` 在某些版本要写成 `delete_url: "mall.cate/delete",`，否则会报错（可以参考代码中的案例进行判断）

```js
define(["jquery", "easy-admin"], function ($, ea) {
  var init = {
    table_elem: "#currentTable",
    table_render_id: "currentTableRenderId",
    index_url: "mall.cate/index",
    add_url: "mall.cate/add",
    edit_url: "mall.cate/edit",
    del_url: "mall.cate/del",
    export_url: "mall.cate/export",
    modify_url: "mall.cate/modify",
  };

  var Controller = {
    index: function () {
      ea.table.render({
        init: init,
        modifyReload: true,
        cols: [
          [
            { type: "checkbox" },
            { field: "id", width: 80, title: "ID" },
            { field: "sort", width: 80, title: "排序", edit: "text" },
            { field: "title", minWidth: 80, title: "分类名称" },
            {
              field: "image",
              minWidth: 80,
              title: "分类图片",
              search: false,
              templet: ea.table.image,
            },
            { field: "remark", minWidth: 80, title: "备注信息" },
            {
              field: "status",
              title: "状态",
              width: 85,
              search: "select",
              selectList: { 0: "禁用", 1: "启用" },
              filter: "status",
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
              operat: ["edit", "delete"],
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
  };
  return Controller;
});
```
