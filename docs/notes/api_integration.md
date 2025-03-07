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

### 文字对话

文字对话都是通过 SSE 流的方式进行回复的，这样才可以实现实时对话的效果。

**返回数据**

返回的数据类似下面这样，不断地发送给客户端，直到最后会发送一条 `END` 消息，表示对话结束。

```bash
id: 123\n
data: This is an important message.\n\n
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
