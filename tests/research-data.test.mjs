import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const places=JSON.parse(fs.readFileSync(new URL('../src/research/places.json',import.meta.url)));
const policies=JSON.parse(fs.readFileSync(new URL('../src/research/policies.json',import.meta.url)));
test('new documents remain a separate, source-labelled collection without invented verification',()=>{
 assert.equal(places.length,22);assert.equal(new Set(places.map(p=>p.id)).size,22);
 assert.equal(places.filter(p=>p.kind==='문의 대상').length,9);
 assert.equal(places.filter(p=>p.area==='남강 주변').length,7);
 for(const p of places){assert.equal(p.verified,false);assert.equal(p.coordinates,null);assert.equal(p.researchDate,null);assert.ok(p.name&&p.detail&&p.check);assert.ok(['남강 주변.hwpx','진주시 대안동 탄소중립과 자원순환 장소.docx'].includes(p.source));}
 assert.equal(places.filter(p=>p.address).length,1);
 assert.equal(places.find(p=>p.id==='chiram-rental').address,'경상남도 진주시 칠암동 1');
});
test('brand policy notes do not become local branch claims',()=>{
 assert.equal(policies.length,10);
 for(const p of policies){assert.equal(p.branch,null);assert.equal(p.source,'남강 주변.hwpx');assert.ok(p.check);}
 assert.match(policies.find(p=>p.brand==='이디야').check,/매장마다 다름/);
});
