## 上传参数

| 参数               | 说明               | 类型   | 是否必填 | 默认值 | 备注           |
| :----------------- | :----------------- | :----- | :------- | :----- | :------------- |
| data-upload        | 上传选中的 input   | string | 是       |        |                |
| data-upload-number | 单传还是多传       | string | 是       | one    |                |
| data-upload-exts   | 限制上传的文件类型 | string | 否       | \*     | 使用分割符连接 |
| data-upload-icon   | 文件失效时显示图标 | string | 否       | image  |                |
| data-upload-sign   | 多文件拼接的分割符 | string | 否       | /      |                |

## 选择参数

| 参数               | 说明               | 类型   | 是否必填 | 默认值 | 备注           |
| :----------------- | :----------------- | :----- | :------- | :----- | :------------- |
| id                 | 唯一的 ID 值       | string | 是       |        |                |
| data-upload-select | 下拉选中的 input   | string | 是       |        |                |
| data-upload-number | 单传还是多传       | string | 是       | one    |                |
| data-upload-exts   | 限制上传的文件类型 | string | 否       | \*     | 使用分割符连接 |

## 代码示例

```html
<div class="layui-form-item">
  <label class="layui-form-label required">商品LOGO</label>
  <div class="layui-input-block layuimini-upload">
    <input
      name="logo"
      class="layui-input layui-col-xs6"
      lay-verify="required"
      placeholder="请上传分类图片"
      value="{$row.logo|default=''}"
    />
    <div class="layuimini-upload-btn">
      <span
        ><a
          class="layui-btn"
          data-upload="logo"
          data-upload-number="one"
          data-upload-exts="png|jpg|ico|jpeg"
          data-upload-icon="image"
          ><i class="fa fa-upload"></i> 上传</a
        ></span
      >
      <span
        ><a
          class="layui-btn layui-btn-normal"
          id="select_logo"
          data-upload-select="logo"
          data-upload-number="one"
          data-upload-mimetype="image/*"
          ><i class="fa fa-list"></i> 选择</a
        ></span
      >
    </div>
  </div>
</div>
```
