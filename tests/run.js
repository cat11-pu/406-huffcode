import assert from "node:assert";
import { tableOf, shortestOf, longestOf } from "../huffman.js";
import { step, close } from "../huffrun.js";
import { render } from "../app.js";

const base = {
  budget: 1,
  state: { counts: [], code: [], builds: 0, asks: [], ledger: [], applied: [] },
  events: [{ id: 1, kind: "count", sym: "a" }],
  bad_sym_code: "E_BAD_SYM", empty_code: "E_EMPTY",
  no_sym_code: "E_NO_SYM", event_error_code: "E_BAD_EVENT"
};

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("tableOf returns a list", () => {
  assert.ok(Array.isArray(tableOf([["a", 3]])));
});

check("shortestOf returns a string", () => {
  assert.strictEqual(typeof shortestOf([["a", 2]]), "string");
});

check("longestOf returns a number", () => {
  assert.strictEqual(typeof longestOf([["a", 2]]), "number");
});

check("step returns a state", () => {
  assert.strictEqual(typeof step(base).state, "object");
});

check("render counts events", () => {
  assert.strictEqual(typeof render(base).count_events, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
