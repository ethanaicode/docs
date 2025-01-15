## 快捷弹出层

简单对 layui 的弹出层进行封装，提高开发效率。

| 参数          | 说明           | 类型   | 是否必填 | 默认值 | 备注                 |
| :------------ | :------------- | :----- | :------- | :----- | :------------------- |
| data-open     | 打开弹出层     | string | 是       |        | 参数值为弹出层的 url |
| data-title    | 弹出层标题     | string | 是       |        |                      |
| data-full     | 是否全屏打开   | string | 否       | false  |                      |
| data-width    | 弹出层宽度     | string | 否       |        |                      |
| data-height   | 弹出层高度     | string | 否       |        |                      |
| data-external | 是否自定义 url | bool   | 否       | false  |                      |

> 代码示例

```html
<button
  class="layui-btn layui-btn-normal layui-btn-sm"
  data-open="system.menu/add"
  data-title="添加"
  data-full="true"
>
  <i class="fa fa-plus"></i> 添加
</button>
```

1

## 快捷直接请求

以`ajax` post 方式进行直接请求，无需编写 js 代码，一般用于修改状态之类的场景。

| 参数         | 说明            | 类型   | 是否必填 | 默认值 | 备注                                                         |
| :----------- | :-------------- | :----- | :------- | :----- | :----------------------------------------------------------- |
| data-request | 直接请求        | string | 是       |        | 参数值为直接请求的 url                                       |
| data-title   | 请求时的提示语  | string | 是       |        |                                                              |
| data-direct  | 是否直接请求    | bool   | 否       |        | 如果为`true`，将会直接对链接进行请求，一般用于文件链接之类的 |
| data-table   | 绑定的 table id | string | 否       |        | 如果有，请求成功会自动刷新对应的数据表格                     |

```html
<a
  data-request="system.node/refreshNode?force=0"
  data-title="确定更新新节点？"
  data-table="currentTableRenderId"
  >更新节点</a
>
```

1

## 图片放大镜

点击图片，以弹出层方式进行放大图片。

| 参数       | 说明       | 类型   | 是否必填 | 默认值 | 备注                   |
| :--------- | :--------- | :----- | :------- | :----- | :--------------------- |
| data-image | 图片放大镜 | string | 是       |        | 此处是图片放大后的标题 |
| src        | 图片地址   | string | 是       |        |                        |

> 代码示例

```html
<img src="test.jpg" data-image="测试图片放大" />
```
