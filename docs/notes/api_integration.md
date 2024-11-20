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
