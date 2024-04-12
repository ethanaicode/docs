# Docker 基础命令及常用案例

## Docker 镜像

### docker load 加载镜像

`docker load` < my-image.tar

### docker export 导出镜像

`docker export` 1e560fca3906 > my-image.tar

### docker run 运行镜像或者服务

> docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

`docker run` --help

docker run -p 80:8080 <image_name>

docker run -it --rm -p 3331:80 <image_name>

- -i 交互式操作 Keep STDIN open even if not attached
- -t 终端 Allocate a pseudo-TTY
- -p Publish all exposed ports to random ports

- --rm 当退出时自动移除容器

- -d 后台运行

`docker images` 查看镜像列表

`docker rmi` 删除镜像

`docker search` 搜索镜像（远程）

我们可以从 Docker Hub 网站来搜索镜像，Docker Hub 网址为： https://hub.docker.com/

我们也可以使用 docker search 命令来搜索镜像。比如我们需要一个 httpd 的镜像来作为我们的 web 服务。我们可以通过 docker search 命令搜索 httpd 来寻找适合我们的镜像。

## Docker 容器

`docker ps` 查看容器列表

display a list of all running Docker containers on your system, along with information such as the container ID, image name, and status.

`docker exec` 进入容器（重要）

> docker exec [OPTIONS] CONTAINER COMMAND [ARG...]

docker exec -it b0490d75d784 /bin/bash

可以使用`ls`来检查是否已经进入容器

```bash
# live system
docker exec -it 2387174966a0 php /home/apollo/code_repository_v2/timetracker/workers/BackgroundMailProcessor.php &

# test system
docker exec -it 06a05968e5b6 php /home/apollo/code/timetracker/workers/BackgroundMailProcessor.php &
```



## Docker 网络

`docker network ls `

列出docker网络列表

`docker network inspect bridge`

检查docker网络配置状态

bridge 为网络别名

## docker-compose

`docker-compose up/down` 组件化启动/停止

需要用到`docker-compose.yml`文件

`docker-compose build` 重新构建组件

当有更新在Dockerfile时，需要执行这条命令重新构建镜像，以确保改变被成功应用。

## Dockerfile

### Dockerfile指令说明简洁版

- FROM

构建镜像基于哪个镜像

- MAINTAINER

镜像维护者姓名或邮箱地址

- RUN

构建镜像时运行的指令

- CMD

运行容器时执行的shell环境

- VOLUME

指定容器挂载点到宿主机自动生成的目录或其他容器

- USER

为RUN、CMD、和 ENTRYPOINT 执行命令指定运行用户

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

拷贝文件或目录到容器中，如果是URL或压缩包便会自动下载或自动解压

- COPY

拷贝文件或目录到容器中，跟ADD类似，但不具备自动下载或解压的功能

- ENTRYPOINT

运行容器时执行的shell命令

## 更多命令

### docker inspect 查看底层信息（镜像/容器）

> Usage: docker inspect [OPTIONS] NAME|ID [NAME|ID...]
>
> Return low-level information on Docker objects

## 常见案例

### 一、从线上拉取的项目，已包含Dockerfile文件，该如何本地运行

1\. 首先确保你已经安装了Docker。

2\. 打开命令行终端，导航到包含Dockerfile的项目目录。

3\. 打开Dockerfile文件，查看它的内容，了解它是如何定义镜像的。

主要确认下它监听的端口是多少，如果使用的是80端口，就可以不用管。

4\. 使用`docker build`命令来构建Docker镜像。

在终端中运行以下命令，将 `<image-name>` 替换为你想要为镜像命名的名称，`<path-to-dockerfile>` 替换为Dockerfile所在的路径（通常是当前目录）：

   ```bash
   docker build -t <image-name> <path-to-dockerfile>
   ```

   例如：

   ```bash
   docker build -t myapp .
   ```

   这将根据Dockerfile的定义构建一个Docker镜像，并将其命名为 `<image-name>`。

5\. 接下来，使用`docker run`命令来运行你的Docker镜像。在命令中，你需要指定镜像名称、端口映射和其他选项，以便将容器与主机连接。例如：

```
docker run -p 8080:80 myapp
```

这将启动一个基于你的镜像的Docker容器，将容器的80端口映射到主机的8080端口。你可以根据需要修改端口映射。

6\. 当容器运行时，你可以通过浏览器或其他HTTP客户端访问`http://localhost:8080`来查看应用程序，如果你的应用程序在容器中监听80端口的话。

如果想把实时的改动反应到容器中，还需要挂载文件夹。

你可以先删除之前的容器，重新使用下面的命令：

```bash
# Mac
docker run -v /Applications/MAMP/htdocs/rental:/var/www/html -p 8080:80 myapp
```

注意：`/Applications/MAMP/htdocs/rental`即为包含Dockerfile的项目目录，你需要根据自己的目录进行修改。

可选参数：

`-d`: 此选项以分离模式运行容器，这意味着它在后台运行并且不会阻塞终端。

`--name customeName`: 此选项将名称“customeName”分配给正在运行的容器。 这对于以后轻松引用容器非常有用，尤其是在停止或删除容器时。

### 二、如何清理所有容器和镜像？

（谨慎操作！这会清除机器下所有容器或镜像）

```bash
# 删除所有容器
docker rm -f $(docker ps -aq)  
# 删除所有镜像
docker rmi $(docker images -q)
```

