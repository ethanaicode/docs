# 软件使用指南

> 这里主要记录我常用软件的使用方法，快捷键以及使用技巧。
>
> 软件目前主要包括设计类、开发类。

## VSCode

### 快捷键 Hotkeys

- **Command + \`** = 打开/关闭终端

- **Command + Shift + P** = 打开命令面板

- **Command + P** = 快速打开文件

**编辑**

- **Command + D** = 选中当前单词，继续按下则选中下一个相同的单词

- **Command + Shift + L** = 选中所有相同的单词

- **Option + Up/Down** = 移动当前行

- **Command + Shift + Up/Down** = 复制当前行

- **Command + Shift + K** = 删除当前行

- **Command + Enter** = 在当前行下方插入新行

- **Command + Shift + Enter** = 在当前行上方插入新行

- **Command + Shift + \\** = 跳转到匹配的括号

- **Command + \/** = 注释/取消注释当前行

- **Command + Shift + \/** = 注释/取消注释选中的代码块

- **Command + Up/Down** = 移动到文件的开头/结尾

### 使用技巧 Tips

**设置**

你可以在文件夹下面添加`.vscode`文件夹，然后在里面添加`settings.json`文件，这样就可以为当前项目设置一些单独的配置。

```json
{
  "editor.tabSize": "2"
}
```

#### 从命令行启动 VS Code

我们可以从命令行启动 VS Code 快速打开文件或文件夹。

首先需要安装 `code` 命令到 PATH 中：

- 打开 VS Code

- 打开命令面板（`Ctrl + Shift + P`）。

- 输入 `shell command` 找到 `Shell Command: Install 'code' command in PATH` 命令

然后我们就可以使用 `code` 命令来打开文件和文件夹了。

- `code -r filename` - 打开当前工作目录中的文件并保持终端窗口打开

**在 Windows 中手动添加 Path 实现命令行打开 VS Code**

1、首先找到 VS Code 安装目录，然后找到 `bin` 目录，复制路径

2、打开环境变量设置，找到 `Path`，然后添加 VS Code 的 `bin` 目录路径

3、保存后，打开命令行，输入 `code`，就可以打开 VS Code 了

#### 设置不同的开发环境配置

我们可以为不同的项目设置不同的配置，加载不同的插件，以及设置不同的主题。

1. 在 VSCode 左下角设置里面找到 `配置文件` (Profies)

2. 然后选择 `新建配置文件`，输入配置文件的名称

3. 选择从哪里复制配置文件，可以选择 `默认配置` 或者 `配置模版`

4. 创建成功后，在你的文件中就可以激活这个配置文件了

5. 激活后，你可以设置不同的插件，主题等，它会对应用这个配置的文件夹或者工作区都会生效

### 命令面板

在 VSCode 中，我们可以使用命令面板来快速执行命令，可以直接使用快捷键 `Command + Shift + P` 来打开命令面板，之后就可以输入不同的命令来执行。

#### 常用命令

- **`Tasks: Run Task`** = 运行任务

- **`CMake: Configure`** = 配置 CMake

- **`CMake: Build`** = 构建项目

#### Tasks

在 VSCode 中，我们可以使用 `Tasks` 来运行任务，比如编译代码，运行测试等。

我们可以在 `.vscode` 文件夹下创建一个 `tasks.json` 文件，然后在里面配置任务。

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "build",
      "type": "shell",
      "command": "g++",
      "args": ["-g", "main.cpp", "-o", "main"],
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
```

- `label`: 任务的名称，在选择运行任务后，会显示这个名称

- `type`: 任务的类型，可以是 `shell` 或者 `process`，这里使用 `shell`

- `command`: 要执行的命令，这里是 `g++`

- `args`: 命令的参数，其实就是每一个空格分隔的参数

- `group`: 任务的分组，这里是 `build`，并且设置为默认任务

配置好之后就可以通过 `Tasks: Run Task` 来选择并运行任务了。

### Extensions

- [Github Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

- [Dracula Official](https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula)

- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)

- [PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client)

- [PHP DocBlocker](https://marketplace.visualstudio.com/items?itemName=neilbrayfield.php-docblocker)

- [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks)

- [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)

## Postman

### Runer

在 Postman 中，我们可以使用 Runer 来批量执行 API 测试用例。

我们还可以设置脚本来处理请求和响应，以及设置环境变量。

#### Scripts

我们可以在 Postman 中设置脚本来处理请求和响应，以及设置环境变量，主要有下面两类脚本：

- **Pre-request Script** = 在请求发送之前执行的脚本

- **Post-response Script** = 在请求响应之后执行的脚本

**Snippets**

官方有提供很多脚本模板，可以直接使用。

- **`pm.*`** = Postman API

- **`pm.environment.*`** = 环境变量 API

- **`pm.request.*`** = 请求 API

- **`pm.response.*`** = 响应 API

- **`pm.test.*`** = 测试 API

**常用脚本**

- **`pm.environment.set("key", "value")`** = 设置环境变量

- **`pm.environment.get("key")`** = 获取环境变量

- **`pm.request.headers.add({key: "Content-Type", value: "application/json"})`** = 添加请求头

- **`pm.response.to.have.status(200)`** = 断言响应状态码为 200

**测试案例**

- **测试接口返回的 json 数据中 code 的值是否为 0**

  ```javascript
  pm.test("Check code is 0", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.code).to.eql(0);
  });
  ```

## Office - Excel

> 使用公式时确保单元格类型不是 text，否则公式可能不生效。

### 常用公式（函数）

- **IF** = 条件判断，如果满足条件则返回一个值，否则返回另一个值

  `IF(条件, 值1, 值2)`

  - `条件` 逻辑表达式，支持 `=, >, <, >=, <=, <>, AND, OR` 等

- **MID** = 返回文本中指定位置的字符

  `MID(文本, 起始位置, 返回字符数)`，例如：`MID("Hello", 2, 3)` 返回 `ell`

- **MOD** = 返回两数相除的余数

  `MOD(被除数, 除数)`，例如：`MOD(5, 2)` 返回 `1`

- **CONCAT** = 连接多个文本字符串

  `CONCAT(文本1, 文本2, ...)`，例如：`CONCAT(("Hello", " ", "World")` 返回 `Hello World`

- **CONCATENATE** = 连接多个文本字符串

  `CONCATENATE(文本1, 文本2, ...)`，例如：`CONCATENATE("Hello", " ", "World")` 返回 `Hello World`

  `CONCATENATE` 与 `CONCAT` 功能一样，只是 `CONCATENATE` 支持所有版本，而 `CONCAT` 只支持 2016 以上版本

- **TEXTJOIN** = 连接多个文本字符串，并可以指定分隔符

  `TEXTJOIN(分隔符, 忽略空值, 文本1, 文本2, ...)`，例如：`TEXTJOIN(" ", TRUE, "Hello", "World")` 返回 `Hello World`

### 常见案例

#### 根据身份证号判断性别

```bash
=IF(MOD(MID(A1, 17, 1), 2) = 0, "女", "男")
```

#### 根据身份证号获取生日

```bash
=DATE(MID(A1, 7, 4), MID(A1, 11, 2), MID(A1, 13, 2))
```

或者，组合成日期格式

```bash
=CONCAT(MID(A1, 7, 4), "-", MID(A1, 11, 2), "-", MID(A1, 13, 2))
```

## Typora

### Math and Academic 数学公式

相关文档：[Math](https://support.typora.io/Math/)

Typora 支持数学公式的输入，我们可以使用 LaTeX 语法来输入数学公式。

渲染过程是由 [MathJax](https://www.mathjax.org/) 来处理的。

所有支持的 TeX 命令可以在 [MathJax 官方文档](http://docs.mathjax.org/en/latest/input/tex/macros/index.html)中找到。

### Sequence Diagrams 序列图

相关文档：[Diagrams](https://support.typora.io/Draw-Diagrams-With-Markdown/)

注意事项：导出 PDF 等文件格式时并不会包含渲染好的序列图，推荐还是用图片。

## Wireshark

一款网络协议分析工具，可以用来分析网络数据包。

### 快捷键 Hotkeys

- **Ctrl + F** = 打开查找

- **Ctrl + Shift + O** = 显示包字节

### 使用技巧 Tips

#### 过滤器

Wireshark 提供了强大的过滤器功能，可以帮助我们快速定位到我们需要的数据包。

- **&&** = 逻辑与

- **||** = 逻辑或

- **ip.addr == 192.168.1.1** = 过滤出 IP 地址为 `192.168.1.1` 的数据包

- **ip.src == 192.168.1.1** = 过滤出源 IP 地址为 `192.168.1.1` 的数据包

- **ip.dst == 192.168.1.1** = 过滤出目标 IP 地址为 `192.168.1.1` 的数据包

- **tcp.port == 80** = 过滤出 TCP 端口为 `80` 的数据包

- **http** = 过滤出 HTTP 协议的数据包

  - `http.request` = 过滤出 HTTP 请求数据包

  - `http.response` = 过滤出 HTTP 响应数据包

- **ftp** = 过滤出 FTP 协议的数据包

- **tcp** = 过滤出 TCP 协议的数据包

- **udp** = 过滤出 UDP 协议的数据包

- **dns** = 过滤出 DNS 协议的数据包

- **ip** = 过滤出 IP 协议的数据包

#### 参考案例

**基础过滤**

- `http && (ip.src == 192.168.0.1 || ip.dst ==192.168.0.1 )`

  过滤出 HTTP 协议的数据包，并且源 IP 或目标 IP 为 `192.168.0.1` 的数据包

**根据域名过滤**

- `dns.qry.name == "example.com"`

  过滤出 DNS 查询域名为 `example.com` 的数据包

- `http.host == "example.com"`

  过滤出 HTTP 请求的 Host 为 `example.com` 的数据包（只有未加密的 HTTP 请求才能看到）

- `tls.handshake.extensions_server_name == "example.com"`

  过滤出 TLS 握手的域名为 `example.com` 的数据包

  对于 HTTPS 流量，只有在 TLS 握手阶段才能获取 SNI。如果通信已加密，除非使用解密密钥，否则无法直接查看明文 `Host` 信息

### 查看数据

**查看请求头/响应头**

在 Wireshark 中，我们可以查看 HTTP 数据包的请求头和响应头。

- **右键点击数据包** --> **Follow** --> **HTTP Stream**，就可以查看到请求头和响应头了。

- 或者选择数据包，分别展开 `Hypertext Transfer Protocol` --> `Request` 或 `Response`，就可以查看到请求数据包和响应数据包的相关信息。

## Adobe Photoshop

### 实用技巧 Tips

**使用通道抠图**

在 Photoshop 中，我们可以选择不同的颜色通道，来很好的获取到高光部分和阴影部分，然后再通过加大对比度，来实现抠图。

1、打开图片

2、选择通道面板，选择一个颜色通道（一般选择对比度较高的）

3、我们可以通过色阶，或者颜色减淡等工具，来调整对比度

4、按住`Ctrl`键，点击通道，就可以选择通道中的内容，此时选择的是白色部分，可以按住`Ctrl + Shift + I`，来反选

5、然后再回到图层面板，点击`新建图层蒙版`，就可以实现抠图了

### 实战参考

#### 人物精修方法

**方法一、Camera Raw 滤镜调色**

在 **滤镜** --> **Camera Raw 滤镜** 中，我们可以调整图片的色调，对比度，高光，阴影等参数，来实现图片的精修。

这里提供几套参数参考：

- **通透感** = 曝光+1，对比度-22，高光-22，白色-25

- **水面太黄** = HSL 调整，黄色：色相+55，饱和度-18，亮度+33，绿色：色相+22，饱和度-1，亮度+26

  色相的调整是为了让黄色的水往绿色方向偏移，饱和度可以随意点，明度可以让水更明亮通透

**方法二、双曲线磨皮**

比较通俗的叫法，关键的核心是建立两个图层，使用 50%灰色填充，图层叠加模式选择柔光，然后根据亮度超过 50%灰色为提亮，低于 50%灰色为阴影的原理，然后使用画笔工具，选择白色或者黑色，来进行磨皮。

需要注意的是画笔不管透明度还是硬度都要调到最低(20%左右)，然后根据人物的皮肤情况，来进行磨皮。

_优点是可以保留皮肤的纹理，缺点是比较繁琐，效率非常慢_

**方法三、液化修身**

在 **滤镜** --> **液化** 中，我们可以调整人物的身体，脸部等部位，来实现瘦身，修脸等效果。

另外，选择**人物** --> **脸部**，可以调整脸部的大小，眼睛的大小等。

## Adobe Illustrator

### 推荐设置

- **View --> Snap To Grid** = 开启对齐网格

  如果没有对齐网格，可能会导致元素对齐不准确，从而导出的图片可能会多出一些像素。

### 快捷键 Hotkeys

- **Ctrl + Shift + Alt + U** = 修改单位

### 实用技巧 Tips

**如何快速导出多个单独的对象**

可以利用“资源导出（Asset Export）”窗口来实现。

1、选中需要导出的对象

2. 打开“资源导出”窗口（`Window --> Asset Export`）

3、在窗口中，点击“+”号，添加需要导出的对象（可以以选中的对象生成单个导出对象，也可以生成多个导出对象）

4、设置导出格式、路径等参数

5、点击“Export”按钮，即可导出多个单独的对象

如果修改对象，可以直接点击“Export”按钮，就会自动更新导出的对象。

## Adobe Premiere

### 快捷键 Hotkeys

- **I / O** = 设置入点/出点

- **Ctrl + Shift + K** = 剪切

- **Ctrl + K** = 分割（小剪刀）

- **M** = 添加标记

### 使用技巧 Tips

**快速插入素材到时间轴分段素材中**

1、选中素材

2、按住`Ctrl` + `Alt`，然后拖动素材到时间轴，就可以快速插入素材到时间轴分段素材中。

## Adobe Effects

### 快捷键 Hotkeys

- **U** = 关闭/打开 关键帧

- **J / K** = 上一个关键帧/下一个关键帧

- **Ctrl + left Click 时间轴** = 显示 时间/帧

- **F9** = 关键帧缓入缓出

- **Ctrl + command + M** = 导出

### 常用表达式 Expressions

> 鼠标左键点击属性前面的小码表，调出表达式

> 可以利用效果中，表达式控制 --> 滑块控制，然后选择表达式中单个数值，拖关联器绑定到滑块控制上，就可以更加方便的修改数值，而不用点进表达式修改数值了。

**1.wiggle(0,0)**

> （频率，振幅）

常用在位置属性，可以让元素在原位置抖动。

### 效果相关

#### 1、湍流置换

> 可以实现背景的动态移动

![动画](https://ossimg.yzitc.com/2021/12/03/d2e350a44b780.gif)

在想欢动的图形上，添加湍流置换效果，调整好参数即可。

#### 2、发光效果

推荐使用插件：`Real Glow`，可以模拟出更真实的发光效果

#### 3、运动的粒子

1、先画好路径，复制曲线

2、新建灯光，命名为发射器

3、新建纯色层，添加粒子效果，然后发射器选择灯光

4、调整粒子参数，完成效果

#### 4、固定形状发射粒子

1、先画好形状，或者文字路径，然后就可以隐藏掉了。

2、新建纯色层，添加粒子效果

3、粒子发射器设置为`图层`，然后图层发射器，选为第 1 步中的那个形状。

（默认粒子颜色继承`形状`的颜色。可以在`图层RGB颜色使用`，设置为没有，这样就可以自定义颜色了）

#### 5、粒子常用参数及效果

> 发射器

- 粒子/秒 （粒子数量）

- 发射器类型 （可选灯光或者图层）

- 方向（统一/方向）

  （可以通过方向，然后调整 XYZ 旋转值，来控制粒子方向）

- 速度

- 速度从运动

  （可以影响运动扩散，越小粒子漂移的就越小，改为 0 就不会飘散了）

- 发射器尺寸

  可以选择 XYZ 独立，单独设置尺寸参数

> 粒子

- 生命 （粒子存在时间）

- 粒子类型 （可以自定义粒子形状）

  **如何自定义发射粒子:** 粒子类型选择`纹理多边形`，然后在下面纹理选择相应图层即可

  **如何自定义多个不同粒子形状:** 可以选择时间采样为`随机-静帧`，然后粒子图层里面放入多个图层粒子，每个粒子一帧即可，然后合成长度设置相应长度。

  ![image-20210719143417980](https://ossimg.yzitc.com/2021/12/03/9eeb8f592e723.png)

- 尺寸

- 透明度 （设置曲线可以让粒子闪起来）

- 颜色 （可以设置渐变）

> 物理

- 空气

  空气阻力 （可以让粒子不漂移）

> 辅助系统

- 可以实现拖尾等效果，还没搞明白

#### 6、摄像机常见设置

1、新建摄像机

2、新建空对象，然后把摄像机绑定到空对象

（按住 ALT 点击位置码表，找到螺旋图案，拖动它到空对象上即可实现绑定）

3、控制空对象，完成摄像机的运动调整

#### 7、书本翻页效果

> 使用 插件 CC PAGE TURN
>
> 这个做出的效果，页面是直接飞走了！
>
> 推荐使用 3D 形状，然后做旋转，实现页面翻页效果

#### 8、Saber

> 部分翻译（图）

![image-20210906145207970](https://ossimg.yzitc.com/2021/12/03/8bcb4ca24f86c.png)

> 推荐关键帧

![image-20210906160025403](https://ossimg.yzitc.com/2021/12/03/661750d8e3cc9.png)

![1](https://ossimg.yzitc.com/2021/12/03/6217d82a11c20.gif)

#### 9、标题背后放射扫光

![image-20220213113206236](https://ossimg.yzitc.com/2022/02/13/71f95b9f95e43.png)

使用插件：`CC Light Burst`

如果是全屏放射光，可以使用插件`CC Light Rays`

（建立一个分形杂色，然后再使用）

参考教程：[漂浮感+身后的放射光-大平幸辉摄影书](https://www.bilibili.com/video/BV1W541187Bm)

### FAQ

#### 1、如何导出 GIF

1、在导出设置中，选择`动画`，然后选择`GIF`格式

2、设置好导出参数，然后导出即可

### 2、找不到立体图层的开关

在图层面板左下角，有一个`开关`按钮，可以打开立体图层的开关。

![image-20210706170222981](https://ossimg.yzitc.com/2021/12/03/9c61b6c8079cf.png)

## Figma

### 快捷键 Hotkeys

- **Shift + R** = 打开/关闭 标尺

- **Shift + X** = 切换填充和边框颜色

- **Ctrl + Alt + C/V** = 复制/粘贴 元素样式

- **Ctrl + Y** = 路径显示

## Procreate - iPad

### 偏好设置

- 行动-->偏好设置-->手势-->一般-->禁用按键行动 = 防止手势误触操作

### 快捷操作

**画布操作**

- **双指按住画布进行旋转** = 旋转画布

**绘画操作**

- **双指点击** = 撤销(长按双指点击可以撤销多步)

- **三指点击** = 重做(长按三指点击可以重做多步)

- **三指向下滑动** = 出现选项菜单(可以复制、粘贴、剪切等)

- **四指点击** = 隐藏/显示界面

- **画笔常按单点** = 吸取颜色

- **双指打开** = 放大画布

- **双指捏合** = 缩小画布(快速捏合可以缩放到适应画布)

## Inkscape

### 快捷键 Hotkeys

- **s / F1** = Selector，选择

- **space** = 可以临时选择

- **d / F7** = 吸色笔，吸取颜色（默认填充颜色，按住 shift 为边框填色）

### 使用技巧 Tips

#### 快速复制移动元素

按住鼠标（准备拖动的状态） --> 点击空格，就会复制一份 --> 继续按住鼠标左键移动

## potplayer

### 快捷键 Hotkeys

- **tab** = 显示/隐藏 视频详情

## Youtube

### 快捷键 Hotkeys

- **K** = 暂停/播放

- **J / L** = 后退/前进 10 秒

- **I** = 小窗播放

- **T** = 电视模式（横屏）

- **C** = 打开/关闭 字幕

- **W or O** = 改变 字幕样式

- **, / .** = 后退/前进 1 帧（需要暂停）

- **\/** = 快速搜索

- **F** = 全屏

- **M** = 静音
