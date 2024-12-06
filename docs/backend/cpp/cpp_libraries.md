---
title: C++标准库与开源Libraries详解，开发者入门必看
---

# C++ Libraries

## C++ 标准库

C++ 标准库是 C++ 语言的核心组成部分，提供了大量的类和函数，用于处理文件、字符串、输入输出、容器、算法等。

C++ 标准库主要包括以下几个部分：

- **输入输出库**：`iostream`、`fstream`、`sstream` 等

- **容器库**：`vector`、`list`、`map`、`set` 等

- **算法库**：`sort`、`find`、`count`、`accumulate` 等

- **迭代器库**：`iterator`、`back_inserter`、`front_inserter` 等

- **字符串库**：`string`、`wstring`、`regex` 等

- **时间库**：`chrono`、`ctime`、`time` 等

- **异常库**：`exception`、`stdexcept`、`assert` 等

- **其他库**：`memory`、`thread`、`mutex`、`atomic` 等

## Windows 专用库

Windows 提供了一些平台专用库，它们专属于 Windows 平台，提供对该系统的底层支持。

Windows 专用库主要包括以下几个部分：

- **Windows API**：`windows.h`、`winuser.h`、`winbase.h` 等

- **COM**：`combaseapi.h`、`comdef.h`、`comutil.h` 等

- **MFC**：`afxwin.h`、`afxcmn.h`、`afxext.h` 等

- **ATL**：`atlbase.h`、`atlcom.h`、`atlwin.h` 等

- **WTL**：`atlapp.h`、`atlframe.h`、`atlctrls.h` 等

- **DirectX**：`d3d11.h`、`d3d12.h`、`dxgi.h` 等

- **WinSock**：`winsock2.h`、`ws2tcpip.h`、`mswsock.h` 等

- **Windows Runtime**：`windows.ui.xaml.h`、`windows.storage.h`、`windows.media.h` 等

- **Windows Shell**：`shlobj.h`、`shlwapi.h`、`shellapi.h` 等

- **Windows Security**：`wincrypt.h`、`wintrust.h`、`schannel.h` 等

- **Windows Multimedia**：`mmdeviceapi.h`、`audioclient.h`、`mfapi.h` 等

- **Windows Networking**：`wininet.h`、`winhttp.h`、`iphlpapi.h` 等

### windows.h

`windows.h` 是 Windows API 的头文件，包含了 Windows 系统的所有函数和数据结构。

## 开源 Libraries

除了 C++ 标准库和 Windows 专用库外，还有许多优秀的开源库，可以帮助开发者更高效地开发应用程序。

常用的开源库有：

- **Boost**：提供了许多 C++ 库，包括智能指针、线程、正则表达式、日期时间等。

- **OpenCV**：计算机视觉库，提供了许多图像处理和计算机视觉算法。

- **Poco**：C++ 网络库，提供了许多网络编程的类和函数。

- **Qt**：跨平台 GUI 库，提供了许多图形界面开发的类和函数。

- **Eigen**：线性代数库，提供了许多矩阵和向量运算的类和函数。

- **GTest**：Google 测试框架，用于编写单元测试。

- **GLog**：Google 日志库，用于记录日志信息。

- **GFlags**：Google 命令行参数库，用于解析命令行参数。

- **GPerfTools**：Google 性能工具库，用于性能分析和调试。

- **Protobuf**：Google Protocol Buffers，用于序列化和反序列化数据。

- **Thrift**：Apache Thrift，用于跨语言的远程过程调用。

- **ZeroMQ**：消息队列库，用于实现消息传递。

- **Libevent**：事件驱动库，用于实现高性能的网络服务器。

- **Libuv**：跨平台异步 I/O 库，用于实现高性能的网络应用。

- **Curl**：网络传输库，用于实现 HTTP、FTP、SMTP 等协议的传输。

- **FFmpeg**：音视频处理库，用于实现音视频的编解码和处理。
