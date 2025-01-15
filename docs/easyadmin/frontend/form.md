## form 表单

- form 表单已经集成了快速验证以及提交的方法，无需手动重组数据再进行提交
- 默认提交的数据是提交当前`url`，如需提交到其它页面，修改一下`lay-submit`的值即可
- 在对应的 js 文件内引入`easy-admin`模块，并执行`ea.listen();`进行监听

## 必填值

> 使用`lay-verify="required"`，会自动生成必填小红点， 并且会在提交的时候进行必填验证

```html
<div class="layui-form-item">
  <label class="layui-form-label">权限名称</label>
  <div class="layui-input-block">
    <input
      type="text"
      name="title"
      class="layui-input"
      lay-verify="required"
      placeholder="请输入权限名称"
      value=""
    />
    <tip>填写权限名称。</tip>
  </div>
</div>
```

## `lay-submit` 事件监听

使用该事件监听，会自动获取表单数据以`POST`方式自动提交。

> 与`lay-submit`事件监听的相关参数：

| 参数         | 说明                   | 类型   | 是否必填 | 默认           | 备注                                                                                                |
| :----------- | :--------------------- | :----- | :------- | :------------- | :-------------------------------------------------------------------------------------------------- |
| lay-submit   | 监听表单自动提交       | string | 是       | 当前地址       | 为空则提交的当前地址。如果需要提交到其它地址，此处填写对应的地址。                                  |
| data-refresh | 提交成功后是否需要刷新 | bool   | 否       | true           | 提交成功后，关闭弹出层，`刷新`父层的`table列表`，如果不需要刷新，或者没有用到弹出层，此处改为 false |
| lay-filter   | layui 内置过滤器       | string | 否       | 自动生成唯一值 | 无特殊需求，此处无需填写，会自动生成                                                                |

> 例子

```html
<div class="layui-form-item text-center">
  <button
    type="submit"
    class="layui-btn layui-btn-normal layui-btn-sm"
    lay-submit
  >
    确认
  </button>
  <button type="reset" class="layui-btn layui-btn-primary layui-btn-sm">
    重置
  </button>
</div>
```

## 提交前置操作

> 事件监听方法：`ea.listen(preposeCallback, ok, no, ex)`，可能用得比较多的还是`preposeCallback`的提交前置回调。

| 参数            | 说明                 | 类型     | 是否必填 | 备注                                     |
| :-------------- | :------------------- | :------- | :------- | :--------------------------------------- |
| preposeCallback | 表单提交前的前置回调 | function | 否       | 一般用于需要重新组装一些特殊的数据再提交 |
| ok              | 提交成功后的回调     | function | 否       |                                          |
| no              | 提交失败后的回调     | function | 否       |                                          |
| ex              | 提交异常后的回调     | function | 否       |                                          |

```js
ea.listen(function (data) {
  // 此处进行数据重组再返回
  data.test = "测试重组数据";

  return data;
});
```

## 完整例子

```html
<div class="layuimini-container">
  <form id="app-form" class="layui-form layuimini-form">
    <div class="layui-form-item">
      <label class="layui-form-label">权限名称</label>
      <div class="layui-input-block">
        <input
          type="text"
          name="title"
          class="layui-input"
          lay-verify="required"
          placeholder="请输入权限名称"
          value=""
        />
        <tip>填写权限名称。</tip>
      </div>
    </div>

    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">备注信息</label>
      <div class="layui-input-block">
        <textarea
          name="remark"
          class="layui-textarea"
          placeholder="请输入备注信息"
        ></textarea>
      </div>
    </div>

    <div class="hr-line"></div>
    <div class="layui-form-item text-center">
      <button
        type="submit"
        class="layui-btn layui-btn-normal layui-btn-sm"
        lay-submit
      >
        确认
      </button>
      <button type="reset" class="layui-btn layui-btn-primary layui-btn-sm">
        重置
      </button>
    </div>
  </form>
</div>
```
