---
layout: post
title: 空瓶换水问题的递归解法
date: 2020-05-03
tags:
    - 瞎折腾
    - 算法
toc: false
---
在学校憋了三个星期，数学课上想到了这个经典问题。虽未习算法，深觉此为练习递归之机，就在草稿纸上摸了起来。上次干这种事，还是初三上学期期末考的时候瞎编的干支纪年算法，只是当时我年轻地忘记了干支纪年是跟着农历来的。回家誊写并修改一番，或许这个问题太简单了，然而对于无门系统学习的我来说，想出题目并自己解决还是很有意思的。

空瓶换水的问题，我想到了两种。一种是**已知所需瓶数求最少买几瓶**，一种是**已知手头空瓶求最多换几瓶**。用递归方法解决，首先思考递归函数的输入变量。在第一种问题中，不断改变所需水，第二种则是改变手头空瓶。这样一来，解决这两个问题实在简单。

不过，有一点我是靠着做过这个小学数学题才能想起来的，即当手头空瓶数差一瓶为兑换所需瓶数时，可以借一瓶喝掉再换一瓶还回去。

## 已知所需瓶数求最少买几瓶
学校里打的草稿：
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
不同于第二个问题，这里的 `exchanged` 和 `bought` 都被我拿来当条件了，不清楚如何再简化。

## 已知手头空瓶求最多换几瓶
学校里打的草稿：
```python
def bottle2waterB(bottle, key=3, exchanged=0):
    if bottle >= key:
        exchanged += bottle // key
        bottle = bottle % key + bottle // key
        return bottle2waterB(bottle, key, exchanged)
    else:
        if bottle == key - 1:
            bottle = 0 # 光是求解的话这一行可以删掉
            exchanged += 1
        return exchanged
```
由于变量 `exchanged` 在函数中只起到输出的作用，对于函数功能没有影响，可以简化一下：
```python
def bottle2waterC(bottle, key=3):
    if bottle < key:
        if bottle == key - 1:
            return 1
        return 0
    return bottle2waterC(bottle % key + bottle // key) + bottle // key
```
这个简化同时也说明了对于递归算法，**应当优先考虑不借助中间变量**。下次再写递归，第一句上 `return` 好了。

## 瓶盖也上了
在网上搜索一下，果然这个问题也是常见的一道算法题。而很多版本中，不仅是瓶子可以换水，瓶盖也可以换水。这种情况下，第一种问题由于在空瓶数差一瓶等于兑换所需空瓶数后仍要继续进行，直接添加一个条件是不可以的。虽然最后也写了出来，不过与递归无关，还长得不太好看，找到更好的方法前暂且还是不放上来了。
