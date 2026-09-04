import re

with open(r"E:\work1\EDR\ioc_management edit 27 08.html", "r", encoding="utf-8") as f:
    text = f.read()

out = []

out.append("=== ALL MODALS DETAILS ===")
for m in re.finditer(r'<div\s+id="(modal-[^"]*)"[^>]*>(.*?)</div>\s*</div>\s*</div>', text, re.DOTALL):
    m_id = m.group(1)
    body = m.group(2)
    h3 = re.search(r'<h3[^>]*>(.*?)</h3>', body, re.DOTALL)
    title = re.sub(r'<[^>]+>', ' ', h3.group(1)).strip() if h3 else 'No title'
    out.append(f"- Modal ID: {m_id} | Title: {title}")

out.append("\n=== SETTINGS SECTIONS ===")
settings = re.search(r'<div id="view-settings".*?<!-- ===', text, re.DOTALL)
if settings:
    h3s = re.findall(r'<h3[^>]*>(.*?)</h3>', settings.group(0), re.DOTALL)
    for h in h3s:
        out.append(f"- {re.sub(r'<[^>]+>', ' ', h).strip()}")

out.append("\n=== DRAWER DETAILS ===")
drawer = re.search(r'<aside id="ioc-detail-drawer".*?</aside>', text, re.DOTALL)
if drawer:
    out.append("Tabs in drawer:")
    for btn in re.findall(r'<button\s+id="(dtab-[^"]*)"[^>]*>(.*?)</button>', drawer.group(0), re.DOTALL):
        out.append(f"  * {btn[0]}: {re.sub(r'<[^>]+>', ' ', btn[1]).strip()}")
    
    out.append("\nPanels in drawer:")
    for panel in re.findall(r'<div\s+id="(dpanel-[^"]*)"[^>]*>(.*?)</div>\s*<!-- TAB', drawer.group(0) + "<!-- TAB", re.DOTALL):
        out.append(f"  * {panel[0]}: Length {len(panel[1])} chars")

with open(r"E:\work1\EDR\full_summary.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(out))

print("Full summary written.")
