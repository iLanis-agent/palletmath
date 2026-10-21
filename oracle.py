import json, random

def layer(PL, PW, a, b):
    n = max((PL//a)*(PW//b), (PL//b)*(PW//a))
    return (f"The layer of {PL} mm by {PW} mm with boxes of {a} mm by {b} mm holds {n} boxes "
            f"in the better orientation.")
def layers(H, h):
    return f"The stack of {H} mm over boxes of {h} mm tall takes {H//h} layers."
def total(p, l):
    return f"The pallet of {p} boxes per layer over {l} layers holds {p*l} boxes."
def dec2(n):
    w, f = divmod(n, 100)
    s = str(w); fs = str(f).zfill(2).rstrip("0")
    return s + "." + fs if fs else s
def weight(t, w):
    return f"The load of {t} boxes at {dec2(w)} kg each weighs {dec2(t*w)} kg."

random.seed(743)
cases = [
  dict(fn="layer", args=["1200","1000","500","400"], expect=layer(1200,1000,500,400)),
  dict(fn="layers", args=["1800","300"], expect=layers(1800,300)),
  dict(fn="total", args=["6","6"], expect=total(6,6)),
  dict(fn="weight", args=["36","12.5"], expect=weight(36,1250)),
]
for _ in range(25):
    while True:
        PL = random.randint(1,100000); PW = random.randint(1,100000)
        a = random.randint(1,100000); b = random.randint(1,100000)
        if max((PL//a)*(PW//b), (PL//b)*(PW//a)) > 0: break
    cases.append(dict(fn="layer", args=[str(PL),str(PW),str(a),str(b)], expect=layer(PL,PW,a,b)))
for _ in range(25):
    h = random.randint(1,100000); H = random.randint(h,100000)
    cases.append(dict(fn="layers", args=[str(H),str(h)], expect=layers(H,h)))
for _ in range(20):
    p = random.randint(1,100000); l = random.randint(1,100000)
    cases.append(dict(fn="total", args=[str(p),str(l)], expect=total(p,l)))
for _ in range(20):
    t = random.randint(1,100000); w = random.randint(1,1000000)
    cases.append(dict(fn="weight", args=[str(t),dec2(w)], expect=weight(t,w)))
errcases = [
  ["layer", ["0","1000","500","400"]], ["layer", ["1200","1000","0","400"]],
  ["layer", ["1200","1000","500","400.5"]], ["layer", ["120","100","500","400"]],
  ["layers", ["0","300"]], ["layers", ["1800","0"]], ["layers", ["180","300"]],
  ["total", ["0","6"]], ["total", ["6","1.5"]],
  ["weight", ["0","12.5"]], ["weight", ["36","0"]], ["weight", ["36","10000.01"]],
]
json.dump(dict(cases=cases, errors=errcases), open("expected.json","w"), indent=1)
print(len(cases), "cases,", len(errcases), "errcases")
