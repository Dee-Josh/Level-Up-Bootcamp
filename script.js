
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbySA8sH1o7E1dXN0ZiQf0_YyIbYsmkZiuWypbo6gWGt1RHj1Owfi7fytXkoZktn6aE/exec';

const registeredPassword = [
    "Favour01",
    "Oladele",
    "Ayodamola04",
    "AdePromise23",
    "Folowo56",
    "Folorunso23",
    "Nife202",
    "Emma303",
    "Feranmi403",
    "Akin339",
    "Promise435",
    "AdeDan343",
    "Sosos23",
    "Ezekiel4543",
    "Oyetade234",
    "Esther574",
    "Oladapo290",
    "AdeleyeT346",
    "Austin203",
    "Bless00ing",
    "Opeyemi232",
    "Heritage787",
    "Favour221",
]

const PILLARS = [

    { 
        id:'spiritual', 
        name:'Spiritual', 
        icon:'🙏', 
        desc:'Your root — connection with God', 
        podDesc:'Prayer, Scripture & deepening your walk with God',
        questions: [
            'I have a consistent daily prayer and devotion habit.',
            'I feel genuinely connected to God in my everyday life.',
            'My faith actively shapes the decisions I make.',
            'I spend time in Scripture regularly and it speaks to me.', 
            'I hear God on a daily basis.'
        ] 
    },
    { 
        id:'mental', 
        name:'Mental', 
        icon:'🧠', 
        desc:'Mindset & how you think', 
        podDesc:'Mindset, self-doubt & renewing your thinking',
        questions:[
            'I am able to control negative or fearful thoughts.',
            'Self-doubt rarely stops me from taking action.',
            'I consistently feed my mind with good content and learning.',
            'I approach challenges with a growth mindset.',
            'I read books frequently.'
        ] 
    },
    { 
        id:'emotional', 
        name:'Emotional', 
        icon:'❤️', 
        desc:'Emotional health & resilience', 
        podDesc:'Healing, resilience & emotional intelligence',
        questions:[
            'I respond to difficult situations rather than react impulsively.',
            'I process emotions in healthy ways rather than suppressing them.',
            'Past hurts or wounds rarely affect my current decisions.',
            'I am emotionally stable even under pressure.',
            'I don\'t hold on to offences.'
        ]
    },
        { 
            id:'physical', 
            name:'Physical', 
            icon:'💪', 
            desc:'Body stewardship & energy', 
            podDesc:'Health, energy & body stewardship',
            questions:[
                'I exercise or move my body intentionally at least 3 times a week.',
                'I get adequate sleep and feel rested most mornings.',
                'I am mindful about what I eat and how it affects my energy.',
                'I see my body as a temple and steward it accordingly.',
                'I don\'t feel tired easily'
            ] 
        },
        { 
            id:'financial', 
            name:'Financial', 
            icon:'💰', 
            desc:'Stewardship & generational thinking', 
            podDesc:'Stewardship, budgeting & generational thinking',
    
            questions:[
                'I have a clear understanding of my income and expenses.',
                'I save or invest consistently, even if a small amount.',
                'I make financial decisions based on values not just emotions.',
                'I am building toward financial freedom not just survival.',
                'I have a stable source of income.'
            ] 
        },
        { 
            id:'relational', 
            name:'Relational', 
            icon:'🤝', desc:'Community, friendships & leadership', 
            podDesc:'Community, leadership & lasting friendships',
            questions:[
                'I have people in my life who genuinely sharpen and challenge me.',
                'I invest in relationships intentionally and consistently.',
                'I am easy to be in relationship with — open, warm and present.',
                'I am actively growing as a leader in my sphere of influence.',
                'I find it very easy to make new friends.'
            ] 
        },
        { 
            id:'purpose', 
            name:'Purpose & Productivity', 
            icon:'🎯', 
            desc:'Your calling & how you execute it', 
            podDesc:'Clarity of calling, focus & faithful execution',
            questions:[
                'I have a clear sense of what I am called to do in this season.',
                'I have systems that help me execute on my goals consistently.',
                'I rarely feel like I am just busy without being purposeful.',
                'My daily activities are aligned with my long-term assignment.',
                'I don\'t feel intimidated when I see other become successful'  
            ] 
    }
];

let currentPillar = 0;
let scores = {};

let enteredName;

function startAssessment() {
    enteredName = document.getElementById('nameInput').value;
    let enteredPassword = document.getElementById('password').value;
    let displayName = document.getElementById('display-name');
    displayName.textContent = enteredName+"'s";

    if (!document.getElementById('nameInput').value.trim()) { 
        alert('Please enter your name.'); 
    }else if (enteredPassword === "") {
        alert('Please enter your password.');
    }
    else {
        for (let index = 0; index < registeredPassword.length; index++) {
            if (enteredPassword === registeredPassword[index]){
                document.getElementById('stepName').style.display = 'none';
                document.getElementById('stepAssessment').style.display = 'block';
                renderPillar();
                break;
            }else{
                if(index+1 === registeredPassword.length) {
                    alert("Password not found");
                    break;
                }
            }   
        }
    }

    
    // registeredPassword.forEach((password, index)=>{
    //     console.log(enteredPassword===password);
    //     if (enteredPassword === password) {
    //         if (!document.getElementById('nameInput').value.trim()) { alert('Please enter your name.'); return; }
    //         document.getElementById('stepName').style.display = 'none';
    //         document.getElementById('stepAssessment').style.display = 'block';
    //         renderPillar();
    //     }else{
    //         console.log(false);
    //         if(index+1 === registeredPassword.length) {
    //             alert("Password not found");
    //         }
    //     }

    // })
}

function renderPillar() {
const p = PILLARS[currentPillar];
const total = PILLARS.length;
document.getElementById('progressBar').style.width = ((currentPillar / total) * 100) + '%';
document.getElementById('progressLabel').textContent = `Pillar ${currentPillar + 1} of ${total} — ${p.name}`;
document.getElementById('backBtn').style.visibility = currentPillar === 0 ? 'hidden' : 'visible';
document.getElementById('nextBtn').textContent = currentPillar === total - 1 ? 'See My Results →' : 'Next →';

const existing = scores[p.id] ? scores[p.id].answers : {};
let html = `<div class="pillar-section"><div class="pillar-header"><div class="pillar-emoji">${p.icon}</div><div><div class="pillar-title">${p.name}</div><div class="pillar-subtitle">${p.desc}</div></div></div>`;
p.questions.forEach((q, qi) => {
    html += `<div class="question-block"><div class="question-text">${qi+1}. ${q}</div><div class="scale-row">`;
    for (let v = 1; v <= 5; v++) {
    html += `<button class="scale-btn ${existing[qi]===v?'selected':''}" onclick="selectAnswer(${qi},${v},this)">${v}</button>`;
    }
    html += `</div><div class="scale-labels"><span>Not at all</span><span>Absolutely</span></div></div>`;
});
html += `</div>`;
document.getElementById('pillarContent').innerHTML = html;
window.scrollTo({ top:0, behavior:'smooth' });
}

function selectAnswer(qi, val, btn) {
const p = PILLARS[currentPillar];
if (!scores[p.id]) scores[p.id] = { answers:{} };
scores[p.id].answers[qi] = val;
btn.closest('.scale-row').querySelectorAll('.scale-btn').forEach(b => b.classList.remove('selected'));
btn.classList.add('selected');
}

function nextPillar() {
const p = PILLARS[currentPillar];
const ans = scores[p.id] ? scores[p.id].answers : {};
if (Object.keys(ans).length < p.questions.length) { alert('Please answer all questions before continuing.'); return; }
const total = Object.values(ans).reduce((a,b) => a+b, 0);
scores[p.id].avg = total / p.questions.length;
scores[p.id].pct = Math.round((scores[p.id].avg / 5) * 100);
if (currentPillar < PILLARS.length - 1) { currentPillar++; renderPillar(); }
else showResults();
}

function prevPillar() {
if (currentPillar > 0) { currentPillar--; renderPillar(); }
}

// ── RADAR CHART ──────────────────────────────────────────────────────────────
function drawRadar(pillarData) {
const canvas = document.getElementById('radarCanvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio || 1;
const SIZE = Math.min(window.innerWidth - 48, 380);

canvas.width  = SIZE * dpr;
canvas.height = SIZE * dpr;
canvas.style.width  = SIZE + 'px';
canvas.style.height = SIZE + 'px';
ctx.scale(dpr, dpr);

const cx = SIZE / 2, cy = SIZE / 2;
const maxR = SIZE * 0.30;
const n = pillarData.length;
const LEVELS = 5;

function angle(i) { return (Math.PI * 2 * i / n) - Math.PI / 2; }
function pt(i, r) { return { x: cx + r * Math.cos(angle(i)), y: cy + r * Math.sin(angle(i)) }; }

// Grid rings
for (let l = 1; l <= LEVELS; l++) {
    const r = (l / LEVELS) * maxR;
    ctx.beginPath();
    for (let i = 0; i < n; i++) { const p = pt(i,r); i===0 ? ctx.moveTo(p.x,p.y) : ctx.lineTo(p.x,p.y); }
    ctx.closePath();
    if (l % 2 === 0) { ctx.fillStyle='rgba(255,255,255,0.02)'; ctx.fill(); }
    ctx.strokeStyle = l===LEVELS ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.08)';
    ctx.lineWidth = l===LEVELS ? 1.5 : 0.8;
    ctx.stroke();
}

// Spokes
for (let i = 0; i < n; i++) {
    const p = pt(i, maxR);
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(p.x,p.y);
    ctx.strokeStyle='rgba(255,255,255,0.1)'; ctx.lineWidth=1; ctx.stroke();
}

// Data shape — fill
ctx.beginPath();
pillarData.forEach((d,i) => { const p=pt(i,(d.pct/100)*maxR); i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y); });
ctx.closePath();
ctx.fillStyle='rgba(201,168,76,0.22)'; ctx.fill();

// Data shape — stroke
ctx.beginPath();
pillarData.forEach((d,i) => { const p=pt(i,(d.pct/100)*maxR); i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y); });
ctx.closePath();
ctx.strokeStyle='rgba(201,168,76,0.95)'; ctx.lineWidth=2.5; ctx.stroke();

// Vertex dots
pillarData.forEach((d,i) => {
    const p=pt(i,(d.pct/100)*maxR);
    ctx.beginPath(); ctx.arc(p.x,p.y,5,0,Math.PI*2);
    ctx.fillStyle=d.isWeakest?'#f08080':'#c9a84c'; ctx.fill();
    ctx.strokeStyle='#0d0d1a'; ctx.lineWidth=2; ctx.stroke();
});

// Labels
const LR = maxR + 34;
pillarData.forEach((d,i) => {
    const p = pt(i, LR);
    const lines = d.name==='Purpose & Productivity' ? ['Purpose &','Productivity'] : [d.name];
    const LH = 13, startY = p.y - ((lines.length-1)*LH)/2;
    ctx.textAlign='center'; ctx.textBaseline='middle';
    lines.forEach((line,li) => {
    ctx.font = (d.isWeakest?'bold ':'500 ')+'11px DM Sans,sans-serif';
    ctx.fillStyle = d.isWeakest?'#f08080':'rgba(245,240,232,0.9)';
    ctx.fillText(line, p.x, startY+li*LH);
    });
    ctx.font='10px DM Sans,sans-serif';
    ctx.fillStyle = d.isWeakest?'rgba(240,128,128,0.8)':'rgba(201,168,76,0.8)';
    ctx.fillText(d.pct+'%', p.x, startY+lines.length*LH+1);
});
}

// ── RESULTS ──────────────────────────────────────────────────────────────────
function showResults() {
document.getElementById('stepAssessment').style.display = 'none';
document.getElementById('stepResults').style.display = 'block';
window.scrollTo({top:0,behavior:'smooth'});

let weakest = PILLARS[0];
PILLARS.forEach(p => { if (scores[p.id].pct < scores[weakest.id].pct) weakest = p; });

// Draw chart after 2 frames so canvas is visible
const radarData = PILLARS.map(p => ({ name:p.name, pct:scores[p.id].pct, isWeakest:p.id===weakest.id }));
requestAnimationFrame(() => requestAnimationFrame(() => drawRadar(radarData)));

// Score bars
const sorted = [...PILLARS].sort((a,b) => scores[b.id].pct - scores[a.id].pct);
document.getElementById('scoreGrid').innerHTML = sorted.map(p => {
    const pct=scores[p.id].pct, weak=p.id===weakest.id;
    return `<div class="score-row ${weak?'weakest':''}">
    <div class="score-row-icon">${p.icon}</div>
    <div class="score-row-name">${p.name}${weak?'<div class="weakest-tag">↓ Needs most attention</div>':''}</div>
    <div class="score-bar-wrap"><div class="score-bar-fill" style="width:${pct}%"></div></div>
    <div class="score-pct">${pct}%</div>
    </div>`;
}).join('');

document.getElementById('revealBox').innerHTML = `
    <h3>${weakest.icon} Weakest Pillar: ${weakest.name}</h3>
    <p>This is the area that needs the most water right now. We recommend the <strong style="color:var(--white)">${weakest.name} Pod</strong> — but the choice is yours.</p>`;

document.getElementById('podGrid').innerHTML = PILLARS.map(p => {
    const rec = p.id===weakest.id;
    return `<label class="pillar-card ${rec?'recommended':''}">
    <input type="radio" name="pod" value="${p.id}" ${rec?'checked':''}/>
    <div class="card-inner">
        <div class="p-icon">${p.icon}</div>
        <div>
        <div class="p-name">${p.name}</div>
        <div class="p-desc">${p.podDesc}</div>
        ${rec?'<div class="rec-badge">★ Recommended for you</div>':''}
        </div>
    </div>
    </label>`;
}).join('');
}

// GENERATE PLAN

function generatePlan() {
const pod = document.querySelector('input[name="pod"]:checked').value;
setLoading(true); hideError();
setTimeout(() => {
    window.location =  'argon-growth-plan.html?pillar='+pod
    setLoading(false)
}, 1500);


}

// ── SUBMIT ───────────────────────────────────────────────────────────────────
async function submitForm() {
const pod    = document.querySelector('input[name="pod"]:checked');
const reason = document.getElementById('reasonInput').value.trim();
const name   = document.getElementById('nameInput').value.trim();
const phone  = document.getElementById('phoneInput').value.trim();
if (!pod) { showError('Please choose a pod.'); return; }

function generatePlan() {
const pod = document.querySelector('input[name="pod"]:checked');
alert(pod)
window.location =  'argon-growth-plan.html?pillar='+pod
}

setLoading(true); hideError();

const weakest = PILLARS.reduce((a,b) => scores[a.id].pct < scores[b.id].pct ? a : b);
const payload = {
    timestamp: new Date().toLocaleString(),
    name, phone,
    pillar: PILLARS.find(p=>p.id===pod.value).name,
    weakestPillar: weakest.name,
    scores: PILLARS.map(p=>`${p.name}: ${scores[p.id].pct}%`).join(' | '),
    reason
};

try {
    await fetch(SCRIPT_URL, { method:'POST', mode:'no-cors', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
    showSuccess(pod.value);
} catch(err) {
    setLoading(false);
    showError('Something went wrong. Please check your connection and try again.');
}
}

function showSuccess(podId) {
document.getElementById('stepResults').style.display = 'none';
document.getElementById('successMsg').classList.add('show');
const p = PILLARS.find(p=>p.id===podId);
document.getElementById('podBadge').textContent = `${p.icon} ${p.name} Pod`;
window.scrollTo({top:0,behavior:'smooth'});
}

function setLoading(on) {
document.getElementById('submitBtn').disabled = on;
document.getElementById('spinner').style.display = on?'block':'none';
document.getElementById('btnText').textContent = on?'Generating...':'Generate Growth Plan 🌿';
}
function showError(msg) { const e=document.getElementById('errorMsg'); e.textContent=msg; e.style.display='block'; }
function hideError() { document.getElementById('errorMsg').style.display='none'; }
