## 富文本编辑器初始化

- 系统默认内置了`ckeditor4`编辑器, 只需要简单的初始化操作就可以轻松使用富文本编辑器。
- 在`class`引入`editor`样式即可完成初始化操作。
- 可以使用`rows`来控制编辑器的高度。

> 代码示例

```html
<div class="layui-form-item">
  <label class="layui-form-label">商品描述</label>
  <div class="layui-input-block">
    <textarea
      name="describe"
      rows="20"
      class="layui-textarea editor"
      placeholder="请输入商品描述"
    >
{$row.describe|default=''}</textarea
    >
  </div>
</div>
```
