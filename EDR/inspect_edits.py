import os
import re

file_new = r"E:\work1\EDR\ioc_management edit 27 08.html"
file_old = r"E:\work1\EDR\ioc_management.html"

with open(file_new, 'r', encoding='utf-8') as f:
    text_new = f.read()

with open(file_old, 'r', encoding='utf-8') as f:
    text_old = f.read()

# Analyze diffs by sections
out_lines = []

# 1. Total length and line counts
lines_new = text_new.splitlines()
lines_old = text_old.splitlines()
out_lines.append(f"NEW: {len(lines_new)} lines, {len(text_new)} bytes")
out_lines.append(f"OLD: {len(lines_old)} lines, {len(text_old)} bytes")

# 2. Extract key elements
def extract_matches(pattern, text):
    return re.findall(pattern, text, re.DOTALL | re.MULTILINE)

out_lines.append("\n=== BUTTONS IN MAIN HEADER ===")
out_lines.append("NEW: " + str(re.findall(r'<button[^>]*onclick="([^"]*)"[^>]*>(.*?)</button>', text_new[:3500], re.DOTALL)))

out_lines.append("\n=== MAIN NAVIGATION TABS ===")
out_lines.append("NEW: " + str(re.findall(r'<button\s+id="(tab-btn-[^"]*)"[^>]*>(.*?)</button>', text_new[:4500], re.DOTALL)))

out_lines.append("\n=== INVENTORY THEAD ===")
thead_new = re.search(r'<thead[^>]*>(.*?)</thead>', text_new, re.DOTALL)
if thead_new:
    ths = re.findall(r'<th[^>]*>(.*?)</th>', thead_new.group(1), re.DOTALL)
    clean_ths = [re.sub(r'<[^>]+>', '', th).strip() for th in ths]
    out_lines.append("NEW THs: " + " | ".join(clean_ths))

out_lines.append("\n=== HISTORY THEAD ===")
history_view = re.search(r'<div id="view-history".*?</div>\s*</div>\s*<!-- ===', text_new, re.DOTALL)
if history_view:
    ths_hist = re.findall(r'<th[^>]*>(.*?)</th>', history_view.group(0), re.DOTALL)
    clean_ths_hist = [re.sub(r'<[^>]+>', '', th).strip() for th in ths_hist]
    out_lines.append("NEW HISTORY THs: " + " | ".join(clean_ths_hist))

out_lines.append("\n=== DRAWER TABS & PANELS ===")
drawer_section = re.search(r'<aside id="ioc-detail-drawer".*?</aside>', text_new, re.DOTALL)
if drawer_section:
    d_tabs = re.findall(r'<button\s+id="(dtab-[^"]*)"[^>]*>(.*?)</button>', drawer_section.group(0), re.DOTALL)
    out_lines.append("NEW DRAWER TABS: " + str(d_tabs))
    d_panels = re.findall(r'<div\s+id="(dpanel-[^"]*)"', drawer_section.group(0))
    out_lines.append("NEW DRAWER PANELS: " + str(d_panels))

out_lines.append("\n=== MODALS IN NEW FILE ===")
modals = re.findall(r'<div\s+id="(modal-[^"]*)"', text_new)
out_lines.append("NEW MODALS: " + str(modals))

# Let's check diff lines specifically
import difflib
diff = list(difflib.unified_diff(lines_old, lines_new, fromfile="old", tofile="new", lineterm=""))
out_lines.append(f"\n=== RAW DIFF (Total diff chunks: {len(diff)}) ===")
for d in diff:
    if d.startswith(('+', '-')) and not d.startswith(('+++', '---')):
        out_lines.append(d[:160])

with open(r"E:\work1\EDR\analysis_results.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(out_lines))

print(f"Inspection complete. Written {len(out_lines)} lines to analysis_results.txt")
