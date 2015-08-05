#!/bin/bash
mongo cdr cep3g_gen_time.js --eval "var start =  0, end = 2, pick = 100000" --port 40000 > ~/fluentd/agg/log/cep3g_gen1.txt &
mongo cdr cep3g_gen_time.js --eval "var start =  2, end = 4, pick = 100000" --port 40000 > ~/fluentd/agg/log/cep3g_gen2.txt &
mongo cdr cep3g_gen_time.js --eval "var start =  4, end = 6, pick = 100000" --port 40000 > ~/fluentd/agg/log/cep3g_gen3.txt &
mongo cdr cep3g_gen_time.js --eval "var start =  6, end = 8, pick = 100000" --port 40000 > ~/fluentd/agg/log/cep3g_gen4.txt &
mongo cdr cep3g_gen_time.js --eval "var start =  8, end = 10, pick = 100000" --port 40000 > ~/fluentd/agg/log/cep3g_gen5.txt &
