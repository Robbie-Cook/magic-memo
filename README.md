# Magic Memo

## About

This is a package that helps with memoising data in Node and browser JS.

---

## Usage

### Import

```typescript
import Memo from "magic-memo";
```

or

```typescript
const Memo = require("magic-memo").default;
```

## Calling

You can use the default hashing:

```typescript
Memo.memo(() => {
  console.log("I am a function");
});
```

or define your own hashing function

```typescript
Memo.memo(
  (myParam) => {
    console.log("I am a function");
  },
  (myParam) => myParam
);
```
