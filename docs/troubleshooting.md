# 错误索引
## 下载`Chromium`失败
请使用国内源下载

```
npm config set puppeteer_download_host=https://npm.taobao.org/mirrors
```

## linux使用
1. Linux下必须关闭`sandbox`才可运行,请在`startTask`执行时`puppeteerLaunchOption`使用配置`{args: ['--no-sandbox']}`.如果你需要使用sandbox,请查看[Linux SUID Sandbox Development](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_suid_sandbox_development.md)
2. Linux下`puppeteer`其他问题请访问[Puppeteer Troubleshooting](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md)

## MVVM框架测试
类react的框架测试需要在使用`startTask`执行时注意以下几点配置:

1. 在`puppeteerLaunchOption`中开启`slowMo`配置,测试用例中为`20`毫秒.帮助模拟人的点击停顿行为,以解决部分渲染问题.你也可以使用[sleep](unit.md#sub_type_setSleep)方法来处理特殊等待的情况.
2. 在`startPageOption`中配置`waitUntil`为`networkidle0`或`networkidle2`,帮助react在加载异步加载资源或初始化状态管理期间调用后,再进行测试.