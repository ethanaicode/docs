# 平台 API 开发与集成

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

要注意它们的区别，**发布图文**后，已发布的内容可被自定义菜单、自动回复、合集引用等使用，**群发消息**是直接发送给用户，也就是我们常理解的推送图文消息给用户。

## 阿里云

### CDN 服务

#### 开启跨域资源共享

在 CDN 控制台 --> 域名管理 --> 目标域名 --> 缓存配置 --> 节点 HTTP 相应头 --> 添加:

- `Access-Control-Allow-Origin`: \* (或者指定域名)

- `Access-Control-Allow-Methods`: GET, POST, PUT, DELETE, OPTIONS

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
    { role: 'user', content: '您好' },
    { role: 'assistant', content: '您好！有什么我可以帮助您的吗？' },
    { role: 'user', content: '您好' }
  ],
  model: 'deepseek-r1',
  temperature: 0.7,
  top_p: 0.9,
  stream: true
}
```

**返回数据**

返回的数据类似下面这样，不断地发送给客户端，直到最后会发送一条 `end` 事件，表示对话结束。

```json
data: {"choices":[{"delta":{"content":null,"reasoning_content":"“"},"finish_reason":null,"index":0,"logprobs":null}],"object":"chat.completion.chunk","usage":null,"created":1741676945,"system_fingerprint":null,"model":"deepseek-r1","id":"chatcmpl-fbc7c94f-05e2-98d6-840a-897837dac57d"}
```

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
