"""Crop each member's head from the group photo into public/heads/<name>.png.

Usage: pip install pillow && python scripts/crop-heads.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent

# (left, top, right, bottom) in pixels of public/app_image.jpg; widened to squares below.
BOXES = {
    "wes": (400, 455, 620, 725),
    "little-lisa": (625, 625, 870, 910),
    "big-lisa": (825, 645, 1070, 910),
    "scott": (1085, 530, 1260, 765),
    "chow": (1365, 520, 1550, 775),
    "patrick": (295, 795, 685, 1265),
    "jess": (655, 960, 965, 1365),
    "lina": (1080, 850, 1360, 1225),
    "annie": (1365, 825, 1620, 1145),
}

img = Image.open(ROOT / "public" / "app_image.jpg").convert("RGB")
out = ROOT / "public" / "heads"
out.mkdir(exist_ok=True)
for name, (l, t, r, b) in BOXES.items():
    side = max(r - l, b - t)
    cx, cy = (l + r) // 2, (t + b) // 2
    box = (cx - side // 2, cy - side // 2, cx + side // 2, cy + side // 2)
    img.crop(box).resize((160, 160), Image.LANCZOS).save(out / f"{name}.png")
    print(f"saved heads/{name}.png")
