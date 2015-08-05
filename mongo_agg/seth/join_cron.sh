#!/bin/bash

# 以下大改
#seth 測試用 6~12 行  gen=>gen1 join=>join1   
echo "start:" `date +%F\ %T`
bucket_size=100000
bucket_need=`mongo cdr --quiet --port 40000 --eval "var n = (db.cep3g_gen1.count() - db.cep3g_join1.count())/$bucket_size; print(Math.ceil(n));"`		
echo "bucket_need="$bucket_need

isInit=`mongo cdr --quiet --port 40000 --eval 'db.cep3g_join1.count()'`
gen_min_id=`mongo cdr --quiet --port 40000 --eval 'db.cep3g_gen1.find({record_type:{\$in:["1","2"]}}).sort({_id:1}).limit(1).forEach(function(doc){print(doc._id)})'`
join_max_id=`mongo cdr --quiet --port 40000 --eval 'db.cep3g_join1.find({record_type:{\$in:["1","2"]}}).sort({_id:-1}).limit(1).forEach(function(doc){print(doc._id)})'`


bucket_process=5	#5 process use 60% CPU
#sleep_second=200	#1 process join 10w records need 80 seconds。 應該要測skip 10w, 20w, 30w, 40w ，開始join前，各需要多久的時間。


if [ $isInit -eq 0 ]; then
	temp_id=$gen_min_id
else
	temp_id=$join_max_id
fi


if [ $bucket_need -gt 0 ] && [ $bucket_need -le $bucket_process ]; then     #  前面條件是避免gen的筆數比join還少，這樣奇怪。
	for n in $(seq 1 $bucket_need);
	do
		mongo cdr --port 40000  --eval "var max_id=$temp_id, bucket_size=$bucket_size, n=$n;" cep3g_join_cron.js  > ~/fluentd/agg/log/cep3g_join_result_bucket$n.txt &        
	done
	# sleep $sleep_second	
	while [ `pgrep -f cep3g_join_cron.js | wc -l` -gt 0 ]; do sleep 10; done	
	mongo cdr cep3g_agg.js  --port 40000  > ~/fluentd/agg/log/cep3g_agg.txt
	echo "end:" `date +%F\ %T`
elif [ $bucket_need -gt 0 ] && [ $bucket_need -gt $bucket_process ]; then
	for n in $(seq 1 5)
	do
		mongo cdr --port 40000  --eval "var max_id=$temp_id, bucket_size=$bucket_size, n=$n;" cep3g_join_cron.js  > ~/fluentd/agg/log/cep3g_join_result_bucket$n.txt &
	done
	# sleep $sleep_second  
	while [ `pgrep -f cep3g_join_cron.js | wc -l` -gt 0 ]; do sleep 10; done	
	sh ~/fluentd/agg/join_cron.sh
	echo "end:" `date +%F\ %T`
else
	echo "Warning: bucket_need less than 0"
	echo "end:" `date +%F\ %T`
fi
