---
layout: post
title: 爬蟲試水：自動下載《魔法速報》及其他
date: 2020-02-23
tags:
    - 瞎折騰
    - Python
---
網課效率過低，偷偷學起了 Python。從 12 日到現在，Python 多少也學了十天了。首先把[廖雪峯的 Python 教程](https://www.liaoxuefeng.com/wiki/1016959663602400)啃到了 IO 編程一節，然後又在知乎上看了一些爬蟲原理的綜述，接著又讀了 requests 和 BeautifulSoup 的文檔。對於一個總想著實際運用的人來説，其實也挺難熬的：一開始就定下了目標——下載曾經花很長時間在百度貼吧才陸陸續續看完的《魔法☆速報》。

《魔法☆速報》在[魔法紀錄中文維基](https://magireco.moe/wiki/%E9%A6%96%E9%A1%B5)上有專門的頁面，理論上可以在此頁上一個個看過去，然而文件大小較大，難以舒暢地觀看，最好的辦法也許是全部下載下來再離線觀看。出於學習效率的考慮，我直接跳過了 urllib 的學習而轉向 requests，而 BeautifulSoup 則是因為習慣了 CSS 抽象化的寫法而採用。忽略了效率，寫了一個自動下載來自維基的漫畫的爬蟲。

```python
import requests
from bs4 import BeautifulSoup
import os
import time

def parser(url):
    return BeautifulSoup(requests.get(url).content, 'html.parser')

# 針對 MediaWiki 的文件頁
def downloadImg(url):
    # 找到文件頁的 原始文件 鏈接
    img_entry = parser(url).find('a', class_='internal')
    img_url = 'https://magireco.moe' + img_entry['href']
    img_title = img_entry['title']
    img = requests.get(img_url, stream=True)
    if img.status_code == 200:
        print('downloading...')
        start = time.time()
        with open('./' + img_title, 'wb') as f:
            f.write(img.content)
        end = time.time()
        print('%s is downloaded in %s.' % (img_title, end - start))
    else:
        print(img.status_code)

if __name__=='__main__':
    # https://magireco.moe/wiki/魔法☆速報
    url = 'https://magireco.moe/wiki/%E9%AD%94%E6%B3%95%E2%98%86%E9%80%9F%E6%8A%A5'
    img_list = parser(url).find_all('a', class_='image')
    for img in img_list:
        downloadImg('https://magireco.moe' + img['href'])
```

寫完之後，發現效果並不理想：下載速度太慢了。<s>目前還需要再研究一下多線程的運用，之後再把結果分享出來。</s>在寫了一個多線程下載工具之後，發現還是下載不下來——還是網絡連接的問題。

除此之外，順便也寫了一個用於下載貼吧圖片的爬蟲，把圓吧的[魔女設定卡片](https://www.lanzous.com/i9lxnhi)以及 [PSP 版的悲歎之種](https://www.lanzous.com/i9mv9pg)都下載了下來，因為文件大小較小，所以下載起來清爽了不少。

```python
import os
import requests
from bs4 import BeautifulSoup
import time

def parser(url):
    return BeautifulSoup(requests.get(url).content, 'html.parser')

def get_img_list(url):
    # 獲取一頁上的圖片
    def get_img(page_url):
        return parser(page_url).find_all('img', class_='BDE_Image')
    page = parser(url).find_all('li', class_='l_reply_num')[0].find_all('span')[1].text
    img_list = []
    # 獲取每一頁上的圖片
    for i in range(1, int(page) + 1):
        img_list += [x for x in get_img(url + '&pn=' + str(i))]
    return img_list

# 從圖片列表中下載圖片
def download_img(img_list):
    n = 0
    for img in img_list:
        n += 1
        img_url = requests.get(img['src'], stream=True)
        with open('./' + str(n) + '.jpg', 'wb') as f:
            start = time.time()
            f.write(img_url.content)
            end = time.time()
            print('%s/%s file(s) downloaded in %ss.' % (str(n), len(img_list), end - start))
    return


if __name__=='__main__':
    # 魔女卡片帖：https://tieba.baidu.com/p/1180021348?see_lz=1
    # 悲歎之種帖：https://tieba.baidu.com/p/6393683868?see_lz=1
    url = input('Input the page url: ')
    download_img(get_img_list(url))
    print('done.')
```

![下載下來的卡片 v0.1](https://i.loli.net/2020/02/23/IK3pZ916VtjMnHX.png)

總而言之，Python 的確是一個寫爬蟲的絕佳工具——曾經嘗試用 Javascript 來下載，感受尤為明顯。關於爬蟲，計劃還要學習的東西還挺多的：

* 反爬應對措施
* <s>多線程</s>
* <s>斷點續傳</s>

邊完善這兩個腳本，邊學習爬蟲。Python 的學習比起 JavaScript 來講，雖然學習週期要更長，但做出一點成果之後，成就感相對也就高了起來。希望今後能寫出更多有用的工具。<s>極客化警告</s>