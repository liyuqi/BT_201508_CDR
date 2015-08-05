#! /bin/bash

#1. 建立目錄  bt3 bt4
rm -r ~/m2205
mkdir -p ~/m2205
cd ~/m2205
mkdir s0 s1 s2 s3

ssh btserver2@btserver2 '
rm -r ~/m2205
mkdir -p ~/m2205
cd ~/m2205
mkdir s0 s1 s2 s3
'
ssh btserver@btserver3 '
rm -r ~/m2205
mkdir -p ~/m2205
cd ~/m2205
mkdir s0 s1 s2 s3
'

ssh btserver4@btserver4 '
rm -r ~/m2205
mkdir -p ~/m2205
cd ~/m2205
mkdir s0 s1 s2 s3
mkdir cfg0 cfg1 cfg2
'

#2. 啟動mongod (加入--shardsvr參數)(加入--replSet參數)  (bt1 bt4)
mongod --dbpath ~/m2205/s0 --logpath ~/m2205/s0/s0.log --port 20000 --fork --shardsvr --replSet sh0
mongod --dbpath ~/m2205/s1 --logpath ~/m2205/s1/s1.log --port 20001 --fork --shardsvr --replSet sh1
mongod --dbpath ~/m2205/s2 --logpath ~/m2205/s2/s2.log --port 20002 --fork --shardsvr --replSet sh2
mongod --dbpath ~/m2205/s3 --logpath ~/m2205/s3/s3.log --port 20003 --fork --shardsvr --replSet sh3

ssh btserver2@btserver2 '
mongod --dbpath ~/m2205/s0 --logpath ~/m2205/s0/s0.log --port 20000 --fork --shardsvr --replSet sh0
mongod --dbpath ~/m2205/s1 --logpath ~/m2205/s1/s1.log --port 20001 --fork --shardsvr --replSet sh1
mongod --dbpath ~/m2205/s2 --logpath ~/m2205/s2/s2.log --port 20002 --fork --shardsvr --replSet sh2
mongod --dbpath ~/m2205/s3 --logpath ~/m2205/s3/s3.log --port 20003 --fork --shardsvr --replSet sh3
'
ssh btserver@btserver3 '
mongod --dbpath ~/m2205/s0 --logpath ~/m2205/s0/s0.log --port 20000 --fork --shardsvr --replSet sh0
mongod --dbpath ~/m2205/s1 --logpath ~/m2205/s1/s1.log --port 20001 --fork --shardsvr --replSet sh1
mongod --dbpath ~/m2205/s2 --logpath ~/m2205/s2/s2.log --port 20002 --fork --shardsvr --replSet sh2
mongod --dbpath ~/m2205/s3 --logpath ~/m2205/s3/s3.log --port 20003 --fork --shardsvr --replSet sh3
'
ssh btserver4@btserver4 '
mongod --dbpath ~/m2205/s0 --logpath ~/m2205/s0/s0.log --port 20000 --fork --shardsvr --replSet sh0
mongod --dbpath ~/m2205/s1 --logpath ~/m2205/s1/s1.log --port 20001 --fork --shardsvr --replSet sh1
mongod --dbpath ~/m2205/s2 --logpath ~/m2205/s2/s2.log --port 20002 --fork --shardsvr --replSet sh2
mongod --dbpath ~/m2205/s3 --logpath ~/m2205/s3/s3.log --port 20003 --fork --shardsvr --replSet sh3
'

#3. rs初始化 (bt4)
mongo admin --port 20000 --eval "config0 = {_id:'sh0',members:[{_id:0,host:'btserver1:20000',priority:2},{_id:1,host:'btserver2:20000'}]};rs.initiate(config0);"
mongo admin --port 20001 --eval "config1 = {_id:'sh1',members:[{_id:0,host:'btserver1:20001'},{_id:1,host:'btserver2:20001',priority:2}]};rs.initiate(config1);"



ssh btserver4@btserver4 "
mongo admin --port 20002 --eval \"config2 = {_id:'sh2',members:[{_id:0,host:'btserver3:20002',priority:2},{_id:1,host:'btserver4:20002'}]};rs.initiate(config2);\"
mongo admin --port 20003 --eval \"config3 = {_id:'sh3',members:[{_id:0,host:'btserver3:20003'},{_id:1,host:'btserver4:20003',priority:2}]};rs.initiate(config3);\"
"



#4. 建立configsvr (bt4)

ssh btserver4@btserver4 '
mongod --configsvr --dbpath ~/m2205/cfg0 --logpath ~/m2205/cfg0/cfg0.log --port 30000 --fork
mongod --configsvr --dbpath ~/m2205/cfg1 --logpath ~/m2205/cfg1/cfg1.log --port 30001 --fork
mongod --configsvr --dbpath ~/m2205/cfg2 --logpath ~/m2205/cfg2/cfg2.log --port 30002 --fork
'

date
echo '20s'
sleep 20
date

#5. 建立mongos (bt1 bt2)

mongos --port 40000 --configdb btserver4:30000,btserver4:30001,btserver4:30002 --logpath ~/m2205/mongos.log --fork


ssh btserver4@btserver4 '
mongos --port 40000 --configdb btserver4:30000,btserver4:30001,btserver4:30002 --logpath ~/m2205/mongos.log --fork
'


#6. mongos連結分片 (bt1)
mongo admin --port 40000 --eval 'sh.addShard("sh0/btserver1:20000,btserver2:20000")'
mongo admin --port 40000 --eval 'sh.addShard("sh1/btserver1:20001,btserver2:20001")'
mongo admin --port 40000 --eval 'sh.addShard("sh2/btserver3:20002,btserver4:20002")'
mongo admin --port 40000 --eval 'sh.addShard("sh3/btserver3:20003,btserver4:20003")'


#7. 選擇開啟分片功能的資料庫 (bt1)
mongo admin --port 40000 --eval 'sh.enableSharding("fluentd")'

#8. 資料存放在分片的位置和方式(shard key) (bt1)
#mongo admin --port 40000 --eval 'sh.shardCollection("fluentd.cep3g",{cause_for_termination:1,date_time:1})'
#mongo admin --port 40000 --eval 'sh.shardCollection("fluentd.cep3g",{record_type:1,date_time:1})'
#mongo admin --port 40000 --eval 'sh.shardCollection("fluentd.cep3g",{record_type:1})'
#mongo admin --port 40000 --eval 'sh.shardCollection("fluentd.cep3g",{record_type:"hashed"})'

#mongo admin --port 40000 --eval 'sh.shardCollection("fluentd.cep3g",{_id:1})'
mongo admin --port 40000 --eval 'sh.shardCollection("fluentd.cep3g",{_id:"hashed"})'

#9. 建立Index  (bt1)
#mongo fluentd --port 40000 --eval 'db.logs.ensureIndex({"host.ip":1,"timestamp":1})'



#mongo admin --port 40000 --eval 'sh.splitAt("fluentd.cep3g",{record_type:"1"})'
#mongo admin --port 40000 --eval 'sh.splitAt("fluentd.cep3g",{record_type:"2"})'

mongo fluentd --port 40000 --eval 'sh.setBalancerState(false)'

