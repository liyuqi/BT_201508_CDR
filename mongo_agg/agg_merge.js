mongo cdr --port 40000 "./agg_merge.js" --eval "var src_col = 'cep3g_agg',dst_col='cep3g_agg_final'" >  agg_merge_$(date +"%Y%m%d")_$(date +"%H%M%S").txt
var T0,T1;
T0 = new Date();
print('start'+T0.toLocaleTimeString());
var src_col = db.getCollection(src_col.toString()).find({},{}).forEach(function (doc) { //================= cep gprs find =================
//while(cdr2g.hasNext()){
    //var doc = col.next();
    if(doc.up_flag!=2) {  //================================================= update done, erich up_flag:1
        if (doc.RECORD_TYPE == "19") {
            try {
                var cell = doc.CALLED_SUBS_FIRST_LAC + '-' + doc.CALLED_SUBS_FIRST_SAC;
                try {
                    doc.SITE_ID     = site3g_map[cell].SITE_ID;
                    doc.SITE_NAME   = site3g_map[cell].SITE_NAME;
                    doc.BELONG_TO   = site3g_map[cell].BELONG_TO;
                    doc.SAC         = site3g_map[cell].SAC;  //#
                    doc.LAC         = site3g_map[cell].LAC;   //#
                    doc.BTS_ADDRESS = site3g_map[cell].BTS_ADDRESS;
                } catch (e) {} //doc.SITE_ID = '-----'; }
            } catch (e) {}
            if  (doc.G_UPLINK == null || "") {   doc.G_UPLINK = 0;   }
            else{doc.G_UPLINK = Number(doc.G_UPLINK);}
            if  (doc.G_DOWNLINK == null || "") {    doc.G_DOWNLINK = 0;   }
            else{doc.G_DOWNLINK = Number(doc.G_DOWNLINK);}
        }
        print(new Date().toLocaleTimeString() + '\trt:' + doc.RECORD_TYPE +
            '\tcell:' + doc.CALLED_SUBS_FIRST_LAC + '-' + doc.CALLED_SUBS_FIRST_SAC +
            '     \tsite:' + doc.SITE_ID + '\tup:'+ doc.G_UPLINK + '\tdn:'+doc.G_DOWNLINK
        );

        //doc.up_flag = 1;  //================================================= update done, erich up_flag:1
        //db.cdrgprs.save(doc); //============= cep 2g save =============
        db.cepgprs_sample.update({_id:doc._id},{$set : {up_flag:1}}); //============= cep 2g save =============
        //db.cepgprs_gen.update({_id:doc._id},{$set : {up_flag:1}}); //============= cep 2g save =============
        db.cepgprs_join.save(doc);
        i++;
    }else{} //print("else")


});
print(new Date().toLocaleTimeString()+'\tprocess:'+i+'\tdb.cepgprs_join.count()'+db.cepgprs_join.count());
