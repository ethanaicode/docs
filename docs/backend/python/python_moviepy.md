# MoviePy

> V1 文档：[MoviePy](https://zulko.github.io/moviepy/v1.0.3/)

**MoviePy** 是一个用于视频编辑的 Python 库。它可以用于剪辑、合并、分割、加速、减速、变速、调整音量、调整亮度、调整对比度、调整饱和度、添加文本、添加图片、添加音频、添加视频、添加转场、添加特效等。

它可以读取和写入大多数视频格式，包括 `.mp4`、`.avi`、`.mov`、`.gif`、`.webm`、`.ogv`、`.mp3`、`.wav`、`.ogg` 等。

## 从 V1 到 V2

V2 版本为了让 API 更加一致，做了很多破坏性的改动，所以如果你之前使用的是 V1 版本，如果不对代码调整，可能会出现很多问题。

具体可以参考官方文档：[Updating from v1.X to v2.X](https://zulko.github.io/moviepy/getting_started/updating_to_v2.html)

以下是我总结的一些变化：

- **不需要从 moviepy.editor 导入 VideoFileClip 和 AudioFileClip**，直接从 moviepy 导入即可
