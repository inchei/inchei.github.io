+++
title = "為 Hexo 靜態博客添加夜間模式"
date = 2022-07-16
updated = 2024-05-01
aliases = ["blog/2022/07/16/dark-mode/"]
[extra]
cover = "https://s2.loli.net/2022/07/16/vH8waZpL6UjzVuY.png"
+++

## 前言
這兩天重新拾起博客，本來說是想改用[劉曉義](https://meow.c-3.moe/)的系統的，可瞅一眼覺得 element 主題還是很有設計感，乾脆又折騰起了主題，並震驚地發現本以為棄坑的原主題作者 Art Chen 在 2020 年竟然[更新了暗黑模式](https://artifact.me/dark-mode-is-cool/)，自己也覺得總白一片在黑夜中確實不太好，就打算搭載上夜間模式。本站的夜間模式隨時間改變，並且可在右上角切換。

本文以此為契機，簡述為 Hexo 靜態博客添加夜間模式的通用指南。本文要求讀者有一定 CSS 和 JavaScript 能力，或者擅於查詢 [MDN](https://developer.mozilla.org/zh-CN/) 現學現賣。
## 方法的取捨
近年，CSS 普遍支持了 `prefers-color-scheme` 的媒體查詢（Media queries）。兼容性請參考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme)，一如既往，除了 IE 都沒問題。

`prefers-color-scheme` 這個媒體特性與夜間模式密切相關，它有三種可選值：`no-preference`、`light`、`dark`。也就是說，我們完全可以通過媒體查詢實現夜間模式。例如：

```css
html {
    background: #fff;
    color: #000;
}
@media (prefers-color-scheme: dark) {
    html {
        background: #000;
        color: #fff;
    }
}
```
然而，這種方法存在問題，即夜間模式的顯示只能跟隨系統，如果訪問者未設置系統夜間模式，將永遠無法看到夜間模式。因此，我推薦想要設置的人採用為 `html` 添加 `dark` class 的方法。不過，這並不意味著我們完全不會用到 `prefers-color-scheme`，這一點請看後文。
## 書寫 CSS
夜間模式和一般模式最大的區別，顯然在於顏色。最簡單的實現方法即將淺色全部替換為深色。如果僅是如此，反色是很好的思路，相應的 CSS 書寫也非常簡單：
```css
html.dark {
    filter: invert(1) hue-rotate(180deg);
}
```
唯一的問題在於，此種方法會把圖片也反色。解決方法也簡單粗暴，再加一行：
```css
.dark img {
    filter: invert(1) hue-rotate(180deg);
}
```
把圖片再反色一次反回原色即可。

即便如此，以上方法還是存在問題：
- 對許多硬寫入樣式表的顏色無效，往往做不到完全反色
- 如果設置了博客主題色，將喪失主題色
- 夜間模式不僅僅是顏色的變化，缺乏細節的補完

因此，這裡建議單獨寫一段 CSS 來實現夜間模式。查看原主題的樣式表文件，尋找需要修改的部分，將這些代碼複製並修改為期望的內容。

除了顏色變暗和個性化的夜間模式設計，我想提醒一下修改圖片亮度，避免一片暗黑中出現亮度超標的圖片。
```css
.dark img {
    filter: brightness(0.7);
            transition: filter 300ms ease-in-out;
}
.dark img:hover {
    filter: brightness(1);
}
```
對於顏色，除了複製並修改的土辦法，如果原主題在 `html` 或 `html` 定義了所有顏色，可以在顏色定義處更方便地修改。例如：
```css
html {
    --bg-color: #fff;
    --text-color: #000;
}
html.dark {
    --base-color: #000;
    --text-color: #fff;
}
```

將修改後的代碼放在總樣式表文件中。
## 書寫 JavaScript
使用 `dark` class 的方法後，通過添加或刪去 `dark` class 即可實現進入或退出夜間模式。鑑於大部分主題都有使用 jQuery，這裡展示相應的 jQuery 代碼讓過程更加簡單：
```js
$('html').toggleClass('dark');
```
如果你的主題沒有使用 jQuery，可以自行查找原生 JavaScript 的等價寫法或在主題裡加入 jQuery，因為後文均是在使用 jQuery 的前提下書寫的。

找個地方放上按鈕：
```html
<a href="javascript:" class="swap-mode-btn">切換夜間模式</a>
```
再搭載切換功能：
```js
$('.swap-mode-btn').click(function() {
    $('html').toggleClass('dark');
})
```
不過，現在還有一點問題，就是每次進入新頁面或者刷新的時候，又會返回普通模式。此時，只要藉助 localStorage 記錄上次的選擇就行了：
```js
// 判斷部分
// 插入在 <body> 前的 <head> 中以在頁面加載之前判斷模式，避免在夜間中跳出白色閃瞎訪客
// 注意：此處 DOM 尚未加載完畢，不能使用外部引入的 jQuery
let html = document.getElementsByTagName('html')[0];
if (localStorage.getItem('dark') === '1') {
	html.classList.add('dark');
} else if (localStorage.getItem('dark') === '0') {
	html.classList.remove('dark');
}
```
```js
// 按鈕設置部分
$('.swap-mode-btn').click(function() {
    $('html').toggleClass('dark');
    let isDark = $('html').hasClass('dark');
	if (isDark) {
		localStorage.setItem('dark', '1');
	} else {
		localStorage.setItem('dark', '0');
	}
})
```
使用 localStorage 會讓訪客下次進入博客時仍採用上次的模式。如果要在下次進入時回到默認狀態，請改為 sessionStorage。

改為 sessionStorage 後需注意，在新標籤頁打開的同站點頁面（子頁面）中修改模式，其改變的 sessionStorage 不會在父頁面中使用。這是 sessionStorage 本身的特性，可以通過一些技巧避免，本文就不贅述了。

完事！如果只需要自由切換的話，本文到此結束。
## 隨系統切換
即便選擇了添加 `dark` class 的方法，我們仍然能實現隨系統切換，而所需的工具不是 CSS，而是 JavaScript。同樣藉助 `prefers-color-scheme`，但這次是用 JavaScript 查詢判斷：
```js
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
	$('html').addClass('dark');
} else {
	$('html').removeClass('dark');
}
```
## 隨時間切換
使用 JavaScript 相比直接用 CSS，除了能自由切換，還有一個優點是能無視系統設置，隨時間切換，同樣，將判斷條件改為時間即可。例如，設置下午七點到次日六點為夜間模式：
```js
if (new Date().getHours() >= 19 || new Date().getHours() < 6) {
	$('html').addClass('dark');
} else {
    $('html').removeClass('dark');
}
```
## 多種切換方式的優先級處理
有了多種判斷條件，就能夠給它們排個優先級了。比如，我想要先看看訪客之前是否手動切換成了某模式，如果有就保持該模式，沒有就根據時間：
```js
let html = document.getElementsByTagName('html')[0];
if (localStorage.getItem('dark') === '1') {
	html.classList.add('dark');
} else if (localStorage.getItem('dark') === '0') {
	html.classList.remove('dark');
} else if (new Date().getHours() >= 19 || new Date().getHours() < 6) {
	html.classList.add('dark');
} else {
	html.classList.remove('dark');
}
```
如果要添加讓選擇過模式的訪客繼續根據時間自動切換模式的按鈕，按鈕需要先檢測目前時間切換模式，之後清除上述 localStorage：
```js
$('.sys-dark-btn').click(function() {
	if (new Date().getHours() >= 19 || new Date().getHours() < 6) {
		$('html').addClass('dark');
	} else {
		$('html').removeClass('dark');
	}
	localStorage.removeItem('dark');
})
```
那麼，需要添加的全站 JavaScript 內容如下：
```js
// <head><script>
// 初始化
if (localStorage.getItem('dark') === '1') {
	$('html').addClass('dark');
} else if (localStorage.getItem('dark') === '0') {
	$('html').removeClass('dark');
} else if (new Date().getHours() >= 19 || new Date().getHours() < 6) {
	$('html').addClass('dark');
} else {
	$('html').removeClass('dark');
}
// DOM 加載完後方可執行
document.addEventListener('DOMContentLoaded', function () {
	// 按鈕設置
	$('.sys-dark-btn').click(function() {
		if (new Date().getHours() >= 19 || new Date().getHours() < 6) {
			$('html').addClass('dark');
		} else {
			$('html').removeClass('dark');
		}
		localStorage.removeItem('dark');
	})
	$('.dark-btn').click(function() {
		$('html').toggleClass('dark');
		let isDark = $('html').hasClass('dark');
		if (isDark) {
			localStorage.setItem('dark', '1');
		} else {
			localStorage.setItem('dark', '0');
		}
	})
})
// </script></head>
```
## 默認夜間
默認夜間的相反即是手動選擇日間模式。因此，想要默認夜間的話，只要在上述書寫 CSS 階段把原代碼和修改後代碼的選擇器調換位置即可。
