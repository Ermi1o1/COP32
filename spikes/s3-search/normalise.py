"""Ge'ez-aware normaliser for search (S3). Rules are PROVISIONAL: they come from the spike brief's list
(ሀ/ሐ/ኀ, ሰ/ሠ, አ/ዐ, ጸ/ፀ) and have NOT been reviewed by an Amharic linguist."""
import re, unicodedata
# base codepoints of 8-wide syllable families in the Ethiopic block
_FOLD = {0x1210: 0x1200,  # ሐ -> ሀ family
         0x1280: 0x1200,  # ኀ -> ሀ family
         0x1220: 0x1230,  # ሠ -> ሰ family
         0x12D0: 0x12A0,  # ዐ -> አ family
         0x1340: 0x1338}  # ፀ -> ጸ family
_MAP = {}
for src, dst in _FOLD.items():
    n = 7 if src != 0x1300 else 7
    for k in range(8):
        _MAP[src + k] = dst + k
_ONES = {chr(0x1369 + i): i + 1 for i in range(9)}      # ፩..፱
_TENS = {chr(0x1372 + i): (i + 1) * 10 for i in range(9)}  # ፲..፺
_PUNCT = re.compile(r"[፠-፨᙭᙮]|[^\w\s]", re.U)
def _numerals(s):
    out, i = [], 0
    while i < len(s):
        if s[i] in _ONES or s[i] in _TENS:
            j, v = i, 0
            while j < len(s) and (s[j] in _ONES or s[j] in _TENS): v += _ONES.get(s[j]) or _TENS[s[j]]; j += 1
            out.append(str(v)); i = j
        else: out.append(s[i]); i += 1
    return "".join(out)
def fold(s: str) -> str:
    s = unicodedata.normalize("NFC", s or "")
    s = _numerals(s)
    s = "".join(chr(_MAP.get(ord(c), ord(c))) for c in s)
    s = "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")  # strip Latin diacritics (no Mn in Ethiopic)
    s = _PUNCT.sub(" ", s.lower())
    return re.sub(r"\s+", " ", s).strip()
if __name__ == "__main__":
    for a, b in [("ሃይል","ኃይል"),("ሰላም","ሠላም"),("አዲስ አበባ","ዐዲስ ዐበባ"),("ጸሐይ","ፀሐይ")]:
        print(a, b, fold(a) == fold(b), fold(a), fold(b))
    print(fold("ናሙና ፲፭ ። Hall-A"))
