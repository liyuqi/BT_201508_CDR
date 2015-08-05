mongo cdr --port 40000 "col_cardinality.js" --eval "var collection_name = 'cep3g_sample'"
>  col_cardinality_$(date +"%Y%m%d")_$(date +"%H%M%S").txt