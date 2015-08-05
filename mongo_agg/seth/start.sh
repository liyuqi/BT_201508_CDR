#!/bin/bash

#rm ~/fluentd/agg/log/*.txt

#mongo cdr cep3g_gen_time.js --eval "var start = 0, end = 150, pick = 100000" --port 40000 > ~/fluentd/agg/log/cep3g_gen.txt
#sleep 3600
#echo "========= the End ~  db.cep3g_gen.count()"  >> ~/fluentd/agg/log/cep3g_gen.txt
#mongo cdr --port 40000 --eval "db.cep3g_gen.count()"  >> ~/fluentd/agg/log/cep3g_gen.txt


mongo cdr cep3g_join.js --port 40000  > ~/fluentd/agg/log/cep3g_join.txt
#sleep 3600
#echo "========= the End ~  db.cep3g_join.count()" >> ~/fluentd/agg/log/cep3g_join.txt
#mongo cdr --port 40000 --eval "db.cep3g_join.count()" >> ~/fluentd/agg/log/cep3g_join.txt



#mongo cdr cep3g_agg.js  --port 40000  > ~/fluentd/agg/log/cep3g_agg.txt   #(cep3g_agg.js single process)
#sleep 3600
#echo "========= the End ~  db.cep3g_agg.count()"  >> ~/fluentd/agg/log/cep3g_agg.txt
#mongo cdr --port 40000 --eval "db.cep3g_agg.count()"  >> ~/fluentd/agg/log/cep3g_agg.txt



#mongo cdr cep3g_mr.js   --port 40000  > ~/fluentd/agg/log/cep3g_mr.txt
#echo "=========   db.cep3g_mr.count()"   >> ~/fluentd/agg/log/cep3g_mr.txt
#mongo cdr --port 40000 --eval "db.cep3g_mr.count()"   >> ~/fluentd/agg/log/cep3g_mr.txt

