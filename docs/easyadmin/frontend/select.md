## 动态生成下拉选择

根据接口动态获取下拉选择

| 参数        | 说明         | 类型   | 是否必填 | 默认值 | 备注               |
| :---------- | :----------- | :----- | :------- | :----- | :----------------- |
| data-select | 拉下选择     | string | 是       |        | 参数值为请求的 url |
| data-fields | 查询的字段   | string | 是       |        |                    |
| data-value  | 下拉选中的值 | string | 否       |        |                    |

> 代码示例

```html
<div class="layui-form-item">
  <label class="layui-form-label">商品分类</label>
  <div class="layui-input-block">
    <select
      name="cate_id"
      lay-verify="required"
      data-select="{:url('mall.cate/index')}"
      data-fields="id,title"
      data-value="{$row.cate_id|default=''}"
    ></select>
  </div>
</div>
```

> 返回的 json 格式

json

```
{
	"code": 1,
	"msg": null,
	"data": [{
		"id": 9,
		"title": "手机"
	}, {
		"id": 10,
		"title": "家用"
	}, {
		"id": 11,
		"title": "如何"
	}],
	"url": "http:\/\/admin.host\/admin\/mall.goods\/edit?id=8",
	"wait": 3
}
```
