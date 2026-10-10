"""Optimise the JPG work images in assets/ and generate responsive WebP variants.

Usage (from the repository root):  python scripts/optimize-images.py

For every assets/*.jpg the script
  * downsizes the master JPG so that neither side exceeds MAX_SIDE px and
    re-encodes it as a progressive, metadata-free sRGB JPG (used as the <img src>
    fallback and as the og:image / JSON-LD image), and
  * writes WebP variants named <stem>-<width>w.webp for every width in
    VARIANT_WIDTHS that is smaller than the master (plus the master width
    itself), which the pages reference through srcset.

Re-encoding a JPG repeatedly would slowly degrade it, so every processed master
is recorded in scripts/image-manifest.json by content hash and skipped on later
runs. Replace a JPG with a new original and simply run the script again.
"""

from __future__ import annotations

import hashlib
import io
import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
MANIFEST = ROOT / "scripts" / "image-manifest.json"
MAX_SIDE = 1600
JPG_QUALITY = 80
WEBP_QUALITY = 76
VARIANT_WIDTHS = (480, 800, 1200, 1600)


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def load_rgb(path: Path) -> Image.Image:
    image = Image.open(path)
    image = ImageOps.exif_transpose(image)
    if image.mode != "RGB":
        image = image.convert("RGB")
    return image


def fit(image: Image.Image) -> Image.Image:
    width, height = image.size
    scale = min(1.0, MAX_SIDE / max(width, height))
    if scale >= 1.0:
        return image
    return image.resize((round(width * scale), round(height * scale)), Image.LANCZOS)


def variant_widths(master_width: int) -> list[int]:
    widths = [width for width in VARIANT_WIDTHS if width < master_width]
    widths.append(master_width)
    return sorted(set(widths))


def main() -> None:
    manifest: dict[str, dict] = json.loads(MANIFEST.read_text("utf-8")) if MANIFEST.exists() else {}
    total_before = total_after = 0

    for path in sorted(ASSETS.glob("*.jpg")):
        raw = path.read_bytes()
        entry = manifest.get(path.name)
        if entry and entry.get("sha256") == digest(raw) and all(
            (ASSETS / name).exists() for name in entry.get("variants", [])
        ):
            continue

        image = fit(load_rgb(path))
        buffer = io.BytesIO()
        image.save(buffer, "JPEG", quality=JPG_QUALITY, optimize=True, progressive=True)
        encoded = buffer.getvalue()
        # Never make a master larger than the original it replaces.
        if len(encoded) >= len(raw) and Image.open(path).size == image.size:
            encoded = raw
        path.write_bytes(encoded)
        total_before += len(raw)
        total_after += len(encoded)

        variants = []
        for width in variant_widths(image.width):
            height = round(image.height * width / image.width)
            resized = image if width == image.width else image.resize((width, height), Image.LANCZOS)
            name = f"{path.stem}-{width}w.webp"
            resized.save(ASSETS / name, "WEBP", quality=WEBP_QUALITY, method=6)
            variants.append(name)

        manifest[path.name] = {
            "sha256": digest(encoded),
            "width": image.width,
            "height": image.height,
            "variants": variants,
        }
        print(f"{path.name}: {len(raw) // 1024} KB -> {len(encoded) // 1024} KB, {image.width}x{image.height}, {len(variants)} WebP")

    MANIFEST.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", "utf-8")
    if total_before:
        print(f"Masters: {total_before // 1024} KB -> {total_after // 1024} KB")


if __name__ == "__main__":
    main()
