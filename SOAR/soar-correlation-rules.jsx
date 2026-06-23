import { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   DESIGN TOKENS  (SOAR Design System)
═══════════════════════════════════════════════════════════ */
const DS = {
  bg0:"#f0f2f5", bg1:"#ffffff", bg2:"#ffffff", bg3:"#f5f7fa", bg4:"#eaecf0",
  border:"#dde1e8", border2:"#c8cdd7",
  accent:"#1d6bf3", accentH:"#2f7bff", accentDim:"rgba(29,107,243,0.10)",
  text:"#1a1d23", text2:"#3d4452", text3:"#6b7280", text4:"#9ca3af",
  crit:"#dc2626", high:"#ea580c", med:"#d97706", low:"#16a34a",
  mono:"'JetBrains Mono',monospace", sans:"'Inter',sans-serif",
};

/* Severity maps */
const SEV = {
  critical:{ text:"#ef4444", bg:"rgba(239,68,68,.12)",  border:"rgba(239,68,68,.28)",  dot:"#ef4444" },
  high:    { text:"#f97316", bg:"rgba(249,115,22,.12)", border:"rgba(249,115,22,.28)", dot:"#f97316" },
  medium:  { text:"#f59e0b", bg:"rgba(245,158,11,.12)", border:"rgba(245,158,11,.28)", dot:"#f59e0b" },
  low:     { text:"#22c55e", bg:"rgba(34,197,94,.12)",  border:"rgba(34,197,94,.28)",  dot:"#22c55e" },
};

/* ═══════════════════════════════════════════════════════════
   SVG ICONS
═══════════════════════════════════════════════════════════ */
const IC = ({ n, s=14, c="" }) => {
  const d = {
    shield:  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    plus:    <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    search:  <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    filter:  <><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></>,
    edit:    <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    trash:   <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
    copy:    <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
    play:    <polygon points="5 3 19 12 5 21 5 3"/>,
    chevR:   <polyline points="9 18 15 12 9 6"/>,
    chevL:   <polyline points="15 18 9 12 15 6"/>,
    check:   <polyline points="20 6 9 15 4 10"/>,
    x:       <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    info:    <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    link:    <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
    zap:     <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    clock:   <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    alert:   <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    layers:  <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    sliders: <><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></>,
    eye:     <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    spin:    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>,
    power:   <><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></>,
    tag:     <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      className={c} style={{ display:"inline-block", verticalAlign:"middle", flexShrink:0 }}>
      {d[n]}
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════
   BASE COMPONENTS
═══════════════════════════════════════════════════════════ */

/* Severity badge — JetBrains Mono */
const SevBadge = ({ sev }) => {
  const s = SEV[sev] || SEV.low;
  return (
    <span style={{ fontFamily:DS.mono, fontSize:10, fontWeight:700, letterSpacing:".04em",
      padding:"2px 7px", borderRadius:4,
      color:s.text, background:s.bg, border:`1px solid ${s.border}` }}>
      {sev.toUpperCase()}
    </span>
  );
};

/* Status pill */
const StatusPill = ({ active }) => (
  <span style={{ fontFamily:DS.mono, fontSize:10, fontWeight:700, letterSpacing:".04em",
    padding:"2px 7px", borderRadius:4, display:"inline-flex", alignItems:"center", gap:4,
    color: active ? DS.low : DS.text3,
    background: active ? "rgba(22,163,74,.10)" : "rgba(107,114,128,.10)",
    border: active ? "1px solid rgba(22,163,74,.25)" : "1px solid rgba(107,114,128,.22)" }}>
    <span style={{ width:5, height:5, borderRadius:"50%", background: active?DS.low:DS.text3 }}/>
    {active ? "Hoạt động" : "Không hoạt động"}
  </span>
);

/* Toggle switch */
const Toggle = ({ value, onChange }) => (
  <button onClick={()=>onChange(!value)}
    style={{ position:"relative", width:36, height:20, borderRadius:10, border:"none",
      cursor:"pointer", padding:0, flexShrink:0,
      background: value ? DS.accent : DS.border2, transition:"background .2s" }}>
    <span style={{ position:"absolute", top:2, left: value?18:2, width:16, height:16,
      borderRadius:8, background:"#fff", boxShadow:"0 1px 3px rgba(0,0,0,.2)",
      transition:"left .18s", display:"block" }}/>
  </button>
);

/* Button */
const Btn = ({ children, variant="ghost", size="md", icon, onClick, disabled }) => {
  const h = { sm:26, md:30 }[size] || 30;
  const px = { sm:"4px 8px", md:"5px 11px" }[size] || "5px 11px";
  const styles = {
    primary: { background:DS.accentDim, border:`1px solid rgba(29,107,243,.4)`, color:DS.accent },
    ghost:   { background:"transparent", border:`1px solid ${DS.border}`, color:DS.text3 },
    danger:  { background:"rgba(239,68,68,.10)", border:"1px solid rgba(239,68,68,.30)", color:DS.crit },
    dashed:  { background:"transparent", border:`1px dashed ${DS.border2}`, color:DS.text3 },
  };
  const s = styles[variant] || styles.ghost;
  return (
    <button onClick={disabled?undefined:onClick} disabled={disabled}
      style={{ display:"inline-flex", alignItems:"center", gap:5, height:h, padding:px,
        fontFamily:DS.sans, fontSize:11, fontWeight:600, borderRadius:6,
        cursor:disabled?"not-allowed":"pointer", transition:"all .15s",
        opacity:disabled?0.45:1, whiteSpace:"nowrap", ...s }}
      onMouseEnter={e=>{ if(!disabled) e.currentTarget.style.filter="brightness(1.15)"; }}
      onMouseLeave={e=>{ e.currentTarget.style.filter=""; }}>
      {icon && <IC n={icon} s={12}/>}{children}
    </button>
  );
};

/* Icon action button (toolbar) */
const IconBtn = ({ icon, tip, onClick, danger, disabled }) => (
  <button onClick={disabled?undefined:onClick} title={tip}
    style={{ display:"inline-flex", alignItems:"center", justifyContent:"center",
      width:26, height:26, borderRadius:6, border:`1px solid ${DS.border}`,
      background:DS.bg3, cursor:disabled?"not-allowed":"pointer",
      color: danger ? DS.crit : DS.text2,
      opacity:disabled?0.35:1, transition:"all .15s" }}
    onMouseEnter={e=>{ if(!disabled){ e.currentTarget.style.borderColor=danger?"rgba(239,68,68,.4)":DS.accent; e.currentTarget.style.color=danger?DS.crit:DS.accent; e.currentTarget.style.background=danger?"rgba(239,68,68,.08)":DS.accentDim; }}}
    onMouseLeave={e=>{ e.currentTarget.style.borderColor=DS.border; e.currentTarget.style.color=danger?DS.crit:DS.text2; e.currentTarget.style.background=DS.bg3; }}>
    <IC n={icon} s={12}/>
  </button>
);

/* Input */
const Input = ({ value, onChange, placeholder, type="text", error, mono, style={} }) => {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ position:"relative" }}>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
        style={{ display:"block", width:"100%", height:30, padding:"4px 10px", fontSize:11,
          fontFamily: mono ? DS.mono : DS.sans,
          border:`1px solid ${error ? DS.crit : focus ? DS.accent : DS.border}`,
          borderRadius:6, outline:"none", background:DS.bg3, color:DS.text,
          boxSizing:"border-box", ...style }}/>
      {error && (
        <div style={{ color:DS.crit, fontSize:10, marginTop:3, fontFamily:DS.sans,
          display:"flex", alignItems:"center", gap:3 }}>
          <IC n="alert" s={10}/>{error}
        </div>
      )}
    </div>
  );
};

/* Select */
const Sel = ({ value, onChange, options, style={} }) => {
  const [focus, setFocus] = useState(false);
  return (
    <select value={value} onChange={onChange}
      onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
      style={{ height:30, padding:"4px 24px 4px 8px", fontSize:11, fontFamily:DS.sans,
        border:`1px solid ${focus?DS.accent:DS.border}`, borderRadius:6, outline:"none",
        background:`${DS.bg3} url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 8px center`,
        color:DS.text2, cursor:"pointer", appearance:"none", WebkitAppearance:"none",
        transition:"border-color .15s", ...style }}>
      {options.map(o => typeof o==="string"
        ? <option key={o} value={o}>{o}</option>
        : <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );
};

/* Section card for step 2 */
const SCard = ({ num, color, icon, title, subtitle, badge, children }) => (
  <div style={{ display:"flex", gap:0 }}>
    <div style={{ width:32, flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center" }}>
      <div style={{ width:24, height:24, borderRadius:"50%", background:color,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontFamily:DS.mono, fontSize:10, fontWeight:700, color:"#fff", flexShrink:0 }}>
        {num}
      </div>
    </div>
    <div style={{ flex:1, border:`1px solid ${DS.border}`, borderRadius:8, background:DS.bg2 }}>
      <div style={{ padding:"8px 14px", borderBottom:`1px solid ${DS.border}`,
        background:`linear-gradient(to right,${color}08,transparent)`, borderRadius:"8px 8px 0 0",
        display:"flex", alignItems:"center", gap:8 }}>
        <IC n={icon} s={13} c="" style={{ color }}/>
        <span style={{ fontFamily:DS.sans, fontSize:11, fontWeight:600, color:DS.text }}>{title}</span>
        {subtitle && <span style={{ fontSize:11, color:DS.text3 }}>{subtitle}</span>}
        {badge && (
          <span style={{ marginLeft:"auto", fontFamily:DS.mono, fontSize:9, fontWeight:700,
            letterSpacing:".06em", textTransform:"uppercase",
            padding:"2px 7px", borderRadius:4,
            background:color+"15", color, border:`1px solid ${color}30` }}>
            {badge}
          </span>
        )}
      </div>
      <div style={{ padding:"12px 14px" }}>{children}</div>
    </div>
  </div>
);

const SConnector = () => (
  <div style={{ display:"flex", gap:0, margin:"0" }}>
    <div style={{ width:32, flexShrink:0, display:"flex", justifyContent:"center" }}>
      <div style={{ borderLeft:`2px dashed ${DS.border2}`, height:16 }}/>
    </div>
    <div style={{ flex:1 }}/>
  </div>
);

/* Form label row */
const FLabel = ({ label, required, help }) => (
  <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:5 }}>
    {required && <span style={{ color:DS.crit, fontSize:12 }}>*</span>}
    <label style={{ fontFamily:DS.sans, fontSize:11, fontWeight:600, color:DS.text2 }}>{label}</label>
    {help && (
      <span title={help} style={{ cursor:"help", display:"inline-flex", color:DS.text4 }}>
        <IC n="info" s={11}/>
      </span>
    )}
  </div>
);

const FItem = ({ label, required, help, error, children }) => (
  <div style={{ marginBottom:16 }}>
    <FLabel label={label} required={required} help={help}/>
    {children}
    {error && (
      <div style={{ color:DS.crit, fontFamily:DS.sans, fontSize:10, marginTop:3,
        display:"flex", alignItems:"center", gap:3 }}>
        <IC n="alert" s={10}/>{error}
      </div>
    )}
  </div>
);

/* Stat card */
const StatCard = ({ icon, label, value, color }) => (
  <div style={{ background:DS.bg2, border:`1px solid ${DS.border}`, borderRadius:8,
    padding:"12px 16px", display:"flex", alignItems:"center", gap:12 }}>
    <div style={{ width:36, height:36, borderRadius:8, background:`${color}12`,
      display:"flex", alignItems:"center", justifyContent:"center" }}>
      <IC n={icon} s={18} c="" style={{ color }}/>
    </div>
    <div>
      <div style={{ fontFamily:DS.mono, fontSize:20, fontWeight:700, color:DS.text, lineHeight:1 }}>{value}</div>
      <div style={{ fontFamily:DS.sans, fontSize:11, color:DS.text3, marginTop:3 }}>{label}</div>
    </div>
  </div>
);

/* Toast */
const Toast = ({ msg, type }) => {
  const isOk = type==="success";
  return (
    <div style={{ position:"fixed", bottom:28, right:28, zIndex:9999,
      background:DS.bg2, border:`1px solid ${DS.border}`, borderRadius:10,
      boxShadow:"0 8px 24px rgba(0,0,0,.12)", padding:"12px 16px",
      display:"flex", alignItems:"center", gap:10, maxWidth:340,
      fontFamily:DS.sans, fontSize:12, color:DS.text2,
      animation:"slideUpToast .25s ease-out" }}>
      <span style={{ fontSize:16 }}>{isOk ? "✅" : "🗑️"}</span>
      <span style={{ fontWeight:700, color:DS.text }}>{msg}</span>
    </div>
  );
};

/* Searchable select */
const SearchSel = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const filtered = options.filter(o=>o.toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ position:"relative" }}>
      <div onClick={()=>setOpen(o=>!o)}
        style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:30,
          padding:"4px 10px", fontSize:11, fontFamily:DS.sans,
          border:`1px solid ${open?DS.accent:DS.border}`, borderRadius:6,
          background:DS.bg3, cursor:"pointer", color:DS.text2 }}>
        <span>{value||"Chưa chỉ định"}</span>
        <IC n="chevR" s={11} c="" style={{ color:DS.text3,
          transform:open?"rotate(270deg)":"rotate(90deg)", transition:"transform .15s" }}/>
      </div>
      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 3px)", left:0, right:0, zIndex:300,
          background:DS.bg2, border:`1px solid ${DS.border}`, borderRadius:6,
          boxShadow:"0 10px 28px rgba(0,0,0,.12)", overflow:"hidden" }}>
          <div style={{ padding:"5px 7px", borderBottom:`1px solid ${DS.border}` }}>
            <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm tên..."
              style={{ width:"100%", height:26, padding:"2px 8px", fontSize:11, fontFamily:DS.mono,
                border:`1px solid ${DS.border}`, borderRadius:4, outline:"none",
                background:DS.bg3, color:DS.text, boxSizing:"border-box" }}/>
          </div>
          <div style={{ maxHeight:150, overflowY:"auto" }}>
            {filtered.length===0
              ? <div style={{ padding:"9px 12px", fontSize:11, color:DS.text3 }}>Không tìm thấy</div>
              : filtered.map(o=>(
                <div key={o} onClick={()=>{ onChange(o); setOpen(false); setQ(""); }}
                  style={{ padding:"7px 12px", fontSize:11, fontFamily:DS.sans, cursor:"pointer",
                    background:value===o?DS.accentDim:DS.bg2, color:value===o?DS.accent:DS.text2,
                    borderBottom:`1px solid ${DS.border}`,
                    display:"flex", alignItems:"center", justifyContent:"space-between" }}
                  onMouseEnter={e=>{ if(value!==o) e.currentTarget.style.background=DS.bg3; }}
                  onMouseLeave={e=>{ if(value!==o) e.currentTarget.style.background=DS.bg2; }}>
                  {o}{value===o && <IC n="check" s={11} c="" style={{ color:DS.accent }}/>}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* Severity dropdown */
const SevSel = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const opts = [
    { v:"critical", l:"Critical", dot:DS.crit },
    { v:"high",     l:"High",     dot:DS.high },
    { v:"medium",   l:"Medium",   dot:DS.med  },
    { v:"low",      l:"Low",      dot:DS.low  },
  ];
  const cur = opts.find(o=>o.v===value) || opts[1];
  return (
    <div style={{ position:"relative" }}>
      <div onClick={()=>setOpen(o=>!o)}
        style={{ display:"flex", alignItems:"center", gap:7, height:30, padding:"4px 10px",
          fontSize:11, fontFamily:DS.sans,
          border:`1px solid ${open?DS.accent:DS.border}`, borderRadius:6,
          background:DS.bg3, cursor:"pointer" }}>
        <span style={{ width:8, height:8, borderRadius:"50%", background:cur.dot, flexShrink:0 }}/>
        <span style={{ flex:1, color:DS.text2, fontWeight:500 }}>{cur.l}</span>
        <IC n="chevR" s={11} c="" style={{ color:DS.text3,
          transform:open?"rotate(270deg)":"rotate(90deg)", transition:"transform .15s" }}/>
      </div>
      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 3px)", left:0, right:0, zIndex:300,
          background:DS.bg2, border:`1px solid ${DS.border}`, borderRadius:6,
          boxShadow:"0 10px 28px rgba(0,0,0,.12)", overflow:"hidden" }}>
          {opts.map(opt=>(
            <div key={opt.v} onClick={()=>{ onChange(opt.v); setOpen(false); }}
              style={{ padding:"7px 12px", fontSize:11, fontFamily:DS.sans, cursor:"pointer",
                background:value===opt.v?DS.accentDim:DS.bg2, color:DS.text2,
                borderBottom:`1px solid ${DS.border}`,
                display:"flex", alignItems:"center", gap:8 }}
              onMouseEnter={e=>{ if(value!==opt.v) e.currentTarget.style.background=DS.bg3; }}
              onMouseLeave={e=>{ if(value!==opt.v) e.currentTarget.style.background=DS.bg2; }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background:opt.dot, flexShrink:0 }}/>
              <span style={{ flex:1, fontWeight:500 }}>{opt.l}</span>
              {value===opt.v && <IC n="check" s={11} c="" style={{ color:DS.accent }}/>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */
const SLAS = ["Standard SLA","24/7 VIP SLA","Emergency SLA","Business Hours SLA","P1 Critical SLA"];
const MOCK_RULES = [
  { id:1, name:"Brute Force SSH Detection",       desc:"Detect repeated failed SSH logins from same source",           priority:"high",     active:true,  cases:47,  creator:"nguyen.van.a", updated:"2025-06-10" },
  { id:2, name:"Lateral Movement — RDP Spread",   desc:"Multiple RDP connections from single host to >3 destinations", priority:"critical", active:true,  cases:12,  creator:"tran.thi.b",   updated:"2025-06-09" },
  { id:3, name:"Data Exfil — Large Upload",        desc:"Outbound traffic >500 MB to unknown external IP in 1 h",      priority:"critical", active:false, cases:3,   creator:"le.van.c",     updated:"2025-06-07" },
  { id:4, name:"Suspicious PowerShell Execution", desc:"Encoded PS commands from non-admin user accounts",             priority:"high",     active:true,  cases:89,  creator:"nguyen.van.a", updated:"2025-06-11" },
  { id:5, name:"Port Scan Detection",             desc:"Single source scanning >20 ports within 5 minutes",            priority:"medium",   active:true,  cases:234, creator:"pham.thi.d",   updated:"2025-06-08" },
  { id:6, name:"C2 Beacon Pattern",               desc:"Periodic outbound connections at regular intervals to same IP",priority:"critical", active:true,  cases:7,   creator:"tran.thi.b",   updated:"2025-06-11" },
  { id:7, name:"Account Privilege Escalation",    desc:"User account granted admin rights outside business hours",     priority:"high",     active:false, cases:0,   creator:"le.van.c",     updated:"2025-06-05" },
  { id:8, name:"Firewall Rule Modification",      desc:"Firewall policy changes not initiated via change mgmt",        priority:"medium",   active:true,  cases:15,  creator:"pham.thi.d",   updated:"2025-06-10" },
];
const FIELDS = ["Severity","Source","Category","EventType","Protocol","Destination"];
const OPS    = ["==","!=","contains","startsWith","endsWith"];
const GROUPS = ["src_ip","dst_ip","user_name","hostname","process_name","file_hash","domain","port"];
const UNITS  = ["SOC L1","SOC L2","SOC L3","Network Team","App Security","IR Team","Threat Hunt Team","Compliance Team"];
const PERSONS = {
  "SOC L1":          ["Chưa chỉ định","Tự động phân bổ","Nguyễn Văn A","Trần Thị B","Lê Văn C"],
  "SOC L2":          ["Chưa chỉ định","Tự động phân bổ","Phạm Thị D","Đỗ Văn E","Hoàng Thị F"],
  "SOC L3":          ["Chưa chỉ định","Tự động phân bổ","Vũ Văn G","Đinh Thị H"],
  "Network Team":    ["Chưa chỉ định","Tự động phân bổ","Bùi Văn I","Ngô Thị K"],
  "App Security":    ["Chưa chỉ định","Tự động phân bổ","Dương Văn L","Lý Thị M"],
  "IR Team":         ["Chưa chỉ định","Tự động phân bổ","Trịnh Văn N","Mai Thị O"],
  "Threat Hunt Team":["Chưa chỉ định","Tự động phân bổ","Cao Văn P","Tạ Thị Q"],
  "Compliance Team": ["Chưa chỉ định","Tự động phân bổ","Hà Văn R","Lưu Thị S"],
};
const newCond  = () => ({ id:Date.now()+Math.random(), field:"Severity", op:"==", val:"High" });
const newGroup = () => ({ id:Date.now()+Math.random(), conditions:[newCond()], logic:"AND" });
const EMPTY = {
  name:"", desc:"", priority:"high",
  filterGroups:[newGroup()],
  tw:15, twu:"minutes", twType:"sliding",
  groupBy:["src_ip"],
  thrType:"count", thrN:5, thrF:"dst_ip", thrU:3,
  title:"[Auto-Case] Attack from {{src_ip}}",
  assignUnit:"SOC L1", assignPerson:"",
  caseSeverity:"high", caseSLA:"Standard SLA",
  merge:true,
  mergeOpenSLAOnly:false,
  mergeClosedCases:false,
  mergeClosedLookback:24, mergeClosedLookbackUnit:"hours",
  mergeReopenSLA:"reset",
};

/* ═══════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [scr,    setScr]    = useState("list");
  const [rules,  setRules]  = useState(MOCK_RULES);
  const [q,      setQ]      = useState("");
  const [fSt,    setFSt]    = useState("all");
  const [fPr,    setFPr]    = useState("all");
  const [editing,setEditing]= useState(null);
  const [step,   setStep]   = useState(1);
  const [errs,   setErrs]   = useState({});
  const [toast,  setToast]  = useState(null);
  const [testing,setTesting]= useState(false);
  const [results,setResults]= useState(null);
  const [modal,  setModal]  = useState(false);
  const [gbOpen, setGbOpen] = useState(false);
  const [form,   setForm]   = useState(EMPTY);
  const sf = (k,v) => setForm(f=>({...f,[k]:v}));

  const notify = (msg,type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3500); };
  const go = s => { setErrs({}); setScr(s); };

  const openEditor = (rule=null) => {
    setEditing(rule);
    setForm(rule ? {...EMPTY, name:rule.name, desc:rule.desc, priority:rule.priority} : {...EMPTY, filterGroups:[newGroup()]});
    setStep(1); setErrs({}); go("editor");
  };

  const validate = s => {
    const e = {};
    if (s===1 && !form.name.trim()) e.name="Tên Rule không được để trống";
    if (s===2) {
      if (form.filterGroups.flatMap(g=>g.conditions.map(c=>c.val.trim())).some(v=>!v)) e.f1v="Tất cả điều kiện cần có giá trị";
      if (!form.tw||form.tw<1) e.tw="Phải ≥ 1";
      if (!form.groupBy.length) e.gb="Chọn ít nhất 1 trường";
      if (!form.thrN||form.thrN<1) e.thr="Phải ≥ 1";
    }
    setErrs(e); return !Object.keys(e).length;
  };
  const handleNext = () => { if (validate(step)) setStep(s=>s+1); };
  const handleBack = () => { if (step===1) go("list"); else setStep(s=>s-1); };
  const handleSave = () => {
    const r = { id:editing?.id||Date.now(), name:form.name, desc:form.desc, priority:form.priority,
      active:editing?editing.active:false, cases:editing?.cases||0,
      creator:"current.user", updated:new Date().toISOString().slice(0,10) };
    setRules(editing?rules.map(x=>x.id===r.id?r:x):[r,...rules]);
    notify(editing?"Cập nhật Rule thành công":"Tạo Rule mới thành công"); go("list");
  };
  const runTest = () => {
    setTesting(true); setResults(null);
    setTimeout(()=>{ setResults([
      {id:"C-2847",title:`[Auto-Case] Attack from 192.168.1.45`,alerts:23,time:"2025-06-11 03:12",sev:"high"},
      {id:"C-2848",title:`[Auto-Case] Attack from 10.0.0.88`,alerts:18,time:"2025-06-11 07:44",sev:"high"},
      {id:"C-2849",title:`[Auto-Case] Attack from 172.16.0.12`,alerts:31,time:"2025-06-11 11:23",sev:"critical"},
      {id:"C-2850",title:`[Auto-Case] Attack from 192.168.5.200`,alerts:9,time:"2025-06-11 14:55",sev:"medium"},
    ]); setTesting(false); },1800);
  };

  const filtered = rules.filter(r=>
    r.name.toLowerCase().includes(q.toLowerCase()) &&
    (fSt==="all"||(fSt==="active"?r.active:!r.active)) &&
    (fPr==="all"||r.priority===fPr)
  );

  /* ── Step 2 helpers ── */
  const updGrp = (gid,fn) => sf("filterGroups",form.filterGroups.map(g=>g.id===gid?fn(g):g));
  const updCond = (gid,cid,fn) => updGrp(gid,g=>({...g,conditions:g.conditions.map(c=>c.id===cid?fn(c):c)}));
  const addCond = gid => updGrp(gid,g=>({...g,conditions:[...g.conditions,newCond()]}));
  const remCond = (gid,cid) => updGrp(gid,g=>({...g,conditions:g.conditions.filter(c=>c.id!==cid)}));
  const remGrp  = gid => sf("filterGroups",form.filterGroups.filter(g=>g.id!==gid));
  const addGrp  = () => sf("filterGroups",[...form.filterGroups,newGroup()]);
  const togLogic= gid => updGrp(gid,g=>({...g,logic:g.logic==="AND"?"OR":"AND"}));
  const remFromGrp = g => sf("groupBy",form.groupBy.filter(x=>x!==g));
  const addToGrp   = g => { sf("groupBy",[...form.groupBy,g]); setErrs(er=>({...er,gb:""})); };

  /* shared inline input style for step 2 */
  const inp2 = (w, extra={}) => ({
    height:28, width:w, padding:"3px 8px", fontSize:11, fontFamily:DS.mono,
    border:`1px solid ${DS.border}`, borderRadius:5, outline:"none",
    background:DS.bg3, color:DS.text, textAlign:"center", ...extra
  });

  /* ── filter summary text for test modal ── */
  const filterText = form.filterGroups.map(g=>
    g.conditions.map(c=>`${c.field} ${c.op} "${c.val}"`).join(` ${g.logic} `)
  ).join(") OR (");
  const twText = `${form.tw} ${form.twu==="minutes"?"phút":"giờ"} (${form.twType==="sliding"?"Sliding":"Tumbling"})`;
  const grpText = form.groupBy.length ? form.groupBy.join(", ") : "—";
  const thrText = form.thrType==="count"
    ? `Alert count > ${form.thrN} lần`
    : `Unique ${form.thrF} > ${form.thrU}`;

  /* ─────────────────────────── SHARED COLORS ─────────────────────────── */
  const stepColors = { 1:DS.accent, 2:"#7c3aed", 3:"#0891b2", 4:"#d97706" };

  return (
    <div style={{ fontFamily:DS.sans, background:DS.bg0, minHeight:"100vh",
      display:"flex", flexDirection:"column" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        input,select,textarea,button{font-family:inherit}
        table{border-collapse:collapse;width:100%}
        tbody tr:hover td{background:rgba(29,107,243,.03)}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:#f0f2f5}
        ::-webkit-scrollbar-thumb{background:#c8cdd7;border-radius:3px}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes barAnim{0%{width:20%}50%{width:80%}100%{width:20%}}
        @keyframes slideUpToast{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
      `}</style>

      {toast && <Toast {...toast}/>}

      {/* ── HEADER ── */}
      <header style={{ height:48, background:DS.bg1, borderBottom:`1px solid ${DS.border}`,
        boxShadow:"0 1px 3px rgba(0,0,0,.06)", display:"flex", alignItems:"center",
        padding:"9px 18px", gap:12, flexShrink:0, zIndex:100 }}>
        <span style={{ fontFamily:DS.mono, fontSize:13, fontWeight:800,
          color:DS.accent, letterSpacing:".12em" }}>SOAR</span>
        <div style={{ width:1, height:16, background:DS.border }}/>
        <span style={{ fontFamily:DS.sans, fontSize:11, color:DS.text3 }}>Correlation Rules</span>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontFamily:DS.mono, fontSize:10, fontWeight:600,
            padding:"2px 8px", borderRadius:4, color:DS.low,
            background:"rgba(22,163,74,.10)", border:"1px solid rgba(22,163,74,.25)" }}>
            ● LIVE
          </span>
        </div>
      </header>

      <div style={{ display:"flex", flex:1, minHeight:0 }}>

        {/* ── SIDEBAR ── */}
        <aside style={{ width:200, background:DS.bg1, borderRight:`1px solid ${DS.border}`,
          flexShrink:0, paddingTop:8 }}>
          {[
            { key:"list",   icon:"layers",  label:"Danh sách Rules" },
            { key:"editor", icon:"sliders", label:"Tạo / Chỉnh sửa" },
          ].map(item => {
            const active = scr===item.key;
            const click  = item.key!=="editor";
            return (
              <div key={item.key} onClick={click?()=>go(item.key):undefined}
                style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 16px",
                  cursor:click?"pointer":"default", transition:"all .12s", fontSize:11, fontWeight:500,
                  fontFamily:DS.sans, borderRight:`2px solid ${active?DS.accent:"transparent"}`,
                  background:active?DS.accentDim:"transparent",
                  color:active?DS.accent:click?DS.text2:DS.text4 }}>
                <IC n={item.icon} s={13} c="" style={{ color:active?DS.accent:click?DS.text3:DS.text4 }}/>
                {item.label}
              </div>
            );
          })}
          <div style={{ height:1, background:DS.border, margin:"12px 16px 8px" }}/>
          <div style={{ padding:"0 16px" }}>
            <div style={{ fontFamily:DS.mono, fontSize:9, fontWeight:700,
              color:DS.text4, letterSpacing:".07em", textTransform:"uppercase", marginBottom:8 }}>
              Tổng quan
            </div>
            {[
              { l:"Tổng Rules",     v:rules.length,                                    c:DS.text2 },
              { l:"Hoạt động",      v:rules.filter(r=>r.active).length,                c:DS.low },
              { l:"Critical",       v:rules.filter(r=>r.priority==="critical").length, c:DS.crit },
              { l:"Cases tạo",      v:rules.reduce((a,r)=>a+r.cases,0),               c:DS.accent },
            ].map(s=>(
              <div key={s.l} style={{ display:"flex", justifyContent:"space-between",
                padding:"3px 0", fontSize:11, fontFamily:DS.sans, color:DS.text3 }}>
                <span>{s.l}</span>
                <span style={{ fontFamily:DS.mono, fontWeight:700, color:s.c }}>{s.v}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main style={{ flex:1, overflowY:"auto", padding:"14px 18px", minWidth:0,
          display:"flex", flexDirection:"column", gap:12 }}>

          {/* ════════════════ LIST ════════════════ */}
          {scr==="list" && (
            <>
              {/* Page title */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <h1 style={{ fontFamily:DS.sans, fontSize:14, fontWeight:700, color:DS.text }}>
                    Quản lý Correlation Rules
                  </h1>
                  <p style={{ fontFamily:DS.sans, fontSize:11, color:DS.text3, marginTop:2 }}>
                    Cấu hình quy tắc tự động gom Alert thành Case
                  </p>
                </div>
                <Btn variant="primary" icon="plus" onClick={()=>openEditor()}>Tạo mới Rule</Btn>
              </div>

              {/* Stats */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
                <StatCard icon="layers" label="Tổng Rules"    value={rules.length}                                     color={DS.accent}/>
                <StatCard icon="power"  label="Hoạt động"     value={rules.filter(r=>r.active).length}                 color={DS.low}/>
                <StatCard icon="alert"  label="Critical Rules" value={rules.filter(r=>r.priority==="critical").length}  color={DS.crit}/>
                <StatCard icon="zap"    label="Cases đã tạo"  value={rules.reduce((a,r)=>a+r.cases,0)}                 color={DS.med}/>
              </div>

              {/* Filter bar */}
              <div style={{ background:DS.bg2, border:`1px solid ${DS.border}`, borderRadius:8,
                padding:"10px 14px", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                <div style={{ position:"relative", flex:"0 0 240px" }}>
                  <span style={{ position:"absolute", left:8, top:"50%", transform:"translateY(-50%)",
                    color:DS.text4, pointerEvents:"none" }}>
                    <IC n="search" s={12}/>
                  </span>
                  <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm kiếm theo tên rule..."
                    style={{ width:"100%", height:30, padding:"4px 10px 4px 28px", fontSize:11,
                      fontFamily:DS.mono, border:`1px solid ${DS.border}`, borderRadius:6,
                      outline:"none", background:DS.bg3, color:DS.text }}
                    onFocus={e=>e.target.style.borderColor=DS.accent}
                    onBlur={e=>e.target.style.borderColor=DS.border}/>
                </div>
                <div style={{ width:1, height:16, background:DS.border }}/>
                <Sel value={fSt} onChange={e=>setFSt(e.target.value)}
                  options={[{v:"all",l:"Tất cả trạng thái"},{v:"active",l:"Hoạt động"},{v:"inactive",l:"Không hoạt động"}]}
                  style={{ width:160 }}/>
                <Sel value={fPr} onChange={e=>setFPr(e.target.value)}
                  options={[{v:"all",l:"Tất cả mức độ"},{v:"critical",l:"Critical"},{v:"high",l:"High"},{v:"medium",l:"Medium"},{v:"low",l:"Low"}]}
                  style={{ width:140 }}/>
                <span style={{ marginLeft:"auto", fontFamily:DS.mono, fontSize:10, color:DS.text3 }}>
                  {filtered.length}/{rules.length} rules
                </span>
              </div>

              {/* Table */}
              <div style={{ background:DS.bg2, border:`1px solid ${DS.border}`, borderRadius:8, overflow:"hidden" }}>
                <table>
                  <thead>
                    <tr>
                      {["Tên Rule","Mô tả","Priority","Trạng thái","Cases","Người tạo","Cập nhật","Thao tác"].map(h=>(
                        <th key={h} style={{ padding:"8px 10px", textAlign:"left",
                          fontFamily:DS.mono, fontSize:10, fontWeight:600, color:DS.text3,
                          textTransform:"uppercase", letterSpacing:".07em",
                          background:DS.bg2, borderBottom:`1px solid ${DS.border}`,
                          whiteSpace:"nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(rule=>(
                      <tr key={rule.id}>
                        <td style={{ padding:"9px 10px", borderBottom:`1px solid ${DS.border}` }}>
                          <span style={{ fontFamily:DS.sans, fontSize:12, fontWeight:600,
                            color:DS.text }}>{rule.name}</span>
                        </td>
                        <td style={{ padding:"9px 10px", borderBottom:`1px solid ${DS.border}`,
                          maxWidth:200 }}>
                          <span style={{ fontFamily:DS.sans, fontSize:11, color:DS.text3,
                            display:"block", whiteSpace:"nowrap", overflow:"hidden",
                            textOverflow:"ellipsis" }} title={rule.desc}>{rule.desc}</span>
                        </td>
                        <td style={{ padding:"9px 10px", borderBottom:`1px solid ${DS.border}` }}>
                          <SevBadge sev={rule.priority}/>
                        </td>
                        <td style={{ padding:"9px 10px", borderBottom:`1px solid ${DS.border}` }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <Toggle value={rule.active}
                              onChange={v=>setRules(rules.map(r=>r.id===rule.id?{...r,active:v}:r))}/>
                            <StatusPill active={rule.active}/>
                          </div>
                        </td>
                        <td style={{ padding:"9px 10px", borderBottom:`1px solid ${DS.border}` }}>
                          <span style={{ fontFamily:DS.mono, fontWeight:700, color:DS.accent, fontSize:12 }}>
                            {rule.cases}
                          </span>
                        </td>
                        <td style={{ padding:"9px 10px", borderBottom:`1px solid ${DS.border}`,
                          fontFamily:DS.mono, fontSize:10, color:DS.text3 }}>{rule.creator}</td>
                        <td style={{ padding:"9px 10px", borderBottom:`1px solid ${DS.border}`,
                          fontFamily:DS.mono, fontSize:10, color:DS.text4 }}>{rule.updated}</td>
                        <td style={{ padding:"9px 10px", borderBottom:`1px solid ${DS.border}` }}>
                          <div style={{ display:"flex", gap:4 }}>
                            <IconBtn icon="edit" tip="Chỉnh sửa" onClick={()=>openEditor(rule)}/>
                            <IconBtn icon="copy" tip="Nhân bản"
                              onClick={()=>{ setRules([...rules,{...rule,id:Date.now(),name:rule.name+" (Copy)",cases:0,active:false}]); notify("Đã nhân bản Rule"); }}/>
                            <IconBtn icon="trash" tip={rule.active?"Tắt rule trước khi xóa":"Xóa"} danger
                              disabled={rule.active}
                              onClick={()=>{ setRules(rules.filter(r=>r.id!==rule.id)); notify("Đã xóa Rule","error"); }}/>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {!filtered.length && (
                      <tr><td colSpan={8} style={{ padding:"40px 10px", textAlign:"center",
                        fontFamily:DS.sans, fontSize:11, color:DS.text4 }}>
                        Không tìm thấy rule nào phù hợp
                      </td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ════════════════ EDITOR ════════════════ */}
          {scr==="editor" && (
            <div style={{ maxWidth:720 }}>
              {/* Breadcrumb */}
              <div style={{ display:"flex", alignItems:"center", gap:5, fontFamily:DS.sans,
                fontSize:11, color:DS.text3, marginBottom:14 }}>
                <button onClick={()=>go("list")} style={{ background:"none", border:"none",
                  cursor:"pointer", color:DS.accent, fontSize:11, fontFamily:DS.sans, padding:0 }}>
                  Danh sách Rules
                </button>
                <IC n="chevR" s={10}/>
                <span style={{ color:DS.text2 }}>{editing?"Chỉnh sửa Rule":"Tạo mới Rule"}</span>
              </div>

              {/* Step bar */}
              <div style={{ background:DS.bg2, border:`1px solid ${DS.border}`, borderRadius:8,
                padding:"16px 22px", marginBottom:12, display:"flex", alignItems:"center" }}>
                {[{n:1,l:"Thông tin chung"},{n:2,l:"Correlation Logic"},{n:3,l:"Action & Template"}].map((s,i)=>{
                  const done=step>s.n, active=step===s.n;
                  return (
                    <div key={s.n} style={{ display:"flex", alignItems:"center", flex:i<2?1:"auto" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                        <div style={{ width:24, height:24, borderRadius:"50%", flexShrink:0,
                          background:done?DS.accent:active?DS.accentDim:DS.bg3,
                          border:`2px solid ${done||active?DS.accent:DS.border}`,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontFamily:DS.mono, fontSize:10, fontWeight:700,
                          color:done?"#fff":active?DS.accent:DS.text4,
                          transition:"all .2s" }}>
                          {done?<IC n="check" s={11}/>:s.n}
                        </div>
                        <div>
                          <div style={{ fontFamily:DS.sans, fontSize:9, color:DS.text4, lineHeight:1.2 }}>
                            Bước {s.n}
                          </div>
                          <div style={{ fontFamily:DS.sans, fontSize:11, fontWeight:active?600:400,
                            color:active?DS.text:done?DS.accent:DS.text3 }}>{s.l}</div>
                        </div>
                      </div>
                      {i<2 && <div style={{ flex:1, height:1, margin:"0 14px",
                        background:done?DS.accent:DS.border, transition:"background .3s" }}/>}
                    </div>
                  );
                })}
              </div>

              {/* Form card */}
              <div style={{ background:DS.bg2, border:`1px solid ${DS.border}`, borderRadius:8,
                padding:"20px 24px", marginBottom:10 }}>

                {/* ── STEP 1 ── */}
                {step===1 && (
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:18,
                      fontFamily:DS.sans, fontSize:12, fontWeight:600, color:DS.text }}>
                      <IC n="shield" s={14} c="" style={{ color:DS.accent }}/>Thông tin chung
                    </div>
                    <FItem label="Tên Rule" required error={errs.name}>
                      <Input value={form.name}
                        onChange={e=>{ sf("name",e.target.value); setErrs(er=>({...er,name:""})); }}
                        placeholder="VD: Brute Force SSH Detection" error={errs.name}/>
                    </FItem>
                    <FItem label="Mô tả">
                      <textarea value={form.desc} onChange={e=>sf("desc",e.target.value)} rows={3}
                        placeholder="Mô tả ngắn gọn về mục đích và phạm vi của rule..."
                        style={{ width:"100%", padding:"7px 10px", fontSize:11, lineHeight:1.6,
                          fontFamily:DS.sans, border:`1px solid ${DS.border}`, borderRadius:6,
                          resize:"vertical", color:DS.text, background:DS.bg3, outline:"none" }}
                        onFocus={e=>e.target.style.borderColor=DS.accent}
                        onBlur={e=>e.target.style.borderColor=DS.border}/>
                    </FItem>
                  </div>
                )}

                {/* ── STEP 2 ── */}
                {step===2 && (
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:18,
                      fontFamily:DS.sans, fontSize:12, fontWeight:600, color:DS.text }}>
                      <IC n="sliders" s={14} c="" style={{ color:DS.accent }}/>Correlation Logic
                      <span style={{ fontSize:10, color:DS.text3, fontWeight:400 }}>
                        — Cấu hình dòng chảy xử lý Alert
                      </span>
                    </div>

                    {/* 1. INPUT FILTER */}
                    <SCard num="1" color={DS.accent} icon="filter"
                      title="Input Filter" subtitle="— Điều kiện lọc Alert đầu vào" badge="KHI">
                      {errs.f1v && (
                        <div style={{ color:DS.crit, fontSize:10, marginBottom:7,
                          display:"flex", alignItems:"center", gap:3, fontFamily:DS.sans }}>
                          <IC n="alert" s={10}/>{errs.f1v}
                        </div>
                      )}
                      {form.filterGroups.map((grp,gi)=>(
                        <div key={grp.id} style={{ marginBottom:gi<form.filterGroups.length-1?8:0 }}>
                          {gi>0 && (
                            <div style={{ display:"flex", alignItems:"center", gap:8, margin:"6px 0" }}>
                              <div style={{ flex:1, height:1, background:DS.border }}/>
                              <span style={{ fontFamily:DS.mono, fontSize:9, fontWeight:700,
                                padding:"2px 8px", borderRadius:4,
                                color:DS.high, background:"rgba(234,88,12,.10)",
                                border:"1px solid rgba(234,88,12,.25)" }}>OR</span>
                              <div style={{ flex:1, height:1, background:DS.border }}/>
                              <button onClick={()=>remGrp(grp.id)}
                                style={{ background:"none",border:"none",cursor:"pointer",
                                  color:DS.text4,padding:0 }}
                                onMouseEnter={e=>e.currentTarget.style.color=DS.crit}
                                onMouseLeave={e=>e.currentTarget.style.color=DS.text4}>
                                <IC n="x" s={12}/>
                              </button>
                            </div>
                          )}
                          <div style={{ background:gi===0?DS.bg3:"rgba(234,88,12,.04)",
                            border:`1px solid ${gi===0?DS.border:"rgba(234,88,12,.2)"}`,
                            borderRadius:6, padding:"9px 11px" }}>
                            {grp.conditions.length>1 && (
                              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:7 }}>
                                <span style={{ fontSize:11, color:DS.text3, fontFamily:DS.sans }}>Nối bằng:</span>
                                <button onClick={()=>togLogic(grp.id)}
                                  style={{ padding:"1px 9px", borderRadius:4, fontSize:10, fontWeight:700,
                                    fontFamily:DS.mono, cursor:"pointer", border:"1.5px solid",
                                    color:grp.logic==="AND"?DS.accent:DS.high,
                                    borderColor:grp.logic==="AND"?DS.accent:DS.high,
                                    background:grp.logic==="AND"?DS.accentDim:"rgba(234,88,12,.08)" }}>
                                  {grp.logic}
                                </button>
                                <span style={{ fontSize:10, color:DS.text4, fontFamily:DS.sans }}>
                                  (click để đổi)
                                </span>
                              </div>
                            )}
                            {grp.conditions.map((cond,ci)=>(
                              <div key={cond.id} style={{ display:"flex", alignItems:"center", gap:6,
                                marginBottom:ci<grp.conditions.length-1?5:0, flexWrap:"wrap" }}>
                                <span style={{ fontFamily:DS.mono, fontSize:10, color:DS.text3, width:26,
                                  textAlign:"right", flexShrink:0, fontWeight:ci===0?400:700,
                                  color:ci===0?DS.text3:grp.logic==="AND"?DS.accent:DS.high }}>
                                  {ci===0?"Khi":grp.logic}
                                </span>
                                <Sel value={cond.field}
                                  onChange={e=>updCond(grp.id,cond.id,c=>({...c,field:e.target.value}))}
                                  options={FIELDS} style={{ width:120 }}/>
                                <Sel value={cond.op}
                                  onChange={e=>updCond(grp.id,cond.id,c=>({...c,op:e.target.value}))}
                                  options={OPS} style={{ width:105 }}/>
                                <input value={cond.val}
                                  onChange={e=>updCond(grp.id,cond.id,c=>({...c,val:e.target.value}))}
                                  placeholder="giá trị..."
                                  style={{ ...inp2(100, {textAlign:"left"}) }}
                                  onFocus={e=>e.target.style.borderColor=DS.accent}
                                  onBlur={e=>e.target.style.borderColor=DS.border}/>
                                {grp.conditions.length>1 && (
                                  <button onClick={()=>remCond(grp.id,cond.id)}
                                    style={{ background:"none",border:"none",cursor:"pointer",
                                      color:DS.text4,padding:2 }}
                                    onMouseEnter={e=>e.currentTarget.style.color=DS.crit}
                                    onMouseLeave={e=>e.currentTarget.style.color=DS.text4}>
                                    <IC n="x" s={12}/>
                                  </button>
                                )}
                              </div>
                            ))}
                            <button onClick={()=>addCond(grp.id)}
                              style={{ marginTop:7, display:"inline-flex", alignItems:"center", gap:4,
                                height:24, padding:"0 9px", fontSize:10, fontFamily:DS.sans, fontWeight:600,
                                border:`1px dashed ${DS.border2}`, borderRadius:5,
                                background:"transparent", cursor:"pointer", color:DS.text3 }}
                              onMouseEnter={e=>{e.currentTarget.style.borderColor=DS.accent;e.currentTarget.style.color=DS.accent;}}
                              onMouseLeave={e=>{e.currentTarget.style.borderColor=DS.border2;e.currentTarget.style.color=DS.text3;}}>
                              <IC n="plus" s={10}/>Thêm điều kiện {grp.logic}
                            </button>
                          </div>
                        </div>
                      ))}
                      <div style={{ marginTop:7, display:"flex", alignItems:"center", gap:8 }}>
                        <button onClick={addGrp}
                          style={{ display:"inline-flex", alignItems:"center", gap:4,
                            height:24, padding:"0 9px", fontSize:10, fontFamily:DS.sans, fontWeight:600,
                            border:"1px dashed rgba(234,88,12,.4)", borderRadius:5,
                            background:"transparent", cursor:"pointer", color:DS.high }}
                          onMouseEnter={e=>e.currentTarget.style.background="rgba(234,88,12,.06)"}
                          onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                          <IC n="plus" s={10}/>Thêm nhóm OR
                        </button>
                        <span style={{ fontSize:10, color:DS.text4, fontFamily:DS.sans }}>
                          Tạo nhóm điều kiện mới, nối bằng OR
                        </span>
                      </div>
                    </SCard>
                    <SConnector/>

                    {/* 2. TIME WINDOW */}
                    <SCard num="2" color="#7c3aed" icon="clock"
                      title="Time Window" subtitle="— Khoảng thời gian xét tương quan" badge="TRONG VÒNG">
                      <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                        <input type="number" value={form.tw}
                          onChange={e=>{sf("tw",parseInt(e.target.value)||"");setErrs(er=>({...er,tw:""}));}}
                          style={{ ...inp2(68) }}
                          onFocus={e=>e.target.style.borderColor="#7c3aed"}
                          onBlur={e=>e.target.style.borderColor=DS.border}/>
                        <Sel value={form.twu} onChange={e=>sf("twu",e.target.value)}
                          options={[{v:"minutes",l:"Phút"},{v:"hours",l:"Giờ"}]} style={{ width:80 }}/>
                        <div style={{ width:1, height:16, background:DS.border }}/>
                        {[{v:"sliding",l:"Sliding",desc:"Tịnh tiến"},{v:"tumbling",l:"Tumbling",desc:"Cố định"}].map(opt=>(
                          <label key={opt.v} onClick={()=>sf("twType",opt.v)}
                            style={{ display:"inline-flex", alignItems:"center", gap:6,
                              padding:"4px 10px", borderRadius:5, cursor:"pointer", fontSize:11,
                              fontFamily:DS.sans,
                              border:`1.5px solid ${form.twType===opt.v?"#7c3aed":DS.border}`,
                              background:form.twType===opt.v?"rgba(124,58,237,.08)":DS.bg3,
                              color:form.twType===opt.v?"#7c3aed":DS.text2 }}>
                            <input type="radio" checked={form.twType===opt.v} onChange={()=>{}}
                              style={{ accentColor:"#7c3aed", margin:0 }}/>
                            <span style={{ fontWeight:500 }}>{opt.l}</span>
                            <span style={{ fontSize:10, color:DS.text4 }}>{opt.desc}</span>
                          </label>
                        ))}
                        <span title="Sliding: tịnh tiến liên tục, không bỏ lỡ tấn công qua 2 khung giờ. Tumbling: reset theo chu kỳ."
                          style={{ cursor:"help" }}>
                          <IC n="info" s={12} c="" style={{ color:DS.text4 }}/>
                        </span>
                        {errs.tw && <span style={{ color:DS.crit, fontSize:10, fontFamily:DS.sans }}>{errs.tw}</span>}
                      </div>
                    </SCard>
                    <SConnector/>

                    {/* 3. GROUPING */}
                    <SCard num="3" color="#0891b2" icon="link"
                      title="Grouping Fields" subtitle="— Trường gom nhóm Alert" badge="GOM THEO">
                      {errs.gb && (
                        <div style={{ color:DS.crit, fontSize:10, marginBottom:7,
                          display:"flex", alignItems:"center", gap:3, fontFamily:DS.sans }}>
                          <IC n="alert" s={10}/>{errs.gb}
                        </div>
                      )}
                      <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                        <div style={{ position:"relative", minWidth:260 }}>
                          <div onClick={()=>setGbOpen(o=>!o)}
                            style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:4,
                              minHeight:32, padding:"4px 8px",
                              border:`1.5px solid ${gbOpen?"#0891b2":form.groupBy.length?DS.accent:DS.border}`,
                              borderRadius:6, cursor:"pointer", background:DS.bg3 }}>
                            {form.groupBy.length===0
                              ? <span style={{ fontSize:11, color:DS.text4, fontFamily:DS.sans }}>
                                  Chọn trường gom nhóm...
                                </span>
                              : form.groupBy.map(g=>(
                                <span key={g} style={{ display:"inline-flex", alignItems:"center", gap:3,
                                  padding:"1px 6px", borderRadius:4, fontFamily:DS.mono, fontSize:10,
                                  color:DS.accent, background:DS.accentDim,
                                  border:`1px solid rgba(29,107,243,.25)` }}>
                                  {g}
                                  <button onClick={e=>{e.stopPropagation();remFromGrp(g);}}
                                    style={{ background:"none",border:"none",cursor:"pointer",
                                      color:"rgba(29,107,243,.5)",padding:0,display:"flex" }}>
                                    <IC n="x" s={9}/>
                                  </button>
                                </span>
                              ))
                            }
                            <IC n="chevR" s={10} c="" style={{ color:DS.text4, marginLeft:"auto",
                              flexShrink:0, transform:gbOpen?"rotate(270deg)":"rotate(90deg)",
                              transition:"transform .15s" }}/>
                          </div>
                          {gbOpen && (
                            <div style={{ position:"absolute", top:"calc(100% + 4px)", left:0, right:0,
                              zIndex:200, background:DS.bg2, border:`1px solid ${DS.border}`, borderRadius:6,
                              boxShadow:"0 10px 28px rgba(0,0,0,.12)", overflow:"hidden" }}>
                              {GROUPS.map(g=>{
                                const sel=form.groupBy.includes(g);
                                return (
                                  <div key={g} onClick={()=>sel?remFromGrp(g):addToGrp(g)}
                                    style={{ padding:"7px 12px", fontFamily:DS.mono, fontSize:11,
                                      cursor:"pointer",
                                      background:sel?DS.accentDim:DS.bg2,
                                      color:sel?DS.accent:DS.text2,
                                      borderBottom:`1px solid ${DS.border}`,
                                      display:"flex", alignItems:"center", justifyContent:"space-between" }}
                                    onMouseEnter={e=>{ if(!sel)e.currentTarget.style.background=DS.bg3; }}
                                    onMouseLeave={e=>{ if(!sel)e.currentTarget.style.background=DS.bg2; }}>
                                    {g}
                                    {sel&&<IC n="check" s={11} c="" style={{ color:DS.accent }}/>}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        {form.groupBy.length>0 && (
                          <span style={{ fontFamily:DS.sans, fontSize:10, color:DS.text3,
                            lineHeight:"30px" }}>
                            {form.groupBy.length} trường đã chọn
                          </span>
                        )}
                      </div>
                    </SCard>
                    <SConnector/>

                    {/* 4. THRESHOLD */}
                    <SCard num="4" color={DS.med} icon="alert"
                      title="Threshold" subtitle="— Ngưỡng kích hoạt tạo Case" badge="THỎA MÃN">
                      {errs.thr && (
                        <div style={{ color:DS.crit, fontSize:10, marginBottom:7,
                          display:"flex", alignItems:"center", gap:3, fontFamily:DS.sans }}>
                          <IC n="alert" s={10}/>{errs.thr}
                        </div>
                      )}
                      <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                        {[
                          { type:"count", content:(
                            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                              <span style={{ fontSize:11, color:DS.text2, fontFamily:DS.sans }}>Số Alert lớn hơn</span>
                              <input type="number" value={form.thrN}
                                onChange={e=>{sf("thrN",parseInt(e.target.value)||"");setErrs(er=>({...er,thr:""}));}}
                                onClick={e=>e.stopPropagation()}
                                style={{ ...inp2(64) }}/>
                              <span style={{ fontSize:11, color:DS.text3, fontFamily:DS.sans }}>lần</span>
                            </div>
                          )},
                          { type:"unique", content:(
                            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                              <span style={{ fontSize:11, color:DS.text2, fontFamily:DS.sans }}>Unique</span>
                              <div onClick={e=>e.stopPropagation()}>
                                <Sel value={form.thrF} onChange={e=>sf("thrF",e.target.value)}
                                  options={GROUPS} style={{ width:130, fontFamily:DS.mono }}/>
                              </div>
                              <span style={{ fontSize:11, color:DS.text2, fontFamily:DS.sans }}>lớn hơn</span>
                              <input type="number" value={form.thrU}
                                onChange={e=>sf("thrU",parseInt(e.target.value)||"")}
                                onClick={e=>e.stopPropagation()}
                                style={{ ...inp2(64) }}/>
                            </div>
                          )},
                        ].map(row=>(
                          <div key={row.type}
                            style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer",
                              padding:"8px 12px", borderRadius:6,
                              border:`1.5px solid ${form.thrType===row.type?DS.med:DS.border}`,
                              background:form.thrType===row.type?"rgba(217,119,6,.07)":DS.bg3 }}
                            onClick={()=>sf("thrType",row.type)}>
                            <input type="radio" checked={form.thrType===row.type}
                              onChange={()=>sf("thrType",row.type)}
                              onClick={e=>e.stopPropagation()}
                              style={{ accentColor:DS.med, flexShrink:0, margin:0, cursor:"pointer" }}/>
                            <div onClick={e=>e.stopPropagation()}
                              style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                              {row.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    </SCard>
                  </div>
                )}

                {/* ── STEP 3 ── */}
                {step===3 && (
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:18,
                      fontFamily:DS.sans, fontSize:12, fontWeight:600, color:DS.text }}>
                      <IC n="zap" s={14} c="" style={{ color:DS.accent }}/>Action & Case Template
                    </div>

                    {/* Case title */}
                    <FItem label="Tiêu đề Case" help="Dùng {{src_ip}}, {{user_name}}, {{hostname}} để tự điền dữ liệu">
                      <Input value={form.title} onChange={e=>sf("title",e.target.value)} mono/>
                      <div style={{ marginTop:5, display:"flex", flexWrap:"wrap", gap:4, alignItems:"center" }}>
                        <span style={{ fontFamily:DS.sans, fontSize:10, color:DS.text4 }}>Biến:</span>
                        {["{{src_ip}}","{{user_name}}","{{hostname}}","{{process_name}}"].map(v=>(
                          <code key={v} onClick={()=>sf("title",form.title+v)}
                            style={{ fontFamily:DS.mono, fontSize:9, cursor:"pointer",
                              padding:"1px 5px", borderRadius:4,
                              background:DS.bg3, border:`1px solid ${DS.border}`, color:DS.accent }}
                            title="Click để chèn">{v}</code>
                        ))}
                      </div>
                    </FItem>

                    <div style={{ height:1, background:DS.border, margin:"4px 0 16px" }}/>

                    {/* 2-col: Phân công + Quản lý */}
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
                      {/* Phân công */}
                      <div style={{ border:`1px solid ${DS.border}`, borderRadius:8, overflow:"hidden" }}>
                        <div style={{ padding:"8px 14px", borderBottom:`1px solid ${DS.border}`,
                          background:`linear-gradient(to right,${DS.accentDim},transparent)`,
                          display:"flex", alignItems:"center", gap:7 }}>
                          <IC n="tag" s={12} c="" style={{ color:DS.accent }}/>
                          <span style={{ fontFamily:DS.sans, fontSize:11, fontWeight:600, color:DS.text }}>
                            Phân công
                          </span>
                        </div>
                        <div style={{ padding:"12px 14px", display:"flex", flexDirection:"column", gap:12 }}>
                          <div>
                            <FLabel label="Đơn vị xử lý"/>
                            <Sel value={form.assignUnit}
                              onChange={e=>{ sf("assignUnit",e.target.value); sf("assignPerson","Chưa chỉ định"); }}
                              options={UNITS} style={{ width:"100%" }}/>
                          </div>
                          <div>
                            <FLabel label="Người thực hiện"/>
                            <SearchSel value={form.assignPerson||"Chưa chỉ định"}
                              onChange={v=>sf("assignPerson",v)}
                              options={PERSONS[form.assignUnit]||["Chưa chỉ định","Tự động phân bổ"]}/>
                          </div>
                        </div>
                      </div>
                      {/* Quản lý */}
                      <div style={{ border:`1px solid ${DS.border}`, borderRadius:8, overflow:"hidden" }}>
                        <div style={{ padding:"8px 14px", borderBottom:`1px solid ${DS.border}`,
                          background:"linear-gradient(to right,rgba(217,119,6,.08),transparent)",
                          display:"flex", alignItems:"center", gap:7 }}>
                          <IC n="sliders" s={12} c="" style={{ color:DS.med }}/>
                          <span style={{ fontFamily:DS.sans, fontSize:11, fontWeight:600, color:DS.text }}>
                            Quản lý
                          </span>
                        </div>
                        <div style={{ padding:"12px 14px", display:"flex", flexDirection:"column", gap:12 }}>
                          <div>
                            <FLabel label="Mức độ nghiêm trọng"/>
                            <SevSel value={form.caseSeverity} onChange={v=>sf("caseSeverity",v)}/>
                          </div>
                          <div>
                            <FLabel label="SLA" help="Chính sách thời gian xử lý áp dụng cho Case"/>
                            <Sel value={form.caseSLA} onChange={e=>sf("caseSLA",e.target.value)}
                              options={SLAS.map(s=>({v:s,l:s}))} style={{ width:"100%" }}/>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Case Merging */}
                    <FItem label="Case Merging">
                      {/* Master toggle */}
                      <label style={{ display:"flex", alignItems:"flex-start", gap:8, cursor:"pointer",
                        padding:"10px 13px",
                        border:`1px solid ${form.merge?DS.accent:DS.border}`,
                        borderRadius: form.merge?"6px 6px 0 0":6,
                        background: form.merge?DS.accentDim:DS.bg3,
                        borderBottom: form.merge?`1px solid ${DS.accent}`:`1px solid ${DS.border}` }}>
                        <input type="checkbox" checked={form.merge}
                          onChange={e=>sf("merge",e.target.checked)}
                          style={{ marginTop:2, accentColor:DS.accent, flexShrink:0 }}/>
                        <div>
                          <div style={{ fontFamily:DS.sans, fontSize:12, fontWeight:500,
                            color:form.merge?DS.accent:DS.text }}>
                            Cho phép gộp Alert vào Case đã tồn tại
                            <span style={{ fontSize:10, color:DS.text4, marginLeft:5, fontStyle:"italic" }}>
                              (Enable Case Merging)
                            </span>
                          </div>
                          <div style={{ fontFamily:DS.sans, fontSize:11, color:DS.text3, marginTop:2 }}>
                            Alert mới thỏa điều kiện sẽ được gộp vào Case cũ thay vì tạo Case trùng lặp
                          </div>
                        </div>
                      </label>

                      {form.merge && (
                        <div style={{ border:`1px solid ${DS.accent}`, borderTop:"none",
                          borderRadius:"0 0 6px 6px", background:DS.bg2,
                          padding:"14px 14px 12px" }}>
                          {/* Section label */}
                          <div style={{ fontFamily:DS.sans, fontSize:11, fontWeight:600,
                            color:DS.text2, marginBottom:10 }}>
                            Trạng thái Case áp dụng
                            <span style={{ fontSize:10, color:DS.text4, fontStyle:"italic",
                              marginLeft:5, fontWeight:400 }}>(Applicable Case Status)</span>
                          </div>

                          {/* Open Cases */}
                          <div style={{ border:`1px solid ${DS.border}`, borderRadius:6,
                            overflow:"hidden", marginBottom:8 }}>
                            <div style={{ display:"flex", alignItems:"flex-start", gap:8,
                              padding:"9px 12px", background:DS.bg3,
                              borderBottom:`1px solid ${DS.border}` }}>
                              <input type="checkbox" checked={true} disabled
                                style={{ marginTop:2, accentColor:DS.accent, flexShrink:0,
                                  cursor:"not-allowed" }}/>
                              <div style={{ flex:1 }}>
                                <div style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"wrap" }}>
                                  <span style={{ fontFamily:DS.sans, fontSize:11, fontWeight:600,
                                    color:DS.text }}>Case đang mở</span>
                                  <span style={{ fontFamily:DS.sans, fontSize:10, color:DS.text3,
                                    fontStyle:"italic" }}>(Open Cases)</span>
                                  <span style={{ fontFamily:DS.mono, fontSize:9, fontWeight:700,
                                    padding:"1px 6px", borderRadius:4, letterSpacing:".04em",
                                    color:DS.accent, background:DS.accentDim,
                                    border:`1px solid rgba(29,107,243,.25)` }}>MẶC ĐỊNH</span>
                                </div>
                                <div style={{ fontFamily:DS.sans, fontSize:10, color:DS.text3, marginTop:2 }}>
                                  Luôn tìm và gộp vào Case đang ở trạng thái Open
                                </div>
                              </div>
                            </div>
                            <div style={{ padding:"9px 12px 9px 36px", background:DS.bg2 }}>
                              <label style={{ display:"flex", alignItems:"flex-start", gap:7,
                                cursor:"pointer" }}>
                                <input type="checkbox" checked={form.mergeOpenSLAOnly}
                                  onChange={e=>sf("mergeOpenSLAOnly",e.target.checked)}
                                  style={{ marginTop:2, accentColor:DS.accent, flexShrink:0 }}/>
                                <div>
                                  <div style={{ fontFamily:DS.sans, fontSize:11, fontWeight:500,
                                    color:DS.text2 }}>Chỉ áp dụng khi Case còn trong thời hạn SLA</div>
                                  <div style={{ fontFamily:DS.sans, fontSize:10, color:DS.text4, marginTop:1 }}>
                                    Bỏ qua các Case đang mở nhưng đã hết hạn SLA
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>

                          {/* Closed Cases */}
                          <div style={{ border:`1px solid ${form.mergeClosedCases?DS.accent:DS.border}`,
                            borderRadius:6, overflow:"hidden", transition:"border-color .15s" }}>
                            <label style={{ display:"flex", alignItems:"flex-start", gap:8,
                              cursor:"pointer", padding:"9px 12px",
                              background:form.mergeClosedCases?DS.accentDim:DS.bg3,
                              borderBottom:form.mergeClosedCases?`1px solid ${DS.accent}`:"none" }}>
                              <input type="checkbox" checked={form.mergeClosedCases}
                                onChange={e=>sf("mergeClosedCases",e.target.checked)}
                                style={{ marginTop:2, accentColor:DS.accent, flexShrink:0 }}/>
                              <div>
                                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                                  <span style={{ fontFamily:DS.sans, fontSize:11, fontWeight:500,
                                    color:form.mergeClosedCases?DS.accent:DS.text }}>
                                    Case đã đóng
                                  </span>
                                  <span style={{ fontFamily:DS.sans, fontSize:10, color:DS.text3,
                                    fontStyle:"italic" }}>(Closed Cases)</span>
                                </div>
                                <div style={{ fontFamily:DS.sans, fontSize:10, color:DS.text3, marginTop:2 }}>
                                  Cho phép mở lại và gộp vào Case đã Closed
                                </div>
                              </div>
                            </label>

                            {form.mergeClosedCases && (
                              <div style={{ padding:"12px 12px 12px 34px", background:DS.bg2,
                                display:"flex", flexDirection:"column", gap:12 }}>
                                {/* Lookback */}
                                <div>
                                  <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:7 }}>
                                    <IC n="clock" s={11} c="" style={{ color:DS.text3 }}/>
                                    <span style={{ fontFamily:DS.sans, fontSize:11, fontWeight:600,
                                      color:DS.text2 }}>Thời gian tìm kiếm Case</span>
                                    <span style={{ fontFamily:DS.sans, fontSize:10, color:DS.text4,
                                      fontStyle:"italic" }}>(Lookback Window)</span>
                                    <span title="Tìm các Case đã đóng trong khoảng thời gian này để mở lại."
                                      style={{ cursor:"help" }}>
                                      <IC n="info" s={11} c="" style={{ color:DS.text4 }}/>
                                    </span>
                                  </div>
                                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                                    <input type="number" value={form.mergeClosedLookback} min={1}
                                      onChange={e=>sf("mergeClosedLookback",parseInt(e.target.value)||1)}
                                      style={{ ...inp2(68) }}
                                      onFocus={e=>e.target.style.borderColor=DS.accent}
                                      onBlur={e=>e.target.style.borderColor=DS.border}/>
                                    <Sel value={form.mergeClosedLookbackUnit}
                                      onChange={e=>sf("mergeClosedLookbackUnit",e.target.value)}
                                      options={[{v:"hours",l:"Giờ"},{v:"days",l:"Ngày"}]}
                                      style={{ width:80 }}/>
                                    <span style={{ fontFamily:DS.sans, fontSize:10, color:DS.text4 }}>
                                      tính từ hiện tại
                                    </span>
                                  </div>
                                </div>
                                <div style={{ height:1, background:DS.border }}/>
                                {/* Re-open SLA */}
                                <div>
                                  <div style={{ fontFamily:DS.sans, fontSize:11, fontWeight:600,
                                    color:DS.text2, marginBottom:7 }}>
                                    Cấu hình SLA khi mở lại
                                    <span style={{ fontSize:10, color:DS.text4, fontStyle:"italic",
                                      marginLeft:5, fontWeight:400 }}>(Re-open SLA)</span>
                                  </div>
                                  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                                    {[
                                      { v:"reset", l:"Đặt lại SLA", sub:"Tính lại từ đầu kể từ lúc gộp Alert mới" },
                                      { v:"keep",  l:"Giữ nguyên SLA", sub:"Tiếp tục dùng deadline của Case cũ" },
                                    ].map(opt=>(
                                      <label key={opt.v}
                                        onClick={()=>sf("mergeReopenSLA",opt.v)}
                                        style={{ display:"flex", alignItems:"flex-start", gap:7,
                                          padding:"8px 11px", borderRadius:5, cursor:"pointer",
                                          border:`1.5px solid ${form.mergeReopenSLA===opt.v?DS.accent:DS.border}`,
                                          background:form.mergeReopenSLA===opt.v?DS.accentDim:DS.bg3 }}>
                                        <input type="radio" checked={form.mergeReopenSLA===opt.v}
                                          onChange={()=>sf("mergeReopenSLA",opt.v)}
                                          onClick={e=>e.stopPropagation()}
                                          style={{ marginTop:2, accentColor:DS.accent, flexShrink:0 }}/>
                                        <div>
                                          <div style={{ fontFamily:DS.sans, fontSize:11, fontWeight:500,
                                            color:form.mergeReopenSLA===opt.v?DS.accent:DS.text2 }}>
                                            {opt.l}
                                          </div>
                                          <div style={{ fontFamily:DS.sans, fontSize:10, color:DS.text4,
                                            marginTop:1 }}>{opt.sub}</div>
                                        </div>
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </FItem>

                    {/* Summary */}
                    <div style={{ height:1, background:DS.border, margin:"4px 0 16px" }}/>
                    <div style={{ background:"rgba(22,163,74,.06)", border:"1px solid rgba(22,163,74,.25)",
                      borderRadius:8, padding:"12px 16px" }}>
                      <div style={{ fontFamily:DS.sans, fontSize:11, fontWeight:600, color:DS.low,
                        marginBottom:10, display:"flex", alignItems:"center", gap:5 }}>
                        <IC n="check" s={12}/>Tóm tắt cấu hình Rule
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"150px 1fr", rowGap:5 }}>
                        {[
                          ["Tên Rule",    form.name||"(Chưa đặt tên)"],
                          ["Filter",      form.filterGroups.map(g=>g.conditions.map(c=>`${c.field} ${c.op} "${c.val}"`).join(` ${g.logic} `)).join(") OR (") || "—"],
                          ["Time Window", `${form.tw} ${form.twu} (${form.twType==="sliding"?"Sliding":"Tumbling"})`],
                          ["Group By",    form.groupBy.join(", ")||"—"],
                          ["Threshold",   form.thrType==="count"?`Alert count > ${form.thrN}`:`Unique ${form.thrF} > ${form.thrU}`],
                          ["Đơn vị",      form.assignUnit],
                          ["Thực hiện",   form.assignPerson||"Chưa chỉ định"],
                          ["Severity",    form.caseSeverity.charAt(0).toUpperCase()+form.caseSeverity.slice(1)],
                          ["SLA",         form.caseSLA],
                          ["Merge",       form.merge?`Bật${form.mergeOpenSLAOnly?" (còn SLA)":""}${form.mergeClosedCases?` + Closed ${form.mergeClosedLookback}${form.mergeClosedLookbackUnit==="hours"?"h":"d"}`:""}` : "Tắt"],
                        ].map(([k,v],i)=>(
                          <>
                            <span key={i+"k"} style={{ fontFamily:DS.sans, fontSize:11,
                              fontWeight:600, color:DS.text3 }}>{k}:</span>
                            <span key={i+"v"} style={{ fontFamily: ["Filter","Time Window","Group By","Threshold"].includes(k)?DS.mono:DS.sans,
                              fontSize:11, color:DS.text2 }}>{v}</span>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer nav */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <Btn variant="ghost" icon="chevL" onClick={handleBack}>{step===1?"Huỷ":"Quay lại"}</Btn>
                <div style={{ display:"flex", gap:8 }}>
                  {step===3 && (
                    <Btn variant="ghost" icon="eye"
                      onClick={()=>{ setResults(null); setTesting(false); setModal(true); }}>
                      Test Rule
                    </Btn>
                  )}
                  {step<3
                    ? <Btn variant="primary" onClick={handleNext}>
                        Tiếp theo <IC n="chevR" s={11}/>
                      </Btn>
                    : <Btn variant="primary" icon="check" onClick={handleSave}>
                        {editing?"Lưu thay đổi":"Tạo Rule"}
                      </Btn>}
                </div>
              </div>

              {/* ── TEST MODAL ── */}
              {modal && (
                <div style={{ position:"fixed", inset:0, zIndex:1000,
                  background:"rgba(15,20,30,.45)", backdropFilter:"blur(3px)",
                  display:"flex", alignItems:"center", justifyContent:"center" }}
                  onClick={e=>{ if(e.target===e.currentTarget) setModal(false); }}>
                  <div style={{ background:DS.bg2, borderRadius:12, width:"min(820px,94vw)",
                    maxHeight:"88vh", display:"flex", flexDirection:"column",
                    boxShadow:"0 20px 60px rgba(0,0,0,.18),0 4px 16px rgba(0,0,0,.1)",
                    border:`1px solid ${DS.border}` }}>
                    {/* Modal header */}
                    <div style={{ padding:"18px 20px 14px", borderBottom:`1px solid ${DS.border}`,
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      flexShrink:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ width:36, height:36, borderRadius:8,
                          background:DS.accentDim, border:`1px solid rgba(29,107,243,.22)`,
                          display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <IC n="eye" s={16} c="" style={{ color:DS.accent }}/>
                        </div>
                        <div>
                          <div style={{ fontFamily:DS.sans, fontSize:14, fontWeight:700, color:DS.text }}>
                            Test Rule — Simulation
                          </div>
                          <div style={{ fontFamily:DS.sans, fontSize:11, color:DS.text3, marginTop:2 }}>
                            Quét dữ liệu Alert 24h qua để ước tính Case sẽ được tạo
                          </div>
                        </div>
                      </div>
                      <IconBtn icon="x" tip="Đóng" onClick={()=>setModal(false)}/>
                    </div>

                    {/* Modal body */}
                    <div style={{ flex:1, overflowY:"auto", padding:"14px 20px" }}>
                      {/* Config chips */}
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:10 }}>
                        {[
                          { icon:"filter", label:"INPUT FILTER",  val:filterText||"—" },
                          { icon:"clock",  label:"TIME WINDOW",   val:twText },
                          { icon:"link",   label:"GROUP BY",      val:grpText },
                          { icon:"alert",  label:"THRESHOLD",     val:thrText },
                        ].map(c=>(
                          <div key={c.label} style={{ background:DS.bg3, border:`1px solid ${DS.border}`,
                            borderRadius:6, padding:"9px 12px" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:5,
                              fontFamily:DS.mono, fontSize:9, fontWeight:700, letterSpacing:".07em",
                              textTransform:"uppercase", color:DS.text3, marginBottom:5 }}>
                              <IC n={c.icon} s={10}/>{c.label}
                            </div>
                            <div style={{ fontFamily:DS.mono, fontSize:11, fontWeight:600,
                              color:DS.text, wordBreak:"break-all" }}>{c.val}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginBottom:12 }}>
                        <Btn variant="primary" icon={testing?"spin":"play"} onClick={runTest}
                          disabled={testing}>
                          {testing?"Đang phân tích...":"Chạy Test"}
                        </Btn>
                      </div>

                      {/* Results */}
                      <div style={{ border:`1px solid ${DS.border}`, borderRadius:8, overflow:"hidden" }}>
                        <div style={{ padding:"9px 14px", background:DS.bg3,
                          borderBottom:`1px solid ${DS.border}`,
                          display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                          <span style={{ fontFamily:DS.sans, fontSize:11, fontWeight:600, color:DS.text,
                            display:"flex", alignItems:"center", gap:6 }}>
                            <IC n="layers" s={12} c="" style={{ color:DS.accent }}/>
                            Kết quả Simulation
                          </span>
                          {results && (
                            <span style={{ fontFamily:DS.mono, fontSize:9, fontWeight:700,
                              padding:"2px 7px", borderRadius:4, letterSpacing:".04em",
                              color:DS.low, background:"rgba(22,163,74,.10)",
                              border:"1px solid rgba(22,163,74,.25)" }}>
                              {results.length} CASES
                            </span>
                          )}
                        </div>

                        {!results && !testing && (
                          <div style={{ padding:"36px 20px", textAlign:"center" }}>
                            <IC n="play" s={28} c="" style={{ color:DS.border }}/>
                            <div style={{ fontFamily:DS.sans, fontSize:12, fontWeight:500,
                              color:DS.text2, marginTop:8 }}>Nhấn "Chạy Test" để bắt đầu phân tích</div>
                          </div>
                        )}

                        {testing && (
                          <div style={{ padding:"36px 20px", textAlign:"center" }}>
                            <IC n="spin" s={24} c="" style={{ color:DS.accent,
                              animation:"spin 1s linear infinite" }}/>
                            <div style={{ fontFamily:DS.sans, fontSize:11, color:DS.text3, marginTop:8 }}>
                              Đang quét Alert database...
                            </div>
                            <div style={{ margin:"8px auto 0", maxWidth:140, height:3,
                              background:DS.bg3, borderRadius:4, overflow:"hidden" }}>
                              <div style={{ height:"100%", background:DS.accent, borderRadius:4,
                                animation:"barAnim 1.2s ease-in-out infinite" }}/>
                            </div>
                          </div>
                        )}

                        {results && (
                          <>
                            <div style={{ margin:"10px 14px", padding:"7px 11px",
                              background:"rgba(22,163,74,.08)", border:"1px solid rgba(22,163,74,.22)",
                              borderRadius:6, display:"flex", alignItems:"center", gap:7,
                              fontFamily:DS.sans, fontSize:11, color:DS.low }}>
                              <IC n="check" s={12}/>
                              Hoàn tất — {results.length} Case từ {results.reduce((s,r)=>s+r.alerts,0)} Alerts
                              {" "}(nén ~{Math.round((1-results.length/results.reduce((s,r)=>s+r.alerts,0))*100)}%)
                            </div>
                            <table>
                              <thead>
                                <tr>
                                  {["Case ID","Tiêu đề","Severity","Alerts","Thời điểm"].map(h=>(
                                    <th key={h} style={{ padding:"7px 10px", textAlign:"left",
                                      fontFamily:DS.mono, fontSize:9, fontWeight:700, color:DS.text3,
                                      textTransform:"uppercase", letterSpacing:".07em",
                                      background:DS.bg3, borderTop:`1px solid ${DS.border}`,
                                      borderBottom:`1px solid ${DS.border}` }}>{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {results.map(r=>(
                                  <tr key={r.id} style={{ borderBottom:`1px solid ${DS.border}` }}>
                                    <td style={{ padding:"8px 10px" }}>
                                      <code style={{ fontFamily:DS.mono, fontSize:10,
                                        fontWeight:700, color:DS.accent }}>{r.id}</code>
                                    </td>
                                    <td style={{ padding:"8px 10px", fontFamily:DS.sans,
                                      fontSize:11, color:DS.text2 }}>{r.title}</td>
                                    <td style={{ padding:"8px 10px" }}><SevBadge sev={r.sev}/></td>
                                    <td style={{ padding:"8px 10px", fontFamily:DS.mono,
                                      fontSize:12, fontWeight:700, color:DS.med }}>{r.alerts}</td>
                                    <td style={{ padding:"8px 10px", fontFamily:DS.mono,
                                      fontSize:10, color:DS.text3 }}>{r.time}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Modal footer */}
                    <div style={{ padding:"14px 20px", borderTop:`1px solid ${DS.border}`,
                      display:"flex", justifyContent:"space-between", alignItems:"center",
                      flexShrink:0, background:DS.bg3, borderRadius:"0 0 12px 12px" }}>
                      <Btn variant="ghost" icon="chevL" onClick={()=>setModal(false)}>
                        Quay lại chỉnh sửa
                      </Btn>
                      <Btn variant="primary" icon="check"
                        onClick={()=>{ setModal(false); handleSave(); }}>
                        {editing?"Lưu thay đổi":"Tạo Rule"}
                      </Btn>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
