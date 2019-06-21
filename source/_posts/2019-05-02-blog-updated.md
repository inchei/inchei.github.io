---
layout: post
title: 博客更了個新
date: 2019-05-02
tags: 瞎折騰
toc: true
cover_url: https://i.loli.net/2019/05/02/5cca627c6bf38.png
---
初中生活馬上就要結束了。因爲進了所謂「銜接班」的緣故，大概體驗了一下「高中生活」，不過處於這個學校中，最終還是無法避免被各位初中部大佬們罵得狗血淋頭，然後低下頭回去準備中考。初二在寫《[長安行](/blog/2017/12/23/2017-12-23-Changan/)》這一篇時，我就開始苦惱自己這份不緊不慢的性格是否到了該用力的中考也改變不了；現在看來，這學期前半段日子真是加劇了這個狀況。

我總要試著改變吧！這麽想著，決心做一點有點儀式感（？）的事情，然後開始中考。<s>明明是考生，這樣真的好嗎？</s>於是乎在五一假期裝修了一下博客。雖然是博客，但是很慙愧已經半年有餘沒有更新了，去年也是整整一年祇有三篇博客；即便沒有人看，也很不好意思自己把這博客丟在一邊。以下便簡述一下，權當博客凑數也是可以的。

此次更新，主要在於轉到了 [hexo](https://hexo.io)。其一是之前的 Jekyll 被我玩壞了，其二是在它沒被玩壞之前速度沒法<mark>差强人意</mark>。以 [element](https://artifact.me/) 主題為底，花費半天多的時間，進行了一定改動。<s>唔，我的效率真是慢。</s>

## Logo
Logo 跟之前一樣是來自《絕望先生》最後幾話裏出現的「自首標志」<span style="opacity: .3"><s>以示我還沒有忘記自己喜愛的東西</s></span>加以矢量化所得，不過這次發現原先圖標的尾巴太長，導致失去比例，只好剪掉了尾巴。於是我把完整的 logo 放上來吧。
<img alt="自首標志" style="width: 300px;" src="https://i.loli.net/2019/05/02/5cca76d415ecf.png" />

## 配色
[NIPPON COLORS](http://nipponcolors.com/#mizuasagi) 真的是個好網站……
![水淺葱](https://s2.ax1x.com/2019/06/20/Vx9Yxf.png)

## 一些 CSS 小玩意兒
<span style="opacity: .3"><small><s>自從看了 B 站的《日常》最後一集字幕，我就變得特別喜歡用「小玩意兒」這個詞了<img alt="bgm38" style="display:inline-block" src="https://bgm.tv/img/smiles/tv/15.gif" /></s></small></span>

### <ruby>視差滾動<rp>（</rp><rt>Parallax Scrolling</rt><rp>）</rp></ruby>
沉迷 CSS 時曾經十分向往的一個效果，現在隨便一想發現很是簡單，祇需要幾行就搞定了。簡單來説，就是固定背景，再加上一層可移動的罩層。效果見本頁頭。<aside>不過效果也很是簡陋呢。</aside>

```css
img.cover {
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 31.4vh;
  z-index: -3;
  object-fit: cover;
}

div.cover {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 999vh;
  background: -webkit-linear-gradient(transparent 0, white 31.4vh);
  background: -o-linear-gradient(transparent 0, white 31.4vh);
  background: -moz-linear-gradient(transparent 0, white 31.4vh);
  background: linear-gradient(transparent 0, white 31.4vh);
  z-index: -2;
}
```
```html
<%
var cover = page.cover_url;
%>
<% if (cover) { %><div class="cover"></div><img class="cover" src=<%= cover %> /><% } %>
```


### 著重號
本來想借用[漢字標準格式](https://github.com/ethantw/Han)的框架，但是其中很多需求我并不需要，<span style="opacity: .3">而且我想要宋體，</span>所以自己試著參考 [typo.css](https://typo.sofi.sh/) 仿製了一個。目前的問題在於，<em>沒有辦法適應不同大小的字</em>，但這也不太大礙，畢竟在標題使用著重號還是有點奇怪的。

```css
  em {
    position: relative;
    &::after {
      position: absolute;
      top: 0.65em;
      left: 0;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      color: fade(@material-grey, 50%);
      font-family: serif;
      font-weight: 900;
      content: "・・・・・・・・・・・・・・・・・・・・・・" //此處省略 n 個・;
    }
  }
```

## 收穫
1. [less](http://lesscss.org/)
2. [Django](https://www.djangoproject.com/)
3. hexo
這幾項大約能夠熟練掌握了。<s>雜學傢陳某某要誕生了。</s>

## 待辦事項
還有一些小點子，還是忍住到中考結束後再實現吧！

1. 實現 yaml 設置更新日志和友情鏈接；
2. 實現目錄功能；
3. 修復 [zooming](https://github.com/kingdido999/zooming) 的功能，目前還有一些不明原因的問題；
4. <span style="opacity: .3">嘗試快速輸入<img alt="bgm38" style="display:inline-block" src="https://bgm.tv/img/smiles/tv/15.gif" />的方法。</span>
5. [Webfont](https://www.webfont.com/) 貌似有點 bug，所以停用了，待修復；
6. 用中文顯示日期的 hexo 插件。

另外備注一下，不知爲何``<aside>``標簽放在標題下面的話就會出錯，目前只好避開這樣用了。

那麽，下次更新，我也是 <mark>JK</mark> 了！<aside>大概不是只有日本的女高中生才叫 JK？不明白啊（笑）！</aside>