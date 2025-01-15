## 静态资源配置

- 目前只写了阿里云的静态资源配置。
- 修改静态资源为 OSS，会有效减轻服务器压力，并提高资源加载速度（特别是带宽低的服务器）

### 步骤

- 在后台修改文件上传为阿里云，并修改对应的配置项

![阿里云上传配置](https://pic.shejibiji.com/i/2025/01/15/67877bda590c4.png)

- 修改 `.env` 文件下的配置：

  - `EASYADMIN.STATIC_PATH`：静态资源地址（例如：https://easyadmin.oss-cn-shenzhen.aliyuncs.com/static_easyadmin）
  - `EASYADMIN.OSS_STATIC_PREFIX`：静态资源上传前缀（例如：static_easyadmin）

- 在项目的主目录下执行：`php think OssStatic`，就会将`public/static`路径下的所有静态资源上传上去

![执行命令行](http://192.168.2.109:52602/oss_static.jpg)

- 删除该目录下`runtime/admin/cache`的缓存资源
