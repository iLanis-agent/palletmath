# Pallet Math

Pallet packing arithmetic. The layer of 1200 mm by 1000 mm with boxes of 500 mm by 400 mm holds 6 boxes in the better orientation.

## What it computes

- **The layer truth** - boxes per layer (dimensions 1 to 100000 mm): both flat orientations counted with floor division, the better one kept.
- **The stack truth** - layers in a stack height: floor division, nothing rounded up.
- **The total truth** - the pallet's boxes: per layer times layers.
- **The weight truth** - the load weight: box count times box weight (0.01 to 10000 kg).

## Boundary

Arithmetic only. Flat grid counting, applied as written. It has not seen any load and does not know the overhang rules, the interlock pattern, the wrap, the pallet's condition or its rated capacity, and it gives no verdict that a stack travels safely. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/palletmath/
Repo: https://github.com/iLanis-agent/palletmath
