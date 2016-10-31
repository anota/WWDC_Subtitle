# WWDC 字幕下载器

> forked from [WWDC_2015_Video_Subtitle](https://github.com/qiaoxueshi/WWDC_2015_Video_Subtitle)
> 源程序只能下载 2015 年全部字幕，本程序在此基础上，**增加**了指定下载个别视频字幕功能，以及不限制于 2015 年，
> 并可指定下载中文或英文。

本程序只用于下载字幕，为了方便已将视频文件下载到本地（在官方页面上即可下载），
然后使用此程序下载对应的字幕，最后使用自己喜欢的播放器在本地播放（加速播放等）。

如果网络带宽稳定以及没有使用特别播放器的习惯，推荐使用开源的 [WWDC Mac App](https://github.com/insidegui/WWDC) 或者在 iOS 系统或 tvOS 上下载官方的 WWDC app 观看更为方便。

## 使用指南

0. 安装 [`Node.js`](https://nodejs.org/) ；
1. 在本 project 的根目录执行 `npm install` 来安装依赖；
2. 执行脚本 `node main.js --lang zho  --page https://developer.apple.com/videos/play/wwdc2016/228/`
    - 指定语言：
        - 中文：`--lang zho`  *默认*
        - 英文：`--lang eng`
    - 指定字幕：
        - 某个视频页面：`--page https://developer.apple.com/videos/play/wwdc2016/228/`
        - 某个视频地址：`--mp4 http://devstreaming.apple.com/videos/wwdc/2015/713gc2tqvvb/713/713_hd_introducing_watch_connectivity.mp4?dl=1`
        - 某一整年：`--year 2016`

为了便于使用，字幕文件同时存在于 `subtitles/HD` 和 `subtitles/SD` 文件夹下，两个目录下的文件内容一样，只是文件名不同，请根据自己下载的视频格式来自由选择对应的字幕文件。

* [WWDC 2016 英文字幕合集](https://github.com/wujichao/WWDC_2016_Video_Subtitle)
* [WWDC 2015 英文字幕合集](https://github.com/qiaoxueshi/WWDC_2015_Video_Subtitle)
* [WWDC 2014 英文字幕合集](https://github.com/qiaoxueshi/WWDC_2014_Video_Subtitle)
* [WWDC 2013 英文字幕合集](https://github.com/qiaoxueshi/WWDC_2013_Video_Subtitle)
