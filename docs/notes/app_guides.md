# 软件使用指南

> 这里主要记录我常用软件的使用方法，快捷键以及使用技巧。
>
> 软件目前主要包括设计类、开发类。

## VSCode

### 快捷键 Hotkeys

- **Command + `**: 打开/关闭终端

- **Command + Shift + P**: 打开命令面板

- **Command + P**: 快速打开文件

**编辑**

- **Command + D**: 选中当前单词，继续按下则选中下一个相同的单词

- **Command + Shift + L**: 选中所有相同的单词

- **Option + Up/Down**: 移动当前行

- **Command + Shift + Up/Down**: 复制当前行

- **Command + Shift + K**: 删除当前行

- **Command + Enter**: 在当前行下方插入新行

- **Command + Shift + Enter**: 在当前行上方插入新行

- **Command + Shift + \\**: 跳转到匹配的括号

- **Command + \/**: 注释/取消注释当前行

- **Command + Shift + \/**: 注释/取消注释选中的代码块

- **Command + Up/Down**: 移动到文件的开头/结尾

### 使用技巧 Tips

#### Launching from the command lin

We can launch VS Code from the command line to quickly open a file or folder.

We need to install the `code` command in the PATH first.

- Launch VS Code.

- Open the Command Palette (`Ctrl + Shift + P`).

- Type `shell command` to find the `Shell Command: Install 'code' command in PATH` command.

Then we can use the `code` command to open files and folders.

- `code -r filename` - Open the file in the current working directory and keep the terminal window open

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

## Wireshark

一款网络协议分析工具，可以用来分析网络数据包。

## Adobe Premiere

### 快捷键 Hotkeys

- **I / O**: 设置入点/出点

- **Ctrl + Shift + K**: 剪切

- **Ctrl + K**: 分割（小剪刀）

- **M**: 添加标记

### 使用技巧 Tips

**快速插入素材到时间轴分段素材中**

1、选中素材

2、按住`Ctrl` + `Alt`，然后拖动素材到时间轴，就可以快速插入素材到时间轴分段素材中。

## Adobe Effects

### 快捷键 Hotkeys

- **U**: 关闭/打开 关键帧

- **Ctrl + left Click 时间轴**: 显示 时间/帧

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

- **Shift + R**: 打开/关闭 标尺

- **Shift + X**: 切换填充和边框颜色

- **Ctrl + Alt + C/V**: 复制/粘贴 元素样式

- **Ctrl + Y**: 路径显示

## Inkscape

### 快捷键 Hotkeys

- **s / F1**: Selector，选择

- **space**: 可以临时选择

- **d / F7**: 吸色笔，吸取颜色（默认填充颜色，按住 shift 为边框填色）

### 使用技巧 Tips

#### 快速复制移动元素

按住鼠标（准备拖动的状态） --> 点击空格，就会复制一份 --> 继续按住鼠标左键移动
