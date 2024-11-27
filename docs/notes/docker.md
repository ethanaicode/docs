# Docker

## Docker 命令

### 基础命令

- `docker --version` 查看 Docker 版本

- `docker info` 查看 Docker 信息

### 镜像管理

- `docker images` 查看镜像列表

- `docker pull` 拉取镜像

- `docker push` 推送镜像

- `docker save` 保存镜像

- `docker load` 加载镜像（导入）

  如: `docker load < my-image.tar`

- `docker export` 导出镜像

  如: `docker export 1e560fca3906 > my-image.tar`

- `docker import` 导入镜像(导出的镜像)

  如: `docker import my-image.tar`

- `docker build` 构建镜像

  如: `docker build -t my-image .`

  `-t` 为镜像名称

  `.` 为 Dockerfile 所在的目录

- `docker commit` 提交镜像

- `docker rmi` 删除镜像

- `docker search` 搜索镜像（远程）

  也可以在 [Docker Hub](https://hub.docker.com/) 网站上搜索镜像。

### 容器管理

> docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

- `docker run` 启动容器

- `docker start` 启动已停止的容器

- `docker stop` 停止容器

- `docker restart` 重启容器

- `docker pause` 暂停容器

- `docker unpause` 恢复容器

- `docker kill` 强制停止容器

- `docker rm` 删除容器

- `docker ps` 查看容器列表

- `docker exec` 进入容器

  通过`docker exec`命令可以进入到容器中，然后在容器中执行命令。

- `docker logs` 查看容器日志

- `docker cp` 复制文件到容器

- `docker top` 查看容器中运行的进程

- `docker run --help` 查看帮助

**示例**

```bash
docker run -it --rm -p 3331:80 <image_name>
```

- `-i` 交互式操作(保持容器开启)

- `-t` 终端，通常与`-i`一起使用

- `-p` 端口映射(主机端口:容器端口)

  通过`-p`参数可以将容器内部的端口映射到宿主机的端口上，这样就可以通过宿主机的端口访问容器内部的服务。

我们还可以添加更多的参数：

- `-v` 挂载目录

- `--name` 为容器指定名称

- `--rm` 当退出时自动移除容器

- `-d` 后台运行

### 网络管理

- `docker network ls` 列出网络列表

- `docker network inspect` 检查网络配置

- `docker network create` 创建网络

- `docker network connect` 连接容器到网络

### Compose

- `docker-compose up` 启动容器

- `docker-compose down` 停止容器

- `docker-compose build` 重新构建容器

- `docker-compose ps` 查看容器状态

- `docker-compose logs` 查看容器日志

- `docker-compose exec` 进入容器

- `docker-compose stop` 停止容器

## Docker 网络

Docker 默认有三种网络模式：

- bridge

- host

- none

## Docker Compose

`Docker Compose` 是一个用于定义和运行多容器 Docker 应用程序的工具。

每个容器都是一个服务，`docker-compose.yml` 文件定义了这些服务。

### Compose 文件

Compose 文件是一个 YAML 文件，定义了 Docker 容器的配置。

```yaml
version: "3"

services:
  web:
    build: .
    ports:
      - "5000:5000"
  redis:
    image: "redis:alpine"
```

**注意**: `docker-compose.yml` 文件必须在项目的根目录下。

每次修改文件后，都需要使用 `docker-compose build` 重新构建，以确保改变被成功应用。

## Dockerfile

### Dockerfile 指令说明简洁版

- FROM

构建镜像基于哪个镜像

- MAINTAINER

镜像维护者姓名或邮箱地址

- RUN

构建镜像时运行的指令

- CMD

运行容器时执行的 shell 环境

- VOLUME

指定容器挂载点到宿主机自动生成的目录或其他容器

- USER

为 RUN、CMD、和 ENTRYPOINT 执行命令指定运行用户

- WORKDIR

为 RUN、CMD、ENTRYPOINT、COPY 和 ADD 设置工作目录，就是切换目录

- HEALTHCHECH

健康检查

- ARG

构建时指定的一些参数

- EXPOSE

声明容器的服务端口（仅仅是声明）

- ENV

设置容器环境变量

- ADD

拷贝文件或目录到容器中，如果是 URL 或压缩包便会自动下载或自动解压

- COPY

拷贝文件或目录到容器中，跟 ADD 类似，但不具备自动下载或解压的功能

- ENTRYPOINT

运行容器时执行的 shell 命令

## 常见案例

### 从线上拉取的项目，已包含 Dockerfile 文件，该如何本地运行

1. 首先确保你已经安装了 Docker。

2. 打开命令行终端，导航到包含 Dockerfile 的项目目录。

3. 打开 Dockerfile 文件，查看它的内容，了解它是如何定义镜像的。

   主要确认下它监听的端口是多少，如果使用的是 80 端口，就可以不用管。

4. 使用`docker build`命令来构建 Docker 镜像。

   在终端中运行以下命令，将 `<image-name>` 替换为你想要为镜像命名的名称，`<path-to-dockerfile>` 替换为 Dockerfile 所在的路径（通常是当前目录）：

   ```bash
   docker build -t <image-name> <path-to-dockerfile>
   ```

   例如：

   ```bash
   docker build -t myapp .
   ```

   这将根据 Dockerfile 的定义构建一个 Docker 镜像，并将其命名为 `<image-name>`。

5. 接下来，使用`docker run`命令来运行你的 Docker 镜像。在命令中，你需要指定镜像名称、端口映射和其他选项，以便将容器与主机连接。例如：

   ```
   docker run -p 8080:80 myapp
   ```

   这将启动一个基于你的镜像的 Docker 容器，将容器的 80 端口映射到主机的 8080 端口。你可以根据需要修改端口映射。

6. 当容器运行时，你可以通过浏览器或其他 HTTP 客户端访问`http://localhost:8080`来查看应用程序，如果你的应用程序在容器中监听 80 端口的话。

   如果想把实时的改动反应到容器中，还需要挂载文件夹。

   你可以先删除之前的容器，重新使用下面的命令：

   ```bash
   # Mac
   docker run -v /Applications/MAMP/htdocs/rental:/var/www/html -p 8080:80 myapp
   ```

   注意：`/Applications/MAMP/htdocs/rental`即为包含 Dockerfile 的项目目录，你需要根据自己的目录进行修改。

   可选参数：

   `-d`: 此选项以分离模式运行容器，这意味着它在后台运行并且不会阻塞终端。

   `--name customeName`: 此选项将名称“customeName”分配给正在运行的容器。 这对于以后轻松引用容器非常有用，尤其是在停止或删除容器时。

### 清理不再需要的资源

清理所有不再使用的 Docker 资源，包括停止的容器、无用的网络、未被容器使用的卷，以及悬挂的镜像（即没有标签的镜像，通常被视为临时或中间镜像）。

```bash
docker system prune -af
```

Docker 卷是用来持久化数据的，但当相关的容器被删除后，这些卷可能不会自动删除，从而占用磁盘空间。

我们可以使用下面命令可以安全地清除那些不再连接到任何活动或存在的容器的卷。

```bash
docker volume prune -f
```

### 如何清理所有容器和镜像

**注意**: 谨慎操作！这会清除机器下所有容器或镜像

```bash
# 删除所有容器
docker rm -f $(docker ps -aq)
# 删除所有镜像
docker rmi $(docker images -q)
```
