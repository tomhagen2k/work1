import time
import os
import sys
from playwright.sync_api import sync_playwright

output_dir = r"e:\work1\SOAR\IOC 10-2026\screenshots"
os.makedirs(output_dir, exist_ok=True)

html_url = "file:///e:/work1/SOAR/IOC%2010-2026/soar_ioc_integration.html"

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    page = browser.new_page(viewport={"width": 1920, "height": 1080})

    print("Opening soar_ioc_integration.html...")
    page.goto(html_url, wait_until="networkidle")
    time.sleep(1)

    # 1. Main Table
    page.screenshot(path=os.path.join(output_dir, "01_main_screen.png"), full_page=True)
    print("Saved 01_main_screen.png")

    # 2. Open Create Modal
    page.click("#btnOpenCreateModal")
    time.sleep(1)
    # Tick some IoC
    cbs = page.query_selector_all("#iocPickerTableBody input[type='checkbox']")
    if len(cbs) >= 2:
        cbs[0].click()
        cbs[1].click()
        time.sleep(0.5)

    page.screenshot(path=os.path.join(output_dir, "02_create_modal.png"))
    print("Saved 02_create_modal.png")

    # 3. Change Platform to trigger Confirmation
    page.select_option("#createPlatformSelect", "Fortinet FortiGate")
    time.sleep(1)
    page.screenshot(path=os.path.join(output_dir, "03_confirm_change_platform.png"))
    print("Saved 03_confirm_change_platform.png")

    # Dismiss confirm
    page.click("#btnCancelChangePlatform")
    time.sleep(0.5)
    page.click("#btnCloseCreateModal")
    time.sleep(0.5)

    # 4. Open Detail of REQ-2026-0044 (Chờ phê duyệt)
    # Click approve button in row 1
    page.click("button:has-text('Phê duyệt')")
    time.sleep(1)
    page.screenshot(path=os.path.join(output_dir, "04_detail_pending_approval.png"))
    print("Saved 04_detail_pending_approval.png")
    page.click("#btnCloseDetailModal")
    time.sleep(0.5)

    # 5. Open Detail of REQ-2026-0042 (Hoàn thành) -> Click "Tạo yêu cầu thu hồi"
    # Find REQ-2026-0042
    req_row = page.locator("tr:has-text('REQ-2026-0042')")
    req_row.locator("button[title='Xem chi tiết']").click()
    time.sleep(1)
    page.screenshot(path=os.path.join(output_dir, "05_detail_completed_integrate.png"))
    print("Saved 05_detail_completed_integrate.png")

    # Click Tạo yêu cầu thu hồi
    page.click("button:has-text('Tạo yêu cầu thu hồi')")
    time.sleep(1)
    page.screenshot(path=os.path.join(output_dir, "06_revoke_modal.png"))
    print("Saved 06_revoke_modal.png")

    browser.close()
    print("Done all screenshots!")
