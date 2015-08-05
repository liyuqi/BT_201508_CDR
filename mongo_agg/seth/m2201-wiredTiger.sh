#! /bin/bash

#1. 建立目錄
rm -r ~/m2205
mkdir -p ~/m2205
cd ~/m2205
mkdir s0 s1 s2 s3 cfg0 cfg1 cfg2

ssh btserver2@btserver2 '
rm -r ~/m2205
mkdir -p ~/m2205
cd ~/m2205
mkdir s0 s1 s2 s3 cfg0 cfg1 cfg2
'

#2. 啟動mongod
mongod --storageEngine wiredTiger --dbpath ~/m2205/s0 --logpath ~/m2205/s0/s0.log --port 20000 --fork --shardsvr --replSet sh0

ssh btserver2@btserver2 '
mongod --storageEngine wiredTiger --dbpath ~/m2205/s0 --logpath ~/m2205/s0/s0.log --port 20000 --fork --shardsvr --replSet sh0
'

#3. rs初始化
mongo admin --port 20000 --eval "config0 = {_id:'sh0',members:[{_id:0,host:'btserver1:20000',priority:2},{_id:1,host:'btserver2:20000'}]};rs.initiate(config0);";


#4. 建立configsvr

mongod --configsvr --dbpath ~/m2205/cfg0 --logpath ~/m2205/cfg0/cfg0.log --port 30000 --fork
mongod --configsvr --dbpath ~/m2205/cfg1 --logpath ~/m2205/cfg1/cfg1.log --port 30001 --fork

ssh btserver2@btserver2 '
mongod --configsvr --dbpath ~/m2205/cfg2 --logpath ~/m2205/cfg2/cfg2.log --port 30002 --fork
'

date
echo '20s'
sleep 20
date

#5. 建立mongos

mongos --port 40000 --configdb btserver1:30000,btserver1:30001,btserver2:30002 --logpath ~/m2205/mongos.log --fork


ssh btserver2@btserver2 '
mongos --port 40000 --configdb btserver1:30000,btserver1:30001,btserver2:30002 --logpath ~/m2205/mongos.log --fork
'

#6. mongos連結分片
mongo admin --port 40000 --eval 'sh.addShard("sh0/btserver1:20000,btserver2:20000")'


#7. 選擇開啟分片功能的資料庫
mongo admin --port 40000 --eval 'sh.enableSharding("fluentd")'

#8. SK
mongo admin --port 40000 --eval 'sh.shardCollection("fluentd.cep2g",{_id:1})'
mongo admin --port 40000 --eval 'sh.shardCollection("fluentd.cep2g_string",{_id:1})'
mongo admin --port 40000 --eval 'sh.shardCollection("fluentd.cep3g",{_id:1})'
mongo admin --port 40000 --eval 'sh.shardCollection("fluentd.cep3g_string",{_id:1})'

#9. Indexes
#mongo fluentd --port 40000 --eval 'db.logs.createIndex({"TIMESTAMP":1})'




