/* PropTools EN/中文 language switch.
   Walks static text nodes and swaps any whose English text is in DICT.
   Units/abbreviations (Isp, Δv, N·s, kg/m³…) are intentionally left as symbols.
   Long SEO articles and dynamically-generated results use t()/en-only/zh-only. */
(function(){
  const DICT = {
    // ---- page titles (h1) ----
    "🧾 Satellite Δv Budget Calculator":"🧾 卫星 Δv 预算计算器",
    "⚖️ Propellant Mass Calculator":"⚖️ 推进剂质量计算器",
    "🔥 Chemical Thruster Burn Calculator":"🔥 化学推力器点火计算器",
    "⚡ Electric Propulsion Power & Thrust Calculator":"⚡ 电推进功率与推力计算器",
    "🫙 Propellant Tank Sizing Calculator":"🫙 推进剂贮箱容积计算器",
    "🏗️ Satellite Mass Budget Calculator":"🏗️ 卫星总体质量预算计算器",
    "📚 Propellants & Typical Δv Reference":"📚 推进剂与典型 Δv 速查",
    // ---- subtitles ----
    "Itemized mission Δv · margin · the sizing input for propellant & tanks":"逐项任务 Δv · 余量 · 推进剂与贮箱的设计输入",
    "Tsiolkovsky rocket equation · propellant from Δv, Isp and dry/wet mass":"齐奥尔科夫斯基火箭方程 · 由 Δv、Isp 与干/湿重求推进剂",
    "Burn time · propellant · mass flow · total impulse · finite-burn arc check":"点火时间 · 推进剂 · 质量流量 · 总冲 · 有限点火弧段检查",
    "Thrust ↔ power with efficiency · propellant & thrusting days for a Δv · EPS power demand":"推力 ↔ 功率（含效率）· 完成 Δv 的推进剂与点火天数 · 电源功率需求",
    "Tank volume with ullage · spherical diameter · tank mass estimate":"含气垫贮箱容积 · 球罐直径 · 贮箱质量估算",
    "Payload → dry mass via SMAD fractions · subsystem allocation · margin · wet mass & launch check":"载荷 → SMAD 比例推干重 · 分系统分配 · 余量 · 湿重与运载校核",
    "Propellant Isp & density · thruster classes · typical mission Δv · SMAD mass fractions":"推进剂 Isp 与密度 · 推力器档位 · 典型任务 Δv · SMAD 质量比例",
    // ---- section titles ----
    "Inputs":"输入","Results":"结果","📖 How to use":"📖 使用说明",
    "Δv Items":"Δv 项目","Margin":"余量","Thruster":"推力器","Mission Segment":"任务段",
    "Sizing Inputs":"设计输入","Subsystem Allocation (% of dry)":"分系统分配（占干重 %）",
    "Propulsion Technologies":"推进技术","Propellant Storage Densities":"推进剂贮存密度",
    "Typical Mission Δv":"典型任务 Δv","SMAD Dry-Mass Fractions":"SMAD 干重比例",
    // ---- article headings ----
    "Typical mission Δv values":"典型任务 Δv 取值",
    "The rocket equation":"火箭方程",
    "Burn relations":"点火关系式",
    "EP relations":"电推关系式",
    "Tank sizing relations":"贮箱设计关系式",
    "SMAD mass estimating":"SMAD 质量估算",
    // ---- input labels ----
    "Δv margin":"Δv 余量","Total Δv":"总 Δv","Propellant type":"推进剂类型",
    "Specific impulse Isp":"比冲 Isp","Known mass is":"已知质量为","Mass":"质量",
    "Spacecraft mass":"整星质量","Thrust":"推力","Specific impulse":"比冲",
    "Δv of this maneuver":"本次机动 Δv","Orbit period":"轨道周期",
    "Given":"已知条件","Input power":"输入功率","Required thrust":"所需推力",
    "Total efficiency":"总效率","Δv of this segment":"该任务段 Δv","Thrusting duty cycle":"点火占空比",
    "Propellant mass":"推进剂质量","Propellant":"推进剂","Storage density":"贮存密度",
    "Ullage / pressurant volume":"气垫/增压气容积","Number of tanks":"贮箱数量","Tank mass factor":"贮箱质量系数",
    "Payload mass":"载荷质量","Payload fraction of dry mass":"载荷占干重比例","System margin":"系统余量",
    "Launcher capacity":"运载能力",
    // ---- table headers / row labels ----
    "Maneuver":"机动项","Share":"占比","Subsystem":"分系统","Payload":"有效载荷",
    "Structure & mechanisms":"结构与机构","Power (EPS)":"电源","ADCS":"姿控","Thermal":"热控",
    "TT&C + C&DH":"测控+数管","Propulsion (dry)":"推进（干重）","Harness":"电缆网",
    // ---- select options ----
    "Cold gas N₂ (65 s)":"冷气 N₂（65 s）","Monoprop hydrazine (220 s)":"单组元肼（220 s）",
    "Green monoprop (240 s)":"绿色单组元（240 s）","Biprop MMH/NTO (310 s)":"双组元 MMH/NTO（310 s）",
    "Hall thruster Xe (1600 s)":"霍尔推力器 氙（1600 s）","Ion thruster Xe (3000 s)":"离子推力器 氙（3000 s）",
    "Custom (set below)":"自定义（在下方填写）",
    "Dry mass (end of mission)":"干重（寿命末期）","Wet mass (at separation)":"湿重（分离时）",
    "Input power → thrust":"给定功率 → 求推力","Required thrust → power":"给定推力 → 求功率",
    "Hydrazine (1004 kg/m³)":"肼（1004 kg/m³）","MMH (875 kg/m³)":"MMH（875 kg/m³）",
    "NTO (1440 kg/m³)":"NTO（1440 kg/m³）","Xenon @150 bar (1600 kg/m³)":"氙 @150 bar（1600 kg/m³）",
    "Krypton @150 bar (900 kg/m³)":"氪 @150 bar（900 kg/m³）","Butane liquid (580 kg/m³)":"液态丁烷（580 kg/m³）",
    "N₂ gas @300 bar (270 kg/m³)":"氮气 @300 bar（270 kg/m³）",
    // ---- hints ----
    "%, typ. 5–15 on the subtotal":"%，小计上常取 5–15",
    "m/s incl. margin (Δv Budget tool)":"m/s，含余量（Δv 预算工具）","sets Isp (editable)":"决定 Isp（可修改）",
    "s":"秒","kg":"kg","kg at start of burn":"kg，点火开始时","N":"N","m/s":"m/s",
    "min — for the burn-arc check":"分钟——用于弧段检查",
    "W at the PPU input":"W，PPU 输入端","mN":"mN","s — Hall 1200–2000, ion 2500–3500":"秒——霍尔 1200–2000，离子 2500–3500",
    "0–1, thruster×PPU, Hall ~0.45–0.55":"0–1，推力器×PPU，霍尔约 0.45–0.55",
    "%, thrust-on fraction (power, eclipses)":"%，点火时间占比（受功率、地影限制）",
    "kg incl. residuals (Propellant tool + 3%)":"kg，含残留（推进剂工具值 + 3%）",
    "sets storage density":"决定贮存密度","kg/m³ at storage conditions":"kg/m³，贮存条件下",
    "%, typ. 5–10 liquid, 25+ blowdown":"%，液路常 5–10，落压式 25 以上",
    "volume split equally":"容积均分","kg tank per kg propellant, liquid ~0.1, high-pressure ~0.5–1":"kg 箱/kg 推进剂，液体约 0.1，高压 0.5–1",
    "kg, the thing that earns the mission":"kg，任务的价值所在","%, SMAD typ. 25–32":"%，SMAD 常取 25–32",
    "% on dry mass, 15–25 early phase":"%（干重），方案早期 15–25",
    "kg, from the Propellant tool":"kg，来自推进剂工具","kg to your orbit (0 = skip check)":"kg，至目标轨道（0 = 跳过校核）",
    // ---- result metric labels ----
    "Subtotal":"小计","Total with margin":"含余量总计","Largest item":"最大项",
    "Exhaust velocity":"喷气速度","Mass ratio":"质量比","Dry mass":"干重","Wet mass":"湿重",
    "Propellant fraction":"推进剂比例",
    "Propellant used":"消耗推进剂","Mass flow":"质量流量","Burn time":"点火时间","Total impulse":"总冲",
    "Initial acceleration":"初始加速度","Burn arc":"点火弧段",
    "Power / thrust":"功率/推力","Propellant for Δv":"完成 Δv 推进剂","Thrust-on time":"点火累计时间",
    "Calendar time at duty":"按占空比历时",
    "Propellant volume":"推进剂容积","Tank volume (with ullage)":"贮箱容积（含气垫）",
    "Volume per tank":"单箱容积","Spherical diameter / tank":"单箱球径","Tank mass estimate":"贮箱质量估算",
    "Loaded system mass":"加注后系统质量",
    "Dry mass estimate":"干重估算","Dry with margin":"含余量干重","Wet (launch) mass":"湿重（发射质量）",
    "Allocation residual":"分配残差","Launch margin":"发射余量",
    // ---- preset buttons ----
    "LEO smallsat 5 yr":"LEO 小卫星 5 年","VLEO drag-compensated":"超低轨阻力补偿","GEO 15 yr":"GEO 15 年",
    "Clear table":"清空表格",
    "Smallsat hydrazine":"小卫星肼推进","Smallsat Hall EP":"小卫星霍尔电推","CubeSat cold gas":"立方星冷气",
    "GEO biprop insertion":"GEO 双组元入轨",
    "1 N hydrazine, deorbit":"1 N 肼·离轨","20 N biprop, transfer":"20 N 双组元·转移","50 mN cold gas":"50 mN 冷气",
    "300 W Hall, smallsat":"300 W 霍尔·小卫星","1.5 kW Hall, orbit raising":"1.5 kW 霍尔·抬轨",
    "Ion engine, GEO NSSK":"离子·GEO 南北位保","CubeSat 60 W EP":"立方星 60 W 电推",
    "15 kg hydrazine":"15 kg 肼","Xe for Hall EP":"霍尔电推氙气","GEO biprop pair":"GEO 双组元一对",
    "CubeSat butane":"立方星丁烷",
    "EO smallsat, 50 kg payload":"遥感小卫星·载荷 50 kg","Comms sat, 200 kg payload":"通信卫星·载荷 200 kg",
    "6U CubeSat, 4 kg payload":"6U 立方星·载荷 4 kg",
    // ---- gallery home ----
    "Satellite Propulsion & Mass Budget Tools":"卫星推进与总体预算工具",
    "Free browser-based calculators for spacecraft propulsion and system sizing — no signup, nothing uploaded.":"面向卫星推进与总体规模设计的免费在线计算器 — 免注册，数据不上传。",
    "Categories":"分类","All tools":"全部工具","← All tools":"← 全部工具",
    "Δv & Propellant":"Δv 与推进剂","Thrusters":"推力器","Tanks":"贮箱","System Budgets":"总体预算","Reference":"参考",
    "Δv Budget":"Δv 预算","Propellant Mass":"推进剂质量","Chemical Thruster":"化学推力器",
    "Electric Propulsion":"电推进","Tank Sizing":"贮箱容积","Mass Budget":"质量预算",
    "Propellants & Δv":"推进剂与 Δv",
    "No tools match your search.":"没有匹配的工具。",
    // ---- gallery card descriptions ----
    "Itemized mission Δv — injection, drag, station keeping, deorbit — with margin.":"逐项任务 Δv——入轨、阻力、位保、离轨——含余量。",
    "Tsiolkovsky rocket equation — propellant from Δv, Isp and dry/wet mass.":"齐奥尔科夫斯基火箭方程——由 Δv、Isp 与干/湿重求推进剂。",
    "Burn time, propellant, mass flow, total impulse and the finite-burn arc check.":"点火时间、推进剂、流量、总冲与有限点火弧段检查。",
    "Thrust ↔ power with efficiency, propellant and thrusting days — feeds the EPS budget.":"推力↔功率（含效率）、推进剂与点火天数——喂给电源预算。",
    "Volume with ullage, spherical diameter per tank and a tank mass estimate.":"含气垫容积、单箱球径与贮箱质量估算。",
    "Payload → dry mass via SMAD fractions, margin, propellant, launch-capacity check.":"载荷按 SMAD 比例推干重，含余量、推进剂与运载能力校核。",
    "Propellant Isp/density, thruster classes, typical mission Δv, SMAD mass fractions.":"推进剂 Isp/密度、推力器档位、典型任务 Δv、SMAD 质量比例。",
    // ---- footers ----
    "PropTools · Free satellite propulsion & mass budget calculators · Δv / propellant / tanks · runs entirely in your browser.":"PropTools · 免费卫星推进与总体预算计算器 · Δv / 推进剂 / 贮箱 · 完全在浏览器中运行。",
    "Free satellite Δv budget calculator · itemized with margin · nothing leaves your browser.":"免费卫星 Δv 预算计算器 · 逐项含余量 · 数据不上传。",
    "Free propellant mass calculator · Tsiolkovsky equation · nothing leaves your browser.":"免费推进剂质量计算器 · 火箭方程 · 数据不上传。",
    "Free chemical thruster burn calculator · time, flow, impulse · nothing leaves your browser.":"免费化学推力器点火计算器 · 时间、流量、总冲 · 数据不上传。",
    "Free electric propulsion calculator · thrust, power, thrusting time · nothing leaves your browser.":"免费电推进计算器 · 推力、功率、点火时间 · 数据不上传。",
    "Free propellant tank sizing calculator · volume, diameter, mass · nothing leaves your browser.":"免费贮箱容积计算器 · 容积、直径、质量 · 数据不上传。",
    "Free satellite mass budget calculator · SMAD fractions, margin, launch check · nothing leaves your browser.":"免费卫星质量预算计算器 · SMAD 比例、余量、运载校核 · 数据不上传。",
    "Spacecraft propulsion quick reference · propellants, thrusters, Δv · nothing leaves your browser.":"卫星推进速查 · 推进剂、推力器、Δv · 数据不上传。"
  };

  let nodes = [];
  function capture(){
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(n){
        if(!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = n.parentNode;
        const tag = p && p.nodeName;
        if(tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA') return NodeFilter.FILTER_REJECT;
        if(p && p.closest && p.closest('.topnav')) return NodeFilter.FILTER_REJECT; // keep nav as-is
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let n; while((n = w.nextNode())) nodes.push({ node:n, en:n.nodeValue });
  }
  // dynamic-content helpers used by each calculator's JS
  window.SATLANG = 'en';
  window.t = function(en, zh){ return (window.SATLANG === 'zh' && zh != null) ? zh : en; };
  const langCbs = [];
  window.onLang = function(cb){ langCbs.push(cb); };

  function applyLang(lang){
    window.SATLANG = (lang === 'zh') ? 'zh' : 'en';
    nodes.forEach(({node,en})=>{
      const key = en.trim();
      node.nodeValue = (lang === 'zh' && DICT[key]) ? en.replace(key, DICT[key]) : en;
    });
    document.querySelectorAll('[data-en]').forEach(el=>{
      const html = (lang === 'zh' && el.dataset.zh != null) ? el.dataset.zh : el.dataset.en;
      if(html != null) el.innerHTML = html;
    });
    document.querySelectorAll('[data-ph-en]').forEach(el=>{
      el.placeholder = (lang === 'zh' && el.dataset.phZh != null) ? el.dataset.phZh : el.dataset.phEn;
    });
    document.documentElement.lang = (lang === 'zh' ? 'zh-CN' : 'en');
    document.body.classList.toggle('lang-zh', lang === 'zh');
    document.body.classList.toggle('lang-en', lang !== 'zh');
    if(bEn && bZh){ bEn.classList.toggle('active', lang !== 'zh'); bZh.classList.toggle('active', lang === 'zh'); }
    try{ localStorage.setItem('proptools_lang', lang); }catch(e){}
    langCbs.forEach(cb=>{ try{ cb(lang); }catch(e){} });
  }
  let bEn, bZh;
  function initToggle(){
    const nav = document.querySelector('.topnav'); if(!nav) return;
    const box = document.createElement('div'); box.className = 'langtoggle';
    bEn = document.createElement('button'); bEn.type='button'; bEn.textContent='EN';
    bZh = document.createElement('button'); bZh.type='button'; bZh.textContent='中文';
    bEn.onclick = ()=>applyLang('en'); bZh.onclick = ()=>applyLang('zh');
    box.appendChild(bEn); box.appendChild(bZh); nav.appendChild(box);
  }
  document.addEventListener('DOMContentLoaded', function(){
    capture(); initToggle();
    let saved = 'en';
    const urlLang = new URLSearchParams(location.search).get('lang');
    if(urlLang === 'zh' || urlLang === 'en') saved = urlLang;
    else { try{ saved = localStorage.getItem('proptools_lang') || 'en'; }catch(e){} }
    applyLang(saved);
  });
})();
