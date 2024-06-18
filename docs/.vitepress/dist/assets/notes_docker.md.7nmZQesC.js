import{_ as e,c as a,o as i,a4 as s}from"./chunks/framework.E4YCCYO0.js";const g=JSON.parse('{"title":"Docker","description":"","frontmatter":{},"headers":[],"relativePath":"notes/docker.md","filePath":"notes/docker.md","lastUpdated":1713178594000}'),l={name:"notes/docker.md"},p=s(`<h1 id="docker" tabindex="-1">Docker <a class="header-anchor" href="#docker" aria-label="Permalink to &quot;Docker&quot;">​</a></h1><h2 id="docker-镜像" tabindex="-1">Docker 镜像 <a class="header-anchor" href="#docker-镜像" aria-label="Permalink to &quot;Docker 镜像&quot;">​</a></h2><h3 id="docker-load-加载镜像" tabindex="-1">docker load 加载镜像 <a class="header-anchor" href="#docker-load-加载镜像" aria-label="Permalink to &quot;docker load 加载镜像&quot;">​</a></h3><p><code>docker load</code> &lt; my-image.tar</p><h3 id="docker-export-导出镜像" tabindex="-1">docker export 导出镜像 <a class="header-anchor" href="#docker-export-导出镜像" aria-label="Permalink to &quot;docker export 导出镜像&quot;">​</a></h3><p><code>docker export</code> 1e560fca3906 &gt; my-image.tar</p><h3 id="docker-run-运行镜像或者服务" tabindex="-1">docker run 运行镜像或者服务 <a class="header-anchor" href="#docker-run-运行镜像或者服务" aria-label="Permalink to &quot;docker run 运行镜像或者服务&quot;">​</a></h3><blockquote><p>docker run [OPTIONS] IMAGE [COMMAND] [ARG...]</p></blockquote><p><code>docker run</code> --help</p><p>docker run -p 80:8080 &lt;image_name&gt;</p><p>docker run -it --rm -p 3331:80 &lt;image_name&gt;</p><ul><li><p>-i 交互式操作 Keep STDIN open even if not attached</p></li><li><p>-t 终端 Allocate a pseudo-TTY</p></li><li><p>-p Publish all exposed ports to random ports</p></li><li><p>--rm 当退出时自动移除容器</p></li><li><p>-d 后台运行</p></li></ul><p><code>docker images</code> 查看镜像列表</p><p><code>docker rmi</code> 删除镜像</p><p><code>docker search</code> 搜索镜像（远程）</p><p>我们可以从 Docker Hub 网站来搜索镜像，Docker Hub 网址为： <a href="https://hub.docker.com/" target="_blank" rel="noreferrer">https://hub.docker.com/</a></p><p>我们也可以使用 docker search 命令来搜索镜像。比如我们需要一个 httpd 的镜像来作为我们的 web 服务。我们可以通过 docker search 命令搜索 httpd 来寻找适合我们的镜像。</p><h2 id="docker-容器" tabindex="-1">Docker 容器 <a class="header-anchor" href="#docker-容器" aria-label="Permalink to &quot;Docker 容器&quot;">​</a></h2><p><code>docker ps</code> 查看容器列表</p><p>display a list of all running Docker containers on your system, along with information such as the container ID, image name, and status.</p><p><code>docker exec</code> 进入容器（重要）</p><blockquote><p>docker exec [OPTIONS] CONTAINER COMMAND [ARG...]</p></blockquote><p>docker exec -it b0490d75d784 /bin/bash</p><p>可以使用<code>ls</code>来检查是否已经进入容器</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># live system</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> exec</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -it</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 2387174966a0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> php</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /home/apollo/code_repository_v2/timetracker/workers/BackgroundMailProcessor.php</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># test system</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> exec</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -it</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 06a05968e5b6</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> php</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /home/apollo/code/timetracker/workers/BackgroundMailProcessor.php</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;</span></span></code></pre></div><h2 id="docker-网络" tabindex="-1">Docker 网络 <a class="header-anchor" href="#docker-网络" aria-label="Permalink to &quot;Docker 网络&quot;">​</a></h2><p><code>docker network ls </code></p><p>列出 docker 网络列表</p><p><code>docker network inspect bridge</code></p><p>检查 docker 网络配置状态</p><p>bridge 为网络别名</p><h2 id="docker-compose" tabindex="-1">docker-compose <a class="header-anchor" href="#docker-compose" aria-label="Permalink to &quot;docker-compose&quot;">​</a></h2><p><code>docker-compose up/down</code> 组件化启动/停止</p><p>需要用到<code>docker-compose.yml</code>文件</p><p><code>docker-compose build</code> 重新构建组件</p><p>当有更新在 Dockerfile 时，需要执行这条命令重新构建镜像，以确保改变被成功应用。</p><h2 id="dockerfile" tabindex="-1">Dockerfile <a class="header-anchor" href="#dockerfile" aria-label="Permalink to &quot;Dockerfile&quot;">​</a></h2><h3 id="dockerfile-指令说明简洁版" tabindex="-1">Dockerfile 指令说明简洁版 <a class="header-anchor" href="#dockerfile-指令说明简洁版" aria-label="Permalink to &quot;Dockerfile 指令说明简洁版&quot;">​</a></h3><ul><li>FROM</li></ul><p>构建镜像基于哪个镜像</p><ul><li>MAINTAINER</li></ul><p>镜像维护者姓名或邮箱地址</p><ul><li>RUN</li></ul><p>构建镜像时运行的指令</p><ul><li>CMD</li></ul><p>运行容器时执行的 shell 环境</p><ul><li>VOLUME</li></ul><p>指定容器挂载点到宿主机自动生成的目录或其他容器</p><ul><li>USER</li></ul><p>为 RUN、CMD、和 ENTRYPOINT 执行命令指定运行用户</p><ul><li>WORKDIR</li></ul><p>为 RUN、CMD、ENTRYPOINT、COPY 和 ADD 设置工作目录，就是切换目录</p><ul><li>HEALTHCHECH</li></ul><p>健康检查</p><ul><li>ARG</li></ul><p>构建时指定的一些参数</p><ul><li>EXPOSE</li></ul><p>声明容器的服务端口（仅仅是声明）</p><ul><li>ENV</li></ul><p>设置容器环境变量</p><ul><li>ADD</li></ul><p>拷贝文件或目录到容器中，如果是 URL 或压缩包便会自动下载或自动解压</p><ul><li>COPY</li></ul><p>拷贝文件或目录到容器中，跟 ADD 类似，但不具备自动下载或解压的功能</p><ul><li>ENTRYPOINT</li></ul><p>运行容器时执行的 shell 命令</p><h2 id="更多命令" tabindex="-1">更多命令 <a class="header-anchor" href="#更多命令" aria-label="Permalink to &quot;更多命令&quot;">​</a></h2><h3 id="docker-inspect-查看底层信息-镜像-容器" tabindex="-1">docker inspect 查看底层信息（镜像/容器） <a class="header-anchor" href="#docker-inspect-查看底层信息-镜像-容器" aria-label="Permalink to &quot;docker inspect 查看底层信息（镜像/容器）&quot;">​</a></h3><blockquote><p>Usage: docker inspect [OPTIONS] NAME|ID [NAME|ID...]</p><p>Return low-level information on Docker objects</p></blockquote><h2 id="常见案例" tabindex="-1">常见案例 <a class="header-anchor" href="#常见案例" aria-label="Permalink to &quot;常见案例&quot;">​</a></h2><h3 id="一、从线上拉取的项目-已包含-dockerfile-文件-该如何本地运行" tabindex="-1">一、从线上拉取的项目，已包含 Dockerfile 文件，该如何本地运行 <a class="header-anchor" href="#一、从线上拉取的项目-已包含-dockerfile-文件-该如何本地运行" aria-label="Permalink to &quot;一、从线上拉取的项目，已包含 Dockerfile 文件，该如何本地运行&quot;">​</a></h3><p>1. 首先确保你已经安装了 Docker。</p><p>2. 打开命令行终端，导航到包含 Dockerfile 的项目目录。</p><p>3. 打开 Dockerfile 文件，查看它的内容，了解它是如何定义镜像的。</p><p>主要确认下它监听的端口是多少，如果使用的是 80 端口，就可以不用管。</p><p>4. 使用<code>docker build</code>命令来构建 Docker 镜像。</p><p>在终端中运行以下命令，将 <code>&lt;image-name&gt;</code> 替换为你想要为镜像命名的名称，<code>&lt;path-to-dockerfile&gt;</code> 替换为 Dockerfile 所在的路径（通常是当前目录）：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">image-nam</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">path-to-dockerfil</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><p>例如：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myapp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .</span></span></code></pre></div><p>这将根据 Dockerfile 的定义构建一个 Docker 镜像，并将其命名为 <code>&lt;image-name&gt;</code>。</p><p>5. 接下来，使用<code>docker run</code>命令来运行你的 Docker 镜像。在命令中，你需要指定镜像名称、端口映射和其他选项，以便将容器与主机连接。例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker run -p 8080:80 myapp</span></span></code></pre></div><p>这将启动一个基于你的镜像的 Docker 容器，将容器的 80 端口映射到主机的 8080 端口。你可以根据需要修改端口映射。</p><p>6. 当容器运行时，你可以通过浏览器或其他 HTTP 客户端访问<code>http://localhost:8080</code>来查看应用程序，如果你的应用程序在容器中监听 80 端口的话。</p><p>如果想把实时的改动反应到容器中，还需要挂载文件夹。</p><p>你可以先删除之前的容器，重新使用下面的命令：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Mac</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -v</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /Applications/MAMP/htdocs/rental:/var/www/html</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 8080:80</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myapp</span></span></code></pre></div><p>注意：<code>/Applications/MAMP/htdocs/rental</code>即为包含 Dockerfile 的项目目录，你需要根据自己的目录进行修改。</p><p>可选参数：</p><p><code>-d</code>: 此选项以分离模式运行容器，这意味着它在后台运行并且不会阻塞终端。</p><p><code>--name customeName</code>: 此选项将名称“customeName”分配给正在运行的容器。 这对于以后轻松引用容器非常有用，尤其是在停止或删除容器时。</p><h3 id="二、如何清理所有容器和镜像" tabindex="-1">二、如何清理所有容器和镜像？ <a class="header-anchor" href="#二、如何清理所有容器和镜像" aria-label="Permalink to &quot;二、如何清理所有容器和镜像？&quot;">​</a></h3><p>（谨慎操作！这会清除机器下所有容器或镜像）</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 删除所有容器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> $(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ps </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-aq</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 删除所有镜像</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rmi</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> $(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> images </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-q</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">)</span></span></code></pre></div>`,95),t=[p];function o(r,h,k,n,d,c){return i(),a("div",null,t)}const F=e(l,[["render",o]]);export{g as __pageData,F as default};