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

    # 1. Verify default view is Integration and table is visible
    assert page.is_visible("#viewIocIntegration"), "Integration view should be visible by default"
    assert not page.is_visible("#viewIocExclusion"), "Exclusion view should be hidden by default"

    # 2. Switch to Exclusion Management via sidebar
    page.click("#menuItemExclusion")
    time.sleep(0.8)

    assert page.is_visible("#viewIocExclusion"), "Exclusion view should now be visible"
    assert not page.is_visible("#viewIocIntegration"), "Integration view should now be hidden"

    # Screenshot of Exclusion Management Main Screen
    page.screenshot(path=os.path.join(output_dir, "16_exclusion_management_main.png"))
    print("Saved 16_exclusion_management_main.png")

    # 3. Open Create Exclusion Modal
    page.click("#btnOpenCreateExclModal")
    time.sleep(0.5)
    assert page.is_visible("#createEditExclModal"), "Create exclusion modal should be visible"
    page.screenshot(path=os.path.join(output_dir, "17_exclusion_create_modal.png"))
    print("Saved 17_exclusion_create_modal.png")

    # Fill form
    page.select_option("#exclFormType", "IPv4_CIDR")
    page.fill("#exclFormValue", "172.16.50.0/24")
    page.fill("#exclFormReason", "Phân vùng máy chủ ứng dụng nội bộ App Server")
    page.click("#btnSaveExclRecord")
    time.sleep(0.8)

    # Verify new record in table
    assert page.is_visible("text=172.16.50.0/24"), "New record should appear in table"

    # 4. Open Audit Log Modal
    page.click("#btnViewAuditLogsCard")
    time.sleep(0.5)
    assert page.is_visible("#auditLogExclModal"), "Audit log modal should be visible"
    page.screenshot(path=os.path.join(output_dir, "18_exclusion_audit_log_modal.png"))
    print("Saved 18_exclusion_audit_log_modal.png")
    page.click("#btnCloseAuditLogExclModal")
    time.sleep(0.4)

    # 5. Open Import Modal
    page.click("#btnOpenImportExclModal")
    time.sleep(0.5)
    assert page.is_visible("#importExclModal"), "Import modal should be visible"
    page.screenshot(path=os.path.join(output_dir, "19_exclusion_import_modal.png"))
    print("Saved 19_exclusion_import_modal.png")
    page.click("#btnCloseImportExclModal")
    time.sleep(0.4)

    # 6. Switch back to Integration screen and verify all works
    page.click("#menuItemIntegration")
    time.sleep(0.8)
    assert page.is_visible("#viewIocIntegration"), "Integration view should be restored"
    assert not page.is_visible("#viewIocExclusion"), "Exclusion view should be hidden"
    page.screenshot(path=os.path.join(output_dir, "20_integration_restored.png"))
    print("Saved 20_integration_restored.png")

    browser.close()
    print("ALL EXCLUSION PLAYWRIGHT TESTS PASSED!")
