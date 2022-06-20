# 阿里云DNS验证 Alibaba Cloud DNS Challenge
为Greenlock设计
Designed for Greenlock

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/alibaba-dns-challenge.svg?style=flat-square
[npm-url]: https://npmjs.org/package/alibaba-dns-challenge

## 更新内容 Update
  * 更新了文档

## 安装 Installation
```bash
$ npm install alibaba-dns-challenge
```


## 使用 Usage

  在Greenlock中使用 Use in greenlock
  * accessKeyId: Your alibaba cloud accessKeyID
  * accessKeySecret: Your alibaba cloud accessKeySecret 
  * zones: Domains to take care of
```js
greenlock.manager.defaults({
    agreeToTerms: true,
    subscriberEmail: 'Your email',
    challenges: {
        "dns-01": {
          module: "alibaba-dns-challenge",
          accessKeyId: "Alibaba-Key",
          accessKeySecret: "Alibaba-Key",
          zones: ["your.domain"]
       }
      }
})
```
- [等待更新 Waiting for update](https://unics.top)