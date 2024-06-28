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

> 命令行选项：[ImageMagick Command-line Options](https://imagemagick.org/script/command-line-options.php)
>
> 命令行处理：[ImageMagick Command-line Processing](https://imagemagick.org/script/command-line-processing.php)
>
> （关于图片几何变换、图片编辑、图片生成、图片滤镜、图片信息等有详细介绍）

### 常用参数说明

- `-path /path/to/output`: 指定输出文件目录

- `-resize 900x385`: 调整图片大小

- `-rotate 90`: 旋转图片

- `-quality 80`: 调整图片质量

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

```bash
# 转换图片格式
magick input.jpg output.png
# 调整图片大小(50%)
magick input.jpg -resize 50% output.jpg
# 调整图片大小(指定尺寸)
magick input.jpg -resize 800x600 output.jpg
# 旋转图片
magick input.jpg -rotate 90 output.jpg
# 调整图片质量(0-100)
magick input.jpg -quality 80 output.jpg
# 创建缩略图
magick input.jpg -thumbnail 100x100 output.jpg
# 转换图片格式为ico（多尺寸）
magick 16px.png 32px.png 48px.png 128px.png -colors 256 favicon.ico
```

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

**拼接图片**（很实用！）

```bash
magick montage 1.jpg 2.jpg 3.jpg -geometry +2+2 -tile 1x3 output.jpg
```

- `-geometry +2+2`: 图片间距，没有间距则为`+0+0`
- `-tile 1x3`: 拼接方式, 1 行 3 列（如果是 1 列或者一行则为`1x/x1`）

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

#### 图片信息

```bash
magick identify input.jpg
```

### 综合案例

#### 生成图片

**生成带标题的文章首图**

```bash
# 纯色背景，标题居中
magick -size 900x385 canvas:skyblue -fill white -gravity center -pointsize 96 -annotate 0 "Hello World" output.jpg

# 渐变色背景，标题居中
magick -size 900x385 gradient:red-blue -gravity center -fill white -pointsize 96 -annotate 0 "Hello World" output.jpg
# 指定角度渐变，标题居中（先 生成渐变色图片，再旋转，再裁剪）
magick -size 1280x1280 gradient:red-blue -rotate 45 -crop 900x385+190+447 +repage -gravity center -fill white -pointsize 96 -annotate 0 "Hello World" output.jpg
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
magick input.jpg -resize 900x385^ -gravity center -extent 900x385 -gravity center -pointsize 96 -fill #474859 -font /Users/ethan/Downloads/Fonts/alibaba_v2.0/Alibaba_PuHuiTi_2.0_65_Medium_65_Medium.ttf -annotate 0 "支持中文" output.jpg
```

- `-resize 900x385^`: 指定图片尺寸，`^` 表示只缩放不拉伸

- `-gravity center -extent 900x385`: 裁剪图片（居中裁剪）
