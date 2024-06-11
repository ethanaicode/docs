# Command-Line Tools Usage Guide

## FFmpeg

> 官方文档：[FFmpeg Documentation](https://ffmpeg.org/documentation.html)

### 常用案例

#### 转 MP4 视频为音频 AAC 或者 MP3

**Convert to AAC**

```bash
ffmpeg -i input.mp4 -vn -acodec aac output.aac
```

- `-i input.mp4`: 指定输入文件。
- `-vn`: 取消视频流，只保留音频流。
- `-acodec aac`: 指定音频编码格式为 AAC。
- `output.aac`: 指定输出文件。

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

- `-vf scale=-1:360`: 使用视频滤镜来缩放视频。宽度设置为 `-1` 以保持纵横比，同时将高度设置为 `360` 像素。

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

### 常用案例

#### 基础操作

```bash
# 转换图片格式
magick input.jpg output.png
# 转换图片格式为ico
magick 16px.png 32px.png 48px.png 128px.png -colors 256 favicon.ico
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
```

如果要指定源文件目录，可以使用命令：

```bash
magick -path /path/to/output input.jpg output.png
```

#### 编辑图片

**裁剪图片**

```bash
magick input.jpg -crop 800x600+100+100 output.jpg
```

- `800x600`: 裁剪的宽高。
- `+100+100`: 裁剪的起始坐标。

也可以从中心裁剪：

```bash
magick input.jpg -gravity center -crop 800x600+0+0 output.jpg
```

**添加文字**

```bash
magick input.jpg -fill white -pointsize 40 -annotate +100+100 "Hello World" output.jpg
```

- `-fill white`: 文字颜色。
- `-pointsize 40`: 文字大小。
- `-annotate +100+100 "Hello World"`: 文字内容和位置。

**拼接图片**

```bash
magick montage 1.jpg 2.jpg 3.jpg -geometry +2+2 -tile 1x3 output.jpg
```

- `-geometry +2+2`: 图片间距。
- `-tile 1x3`: 拼接方式, 1 行 3 列。

#### 图片滤镜

**模糊图片**

```bash
magick input.jpg -blur 0x8 output.jpg
```

- `-blur 0x8`: 模糊程度。

**灰度化**

```bash
magick input.jpg -colorspace Gray output.jpg
```

**反色**

```bash
magick input.jpg -negate output.jpg
```

**边缘检测**

边缘检测是一种常见的图像处理技术，用于检测图像中的边缘。

```bash
magick input.jpg -edge 1 output.jpg
```

**应用深褐色滤镜**

```bash
magick input.jpg -sepia-tone 80% output.jpg
```

## gifski

> 官方文档：[gifski](https://gif.ski/)

gifski 是一款用于将视频转换为 GIF 的工具，支持高质量的输出。

### 使用方法

支持从 PNG 或者 YUV4MPEGPIPE 格式的输入文件生成 GIF。

如果是从 PNG 帧生成 GIF，首先需要用 `ffmpeg` 将视频转换为 PNG 帧：

```bash
ffmpeg -i input.mp4 frame%04d.png
```

然后使用 `gifski` 将 PNG 帧转换为 GIF：

```bash
gifski frame*.png -o output.gif
```

**优化 GIF 文件大小**

了获得更小的文件大小，你可以尝试以下方法：

- 使用`--width`和`--height`参数来缩小动画尺寸，这对减小文件大小最为有效。
- 通过`--quality=80`（或更低的数值）降低整体质量。你还可以进一步调整质量参数，如：
  - `--lossy-quality=60`：降低值会使动画更嘈杂/颗粒感，但可以减小文件大小。
  - `--motion-quality=60`：降低值可能导致运动帧中出现涂抹或条纹，但同样可以减小文件大小。
