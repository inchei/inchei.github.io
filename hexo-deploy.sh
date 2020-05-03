hexo g
git add .
git commit -m "$1"
git push origin
git push github
git switch master
cp -r ./public/* ./blog/
git add .
git commit -m "$1"
git push origin
git push github
git switch basic