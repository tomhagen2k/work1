import re

with open(r"E:\work1\EDR\ioc_management edit 27 08.html", "r", encoding="utf-8") as f:
    text = f.read()

out = []

# Threat intel panel
p_intel = re.search(r'<div id="dpanel-intel".*?</div>\s*<!-- TAB', text + "<!-- TAB", re.DOTALL)
if p_intel:
    out.append("=== THREAT INTEL PANEL ===")
    out.append(p_intel.group(0)[:3000])

# Modal alert detail
m_alt = re.search(r'<div id="modal-alert-detail".*?</div>\s*</div>\s*</div>', text, re.DOTALL)
if m_alt:
    out.append("\n=== MODAL ALERT DETAIL ===")
    out.append(m_alt.group(0)[:3000])

# Modal share
m_share = re.search(r'<div id="modal-share-a05".*?</div>\s*</div>\s*</div>', text, re.DOTALL)
if m_share:
    out.append("\n=== MODAL SHARE ===")
    out.append(m_share.group(0)[:3000])

with open(r"E:\work1\EDR\threat_intel_details.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(out))

print("Threat intel and modal details written.")
