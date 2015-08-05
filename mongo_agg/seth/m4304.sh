#! /bin/bash

##1. 建立目錄
#sudo rm -r ~/m2205*
#mkdir -p ~/m2205
#cd ~/m2205
#mkdir s0 s1 s2 s3
#mkdir cfg0 cfg1 cfg2

#ssh btserver2@btserver2 "
#sudo rm -r ~/m2205*
#mkdir -p ~/m2205
#cd ~/m2205
#mkdir s0 s1 s2 s3
#mkdir cfg0 cfg1 cfg2
#"

#ssh btserver@btserver3 "
#sudo rm -r ~/m2205*
#mkdir -p ~/m2205
#cd ~/m2205
#mkdir s0 s1 s2 s3
#mkdir cfg0 cfg1 cfg2
#"

#ssh btserver4@btserver4 "
#sudo rm -r ~/m2205*
#mkdir -p ~/m2205
#cd ~/m2205
#mkdir s0 s1 s2 s3
#mkdir cfg0 cfg1 cfg2
#"

#2. 啟動mongod
mongod --storageEngine wiredTiger --dbpath ~/m2205/s0 --logpath ~/m2205/s0/s0.log --port 20000 --fork --shardsvr --replSet sh0
mongod --storageEngine wiredTiger --dbpath ~/m2205/s1 --logpath ~/m2205/s1/s1.log --port 20001 --fork --shardsvr --replSet sh1
mongod --storageEngine wiredTiger --dbpath ~/m2205/s2 --logpath ~/m2205/s2/s2.log --port 20002 --fork --shardsvr --replSet sh2
mongod --storageEngine wiredTiger --dbpath ~/m2205/s3 --logpath ~/m2205/s3/s3.log --port 20003 --fork --shardsvr --replSet sh3

ssh btserver2@btserver2 "
mongod --storageEngine wiredTiger --dbpath ~/m2205/s0 --logpath ~/m2205/s0/s0.log --port 20000 --fork --shardsvr --replSet sh0
mongod --storageEngine wiredTiger --dbpath ~/m2205/s1 --logpath ~/m2205/s1/s1.log --port 20001 --fork --shardsvr --replSet sh1
mongod --storageEngine wiredTiger --dbpath ~/m2205/s2 --logpath ~/m2205/s2/s2.log --port 20002 --fork --shardsvr --replSet sh2
mongod --storageEngine wiredTiger --dbpath ~/m2205/s3 --logpath ~/m2205/s3/s3.log --port 20003 --fork --shardsvr --replSet sh3
"

ssh btserver@btserver3 "
mongod --storageEngine wiredTiger --dbpath ~/m2205/s0 --logpath ~/m2205/s0/s0.log --port 20000 --fork --shardsvr --replSet sh0
mongod --storageEngine wiredTiger --dbpath ~/m2205/s1 --logpath ~/m2205/s1/s1.log --port 20001 --fork --shardsvr --replSet sh1
mongod --storageEngine wiredTiger --dbpath ~/m2205/s2 --logpath ~/m2205/s2/s2.log --port 20002 --fork --shardsvr --replSet sh2
mongod --storageEngine wiredTiger --dbpath ~/m2205/s3 --logpath ~/m2205/s3/s3.log --port 20003 --fork --shardsvr --replSet sh3
"

ssh btserver4@btserver4 "
mongod --storageEngine wiredTiger --dbpath ~/m2205/s0 --logpath ~/m2205/s0/s0.log --port 20000 --fork --shardsvr --replSet sh0
mongod --storageEngine wiredTiger --dbpath ~/m2205/s1 --logpath ~/m2205/s1/s1.log --port 20001 --fork --shardsvr --replSet sh1
mongod --storageEngine wiredTiger --dbpath ~/m2205/s2 --logpath ~/m2205/s2/s2.log --port 20002 --fork --shardsvr --replSet sh2
mongod --storageEngine wiredTiger --dbpath ~/m2205/s3 --logpath ~/m2205/s3/s3.log --port 20003 --fork --shardsvr --replSet sh3
"

#3. rs初始化 
mongo admin --port 20000 --eval "config0 = {_id:'sh0',members:[{_id:0,host:'btserver1:20000',priority:2},{_id:1,host:'btserver2:20000'},{_id:2,host:'btserver3:20000'}]};rs.initiate(config0);"

ssh btserver2@btserver2 "
mongo admin --port 20001 --eval \"config1 = {_id:'sh1',members:[{_id:0,host:'btserver2:20001',priority:2},{_id:1,host:'btserver3:20001'},{_id:2,host:'btserver4:20001'}]};rs.initiate(config1);\"
"
mongo admin --port 20002 --eval "config2 = {_id:'sh2',members:[{_id:0,host:'btserver3:20002',priority:2},{_id:1,host:'btserver4:20002'},{_id:2,host:'btserver1:20002'}]};rs.initiate(config2);"
mongo admin --port 20003 --eval "config3 = {_id:'sh3',members:[{_id:0,host:'btserver4:20003',priority:2},{_id:1,host:'btserver1:20003'},{_id:2,host:'btserver2:20003'}]};rs.initiate(config3);"



#4. 建立configsvr
mongod --configsvr --dbpath ~/m2205/cfg0 --logpath ~/m2205/cfg0/cfg0.log --port 30000 --fork

ssh btserver2@btserver2 "
mongod --configsvr --dbpath ~/m2205/cfg1 --logpath ~/m2205/cfg1/cfg1.log --port 30001 --fork
"

ssh btserver4@btserver4 "
mongod --configsvr --dbpath ~/m2205/cfg2 --logpath ~/m2205/cfg2/cfg2.log --port 30002 --fork
"

# 等待 RS 初始化
date
echo '20s'
sleep 20
date

#5. 建立mongos
mongos --port 40000 --configdb btserver1:30000,btserver2:30001,btserver4:30002 --logpath ~/m2205/mongos.log --fork

ssh btserver2@btserver2 "
mongos --port 40000 --configdb btserver1:30000,btserver2:30001,btserver4:30002 --logpath ~/m2205/mongos.log --fork
"

ssh btserver@btserver3 "
mongos --port 40000 --configdb btserver1:30000,btserver2:30001,btserver4:30002 --logpath ~/m2205/mongos.log --fork
"

ssh btserver4@btserver4 "
mongos --port 40000 --configdb btserver1:30000,btserver2:30001,btserver4:30002 --logpath ~/m2205/mongos.log --fork
"

#6. mongos連結分片
mongo admin --port 40000 --eval 'sh.addShard("sh0/btserver1:20000,btserver2:20000,btserver3:20000")'
mongo admin --port 40000 --eval 'sh.addShard("sh1/btserver2:20001,btserver3:20001,btserver4:20001")'
mongo admin --port 40000 --eval 'sh.addShard("sh2/btserver3:20002,btserver4:20002,btserver1:20002")'
mongo admin --port 40000 --eval 'sh.addShard("sh3/btserver4:20003,btserver1:20003,btserver2:20003")'


#7. 選擇開啟分片功能的資料庫
#mongo admin --port 40000 --eval "sh.enableSharding('fluentd')"

# mongo admin --port 40000 --eval "sh.enableSharding('cdr')"



#8. SK
#mongo admin --port 40000 --eval "sh.shardCollection('fluentd.cep3g',{_id:'hashed'})"

# mongo admin --port 40000 --eval "sh.shardCollection('cdr.siteview2g_sample',{_id:'hashed'})"
# mongo admin --port 40000 --eval "sh.shardCollection('cdr.siteview3g_sample',{_id:'hashed'})"
# mongo admin --port 40000 --eval "sh.shardCollection('cdr.phone_sample',{_id:'hashed'})"
#mongo admin --port 40000 --eval "sh.shardCollection('cdr.cep2g_sample',{_id:'hashed'})"
#mongo admin --port 40000 --eval "sh.shardCollection('cdr.cep2g_gen',{_id:'hashed'})"
#mongo admin --port 40000 --eval "sh.shardCollection('cdr.cep2g_join',{_id:'hashed'})"
#mongo admin --port 40000 --eval "sh.shardCollection('cdr.cep2g_mr',{_id:'hashed'})"
# mongo admin --port 40000 --eval "sh.shardCollection('cdr.cep3g_sample',{_id:'hashed'})"
# mongo admin --port 40000 --eval "sh.shardCollection('cdr.cep3g_gen',{_id:'hashed'})"
# mongo admin --port 40000 --eval "sh.shardCollection('cdr.cep3g_join',{_id:'hashed'})"
#mongo admin --port 40000 --eval "sh.shardCollection('cdr.cep3g_mr',{_id:'hashed'})"
#mongo admin --port 40000 --eval "sh.shardCollection('cdr.cepgprs_sample',{_id:'hashed'})"
#mongo admin --port 40000 --eval "sh.shardCollection('cdr.cepgprs_gen',{_id:'hashed'})"
#mongo admin --port 40000 --eval "sh.shardCollection('cdr.cepgprs_join',{_id:'hashed'})"
#mongo admin --port 40000 --eval "sh.shardCollection('cdr.cepgprs_mr',{_id:'hashed'})"



