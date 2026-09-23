import asyncio
from playwright.async_api import async_playwright
import subprocess
import time

async def main():
    server_process = subprocess.Popen(
        ["npx", "vite", "preview", "--port", "4173"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    time.sleep(3)

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page(viewport={"width": 1280, "height": 800})

            await page.goto("http://localhost:4173/")
            await page.wait_for_timeout(2000)

            # Capture complete skeuomorphic app shell
            await page.screenshot(path="skeuomorphic_app_shell.png")
            print("Captured skeuomorphic_app_shell.png successfully")

            await browser.close()
    finally:
        server_process.terminate()

if __name__ == "__main__":
    asyncio.run(main())
