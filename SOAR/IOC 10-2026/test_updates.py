import time
import os
from playwright.sync_api import sync_playwright

output_dir = r"e:\work1\SOAR\IOC 10-2026\screenshots"
html_url = "file:///e:/work1/SOAR/IOC%2010-2026/soar_ioc_integration.html"

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    page = browser.new_page(viewport={"width": 1920, "height": 1080})

    page.goto(html_url, wait_until="networkidle")
    time.sleep(1)

    # 1. Main Table after updates
    page.screenshot(path=os.path.join(output_dir, "01_main_screen_updated.png"), full_page=True)
    print("Saved 01_main_screen_updated.png")

    # 2. Reject request flow to test "Từ chối"
    # Click approve icon button in row 1
    page.click(".btn-approve-action")
    time.sleep(1)
    
    # Dialog handler for prompt
    page.on("dialog", lambda dialog: dialog.accept("Không đủ điều kiện an ninh mạng"))
    page.click("button:has-text('Từ chối')")
    time.sleep(1)

    page.screenshot(path=os.path.join(output_dir, "07_after_rejected_status.png"), full_page=True)
    print("Saved 07_after_rejected_status.png")

    browser.close()
    print("Done testing updates!")
