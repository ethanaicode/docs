# 平台 API 开发与集成

## Cloudflare

### R2 Object Storage

> 参考文章：[Cloudflare R2 对象存储搭建高速免费图床完全指南](https://www.oneyangcrown.top/posts/cloudflare-r2-free-image-hosting-guide/)

Cloudflare R2 是一个对象存储服务，类似于 AWS S3。它提供了一个简单的 API 来存储和检索数据。

- 在设置中可以自定义域名（域名需要托管在 Cloudflare 上），并设置 CORS 策略

- 可以使用 `rclone` 工具来管理 R2 存储桶 [--> 站内相关内容链接](/notes/cli_tools.html#rclone)

- R2 的 API Tokens 存储权限分 `Admin Read & Write` 和 `Object Read & Write`。

  如果是在存储桶根目录下上传新的文件，可能会遇到 `Access Denied` 错误（未深究具体原因），这时需要使用 `Admin Read & Write` 权限的 API Token。

## 亚马逊

### 名词概念

- **AWS**：Amazon Web Services，亚马逊云服务平台

- **IAM**：Identity and Access Management，身份和访问管理，用于管理 AWS 资源的访问权限

- **S3**：Simple Storage Service，亚马逊简单存储服务，用于存储和检索任意数量的数据

- **EC2**：Elastic Compute Cloud，亚马逊弹性计算云，用于提供虚拟服务器

- **Route 53**：Amazon Route 53，亚马逊路由 53，用于管理 DNS 记录

- **EBS**：Elastic Block Store，亚马逊弹性块存储，用于为 EC2 实例提供持久化存储

- **AMIs**：Amazon Machine Images，亚马逊机器镜像，用于创建 EC2 实例的模板

- **CloudFront**：亚马逊的内容分发网络（CDN），用于加速静态和动态内容的分发

- **CloudWatch**：亚马逊的监控服务，用于监控 AWS 资源和应用程序

  如果要查看 CloudWatch 的日志，需要先在 IAM 中创建一个具有 `CloudWatchLogsReadOnlyAccess` 权限的用户。

### Route53

Route53 是 AWS 提供的 DNS 服务，可以用于管理域名和 IP 地址的映射关系。

#### 修改域名 Nameserver

> 迁移域名时别选择保留原 DNS，而是选择使用 Route53 提供的 DNS，不然这一步就一定要做，不然会出问题。

在 AWS Route53 中，可以修改域名的 Nameserver。

1. 打开 AWS Route 53 控制台 → Registered Domains
2. 找到你的域名，点击进入
3. 进入 “Name servers” 区块，点击 “Add or Edit name servers”
4. 替换为新的 Nameserver，点击 “Save changes”

## 阿里云

### CDN 服务

#### 开启跨域资源共享

在 CDN 控制台 --> 域名管理 --> 目标域名 --> 缓存配置 --> 节点 HTTP 相应头 --> 添加:

- `Access-Control-Allow-Origin`: \* (或者指定域名)

- `Access-Control-Allow-Methods`: GET, POST, PUT, DELETE, OPTIONS

### 短信服务

#### 通过 API 发送短信

这里以 PHP 为例，使用阿里云的短信服务发送短信。

需要使用全局 Composer 安装两个包：

```bash
composer require alibabacloud/dysmsapi-20170525 4.1.2
composer require alibabacloud/darabonba-openapi
```

## 微信公众号开发

**相关资源**

- 开发者文档：[微信公众平台开发者文档](https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Overview.html)

- 测试号平台：[公众平台测试账号](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)

- 接口调试工具：[在线接口调试工具](https://mp.weixin.qq.com/debug)

- 开发者工具：[web 开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

这些资源都可以在 **开发接口管理** --> **开发者工具** 找到

### 群发消息

群发消息的接口为 `https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=ACCESS_TOKEN`

发布接口为 `https://api.weixin.qq.com/cgi-bin/freepublish/submit?access_token=ACCESS_TOKEN`

要注意它们的区别：

- **发布图文**后，已发布的内容可被自定义菜单、自动回复、合集引用等使用。

- **群发消息**是直接发送给用户，也就是我们常理解的推送图文消息给用户。

## ChatGPT/Chatbox 类 API

### 模型的选择

在选择模型时，通常会有一个模型列表，用户可以选择不同的模型来进行对话或生成图片。

模型的名称通常是一个字符串，如 `deepseek-r1-distill-llama-8b`、`dall-e-3` 等。

它们表示：

- `deepseek`：模型类型，对话模型

- `r1`：模型版本，通常是数字

- `distill-llama-8b`：模型的配置

  -`distill`：模型的训练方式，通常是 `distill` 或 `ft`（fine-tuning）

  -`llama`：模型的类型，如 `llama`、`gpt` 等

  -`8b`：模型的大小，通常是 `8b`、`16b` 等，表示模型的参数量，`b` 代表 `billion`，即 10 亿，`8b` 表示 80 亿参数

### 文字对话

文字对话都是通过 SSE 流的方式进行回复的，这样才可以实现实时对话的效果。

如果是文件，通常客户端会解析文件，然后将文件内容发送给服务器，服务器会返回对应的回复。

#### 基础案例

**请求数据**

```python
url = "https://api.example.com/chat/completions"
headers = {
  host: 'localhost:3000',
  connection: 'keep-alive',
  'content-length': '1044',
  'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108"',
  'sec-ch-ua-mobile': '?0',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) xyz.chatboxapp.app/1.10.5 Chrome/108.0.5359.215 Electron/22.3.27 Safari/537.36',
  authorization: 'Bearer 449175e4c05f92119361dfa24887ec3709311ef',
  'content-type': 'application/json',
  baggage: 'sentry-environment=production,sentry-release=1.10.5,sentry-public_key=3cf8d15960fc432cb886d6f62e3716dc,sentry-trace_id=57d8ffae51e3445fa53f0328bdd3536a',
  'sentry-trace': '57d8ffae51e3445fa53f0328bdd3536a-825f60796cb21e4b',
  'sec-ch-ua-platform': '"macOS"',
  accept: '*/*',
  'sec-fetch-site': 'cross-site',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-US'
}
data = {
  messages: [
    {
      role: 'system',
      content: '\n' +
        'Current model: deepseek-r1\n' +
        'Current date: 2025-03-11T07:18:15.877Z\n' +
        '\n' +
        'You are a helpful assistant.'
    },
    { role: 'user', content: '您好' },
    {
      role: 'assistant',
      content: '欢迎您来到深度求索！我是深度求索的一款智能助手，随时准备帮助您解答问题、提供信息或者进行愉快的对话。请随时告诉我您需要什么帮助，我会尽力提供！'
    },
  ],
  model: 'deepseek-r1',
  temperature: 0.7,
  top_p: 0.9,
  stream: true
}
```

如果是**文件**，还需要先读取文件内容，并以这样的格式进行发送：

```json
messages: [
  {
      "role": "user",
      "content": "输入的文字内容\n\n\n<ATTACHMENT_FILE>\n<FILE_INDEX>File 1</FILE_INDEX>\n<FILE_NAME>文件名称.md</FILE_NAME>\n<FILE_CONTENT>\n# 内容标题...\n</FILE_CONTENT>\n</ATTACHMENT_FILE>\n"
    }
]
```

如果是**图片**，需要转成 url 或者 base64 格式进行发送：

```json
messages: [
  {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "输入的内容\n[image]"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/png;base64,iV...="
          }
        }
      ]
    }
]
```

**返回数据**

返回的数据类似下面这样，不断地发送给客户端，直到最后会发送一条 `end` 事件，表示对话结束。

```json
data: {"choices":[{"delta":{"content":null,"reasoning_content":"“"},"finish_reason":null,"index":0,"logprobs":null}],"object":"chat.completion.chunk","usage":null,"created":1741676945,"system_fingerprint":null,"model":"deepseek-r1","id":"chatcmpl-fbc7c94f-05e2-98d6-840a-897837dac57d"}
```

如果有**错误**时会返回：

```json
{
  "error": {
    "code": "invalid_type",
    "param": "'messages.[0].content'",
    "message": "Invalid type for 'messages.[0].content': expected one of a string or array of objects, but got an object instead.",
    "type": "invalid_request_error"
  },
  "request_id": "chatcmpl-29eac547-a262-9c24-9690-e4c3a31ad122"
}
```

#### 初始化对话名称

通常需要给当前对话一个名称，可以在新建的对话后，发送第一次对话内容时让 AI 先帮忙起一个名字，消息可以类似下面这种：

````json
{
  "messages": [
    {
      "role": "user",
      "content": "Based on the chat history, give this conversation a name.\nKeep it short - 10 characters max, no quotes.\nUse 简体中文.\nJust provide the name, nothing else.\n\nHere's the conversation:\n\n```\n<用户第一次发送的消息，替换这里，不包括符号>\n\n---------\n\n\n```\n\nName this conversation in 10 characters or less.\nUse 简体中文.\nOnly give the name, nothing else.\n\nThe name is:"
    }
  ]
}
````

#### 相关知识

- **role 角色**，通常有 `user`、`assistant`、`system` 三种角色

### 图片生成

**请求数据**

```python
url = "https://api.example.com/images/generations"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
  "prompt": "laiba",
  "response_format": "b64_json",
  "model": "dall-e-3",
  "style": "vivid"
}
```

**返回数据**

```json
{
  "created": 1631234567, // 时间戳
  "data": [
    {
      "b64_json": "base64-encoded-image-data" // Base64 编码的图片数据
    }
  ]
}
```
