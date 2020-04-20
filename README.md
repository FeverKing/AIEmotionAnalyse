# AI情感分析插件

这是一个基于百度飞浆预训练模型的实时AI情感分析插件,兼容所有可扩展的主流浏览器

简单点说就是用AI帮你分析你所看到的语句的情感

**仅支持中文!**

这也是为什么整个项目说明没有英语的原因哈哈

*有可能长句子会被挤出浮动层,不过暂时能用,下个版本再更新,体谅一下*

------



## 效果

下面结果为新浪新闻随机截取,不代表作者观点

------



#### 友善的

![pos](C:\Users\ALIENWARE\Desktop\AI情感分析\res\pos.JPG)



------

#### 有敌意的

![neg](C:\Users\ALIENWARE\Desktop\AI情感分析\res\neg.JPG)

------

## 安装

如果你看到这了,请赏赐颗星星哦

首先,你用的什么浏览器?

我不知道,不过你需要在你的浏览器的插件应用商店下载油猴脚本管理器(TamperMonkey)

可以通过以下链接:

[Chorme](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=zh-CN)(需梯子)	[FireFox](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/?src=search)(无需梯子)	[Microsoft Edge](https://www.microsoft.com/zh-cn/p/tampermonkey/9nblggh5162s)(无需梯子)

完成之后点击状态栏上的方脑袋猴子图标,新建脚本,将"./插件 JS/ai_cn.js"全部内容粘贴进去,然后保存,在之后的页面将开关打开,**大功告成!**

默认匹配了新浪,凤凰网,bilibili,豆瓣,百度贴吧,微博

如果需要添加请在"ai_cn.js"的头部添加

```javascript
// @match        *://你想要的域名.com/*
```

------

## 使用方法

在已匹配的域名下,选择你想检测的内容,就像示例图中一样,然后就会自动出结果

根据使用人数不同,网络状况不同,延时可能不同,正常在100ms

如果结果您**不满意**,请**点击提交标签按钮**,毕竟AI是吃数据长大的,谢谢您的支持

------

## 进阶

正常用户看到这里就不需要看了

如果你想用自己的后端,自己收集数据

我的后端可以给你做个参考

首先,请将"ai_cn.js"里的:

```javascript
apiurl
reporturl
```

改为你的接口地址

再将"./数据收集后端 PHP/report.php"里的

```php
$user
$passwd
$dbname
```

填写完善

分析后端使用的是Flask+uWSGI+nginx架构的web服务,分析模型引用的是百度飞浆的预训练模型

[传送门](https://www.paddlepaddle.org.cn/install/quick)

请务必装好这些库/软件

------

## 最后

学生一名,第一次写项目,给个star支持下?

更多问题请在issue里提出

非常接受pull request

------

**本软件遵循GPLv3协议,严禁商用**

Copyright © 2020 FeverKing