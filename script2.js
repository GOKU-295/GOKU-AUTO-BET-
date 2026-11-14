(function(){
    if(document.getElementById('goku-app-root')) return;

    window.alert = function(msg) { console.log('GOKU Ignored Alert:', msg); };
    window.confirm = function(msg) { console.log('GOKU Auto-Confirmed:', msg); return true; };

    var HISTORY_API_BASE = "https://draw.ar-lottery02.com/K3/";

    initGokuApp();

    function initGokuApp(){
        var deviceId = window.goku_android_device_id || localStorage.getItem('goku_device_id');
        if (!deviceId || deviceId.indexOf('GOKU-') !== 0) { deviceId = 'GOKU-' + Math.random().toString(36).substring(2, 10).toUpperCase(); }
        localStorage.setItem('goku_device_id', deviceId); window.goku_current_device = deviceId;

        var root = document.createElement('div'); root.id = 'goku-app-root';
        var shadow = root.attachShadow({mode:'open'});

        var s = document.createElement('style');
        s.innerHTML = `
:host{all:initial;font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;-webkit-tap-highlight-color:transparent}
*{box-sizing:border-box;margin:0;padding:0;font-family:inherit}
button{-webkit-appearance:none;appearance:none;border:none;background:none;font-family:inherit;cursor:pointer}
#gk-pill,#gk-panel{user-select:none;-webkit-user-select:none;line-height:1.25;font-size:14px;color:#1f1b3a;text-align:left}

#gk-pill{position:fixed;top:120px;right:12px;z-index:2147483647;display:flex;align-items:center;gap:8px;background:linear-gradient(135deg,#fdecea,#efe6ff);border:1px solid #fff;color:#4c3fb0;padding:6px 14px 6px 6px;border-radius:30px;box-shadow:0 8px 24px rgba(76,63,176,.3);touch-action:none;cursor:pointer;font-size:12px;font-weight:800}
.gk-pdot{width:28px;height:28px;border-radius:50%;background:#7c6ee6;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px}
#gk-pill.on .gk-pdot{background:#059669;box-shadow:0 0 0 3px rgba(5,150,105,.3)}
#gk-pill-time{font-variant-numeric:tabular-nums}

#gk-panel{position:fixed;width:340px;max-width:94vw;max-height:94vh;z-index:2147483646;display:none;flex-direction:column;border-radius:34px;background:linear-gradient(160deg,#fbe6df 0%,#f6e6f4 38%,#efe6fb 70%,#fae7f1 100%);border:1.5px solid rgba(255,255,255,.95);box-shadow:0 0 0 1px rgba(124,110,230,.18),0 26px 60px rgba(60,40,140,.38);overflow:hidden}
.gk-head{display:flex;align-items:center;gap:12px;padding:14px 18px 12px;cursor:move;touch-action:none;border-bottom:1px solid rgba(124,110,230,.14)}
.gk-logo{width:40px;height:40px;border-radius:50%;background:#7c6ee6;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.gk-title{flex:1;font-size:19px;font-weight:900;color:#6d5bd0;letter-spacing:.3px}
.gk-eye{width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer}
.gk-scroll{overflow-y:auto;padding:14px 12px 14px;scrollbar-width:none}
.gk-scroll::-webkit-scrollbar{display:none}

.gk-card{background:rgba(255,255,255,.38);border:1.5px solid #d9d0f6;border-radius:28px;padding:14px 18px;margin-bottom:12px}
.gk-lbl{font-size:11.5px;font-weight:800;letter-spacing:1.4px;color:#5f5a7a;text-transform:uppercase}
.gk-hr{height:1px;background:#dcd5f1;margin:11px 0}
.gk-two{display:flex;justify-content:space-between;align-items:center}
.gk-r{text-align:right}
#goku-period{font-size:11px;font-weight:800;color:#6d5bd0;letter-spacing:.3px}
#goku-pred{font-size:26px;font-weight:900;color:#6d5bd0;margin-top:4px;white-space:nowrap;display:flex;align-items:center;gap:6px;line-height:1.1}
#goku-pred svg{flex-shrink:0}
#goku-pred small{font-size:inherit}
.gk-time{display:flex;align-items:center;justify-content:flex-end;gap:7px;font-size:32px;font-weight:900;color:#1a1740;margin-top:2px;font-variant-numeric:tabular-nums;line-height:1.1}
#gk-last{font-size:18px;font-weight:900;color:#6b6585}
.gk-three{display:flex;align-items:center;justify-content:space-between;font-size:12px;font-weight:600;color:#6b6585;gap:6px}
.gk-badge{background:#f9cfd2;color:#b91c1c;border-radius:10px;padding:4px 11px;font-size:11px;font-weight:900;letter-spacing:.6px;white-space:nowrap}
.gk-badge.mid{background:#fde9c4;color:#a16207}
.gk-badge.good{background:#c9f2df;color:#047857}

.gk-core{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.88);border-radius:14px;padding:9px 12px;margin-bottom:12px;font-size:13px;font-weight:800;color:#3f3a56;flex-wrap:wrap}
.goku-status-dot{width:12px;height:12px;border-radius:50%;background:#ef4444;flex-shrink:0}
.goku-status-bar.active .goku-status-dot{background:#10b981}
.gk-chip{font-size:11px;font-weight:800;padding:3px 10px;border-radius:8px;letter-spacing:.4px;background:#fdebd0;color:#c2410c;white-space:nowrap}
.gk-chip.g{background:#d5f3e6;color:#047857}
#goku-status-bar.active #goku-status-txt{background:#d5f3e6;color:#047857}
.goku-history-wrap{display:flex;gap:3px;margin-left:auto}
.goku-ball{width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:900;color:#fff}
.b-odd{background:#16a34a}.b-even{background:#dc2626}.b-mix{background:linear-gradient(135deg,#8b5cf6 50%,#dc2626 50%)}.b-mix5{background:linear-gradient(135deg,#8b5cf6 50%,#16a34a 50%)}

.gk-stats{display:grid;grid-template-columns:repeat(4,1fr);background:rgba(255,255,255,.88);border:1px solid #e8e2f8;border-radius:18px;padding:10px 0;margin-bottom:12px;text-align:center}
.gk-st{border-right:1px solid #ebe6f7}
.gk-st:last-child{border-right:none}
.gk-st small{display:block;font-size:11px;font-weight:800;color:#4b4666}
.gk-st b{display:block;font-size:17px;font-weight:900;color:#1a1740;margin-top:3px}
.val-g{color:#059669!important}.val-r{color:#dc2626!important}

.gk-bal{display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.88);border:1px solid #e8e2f8;border-radius:18px;padding:13px 14px;margin-bottom:12px;font-size:14px;font-weight:700;color:#6b6585}
.gk-bal .l{display:flex;align-items:center;gap:9px}
.gk-bal .r{display:flex;align-items:center;gap:10px;cursor:pointer}
#goku-bal-val{font-size:18px;font-weight:900;color:#1a1740}

.gk-ctl{display:flex;gap:8px;align-items:stretch;margin-bottom:12px;height:46px}
.goku-tab-btn{padding:0 13px;border-radius:13px;background:rgba(255,255,255,.85);border:1.5px solid #e6defa;color:#6d5bd0;font-weight:800;font-size:14px}
.goku-tab-btn.active{background:#7c6ee6;border-color:#7c6ee6;color:#fff}
#goku-bot-btn{flex:1;border-radius:14px;background:linear-gradient(135deg,#7c6ee6,#a99bf5);color:#fff;font-size:15px;font-weight:800;letter-spacing:.6px;display:flex;align-items:center;justify-content:center;gap:9px}
#goku-bot-btn::before{content:"";width:0;height:0;border-left:11px solid #fff;border-top:6.5px solid transparent;border-bottom:6.5px solid transparent;display:inline-block;margin-right:8px}
#goku-bot-btn.running{background:linear-gradient(135deg,#ef4444,#f87171)}
#goku-bot-btn.running::before{width:10px;height:10px;border:none;background:#fff;border-radius:2px}
#gk-stop{width:46px;border-radius:13px;background:rgba(253,228,226,.9);border:1.5px solid #f6cfcb;display:flex;align-items:center;justify-content:center}
#gk-stop i{display:block;width:14px;height:14px;border-radius:3px;background:#e5908a}

#gk-settog{width:100%;height:48px;border-radius:16px;border:1.5px dashed #cfc3f3;background:rgba(255,255,255,.28);color:#6d5bd0;font-weight:800;font-size:15px;display:flex;align-items:center;justify-content:center;gap:10px}
#gk-settog .chev{width:8px;height:8px;border-right:2.2px solid #7c6ee6;border-bottom:2.2px solid #7c6ee6;transform:rotate(45deg);margin-top:-4px;transition:.2s}
#gk-settog.open .chev{transform:rotate(-135deg);margin-top:4px}
#gk-setbox{display:none;margin-top:12px}

.gk-srv{display:flex;gap:6px}
.goku-s-btn{flex:1;padding:9px 0;border-radius:12px;background:rgba(255,255,255,.7);border:1.5px solid #e6defa;color:#6b6585;font-weight:800;font-size:12px}
.goku-s-btn.active{background:#ede9fe;border-color:#7c6ee6;color:#6d5bd0}

.gk-grp{font-size:10.5px;font-weight:800;letter-spacing:1.3px;color:#6d5bd0;margin:14px 0 7px}
.gk-grp:first-child{margin-top:2px}
.gk-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.gk-fld{background:rgba(255,255,255,.8);border:1px solid #e8e2f8;border-radius:14px;padding:9px 10px}
.gk-fld label{display:block;font-size:10px;font-weight:700;color:#6b6585;margin-bottom:6px}
.gk-stp{display:flex;align-items:center;gap:4px}
.gk-stp b{width:28px;height:30px;border-radius:9px;background:#ede9fe;color:#6d5bd0;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:900;cursor:pointer;flex-shrink:0}
.gk-in{width:100%;min-width:0;background:transparent;border:none;border-bottom:1.5px solid #cdbff5;color:#1a1740;text-align:center;font-size:15px;font-weight:900;padding:4px 0;outline:none;user-select:text;-webkit-user-select:text}
.gk-in:focus{border-color:#7c6ee6}
.gk-tg{display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.8);border:1px solid #e8e2f8;border-radius:14px;padding:11px 12px;margin-bottom:8px}
.gk-tg div{font-size:12px;font-weight:700;color:#1a1740}
.gk-tg small{display:block;font-size:9.5px;font-weight:600;color:#7a7494;margin-top:2px}
.gk-sw{position:relative;width:44px;height:24px;flex-shrink:0}
.gk-sw input{opacity:0;width:0;height:0;position:absolute}
.gk-sw span{position:absolute;inset:0;background:#d4cdee;border-radius:24px;transition:.2s}
.gk-sw span:before{content:"";position:absolute;width:18px;height:18px;left:3px;top:3px;border-radius:50%;background:#fff;transition:.2s}
.gk-sw input:checked + span{background:#7c6ee6}
.gk-sw input:checked + span:before{transform:translateX(20px)}
.gk-save{width:100%;margin-top:10px;background:linear-gradient(135deg,#7c6ee6,#a99bf5);color:#fff;border-radius:14px;padding:13px 0;font-size:14px;font-weight:800;letter-spacing:1.2px}
.gk-reset{width:100%;margin-top:8px;border:1.5px solid #f6cfcb;color:#dc2626;border-radius:14px;padding:11px 0;font-size:12px;font-weight:800}
.gk-log{display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,.8);border-radius:12px;padding:9px 12px;margin-bottom:6px;border-left:3px solid #fbbf24;font-size:11px;font-weight:700;color:#6b6585}
.gk-log.win{border-left-color:#10b981}.gk-log.loss{border-left-color:#ef4444}
.gk-log b{color:#1a1740}
.gk-log em{font-style:normal;font-weight:900;color:#b45309}
.gk-log.win em{color:#059669}.gk-log.loss em{color:#dc2626}
.gk-empty{text-align:center;color:#7a7494;font-size:12px;font-weight:600;padding:16px 0}

.gk-toast{position:fixed;left:50%;transform:translateX(-50%);background:#fff;border:1.5px solid #ddd2fb;border-radius:16px;padding:12px 16px;z-index:2147483651;display:flex;align-items:center;gap:10px;color:#1a1740;pointer-events:none;animation:gk-t 3.4s ease forwards;min-width:200px;box-shadow:0 10px 30px rgba(60,40,140,.25)}
.gk-toast .ic{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;background:#7c6ee6;color:#fff}
.gk-toast.win{border-color:#10b981}.gk-toast.win .ic{background:#10b981}
.gk-toast.loss{border-color:#ef4444}.gk-toast.loss .ic{background:#ef4444}
.gk-toast .t{font-size:12px;font-weight:900;letter-spacing:1px}
.gk-toast .d{font-size:12px;color:#6b6585}
@keyframes gk-t{0%{top:-70px;opacity:0}12%{top:18px;opacity:1}88%{top:18px;opacity:1}100%{top:-70px;opacity:0}}
#goku-parity-pred{font-size:18px;font-weight:900;color:#7c3aed;margin-top:2px;white-space:nowrap;display:flex;align-items:center;gap:6px;line-height:1.1}
#goku-parity-pred small{font-size:13px;font-weight:800;opacity:.75}
#gk-last{font-size:18px;font-weight:900;color:#6b6585;display:inline-flex;align-items:center}
.gk-chip.mode{background:#ede9fe;color:#6d5bd0}
.goku-mbtn{flex:1;padding:11px 0;border-radius:13px;background:rgba(255,255,255,.7);border:1.5px solid #e6defa;color:#6b6585;font-weight:900;font-size:12px;letter-spacing:.6px}
.goku-mbtn.active{background:linear-gradient(135deg,#7c6ee6,#a99bf5);border-color:#7c6ee6;color:#fff}
.gk-log.fail{border-left-color:#94a3b8;opacity:.7}
.gk-log.fail em{color:#64748b}
.gk-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:2147483650;display:none;align-items:center;justify-content:center;opacity:0;transition:opacity 0.2s;backdrop-filter:blur(3px)}
.gk-modal-overlay.show{display:flex;opacity:1}
.gk-modal{background:linear-gradient(160deg,#fbe6df 0%,#f6e6f4 38%,#efe6fb 70%,#fae7f1 100%);border-radius:28px;padding:22px 20px;width:300px;max-width:90vw;box-shadow:0 10px 40px rgba(60,40,140,0.4);border:1.5px solid #fff;text-align:center;transform:scale(0.9);transition:transform 0.2s}
.gk-modal-overlay.show .gk-modal{transform:scale(1)}
.gk-modal-title{font-size:18px;font-weight:900;color:#6d5bd0;margin-bottom:12px;letter-spacing:0.5px}
.gk-modal-body{font-size:14px;color:#1a1740;margin-bottom:20px;line-height:1.5;font-weight:600}
.gk-modal-btn{width:100%;padding:13px;border-radius:14px;background:linear-gradient(135deg,#7c6ee6,#a99bf5);color:#fff;font-size:15px;font-weight:800;letter-spacing:0.5px;box-shadow:0 4px 12px rgba(124,110,230,0.3)}
`;
        shadow.appendChild(s);

        function stepper(id, label, step, min){
            return '<div class="gk-fld"><label>' + label + '</label><div class="gk-stp"><b data-t="' + id + '" data-d="-1">&minus;</b><input class="gk-in" id="' + id + '" type="number" inputmode="decimal" step="' + step + '" min="' + min + '"><b data-t="' + id + '" data-d="1">+</b></div></div>';
        }

        var gkTpl = document.createElement('div'); gkTpl.innerHTML = `
<div id="gk-pill">
    <div class="gk-pdot">G</div>
    <div id="gk-pill-pred">GOKU</div>
    <div id="gk-pill-time">00:00</div>
    <div id="gk-pill-pl">+₹0.00</div>
</div>

<div id="gk-panel">
    <div class="gk-head" id="gk-move">
        <div class="gk-logo"><svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l2.4 6.6L21 9l-5 4.4L17.5 20 12 16.5 6.5 20 8 13.4 3 9l6.6-.4z"/></svg></div>
        <div class="gk-title">GOKU MODS</div>
        <div class="gk-eye" id="gk-hide"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7c6ee6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg></div>
    </div>

    <div class="gk-scroll">
        <div class="gk-card">
            <div class="gk-two"><span class="gk-lbl">Active Period</span><span id="goku-period">...SYNCING</span></div>
            <div class="gk-hr"></div>
            <div class="gk-two">
                <div><div class="gk-lbl">Size Prediction</div><div id="goku-pred">WAITING...</div></div>
                <div class="gk-r"><div class="gk-lbl">Time Remaining</div>
                    <div class="gk-time"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c6ee6" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/></svg><span id="goku-time">00:00</span></div>
                </div>
            </div>
            <div class="gk-hr"></div>
            <div class="gk-two">
                <div><div class="gk-lbl">Parity Prediction</div><div id="goku-parity-pred">--</div></div>
                <div class="gk-r"><div class="gk-lbl">Last Parity</div><span id="gk-last">--</span></div>
            </div>
            <div class="gk-hr"></div>
            <div class="gk-three"><span id="goku-acc">Confidence: --%</span><span class="gk-badge mid" id="gk-badge">WAIT</span><span id="goku-server-lbl">S1</span></div>
        </div>

        <div class="gk-core goku-status-bar" id="goku-status-bar">
            <div class="goku-status-dot"></div>
            <span>GOKU CORE:</span>
            <span class="gk-chip" id="goku-status-txt">STOPPED</span>
            <span class="gk-chip g" id="goku-level">LVL: 1</span>
            <span class="gk-chip mode" id="goku-mode-lbl">AUTO</span>
        </div>

        <div class="gk-stats">
            <div class="gk-st"><small>TOTAL</small><b id="st-tot">0</b></div>
            <div class="gk-st"><small>WINS</small><b class="val-g" id="st-win">0</b></div>
            <div class="gk-st"><small>LOSSES</small><b class="val-r" id="st-los">0</b></div>
            <div class="gk-st"><small>PROFIT</small><b class="val-g" id="st-pro">+₹0.00</b></div>
        </div>

        <div class="gk-bal">
            <span class="l"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b6585" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="15" rx="3"/><path d="M2 9h20M16 14h3"/></svg>Balance:</span>
            <span class="r" id="gk-baleye"><b id="goku-bal-val">Scanning...</b><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c6ee6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></span>
        </div>

        <div class="gk-srv" style="margin-bottom:12px">
            <button class="goku-mbtn active" data-m="AUTO">AUTO</button>
            <button class="goku-mbtn" data-m="SIZE">SIZE</button>
            <button class="goku-mbtn" data-m="PARITY">ODD/EVEN</button>
        </div>

        <div class="gk-ctl">
            <button class="goku-tab-btn active" data-api="K3_1M" data-sec="60" style="flex:1;">K3 1 Min</button>
            <button id="goku-bot-btn">START</button>
            <button id="gk-stop"><i></i></button>
        </div>

        <button id="gk-settog"><span class="chev"></span>Settings</button>

        <div id="gk-setbox">
            <div class="gk-grp">ACTIVE SERVER</div>
            <div class="gk-srv">
                <button class="goku-s-btn active" data-srv="1">SERVER 1</button>
                <button class="goku-s-btn" data-srv="2">SERVER 2</button>
                <button class="goku-s-btn" data-srv="3">SERVER 3</button>
            </div>

            <div class="gk-grp">TARGETS</div>
            <div class="gk-tg"><div>Profit / Loss Limit<small>Auto stop on target</small></div><label class="gk-sw"><input type="checkbox" id="set-pl-on"><span></span></label></div>
            <div class="gk-grid">
                ${stepper('set-profit','Set Profit',50,1)}
                ${stepper('set-loss','Stop Loss',50,1)}
            </div>

            <div class="gk-grp">BET SETUP</div>
            <div class="gk-grid">
                ${stepper('set-bet','Set Bet',1,1)}
                ${stepper('set-level','Set Level (Step)',1,1)}
                ${stepper('set-mult','Multiplier / Loss',0.5,1)}
                ${stepper('set-maxbet','Max Bet (0=off)',10,0)}
            </div>

            <div class="gk-grp">SAFETY</div>
            <div class="gk-tg"><div>Balance Check<small>Stop bot on low balance</small></div><label class="gk-sw"><input type="checkbox" id="set-bal-on"><span></span></label></div>
            <div class="gk-tg"><div>Loss Streak Cooldown<small>Pause after loss streak</small></div><label class="gk-sw"><input type="checkbox" id="set-cd-on"><span></span></label></div>
            <div class="gk-grid">
                ${stepper('set-cd-streak','After X Losses',1,1)}
                ${stepper('set-cd-rounds','Pause Rounds',1,1)}
            </div>

            <button class="gk-save" id="set-save">SAVE SETTINGS</button>

            <div class="gk-grp">BET LOG (LAST 20)</div>
            <div id="goku-log-box"></div>
            <button class="gk-reset" id="set-reset">RESET STATS</button>
        </div>
    </div>
</div>

<div class="gk-modal-overlay" id="gk-modal">
    <div class="gk-modal">
        <div class="gk-modal-title" id="gk-modal-title">TITLE</div>
        <div class="gk-modal-body" id="gk-modal-body">Message</div>
        <button class="gk-modal-btn" id="gk-modal-btn">OK</button>
    </div>
</div>
`;
        while(gkTpl.firstChild){ shadow.appendChild(gkTpl.firstChild); }
        document.body.appendChild(root);

        function $(id){ return shadow.getElementById(id); }
        var pill = $('gk-pill'), panel = $('gk-panel');

        var isBotRunning = false;
        var fixedBaseBet = 50;
        var maxLevelsAllowed = 5;
        var martingaleMultiplier = 2.5;
        var maxBetLimit = 0;
        var balCheckEnabled = true;
        var cdEnabled = true;
        var cdStreak = 8;
        var cdRounds = 1;
        var plProfitTarget = 50000000;
        var plLossTarget = 20000008;

        var currentLevel = 0, currentBalance = 0, betLevelsArray = [];
        var currentApiMode = "K3_1M", maxSeconds = 60, timerWorker;
        var latestHistoryData = [];
        var currentPredictionObj = null;
        var stats = { total: 0, wins: 0, losses: 0, profit: 0.0, currentStreak: 0, bestWinStreak: 0, worstLossStreak: 0 };
        var predictionLogs = [];
        var plEnabled = true;
        var plStopped = false;

        var lossRun = 0, cooldownLeft = 0;
        var betMode = 'AUTO';
        var activeBetMode = 'SIZE';
        var activeServer = 1;
        var isBetPlacing = false;
        var betStartedAt = 0;
        var lastBetAttemptAt = 0;

        var lastBetPlacedPeriod = "";
        var lastUiPeriod = "";
        var lastPeriodFetched = "";
        var predictedForPeriod = "";
        var betRetryPeriod = "";
        var betRetryCount = 0;
        var isFetching = false;

        try {
            var saved = JSON.parse(localStorage.getItem('goku_settings') || 'null');
            if(saved){
                if(typeof saved.plEnabled === 'boolean') plEnabled = saved.plEnabled;
                if(saved.plProfitTarget > 0) plProfitTarget = saved.plProfitTarget;
                if(saved.plLossTarget > 0) plLossTarget = saved.plLossTarget;
                if(saved.fixedBaseBet > 0) fixedBaseBet = saved.fixedBaseBet;
                if(saved.maxLevelsAllowed > 0) maxLevelsAllowed = saved.maxLevelsAllowed;
                if(saved.martingaleMultiplier > 0) martingaleMultiplier = saved.martingaleMultiplier;
                if(saved.maxBetLimit >= 0) maxBetLimit = saved.maxBetLimit;
                if(typeof saved.balCheckEnabled === 'boolean') balCheckEnabled = saved.balCheckEnabled;
                if(typeof saved.cdEnabled === 'boolean') cdEnabled = saved.cdEnabled;
                if(saved.cdStreak > 0) cdStreak = saved.cdStreak;
                if(saved.cdRounds > 0) cdRounds = saved.cdRounds;
                if(saved.betMode === 'PARITY' || saved.betMode === 'SIZE' || saved.betMode === 'AUTO') betMode = saved.betMode;
                if(saved.activeServer >= 1 && saved.activeServer <= 3) activeServer = saved.activeServer;
            }
        } catch(e) {}

        var balHidden = false;

        // ---------- helpers ----------
        function isVisible(el){ return !!el && el.getClientRects().length > 0; }
        function secondsLeftNow(){ return 60 - new Date().getSeconds(); }
        function pad2(n){ return String(n).padStart(2, '0'); }
        function getUiPeriod(){
            var el = document.querySelector('.K3TL__C-l2 .periodNo');
            return el ? String(el.innerText || '').replace(/\D/g, '') : '';
        }

        function showGokuModal(title, bodyHtml, btnText, callback) {
            $('gk-modal-title').innerText = title;
            $('gk-modal-body').innerHTML = bodyHtml;
            $('gk-modal-btn').innerText = btnText;
            $('gk-modal').classList.add('show');
            $('gk-modal-btn').onclick = function() {
                $('gk-modal').classList.remove('show');
                if(callback) callback();
            };
        }

        function clampPanel(){
            var w = panel.offsetWidth, h = panel.offsetHeight;
            var l = parseFloat(panel.style.left) || 0, t = parseFloat(panel.style.top) || 0;
            panel.style.left = Math.max(4, Math.min(window.innerWidth - w - 4, l)) + 'px';
            panel.style.top = Math.max(4, Math.min(window.innerHeight - h - 4, t)) + 'px';
        }
        function openPanel(){
            panel.style.display = 'flex'; pill.style.display = 'none';
            if(!panel.getAttribute('data-placed')){
                panel.style.left = Math.max(4, (window.innerWidth - panel.offsetWidth) / 2) + 'px';
                panel.style.top = Math.max(4, (window.innerHeight - panel.offsetHeight) / 2) + 'px';
                panel.setAttribute('data-placed', '1');
            }
            clampPanel();
        }
        function minimizePanel(){ panel.style.display = 'none'; pill.style.display = 'flex'; }
        $('gk-hide').onclick = minimizePanel;

        function makeDraggable(el, handle, onTap){
            var sx=0, sy=0, ox=0, oy=0, moved=false, down=false;
            function start(x,y){ down=true; moved=false; sx=x; sy=y; var r=el.getBoundingClientRect(); ox=r.left; oy=r.top; }
            function move(x,y){
                if(!down) return;
                if(Math.abs(x-sx)>6 || Math.abs(y-sy)>6) moved=true;
                if(!moved) return;
                el.style.left = Math.max(0, Math.min(window.innerWidth - el.offsetWidth, ox + x - sx)) + 'px';
                el.style.top = Math.max(0, Math.min(window.innerHeight - el.offsetHeight, oy + y - sy)) + 'px';
                el.style.right = 'auto';
            }
            function end(){ if(down && !moved && onTap) onTap(); down=false; }
            handle.addEventListener('touchstart', function(e){ start(e.touches[0].clientX, e.touches[0].clientY); }, {passive:true});
            handle.addEventListener('touchmove', function(e){ move(e.touches[0].clientX, e.touches[0].clientY); }, {passive:true});
            handle.addEventListener('touchend', end);
            handle.addEventListener('mousedown', function(e){ start(e.clientX, e.clientY); document.onmousemove=function(ev){ move(ev.clientX, ev.clientY); }; document.onmouseup=function(){ end(); document.onmousemove=null; document.onmouseup=null; }; });
        }
        makeDraggable(pill, pill, openPanel);
        makeDraggable(panel, $('gk-move'), null);

        $('gk-settog').onclick = function(){
            var box = $('gk-setbox');
            var open = box.style.display !== 'block';
            box.style.display = open ? 'block' : 'none';
            $('gk-settog').classList.toggle('open', open);
            if(open){ fillSettingsInputs(); renderLog(); }
            clampPanel();
        };

        $('gk-stop').onclick = function(){ if(isBotRunning) $('goku-bot-btn').click(); };
        $('gk-baleye').onclick = function(){ balHidden = !balHidden; updateBalance(); };

        // ---------- clock: ONE place that decides when to predict + bet ----------
        function startLiveClock(){
            var workerCode = "var t; self.onmessage=function(e){if(e.data==='start')t=setInterval(function(){postMessage('tick');},1000);};";
            var blob = new Blob([workerCode], {type: 'application/javascript'});
            timerWorker = new Worker(URL.createObjectURL(blob));

            timerWorker.onmessage = function(){
                updateBalance();

                var sl = secondsLeftNow();
                $('goku-time').innerText = pad2(Math.floor(sl / 60)) + ':' + pad2(sl % 60);

                // watchdog: never let a stuck bet block the bot forever
                if(isBetPlacing && Date.now() - betStartedAt > 25000){ isBetPlacing = false; }

                var uiPeriod = getUiPeriod();
                if (uiPeriod && uiPeriod !== lastUiPeriod) {
                    lastUiPeriod = uiPeriod;
                    $('goku-period').innerText = uiPeriod;
                    if (isBotRunning) updatePredictionDisplay();
                }

                // bet only when the previous result is already in history (fresh data, settled level)
                if (isBotRunning && uiPeriod && !isBetPlacing &&
                    lastBetPlacedPeriod !== uiPeriod &&
                    lastPeriodFetched === uiPeriod &&
                    predictedForPeriod !== uiPeriod) {
                    updatePredictionDisplay();
                }

                fetchApiData();
            };
            timerWorker.postMessage('start');
        }

        setInterval(function(){
            var m = $('goku-pred').innerText.match(/(BIG|SMALL)/);
            var cm = $('goku-parity-pred').innerText.match(/(ODD|EVEN)/);
            $('gk-pill-pred').innerText = (betMode === 'PARITY' && cm) ? cm[1] : (m ? m[1] : 'GOKU');
            $('gk-pill-pred').style.color = betMode === 'PARITY'
                ? (cm ? (cm[1] === 'ODD' ? '#dc2626' : '#059669') : '#4c3fb0')
                : '#4c3fb0';
            $('gk-pill-time').innerText = $('goku-time').innerText;

            var formattedProfit = (stats.profit >= 0 ? "+₹" : "-₹") + Math.abs(stats.profit).toFixed(2);
            $('gk-pill-pl').innerText = formattedProfit;
            $('gk-pill-pl').style.color = stats.profit >= 0 ? '#059669' : '#dc2626';

            pill.className = isBotRunning ? 'on' : '';
            if($('gk-setbox').style.display === 'block') renderLog();
        }, 1000);

        shadow.querySelectorAll('.goku-mbtn').forEach(function(btn){
            btn.onclick = function(){
                if(isBotRunning){ showToast('', 'STOP BOT', 'Stop bot before changing mode'); return; }
                shadow.querySelectorAll('.goku-mbtn').forEach(function(b){ b.classList.remove('active'); });
                btn.classList.add('active');
                betMode = btn.getAttribute('data-m');
                $('goku-mode-lbl').innerText = betMode;
                saveSettings();
                if(currentPredictionObj) updatePredictionDisplay();
            };
        });

        shadow.querySelectorAll('.goku-s-btn[data-srv]').forEach(function(btn){
            btn.onclick = function(){
                shadow.querySelectorAll('.goku-s-btn[data-srv]').forEach(function(b){ b.classList.remove('active'); });
                btn.classList.add('active');
                activeServer = parseInt(btn.getAttribute('data-srv'));
                $('goku-server-lbl').innerText = 'S' + activeServer;
                saveSettings();
                if(currentPredictionObj) updatePredictionDisplay();
            };
        });

        shadow.querySelectorAll('.gk-stp b').forEach(function(b){
            b.onclick = function(){
                var inp = $(b.getAttribute('data-t'));
                var step = parseFloat(inp.step) || 1, min = parseFloat(inp.min) || 0;
                var v = (parseFloat(inp.value) || 0) + step * parseInt(b.getAttribute('data-d'));
                inp.value = Math.max(min, Math.round(v * 100) / 100);
            };
        });

        function fillSettingsInputs(){
            $('set-pl-on').checked = plEnabled;
            $('set-profit').value = plProfitTarget;
            $('set-loss').value = plLossTarget;
            $('set-bet').value = fixedBaseBet;
            $('set-level').value = maxLevelsAllowed;
            $('set-mult').value = martingaleMultiplier;
            $('set-maxbet').value = maxBetLimit;
            $('set-bal-on').checked = balCheckEnabled;
            $('set-cd-on').checked = cdEnabled;
            $('set-cd-streak').value = cdStreak;
            $('set-cd-rounds').value = cdRounds;
            shadow.querySelectorAll('.goku-s-btn[data-srv]').forEach(function(b){
                b.classList.toggle('active', parseInt(b.getAttribute('data-srv')) === activeServer);
            });
            $('goku-server-lbl').innerText = 'S' + activeServer;
        }

        function saveSettings(){
            try {
                localStorage.setItem('goku_settings', JSON.stringify({
                    plEnabled: plEnabled, plProfitTarget: plProfitTarget, plLossTarget: plLossTarget,
                    fixedBaseBet: fixedBaseBet, maxLevelsAllowed: maxLevelsAllowed, martingaleMultiplier: martingaleMultiplier,
                    maxBetLimit: maxBetLimit, balCheckEnabled: balCheckEnabled,
                    cdEnabled: cdEnabled, cdStreak: cdStreak, cdRounds: cdRounds,
                    betMode: betMode, activeServer: activeServer
                }));
            } catch(e) {}
        }

        function applySettingsFromInputs(){
            var n = function(id, def){ var v = parseFloat($(id).value); return isNaN(v) ? def : v; };
            plEnabled = $('set-pl-on').checked;
            plProfitTarget = Math.max(1, n('set-profit', plProfitTarget));
            plLossTarget = Math.max(1, n('set-loss', plLossTarget));
            fixedBaseBet = Math.max(1, n('set-bet', fixedBaseBet));
            maxLevelsAllowed = Math.max(1, Math.min(15, Math.floor(n('set-level', maxLevelsAllowed))));
            martingaleMultiplier = Math.max(1, Math.min(10, n('set-mult', martingaleMultiplier)));
            maxBetLimit = Math.max(0, n('set-maxbet', maxBetLimit));
            balCheckEnabled = $('set-bal-on').checked;
            cdEnabled = $('set-cd-on').checked;
            cdStreak = Math.max(1, Math.floor(n('set-cd-streak', cdStreak)));
            cdRounds = Math.max(1, Math.floor(n('set-cd-rounds', cdRounds)));
            if(currentLevel >= maxLevelsAllowed) currentLevel = 0;
            plStopped = false;
            fillSettingsInputs();
            saveSettings();
            updateStatsUI();
        }

        function renderLog(){
            var box = $('goku-log-box'); if(!box) return;
            var list = predictionLogs.slice(0, 20);
            if(!list.length){ box.innerHTML = '<div class="gk-empty">No bets yet</div>'; return; }
            box.innerHTML = list.map(function(l){
                var cls = l.status === 'WIN' ? 'win' : (l.status === 'LOSS' ? 'loss' : (l.status === 'FAILED' ? 'fail' : ''));
                var badge = l.mode === 'PARITY' ? 'P' : 'S';
                return '<div class="gk-log ' + cls + '"><span>' + l.time + ' · #' + String(l.period).slice(-4) + ' · ' + badge + '</span><b>' + l.pred + ' · ₹' + l.amount + '</b><em>' + l.status + '</em></div>';
            }).join('');
        }

        $('set-save').onclick = function(){
            applySettingsFromInputs();
            showToast('', 'SAVED', 'Settings saved & applied!');
        };

        function resetStats(){
            stats.profit = 0; stats.wins = 0; stats.losses = 0; stats.total = 0; stats.currentStreak = 0;
            currentLevel = 0; lossRun = 0; cooldownLeft = 0; plStopped = false; predictionLogs = [];
            updateStatsUI(); renderLog();
        }

        $('set-reset').onclick = function(){
            if(!confirm('Reset stats?')) return;
            resetStats();
        };

        function showToast(type, title, desc){
            var t = document.createElement('div'); t.className = 'gk-toast ' + type;
            var icon = type === 'win' ? '✓' : (type === 'loss' ? '✕' : '⚙');
            t.innerHTML = '<div class="ic">' + icon + '</div><div><div class="t">' + title + '</div><div class="d">' + desc + '</div></div>';
            shadow.appendChild(t); setTimeout(function(){ if(t) t.remove(); }, 3500);
        }

        function stopBotWithReason(txt){
            isBotRunning = false;
            var btn = $('goku-bot-btn');
            if(btn){ btn.innerText = 'START'; btn.classList.remove('running'); }
            $('goku-status-bar').classList.remove('active');
            $('goku-status-txt').innerText = txt;
        }

        function generateBetLevels(){
            var arr = [], curr = fixedBaseBet;
            for(var j=0;j<maxLevelsAllowed;j++){
                var v = curr;
                if(maxBetLimit > 0 && v > maxBetLimit) v = maxBetLimit;
                arr.push(v);
                curr = Math.round(curr * martingaleMultiplier);
            }
            return arr;
        }

        function checkProfitLossTarget(){
            if(!plEnabled || plStopped) return false;
            if(stats.profit >= plProfitTarget){
                plStopped = true;
                stopBotWithReason('TARGET HIT');
                showGokuModal('PROFIT TARGET! 🎯', 'Profit: <b style="color:#059669">+' + stats.profit.toFixed(2) + '</b><br>Bot stopped automatically.', 'RESET & CONTINUE', function() { resetStats(); });
                return true;
            }
            if(stats.profit <= -plLossTarget){
                plStopped = true;
                stopBotWithReason('LOSS LIMIT');
                showGokuModal('STOP LOSS! 🛑', 'Loss: <b style="color:#dc2626">-' + Math.abs(stats.profit).toFixed(2) + '</b><br>Bot stopped to protect balance.', 'RESET & CONTINUE', function() { resetStats(); });
                return true;
            }
            return false;
        }

        var botBtnUI = $('goku-bot-btn');
        botBtnUI.onclick = function(){
            if(plStopped){
                plStopped = false;
                resetStats();
            }
            isBotRunning = !isBotRunning;
            if(isBotRunning){
                botBtnUI.innerText = "STOP"; botBtnUI.classList.add("running");
                $('goku-status-bar').classList.add("active");
                $('goku-status-txt').innerText = "RUNNING";
                predictedForPeriod = "";
                fetchApiData();
                // the clock tick will predict + bet as soon as the history is fresh
            } else {
                botBtnUI.innerText = "START"; botBtnUI.classList.remove("running");
                $('goku-status-bar').classList.remove("active");
                $('goku-status-txt').innerText = "STOPPED";
                $('goku-pred').innerHTML = "WAITING...";
                $('goku-pred').style.color = "#6d5bd0";
            }
        };

        // ============================================================
        // 3 SEPARATE SERVERS (unchanged)
        // ============================================================

        function server1Predict(history) {
            var waveSum = 0;
            var n = Math.min(history.length, 40);
            for (var i = 0; i < n; i++) {
                var w = Math.exp(-i / 4);
                waveSum += (history[i].number >= 11 ? 1 : -1) * w;
            }
            var size = waveSum >= 0 ? 'BIG' : 'SMALL';

            var parityWave = 0;
            for (var j = 0; j < n; j++) {
                var wp = Math.exp(-j / 4);
                parityWave += (history[j].number % 2 === 0 ? 1 : -1) * wp;
            }
            var parity = parityWave >= 0 ? 'EVEN' : 'ODD';

            return {
                size: size,
                parity: parity,
                sizeConf: Math.round(Math.min(95, 60 + Math.abs(waveSum) * 3)),
                parityConf: Math.round(Math.min(95, 60 + Math.abs(parityWave) * 3))
            };
        }

        function server2Predict(history) {
            var bigPower = 0, smallPower = 0;
            var pairs = Math.min(history.length - 1, 14);
            for (var i = 0; i < pairs; i++) {
                var factor = 15 - i;
                var curBig = history[i].number >= 11;
                var nextBig = history[i + 1].number >= 11;
                if (curBig === nextBig) {
                    if (curBig) bigPower += factor * 1.3;
                    else smallPower += factor * 1.3;
                } else {
                    if (curBig) smallPower += factor * 0.9;
                    else bigPower += factor * 0.9;
                }
            }
            var size = bigPower >= smallPower ? 'BIG' : 'SMALL';

            var evenPower = 0, oddPower = 0;
            for (var k = 0; k < pairs; k++) {
                var f = 15 - k;
                var curEven = history[k].number % 2 === 0;
                var nextEven = history[k + 1].number % 2 === 0;
                if (curEven === nextEven) {
                    if (curEven) evenPower += f * 1.3;
                    else oddPower += f * 1.3;
                } else {
                    if (curEven) oddPower += f * 0.9;
                    else evenPower += f * 0.9;
                }
            }
            var parity = evenPower >= oddPower ? 'EVEN' : 'ODD';

            var sizeDiff = Math.abs(bigPower - smallPower);
            var parDiff = Math.abs(evenPower - oddPower);
            return {
                size: size,
                parity: parity,
                sizeConf: Math.round(Math.min(95, 60 + sizeDiff * 0.6)),
                parityConf: Math.round(Math.min(95, 60 + parDiff * 0.6))
            };
        }

        function server3Predict(history) {
            var parityScore = 0;
            var n = Math.min(history.length, 10);
            for (var i = 0; i < n; i++) {
                var w = 10 - i;
                parityScore += (history[i].number % 2 === 0 ? w : -w);
            }
            var lastSum = history[0].number;
            var size;
            if (parityScore > 3) {
                size = lastSum >= 11 ? 'SMALL' : 'BIG';
            } else {
                size = lastSum >= 11 ? 'BIG' : 'SMALL';
            }
            var parity = parityScore > 0 ? 'EVEN' : 'ODD';

            return {
                size: size,
                parity: parity,
                sizeConf: Math.round(Math.min(95, 60 + Math.abs(parityScore) * 2)),
                parityConf: Math.round(Math.min(95, 60 + Math.abs(parityScore) * 2))
            };
        }

        function updatePredictionDisplay(){
            var pEl = $('goku-pred');
            var cEl = $('goku-parity-pred');
            pEl.innerHTML = "ANALYZING...";
            pEl.style.fontSize = "15px";
            pEl.style.color = "#6d5bd0";
            pEl.style.opacity = '1';
            cEl.innerHTML = "--";

            var attempts = 0;
            var maxAttempts = 15;

            function tryPredict(){
                if ((!latestHistoryData || latestHistoryData.length < 5) && attempts < maxAttempts) {
                    attempts++;
                    setTimeout(tryPredict, 150);
                    return;
                }

                if (!latestHistoryData || latestHistoryData.length < 5) {
                    pEl.innerHTML = "NO DATA";
                    pEl.style.fontSize = "14px";
                    pEl.style.color = "#6d5bd0";
                    return;
                }

                // remember that this period was predicted from FRESH history
                var upNow = getUiPeriod();
                if (upNow && lastPeriodFetched === upNow) predictedForPeriod = upNow;

                var s1 = server1Predict(latestHistoryData);
                var s2 = server2Predict(latestHistoryData);
                var s3 = server3Predict(latestHistoryData);
                var result = activeServer === 1 ? s1 : (activeServer === 2 ? s2 : s3);

                currentPredictionObj = {
                    size: result.size,
                    parity: result.parity,
                    sizeConf: result.sizeConf,
                    parityConf: result.parityConf,
                    avgConf: (result.sizeConf + result.parityConf) / 2
                };

                var useMode = betMode;
                if (betMode === 'AUTO') {
                    useMode = (result.sizeConf >= result.parityConf) ? 'SIZE' : 'PARITY';
                }

                var sizeWarn = result.sizeConf < 55 ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6d5bd0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' : '';
                pEl.innerHTML = sizeWarn + result.size + ' <small>' + result.sizeConf + '%</small>';
                pEl.style.fontSize = "24px";
                pEl.style.color = (result.size === "BIG") ? "#dc2626" : "#059669";
                pEl.style.opacity = (useMode === 'SIZE') ? '1' : '0.55';

                var parityWarn = result.parityConf < 55 ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' : '';
                cEl.innerHTML = parityWarn + result.parity + ' <small>' + result.parityConf + '%</small>';
                cEl.style.color = (result.parity === 'ODD') ? '#dc2626' : '#059669';
                cEl.style.opacity = (useMode === 'PARITY') ? '1' : '0.55';

                $('goku-acc').innerText = 'Size: ' + result.sizeConf + '% · Parity: ' + result.parityConf + '%';
                var activeConf = Math.max(result.sizeConf, result.parityConf);
                var bd = $('gk-badge');
                bd.className = 'gk-badge ' + (activeConf >= 70 ? 'good' : (activeConf >= 55 ? 'mid' : ''));
                bd.innerText = activeConf >= 70 ? 'STRONG' : (activeConf >= 55 ? 'OK' : '\u26A0\uFE0E WEAK');

                if(isBotRunning && !isBetPlacing) executeAutoBetSequence();
            }

            tryPredict();
        }

        function fetchApiData(){
            if (isFetching) return;
            isFetching = true;
            var url = HISTORY_API_BASE + currentApiMode + "/GetHistoryIssuePage.json?_t=" + new Date().getTime();

            fetch(url, { cache: 'no-store' })
                .then(function(res){ return res.json(); })
                .then(function(data){
                    if(!data || data.code !== 0) return;
                    var rawList = (data && data.data && Array.isArray(data.data.list)) ? data.data.list : [];
                    if(rawList.length === 0) return;

                    var historyList = rawList.map(function(item){
                        var sumVal = parseInt(item.sum || 0);
                        return {
                            issueNumber: String(item.issueNumber || '').replace(/\D/g, ''),
                            number: sumVal,
                            size: sumVal >= 11 ? 'BIG' : 'SMALL',
                            parity: (sumVal % 2 === 0) ? 'EVEN' : 'ODD',
                            premium: item.premium
                        };
                    });

                    latestHistoryData = historyList;
                    renderHistory(historyList);
                    checkWinLoss(historyList);   // settle old bets FIRST (updates level)

                    var lastIssue = historyList[0];
                    lastPeriodFetched = (BigInt(lastIssue.issueNumber) + 1n).toString();
                })
                .catch(function(e){ console.log('GOKU History API error:', e); })
                .finally(function(){ isFetching = false; });
        }

        function renderHistory(list){
            if(!list.length) return;
            var parity = list[0].parity;
            var lc = $('gk-last');
            lc.innerHTML = parity;
            lc.style.color = (parity === 'EVEN') ? '#059669' : '#dc2626';
        }

        function updateBalance(){
            var e = document.querySelector('.Wallet__C-balance-l1 div');
            var v = e ? e.innerText.replace(/[^\d.]/g, '') : "0.00";
            currentBalance = parseFloat(v) || 0;
            $('goku-bal-val').innerText = balHidden ? '••••' : (e ? '₹' + currentBalance.toFixed(2) : 'Scanning...');
        }

        // Settles pending bets OLDEST FIRST so the martingale level is always correct.
        function checkWinLoss(historyList){
            var updated = false;
            var oldestIssue = historyList[historyList.length - 1].issueNumber;

            var pending = predictionLogs.filter(function(l){ return l.status === 'PENDING'; });
            pending.sort(function(a, b){
                var x = BigInt(a.period), y = BigInt(b.period);
                return x < y ? -1 : (x > y ? 1 : 0);
            });

            pending.forEach(function(log){
                var result = historyList.find(function(h){ return h.issueNumber === log.period; });

                if(!result){
                    // result fell out of the history window -> unknown, do NOT count it
                    try { if(BigInt(log.period) < BigInt(oldestIssue)){ log.status = 'FAILED'; updated = true; } } catch(e){}
                    return;
                }

                var isWin = (log.mode === 'PARITY') ? (log.pred === result.parity) : (log.pred === result.size);
                stats.total++;
                var amt = log.amount || fixedBaseBet;
                var profitThisRound = 0;

                if (isWin) {
                    stats.wins++;
                    profitThisRound = amt * 0.98;
                    currentLevel = 0;            // win -> always back to base bet
                    lossRun = 0;
                } else {
                    stats.losses++;
                    profitThisRound = -amt;
                    currentLevel++;
                    if (currentLevel >= maxLevelsAllowed) currentLevel = 0;
                    lossRun++;
                    if (cdEnabled && lossRun >= cdStreak) { cooldownLeft = cdRounds; lossRun = 0; }
                }
                stats.profit += profitThisRound;

                log.number = result.number;
                log.result = result.size;
                log.resultParity = result.parity;
                log.status = isWin ? 'WIN' : 'LOSS';
                updated = true;
            });

            if (updated) {
                updateStatsUI();
                checkProfitLossTarget();
                renderLog();
            }
        }

        function updateStatsUI(){
            $('st-tot').innerText = stats.total;
            $('st-win').innerText = stats.wins;
            $('st-los').innerText = stats.losses;
            var p = $('st-pro');
            p.innerText = (stats.profit >= 0 ? "+₹" : "-₹") + Math.abs(stats.profit).toFixed(2);
            p.className = stats.profit >= 0 ? "val-g" : "val-r";
            $('goku-level').innerText = 'LVL: ' + (currentLevel + 1);
            $('goku-mode-lbl').innerText = betMode;
        }

        // ============================================================
        // BETTING (safe: never double-submits, never submits a wrong total)
        // ============================================================

        function dispatchForceClick(node){
            if(!node) return;
            try { node.click(); } catch(e){}
            ['pointerdown','mousedown','pointerup','mouseup'].forEach(function(evt){
                try {
                    node.dispatchEvent(new MouseEvent(evt, { bubbles: true, cancelable: true, view: window }));
                } catch(e){}
            });
            try {
                var rect = node.getBoundingClientRect();
                var x = rect.left + rect.width / 2;
                var y = rect.top + rect.height / 2;
                var touchObj = new Touch({ identifier: Date.now(), target: node, clientX: x, clientY: y, screenX: x, screenY: y, pageX: x, pageY: y });
                var startEvent = new TouchEvent('touchstart', { bubbles: true, cancelable: true, composed: true, touches: [touchObj], targetTouches: [touchObj], changedTouches: [touchObj] });
                var endEvent = new TouchEvent('touchend', { bubbles: true, cancelable: true, composed: true, touches: [], targetTouches: [], changedTouches: [touchObj] });
                node.dispatchEvent(startEvent);
                setTimeout(function() { node.dispatchEvent(endEvent); }, 50);
            } catch(e) {
                try {
                    node.dispatchEvent(new Event('touchstart', { bubbles: true, cancelable: true }));
                    node.dispatchEvent(new Event('touchend', { bubbles: true, cancelable: true }));
                } catch(err){}
            }
        }

        function findBetButton(target){
            var cls = target.charAt(0).toUpperCase() + target.slice(1).toLowerCase();
            var allBtns = document.querySelectorAll('.bet_item.' + cls);
            for(var i=0; i<allBtns.length; i++){
                if(isVisible(allBtns[i])) return allBtns[i];
            }
            return null;
        }

        function findVisibleAmountInput(){
            var inp = document.querySelector('.Betting__Popup-input');
            return isVisible(inp) ? inp : null;
        }

        function setBetAmountOn(inputField, amount){
            if(!inputField) return false;
            try {
                inputField.setAttribute('inputmode', 'none');
                inputField.focus();

                var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
                nativeInputValueSetter.call(inputField, String(amount));

                inputField.dispatchEvent(new Event('input', { bubbles: true }));
                inputField.dispatchEvent(new Event('change', { bubbles: true }));
                inputField.dispatchEvent(new Event('keyup', { bubbles: true }));
                inputField.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: String(amount) }));

                setTimeout(function(){
                    inputField.blur();
                    inputField.removeAttribute('inputmode');
                }, 100);
                return true;
            } catch(err){
                try {
                    inputField.value = String(amount);
                    inputField.dispatchEvent(new Event('input', { bubbles: true }));
                    return true;
                } catch(e2){ return false; }
            }
        }

        function checkAgreeCheckbox(){
            var checkbox = document.querySelector('.betPopup .van-checkbox');
            if(checkbox && isVisible(checkbox)){
                if(checkbox.getAttribute('aria-checked') !== 'true') dispatchForceClick(checkbox);
            }
        }

        function getVisibleConfirmBtn(){
            var b = document.querySelector('.betPopup .bet-foot-s');
            return isVisible(b) ? b : null;
        }

        function readPopupTotal(){
            var b = getVisibleConfirmBtn();
            if(!b) return NaN;
            var nums = String(b.innerText || '').replace(/,/g, '').match(/\d+(\.\d+)?/g);
            return nums ? parseFloat(nums[nums.length - 1]) : NaN;
        }

        function isBetPopupOpen(){
            return isVisible(document.querySelector('.betPopup'));
        }

        function closeStuckPopups(){
            var cancelBtn = document.querySelector('.betPopup .bet-foot-c');
            if(cancelBtn && isVisible(cancelBtn)){
                dispatchForceClick(cancelBtn);
                return true;
            }
            return false;
        }

        // resolves { ok, submitted }.  submitted=true means the confirm button was tapped.
        function forceBet(targetVal, amount){
            return new Promise(function(resolve){
                if(isBetPlacing){ resolve({ ok: false, submitted: false }); return; }
                isBetPlacing = true;
                betStartedAt = Date.now();

                function done(ok, submitted, msg){
                    isBetPlacing = false;
                    if(msg) $('goku-status-txt').innerText = msg;
                    resolve({ ok: ok, submitted: submitted });
                }

                $('goku-status-txt').innerText = 'SEARCHING ' + targetVal;
                closeStuckPopups();

                setTimeout(function(){
                    var btn = findBetButton(targetVal);
                    if(!btn){ done(false, false, 'BUTTON NOT FOUND'); return; }

                    $('goku-status-txt').innerText = 'TAPPING ' + targetVal;
                    dispatchForceClick(btn);

                    setTimeout(function() {
                        var popupTries = 0;
                        (function waitForPopup(){
                            var inp = findVisibleAmountInput();
                            if(!inp){
                                if(++popupTries > 30){ done(false, false, 'NO POPUP'); return; }
                                $('goku-status-txt').innerText = 'WAITING POPUP';
                                setTimeout(waitForPopup, 100);
                                return;
                            }

                            $('goku-status-txt').innerText = 'SETTING AMT';
                            setBetAmountOn(inp, amount);
                            checkAgreeCheckbox();

                            var totalTries = 0;
                            (function waitForTotal(){
                                var total = readPopupTotal();
                                if(isNaN(total) && !getVisibleConfirmBtn()){
                                    if(++totalTries > 30){ done(false, false, 'NO CONFIRM BTN'); return; }
                                    setTimeout(waitForTotal, 100);
                                    return;
                                }
                                if(Math.abs(total - Number(amount)) < 0.01){
                                    submit();
                                    return;
                                }
                                // total is wrong (leftover multiplier / chip) -> NEVER submit a wrong amount
                                if(++totalTries > 30){
                                    closeStuckPopups();
                                    done(false, false, 'AMT MISMATCH ' + (isNaN(total) ? '?' : total));
                                    return;
                                }
                                setTimeout(waitForTotal, 100);
                            })();

                            function submit(){
                                setTimeout(function(){
                                    var btn2 = getVisibleConfirmBtn();
                                    // re-check right before tapping
                                    if(!btn2 || Math.abs(readPopupTotal() - Number(amount)) >= 0.01){
                                        closeStuckPopups();
                                        done(false, false, 'AMT CHANGED');
                                        return;
                                    }
                                    $('goku-status-txt').innerText = 'SUBMITTING';
                                    dispatchForceClick(btn2);          // ONE tap only, never repeated

                                    var waited = 0;
                                    (function waitClosed(){
                                        if(!isBetPopupOpen()){ done(true, true, 'RUNNING'); return; }
                                        waited += 200;
                                        if(waited >= 3500){
                                            closeStuckPopups();        // cancel, do not tap confirm again
                                            done(false, true, 'NOT CONFIRMED');
                                            return;
                                        }
                                        setTimeout(waitClosed, 200);
                                    })();
                                }, 600);
                            }
                        })();
                    }, 1000);
                }, 100);
            }).catch(function(e) {
                isBetPlacing = false;
                $('goku-status-txt').innerText = 'ERROR';
                return { ok: false, submitted: false };
            });
        }

        function executeAutoBetSequence(){
            if(plStopped || !isBotRunning) return;
            if(!currentPredictionObj) return;
            if(isBetPlacing) return;

            var uiPeriod = getUiPeriod();
            if(!uiPeriod) return;
            if(lastBetPlacedPeriod === uiPeriod) return;

            // 1) previous round MUST be finished + settled, otherwise the level is stale
            if(lastPeriodFetched !== uiPeriod){ $('goku-status-txt').innerText = 'WAIT RESULT'; return; }
            if(predictionLogs.some(function(l){ return l.status === 'PENDING' && l.period !== uiPeriod; })) return;

            // 2) too late in the round -> skip this period
            if(secondsLeftNow() < 8){
                lastBetPlacedPeriod = uiPeriod;
                $('goku-status-txt').innerText = 'TOO LATE';
                return;
            }

            if(Date.now() - lastBetAttemptAt < 1500) return;

            if(betRetryPeriod !== uiPeriod){ betRetryPeriod = uiPeriod; betRetryCount = 0; }

            if(cooldownLeft > 0){
                cooldownLeft--;
                lastBetPlacedPeriod = uiPeriod;            // count this period only once
                $('goku-status-txt').innerText = 'PAUSED (' + (cooldownLeft + 1) + ')';
                return;
            } else if(isBotRunning){
                $('goku-status-txt').innerText = 'RUNNING';
            }

            var levels = generateBetLevels();
            var amtSize = levels[currentLevel] || levels[0] || 10;

            if(balCheckEnabled && currentBalance > 0 && amtSize > currentBalance){
                stopBotWithReason('LOW BALANCE');
                return;
            }
            if(maxBetLimit > 0 && amtSize > maxBetLimit){
                stopBotWithReason('MAX BET HIT');
                return;
            }

            var currentModeToUse = betMode;
            if (betMode === 'AUTO') {
                currentModeToUse = (currentPredictionObj.sizeConf >= currentPredictionObj.parityConf) ? 'SIZE' : 'PARITY';
            }
            var targetVal = currentModeToUse === 'SIZE' ? currentPredictionObj.size : currentPredictionObj.parity;
            activeBetMode = currentModeToUse;

            lastBetPlacedPeriod = uiPeriod;
            lastBetAttemptAt = Date.now();
            betLevelsArray = levels;

            var logTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            predictionLogs = predictionLogs.filter(function(l){ return l.period !== uiPeriod; });
            predictionLogs.unshift({
                period: uiPeriod,
                pred: targetVal,
                parity: currentPredictionObj.parity,
                mode: currentModeToUse,
                server: activeServer,
                number: '?',
                result: 'WAITING',
                status: 'PENDING',
                time: logTime,
                amount: amtSize
            });
            if(predictionLogs.length > 20) predictionLogs.length = 20;

            forceBet(targetVal, amtSize).then(function(r){
                if(r.ok) return;

                var log = predictionLogs.find(function(l){ return l.period === uiPeriod && l.status === 'PENDING'; });

                // nothing was submitted -> safe to try again in the same period
                if(!r.submitted && betRetryCount < 2 && secondsLeftNow() > 12){
                    betRetryCount++;
                    predictionLogs = predictionLogs.filter(function(l){ return l !== log; });
                    lastBetPlacedPeriod = "";
                    predictedForPeriod = "";
                    return;
                }

                // failed / unconfirmed -> NOT counted as win or loss (keeps level correct)
                if(log) log.status = 'FAILED';
                renderLog();
                setTimeout(function(){ if(isBotRunning) $('goku-status-txt').innerText = 'RUNNING'; }, 2500);
            });
        }

        shadow.querySelectorAll('.goku-mbtn').forEach(function(b){
            if(b.getAttribute('data-m') === betMode) b.classList.add('active');
            else b.classList.remove('active');
        });

        fillSettingsInputs();
        updateStatsUI();
        startLiveClock();
        console.log('GOKU: 3 Servers Ready — double-bet fix applied');
    }
})();
