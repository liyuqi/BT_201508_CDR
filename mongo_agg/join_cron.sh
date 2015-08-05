max_id=`mongo cdr --host 192.168.0.190 --port 40000 --eval 'db.cep3g_sample.find({record_type:{\$in:["1","2"]}}).limit(1).forEach(function(doc){print(doc._id)})' |tail -n 1`

pick=1000
bucket=`mongo cdr --host 192.168.0.190 --port 40000 --eval "var n = (db.cep3g_gen.count() - db.cep3g_join.count())/$pick; print(Math.ceil(n));" | tail -n 1`

echo $bucket
pick=5
if [$bucket -gt 0]; then
    for n in $(seq 1 $bucket);
    do
        echo "$bucket"
        (mongo cdr --eval "var max_id=$_max_id, pick=$pick, n=$n;" cep3g_join_cron.js) &
        # > ./cep3g_join_result_$(date +"%Y%m%d")_$(date +"%H%M%S").txt
    done
else
    echo "$bucket"
fi

#other version
if [$bucket -gt 0]; then

       n in $(seq 1 $bucket) | (mongo cdr --eval "var max_id=$_max_id, pick=$pick, n=$n;" cep3g_join_cron.js) &
        # > ./cep3g_join_result_$(date +"%Y%m%d")_$(date +"%H%M%S").txt
else
    echo "$bucket"
fi