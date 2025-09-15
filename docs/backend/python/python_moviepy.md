# MoviePy

> V1 文档：[MoviePy](https://zulko.github.io/moviepy/v1.0.3/)
>
> V2 文档：[UserGuide](https://zulko.github.io/moviepy/user_guide/index.html)

**MoviePy** 是一个用于视频编辑的 Python 库。它可以用于剪辑、合并、分割、加速、减速、变速、调整音量、调整亮度、调整对比度、调整饱和度、添加文本、添加图片、添加音频、添加视频、添加转场、添加特效等。

它可以读取和写入大多数视频格式，包括 `.mp4`、`.avi`、`.mov`、`.gif`、`.webm`、`.ogv`、`.mp3`、`.wav`、`.ogg` 等。

## 从 V1 到 V2

V2 版本为了让 API 更加一致，做了很多破坏性的改动，所以如果你之前使用的是 V1 版本，如果不对代码调整，可能会出现很多问题。

具体可以参考官方文档：[Updating from v1.X to v2.X](https://zulko.github.io/moviepy/getting_started/updating_to_v2.html)

以下是我总结的一些变化：

- **不需要从 moviepy.editor 导入 VideoFileClip 和 AudioFileClip**，直接从 moviepy 导入即可

- **set\_\* 改为 with\_\***，比如 `set_duration` 和 `set_position` 改为 `with_duration` 和 `with_position`

- **subclip 改为 subclipped**

## V2 版本

### V2 版本和 V1 版本命令差异速查

> AI 给的脚本通常是 V1 版本的，所以需要手动修改为 V2 版本

| V1 命令 | V2 命令 | 说明 |
| --- | --- | --- |
| `VideoFileClip.subclip` | `VideoFileClip.subclipped` | 加载视频文件 |
| `VideoFileClip.set_duration` | `VideoFileClip.with_duration` | 设置视频时长 |
| `ImageClip.set_duration` | `ImageClip.with_duration` | 设置图片时长 |
| `ImageClip.resize` | `ImageClip.resized` | 设置图片大小 |

### 快速开始

本节介绍了 MoviePy 适用的场景以及它的工作原理。

#### 我需要 MoviePy 吗？

以下是一些你可能希望在 Python 中编辑视频的理由：

- 你需要处理大量视频，或以复杂方式合成视频。

- 你希望在 Web 服务器（Django、Flask 等）上自动生成视频或 GIF。

- 你希望自动化繁琐的任务，例如插入标题、跟踪对象、剪辑场景、制作片尾字幕、添加字幕等。

- 你希望编写自己的视频特效，实现现有视频编辑软件无法完成的功能。

- 你希望使用 Python 其他库（如 Matplotlib、Mayavi、Gizeh、scikit-image）生成的图像来创建动画。

以下几种情况 **MoviePy 并不是最佳选择**：

- 你只需要逐帧进行视频分析（如人脸检测或其他高级处理）。MoviePy 可以与其他库配合完成这些任务，但更推荐使用专门的库，如 **imageio、OpenCV 或 SimpleCV**。

- 你只是想转换视频格式，或者将一系列图片合成为视频。在这种情况下，直接调用 **ffmpeg（或 avconv、mencoder 等）** 会比通过 MoviePy 更快、更节省内存。

#### 优势与限制

MoviePy 在开发时主要考虑了以下目标：

✅ **简单直观**：基本操作可以用一行代码完成，代码易学易懂，适合初学者。

✅ **灵活性高**：你可以完全控制视频和音频的每一帧，自定义特效也非常简单。

✅ **跨平台**：代码依赖常见的软件（如 Numpy 和 FFmpeg），几乎可以在任何操作系统和 Python 版本上运行。

但它也有一些 **限制**：

❌ **MoviePy 不能流式处理视频**（例如读取摄像头视频流，或在远程机器上实时渲染视频）。

❌ **MoviePy 不适用于涉及大量连续帧处理的任务**（如视频稳定化，建议使用更专业的软件）。

❌ **如果同时处理大量视频、音频和图片资源（超过 100 个），可能会遇到内存问题**。

#### 示例代码

在一个典型的 MoviePy 脚本中，你需要加载视频或音频文件，对其进行修改、合成，并将最终结果写入新的视频文件。例如，下面的代码会加载一个视频，降低音量，在前 10 秒内在视频中央添加一个标题，并将结果保存为新文件：

```python
# 导入 MoviePy 所需的所有模块
from moviepy import *

# 加载文件 example.mp4，并截取 00:00:10 到 00:00:20 之间的片段
clip = VideoFileClip("long_examples/example2.mp4").subclipped(10, 20)

# 将音量降低到原来的 80%
clip = clip.with_volume_scaled(0.8)

# 生成文本片段，可自定义字体、颜色等
txt_clip = TextClip(
    font="example.ttf", text="Big Buck Bunny", font_size=70, color="white"
)

# 让文本在屏幕中央显示 10 秒
txt_clip = txt_clip.with_position("center").with_duration(10)

# 将文本覆盖到视频片段上
video = CompositeVideoClip([clip, txt_clip])

# 将最终结果写入文件（支持多种导出选项）
video.write_videofile("result.mp4")
```

#### MoviePy 的工作原理

MoviePy 使用 **FFmpeg** 进行视频和音频文件的读取与导出。同时，它还可以（可选）使用 **ffplay** 进行视频预览。

在内部，MoviePy 依赖 **NumPy** 进行视频、音频数据的处理，并使用 **Pillow** 进行高级特效和图像增强。

#### MoviePy 的核心概念：剪辑（Clips）

MoviePy 的核心对象是 **Clip**，其中：

- **AudioClip** 代表音频元素

- **VideoClip** 代表视觉元素

剪辑（Clip）是 MoviePy 的基础单位，所有的操作都围绕它们进行。

但剪辑不仅仅可以来自视频或音频，你还可以从 **图片、文本、自定义动画、图片文件夹，甚至是简单的 Lambda 函数** 创建剪辑！

#### 创建最终视频的基本流程：

1. **加载资源**（见 [加载资源为剪辑](https://zulko.github.io/moviepy/user_guide/loading.html#loading)）

2. **修改剪辑**（见 [修改剪辑与应用特效](https://zulko.github.io/moviepy/user_guide/modifying.html#modifying)）

3. **合成多个剪辑**（见 [合成多个剪辑](https://zulko.github.io/moviepy/user_guide/compositing.html#compositing)）

4. **渲染并保存**（见 [预览与保存视频剪辑](https://zulko.github.io/moviepy/user_guide/rendering.html#rendering)）

MoviePy 提供了许多便捷的工具来简化这些步骤，并允许你通过编写自定义特效扩展功能（见 [创建自定义特效](https://zulko.github.io/moviepy/user_guide/create_effects.html#create-effects)）。

### 加载视频

### 编辑视频

#### **效果与修改的内存消耗**

当应用一个效果或修改时，MoviePy **不会立即** 对剪辑的所有帧应用效果，而是 **仅修改第一帧**。其余的帧 **只有在需要时**（即在写入整个剪辑到文件或预览时）才会被处理。

这意味着 **创建新剪辑不会消耗过多的时间或内存**，所有的计算都是在 **最终渲染** 时进行的。

#### **MoviePy 中的时间表示**

许多方法（例如 `clip.subclipped(t_start, t_end)`）需要 **持续时间（duration）** 或 **时间点（timepoint）** 作为参数，例如截取剪辑的某个时间范围。

MoviePy 支持以下多种格式来表示时间：

1. **浮点数（秒数）**
   - 例如：`2.5` 表示 2.5 秒
2. **元组（分钟, 秒）或（小时, 分钟, 秒）**
   - 例如：`(1, 30)` 表示 1 分 30 秒
   - 例如：`(0, 3, 50)` 表示 3 分 50 秒
3. **字符串格式 `'小时:分钟:秒.毫秒'`**
   - 例如：`'00:03:50.54'` 表示 3 分 50.54 秒

此外，你还可以提供 **负数时间**，表示从剪辑末尾开始计算的时间。例如：

```python
clip.subclipped(-20, -10)
```

这表示截取 **剪辑倒数 20 秒到倒数 10 秒之间的片段**。

#### 修改剪辑的方法

在 MoviePy 中，您可以通过以下三种主要方式修改剪辑：

1. **使用剪辑对象的内置方法**：这些方法通常为`with_*`，用于修改剪辑对象的属性，例如设置持续时间、调整音量、裁剪画面等。

   所有这些内置方法列表可以看 [clip](https://zulko.github.io/moviepy/reference/reference/moviepy.Clip.Clip.html#moviepy.Clip.Clip) 和 [VideoClip](https://zulko.github.io/moviepy/reference/reference/moviepy.video.VideoClip.VideoClip.html#moviepy.video.VideoClip.VideoClip)。

2. **应用内置的效果函数**：MoviePy 通过修改剪辑的帧（numpy 数组），来应用各种效果。

   要查看可用的效果列表，请参阅 [moviepy.video.fx](https://zulko.github.io/moviepy/reference/reference/moviepy.video.fx.html#module-moviepy.video.fx) 和 [moviepy.audio.fx](https://zulko.github.io/moviepy/reference/reference/moviepy.audio.fx.html#module-moviepy.audio.fx)。

   除了 MoviePy 已提供的效果外，你还可以 [创建自定义效果](https://zulko.github.io/moviepy/reference/reference/moviepy.audio.fx.html#module-moviepy.audio.fx) 并以相同的方式使用它们。

3. **使用变换函数**：通过 `transform()` 和 `time_transform()` 等方法，您可以对剪辑进行复杂的时间和空间变换。

#### 常用的视频效果

#### 编辑视频的示例

#### 常见问题

**视频输出没有声音**

目前测试有可能是因为 macOS 的 quicktime 播放器不支持某些音频编码格式，可以尝试使用 VLC 播放器。

或者输出视频时指定音频编码格式，例如：

```python
video.write_videofile("result.mp4", codec="libx264", audio_codec="aac")
```
