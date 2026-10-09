import './style.css';

const state = {
  tab: 'Home',
  goalName: 'Car down payment',
  target: 200000,
  saved: 20000,
  months: 24,
  income: 32000,
  expenses: 12450,
  checked: new Set(),
  question: '',
  consent: true,
};
const modules = [
  { name: 'Home', icon: '⌂', subtitle: 'Your day at a glance' },
  { name: 'Finance', icon: '₹', subtitle: 'SpendSense' },
  { name: 'Health', icon: '♡', subtitle: 'Wellbeing habits' },
  { name: 'Fitness', icon: '↗', subtitle: 'Movement and progress' },
  { name: 'Learning', icon: '▤', subtitle: 'Education and career' },
  { name: 'Lifestyle', icon: '☷', subtitle: 'Tasks and routines' },
  { name: 'Security', icon: '◇', subtitle: 'Privacy and permissions' },
];
const tasks = ['Review today’s spending', 'Complete a learning session', 'Make time for movement'];
const fmt = n => '₹' + Math.max(0, Number(n) || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });
const icon = (glyph, cls='') => `<span class="glyph ${cls}" aria-hidden="true">${glyph}</span>`;
function navButton(m, bottom=false) {
  return `<button class="${state.tab === m.name ? 'active' : ''} ${bottom ? 'bottom-link' : 'module-link'}" data-tab="${m.name}">${icon(m.icon)}<span>${m.name}</span></button>`;
}
function render() {
  const remaining = Math.max(0, Number(state.target || 0) - Number(state.saved || 0));
  const monthly = Math.ceil(remaining / Math.max(1, Number(state.months) || 1));
  const progress = Number(state.target) > 0 ? Math.min(100, Math.round((Number(state.saved) / Number(state.target)) * 100)) : 0;
  const nav = modules.map(m => navButton(m)).join('');
  let content = '';
  if (state.tab === 'Home') content = `
    <section class="welcome"><p class="eyebrow">FRIDAY · YOUR PERSONAL SPACE</p><h1>Make today<br><span>count.</span></h1><p class="muted light">Your goals, plans and priorities in one place.</p></section>
    <section class="assistant-card"><div class="card-top">${icon('✦','lime')}<div><b>Your LifeOS assistant</b><small>Personalized planning · Demo mode</small></div></div><p>Start with one priority, make time for wellbeing, and keep your financial goals moving.</p><button class="primary-btn" data-tab="Assistant">Ask LifeOS <span>↗</span></button></section>
    <div class="section-head"><h2>Your modules</h2><span class="muted">Explore</span></div><div class="module-grid">${modules.filter(m=>m.name!=='Security').map(m=>`<button class="module-card" data-tab="${m.name}">${icon(m.icon)}<b>${m.name==='Finance'?'SpendSense':m.name}</b><small>${m.subtitle}</small><span class="card-arrow">↗</span></button>`).join('')}</div>
    <div class="section-head"><h2>Today's priorities</h2><span class="pill">${state.checked.size}/3 done</span></div><section class="task-card">${tasks.map((t,i)=>`<label class="task-row"><input type="checkbox" data-task="${i}" ${state.checked.has(i)?'checked':''}/><span class="task-check"></span><span>${t}</span></label>`).join('')}</section>
    <section class="insight-card"><div>${icon('✦','lime')}<b>Small steps matter</b></div><p>LifeOS brings your plans together so you can make progress without feeling overwhelmed.</p></section>`;
  else if (state.tab === 'Finance') content = `
    <div class="page-heading"><p class="eyebrow">PERSONAL FINANCE</p><h1>Spend<span>Sense.</span></h1><p class="muted">Understand your money. Plan what matters.</p></div>
    <section class="balance-card"><div class="card-top"><div><small>Sample monthly spending</small><h2>${fmt(state.expenses)}</h2></div><span class="pill light-pill">DEMO DATA</span></div><div class="balance-stats"><div><small>Monthly income</small><b>${fmt(state.income)}</b></div><div><small>Remaining after sample spend</small><b>${fmt(Math.max(0,state.income-state.expenses))}</b></div></div></section>
    <div class="section-head"><h2>Dream-to-Ownership</h2><span class="pill">Main feature</span></div><section class="form-card"><label>What are you saving for?<input id="goalName" value="${escapeHtml(state.goalName)}" maxlength="60" /></label><div class="form-grid"><label>Target amount (₹)<input id="target" type="number" min="0" value="${state.target}" /></label><label>Already saved (₹)<input id="saved" type="number" min="0" value="${state.saved}" /></label></div><label>Months to reach goal<input id="months" type="number" min="1" max="600" value="${state.months}" /></label><div class="goal-result"><small>Suggested monthly savings</small><strong>${fmt(monthly)}</strong><div class="progress-track"><span style="width:${progress}%"></span></div><div class="progress-labels"><span>${fmt(state.saved)} saved</span><span>${progress}%</span></div><p>${fmt(remaining)} left to reach your target. Estimate excludes interest, returns, fees and price changes.</p></div><button class="primary-btn full" id="saveGoal">Update goal <span>✓</span></button></section>
    <div class="section-head"><h2>Financial Health Score</h2><span class="pill">Concept</span></div><section class="score-card"><div class="score-ring"><strong>72</strong><small>/100</small></div><div class="score-copy"><b>Financial health overview</b><p>Budget consistency · Emergency savings · Goal progress</p><small>Illustrative score only; scoring rules are not yet defined.</small></div></section>
    <section class="insight-card"><div>${icon('✦','lime')}<b>Money insight</b></div><p>Set a realistic goal contribution after accounting for essential expenses and your emergency buffer.</p></section>`;
  else if (state.tab === 'Health') content = page('Health','EVERYDAY WELLBEING','Build sustainable wellbeing habits.','♡','Daily wellbeing','Record hydration, sleep and general wellness habits.','Reminders','Manage the health reminders you choose to set.','Health content is informational and does not replace professional medical care.');
  else if (state.tab === 'Fitness') content = page('Fitness','MOVEMENT & PROGRESS','Build consistency, one session at a time.','↗','Workout planner','Organize workouts, rest days and activity targets.','Progress tracker','Record activity and review your progress over time.','Plans should be adjusted to your abilities and needs.');
  else if (state.tab === 'Learning') content = page('Education & Career','LEARN WITH PURPOSE','Turn learning goals into manageable plans.','▤','Learning roadmap','Break a course or skill into milestones and study sessions.','Career goals','Track skills, projects and preparation tasks.','Your plan can adapt to deadlines and available study time.');
  else if (state.tab === 'Lifestyle') content = page('Lifestyle','YOUR TIME, ORGANIZED','Bring tasks, routines and personal goals together.','☷','Daily planner','Plan your day around your priorities.','Habits & reminders','Create routines and reminders you choose.','Keep plans realistic and easy to maintain.');
  else if (state.tab === 'Security') content = `<div class="page-heading"><p class="eyebrow">TRUST BY DESIGN</p><h1>Security &<br><span>privacy.</span></h1><p class="muted">You stay in control of your information.</p></div><section class="form-card security-list"><div class="security-row">${icon('◇')}<div><b>Demo mode</b><small>No bank, health or investment accounts are connected.</small></div><span class="status">ON</span></div><div class="security-row">${icon('⌑')}<div><b>Personalized recommendations</b><small>Toggle the local prototype preference.</small></div><label class="switch"><input id="consent" type="checkbox" ${state.consent?'checked':''}><span></span></label></div><div class="security-row">${icon('▣')}<div><b>Planned safeguards</b><small>Secure authentication, server-side access controls, encryption, revocable consent and audit history.</small></div></div><div class="notice">This prototype does not implement production security controls or store sensitive financial data. Those require engineering and security testing before release.</div></section>`;
  else if (state.tab === 'Assistant') content = `<div class="page-heading"><p class="eyebrow">YOUR INTELLIGENT COMPANION</p><h1>Ask <span>LifeOS.</span></h1><p class="muted">Describe what you want to plan.</p></div><section class="form-card"><label>What would you like help with?<textarea id="question" rows="4" maxlength="500" placeholder="Example: Help me balance saving for a car with my monthly expenses.">${escapeHtml(state.question)}</textarea></label><button class="primary-btn full" id="askBtn">Prepare request <span>↗</span></button><div id="answer" class="notice ${state.question ? '' : 'hidden'}">Request captured: “${escapeHtml(state.question)}”. A production assistant would use only permitted data to prepare a relevant response. This demo does not generate live AI answers.</div></section><div class="section-head"><h2>Try asking</h2></div><div class="suggestion-list"><button data-question="Help me plan a savings goal.">Help me plan a savings goal <span>↗</span></button><button data-question="Help me organize my study time.">Organize my study time <span>↗</span></button><button data-question="Suggest a balanced daily routine.">Suggest a balanced daily routine <span>↗</span></button></div>`;
  document.querySelector('#app').innerHTML = `<div class="app-shell"><header class="topbar"><button class="brand" data-tab="Home">${icon('◈','brand-mark')}<span>LifeOS<small>YOUR LIFE, IN SYNC</small></span></button><button class="avatar" data-tab="Security" aria-label="Open security settings">S</button></header><aside class="desktop-nav">${nav}</aside><main class="main-content">${content}</main><nav class="bottom-nav">${['Home','Finance','Assistant','Lifestyle','Security'].map(n=>navButton(modules.find(m=>m.name===n)||{name:n,icon:n==='Assistant'?'✦':n==='Security'?'◇':'☷'},true)).join('')}</nav><footer class="footer-note">LIFEOS PROTOTYPE <span>•</span> SAMPLE DATA ONLY</footer></div>`;
  bindEvents();
}
function page(title,eyebrow,subtitle,glyph,a,b,c,d,note){return `<div class="page-heading"><p class="eyebrow">${eyebrow}</p><h1>${title.split(' ')[0]} <span>${title.split(' ').slice(1).join(' ')}</span></h1><p class="muted">${subtitle}</p></div><section class="feature-tile">${icon(glyph,'large-icon')}<div><b>${a}</b><p>${b}</p></div></section><section class="feature-tile">${icon('✦','large-icon')}<div><b>${c}</b><p>${d}</p></div></section><div class="notice">${note}</div><button class="secondary-btn" data-tab="Home">← Back to Home</button>`;}
function escapeHtml(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function bindEvents(){
 document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{state.tab=b.dataset.tab;render();window.scrollTo({top:0,behavior:'smooth'});}));
 document.querySelectorAll('[data-task]').forEach(b=>b.addEventListener('change',()=>{const i=Number(b.dataset.task);b.checked?state.checked.add(i):state.checked.delete(i);render();}));
 const get=id=>document.getElementById(id);
 if(get('saveGoal')) get('saveGoal').addEventListener('click',()=>{state.goalName=get('goalName').value.trim()||'My dream goal';state.target=Math.max(0,Number(get('target').value)||0);state.saved=Math.max(0,Number(get('saved').value)||0);state.months=Math.min(600,Math.max(1,Number(get('months').value)||1));render();});
 if(get('consent')) get('consent').addEventListener('change',e=>{state.consent=e.target.checked;});
 if(get('askBtn')) get('askBtn').addEventListener('click',()=>{state.question=get('question').value.trim();render();});
 document.querySelectorAll('[data-question]').forEach(b=>b.addEventListener('click',()=>{state.question=b.dataset.question;render();}));
}
render();
