'use strict';const _0x3ddf31=_0x1c10;(function(_0x44d5a8,_0x39c8e7){const _0x533a63=_0x1c10,_0x43051c=_0x44d5a8();while(!![]){try{const _0x15a959=-parseInt(_0x533a63(0x1af))/0x1*(-parseInt(_0x533a63(0x1b0))/0x2)+parseInt(_0x533a63(0x1b3))/0x3*(parseInt(_0x533a63(0x1a3))/0x4)+parseInt(_0x533a63(0x1aa))/0x5*(parseInt(_0x533a63(0x1a5))/0x6)+-parseInt(_0x533a63(0x1b7))/0x7*(parseInt(_0x533a63(0x1b2))/0x8)+-parseInt(_0x533a63(0x1b8))/0x9+-parseInt(_0x533a63(0x1b6))/0xa+parseInt(_0x533a63(0x1a4))/0xb;if(_0x15a959===_0x39c8e7)break;else _0x43051c['push'](_0x43051c['shift']());}catch(_0x328db1){_0x43051c['push'](_0x43051c['shift']());}}}(_0x2f63,0xd25d7));function _0x1c10(_0x517ec2,_0x41daff){const _0x2f6351=_0x2f63();return _0x1c10=function(_0x1c1095,_0x4a3b4c){_0x1c1095=_0x1c1095-0x1a3;let _0x1153f4=_0x2f6351[_0x1c1095];return _0x1153f4;},_0x1c10(_0x517ec2,_0x41daff);}function _0x2f63(){const _0x5c2e34=['unmark','2395475ZkLGiw','retrieveList','http-status-codes','remove','user','15306cwKsLm','210gkgOOT','writeJson','1421520XScGNM','12HkqOUb','RoutineId','add','13282140zfYqcC','63UAxwWG','14508918CuilPw','exports','533488TqhXIM','20056058bvVLfF','18mZvLPw','../service/FavouriteService','Size','get'];_0x2f63=function(){return _0x5c2e34;};return _0x2f63();}const {Parameter,ParameterName}=require('../utils/Parameter'),FavouriteService=require(_0x3ddf31(0x1a6)),HttpStatus=require(_0x3ddf31(0x1ac)),Utils=require('../utils/writer.js');module[_0x3ddf31(0x1b9)]['mark']=async(_0x59e9ac,_0x4ad30a,_0x5dbd26)=>{const _0x4e381b=_0x3ddf31;try{const _0x45665f=Parameter['get'](_0x59e9ac,ParameterName[_0x4e381b(0x1b4)]),_0x2125db=await FavouriteService[_0x4e381b(0x1b5)](_0x59e9ac[_0x4e381b(0x1ae)],_0x45665f);Utils[_0x4e381b(0x1b1)](_0x4ad30a,_0x2125db,HttpStatus['OK']);}catch(_0x493932){_0x5dbd26(_0x493932);}},module['exports'][_0x3ddf31(0x1a9)]=async(_0xa3b475,_0x31fd64,_0x5dbcdc)=>{const _0x617555=_0x3ddf31;try{const _0x2a87de=Parameter[_0x617555(0x1a8)](_0xa3b475,ParameterName[_0x617555(0x1b4)]),_0x576eb3=await FavouriteService[_0x617555(0x1ad)](_0xa3b475[_0x617555(0x1ae)],_0x2a87de);Utils['writeJson'](_0x31fd64,_0x576eb3,HttpStatus['OK']);}catch(_0x419aec){_0x5dbcdc(_0x419aec);}},module[_0x3ddf31(0x1b9)][_0x3ddf31(0x1ab)]=async(_0x5f680e,_0x3efa08,_0x227cce)=>{const _0x23ecf7=_0x3ddf31;try{const _0x26bf5f=Parameter[_0x23ecf7(0x1a8)](_0x5f680e,ParameterName['Page']),_0x18c28b=Parameter[_0x23ecf7(0x1a8)](_0x5f680e,ParameterName[_0x23ecf7(0x1a7)]),_0x619ae5=await FavouriteService[_0x23ecf7(0x1ab)](_0x5f680e[_0x23ecf7(0x1ae)],_0x26bf5f,_0x18c28b);Utils[_0x23ecf7(0x1b1)](_0x3efa08,_0x619ae5,HttpStatus['OK']);}catch(_0x2db1a4){_0x227cce(_0x2db1a4);}};