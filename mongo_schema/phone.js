//req fields
db.phone_sample.find({},
{
    "PT_OID" : 1,       //"PT_OID" : 1,
    "IMEI_VALUE" :1,    //"IMEI_VALUE" : NumberLong(33229036),
    "DMS_ID" : 1,       //"DMS_ID" : 1,
    "VENDOR" : 1,       //"VENDOR" : "ALCATEL",
    "MODEL" : 1,        //"OT511",
    "_id" : 1           //ObjectId("5512418e90b534c75ec2706e")
});

//all fields
> db.phone_sample.findOne(
{
    "_id" : ObjectId("5512418e90b534c75ec2706e"),
    "PT_OID" : 1,
    "IMEI_VALUE" : NumberLong(33229036),
    "DMS_ID" : 1,
    "VENDOR" : "ALCATEL",
    "MODEL" : "OT511",
    "STATUS" : "approved",
    "SUPPORTEDBEARERS" : "GSM1800, GSM900",
    "DEVICETYPE" : "Handset",
    "SMARTDEVICE" : 0,
    "OSNAME" : "",
    "CR_DATE" : "2014-07-31 20:35:01",
    "CR_USER" : "cep",
    "DATE_STAMP" : "2015-03-11 00:32:11",
    "USER_STAMP" : "cep",
    "VERSION" : 1
});



<column comment="" default="" key="false" label=PT_OID
<column comment="" default="" key="false" label=IMEI_VALUE
<column comment="" default="" key="false" label=DMS_ID
<column comment="" default="" key="false" label=VENDOR
<column comment="" default="" key="false" label=MODEL
<column comment="" default="" key="false" label=STATUS
<column comment="" default="" key="false" label=SUPPORTEDBEARERS
<column comment="" default="" key="false" label=DEVICETYP
<column comment="" default="" key="false" label=SMARTDEVICE
<column comment="" default="" key="false" label=OSNAME
<column comment="" default="" key="false" label=CR_DATE
<column comment="" default="" key="false" label=CR_USER
<column comment="" default="" key="false" label=DATE_STAMP
<column comment="" default="" key="false" label=USER_STAMP
<column comment="" default="" key="false" label=VERSION


<?xml version="1.0" encoding="UTF-8"?>
<schema>
<column comment="" default="" key="false" label="PT_OID" length="-1" nullable="true" originalDbColumnName="PT_OID" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="IMEI_VALUE" length="-1" nullable="true" originalDbColumnName="IMEI_VALUE" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="DMS_ID" length="-1" nullable="true" originalDbColumnName="DMS_ID" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="VENDOR" length="-1" nullable="true" originalDbColumnName="VENDOR" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="MODEL" length="-1" nullable="true" originalDbColumnName="MODEL" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="STATUS" length="-1" nullable="true" originalDbColumnName="STATUS" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="SUPPORTEDBEARERS" length="-1" nullable="true" originalDbColumnName="SUPPORTEDBEARERS" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="DEVICETYP" length="-1" nullable="true" originalDbColumnName="DEVICETYP" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="SMARTDEVICE" length="-1" nullable="true" originalDbColumnName="SMARTDEVICE" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="OSNAME" length="-1" nullable="true" originalDbColumnName="OSNAME" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="CR_DATE" length="-1" nullable="true" originalDbColumnName="CR_DATE" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="CR_USER" length="-1" nullable="true" originalDbColumnName="CR_USER" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="DATE_STAMP" length="-1" nullable="true" originalDbColumnName="DATE_STAMP" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="USER_STAMP" length="-1" nullable="true" originalDbColumnName="USER_STAMP" pattern="" precision="-1" talendType="id_String" type=""/>
<column comment="" default="" key="false" label="VERSION" length="-1" nullable="true" originalDbColumnName="VERSION" pattern="" precision="-1" talendType="id_String" type=""/>
</schema>