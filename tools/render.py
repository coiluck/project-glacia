# /// script
# requires-python = ">=3.12"
# dependencies = ["pillow>=11.3"]
# ///
"""イベントバナーの HTML をヘッドレス Chrome で撮って、このフォルダに .avif で書き出す。
ゲームで使うには public/images/events/ にコピーする。

  uv run render.py              # 全部書き出す
  uv run render.py start base   # 指定したものだけ
  uv run render.py --serve      # ブラウザで確認するためにサーバーだけ立てる

画像は public/images、フォントは src/styles/fonts から読むので、リポジトリのルートを配信している。
"""

import functools
import subprocess
import sys
import tempfile
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from PIL import Image

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
WIDTH, HEIGHT = 1200, 480

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def start_server() -> tuple[ThreadingHTTPServer, str]:
    handler = functools.partial(QuietHandler, directory=str(ROOT))
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{server.server_port}/{HERE.relative_to(ROOT).as_posix()}"
    return server, base


def render(name: str, base: str, tmp: Path) -> None:
    shot = tmp / f"{name}.png"
    # --disable-gpu を付けると clip-path や filter の描画が崩れる
    subprocess.run(
        [
            CHROME,
            "--headless=new",
            "--hide-scrollbars",
            f"--window-size={WIDTH},{HEIGHT}",
            "--virtual-time-budget=8000",
            f"--screenshot={shot}",
            f"{base}/{name}.html",
        ],
        check=True,
        capture_output=True,
    )
    Image.open(shot).convert("RGB").save(HERE / f"{name}.avif", quality=80)
    print(f"{name}.avif")


def main() -> None:
    args = sys.argv[1:]
    server, base = start_server()

    if args == ["--serve"]:
        for html in sorted(HERE.glob("*.html")):
            print(f"{base}/{html.name}")
        print("Ctrl+C で終了")
        try:
            threading.Event().wait()
        except KeyboardInterrupt:
            pass
        return

    names = args or [html.stem for html in sorted(HERE.glob("*.html"))]
    with tempfile.TemporaryDirectory() as tmp:
        for name in names:
            render(name, base, Path(tmp))
    server.shutdown()


if __name__ == "__main__":
    main()
