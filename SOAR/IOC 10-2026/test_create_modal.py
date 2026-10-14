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

    # Open Create Modal
    page.click("#btnOpenCreateModal")
    time.sleep(1)

    # Take screenshot of Create Modal
    page.screenshot(path=os.path.join(output_dir, "02_create_modal_updated.png"))
    print("Saved 02_create_modal_updated.png")

    # Filter by IoC Type: "IPv4"
    page.select_option("#iocTypeFilter", "IPv4")
    time.sleep(0.5)

    # Type in search
    page.fill("#iocSearchInput", "185")
    time.sleep(0.5)

    page.screenshot(path=os.path.join(output_dir, "08_create_modal_filtered_type.png"))
    print("Saved 08_create_modal_filtered_type.png")

    browser.close()
    print("Done testing create modal updates!")
