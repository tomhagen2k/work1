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

    # 1. Take screenshot of Main table with updated nowrap
    page.screenshot(path=os.path.join(output_dir, "11_main_table_nowrap.png"))
    print("Saved 11_main_table_nowrap.png")

    # 2. Click REQ-2026-0044 (Pending approval)
    page.locator("span.code-text", has_text="REQ-2026-0044").click()
    time.sleep(0.8)

    # Screenshot of detail modal before reject
    page.screenshot(path=os.path.join(output_dir, "12_detail_modal_pending.png"))
    print("Saved 12_detail_modal_pending.png")

    # 3. Click 'Từ chối' in detail modal
    page.locator("#detailModalFooter button", has_text="Từ chối").click()
    time.sleep(0.5)

    # Verify reject reason popup is open
    assert page.is_visible("#rejectReasonModal"), "Reject reason modal should be visible"
    page.screenshot(path=os.path.join(output_dir, "13_reject_reason_modal.png"))
    print("Saved 13_reject_reason_modal.png")

    # Test validation: click confirm without entering reason
    page.click("#btnConfirmReject")
    time.sleep(0.3)
    assert page.is_visible("#rejectReasonError"), "Validation error should be shown"

    # Fill reason
    page.fill("#rejectReasonInput", "Danh sách IoC chưa qua xác minh từ SOC L2, nghi ngờ sai lệch")
    time.sleep(0.3)
    page.click("#btnConfirmReject")
    time.sleep(0.8)

    # Main table should now show 'Từ chối' status for REQ-2026-0044
    page.screenshot(path=os.path.join(output_dir, "14_main_table_after_reject.png"))
    print("Saved 14_main_table_after_reject.png")

    # Re-open REQ-2026-0044 detail modal to check rejection reason box
    page.locator("#requestTableBody span.code-text", has_text="REQ-2026-0044").click()
    time.sleep(0.8)
    assert page.is_visible("#detailRejectReasonBox"), "Reject reason box should be visible in detail"
    page.screenshot(path=os.path.join(output_dir, "15_detail_modal_rejected.png"))
    print("Saved 15_detail_modal_rejected.png")

    browser.close()
    print("ALL PLAYWRIGHT TESTS PASSED SUCCESSFULLY!")
