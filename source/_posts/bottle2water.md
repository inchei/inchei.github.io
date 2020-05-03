---
layout: post
title: 空瓶換水問題的遞歸解法
date: 2020-05-03
tags:
    - 瞎折騰
    - 算法
toc: false
---
在學校憋了三個星期，數學課上想到了這個經典問題。雖未習算法，深覺此為練習遞歸之機，就在草稿紙上摸了起來。上次幹這種事，還是初三上學期期末考的時候瞎編的干支紀年算法，只是當時我年輕地忘記了干支紀年是跟着農曆來的。回家謄寫並修改一番，或許這個問題太簡單了，然而對於無門系統學習的我來説，想出題目並自己解決還是很有意思的。

空瓶換水的問題，我想到了兩種。一種是**已知所需瓶數求最少買幾瓶**，一種是**已知手頭空瓶求最多換幾瓶**。用遞歸方法解決，首先思考遞歸函數的輸入變量。在第一種問題中，不斷改變所需水，第二種則是改變手頭空瓶。這樣一來，解決這兩個問題實在簡單。

不過，有一點我是靠着做過這個小學數學題才能想起來的，即當手頭空瓶數差一瓶為兑換所需瓶數時，可以借一瓶喝掉再換一瓶還回去。

## 已知所需瓶數求最少買幾瓶
學校裏打的草稿：
```python
def bottle2waterA(target, key=3, bought=0, exchanged=0):
    if target > 0:
        bought += 1
        target -= 1
        if (bought-exchanged*key)%key == 0 or bought == key - 1:
            exchanged += 1
            target -= 1
        return bottle2waterA(target, key, bought, exchanged)
    else:
        return bought
```
不同於第二個問題，這裏的 `exchanged` 和 `bought` 都被我拿來當條件了，不清楚如何再簡化。

## 已知手頭空瓶求最多換幾瓶
學校裏打的草稿：
```python
def bottle2waterB(bottle, key=3, exchanged=0):
    if bottle >= key:
        exchanged += bottle // key
        bottle = bottle % key + bottle // key
        return bottle2waterB(bottle, key, exchanged)
    else:
        if bottle == key - 1:
            bottle = 0 # 光是求解的話這一行可以刪掉
            exchanged += 1
        return exchanged
```
由於變量 `exchanged` 在函數中只起到輸出的作用，對於函數功能沒有影響，可以簡化一下：
```python
def bottle2waterC(bottle, key=3):
    if bottle < key:
        if bottle == key - 1:
            return 1
        return 0
    return bottle2waterC(bottle % key + bottle // key) + bottle // key
```
這個簡化同時也説明了對於遞歸算法，**應當優先考慮不借助中間變量**。下次再寫遞歸，第一句上 `return` 好了。

## 瓶蓋也上了
在網上搜索一下，果然這個問題也是常見的一道算法題。而很多版本中，不僅是瓶子可以換水，瓶蓋也可以換水。這種情況下，第一種問題由於在空瓶數差一瓶等於兑換所需空瓶數後仍要繼續進行，直接添加一個條件是不可以的。雖然最後也寫了出來，不過與遞歸無關，還長得不太好看，找到更好的方法前暫且還是不放上來了。
