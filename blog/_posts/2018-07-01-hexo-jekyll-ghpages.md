---
layout: post
title: 單倉庫設置 hexo 和 Jekyll 在 gh-pages 子頁面下
tags: 瞎折騰
cover_url: https://inchei.github.io/assets/img/jekyll-hexo.png
cover_meta: >
  Photo by [Inchei Chan](https://github.com/inchei)
position: 100
---
## 前言
<p class="aside">實際上我害怕 WordPress 是在害怕沒錢支持服務器，等到初中瞭解了本地服務器后立馬試了一番。</p>

我仔細想了一想，第一次看到獨立博客這東西就是獨立博客中的翹楚 [hexo](https://hexo.io/)。大概在這個時候，我才能升起强烈的興趣，於是折騰起了基於 [gh-pages](https://pages.github.com/) 的靜態博客<del>，甚至因此對於 [WordPress](https://wordpress.org/) 這種動態博客產生了恐懼</del>。在這期間，我懷揣著一個會打字比較快、還會手敲網頁、於是慾將自己的網頁作主頁的小學生的夢想，遇見了一個問題：

[如何在 GitHub Pages 上传自己写的网页作为首页，Hexo 博客作为其子页？](https://www.zhihu.com/question/38125993)

今日即擴展至 Jekyll ，記錄自己的解決方法。

## Jekyll

Jekyll 可以和你自己編寫的網頁共存。這意味著：只要你把 Jekyll 博客的内容移動到主倉庫的子目錄下，再在主倉庫直接編寫，一切就完成了。

## Hexo
### 突破口
在上文提及的知乎問題中，有人提供了雙倉庫的解決方案。即：一個倉庫名爲`uname.github.io`用於儲存主頁面，另一倉庫名爲`blog`儲存修改`站點配置文件`中`URL`一節為子頁面的 hexo 文件。如果不用 CNAME，這實在是有點繞不過彎子的行爲。（詳見：[Hexo - 用自己的页面做首页](https://jacklightchen.github.io/blog/2016/10/27/HexoOverview/)）

如果你將 hexo 目錄的内容直接粘貼到`uname.github.io`倉庫下的子目錄下，會發現除了引用資源外，内容并無差錯。而經過修改`站點配置文件`中`URL`一節為子頁面后，引用資源跟著變成了子頁面下的路徑。

從 hexo 的本質來看，它就是生成了一堆靜態文件罷了。這樣一來，解決問題就非常容易了。

### 解決方案
1. 修改`站點配置文件`中`URL`一節對應你期望的子目錄名稱。
2. 在 hexo 目錄下運行`hexo g`。
3. 直接複製 hexo 目錄下的生成文件目錄（默認為`public`）中的内容至`uname.github.io`倉庫下的子目錄内。

當然，碼力夠強、時間夠多，自然可以由此原理寫個自動脚本。

### 注意
這種方案相當於跳過了利用 hexo 工具部署至 GitHub，實際上還是有點麻煩的。但回頭再想想：你同時需要直接用 git 來 push 你的主頁面，那麽在電腦裏留著本地倉庫有什麽不好的呢？

因此，煞費苦心建了一個叫做「blog」的倉庫的各位，刪掉它吧！

## 演示
倉庫請見：[https://github.com/inchei/inchei.github.io/](https://github.com/inchei/inchei.github.io/)
* Jekyll: [https://inchei.github.io/blog](https://inchei.github.io/blog)
* Hexo: [https://inchei.github.io/lab/hexo](https://inchei.github.io/blog)