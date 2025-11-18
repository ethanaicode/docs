# Command-Line Tools Usage Guide

## FFmpeg

> 官方文档：[FFmpeg Documentation](https://ffmpeg.org/documentation.html)

### 常用方法

#### 转 MP4 视频为音频 AAC 或者 MP3

**Convert to AAC**

```bash
ffmpeg -i input.mp4 -vn -acodec aac output.aac
```

- `-i input.mp4`: 指定输入文件
- `-vn`: 取消视频流，只保留音频流
- `-acodec aac`: 指定音频编码格式为 AAC
- `output.aac`: 指定输出文件

**Convert to MP3**

```bash
ffmpeg -i input.mp4 -vn -acodec mp3 output.mp3
```

#### 修改 MP4 视频的分辨率

```bash
ffmpeg -i input.mp4 -vf scale=-1:360 output_360p.mp4
```

或者使用 `s` 参数：

```bash
ffmpeg -i input.mp4 -s 640x360 output_360p.mp4
```

- `-vf scale=-1:360`: 使用视频滤镜来缩放视频。宽度设置为 `-1` 以保持纵横比，同时将高度设置为 `360` 像素

#### 视频格式之间转换

```bash
ffmpeg -i input.mp4 output.avi
ffmpeg -i input.avi output.mp4
ffmpeg -i input.mp4 output.mkv
```

#### 视频剪切

```bash
ffmpeg -i input.mp4 -ss 00:00:10 -t 00:00:30 -c copy output.mp4
```

## imagemagick

> v7 使用说明： [ImageMagick Version 7](https://usage.imagemagick.org/)
>
> 颜色修改： [ImageMagick Examples -- Color Modifications](https://usage.imagemagick.org/color_mods/)
>
> 命令行选项： [ImageMagick Command-line Options](https://imagemagick.org/script/command-line-options.php)
>
> 命令行处理： [ImageMagick Command-line Processing](https://imagemagick.org/script/command-line-processing.php)
>
> _关于图片几何变换、图片编辑、图片生成、图片滤镜、图片信息等有详细介绍_

### 常用参数说明

- `-path /path/to/output`: 指定输出文件目录

- `-resize 900x385`: 调整图片大小

- `-rotate 90`: 旋转图片

- `-flip`: 水平翻转图片

- `-flop`: 垂直翻转图片

- `-quality 80`: 调整图片质量

- `-tile 1x3`: 拼接方式

- `-thumbnail 100x100`: 创建缩略图

- `-crop 800x600+100+100`: 裁剪图片

  （800x600 表示裁剪尺寸，+100+100 表示裁剪起始位置）

- `-pointsize 48`: 文字大小

- `-fill white`: 文字颜色

- `-gravity center`: 文字位置居中

- `-font /path/to/font.ttf`: 指定字体（中文时通常都需要指定）

- `-annotate 0 "Your Title"`: 添加文字

  （数字表示文字旋转角度，0 表示水平）

- `-extent 900x385`: 裁剪图片

如果插入文字时，特别是中文时，可能会出现乱码，可以通过设置字体来解决：

### 基础案例

#### 基础操作

_网上很多教程在转换图片时使用的是 `magick convert` 命令，但是在新版本中，`magickconvert` 命令已经被废弃，取而代之的是 `magick` 命令_

- `magick identify input.jpg`: 查看图片信息

- `magick input.jpg output.jpg`: 转换图片格式

- `magick input.jpg -resize 50% output.jpg`: 调整图片大小（50%）

- `magick input.jpg -resize 800x600 output.jpg`: 调整图片大小（指定尺寸）

- `magick input.jpg -rotate 90 output.jpg`: 旋转图片

- `magick input.jpg -flip output.jpg`: 水平翻转图片

- `magick input.jpg -flop output.jpg`: 垂直翻转图片

- `magick input.jpg -quality 80 output.jpg`: 调整图片质量（0-100）

- `magick input.jpg -thumbnail 100x100 output.jpg`: 创建缩略图

#### 批量对目录中的所有图片进行转换

可以直接使用循环命令来批量转换图片格式：

```bash
mkdir -p output
for img in *.png; do
  magick "$img" "output/${img%.png}.jpg"
done
```

- `mkdir -p output`: 创建输出目录

- `for img in *.png; do ... done`: 遍历当前目录下所有的 png 图片

#### 从 ico 图标中提取图片

可以直接将 ico 图标转成 png 图片，如果是图片集的话，会生成多张图片：

```bash
magick favicon.ico output.png
```

#### 将多张图片转成 ico 图标

> ico 图标在 Windows 上会缓存，所以如果修改了图标，可能需要清空缓存或者新的文件名，才能看到变化。

可以只准备一张图片，然后通过 `-define icon:auto-resize` 参数来生成多尺寸的图标：

```bash
magick input.png -define icon:auto-resize=256,128,96,64,48,32,16 favicon.ico
```

- `-define icon:auto-resize=256,128,96,64,48,32,16`: 指定尺寸

或者自己准备多张图片，然后合成：

```bash
magick 16px.png 32px.png 48px.png 128px.png -colors 256 favicon.ico
```

- `-colors 256`: 指定颜色数量（可选参数，加上这个参数会使得图标文件更小，但可能会有颜色损失）

**如果是 MacOS 系统，需要的是 icns 格式的图标**

这个无法直接通过 ImageMagick 来生成，如果是 macOS 系统，可以通过`iconutil`命令来生成：

```bash
iconutil -c icns icon.iconset
```

- `-c icns`: 指定输出格式为 icns

- `icon.iconset`: 指定输入文件夹（文件夹中包含多张图片，分别是不同尺寸的图标）

  这个文件夹后缀名（扩展名）是固定的，不允许更改

可以通过下面命令快速生成一组符合要求的图标：

```bash
mkdir icon.iconset \
&& magick input.png -resize 512x512 icon.iconset/icon_512x512.png \
&& magick input.png -resize 256x256 icon.iconset/icon_256x256.png \
&& magick input.png -resize 128x128 icon.iconset/icon_128x128.png \
&& magick input.png -resize 64x64 icon.iconset/icon_64x64.png \
&& magick input.png -resize 32x32 icon.iconset/icon_32x32.png \
&& magick input.png -resize 16x16 icon.iconset/icon_16x16.png \
&& magick input.png -resize 1024x1024 icon.iconset/icon_512x512@2x.png \
&& magick input.png -resize 512x512 icon.iconset/icon_256x256@2x.png \
&& magick input.png -resize 256x256 icon.iconset/icon_128x128@2x.png \
&& magick input.png -resize 128x128 icon.iconset/icon_64x64@2x.png \
&& magick input.png -resize 64x64 icon.iconset/icon_32x32@2x.png \
&& magick input.png -resize 32x32 icon.iconset/icon_16x16@2x.png
```

另外 Apple 官方也提供了模版，可以直接去下载：[Apple Design Resources](https://developer.apple.com/design/resources/#macos-apps)

下载后，修改文件，直接选择生成元素也可以快速生成需要的尺寸文件。

#### 图片序列转动图

首先需要准备好一系列的图片，确保名字在字典序下是有序的。

```bash
magick -delay 10 -loop 0 *.png output.gif
```

- `-delay 10`: 每帧之间的延迟时间。单位是 1/100 秒。（如果每秒 25 帧，那么延迟时间就是 4ms）

- `-loop 0`: 循环次数，0 表示无限循环

_实测参数需要写在前面，否则参数可能无效。_

#### 编辑图片

**裁剪图片**

```bash
magick input.jpg -crop 800x600+100+100 output.jpg
```

也可以从中心裁剪：

```bash
magick input.jpg -gravity center -crop 800x600+0+0 output.jpg
```

**添加文字**

```bash
magick input.jpg -fill white -pointsize 40 -annotate +100+100 "Hello World" output.jpg
```

**拼接图片**

<u>可以使用 `montage` 命令，可以将多张图片拼接在一起。</u>

可以利用这个来生成图片序列帧，或者将多张图片拼接成一张图片。

常用到的参数有：

- `-geometry +2+2`: 图片间距，没有间距则为`+0+0`

- `-tile 1x3`: 拼接方式, 1 行 3 列（如果是 `1x` 表示 1 列， `x1` 表示 1 行）

比如我们横向拼接三张图片：

```bash
magick montage 1.jpg 2.jpg 3.jpg -geometry +2+2 -tile 1x3 output.jpg
```

如果要保持透明度，可以使用 `-background none` 参数：

```bash
magick montage 1.png 2.png 3.png -geometry +2+2 -tile 1x3 -background none output.png
```

如果想要修改拼接后的图片尺寸，可以修改 `-geometry` 参数：

```bash
magick montage 1.jpg 2.jpg 3.jpg -geometry 800x600+2+2 -tile 1x3 output.jpg
```

要注意的是，尺寸变小，由于压缩算法以及存储格式的不同，文件大小可能会更大（虽然这有点反直觉，但，是的，我测试后就是会这样）。

#### 图片生成

**生成纯色图片**

```bash
magick -size 800x600 canvas:skyblue output.jpg
# 或者
magick -size 800x600 xc:skyblue output.jpg
```

**生成渐变色图片**

```bash
magick -size 800x600 gradient:red-blue output.jpg
```

#### 图片滤镜

**模糊图片**

```bash
magick input.jpg -blur 0x8 output.jpg
```

- `-blur 0x8`: 模糊程度，0x8 表示水平方向模糊 0 像素，垂直方向模糊 8 像素

**灰度化**

```bash
magick input.jpg -colorspace Gray output.jpg
```

**反色**

```bash
magick input.jpg -negate output.jpg
```

**边缘检测**

边缘检测是一种常见的图像处理技术，用于检测图像中的边缘，并将其突出显示。
（就是会显示出边缘，常用于图像识别）

```bash
magick input.jpg -edge 1 output.jpg
```

**应用深褐色滤镜**

```bash
magick input.jpg -sepia-tone 80% output.jpg
```

### 综合案例

#### 图片排版

**拼接图片序列帧**

```bash
magick montage comp_*.png -tile 1x -geometry 800x+0+0 -background none ../vector_ae_v1_alpha_output.png
```

- 表示将所有以`comp_`开头的 png 图片拼接成一张图片（单列），图片宽度为 800，高度自适应，间距为 0，背景透明

#### 生成图片

**生成带标题的文章首图**

```bash
# 纯色背景，标题居中
magick -size 900x385 canvas:skyblue -gravity center -fill white -pointsize 96 -annotate 0 "Hello World" output.jpg
# 渐变色背景，标题居中
magick -size 900x385 gradient:#4facfe-#00f2fe -gravity center -fill white -pointsize 96 -annotate 0 "Hello World" output.jpg
# 指定角度渐变，标题居中（先 生成渐变色图片，再旋转裁剪）
magick -size 1280x1280 gradient:#4facfe-#00f2fe -rotate 90 -crop 900x385+190+447 +repage -gravity center -fill white -pointsize 96 -annotate 0 "Hello World" output.jpg
```

**生成渐变色的标题文字**

需要先生成渐变色图片，再通过文字剪切 mask 来生成渐变色的文字，最后合成到最终图片。

```bash
# 生成渐变色图片
magick -size 900x100 gradient:red-blue gradient.png
# 生成文字 mask
magick -size 900x100 xc:none -gravity center -fill black -pointsize 96 -annotate 0 "Hello World" mask.png
# 通过文字 mask 和渐变色图片，生成渐变色文字
magick gradient.png mask.png -compose CopyOpacity -composite gradient_text.png
# 生成最终图片
magick -size 900x385 canvas:white gradient_text.png -gravity center -composite output.jpg
```

#### 编辑图片

**修改图片尺寸并添加文字标题**

```bash
magick input.jpg -resize 900x385^ -gravity center -extent 900x385 -gravity center -pointsize 96 -fill #474859 -annotate 0 "Hello World" output.jpg
```

- `-resize 900x385^`: 指定图片尺寸，`^` 表示只缩放不拉伸

- `-gravity center -extent 900x385`: 裁剪图片（居中裁剪）

#### 图像着色

图片着色有多种方式，可以通过颜色映射、颜色填充、颜色调整等方式来实现。

**-level-colors**

类似 PS 中的 `渐变映射`，可以将灰度图映射到指定的颜色范围。

`-level-colors` 用于 **基于灰度值对图像进行颜色映射**，通过设置两个颜色值（暗部和亮部），将灰度图的黑色和白色分别映射到新的颜色范围，同时根据图像的灰度值进行插值。

`-level-colors` 接受一个或者两个颜色值，第一个颜色值是暗部颜色，第二个颜色值是亮部颜色。

- 将输入灰度图的 **最暗颜色**（0% 灰度）映射到指定的第一个颜色。

- 将输入灰度图的 **最亮颜色**（100% 灰度）映射到指定的第二个颜色（若未指定则为透明或默认白色）。

- 中间的灰度值会线性插值，生成过渡的颜色范围。

如现在有一个黑白背景图，主色调为黑色，我可以通过 `-level-colors` 来将黑色映射到绿色，生成一个绿色背景的图片：

```bash
magick input.png +level-colors "#536a49," -gravity center -fill white -pointsize 96 -annotate 0 "#Hello World" output.jpg
```

**-fill \<color\> -tint \<percent\>**

`-fill <color> -tint <percent>` 用于将指定颜色填充到图像中，同时通过 **结合原图像的亮度信息** 来生成最终效果。

简单来说，它会以指定颜色为基准，根据图像亮度调整颜色强度。

- `-fill` 用于指定填充的主色调，`-tint` 用于指定颜色按一定比例覆盖在图片上。

- 原图像亮度影响覆盖结果，更亮的部分叠加后的颜色更接近指定色调的高亮色，更暗的部分叠加后接近主色调的深色版本。

```bash
magick input.png -colorspace Gray -fill "#536a49" -tint 100 output.jpg
```

- 这里通过 `-colorspace Gray` 将图片转为灰度图，然后将灰度图的颜色映射到指定颜色，生成最终图片。

- 100% 的 `-tint` 表示完全使用指定颜色着色，但仍保留原图像的亮度和对比度信息。

- 比 50% 灰度更亮的区域会显得更亮，比 50% 灰度更暗的区域会显得更暗。

## Rclone

### 开始使用

#### 安装 rclone

- 如果是 `Linux/macOS/BSD` 系统，可以直接使用脚本安装：

  ```bash
  sudo -v ; curl https://rclone.org/install.sh | sudo bash
  ```

  _执行时会下载 zip 文件（检查脚本可知），速度较慢且没有提示 :(，需要耐心等待下_

- 如果需要安装 `beta` 版本，可以使用下面的命令：

  ```bash
  sudo -v ; curl https://rclone.org/install.sh | sudo bash -s beta
  ```

- 如果是 `Windows` 系统，可以下载安装包进行安装：

  [rclone downloads](https://rclone.org/downloads/)

#### 配置 rclone

> 官方文档: [Usage](https://rclone.org/docs/)

最简单的配置方法是使用 `rclone config` 命令，会进入交互式配置界面，可以按照自己需求进行配置。

交互式配置完成后就会生成一个配置文件，当然你也可以直接自己手动创建配置文件，路径为：

- Windows: `%APPDATA%/rclone/rclone.conf`

- MacOS 或者其它: `~/.config/rclone/rclone.conf`

以下是常见平台的示例：

**Cloudflare R2**

官方文档：[Configure rclone](https://developers.cloudflare.com/r2/examples/rclone/)

参考配置文件示例：

```ini
# ~/.config/rclone/rclone.conf
[r2]
type = s3
provider = Cloudflare
access_key_id = XXX
secret_access_key = XXX
endpoint = https://XXX.r2.cloudflarestorage.com
```

_`r2` 为别名，可以自定义_

### 常用命令

> `remote` 表示配置中的别名，如 `r2`
>
> `bucket` 表示远程存储桶名称，如 `my-bucket`

- `rclone config`: 进入 rclone 配置界面

- `rclone config file`: 查看 rclone 配置文件路径

  `rclone config show`: 查看当前 rclone 配置

- `rclone tree remote:bucket`: 查看存储桶中的文件列表

- `rclone ls remote:bucket`: 查看存储桶中的文件列表（不带目录）

- `rclone lsd remote:bucket`: 查看存储桶中的目录列表

- `rclone copy /path/to/file remote:bucket -P` : 上传文件到存储桶

  - `rclone copy /path/to/file remote:bucket/path -P` 上传文件到存储桶的<u>指定目录</u>（目录不存在会自动创建）

  - `-P` 参数可以显示上传进度（可选参数，推荐加上，不然网络慢的话会以为卡了）

  - 如果本地文件路径为目录，则会上传整个目录下所有文件

- `rclone copy remote:bucket /path/to/directory`: 下载文件到本地

- `rclone sync /path/to/directory remote:bucket`: 同步本地目录到存储桶

  - `rclone sync remote:bucket /path/to/directory`: 同步存储桶到本地目录

- `rclone delete remote:bucket`: 删除存储桶中的文件
 
  - `rclone delete remote:bucket --dry-run`: 查看删除文件列表，不实际删除（强烈推荐）

  - `rclone delete remote:bucket/file`: 删除存储桶中的指定文件

  - `rclone delete /path/to/directory`: 删除本地目录中的文件

  - `rclone delete /path/to/file`: 删除本地目录中的指定文件

- `rclone mkdir remote:bucket/directory`: 手动在存储桶中创建目录（不常用，可以直接上传文件时指定目录）

- ~~`rclone purge remote:bucket`: 清空存储桶中的所有文件~~

  ~~⚠️ 可能也包括桶本身，我宁愿不知道这个命令~~

- `rclone check remote:bucket /path/to/directory`: 检查存储桶和本地目录中的文件是否一致

- `rclone size remote:bucket`: 查看存储桶的大小

- `rclone size /path/to/directory`: 查看本地目录的大小

## ossutil

ossutil2.0 是阿里云OSS命令行工具，支持多种操作，如上传、下载、删除、同步等。它提供了丰富的参数选项，可以满足不同场景的需求。同时，ossutil还支持多线程并发操作，提高了效率。使用ossutil可以方便地管理阿里云OSS中的文件和目录。

### 注意事项

- ossutil 执行时，默认会在当前目录创建 `ossutil_output` 目录，如果你是在一个不可创建目录的位置执行 `ossutil` 命令，会产生报错：`Error: mkdir ossutil_output: operation not permitted`

  这个错误不容易从文档中发现，联系官方技术才得知，可以通过命令 `--output-dir` 来指定其它目录。

### 配置文件

默认配置文件位置。为：`~/.ossutilconfig`

下面是一个最基础的配置文件：

```
[default]
accessKeyID="your-access-key-id"
accessKeySecret="your-access-key-secret"
region=cn-shanghai
endpoint=https://oss-cn-shanghai.aliyuncs.com
```

### 常用命令

```bash
# 列出所有 bucket
ossutil ls
# 列出 bucket 下的某个目录
ossutil ls oss://bucket/path/to/directory
# 上传文件
ossutil cp /path/to/file oss://bucket[/path/to/directory/]
# 递归上传整个目录中的所有文件（-f 不询问是否覆盖）
ossutil cp -rf /path/to/LocalFolder oss://bucket[/path/to/directory/]
# 递归上传整个目录中的所有文件（排除部分文件）
ossutil cp -rf /path/to/LocalFolder oss://bucket[/path/to/directory/] -exclude '.DS_Store'