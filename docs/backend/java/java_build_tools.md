# Java 构建工具

> 由于这部分内容暂时不多，先都放在这里，后续再细分。

## Ant

Ant 的名字来源于 "Another Neat Tool"。

它是 Apache Software Foundation 的一个开源项目，是最早的构建工具之一，在 Maven 和 Gradle 出现之前被广泛使用。

### Ant 的工作原理

Ant 的核心是一个 **构建文件**（通常命名为 `build.xml`），这是一个用 XML 描述的任务集合。

构建文件包含以下关键部分：

**Project**:

- 表示整个构建项目的根节点。
- 定义项目的名称、默认目标和基目录。

```xml
<project name="MyProject" default="compile" basedir=".">
```

**Target**:

- 表示一个构建任务的集合。
- 每个目标可以依赖其他目标。

```xml
<target name="compile" depends="init">
    <javac srcdir="src" destdir="build/classes" />
</target>
```

**Task**:

- 表示构建过程中执行的具体操作（例如编译、复制文件）。
- Ant 提供了多种内置任务，可以通过插件或扩展定义自定义任务。

```xml
<javac srcdir="src" destdir="build/classes" />
```

### 简单的 `build.xml` 示例

假设你有一个 Java 项目，目录结构如下：

```plaintext
MyProject/
├── src/
│   └── com/example/App.java
├── build/
├── lib/
└── build.xml
```

**build.xml 示例：**

```xml
<project name="MyProject" default="build" basedir=".">
    <!-- 初始化目标：创建必要的目录 -->
    <target name="init">
        <mkdir dir="build/classes" />
    </target>

    <!-- 编译目标：编译 Java 源代码 -->
    <target name="compile" depends="init">
        <javac srcdir="src" destdir="build/classes" />
    </target>

    <!-- 打包目标：创建 JAR 文件 -->
    <target name="package" depends="compile">
        <jar destfile="build/MyProject.jar" basedir="build/classes" />
    </target>

    <!-- 默认目标 -->
    <target name="build" depends="package">
        <echo message="Build completed successfully!" />
    </target>
</project>
```

执行构建命令：

```bash
ant
```

- Ant 会按照目标的依赖顺序执行任务：`init -> compile -> package -> build`。

## Maven

Maven 是 Apache Software Foundation 的一个开源项目，是 Java 项目的构建工具。

## Gradle

Gradle 是一个基于 Apache Ant 和 Apache Maven 概念的项目自动化构建工具。
