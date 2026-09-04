import os
import subprocess

edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
html_url = "file:///E:/work1/EDR/ioc_management%20edit%2027%2008.html"
screenshots_dir = r"E:\work1\EDR\screenshots"
os.makedirs(screenshots_dir, exist_ok=True)

screenshots_tasks = [
    ("screen_1_inventory.png", f"{html_url}", 1600, 950),
    ("screen_2_drawer_alerts.png", f"{html_url}?view=drawer&ioc=001&tab=alerts", 1600, 950),
    ("screen_2b_drawer_overview.png", f"{html_url}?view=drawer&ioc=001&tab=overview", 1600, 950),
    ("screen_3_history.png", f"{html_url}?view=history", 1600, 950),
    ("screen_4_settings.png", f"{html_url}?view=settings", 1600, 1150),
    ("screen_5_create_modal.png", f"{html_url}?view=modal_create", 1600, 950),
]

for filename, url, w, h in screenshots_tasks:
    out_path = os.path.join(screenshots_dir, filename)
    cmd = [
        edge_exe,
        "--headless=new",
        "--hide-scrollbars",
        f"--window-size={w},{h}",
        f"--screenshot={out_path}",
        url
    ]
    subprocess.run(cmd, check=True)
    print(f"Captured {filename} ({w}x{h}), size: {os.path.getsize(out_path)} bytes")

print("All screenshots from edit HTML captured successfully.")
