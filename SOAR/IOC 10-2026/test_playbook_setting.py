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

    # 1. Verify button Playbook setting is visible next to "Tạo yêu cầu ban hành"
    assert page.is_visible("#btnOpenPlaybookSettingModal"), "Setting Playbook button should be visible"
    assert page.is_visible("#btnOpenCreateModal"), "Create request button should be visible"

    badge_text = page.locator("#btnPlaybookCodeBadge").inner_text()
    print("Initial Playbook Badge:", badge_text)
    assert badge_text == "PB-IOC-01"

    # Screenshot of Integration Main screen with Playbook setting button
    page.screenshot(path=os.path.join(output_dir, "26_main_with_playbook_setting_btn.png"))
    print("Saved 26_main_with_playbook_setting_btn.png")

    # 2. Click button to open Playbook setting modal
    page.click("#btnOpenPlaybookSettingModal")
    time.sleep(0.5)

    assert page.is_visible("#playbookSettingModal"), "Playbook setting modal should be visible"
    assert page.is_visible("#selectIntegrationPlaybook"), "Select playbook dropdown should be visible"

    # Screenshot of Playbook setting modal
    page.screenshot(path=os.path.join(output_dir, "27_playbook_setting_modal_default.png"))
    print("Saved 27_playbook_setting_modal_default.png")

    # 3. Change selection to PB-IOC-02
    page.select_option("#selectIntegrationPlaybook", "PB-IOC-02")
    time.sleep(0.3)

    card_code = page.locator("#pbCardCode").inner_text()
    print("Selected PB Card Code:", card_code)
    assert card_code == "PB-IOC-02"

    page.screenshot(path=os.path.join(output_dir, "28_playbook_setting_modal_selected_pb02.png"))
    print("Saved 28_playbook_setting_modal_selected_pb02.png")

    # 4. Save setting
    page.click("#btnSavePlaybookSetting")
    time.sleep(0.5)

    assert not page.is_visible("#playbookSettingModal"), "Playbook setting modal should be closed"
    updated_badge = page.locator("#btnPlaybookCodeBadge").inner_text()
    print("Updated Playbook Badge:", updated_badge)
    assert updated_badge == "PB-IOC-02"

    # 5. Open a pending request and approve it to verify Playbook execution trigger
    page.click("text=REQ-2026-0044")
    time.sleep(0.6)
    assert page.is_visible("#detailModal"), "Detail modal should be visible"

    # Approve request
    page.click("text=Phê duyệt & Thực thi")
    time.sleep(0.8)

    # Screenshot of table during Playbook execution
    page.screenshot(path=os.path.join(output_dir, "29_table_executing_playbook_pb02.png"))
    print("Saved 29_table_executing_playbook_pb02.png")

    # 6. Switch to Exclusion view to ensure 100% preservation
    page.click("#menuItemExclusion")
    time.sleep(0.6)
    assert page.is_visible("#viewIocExclusion"), "Exclusion view should still be visible"
    page.screenshot(path=os.path.join(output_dir, "30_exclusion_still_intact.png"))
    print("Saved 30_exclusion_still_intact.png")

    browser.close()
    print("ALL PLAYBOOK SETTING TESTS PASSED!")
