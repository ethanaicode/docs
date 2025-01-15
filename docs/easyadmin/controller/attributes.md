## 控制器属性

后台`所有`控制器都应该需要去继承该基类`app/common/controller/AdminController.php`

> 目前系统内部默认的属性有：

| 参数              | 说明                 | 类型   | 默认                                                          |
| :---------------- | :------------------- | :----- | :------------------------------------------------------------ |
| model             | 当前模型对象         | model  | null                                                          |
| relationSearch    | 是否关联查询         | bool   | false                                                         |
| sort              | 列表排序规则         | array  | ['id' => 'desc']                                              |
| allowModifyFields | 允许修改的字段       | array  | ['status', 'sort', 'remark', 'is_delete', 'is_auth', 'title'] |
| noExportFields    | 不导出的字段信息     | array  | ['delete_time', 'update_time']                                |
| selectWhere       | 下拉选择条件         | array  | []                                                            |
| layout            | 模板布局, false 取消 | string | 'layout/default'                                              |
