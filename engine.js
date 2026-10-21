// Pallet Math engine: boxes per layer in the better of two flat orientations (floor division each way), layers in a stack height, the box total, and the load weight. Exact integers, half-up on display only for the weight. Flat grid packing only; every number is the owner's own entry.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _D = "the dimensions must be from 1 to 100000 mm with no decimal places";
var _N = "the count must be from 1 to 100000 with no decimal places";
var _W = "the box weight must be from 0.01 to 10000 kg with at most two decimal places";
var _BIG = "the box must fit on the pallet in at least one orientation";
function _dim(t) { return _i(t, _D, 6, 1, 100000); }
function _num(t) { return _i(t, _N, 6, 1, 100000); }
function _kg(t) { return _p(t, _W, 5, 2, 1, 1000000); }
function _dec(v, places) {
  if (v < 0) return "-" + _dec(-v, places);
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }

function layerTruth(pl, pw, bl, bw) {
  var PL = _dim(pl), PW = _dim(pw), a = _dim(bl), b = _dim(bw);
  var o1 = Math.floor(PL / a) * Math.floor(PW / b);
  var o2 = Math.floor(PL / b) * Math.floor(PW / a);
  var n = Math.max(o1, o2);
  if (n === 0) throw new Error(_BIG);
  return "The layer of " + PL + " mm by " + PW + " mm with boxes of " + a + " mm by " + b + " mm holds " + n + " boxes in the better orientation.";
}
function layersTruth(maxh, boxh) {
  var H = _dim(maxh), h = _dim(boxh);
  if (h > H) throw new Error(_BIG);
  var n = Math.floor(H / h);
  return "The stack of " + H + " mm over boxes of " + h + " mm tall takes " + n + " layers.";
}
function totalTruth(perlayer, layers) {
  var p = _num(perlayer), l = _num(layers);
  return "The pallet of " + p + " boxes per layer over " + l + " layers holds " + p * l + " boxes.";
}
function weightTruth(total, boxkg) {
  var t = _num(total), w = _kg(boxkg);
  var kg100 = t * w; // exact: count times hundredths of a kg
  return "The load of " + t + " boxes at " + _dec(w, 2) + " kg each weighs " + _dec(kg100, 2) + " kg.";
}
