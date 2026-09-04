# Risen Docs

个人学习过程中的系统内容知识库，包括但不限于后端开发、运维、前端开发、数据分析等领域。

A personal knowledge base of system content learned during the learning process, including but not limited to backend development, operations and maintenance, front-end development, data analysis and other fields.

You can visit the website at [http://doc.shejibiji.com/](http://doc.shejibiji.com/).

## 本地构建快速部署参考

> 由于国内服务器无法方便拉取外部资源，所以我采取本地构建后再上传的方式。
>
> 这样可以确保文档在国内服务器上能够顺利部署，而不依赖于外部资源，仅供参考。

```bash
# 打包本地构建的文档
tar -czf ../docs_$(date +%Y%m%d).tar.gz docs/.vitepress/dist

# 复制文件到目标目录
scp -P 22 ../docs_$(date +%Y%m%d).tar.gz user@remote_host:/path/to/doc.shejibiji.com/

# 解压到目标目录
ssh -p 22 user@remote_host "tar -xzf /path/to/doc.shejibiji.com/docs_$(date +%Y%m%d).tar.gz -C /path/to/doc.shejibiji.com/ && find /path/to/doc.shejibiji.com/ -type f -name '._*' -delete"
```