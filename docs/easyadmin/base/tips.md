## 使用技巧

`EasyAdmin` 框架文档真的是有点不友好，官方也不怎么维护了，相信现在还在用的小伙伴们肯定也是有原因的。

以下是我在使用过程中的一些技巧和经验分享，也希望能帮助到大家。

### 使用前

- 确保安装了 `php-gd` 扩展，否则无法显示验证码

### 新增菜单和功能

如果需要添加新的菜单及功能，需要新增以下文件：

- 新增控制器 `project/app/admin/controller/YourNewController.php`

- 新增视图文件 `project/app/admin/view/your_new_view.html`

- 新增 JS 文件 `project/public/static/admin/js/your_new_script.js`

最后在菜单中添加对应的菜单项，就可以正确显示了。

> [!CAUTION]
> 新增菜单后，记得更新节点，并给对应角色分配节点权限。
>
> 否则可能无法显示新增菜单，如果用管理员账号可以不受这个权限限制。

### 配置项

- `project/app/common/constants/MenuConstant.php` 定义了首页的 PID，可以通过修改这个来设置默认打开的页面

- `project/public/static/plugs/easy-admin/easy-admin.js` 定义了一些全局的 JS 方法，可以通过修改这个来实现一些全局的功能

- 请求数据时，是通过 `Ajax` 方法来判断，是的话就会查数据，否则渲染页面

  测试时，可以通过手动添加头 `X-Requested-With:xmlhttprequest` 来模拟对应的请求方法

  复制 `cookie` 信息可以模拟登录

- 部署上线时，如果新增了菜单项，那么提交代码后，也需要在生产环境添加下菜单，以确保显示

- 新增的菜单，除了管理员其它用户是看不到的，需要给角色添加该节点权限

- 视图层需要添加权限代码验证来决定是否显示表格按钮

- 控制器中的 `use CURD` 定义了一组基础查询控制的方法，使用它可以不用写代码，就可以实现基础的新增更新删除等操作

- 可以用 `searchOp` 字段，来指定搜索字段匹配方法，可以直接使用值 `=`

### 功能案例

- 多学学 layui 的方法，改页面的话还得用它。

- 可以参考以下代码，实现页面的重新刷新，并且添加搜索参数：

  ```js
  define(["jquery", "easy-admin"], function ($, ea) {
    var init = {
      table_elem: "#currentTable",
      table_render_id: "currentTableRenderId",
      index_url: "charge.SeekDailyUsed/index",
    };

    var Controller = {
      index: function () {
        ea.table.render({
          init: init,
          toolbar: [],
          where: { dateType: 0 },
          cols: [
            [
              { field: "user_id", title: "用户ID", searchOp: "=" },
              { field: "count", title: "使用次数", search: false },
              {
                field: "created_at",
                title: "开始使用",
                search: false,
              },
              {
                field: "updated_at",
                title: "最后使用",
                search: false,
              },
            ],
          ],
        });

        // 监听 radio 选项变更，并更新表格
        layui.form.on("radio(date_select)", function (data) {
          // 重新加载表格，使用 layui.table.reload()
          layui.table.reload(init.table_render_id, {
            where: { dateType: data.value }, // 传递新参数
            page: { curr: 1 }, // 重新回到第一页
          });
        });
        ea.listen();
      },
    };
    return Controller;
  });
  ```
