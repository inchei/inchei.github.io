+++
title = "爬蟲以及半年的時光"
date = 2021-08-10
updated = 2021-08-11
aliases = ["blog/2021/08/10/spider-the-second/"]
+++

最近發現B站的專欄區還有挺多漫畫的，就想個爬蟲`copy.py`。而且現在又開始上網課了，就順手寫了。對比上次大概還是有進步的。在此做一個存檔。好久沒寫代碼了，當然也好久沒寫這個博客了，也同樣好久沒有那麽沉下心做想做的事情了。這種感覺挺開心的。那麽接下來就保持著這種沉浸的態度加油吧。
```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-


# 使用方法：安装 python 并在命令行输入 `python copy.py id`
# 其中 id 是 rl + 数字 或 cv + 数字

import sys
import os
import requests
import time
from bs4 import BeautifulSoup


parser = lambda url: BeautifulSoup(requests.get(url).content, 'html.parser')


def get_img_list_cv(url): # post url
    post_parser = parser(url)
    img_list = post_parser.find_all('img')
    fold_name = post_parser.find_all('title')[1].get_text()
    return img_list, fold_name


def get_img_list(url):  # readlist url
    post_parser = parser(url)
    fold_name = post_parser.find('title').get_text()[:-11]
    scr = post_parser.find('script').get_text()
    article_id_list = scr[scr.index('articlelistIds')+18:scr.index(']')].split(',')
    img_list = []
    for article_id in article_id_list:
        article_url = f'https://www.bilibili.com/read/cv{article_id}'
        img_list += parser(article_url).find_all('img')
    return img_list, fold_name


def download_img_list(img_list, fold_name):
    width = len(str(len(img_list)))
    if not os.path.exists(f'./{fold_name}'):
        os.makedirs(f'./{fold_name}')
    for index, img in enumerate(img_list):
        if not os.path.exists(f'.//{fold_name}/{f"{index}".zfill(width)}.jpg'):
            img_url = requests.get(f'https:{img["data-src"]}', stream=True)
            with open(f'.//{fold_name}/{f"{index}".zfill(width)}.jpg', 'wb') as f:
                f.write(img_url.content)
                print(f'{index+1}/{len(img_list)} file(s) downloaded.')
        else:
            print(f'The {index+1}/{len(img_list)} had been downloaded before.')
    return


if __name__ == '__main__':
    input = sys.argv[1]
    if input[:2] == 'cv':
        temp = get_img_list_cv(f'https://www.bilibili.com/read/{input}')
    elif input[:2] == 'rl':
        temp = get_img_list(f'https://www.bilibili.com/read/readlist/{input}')
    for i in range(3):
        try:
            download_img_list(temp[0], temp[1])
            break
        except Exception as e:
            if i == 2:
                print(f'Sorry but it failed. Error: {e}')
                break
            print('Something is wrong, restarting...')
            time.sleep(3)
            pass
    print('Done.')

```
數算一下，這半年來也是碌碌無為。現在上起拿手科目的課似乎沒什麽效用，所以都在補短板，希望短板們不要辜負了我。最高興的事情是生競拿了國三，雖說沒什麽用，而且據說江蘇得獎非常簡單（畢竟本省競賽參與度很低），但還是給了自己點信心。
