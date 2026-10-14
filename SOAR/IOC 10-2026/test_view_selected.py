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

    # 1. Open Create Modal
    page.click("#btnOpenCreateModal")
    time.sleep(0.5)

    # 2. Select 2 items
    cbs = page.query_selector_all("#iocPickerTableBody input[type='checkbox']")
    if len(cbs) >= 2:
        cbs[0].click()
        cbs[1].click()
        time.sleep(0.5)

    # 3. Click tab "Đã chọn"
    page.click("#tabViewSelectedIocs")
    time.sleep(0.5)

    page.screenshot(path=os.path.join(output_dir, "09_create_modal_view_selected.png"))
    print("Saved 09_create_modal_view_selected.png")

    # 4. Switch back to "Tất cả IoC"
    page.click("#tabViewAllIocs")
    time.sleep(0.5)

    # 5. Click link "Xem danh sách đã chọn" in selection bar
    page.click("#btnToggleViewSelected")
    time.sleep(0.5)
    page.screenshot(path=os.path.join(output_dir, "10_create_modal_toggle_from_bar.png"))
    print("Saved 10_create_modal_toggle_from_bar.png")

    browser.close()
    print("Done testing view selected IoC!")
