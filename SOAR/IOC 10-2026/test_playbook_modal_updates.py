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

    # 1. Open Playbook Setting modal
    page.click("#btnOpenPlaybookSettingModal")
    time.sleep(0.5)

    assert page.is_visible("#playbookSettingModal"), "Modal should be visible"

    # Verify Note text
    modal_note = page.locator("#playbookSettingModal .modal-body > div").first.inner_text()
    print("Modal Note:", modal_note)
    assert "Khi một yêu cầu tích hợp hoặc thu hồi được người có thẩm quyền phê duyệt" in modal_note
    assert "để thực hiện yêu cầu." in modal_note
    assert "Nguyên lý tự động hóa:" not in modal_note
    assert "phân phối lệnh cấu hình xuống các thiết bị mạng/an ninh" not in modal_note

    # Verify Auto trigger checkbox is removed
    assert page.locator("#chkAutoTriggerPlaybook").count() == 0, "chkAutoTriggerPlaybook should be removed"
    assert not page.is_visible("text=Tự động kích hoạt Playbook ngay sau khi phê duyệt yêu cầu"), "Checkbox label should be removed"

    # Verify Playbook Description is removed
    assert page.locator("#pbCardDesc").count() == 0, "pbCardDesc should be removed"
    assert not page.is_visible("text=Tự động trích xuất danh sách IoC"), "Description text should be removed"

    # Take screenshot of updated modal
    page.screenshot(path=os.path.join(output_dir, "31_playbook_modal_updated.png"))
    print("Saved 31_playbook_modal_updated.png")

    # Change to PB-IOC-03
    page.select_option("#selectIntegrationPlaybook", "PB-IOC-03")
    time.sleep(0.3)
    card_code = page.locator("#pbCardCode").inner_text()
    assert card_code == "PB-IOC-03"

    page.screenshot(path=os.path.join(output_dir, "32_playbook_modal_updated_pb03.png"))
    print("Saved 32_playbook_modal_updated_pb03.png")

    # Save
    page.click("#btnSavePlaybookSetting")
    time.sleep(0.5)

    assert not page.is_visible("#playbookSettingModal")
    badge_text = page.locator("#btnPlaybookCodeBadge").inner_text()
    assert badge_text == "PB-IOC-03"

    page.screenshot(path=os.path.join(output_dir, "33_main_with_pb03_badge.png"))
    print("Saved 33_main_with_pb03_badge.png")

    browser.close()
    print("ALL MODAL UPDATE ASSERTIONS PASSED SUCCESSFULLY!")
