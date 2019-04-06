---
layout: post
title: 分支的編外用法
tags: 瞎折騰
---
## 廢話
<p class="aside">指以``.``開頭的配置文件。</p>

話説很久以前我在 GitHub 上創建了一個[<ruby>倉庫<rp>（</rp><rt>repository</rt><rp>）</rp></ruby>](https://github.com/inchei/dotfiles)叫做「<ruby>層曡樣式表存檔<rp>（</rp><rt>CSS-Archieves</rt><rp>）</rp></ruby>」，本就是儲藏寫得太多的樣式表。折騰起 WSL 之後對於 Linux 的配置方式感到非常新奇，便把 <mark>dotfiles</mark> 也塞進了此倉庫中。經歷了多次改名，最後順著潮流直接叫做「dotfiles」了，寓意并非 dotfiles，硬要扯的話，應是其引申義「配置文件」。

然而順著潮流之後，令人苦惱的事情發生了—— GitHub 所顯示的語言并不是人見人愛的 shell 或者 vimscript，而是看上去便不太令人愉快的 CSS。

怎麽辦呢？我首先想到的是``.gitattributes``，便大筆一揮——

```
*.css      shell
```

這真是個糟糕的主意，因爲 GitHub 上的高亮系統會就照著``.gitattributes``去做，使得無辜的 CSS 面對高亮手足無措。

## <ruby>分支<rp>（</rp><rt>Branch</rt><rp>）</rp></ruby>
分支在 GitHub 中是用來幹什麽的呢？

我大約是可憐兮兮地查詢了根本一次也沒有看過的[GitHub Help](https://help.github.com/articles/about-branches/) ，其如是説：

> You can use branches to:
>> Develop features
>>
>> Fix bugs
>>
>> Safely experiment with new ideas

想必大部分以 GitHub <ruby>鬧著玩<rp>（</rp><rt>折騰玩具項目</rt><rp>）</rp></ruby>的同志，見到這樣的描述便會認定：分支和我一點關係都沒有。

## 腦洞
最終，我覺得 CSS 和 dotfiles 這個稍微有點高級的詞匯實在不太搭得上邊，便思索新建一個分支存儲 CSS 文件。

```shell
// 我甚至查了文檔，因爲根本沒有好好學過 git(bgm38)。
git checkout -b stylesheets
// 轉移 CSS 内容至備份文件夾内
rm -rf
// 轉移 CSS 内容回該文件夾
git add .
...
```

驚喜發生了！

![變成沒有 CSS 了](https://i.loli.net/2018/09/02/5b8bd2ce5e5ee.png)

<p class="aside">指奔走相告，此乃本文真實目的。</p>

原來 GitHub 的倉庫語言會直接無視非主分支下的内容，此困擾我許久的問題終於解決，喜大普<mark>奔</mark>！

只恐怕世上并沒有和我持相同問題的人😂。