'use strict';function _0x9b9d(){const _0x47d4aa=['Exercise\x20id\x20','377548eRcgsN','add','\x20not\x20found','retrieveExerciseList','mapExerciseEntity','retrieveExercise','map','User\x20is\x20not\x20the\x20owner\x20of\x20routine\x20id\x20','content','1782ahbxls','30755DkiPoF','Routine\x20id\x20','Cycle','\x20is\x20not\x20related\x20to\x20routine\x20id\x20','43545yICZpS','Cycle\x20id\x20','mapCycleExerciseDto','queryById','107292NrqzQU','update','mapCycleDto','\x20not\x20found\x20in\x20cycle\x20id\x20','36gqDGlN','deleteByFilter','4924320sNQVXg','routineId','queryByFilter','exports','./ModelMapper','retrieve','7408lmOuRk','112YlossS','78022vlXFxe','queryByAdvancedFilter','addExercise','userId','insert','User\x20is\x20not\x20the\x20owner\x20of\x20exercise\x20id\x20','CycleExercise','deleteById','mapCycleExerciseEntity','create','remove','../errors/errors','Exercise','Routine','exerciseId','mapCycleEntity'];_0x9b9d=function(){return _0x47d4aa;};return _0x9b9d();}const _0x40bad1=_0x1b42;(function(_0x31a33b,_0x351e85){const _0x6205b8=_0x1b42,_0xae7e4b=_0x31a33b();while(!![]){try{const _0x33b144=parseInt(_0x6205b8(0x1d1))/0x1+-parseInt(_0x6205b8(0x1bf))/0x2+-parseInt(_0x6205b8(0x1cd))/0x3+-parseInt(_0x6205b8(0x1de))/0x4*(parseInt(_0x6205b8(0x1c9))/0x5)+parseInt(_0x6205b8(0x1d5))/0x6*(parseInt(_0x6205b8(0x1df))/0x7)+parseInt(_0x6205b8(0x1dd))/0x8*(-parseInt(_0x6205b8(0x1c8))/0x9)+parseInt(_0x6205b8(0x1d7))/0xa;if(_0x33b144===_0x351e85)break;else _0xae7e4b['push'](_0xae7e4b['shift']());}catch(_0x4678d1){_0xae7e4b['push'](_0xae7e4b['shift']());}}}(_0x9b9d,0x1a4d7));const {RepositoryName,RepositoryFactory}=require('../repository/RepositoryFactory'),{ModelMapper}=require(_0x40bad1(0x1db)),{NotFoundError,ForbiddenError}=require(_0x40bad1(0x1b9));async function ensureRoutine(_0x2eced0,_0x2d20c1,_0x3a4fed=!![]){const _0x2bf01a=_0x40bad1,_0x234003=RepositoryFactory['create'](RepositoryName[_0x2bf01a(0x1bb)]);let _0x3acc96=await _0x234003[_0x2bf01a(0x1d0)](_0x2d20c1);if(!_0x3acc96)throw new NotFoundError([_0x2bf01a(0x1ca)+_0x2d20c1+_0x2bf01a(0x1c1)]);if(_0x3a4fed&&_0x3acc96['userId']!==_0x2eced0['id'])throw new ForbiddenError([_0x2bf01a(0x1c6)+_0x2d20c1]);return _0x3acc96;}function _0x1b42(_0x2b2ceb,_0x4937f8){const _0x9b9d4a=_0x9b9d();return _0x1b42=function(_0x1b420a,_0x3eb48a){_0x1b420a=_0x1b420a-0x1af;let _0x34eed1=_0x9b9d4a[_0x1b420a];return _0x34eed1;},_0x1b42(_0x2b2ceb,_0x4937f8);}async function ensureCycle(_0x33546b,_0x3f716c){const _0x35e297=_0x40bad1,_0x3da40c=RepositoryFactory['create'](RepositoryName[_0x35e297(0x1cb)]);let _0x337ee5=await _0x3da40c['queryById'](_0x3f716c);if(!_0x337ee5)throw new NotFoundError([_0x35e297(0x1ce)+_0x3f716c+_0x35e297(0x1c1)]);if(_0x337ee5['userId']!==_0x33546b['id'])throw new ForbiddenError(['User\x20is\x20not\x20the\x20owner\x20of\x20cycle\x20id\x20'+_0x3f716c]);return _0x337ee5;}async function ensureExercise(_0xd6f177,_0xd15e62){const _0x46b441=_0x40bad1,_0x106c35=RepositoryFactory['create'](RepositoryName[_0x46b441(0x1ba)]);let _0x3b96ed=await _0x106c35[_0x46b441(0x1d0)](_0xd15e62);if(!_0x3b96ed)throw new NotFoundError([_0x46b441(0x1be)+_0xd15e62+_0x46b441(0x1c1)]);if(_0x3b96ed[_0x46b441(0x1b1)]!==_0xd6f177['id'])throw new ForbiddenError([_0x46b441(0x1b3)+_0xd15e62]);return _0x3b96ed;}async function deepMapCyle(_0x24dc8c,_0x216b4a){const _0x3aadcf=_0x40bad1;if(!_0x216b4a){const _0x1b2c06=RepositoryFactory[_0x3aadcf(0x1b7)](RepositoryName['Exercise']);_0x216b4a=await _0x1b2c06[_0x3aadcf(0x1d0)](_0x24dc8c[_0x3aadcf(0x1bc)]);}return ModelMapper[_0x3aadcf(0x1b6)](_0x24dc8c,ModelMapper[_0x3aadcf(0x1c3)](_0x216b4a));}function ensureRoutineCycleRelationship(_0x839189,_0x27c3b8){const _0x4795ad=_0x40bad1;if(_0x839189[_0x4795ad(0x1d8)]!==_0x27c3b8)throw new ForbiddenError(['Cycle\x20id\x20'+_0x839189['id']+_0x4795ad(0x1cc)+_0x27c3b8]);}module[_0x40bad1(0x1da)][_0x40bad1(0x1c0)]=async(_0x44f06c,_0x2cf729,_0x51f9ef)=>{const _0x3dcda2=_0x40bad1;await ensureRoutine(_0x44f06c,_0x2cf729);const _0x2ef2a1=RepositoryFactory['create'](RepositoryName['Cycle']),_0x5ed7e6=ModelMapper[_0x3dcda2(0x1d3)](_0x51f9ef,_0x44f06c['id'],_0x2cf729),_0x9cb185=await _0x2ef2a1[_0x3dcda2(0x1b2)](_0x5ed7e6);return ModelMapper[_0x3dcda2(0x1bd)](_0x9cb185);},module[_0x40bad1(0x1da)]['modify']=async(_0x26ce13,_0x4e6e82,_0x58568e,_0x1cbe18)=>{const _0x145c76=_0x40bad1;await ensureRoutine(_0x26ce13,_0x4e6e82);let _0x59484e=await ensureCycle(_0x26ce13,_0x58568e);ensureRoutineCycleRelationship(_0x59484e,_0x4e6e82);const _0x52ae7b=RepositoryFactory[_0x145c76(0x1b7)](RepositoryName[_0x145c76(0x1cb)]);return ModelMapper['updateCycleDto'](_0x59484e,_0x1cbe18),_0x59484e=await _0x52ae7b['update'](_0x59484e),ModelMapper[_0x145c76(0x1bd)](_0x59484e);},module[_0x40bad1(0x1da)][_0x40bad1(0x1b8)]=async(_0x354cdb,_0xea2a85,_0x2d9ac0)=>{const _0x1b330d=_0x40bad1;await ensureRoutine(_0x354cdb,_0xea2a85);const _0x4f81fb=await ensureCycle(_0x354cdb,_0x2d9ac0);ensureRoutineCycleRelationship(_0x4f81fb,_0xea2a85);const _0x443d2e=RepositoryFactory[_0x1b330d(0x1b7)](RepositoryName[_0x1b330d(0x1cb)]);await _0x443d2e[_0x1b330d(0x1b5)](_0x2d9ac0);},module[_0x40bad1(0x1da)][_0x40bad1(0x1dc)]=async(_0xc7b63c,_0xc33449,_0x1c3b1d)=>{await ensureRoutine(_0xc7b63c,_0xc33449);const _0x429ddc=await ensureCycle(_0xc7b63c,_0x1c3b1d,_0xc33449);return ModelMapper['mapCycleEntity'](_0x429ddc);},module[_0x40bad1(0x1da)]['retrieveList']=async(_0x5f0d3f,_0x152e2e,_0x449728,_0x485dc4,_0x62be78,_0x2716bf)=>{const _0x5d018c=_0x40bad1;await ensureRoutine(_0x5f0d3f,_0x152e2e,![]);const _0x5065f6={'routineId':_0x152e2e},_0x42dde2=RepositoryFactory[_0x5d018c(0x1b7)](RepositoryName[_0x5d018c(0x1cb)]);let _0x182180=await _0x42dde2['queryByAdvancedFilter'](_0x5065f6,null,_0x449728,_0x485dc4,_0x62be78,_0x2716bf);return _0x182180[_0x5d018c(0x1c7)]=_0x182180[_0x5d018c(0x1c7)][_0x5d018c(0x1c5)](_0x983d50=>ModelMapper[_0x5d018c(0x1bd)](_0x983d50)),_0x182180;},module[_0x40bad1(0x1da)][_0x40bad1(0x1b0)]=async(_0x3c5773,_0x9f694d,_0x23651e,_0x3a8990)=>{const _0x28ea63=_0x40bad1;await ensureCycle(_0x3c5773,_0x9f694d);const _0xceee92=await ensureExercise(_0x3c5773,_0x23651e),_0x4954dc=ModelMapper['mapCycleExerciseDto'](_0x3a8990,_0x9f694d,_0x23651e),_0x23da08=RepositoryFactory['create'](RepositoryName[_0x28ea63(0x1b4)]),_0x74ea42=await _0x23da08[_0x28ea63(0x1b2)](_0x4954dc);return ModelMapper[_0x28ea63(0x1b6)](_0x74ea42,ModelMapper[_0x28ea63(0x1c3)](_0xceee92));},module[_0x40bad1(0x1da)]['modifyExercise']=async(_0x33a2f8,_0x5b58d0,_0x22537d,_0x2bf1e1)=>{const _0x1f0238=_0x40bad1;await ensureCycle(_0x33a2f8,_0x5b58d0);const _0x6a965a=await ensureExercise(_0x33a2f8,_0x22537d);let _0x50471f=ModelMapper[_0x1f0238(0x1cf)](_0x2bf1e1,_0x5b58d0,_0x22537d);const _0x35ff5b=RepositoryFactory[_0x1f0238(0x1b7)](RepositoryName['CycleExercise']);return _0x50471f=await _0x35ff5b[_0x1f0238(0x1d2)](_0x50471f),ModelMapper[_0x1f0238(0x1b6)](_0x50471f,ModelMapper[_0x1f0238(0x1c3)](_0x6a965a));},module['exports']['removeExercise']=async(_0x5a1d4a,_0xb3721e,_0x4686c7)=>{const _0xfc91f2=_0x40bad1;await ensureCycle(_0x5a1d4a,_0xb3721e),await ensureExercise(_0x5a1d4a,_0x4686c7);const _0x4d9e66=RepositoryFactory[_0xfc91f2(0x1b7)](RepositoryName['CycleExercise']);await _0x4d9e66[_0xfc91f2(0x1d6)]({'cycleId':_0xb3721e,'exerciseId':_0x4686c7});},module[_0x40bad1(0x1da)][_0x40bad1(0x1c4)]=async(_0x5477b5,_0x14620a,_0x4ef5cf)=>{const _0x5df0e9=_0x40bad1;await ensureCycle(_0x5477b5,_0x14620a);const _0x383b6a=await ensureExercise(_0x5477b5,_0x4ef5cf),_0x1f0918=RepositoryFactory[_0x5df0e9(0x1b7)](RepositoryName[_0x5df0e9(0x1b4)]),_0x402131=await _0x1f0918[_0x5df0e9(0x1d9)]({'cycleId':_0x14620a,'exerciseId':_0x4ef5cf});if(!_0x402131)throw new NotFoundError([_0x5df0e9(0x1be)+_0x4ef5cf+_0x5df0e9(0x1d4)+_0x14620a]);return await deepMapCyle(_0x402131,_0x383b6a);},module[_0x40bad1(0x1da)][_0x40bad1(0x1c2)]=async(_0x156257,_0x38b157,_0x237ded,_0x35c7f1,_0xa9913b)=>{const _0x51c5c4=_0x40bad1,_0x58eaa9={'cycleId':_0x156257},_0xbd71f6=RepositoryFactory[_0x51c5c4(0x1b7)](RepositoryName[_0x51c5c4(0x1b4)]);let _0x4fb154=await _0xbd71f6[_0x51c5c4(0x1af)](_0x58eaa9,null,_0x38b157,_0x237ded,_0x35c7f1,_0xa9913b);return _0x4fb154[_0x51c5c4(0x1c7)]=await Promise['all'](_0x4fb154[_0x51c5c4(0x1c7)][_0x51c5c4(0x1c5)](async _0x113799=>{return await deepMapCyle(_0x113799);})),_0x4fb154;};