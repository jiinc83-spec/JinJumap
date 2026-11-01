import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const stores=JSON.parse(fs.readFileSync(new URL('../src/data/stores.json',import.meta.url)));
test('report has exactly twelve unique candidates and none are field-verified',()=>{
 assert.equal(stores.length,12);assert.equal(new Set(stores.map(s=>s.id)).size,12);
 for(const s of stores){assert.equal(s.verified,false);assert.equal(s.coordinates,null);assert.equal(s.coordinateSource,null);assert.ok(s.page>=3&&s.page<=15);assert.ok(s.participation.length>=2);assert.ok(s.sources.length>0);for(const u of s.sources)assert.equal(new URL(u).protocol,'https:');}
});
test('point filters contain only report-supported participants',()=>{
 assert.deepEqual(stores.filter(s=>s.tags.includes('points')).map(s=>s.id),['starbucks','mega','hansalim']);
 assert.deepEqual(stores.filter(s=>s.tags.includes('repair')).map(s=>s.id),['biketani','samchuly','alteration']);
});

test('required detail fields are populated from the report',()=>{
 for(const s of stores) {
  for(const key of ['id','name','address','activity','status','points','facts']) assert.ok(typeof s[key]==='string'&&s[key].trim(),`${s.id}: ${key}`);
 }
});

test('application filters, coordinate validation and Kakao direction fallbacks',async()=>{
 const {filterStores,hasCoordinates,directionsLink}=await import('../src/domain.ts');
 assert.equal(filterStores('refill','').length,0);
 assert.deepEqual(filterStores('mobility','').map(s=>s.id),['biketani','samchuly']);
 assert.equal(filterStores('cup','').length,3);
 assert.equal(filterStores('points',' 한살림 ').length,1);
 const store=stores[0];
 assert.equal(hasCoordinates(store),false);
 assert.equal(new URL(directionsLink(store)).hostname,'map.kakao.com');
 assert.equal(new URL(directionsLink(store)).searchParams.get('q'),`${store.name} ${store.address}`);
 const located={...store,coordinates:[35,128],coordinateSource:'test-only fixture'};
 assert.equal(hasCoordinates(located),true);
 assert.ok(directionsLink(located).startsWith('https://map.kakao.com/link/to/'));
 assert.equal(hasCoordinates({...located,coordinateSource:null}),false);
 assert.equal(hasCoordinates({...located,coordinates:[100,128]}),false);
});
