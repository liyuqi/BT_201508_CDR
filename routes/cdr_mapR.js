/**
 * Created by Yuqi on 2015/3/23.
 */

db.cep2g.mapReduce(
    function () {
        //var time= this.timestamp.substring(0,2);
        var key = {
            calltransactiontype: this.calltransactiontype,
            lacod: this.lastcellid_lac,
            cellid: this.lastcellid,
            date: this.startofchargingdate,
            time: this.timestamp.substring(0,2)
            //year: (new Date(this.startofchargingtime * 1000)).getFullYear(),
            //month: (new Date(this.startofchargingtime * 1000)).getMonth(),
            //day: (new Date(this.startofchargingtime * 1000)).getDate(),
            //hour: (new Date(this.startofchargingtime * 1000)).getHours(),
            //minute: (new Date(this.startofchargingtime * 1000)).getMinutes()
            //time : (new Date(this.startofchargingtime*1000))
        };
        var value = {
            callduration: this.callduration,
            time: new Date(this.startofchargingtime * 1000)
        };
        emit(key, value);
    },
    function (key, values) {
        var doc = {
            SITE_ID: "",
            HO_CALLED_COUNT: 0,
            HO_CALLED_SECONDS: 0,
            HO_CALLED_MINUTES: 0,
            //SUM_CALLED_COUNT_0_3: 0,
            //SUM_CALLED_COUNT_3_5: 0,
            //SUM_CALLED_COUNT_5_7: 0,
            //SUM_CALLED_COUNT_7_10: 0,
            //SUM_CALLED_COUNT_10UP: 0,
            //SUM_CALLED_MINUTES_0_3: 0,
            //SUM_CALLED_MINUTES_3_5: 0,
            //SUM_CALLED_MINUTES_5_7: 0,
            //SUM_CALLED_MINUTES_7_10: 0,
            SUM_CALLED_MINUTES_10UP: 0
        };

        values.forEach(function (value) {
            doc.HO_CALLED_COUNT += 1;
            doc.HO_CALLED_SECONDS += value.callduration;
            doc.HO_CALLED_MINUTES += (value.callduration / 60);

            //if ((value.callduration / 60) >= 0 && (value.callduration / 60) < 3) {
            //    doc.SUM_CALLED_COUNT_0_3 += 1;
            //    doc.SUM_CALLED_MINUTES_0_3 += value.callduration;
            //} else if ((value.callduration / 60) >= 3 && (value.callduration / 60) < 5) {
            //    doc.SUM_CALLED_COUNT_3_5 += 1;
            //    doc.SUM_CALLED_MINUTES_3_5 += value.callduration;
            //} else if ((value.callduration / 60) >= 5 && (value.callduration / 60) < 7) {
            //    doc.SUM_CALLED_COUNT_5_7 += 1;
            //    doc.SUM_CALLED_MINUTES_5_7 += value.callduration;
            //} else if ((value.callduration / 60) >= 7 && (value.callduration / 60) < 10) {
            //    doc.SUM_CALLED_COUNT_7_10 += 1;
            //    doc.SUM_CALLED_MINUTES_7_10 += value.callduration;
            //} else
            if ((value.callduration / 60) >= 10) {
                doc.SUM_CALLED_COUNT_10UP += 1;
                doc.SUM_CALLED_MINUTES_10UP += value.callduration;
            }
        });
        //save.SITE_ID = key._id.cellid + "-" + key._id.lacod;
        doc.time = values.time;
        return doc;
    },
    {
        query: {//--------------------------------filter------------------------------
            startofchargingdate: /^2015-01-05/,//{$in:[/^2015-01-05/]}
            timestamp: /^10/ //{$in:[/^10/]}
        },
        out: "mapR2g1"
    });


db.cep2g.update({startofchargingtime:1},{startofchargingtime:{$multiply:["$startofchargingtime",1000]}})

var cep2g = db.cep2g.find()

var gmapResult = [];
while(gmapDataset.hasNext()){
    var tempset = gmapDataset.next();
    var count =0;
    if(tempset==undefined){
        count++;
    }else{
        gmapResult.push(tempset);
    }
}