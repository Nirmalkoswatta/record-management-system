// Run: node client/src/lib/records.test.js
import assert from "node:assert/strict";
import { filterAndSort, stats, toCsv } from "./records.js";

const recs = [
  { petName: "Rex", species: "Dog", ownerName: "Ann", petAge: 5, createdAt: "2026-11-20T00:00:00Z" },
  { petName: "Milo", species: "Cat", ownerName: "ann ", petBreed: "Siamese", createdAt: "2026-10-01T00:00:00Z" },
  { petName: "Kiwi", ownerName: "Bob", petAge: 2, ownerPhone: "+94 77 123" },
];

assert.deepEqual(filterAndSort(recs, {}).map((r) => r.petName), ["Rex", "Milo", "Kiwi"]);
assert.deepEqual(filterAndSort(recs, { query: "siam" }).map((r) => r.petName), ["Milo"]);
assert.deepEqual(filterAndSort(recs, { query: "+94" }).map((r) => r.petName), ["Kiwi"]);
assert.deepEqual(filterAndSort(recs, { species: "Other" }).map((r) => r.petName), ["Kiwi"]); // missing species = Other
assert.deepEqual(filterAndSort(recs, { sort: "age" }).map((r) => r.petName), ["Kiwi", "Rex", "Milo"]); // no age sorts last
assert.deepEqual(filterAndSort(recs, { sort: "name" }).map((r) => r.petName), ["Kiwi", "Milo", "Rex"]);

assert.deepEqual(stats(recs, Date.parse("2026-11-23T00:00:00Z")), { total: 3, owners: 2, avgAge: 3.5, thisWeek: 1 });
assert.deepEqual(stats([]), { total: 0, owners: 0, avgAge: null, thisWeek: 0 });

const csv = toCsv([{ petName: '=HYPERLINK("x")', ownerName: 'Say "hi"', petAge: 0 }]).split("\r\n");
assert.equal(csv.length, 2);
assert.ok(csv[1].startsWith(`"'=HYPERLINK(""x"")"`), csv[1]);
assert.ok(csv[1].includes(`"Say ""hi"""`));
assert.ok(csv[1].includes(`"0"`));

console.log("records.js: all checks passed");
