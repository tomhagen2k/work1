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

    # 1. Switch to Exclusion Management via sidebar
    page.click("#menuItemExclusion")
    time.sleep(0.8)

    # Verify updated title
    title_text = page.locator(".title-main").nth(1).inner_text()
    print("Exclusion Title:", title_text)
    assert "Danh sách loại trừ dấu hiệu tấn công" in title_text
    assert "(IoC Exclusion / Allowlist)" not in title_text

    # Verify subtext is removed
    assert not page.is_visible("text=Ngăn tiếp nhận & ban hành sai lệch"), "Subtext should be removed"

    # Verify Category filter is removed
    assert not page.is_visible("#exclCategoryFilter"), "Category filter should be removed"

    # Verify headers in Exclusion table
    headers = page.locator("#exclTableBody").evaluate("() => Array.from(document.querySelectorAll('#viewIocExclusion table thead th')).map(th => th.innerText.trim())")
    print("Exclusion Table Headers:", headers)
    assert "Nhóm hạ tầng" not in headers, "Nhóm hạ tầng header should be removed"
    assert "Lý do loại trừ" in headers, "Lý do loại trừ header should be present"
    assert "Lý do / Mục đích loại trừ" not in headers, "Old header should be replaced"

    # Screenshot of Exclusion Management Main Screen updated
    page.screenshot(path=os.path.join(output_dir, "21_exclusion_management_updated.png"))
    print("Saved 21_exclusion_management_updated.png")

    # 2. Open Create Exclusion Modal
    page.click("#btnOpenCreateExclModal")
    time.sleep(0.5)

    # Verify modal contents
    assert not page.is_visible("#exclFormCategory"), "Category select in modal should be removed"
    assert page.is_visible("text=Lý do loại trừ"), "Lý do loại trừ label should be present"
    assert page.is_visible("text=Vô thời hạn"), "Vô thời hạn text should be present"
    assert not page.is_visible("text=Vô thời hạn (Cố định)"), "Old radio label should be replaced"

    # Verify toggle switch in modal
    assert page.locator("#exclFormStatusToggle").count() > 0, "Toggle checkbox should exist"
    assert page.is_visible("#exclFormStatusToggle + .slider"), "Toggle switch slider should be visible"
    label_status = page.locator("#exclFormStatusLabel").inner_text()
    print("Status Label:", label_status)
    assert label_status == "Kích hoạt"

    # Screenshot of Modal Create updated
    page.screenshot(path=os.path.join(output_dir, "22_exclusion_create_modal_updated.png"))
    print("Saved 22_exclusion_create_modal_updated.png")

    # Test toggling the status in modal
    page.click("#exclFormStatusToggle + .slider")
    time.sleep(0.3)
    label_status_paused = page.locator("#exclFormStatusLabel").inner_text()
    print("Status Label after toggle:", label_status_paused)
    assert label_status_paused == "Tạm dừng"

    # Fill form and submit
    page.select_option("#exclFormType", "Wildcard_Domain")
    page.fill("#exclFormValue", "*.corebank.internal")
    page.fill("#exclFormReason", "Hệ thống Core Banking nội bộ giai đoạn 2026")
    page.click("#btnSaveExclRecord")
    time.sleep(0.8)

    # Verify new record in table
    assert page.is_visible("text=*.corebank.internal"), "New record should appear in table"

    # Screenshot of Table with new record
    page.screenshot(path=os.path.join(output_dir, "23_exclusion_after_add.png"))
    print("Saved 23_exclusion_after_add.png")

    # 3. Open Edit Modal for first record
    page.locator("#exclTableBody tr").first.locator("button[title='Chỉnh sửa']").click()
    time.sleep(0.5)
    page.screenshot(path=os.path.join(output_dir, "24_exclusion_edit_modal.png"))
    print("Saved 24_exclusion_edit_modal.png")
    page.click("#btnCloseCreateEditExclModal")
    time.sleep(0.4)

    # 4. Switch back to Integration screen and verify all works
    page.click("#menuItemIntegration")
    time.sleep(0.8)
    assert page.is_visible("#viewIocIntegration"), "Integration view should be restored"
    assert not page.is_visible("#viewIocExclusion"), "Exclusion view should be hidden"
    page.screenshot(path=os.path.join(output_dir, "25_integration_verified.png"))
    print("Saved 25_integration_verified.png")

    browser.close()
    print("ALL TEST ASSERTIONS PASSED SUCCESSFULLY!")
