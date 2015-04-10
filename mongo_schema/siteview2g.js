//clone

//req fields
db.siteview2g_sample.find({},{
"MSC_CODE" : 1,     //"MSC_CODE" : "JHOMSC4",
"BTS_CODE" : 1,     //"BTS_CODE" : "JHOBSC33",
"SITE_ID" : 1,      //"SITE_ID" : 10009,
"SITE_NAME" : 1,    //"SITE_NAME" : "台北NOVA",
"BELONG_TO" : 1,    //"BELONG_TO" : "第一維運處",
"CELL_NO" : 1,      //----------"CELL_NO" : 16041,
"LAC_OD" : 1,       //----------"LAC_OD" : 14103,
"BTS_ADDRESS" : 1,  //"BTS_ADDRESS" : "台北市中正區",
});

//assert fields
db.siteview2g_sample.find({},{
    "SITE_ID" : 1,      //"SITE_ID" : 10009,
    "CELL_NO" : 1,      //----------"CELL_NO" : 16041,
    "LAC_OD" : 1,       //----------"LAC_OD" : 14103,
});

//all fields
db.siteview2g_sample.findOne(
{
"_id" : ObjectId("5512354d90b534c75ec07d6b"),
"MSC_CODE" : "JHOMSC4",
"BTS_CODE" : "JHOBSC33",
"SITE_ID" : 10009,
"SITE_NAME" : "台北NOVA",
"BELONG_TO" : "第一維運處",
"CELL_NO" : 16041,
"LAC_OD" : 14103,
"RACODE" : 25,
"RACOL" : 0,
"NWIS_SITE_TYPE" : "BS82",
"OMP_SITE_TYPE" : "BS82",
"RACK_NO" : 1,
"LPD_BASE_NO" : 20,
"LPD_CHAN" : 1,
"SITE_NO" : 16,
"BTS" : 0,
"BSIC" : "^7-3",
"TRX" : 2,
"BCCH_FREQ" : 727,
"TRXFREQ_CALL01" : 688,
"TRXFREQ_CALL02" : "",
"TRXFREQ_CALL03" : "",
"TRXFREQ_CALL04" : "",
"TRXFREQ_CALL05" : "",
"TRXFREQ_CALL06" : "",
"TRXFREQ_CALL07" : "",
"TRXFREQ_CALL08" : "",
"TRXFREQ_CALL09" : "",
"TRXFREQ_CALL10" : "",
"LONGITUDE" : "",
"LAT" : "",
"ANTENNA_ANGLE" : 0,
"ANTENNA_INCLINATION" : "0/0/0",
"ANTENNA_HEIGHT" : 0,
"BTS_ADDRESS" : "台北市中正區",
"BTS_PROP" : "都會區(2小時內維修)",
"IS_VIP" : "N",
"BTS_STATUS" : "OnAir(BI完工)",
"ANTENNA_MODEL" : "Omni",
"IN_OUT_DOOR" : "INDOOR",
"ANTENNA_VENDER" : "xxx",
"ANTENNA_HALF_POWER_ANGLE" : 360,
"OPERATION_UNIT" : "北市南維運一課"
});

var keys = [];
for(var k in query) keys.push(k);
//keys.length;



MSC_CODE
BTS_CODE
SITE_ID
SITE_NAME
BELONG_TO
CELL_NO
LAC_OD
RACODE
RACOL
NWIS_SITE_TYPE
OMP_SITE_TYPE
RACK_NO
LPD_BASE_NO
LPD_CHAN
SITE_NO
BTS
BSIC
TRX
BCCH_FREQ
TRXFREQ_CALL01
TRXFREQ_CALL02
TRXFREQ_CALL03
TRXFREQ_CALL04
TRXFREQ_CALL05
TRXFREQ_CALL06
TRXFREQ_CALL07
TRXFREQ_CALL08
TRXFREQ_CALL09
TRXFREQ_CALL10
LONGITUDE
LAT
ANTENNA_ANGLE
ANTENNA_INCLINATION
ANTENNA_HEIGHT
BTS_ADDRESS
BTS_PROP
IS_VIP
BTS_STATUS
ANTENNA_MODEL
IN_OUT_DOOR
ANTENNA_VENDER
ANTENNA_HALF_POWER_ANGLE
OPERATION_UNIT


<?xml version="1.0" encoding="UTF-8"?>
<schema>
<column comment="" default="" key="false" label="MSC_CODE" length="-1" nullable="true" originalDbColumnName="MSC_CODE" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="BTS_CODE" length="-1" nullable="true" originalDbColumnName="BTS_CODE" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="SITE_ID" length="-1" nullable="true" originalDbColumnName="SITE_ID" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="SITE_NAME" length="-1" nullable="true" originalDbColumnName="SITE_NAME" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="BELONG_TO" length="-1" nullable="true" originalDbColumnName="BELONG_TO" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="CELL_NO" length="-1" nullable="true" originalDbColumnName="CELL_NO" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="LAC_OD" length="-1" nullable="true" originalDbColumnName="LAC_OD" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="RACODE" length="-1" nullable="true" originalDbColumnName="RACODE" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="RACOL" length="-1" nullable="true" originalDbColumnName="RACOL" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="NWIS_SITE_TYPE" length="-1" nullable="true" originalDbColumnName="NWIS_SITE_TYPE" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="OMP_SITE_TYPE" length="-1" nullable="true" originalDbColumnName="OMP_SITE_TYPE" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="RACK_NO" length="-1" nullable="true" originalDbColumnName="RACK_NO" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="LPD_BASE_NO" length="-1" nullable="true" originalDbColumnName="LPD_BASE_NO" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="LPD_CHAN" length="-1" nullable="true" originalDbColumnName="LPD_CHAN" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="SITE_NO" length="-1" nullable="true" originalDbColumnName="SITE_NO" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="BTS" length="-1" nullable="true" originalDbColumnName="BTS" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="BSIC" length="-1" nullable="true" originalDbColumnName="BSIC" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="TRX" length="-1" nullable="true" originalDbColumnName="TRX" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="BCCH_FREQ" length="-1" nullable="true" originalDbColumnName="BCCH_FREQ" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="TRXFREQ_CALL01" length="-1" nullable="true" originalDbColumnName="TRXFREQ_CALL01" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="TRXFREQ_CALL02" length="-1" nullable="true" originalDbColumnName="TRXFREQ_CALL02" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="TRXFREQ_CALL03" length="-1" nullable="true" originalDbColumnName="TRXFREQ_CALL03" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="TRXFREQ_CALL04" length="-1" nullable="true" originalDbColumnName="TRXFREQ_CALL04" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="TRXFREQ_CALL05" length="-1" nullable="true" originalDbColumnName="TRXFREQ_CALL05" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="TRXFREQ_CALL06" length="-1" nullable="true" originalDbColumnName="TRXFREQ_CALL06" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="TRXFREQ_CALL07" length="-1" nullable="true" originalDbColumnName="TRXFREQ_CALL07" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="TRXFREQ_CALL08" length="-1" nullable="true" originalDbColumnName="TRXFREQ_CALL08" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="TRXFREQ_CALL09" length="-1" nullable="true" originalDbColumnName="TRXFREQ_CALL09" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="TRXFREQ_CALL10" length="-1" nullable="true" originalDbColumnName="TRXFREQ_CALL10" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="LONGITUDE" length="-1" nullable="true" originalDbColumnName="LONGITUDE" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="LAT" length="-1" nullable="true" originalDbColumnName="LAT" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="ANTENNA_ANGLE" length="-1" nullable="true" originalDbColumnName="ANTENNA_ANGLE" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="ANTENNA_INCLINATION" length="-1" nullable="true" originalDbColumnName="ANTENNA_INCLINATION" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="ANTENNA_HEIGHT" length="-1" nullable="true" originalDbColumnName="ANTENNA_HEIGHT" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="BTS_ADDRESS" length="-1" nullable="true" originalDbColumnName="BTS_ADDRESS" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="BTS_PROP" length="-1" nullable="true" originalDbColumnName="BTS_PROP" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="IS_VIP" length="-1" nullable="true" originalDbColumnName="IS_VIP" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="BTS_STATUS" length="-1" nullable="true" originalDbColumnName="BTS_STATUS" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="ANTENNA_MODEL" length="-1" nullable="true" originalDbColumnName="ANTENNA_MODEL" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="IN_OUT_DOOR" length="-1" nullable="true" originalDbColumnName="IN_OUT_DOOR" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="ANTENNA_VENDER" length="-1" nullable="true" originalDbColumnName="ANTENNA_VENDER" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="ANTENNA_HALF_POWER_ANGLE" length="-1" nullable="true" originalDbColumnName="ANTENNA_HALF_POWER_ANGLE" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="OPERATION_UNIT" length="-1" nullable="true" originalDbColumnName="OPERATION_UNIT" pattern="" precision="-1" talendType="id_String" type=""/>
</schema>