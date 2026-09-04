import os
import re

file_new = r"E:\work1\EDR\ioc_management edit 27 08.html"
with open(file_new, 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect sections:
# 1. Header & Topbar
# 2. Main tabs
# 3. View 1: Inventory (Filters, Table columns, Selection bar, Action buttons)
# 4. View 2: History (Batches table, Metrics)
# 5. View 3: Settings (Form sections, Cert upload, Scheduler)
# 6. Drawer (Tabs: Overview, Threat Intel, Alerts, Sharing; Content of each tab)
# 7. Modals: List of modals and their details
# 8. JavaScript logic (Data structures, Functions)

report = []

report.append("=== 1. TITLE & TOPBAR ===")
title_m = re.search(r'<title>(.*?)</title>', text)
report.append(f"Title: {title_m.group(1) if title_m else 'N/A'}")
report.append("Topbar connection indicator: " + str(re.findall(r'id="topbar-conn-[^"]*"[^>]*>([^<]*)<', text)))

report.append("\n=== 2. MAIN TABS ===")
for m in re.finditer(r'<button\s+id="(tab-btn-[^"]*)"[^>]*onclick="switchMainTab\(\'([^\']*)\'\)"[^>]*>(.*?)</button>', text, re.DOTALL):
    clean_text = re.sub(r'<[^>]+>', ' ', m.group(3)).strip()
    report.append(f"Tab ID: {m.group(1)} | Action: {m.group(2)} | Text: {clean_text}")

report.append("\n=== 3. INVENTORY VIEW ===")
# Search input
search_m = re.search(r'<input[^>]*id="search-input"[^>]*placeholder="([^"]*)"', text)
report.append(f"Search placeholder: {search_m.group(1) if search_m else 'N/A'}")

# Datetime filter
report.append("Time filter: " + str(re.findall(r'id="filter-time-[^"]*"', text)))

# Filter selects
for sel in re.finditer(r'<select\s+id="(filter-[^"]*)"[^>]*>(.*?)</select>', text, re.DOTALL):
    opts = [re.sub(r'<[^>]+>', '', opt).strip() for opt in re.findall(r'<option[^>]*>(.*?)</option>', sel.group(2), re.DOTALL)]
    report.append(f"Select: {sel.group(1)} -> Options: {opts}")

# Table columns
thead_m = re.search(r'<div id="view-inventory".*?<thead[^>]*>(.*?)</thead>', text, re.DOTALL)
if thead_m:
    cols = [re.sub(r'<[^>]+>', ' ', th).strip() for th in re.findall(r'<th[^>]*>(.*?)</th>', thead_m.group(1), re.DOTALL)]
    report.append(f"Inventory Table Columns: {cols}")

report.append("\n=== 4. HISTORY VIEW ===")
thead_hist = re.search(r'<div id="view-history".*?<thead[^>]*>(.*?)</thead>', text, re.DOTALL)
if thead_hist:
    cols_hist = [re.sub(r'<[^>]+>', ' ', th).strip() for th in re.findall(r'<th[^>]*>(.*?)</th>', thead_hist.group(1), re.DOTALL)]
    report.append(f"History Table Columns: {cols_hist}")

report.append("\n=== 5. SETTINGS VIEW ===")
for h3 in re.finditer(r'<div id="view-settings".*?<h3[^>]*>(.*?)</h3>', text, re.DOTALL):
    report.append(f"Settings Section: {re.sub(r'<[^>]+>', ' ', h3.group(1)).strip()}")

report.append("\n=== 6. DRAWER TABS & STRUCTURE ===")
drawer_m = re.search(r'<aside id="ioc-detail-drawer".*?</aside>', text, re.DOTALL)
if drawer_m:
    d_tabs = re.findall(r'<button\s+id="(dtab-[^"]*)"[^>]*>(.*?)</button>', drawer_m.group(0), re.DOTALL)
    for dt_id, dt_txt in d_tabs:
        report.append(f"Drawer Tab: {dt_id} -> {re.sub(r'<[^>]+>', ' ', dt_txt).strip()}")
    
    # Drawer panels
    d_panels = re.findall(r'<div\s+id="(dpanel-[^"]*)"', drawer_m.group(0))
    report.append(f"Drawer Panels: {d_panels}")

report.append("\n=== 7. MODALS ===")
for m in re.finditer(r'<div\s+id="(modal-[^"]*)"[^>]*>(.*?)</div>\s*</div>\s*</div>', text, re.DOTALL):
    h3_m = re.search(r'<h3[^>]*>(.*?)</h3>', m.group(2))
    report.append(f"Modal ID: {m.group(1)} | Title: {re.sub(r'<[^>]+>', ' ', h3_m.group(1)).strip() if h3_m else 'N/A'}")

with open(r"E:\work1\EDR\feature_breakdown.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(report))

print("Feature breakdown written to feature_breakdown.txt")
