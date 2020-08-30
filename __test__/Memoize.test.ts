// Test import
const Memo = require("../dist/Memoize.js").default;

console.log(Memo);

test("Calling require import", () => {
  const myFunction = Memo.memo(() => console.log("Hello"));
});
