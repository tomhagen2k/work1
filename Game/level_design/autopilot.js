// Người chơi tự động để kiểm chứng thời gian trong demo (dán vào console của demo/index.html).
// runPlan(levelIndex, vehicleKey, plan) — plan: [{zone:'KhoA', picks:['Sieu','Hoa']}, {zone:'Hoa'}, ...]
function runPlan(li, vk, plan, maxSec = 400, naive = false) {
  VK = vk; openLevel(li); VK = vk; reset(); startGame(true); // không chạy đoạn mở màn (T-03)
  if (G.state === 'wait') G.state = 'play'; // chờ xuất phát: coi như bấm hướng đầu xe ngay tại 0:00
  G.tut = null; // không chạy hướng dẫn tương tác Màn 1
  // naive: chọn đường theo độ dài (bỏ qua loại đường)
  const edgeT = (u, w) => { const e = getE(u, w); const f = factor(e); return f == null ? null : SP / (V().v * (naive ? 1 : f)); };
  const zoneOf = id => ZONES.find(z => z.id === id);
  // Dijkstra trên trạng thái có hướng (nút, nút vừa rời) → thời gian tới vùng đỗ mục tiêu
  function costTo(n0, prev0, z) {
    const key = (n, p) => n + '<' + p, dist = { [key(n0, prev0)]: 0 }, pq = [[0, n0, prev0]];
    let best = Infinity;
    while (pq.length) {
      pq.sort((a, b) => a[0] - b[0]); const [d, n, p] = pq.shift();
      if (d > dist[key(n, p)] + 1e-9) continue;
      for (const nb of nbrs(n)) {
        const t = edgeT(n, nb); if (t == null) continue;
        const extra = nb === p ? V().ut : 0;
        if ((n === z.a && nb === z.b) || (n === z.b && nb === z.a)) {
          const pos = n === z.a ? (z.d1 + 5) : SP - (z.d2 - 5);
          best = Math.min(best, d + extra + t * pos / SP);
        }
        const nd = d + extra + t;
        if (nd < (dist[key(nb, n)] ?? Infinity)) { dist[key(nb, n)] = nd; pq.push([nd, nb, n]); }
      }
    }
    return best;
  }
  let k = 0, guard = 0;
  const log = [];
  while (!['won', 'lost'].includes(G.state) && guard++ < maxSec * 60) {
    const c = G.car, tgt = plan[k] ? zoneOf(plan[k].zone) : null;
    if (G.state === 'ask') {
      const here = G.ask.z.id;
      if (tgt && here === tgt.id && plan[k].picks && plan[k].picks.length) {
        const want = PLACE[plan[k].picks[0]];
        const i = G.ask.ch.findIndex(a => a.ok !== false && a.label.endsWith(want));
        if (i >= 0) { plan[k].picks.shift(); askChoose(i); } else { plan[k].picks.shift(); }
      } else { if (tgt && here === tgt.id) { log.push([+G.t.toFixed(1), here]); k++; } askSkip(); }
      continue;
    }
    if (tgt && !c.busy) {
      const z = curZone();
      const doneHere = z && z.id === tgt.id && !hasWork(z) && (!plan[k].picks || !plan[k].picks.length);
      if (doneHere) { log.push([+G.t.toFixed(1), z.id]); k++; continue; }
      const onE = (c.from === tgt.a && c.to === tgt.b) || (c.from === tgt.b && c.to === tgt.a);
      const ahead = onE && c.d < (c.from === tgt.a ? tgt.d1 : SP - tgt.d2);
      if (!ahead && !c.wait) {
        // so sánh đi tiếp và quay đầu
        const sp = naive ? V().v : speed();
        const fwd = (SP - c.d) / sp + costTo(c.to, c.from, tgt);
        const back = V().ut + c.d / sp + costTo(c.from, c.to, tgt);
        if (back + 0.05 < fwd && !(z && z.id === tgt.id)) { cUturn(); }
      }
      const v = validDirs();
      if (Object.keys(v).length) {
        let bestDir = null, bestC = Infinity;
        for (const [dir, nb] of Object.entries(v)) {
          const t = edgeT(c.to, nb); let cc;
          if ((c.to === tgt.a && nb === tgt.b) || (c.to === tgt.b && nb === tgt.a)) cc = t * 0.4;
          else cc = t + costTo(nb, c.to, tgt);
          if (cc < bestC) { bestC = cc; bestDir = dir; }
        }
        const hd = heading(c.from, c.to);
        if (c.wait) cTurn(bestDir);
        else if (bestDir === hd) { if (c.cmd) c.cmd = null; }
        else if (c.cmd !== bestDir) c.cmd = bestDir;
      }
    }
    step(1 / 60);
  }
  return { level: li + 1, veh: vk, state: G.state, t: +G.t.toFixed(1), T0: LV.T0, log };
}
