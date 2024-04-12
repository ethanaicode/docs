# FPDF Documentation

> http://www.fpdf.org/

**文字乱码解决：（使用 iconv转换）**

$content = iconv('UTF-8', 'windows-1252', $content);

**最简单的案例：**

```php
<?php
require('fpdf.php');    // 等同于 $pdf = new FPDF('P','mm','A4');

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial','B',16);
$pdf->Cell(40,10,'Hello World!');  // 矩形画布
$pdf->Output();
?>
```

### __construct --> 初始化

> __construct([**string** orientation [, **string** unit [, **mixed** size]]])

方向（P竖版，L横版）、单位（点、毫米、厘米、英寸）、大小（A3、A4、A5...或者包含长宽的数组）

例如：

```php
$pdf = new FPDF('P', 'mm', array(100,150));
```

### [Cell](http://www.fpdf.org/en/doc/cell.htm) --> 画布

> Cell(**float** w [, **float** h [, **string** txt [, **mixed** border [, **int** ln [, **string** align [, **boolean** fill [, **mixed** link]]]]]]])

- 长、宽、文字内容、边框、 **结束符**、对齐、填充、**链接**

打印具有可选边框、背景颜色和字符串的单元格（矩形区域）。

单元格的左上角对应于当前位置。

文本可以对齐或居中。调用后，当前位置向右移动或移动到下一行。

可以在文本上放置一个链接。

如果启用了自动分页并且单元格超出限制，则在输出之前完成分页。

### [MultiCell](http://www.fpdf.org/en/doc/multicell.htm) --> 多画布

> MultiCell(**float** w, **float** h, **string** txt [, **mixed** border [, **string** align [, **boolean** fill]]])

允许输出带有换行符的文本。

支持自动换行或者手动(\n)换行，支持文本的对齐，单元格的边框及背景。

## Params 参数

- `w`

  单元格的宽度。如果`0`，它们会延伸到页面的右边距。

- `h`

  单元格的高度。

- `txt`

  要打印的字符串。

- `border`

  指示是否必须在单元格块周围绘制边框。该值可以是数字：`0`： 无边界`1`： 框架或包含以下部分或全部字符的字符串（以任何顺序）：`L`： 左边`T`： 顶部`R`： 正确的`B`： 底部默认值：`0`。

- `align`

  设置文本对齐方式。可能的值是：`L`: 左对齐    `C`： 中心    `R`: 右对齐    `J`: 理由（默认值）

- `fill`

  指示是否必须绘制单元格背景 ( `true`) 或透明 ( `false`)。默认值：`false`。

### [Text](http://www.fpdf.org/en/doc/text.htm) --> 输出字符串

> Text(float x, float y, string txt)

此方法允许将字符串精确地放置在页面上。

但通常使用打印文本的标准方法 Cell()、MultiCell() 或 Write() 更容易。

### [Write](http://www.fpdf.org/en/doc/write.htm) --> 输出文字

> Write(**float** h, **string** txt [, **mixed** link])

从当前位置输出文字，可以自动换行。

方法退出时，**当前位置保留在文本的末尾。**

推荐用来设置超链接。

```php
// Begin with regular font
$pdf->SetFont('Arial', '', 14);
$pdf->Write(5, 'Visit ');
// Then put a blue underlined link
$pdf->SetTextColor(0, 0, 255);
$pdf->SetFont('', 'U');
$pdf->Write(5, 'www.fpdf.org', 'http://www.fpdf.org');
```

### [Image](http://www.fpdf.org/en/doc/image.htm) --> 输出图片

> Image(**string** file [, **float** x [, **float** y [, **float** w [, **float** h [, **string** type [, **mixed** link]]]]]])

 file 文件支持插入本地图片，或者图片url

type 类型支持：`JPG`, `JPEG`, `PNG` and `GIF `

### Line --> 画一条线

> Line(**float** x1, **float** y1, **float** x2, **float** y2)

### [Rect](http://www.fpdf.org/en/doc/rect.htm) --> 画一个矩形

> Rect(**float** x, **float** y, **float** w, **float** h [, **string** style])

style可以是描边D或者填充F。

### SetLineWidth --> 设置线条宽度

> SetLineWidth(**float** width)

### [SetDrawColor](http://www.fpdf.org/en/doc/setdrawcolor.htm) --> 设置画笔颜色

> SetDrawColor(**int** r [, **int** g, **int** b])

### [SetFillColor](http://www.fpdf.org/en/doc/setfillcolor.htm) --> 设置填充颜色

> SetFillColor(int r [, int g, int b])

### [SetFont](http://www.fpdf.org/en/doc/setfont.htm) --> 设置字体

> SetFont(**string** family [, **string** style [, **float** size]])

核心字体包括：`courier`,  `helvetica`,  `times`,  `symbol`,  `zapfdingbats`

### [SetTextColor](http://www.fpdf.org/en/doc/settextcolor.htm) --> 设置字体颜色

> SetTextColor(**int** r [, **int** g, **int** b])

### [SetFontSize](http://www.fpdf.org/en/doc/setfontsize.htm) --> 设置字体大小

> SetFontSize(**float** size)

### [SetXY](http://www.fpdf.org/en/doc/setxy.htm) --> 设置XY的位置

> SetXY(**float** x, **float** y)

定义当前位置的横坐标和纵坐标。如果传递的值为负数，则它们分别相对于页面的右侧和底部。

### Ln --> 换行

> Ln([**float** h])

回到下一行的开头。（下一行的高度）

### AddLink --> 添加页面跳转

可以用来跳转到其它页面。

跳转的位置需要配合`SetLink`来设置。

### SetLink --> 设置页面跳转

> SetLink(**int** link [, **float** y [, **int** page]])

链接、目标位置、目标页

例如：

```php
// First page
$pdf->AddPage();
$link = $pdf->AddLink();
$pdf->Write(5,'here',$link);

// Second page
$pdf->AddPage();
$pdf->SetLink($link);
```

### Link --> 设置链接

> Link(**float** x, **float** y, **float** w, **float** h, **mixed** link)

和之前的链接差不多，但是它可以在图片中设置热点区域用来点击。

### [SetDisplayMode](http://www.fpdf.org/en/doc/setdisplaymode.htm) --> 设置显示模式

### [Output](http://www.fpdf.org/en/doc/output.htm) --> 输出设置

> **string** Output([**string** dest [, **string** name [, **boolean** isUTF8]]])

#### 参数

- `dest`

  发送文档的目的地。它可以是以下之一：

  `I`: 将文件内联发送到浏览器。如果可用，将使用 PDF 查看器。

  `D`: 发送到浏览器并强制下载具有由 给出的名称的文件`name`。

  `F`: 使用给定的名称`name`（可能包含路径）保存到本地文件。

  ​        最好包含文件保存的路径，如果只有名字，会直接保存到网站根目录。

  `S`: 将文档作为字符串返回。默认值为`I`。

- `name`

  文件的名称。在 destination 的情况下将被忽略`S`。 默认值为`doc.pdf`。

- `isUTF8`

  指示是以`name`ISO-8859-1 ( `false`) 还是 UTF-8 ( `true`) 编码的。仅用于目的地`I`和`D`。 默认值为`false`。

看代码第一个参数和第二个参数位置可以调换，可能是为了兼容之前的版本。

## Script 推荐脚本插件

### [HTML conversion](http://www.fpdf.org/en/script/script53.php) HTML转换

把HTML标签转成PDF，支持大部分标签
