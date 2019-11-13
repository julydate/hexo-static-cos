# hexo-static-cos

[中文文档](#中文文档)

Use qcloud COS/CDN to speed your static files on hexo.

## Install

``` bash
$ npm install hexo-static-cos --save
```

## Options

You can configure this plugin in `_config.yml`.

``` yaml
# qcloudcos
qcloudcos:
  enable: true
  domain: usersubject.file.myqcloud.com
  onlypost: false
  priority: 10
  img: true
  link: true
  script: true
  audio: false
  video: false
  source: false
  track: false
  area: false
```

- **enable** - Whether to open Tencent cloud object storage (See [qcloud cos](https://cloud.tencent.com/product/cos/details))
- **domain** - Tencent cloud object storage or CDN domain name (not need http/https)
- **onlypost** - Whether to replace only article resources
- **priority** -  Priority value, lower priority value means that it will be executed first (default 10)
- **img** - Whether to replace the html img tag, the following items are the same

# 中文文档

使用腾讯云对象储存和CDN加速博客静态资源访问。

## 安装

``` bash
$ npm install hexo-static-cos --save
```

## 配置

您可以在 `_config.yml`中配置此插件。

``` yaml
# qcloudcos
qcloudcos:
  enable: true
  domain: usersubject.file.myqcloud.com
  onlypost: false
  priority: 10
  img: true
  link: true
  script: true
  audio: false
  video: false
  source: false
  track: false
  area: false
```

- **enable** - 是否开启腾讯云对象储存（关于 [qcloud cos](https://cloud.tencent.com/product/cos/details)）
- **domain** - 腾讯云对象储存或CDN域名 （无需填写 http/https）
- **onlypost** - 是否只替换文章资源
- **priority** -  优先级，数值越小插件越先执行（默认为 10）
- **img** - 是否替换 html img 标签，下列项目同理