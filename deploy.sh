#! /bin/bash
git pull origin master
pid=$(netstat -ap | grep 3000 | awk -F'/' '{print $1}' | awk '{print $7}')
kill $pid
npm install
npm run serve