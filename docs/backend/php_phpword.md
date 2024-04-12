# PHPWord Documentation

> https://phpword.readthedocs.io/en/latest/
>
> https://github.com/PHPOffice/PHPWord

## IOFactory 工厂

## HTML

支持传入HTML标签，这是简单的案例：

```php
$phpWord = new \PhpOffice\PhpWord\PhpWord();
$section = $phpWord->addSection();
$html = '<h1>Adding element via HTML</h1>';
\PhpOffice\PhpWord\Shared\Html::addHtml($section, $html, false, false);
$objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
$objWriter->save($filename);
```

实测似乎支持的不是特别好，比如`<h?>`标题标签，我这边一直就不会生效。

支持比较好的样式部分：

```css
margin-top: 240pt;
font-size: 16px;
text-align: center;
text-decoration: underline;
text-align: justify; 
text-indent: 70.9pt; 
line-height: 150%;
font-family: arial,helvetica,sans-serif;
```

支持比较好的标签

```html
<p></p>
<a></a>
<strong></strong>
<sub></sub>
<ul><li><ol></ol></li></ul>
```







## [Containers  容器](https://phpoffice.github.io/PHPWord/usage/containers.html)

### addSection 添加内容块

参数可以都为空

```php
$section = $phpWord->addSection(
    ['paperSize' => 'Folio', 'marginLeft' => 600, 'marginRight' => 600, 'marginTop' => 600, 'marginBottom' => 600]
);

// The text of this section is vertically centered
$section = $phpWord->addSection(
    ['vAlign' => VerticalJc::CENTER]
);
```

## Element 元素

### addText 添加文字

参数可以都为空

```php
$section->addText($text, [$fontStyle], [$paragraphStyle]);
```

- `$fontStyle`. See [Font](https://phpword.readthedocs.io/en/latest/styles.html#font-style).

- `$paragraphStyle`. See [Paragraph](https://phpword.readthedocs.io/en/latest/styles.html#paragraph-style).

如果是要设置对齐方式，需要用到段落样式`alignment`

### addTextRun 添加复杂段落

支持不同的样式和元素

```php
$textrun = $section->addTextRun([$paragraphStyle]);
```

### addTextBreak 添加换行

```php
$section->addTextBreak([$breakCount], [$fontStyle], [$paragraphStyle]);
```

- `$breakCount`. How many lines.

### addPageBreak 换页

```php
$section->addPageBreak();
```

### addWatermark 添加水印

也可以用来添加页面背景。

需要一个header来作为参考。

```php
$section = $phpWord->addSection();
$header = $section->addHeader();
$header->addWatermark('resources/_earth.jpg', array('marginTop' => 200, 'marginLeft' => 55));
```

