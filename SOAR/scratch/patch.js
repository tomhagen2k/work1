const fs = require('fs');

const file = 'e:/work1/SOAR/soar-pull-sources.html';
let content = fs.readFileSync(file, 'utf-8');

// 1. App Modal logic
const appTarget = `{/* Content */}
        {view === 'list' ? (
          <ListView sources={sources} onRun={handleRun} onToggle={handleToggle} onEdit={openForm} />
        ) : (
          <FormWizard editData={sources.find(s=>s.id===editId)} onClose={closeForm} showToast={showToast} onSave={(data) => {
            if(editId) {
              setSources(sources.map(s => s.id === editId ? {...s, ...data} : s));
              showToast("Đã cập nhật nguồn thành công!");
            } else {
              setSources([...sources, { id: Date.now(), ...data, last_id: "-", last_sync: "-" }]);
              showToast("Đã tạo nguồn pull mới!");
            }
            closeForm();
          }} />
        )}`;

const appReplace = `{/* Content */}
        <ListView sources={sources} onRun={handleRun} onToggle={handleToggle} onEdit={openForm} />
      </div>

      {view === 'form' && (
        <div style={{ position:"fixed", inset:0, background:"rgba(15,23,42,0.85)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width: 1100, maxHeight:"90vh", overflow:"hidden", display:"flex", flexDirection:"column" }}>
            <FormWizard editData={sources.find(s=>s.id===editId)} onClose={closeForm} showToast={showToast} onSave={(data) => {
              if(editId) {
                setSources(sources.map(s => s.id === editId ? {...s, ...data} : s));
                showToast("Đã cập nhật nguồn thành công!");
              } else {
                setSources([...sources, { id: Date.now(), ...data, last_id: "-", last_sync: "-" }]);
                showToast("Đã tạo nguồn pull mới!");
              }
              closeForm();
            }} />
          </div>
        </div>
      )}`;

content = content.replace(appTarget, appReplace);

// 2. FormWizard Replacement
const wizardStart = `return (
    <div style={{ background:DS.bg1, borderRadius:8, border:\`1px solid \${DS.border}\`, boxShadow:"0 4px 6px rgba(0,0,0,.05)" }}>
      {/* Wizard Header */}
      <div style={{ padding:"20px 24px", borderBottom:\`1px solid \${DS.border}\`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <h2 style={{ margin:0, fontSize:18, fontWeight:600, color:DS.text }}>{editData ? "Chỉnh sửa Nguồn Pull" : "Tạo mới Nguồn Pull"}</h2>
        <Btn variant="ghost" icon="x" onClick={onClose} />
      </div>
      
      <div style={{ display:"flex", minHeight:400 }}>
        {/* Sidebar Steps */}
        <div style={{ width:220, borderRight:\`1px solid \${DS.border}\`, background:DS.bg3, padding:20 }}>
          {STPS.map(s => (
            <div key={s.n} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20, opacity: step===s.n?1:0.5 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", background: step===s.n?DS.accent:DS.border, color:step===s.n?"#fff":DS.text2, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:600, fontSize:12 }}>
                {step > s.n ? <IC n="check" s={14}/> : s.n}
              </div>
              <div style={{ fontSize:13, fontWeight:600, color:step===s.n?DS.accent:DS.text2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Form Area */}
        <div style={{ flex:1, padding:24 }}>`;

const wizardEnd = `</div>
      </div>
      
      {/* Wizard Footer */}
      <div style={{ padding:"16px 24px", borderTop:\`1px solid \${DS.border}\`, display:"flex", justifyContent:"space-between", background:DS.bg3, borderBottomLeftRadius:8, borderBottomRightRadius:8 }}>
        <Btn variant="ghost" onClick={step > 1 ? ()=>setStep(step-1) : onClose}>
          {step > 1 ? "Quay lại" : "Hủy"}
        </Btn>
        <Btn variant="primary" icon={step===3 ? "check" : "arrowR"} onClick={step===3 ? handleSave : nextStep}>
          {step === 3 ? (editData ? "Lưu thay đổi" : "Tạo nguồn Pull") : "Tiếp tục"}
        </Btn>
      </div>`;

let startIndex = content.indexOf(wizardStart);
let endIndex = content.indexOf(wizardEnd) + wizardEnd.length;

if(startIndex > -1 && endIndex > -1) {
  let oldWizard = content.substring(startIndex, endIndex);

  // Apply dark variants replacing
  let newWizard = oldWizard
    .replace(/<FormItem/g, '<DFormItem')
    .replace(/<\/FormItem>/g, '</DFormItem>')
    .replace(/<Input/g, '<DInput')
    .replace(/<Sel/g, '<DSel')
    .replace(/<Toggle/g, '<DToggle')
    .replace(/DS\.text/g, 'DDS.text')
    .replace(/DS\.bg4/g, 'DDS.bg4')
    .replace(/DS\.border2/g, 'DDS.border2')
    .replace(/DS\.border/g, 'DDS.border')
    .replace(/DS\.crit/g, 'DDS.crit')
    .replace(/DS\.accent/g, 'DDS.accent')
    .replace(/<Btn/g, '<DBtn');

  const newLayout = `
  const DDS = { bg1:"#0f172a", bg2:"#1e293b", bg3:"#1e293b", bg4:"#334155", border:"#334155", border2:"#475569", text:"#f8fafc", text2:"#cbd5e1", text3:"#94a3b8", text4:"#64748b", accent:"#1DA1F2", accentH:"#0ea5e9", crit:"#ef4444", high:"#f97316", med:"#f59e0b", low:"#22c55e", mono:DS.mono, sans:DS.sans };
  const DInput = (p) => <Input {...p} mono={p.mono} style={{...p.style, background:DDS.bg1, color:DDS.text, borderColor: p.error ? DDS.crit : DDS.border2}} />;
  const DSel = (p) => <Sel {...p} style={{...p.style, background:DDS.bg1, color:DDS.text, borderColor: p.error ? DDS.crit : DDS.border2, backgroundImage:\`url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23cbd5e1' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")\`}} />;
  const DFormItem = (p) => <div style={{ marginBottom: 16 }}><div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:6 }}><label style={{ fontSize:12, fontWeight:600, color:DDS.text2 }}>{p.label}</label>{p.req && <span style={{ color:DDS.crit }}>*</span>}</div>{p.children}{p.desc && <div style={{ fontSize:11, color:DDS.text4, marginTop:4 }}>{p.desc}</div>}</div>;
  const DToggle = ({ value, onChange }) => (
    <button onClick={()=>onChange(!value)} style={{ position:"relative", width:34, height:18, borderRadius:9, border:"none", cursor:"pointer", padding:0, flexShrink:0, background: value ? DDS.accent : DDS.border2, transition:"background .2s" }}>
      <span style={{ position:"absolute", top:2, left: value?18:2, width:14, height:14, borderRadius:7, background:"#fff", boxShadow:"0 1px 2px rgba(0,0,0,.2)", transition:"left .18s", display:"block" }}/>
    </button>
  );
  const DBtn = (p) => {
    let s = {};
    if(p.variant==='ghost') s = { color:DDS.text3 };
    if(p.variant==='secondary') s = { background:DDS.bg1, border:\`1px solid \${DDS.border}\`, color:DDS.text };
    if(p.variant==='primary') s = { background:DDS.accent, border:\`1px solid \${DDS.accent}\`, color:"#fff" };
    return <Btn {...p} style={{...s, ...p.style}} />;
  };

  return (
    <div style={{ background:DDS.bg2, borderRadius:12, border:\`1px solid \${DDS.border}\`, boxShadow:"0 10px 25px rgba(0,0,0,.5)", display:"flex", flexDirection:"column", height:"100%" }}>
      {/* Wizard Header - Blue */}
      <div style={{ padding:"16px 24px", background:DDS.accent, display:"flex", justifyContent:"space-between", alignItems:"center", borderTopLeftRadius:12, borderTopRightRadius:12 }}>
        <h2 style={{ margin:0, fontSize:16, fontWeight:600, color:"#fff" }}>{editData ? "Chỉnh sửa Nguồn Pull" : "Tạo Nguồn Pull"}</h2>
        <button onClick={onClose} style={{ background:"transparent", border:"none", color:"#fff", cursor:"pointer", padding:4 }}><IC n="x" s={18}/></button>
      </div>
      
      {/* Horizontal Stepper */}
      <div style={{ display:"flex", justifyContent:"space-between", padding:"24px 60px 20px", position:"relative", borderBottom:\`1px solid \${DDS.border}\`, background:DDS.bg1 }}>
        <div style={{ position:"absolute", top:39, left:100, right:100, height:2, background:DDS.border2, zIndex:0 }}></div>
        {STPS.map((s, i) => {
          const active = step >= s.n;
          return (
            <div key={s.n} style={{ display:"flex", flexDirection:"column", alignItems:"center", zIndex:1, gap:8, width:140 }}>
              <div style={{ width:32, height:32, borderRadius:16, background:active ? DDS.accent : DDS.bg4, color:active ? "#fff" : DDS.text2, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:13, border:\`2px solid \${DDS.bg1}\`, boxShadow:\`0 0 0 2px \${active ? DDS.accent : DDS.border}\` }}>
                {step > s.n ? <IC n="check" s={16}/> : s.n}
              </div>
              <div style={{ fontSize:12, fontWeight:600, color:active ? DDS.text : DDS.text3, textAlign:"center" }}>{s.l}</div>
            </div>
          )
        })}
      </div>

      {/* Form Area */}
      <div style={{ flex:1, padding:32, overflowY:"auto" }}>`;

  const newFooter = `</div>
      
      {/* Wizard Footer */}
      <div style={{ padding:"16px 24px", borderTop:\`1px solid \${DDS.border}\`, display:"flex", justifyContent:"space-between", background:DDS.bg1, borderBottomLeftRadius:12, borderBottomRightRadius:12 }}>
        <DBtn variant="ghost" onClick={step > 1 ? ()=>setStep(step-1) : onClose}>
          {step > 1 ? "Quay lại" : "Hủy"}
        </DBtn>
        <DBtn variant="primary" icon={step===3 ? "check" : "arrowR"} onClick={step===3 ? handleSave : nextStep}>
          {step === 3 ? (editData ? "Lưu thay đổi" : "Tạo nguồn Pull") : "Tiếp tục"}
        </DBtn>
      </div>
    </div>`;

  let innerForms = newWizard.substring(newWizard.indexOf('          {/* STEP 1 */}'), newWizard.lastIndexOf('</div>\n      </div>'));
  
  content = content.substring(0, startIndex) + newLayout + innerForms + newFooter + content.substring(endIndex);

  fs.writeFileSync(file, content, 'utf-8');
  console.log("Patched successfully");
} else {
  console.log("Could not find wizard start/end");
}
