/* ===================== DATA ===================== */
let state = {
  view: 'dashboard',        // dashboard | incidents | ticket | create-modal-flag handled separately
  selectedTicket: null,
  showCreateModal: false,
  showNotifications: false,
  nextIdNum: 3,
  toast: null,
  userSearch: '',
  kbSearch: '',
  kbCategory: 'All',
  selectedArticle: null,
  settings: {
    emailNotif: true,
    desktopNotif: true,
    soundAlerts: false,
    autoAssign: true,
    weeklyDigest: true
  },
  notifications: [
    {time:'09:05', text:'INC-001 was assigned to Pamela S.', unread:false},
    {time:'08:44', text:'INC-002 was assigned to Pamela S.', unread:false}
  ],
  tickets: [
    {
      id: 'INC-001',
      user: 'Sarah Mokoena',
      email: 's.mokoena@company.co.za',
      category: 'Software',
      issue: 'Microsoft Teams is not connecting',
      description: 'Microsoft Teams is not connecting. The user reports that they cannot access Teams even though they are connected to the internet.',
      priority: 'Medium',
      assignedTo: 'Pamela S.',
      status: 'Open',
      created: 'Aug 11, 2026 · 09:02',
      flowType: 'software',
      flow: { started:false, step:0 },
      notes: [],
      resolution: '',
      timeline: [
        {time:'09:02', event:'Ticket created'},
        {time:'09:05', event:'Assigned to Pamela S.'}
      ]
    },
    {
      id: 'INC-002',
      user: 'Thabo Dlamini',
      email: 't.dlamini@company.co.za',
      category: 'Hardware',
      issue: 'Desktop computer will not power on',
      description: 'User\'s desktop computer does not power on when the power button is pressed. No lights or fan activity observed.',
      priority: 'High',
      assignedTo: 'Pamela S.',
      status: 'Open',
      created: 'Aug 11, 2026 · 08:41',
      flowType: 'hardware',
      flow: { started:false, step:0 },
      notes: [],
      resolution: '',
      timeline: [
        {time:'08:41', event:'Ticket created'},
        {time:'08:44', event:'Assigned to Pamela S.'}
      ]
    }
  ]
};

/* ===================== ICONS ===================== */
const ICONS = {
  dashboard:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>`,
  incidents:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  create:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  users:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  kb:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  reports:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  settings:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  search:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  bell:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  back:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  open:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  progress:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>`,
  resolved:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  total:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  wrench:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  clip:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>`,
  check:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  clock:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  note:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  x:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  mail:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z" opacity="0"/><path d="M22 6c0-1.1-.9-2-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6Z"/><polyline points="22 6 12 13 2 6"/></svg>`,
  briefcase:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  shield:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>`,
  arrowRight:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  globe:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/></svg>`,
  tag:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`
};

const NAV_ITEMS = [
  {key:'dashboard', label:'Dashboard', icon:ICONS.dashboard},
  {key:'incidents', label:'Incidents', icon:ICONS.incidents},
  {key:'create', label:'Create Ticket', icon:ICONS.create},
  {key:'users', label:'Users', icon:ICONS.users},
  {key:'kb', label:'Knowledge Base', icon:ICONS.kb},
  {key:'reports', label:'Reports', icon:ICONS.reports},
  {key:'settings', label:'Settings', icon:ICONS.settings},
];

const USERS = [
  {name:'Pamela S.', fullName:'Pamela Sibiya', email:'pamela.s@highend.co.za', role:'Technician', dept:'IT Support — First Line', status:'Active'},
  {name:'Naledi K.', fullName:'Naledi Khumalo', email:'naledi.k@highend.co.za', role:'Technician', dept:'IT Support — Second Line', status:'Active'},
  {name:'Sarah Mokoena', fullName:'Sarah Mokoena', email:'s.mokoena@company.co.za', role:'End User', dept:'Marketing', status:'Active'},
  {name:'Thabo Dlamini', fullName:'Thabo Dlamini', email:'t.dlamini@company.co.za', role:'End User', dept:'Finance', status:'Active'},
  {name:'Nomvula Zulu', fullName:'Nomvula Zulu', email:'n.zulu@company.co.za', role:'End User', dept:'Operations', status:'Active'},
  {name:'Johan van der Merwe', fullName:'Johan van der Merwe', email:'j.vandermerwe@company.co.za', role:'End User', dept:'Sales', status:'Away'}
];

const KB_ARTICLES = [
  {
    id:'KB-101', title:'Microsoft Teams fails to connect', category:'Software',
    tags:['teams','network','connectivity'], updated:'Jun 2, 2026',
    summary:'Resolving Teams connection failures when the network itself is online but the app cannot reach Microsoft servers.',
    content:`Symptoms: Teams shows a persistent "connecting" or "you're offline" state even though other internet-dependent apps work normally.

Steps:
1. Confirm the reported symptoms with the user and check whether other apps (browser, email) can reach the internet.
2. Run a network check to rule out a local connectivity issue.
3. Open Teams and attempt to reconnect — note the exact error shown.
4. Fully close Teams (including background processes) and reopen it.
5. Re-test the connection.
6. If the issue persists, clear the Teams cache folder and sign in again.

Root cause is most often a stuck local session cache rather than a real network outage.`
  },
  {
    id:'KB-102', title:"Desktop won't power on — no lights, no fan", category:'Hardware',
    tags:['power','desktop','cable'], updated:'May 14, 2026',
    summary:'Checklist for diagnosing a desktop workstation that shows zero signs of power.',
    content:`Symptoms: Pressing the power button produces no lights, no fan spin, and no POST beep.

Steps:
1. Confirm with the user that absolutely nothing happens when the power button is pressed.
2. Check the power cable is firmly seated at both the PSU and the wall socket.
3. Test the wall socket with another device, and check for a power indicator light on the PSU.
4. Reconnect any loose cable found and retest.
5. If the unit still won't power on, swap the power cable before escalating to a hardware replacement.

A loose or partially seated power cable accounts for the majority of "won't power on" tickets.`
  },
  {
    id:'KB-103', title:'Resetting a forgotten Active Directory password', category:'Account',
    tags:['password','active directory','login'], updated:'Jul 20, 2026',
    summary:'How to safely verify identity and reset a user\'s domain password.',
    content:`Steps:
1. Verify the user's identity using two agreed factors (employee ID plus a callback to their registered number).
2. Reset the password in Active Directory Users and Computers and set "user must change password at next logon".
3. Confirm the user can sign in and set a new password.
4. Log the reset in the ticket with the verification method used.

Never reset a password based on a chat message or email alone — always verify identity first.`
  },
  {
    id:'KB-104', title:"VPN client won't connect from home network", category:'Network',
    tags:['vpn','remote','network'], updated:'Jul 30, 2026',
    summary:'Common causes of VPN client failures for remote and hybrid staff.',
    content:`Steps:
1. Confirm the user's local internet connection is working outside the VPN client.
2. Check the VPN client shows the correct gateway/server address.
3. Restart the VPN client and attempt to reconnect.
4. Check the client software is on the current supported version — outdated clients are a frequent cause.
5. If it still fails, check whether the user's home router is blocking the VPN port and advise accordingly.`
  },
  {
    id:'KB-105', title:'Printer shows offline on shared network printer', category:'Hardware',
    tags:['printer','network'], updated:'Apr 9, 2026',
    summary:'Bringing a shared network printer back online for an office.',
    content:`Steps:
1. Confirm the printer's own display panel is not showing an error (paper jam, low toner, offline).
2. Ping the printer's IP address from the affected machine.
3. Restart the print spooler service on the affected machine.
4. Remove and re-add the printer if the spooler restart doesn't resolve it.
5. Power-cycle the printer itself as a last step before escalating.`
  },
  {
    id:'KB-106', title:'Outlook not syncing new emails', category:'Software',
    tags:['outlook','email','sync'], updated:'Aug 3, 2026',
    summary:'Fixes for delayed or fully stalled Outlook mail sync.',
    content:`Steps:
1. Confirm the user can access email via the web client — this isolates whether it's server-side or local.
2. Check Outlook's connection status in the bottom status bar for "Disconnected" or "Needs Password".
3. Restart Outlook fully (not just minimize).
4. Run Outlook in Safe Mode to rule out a misbehaving add-in.
5. As a last resort, rebuild the local OST file.`
  }
];

/* ===================== HELPERS ===================== */
function initials(name){
  return name.split(' ').map(p=>p[0]).slice(0,2).join('').toUpperCase();
}
function badgeClass(status){
  return {Open:'badge-open', 'In Progress':'badge-inprogress', Resolved:'badge-resolved', Closed:'badge-closed'}[status] || 'badge-open';
}
function priorityClass(p){
  return {High:'p-high', Medium:'p-medium', Low:'p-low'}[p] || 'p-medium';
}
function currentTimeStr(){
  const d = new Date();
  return d.toTimeString().slice(0,8); // HH:MM:SS — precise enough to show live progress
}
function counts(){
  const t = state.tickets;
  return {
    open: t.filter(x=>x.status==='Open').length,
    progress: t.filter(x=>x.status==='In Progress').length,
    resolved: t.filter(x=>x.status==='Resolved').length,
    total: t.length
  };
}
function showToast(msg){
  state.toast = msg;
  render();
  setTimeout(()=>{ state.toast = null; render(); }, 2600);
}
function findTicket(id){ return state.tickets.find(t=>t.id===id); }
function hasUnread(){ return state.notifications.some(n=>n.unread); }
function addNotification(text){
  state.notifications.unshift({time: currentTimeStr(), text: text, unread: true});
  if(state.notifications.length > 20) state.notifications.pop();
}

/* ===================== RENDER: SIDEBAR ===================== */
function renderSidebar(){
  const activeKey = (state.view==='ticket') ? 'incidents' : state.view;
  return `
  <div class="sidebar">
    <div class="brand">
      <div class="brand-mark">
        <div class="brand-icon">HD</div>
        <div>
          <div class="brand-name">HIGH END<br/>SERVICE DESK</div>
        </div>
      </div>
      <div class="brand-sub" style="margin-top:10px;">IT Support &amp; Incident Mgmt</div>
    </div>
    <div class="nav-section-label">Workspace</div>
    <ul class="nav-list">
      ${NAV_ITEMS.map(item=>`
        <li class="nav-item ${activeKey===item.key?'active':''}" onclick="handleNav('${item.key}')">
          ${item.icon}<span>${item.label}</span>
        </li>`).join('')}
    </ul>
    <div class="sidebar-footer">
      <div class="status-chip"><span class="status-dot"></span> All systems operational</div>
    </div>
  </div>`;
}

/* ===================== RENDER: TOPBAR ===================== */
function renderTopbar(){
  const titles = {
    dashboard:['Service Desk Dashboard',''],
    incidents:['Incidents','All logged tickets'],
    users:['Users','User directory'],
    kb:['Knowledge Base','Articles &amp; guides'],
    reports:['Reports','Performance overview'],
    settings:['Settings','Workspace configuration'],
    ticket:[state.selectedTicket?state.selectedTicket:'Ticket','Incident detail']
  };
  const [title, sub] = titles[state.view] || titles.dashboard;
  return `
  <div class="topbar">
    <div class="topbar-left">
      <h1>${title}</h1>
      ${sub?`<div class="breadcrumb">${sub}</div>`:''}
    </div>
    <div class="topbar-right">
      <div class="search-box">
        ${ICONS.search}
        <input type="text" placeholder="Search tickets..." oninput="handleSearch(this.value)"/>
      </div>
      <div class="notif-wrap">
        <div class="icon-btn" onclick="toggleNotifications(event)">
          ${hasUnread()?'<span class="notif-dot"></span>':''}${ICONS.bell}
        </div>
        ${renderNotifDropdown()}
      </div>
      <div class="profile" onclick="handleNav('settings')">
        <div class="avatar">PS</div>
        <div>
          <div class="profile-name">Pamela S.</div>
          <div class="profile-role">First Line Support</div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ===================== RENDER: CARDS ===================== */
function renderCards(){
  const c = counts();
  const cards = [
    {label:'Open Tickets', value:c.open, icon:ICONS.open, fg:'var(--amber)', bg:'var(--amber-bg)'},
    {label:'In Progress', value:c.progress, icon:ICONS.progress, fg:'var(--inprog)', bg:'var(--inprog-bg)'},
    {label:'Resolved', value:c.resolved, icon:ICONS.resolved, fg:'var(--green)', bg:'var(--green-bg)'},
    {label:'Total Incidents', value:c.total, icon:ICONS.total, fg:'var(--blue-dark)', bg:'var(--blue-light)'},
  ];
  return `<div class="cards-row">
    ${cards.map(c=>`
      <div class="stat-card">
        <div class="stat-top">
          <div class="stat-icon" style="background:${c.bg}; color:${c.fg};">${c.icon}</div>
        </div>
        <div class="stat-value">${c.value}</div>
        <div class="stat-label">${c.label}</div>
      </div>`).join('')}
  </div>`;
}

/* ===================== RENDER: TABLE ===================== */
function renderTable(filterText){
  let tickets = state.tickets;
  if(filterText){
    const f = filterText.toLowerCase();
    tickets = tickets.filter(t =>
      t.id.toLowerCase().includes(f) ||
      t.user.toLowerCase().includes(f) ||
      t.issue.toLowerCase().includes(f) ||
      t.category.toLowerCase().includes(f) ||
      t.assignedTo.toLowerCase().includes(f)
    );
  }
  return `
  <div class="panel">
    <div class="panel-head">
      <div>
        <h2>Incident Queue</h2>
        <div class="sub">${tickets.length} ticket${tickets.length!==1?'s':''}</div>
      </div>
      <button class="btn btn-primary" onclick="openCreateModal()">${ICONS.create}Create Ticket</button>
    </div>
    ${tickets.length === 0 ? `<div class="empty-note">No tickets match your search.</div>` : `
    <table>
      <thead>
        <tr>
          <th>Ticket ID</th><th>User</th><th>Category</th><th>Issue</th>
          <th>Priority</th><th>Assigned To</th><th>Created</th><th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${tickets.map(t=>`
          <tr onclick="openTicket('${t.id}')">
            <td class="ticket-id">${t.id}</td>
            <td>
              <div class="user-cell">
                <div class="user-dot">${initials(t.user)}</div>
                <span>${t.user}</span>
              </div>
            </td>
            <td>${t.category}</td>
            <td>${t.issue}</td>
            <td><span class="priority ${priorityClass(t.priority)}">${t.priority}</span></td>
            <td>${t.assignedTo}</td>
            <td class="mono" style="color:var(--text-muted); font-size:12px;">${t.created}</td>
            <td><span class="badge ${badgeClass(t.status)}"><span class="dot"></span>${t.status}</span></td>
          </tr>`).join('')}
      </tbody>
    </table>`}
  </div>`;
}

/* ===================== RENDER: TICKET DETAIL ===================== */
function renderTicketDetail(){
  const t = findTicket(state.selectedTicket);
  if(!t){ return `<div class="empty-note">Ticket not found.</div>`; }

  const isResolved = t.status === 'Resolved';
  const isClosed = t.status === 'Closed';
  const isOpen = t.status === 'Open';
  const isProgress = t.status === 'In Progress';

  return `
  <div class="back-link" onclick="handleNav('incidents')">${ICONS.back}Back to incident queue</div>

  <div class="detail-header">
    <div>
      <h2 class="mono">${t.id} <span style="font-family:'Inter';font-weight:700;">— ${t.issue}</span></h2>
      <div class="detail-meta">
        <span><b>Category:</b> ${t.category}</span>
        <span><b>Priority:</b> <span class="priority ${priorityClass(t.priority)}" style="display:inline-flex;">${t.priority}</span></span>
        <span><b>Reported by:</b> ${t.user}</span>
        <span><b>Created:</b> ${t.created}</span>
      </div>
    </div>
    <span class="badge ${badgeClass(t.status)}" style="font-size:12.5px; padding:6px 14px;"><span class="dot"></span>${t.status}</span>
  </div>

  <div class="detail-grid">
    <div>
      <div class="section-card">
        <h3>${ICONS.clip} Issue Description</h3>
        <div class="desc-text">${t.description}</div>
      </div>

      <div class="section-card">
        <h3>${ICONS.wrench} Live Troubleshooting</h3>
        ${renderLiveTroubleshooting(t)}
      </div>

      <div class="section-card">
        <h3>${ICONS.note} Technician Notes</h3>
        ${t.notes.length ? `<ul class="notes-list">
          ${t.notes.map(n=>`<li class="note-item"><div class="note-meta">${n.time} — Pamela S.</div>${n.text}</li>`).join('')}
        </ul>` : `<div class="no-resolution" style="margin-bottom:10px;">No technician notes added yet.</div>`}
        <button class="btn btn-outline" onclick="addNote('${t.id}')">${ICONS.note} Add Technician Note</button>
      </div>

      <div class="section-card">
        <h3>${ICONS.check} Resolution</h3>
        ${ (isResolved||isClosed) && t.resolution
          ? `<div class="resolution-box">${t.resolution}</div>`
          : `<div class="no-resolution">No resolution documented yet. Mark this ticket as resolved once the fix is confirmed.</div>`}
      </div>
    </div>

    <div>
      <div class="section-card">
        <h3>Ticket Info</h3>
        <ul class="info-list">
          <li><span class="lbl">Ticket ID</span><span class="val mono">${t.id}</span></li>
          <li><span class="lbl">User</span><span class="val">${t.user}</span></li>
          <li><span class="lbl">Assigned to</span><span class="val">${t.assignedTo}</span></li>
          <li><span class="lbl">Category</span><span class="val">${t.category}</span></li>
          <li><span class="lbl">Priority</span><span class="val">${t.priority}</span></li>
          <li><span class="lbl">Status</span><span class="val">${t.status}</span></li>
          <li><span class="lbl">Created</span><span class="val">${t.created}</span></li>
        </ul>
      </div>

      <div class="section-card">
        <h3>Technician Actions</h3>
        <div class="action-row">
          <button class="btn btn-outline" onclick="assignTicket('${t.id}')">${ICONS.users} Assign Ticket</button>
          <button class="btn btn-soft" onclick="startTroubleshooting('${t.id}')" ${!isOpen || t.flow.started?'disabled':''}>
            ${ICONS.wrench} Start Troubleshooting
          </button>
          <button class="btn btn-outline" onclick="addNote('${t.id}')">${ICONS.note} Add Technician Note</button>
          <button class="btn btn-green" onclick="markResolved('${t.id}')" ${isResolved||isClosed||!t.flow.readyToResolve?'disabled':''}>${ICONS.check} Mark as Resolved</button>
          <button class="btn btn-grey" onclick="closeTicket('${t.id}')" ${!isResolved?'disabled':''}>${ICONS.x} Close Ticket</button>
        </div>
      </div>

      <div class="section-card">
        <h3>${ICONS.clock} Activity Timeline</h3>
        <ul class="timeline">
          ${t.timeline.map(e=>`<li><div class="t-time mono">${e.time}</div><div class="t-event">${e.event}</div></li>`).join('')}
        </ul>
      </div>
    </div>
  </div>`;
}

/* ===================== RENDER: USERS ===================== */
function userTicketCounts(name, role){
  const field = role === 'Technician' ? 'assignedTo' : 'user';
  const open = state.tickets.filter(t=>t[field]===name && (t.status==='Open'||t.status==='In Progress')).length;
  const total = state.tickets.filter(t=>t[field]===name).length;
  return {open, total};
}
function renderUsers(){
  let users = USERS;
  const f = state.userSearch.trim().toLowerCase();
  if(f){
    users = users.filter(u =>
      u.name.toLowerCase().includes(f) ||
      u.email.toLowerCase().includes(f) ||
      u.dept.toLowerCase().includes(f) ||
      u.role.toLowerCase().includes(f)
    );
  }
  return `
  <div class="panel">
    <div class="panel-head">
      <div>
        <h2>User Directory</h2>
        <div class="sub">${users.length} account${users.length!==1?'s':''} · technicians &amp; end users</div>
      </div>
      <div class="search-box" style="width:260px;">
        ${ICONS.search}
        <input type="text" placeholder="Search users..." value="${state.userSearch}" oninput="handleUserSearch(this.value)"/>
      </div>
    </div>
    ${users.length === 0 ? `<div class="empty-note">No users match your search.</div>` : `
    <table>
      <thead>
        <tr>
          <th>Name</th><th>Role</th><th>Department</th><th>Email</th><th>Open Tickets</th><th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(u=>{
          const c = userTicketCounts(u.name, u.role);
          return `
          <tr onclick="handleUserClick('${u.name.replace(/'/g,"\\'")}')">
            <td>
              <div class="user-cell">
                <div class="user-dot">${initials(u.name)}</div>
                <span>${u.fullName}</span>
              </div>
            </td>
            <td><span class="role-chip ${u.role==='Technician'?'role-tech':'role-user'}">${u.role}</span></td>
            <td>${u.dept}</td>
            <td class="mono" style="font-size:12px; color:var(--text-muted);">${u.email}</td>
            <td>${c.open} open <span style="color:var(--text-faint);">/ ${c.total} total</span></td>
            <td><span class="status-pill ${u.status==='Away'?'away':''}"><span class="sp-dot"></span>${u.status}</span></td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>`}
  </div>`;
}
function handleUserSearch(val){
  state.userSearch = val;
  render();
}
function handleUserClick(name){
  searchFilter = name;
  state.view = 'incidents';
  render();
  window.scrollTo(0,0);
}

/* ===================== RENDER: KNOWLEDGE BASE ===================== */
function renderKB(){
  const cats = ['All', ...new Set(KB_ARTICLES.map(a=>a.category))];
  let articles = KB_ARTICLES;
  if(state.kbCategory !== 'All'){
    articles = articles.filter(a=>a.category === state.kbCategory);
  }
  const f = state.kbSearch.trim().toLowerCase();
  if(f){
    articles = articles.filter(a =>
      a.title.toLowerCase().includes(f) ||
      a.summary.toLowerCase().includes(f) ||
      a.tags.some(tag=>tag.includes(f))
    );
  }
  return `
  <div class="panel" style="padding:20px 20px 0;">
    <div class="kb-toolbar">
      <div class="search-box">
        ${ICONS.search}
        <input type="text" placeholder="Search articles, tags..." value="${state.kbSearch}" oninput="handleKbSearch(this.value)"/>
      </div>
      <select class="kb-cat-select" onchange="setKbCategory(this.value)">
        ${cats.map(c=>`<option value="${c}" ${state.kbCategory===c?'selected':''}>${c}</option>`).join('')}
      </select>
    </div>
  </div>
  <div style="height:18px;"></div>
  ${articles.length === 0 ? `<div class="panel"><div class="empty-note">No articles match your search.</div></div>` : `
  <div class="kb-grid">
    ${articles.map(a=>`
      <div class="kb-card" onclick="openArticle('${a.id}')">
        <div class="kb-card-top">
          <span class="kb-cat-tag">${a.category}</span>
        </div>
        <h4>${a.title}</h4>
        <p>${a.summary}</p>
        <div class="kb-tags">
          ${a.tags.map(t=>`<span class="kb-tag-chip">#${t}</span>`).join('')}
        </div>
        <div class="kb-card-foot" style="margin-top:14px;">
          <span>Updated ${a.updated}</span>
          <span class="kb-read">Read article ${ICONS.arrowRight}</span>
        </div>
      </div>`).join('')}
  </div>`}
  `;
}
function handleKbSearch(val){
  state.kbSearch = val;
  render();
}
function setKbCategory(val){
  state.kbCategory = val;
  render();
}
function openArticle(id){
  state.selectedArticle = id;
  render();
}
function closeArticle(){
  state.selectedArticle = null;
  render();
}
function renderArticleModal(){
  if(!state.selectedArticle) return '';
  const a = KB_ARTICLES.find(x=>x.id===state.selectedArticle);
  if(!a) return '';
  return `
  <div class="modal-overlay" onclick="if(event.target===this) closeArticle()">
    <div class="modal">
      <div class="modal-head">
        <div>
          <span class="kb-cat-tag" style="margin-bottom:8px; display:inline-flex;">${a.category}</span>
          <h3 style="margin-top:8px;">${a.title}</h3>
          <div class="sub">${a.id} · Updated ${a.updated}</div>
        </div>
        <button class="modal-close" onclick="closeArticle()">${ICONS.x}</button>
      </div>
      <div class="modal-body">
        <div class="kb-tags" style="margin-bottom:16px;">
          ${a.tags.map(t=>`<span class="kb-tag-chip">#${t}</span>`).join('')}
        </div>
        <div class="kb-article-body">${a.content}</div>
      </div>
    </div>
  </div>`;
}

/* ===================== RENDER: REPORTS ===================== */
function barRows(entries, colorVar){
  const max = Math.max(1, ...entries.map(e=>e.count));
  return entries.map(e=>`
    <div class="bar-row">
      <div class="bar-row-head"><span class="brh-label">${e.label}</span><span class="brh-count">${e.count}</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${(e.count/max*100).toFixed(0)}%; background:${e.color||colorVar};"></div></div>
    </div>`).join('');
}
function renderReports(){
  const tickets = state.tickets;
  const c = counts();

  const statusEntries = [
    {label:'Open', count: c.open, color:'var(--amber-dot)'},
    {label:'In Progress', count: c.progress, color:'var(--inprog-dot)'},
    {label:'Resolved', count: c.resolved, color:'var(--green-dot)'},
    {label:'Closed', count: tickets.filter(t=>t.status==='Closed').length, color:'var(--grey-dot)'}
  ];

  const categoryMap = {};
  tickets.forEach(t => categoryMap[t.category] = (categoryMap[t.category]||0)+1);
  const categoryEntries = Object.entries(categoryMap).map(([label,count])=>({label,count,color:'var(--blue)'}));

  const priorityMap = {High:0, Medium:0, Low:0};
  tickets.forEach(t => { priorityMap[t.priority] = (priorityMap[t.priority]||0)+1; });
  const priorityEntries = [
    {label:'High', count:priorityMap.High, color:'var(--red)'},
    {label:'Medium', count:priorityMap.Medium, color:'var(--amber-dot)'},
    {label:'Low', count:priorityMap.Low, color:'var(--green-dot)'}
  ];

  const techMap = {};
  tickets.forEach(t => techMap[t.assignedTo] = (techMap[t.assignedTo]||0)+1);
  const techEntries = Object.entries(techMap).map(([label,count])=>({label,count,color:'var(--blue-dark)'}));

  const closedCount = tickets.filter(t=>t.status==='Closed').length;
  const resolutionRate = tickets.length ? Math.round(((c.resolved+closedCount)/tickets.length)*100) : 0;

  return `
  <div class="cards-row">
    <div class="stat-card">
      <div class="stat-top"><div class="stat-icon" style="background:var(--blue-light); color:var(--blue-dark);">${ICONS.total}</div></div>
      <div class="stat-value">${c.total}</div>
      <div class="stat-label">Total Incidents</div>
    </div>
    <div class="stat-card">
      <div class="stat-top"><div class="stat-icon" style="background:var(--green-bg); color:var(--green);">${ICONS.resolved}</div></div>
      <div class="stat-value">${resolutionRate}%</div>
      <div class="stat-label">Resolution Rate</div>
    </div>
    <div class="stat-card">
      <div class="stat-top"><div class="stat-icon" style="background:var(--amber-bg); color:var(--amber);">${ICONS.open}</div></div>
      <div class="stat-value">${c.open}</div>
      <div class="stat-label">Awaiting Action</div>
    </div>
    <div class="stat-card">
      <div class="stat-top"><div class="stat-icon" style="background:var(--inprog-bg); color:var(--inprog);">${ICONS.progress}</div></div>
      <div class="stat-value">${c.progress}</div>
      <div class="stat-label">Being Worked</div>
    </div>
  </div>

  <div class="report-grid">
    <div class="section-card">
      <h3>${ICONS.reports} Tickets by Status</h3>
      ${barRows(statusEntries)}
    </div>
    <div class="section-card">
      <h3>${ICONS.tag} Tickets by Category</h3>
      ${categoryEntries.length ? barRows(categoryEntries) : `<div class="empty-note">No tickets logged yet.</div>`}
    </div>
    <div class="section-card">
      <h3>${ICONS.open} Tickets by Priority</h3>
      ${barRows(priorityEntries)}
    </div>
    <div class="section-card">
      <h3>${ICONS.users} Technician Workload</h3>
      ${techEntries.length ? barRows(techEntries) : `<div class="empty-note">No tickets assigned yet.</div>`}
    </div>
  </div>`;
}

/* ===================== RENDER: SETTINGS ===================== */
function toggleRow(key, title, sub){
  return `
    <div class="toggle-row">
      <div class="toggle-row-text">
        <div class="tr-title">${title}</div>
        <div class="tr-sub">${sub}</div>
      </div>
      <label class="toggle-switch">
        <input type="checkbox" ${state.settings[key] ? 'checked' : ''} onchange="toggleSetting('${key}')"/>
        <span class="toggle-slider"></span>
      </label>
    </div>`;
}
function renderSettings(){
  return `
  <div class="settings-grid">
    <div class="section-card settings-profile">
      <div class="settings-avatar">PS</div>
      <h4>Pamela Sibiya</h4>
      <div class="role">First Line Support Technician</div>
      <div class="settings-profile-row">${ICONS.mail}<span>pamela.s@highend.co.za</span></div>
      <div class="settings-profile-row">${ICONS.briefcase}<span>IT Support — First Line</span></div>
      <div class="settings-profile-row">${ICONS.shield}<span>Technician access</span></div>
    </div>

    <div>
      <div class="section-card">
        <h3>${ICONS.bell} Notifications</h3>
        ${toggleRow('emailNotif','Email notifications','Get emailed when a ticket is assigned to you.')}
        ${toggleRow('desktopNotif','Desktop notifications','Show a banner in this app for new activity.')}
        ${toggleRow('soundAlerts','Sound alerts','Play a sound when a new incident comes in.')}
        ${toggleRow('weeklyDigest','Weekly summary email','A Monday-morning recap of queue performance.')}
      </div>

      <div class="section-card">
        <h3>${ICONS.settings} Workflow</h3>
        ${toggleRow('autoAssign','Auto-assign new tickets to me','New incidents in your category route to you automatically.')}
        <ul class="info-list" style="margin-top:6px;">
          <li><span class="lbl">Default priority</span><span class="val">Medium</span></li>
          <li><span class="lbl">Ticket ID prefix</span><span class="val mono">INC-</span></li>
        </ul>
      </div>

      <div class="section-card">
        <h3>${ICONS.globe} Workspace</h3>
        <ul class="info-list">
          <li><span class="lbl">Organization</span><span class="val">High End Service Desk</span></li>
          <li><span class="lbl">Region</span><span class="val">Johannesburg, ZA</span></li>
          <li><span class="lbl">Time zone</span><span class="val">SAST (UTC+2)</span></li>
          <li><span class="lbl">Plan</span><span class="val">Enterprise</span></li>
        </ul>
      </div>
    </div>
  </div>`;
}
function toggleSetting(key){
  state.settings[key] = !state.settings[key];
  render();
  showToast((state.settings[key] ? 'Enabled: ' : 'Disabled: ') + key.replace(/([A-Z])/g,' $1').toLowerCase());
}

/* ===================== RENDER: CREATE MODAL ===================== */
function renderCreateModal(){
  if(!state.showCreateModal) return '';
  return `
  <div class="modal-overlay" onclick="if(event.target===this) closeCreateModal()">
    <div class="modal">
      <div class="modal-head">
        <div>
          <h3>Create Ticket</h3>
          <div class="sub">Log a new incident to the service desk queue</div>
        </div>
        <button class="modal-close" onclick="closeCreateModal()">${ICONS.x}</button>
      </div>
      <div class="modal-body">
        <form id="createForm" onsubmit="return false;">
          <div class="form-grid2">
            <div class="form-row">
              <label>User Name <span class="req">*</span></label>
              <input type="text" id="f-name" placeholder="e.g. Naledi Khumalo" required/>
            </div>
            <div class="form-row">
              <label>User Email <span class="req">*</span></label>
              <input type="email" id="f-email" placeholder="e.g. n.khumalo@company.co.za" required/>
            </div>
          </div>
          <div class="form-grid2">
            <div class="form-row">
              <label>Category <span class="req">*</span></label>
              <select id="f-category">
                <option>Hardware</option>
                <option>Software</option>
                <option>Network</option>
                <option>Access</option>
              </select>
            </div>
            <div class="form-row">
              <label>Priority <span class="req">*</span></label>
              <select id="f-priority">
                <option>Low</option>
                <option selected>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <label>Issue Title <span class="req">*</span></label>
            <input type="text" id="f-title" placeholder="Short summary of the issue" required/>
          </div>
          <div class="form-row">
            <label>Issue Description <span class="req">*</span></label>
            <textarea id="f-desc" placeholder="Describe the issue in detail..." required></textarea>
          </div>
          <div class="form-row">
            <label>Assigned Technician</label>
            <select id="f-assignee">
              <option>Pamela S.</option>
              <option>Unassigned</option>
            </select>
          </div>
        </form>
      </div>
      <div class="modal-foot">
        <button class="btn btn-outline" onclick="closeCreateModal()">Cancel</button>
        <button class="btn btn-primary" onclick="submitTicket()">${ICONS.check} Submit Ticket</button>
      </div>
    </div>
  </div>`;
}

/* ===================== RENDER: NOTIFICATIONS ===================== */
function renderNotifDropdown(){
  if(!state.showNotifications) return '';
  return `
  <div class="notif-dropdown" onclick="event.stopPropagation()">
    <div class="notif-dropdown-head">
      <h4>Notifications</h4>
      <span>${state.notifications.length} total</span>
    </div>
    ${state.notifications.length === 0 ? `<div class="notif-empty">You're all caught up.</div>` : `
    <ul class="notif-list">
      ${state.notifications.map(n=>`
        <li>
          <span class="n-dot" style="${n.unread?'':'background:var(--grey-dot);'}"></span>
          <div class="n-body">
            <div class="n-text">${n.text}</div>
            <div class="n-time">${n.time}</div>
          </div>
        </li>`).join('')}
    </ul>`}
  </div>`;
}
function toggleNotifications(e){
  if(e) e.stopPropagation();
  state.showNotifications = !state.showNotifications;
  if(state.showNotifications){
    state.notifications.forEach(n=>n.unread=false);
  }
  render();
}

/* ===================== RENDER: TOAST ===================== */
function renderToast(){
  if(!state.toast) return '';
  return `<div class="toast">${ICONS.check}${state.toast}</div>`;
}

/* ===================== MAIN RENDER ===================== */
let searchFilter = '';
function render(){
  let mainContent = '';
  if(state.view === 'dashboard'){
    mainContent = renderCards() + renderTable(searchFilter);
  } else if(state.view === 'incidents'){
    mainContent = renderTable(searchFilter);
  } else if(state.view === 'ticket'){
    mainContent = renderTicketDetail();
  } else if(state.view === 'users'){
    mainContent = renderUsers();
  } else if(state.view === 'kb'){
    mainContent = renderKB();
  } else if(state.view === 'reports'){
    mainContent = renderReports();
  } else if(state.view === 'settings'){
    mainContent = renderSettings();
  }

  document.getElementById('app').innerHTML = `
    ${renderSidebar()}
    <div class="main">
      ${renderTopbar()}
      <div class="content">${mainContent}</div>
    </div>
    ${renderCreateModal()}
    ${renderArticleModal()}
    ${renderToast()}
  `;
}

/* ===================== ACTIONS ===================== */
function handleNav(key){
  if(key === 'create'){ openCreateModal(); return; }
  searchFilter = '';
  state.view = key;
  state.selectedTicket = null;
  state.selectedArticle = null;
  render();
  window.scrollTo(0,0);
}
function handleSearch(val){
  searchFilter = val;
  render();
}
function openTicket(id){
  state.selectedTicket = id;
  state.view = 'ticket';
  render();
  window.scrollTo(0,0);
}
function openCreateModal(){
  state.showCreateModal = true;
  render();
}
function closeCreateModal(){
  state.showCreateModal = false;
  render();
}
function submitTicket(){
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const category = document.getElementById('f-category').value;
  const title = document.getElementById('f-title').value.trim();
  const desc = document.getElementById('f-desc').value.trim();
  const priority = document.getElementById('f-priority').value;
  const assignee = document.getElementById('f-assignee').value;

  if(!name || !email || !title || !desc){
    showToast('Please complete all required fields.');
    return;
  }

  const idNum = String(state.nextIdNum).padStart(3,'0');
  const newTicket = {
    id: 'INC-' + idNum,
    user: name,
    email: email,
    category: category,
    issue: title,
    description: desc,
    priority: priority,
    assignedTo: assignee,
    status: 'Open',
    created: 'Aug 11, 2026 · ' + currentTimeStr(),
    flowType: 'generic',
    flow: { started:false, step:0 },
    notes: [],
    resolution: '',
    timeline: [{time: currentTimeStr(), event:'Ticket created'}]
  };
  if(assignee !== 'Unassigned'){
    newTicket.timeline.push({time: currentTimeStr(), event:'Assigned to ' + assignee});
  }
  state.tickets.unshift(newTicket);
  state.nextIdNum++;
  state.showCreateModal = false;
  state.view = 'incidents';
  addNotification('New ticket ' + newTicket.id + ' logged: ' + newTicket.issue + '.');
  render();
  showToast(newTicket.id + ' created successfully.');
}

function assignTicket(id){
  const t = findTicket(id);
  t.timeline.push({time: currentTimeStr(), event:'Reassigned to ' + t.assignedTo});
  addNotification(id + ' reassigned to ' + t.assignedTo + '.');
  render();
  showToast('Ticket ' + id + ' assigned to ' + t.assignedTo + '.');
}

function addNote(id){
  const text = prompt('Enter technician note:');
  if(!text || !text.trim()) return;
  const t = findTicket(id);
  t.notes.push({time: currentTimeStr(), text: text.trim()});
  t.timeline.push({time: currentTimeStr(), event:'Technician note added'});
  render();
  showToast('Note added to ' + id + '.');
}
function markResolved(id){
  const t = findTicket(id);
  if(!t || t.status === 'Resolved' || t.status === 'Closed') return;
  if(!t.flow.readyToResolve) return; // must complete the live troubleshooting flow first
  t.status = 'Resolved';
  t.timeline.push({time: currentTimeStr(), event:'Ticket marked as resolved.'});
  t.flow.step = 'resolved';
  addNotification(id + ' was marked as Resolved.');
  render();
  showToast(id + ' marked as Resolved.');
}
function closeTicket(id){
  const t = findTicket(id);
  if(!t || t.status !== 'Resolved') return;
  t.status = 'Closed';
  t.timeline.push({time: currentTimeStr(), event:'Ticket closed.'});
  t.flow.step = 'closed';
  addNotification(id + ' was closed.');
  render();
  showToast(id + ' closed.');
}

/* ===================== LIVE TROUBLESHOOTING ENGINE ===================== */
/* Generic entry point: every ticket starts "not started" and progresses one
   manually-confirmed technician action at a time. Nothing here auto-advances
   or auto-resolves — every step requires a click from the technician. */

function startTroubleshooting(id){
  const t = findTicket(id);
  if(!t || t.status !== 'Open') return;
  t.status = 'In Progress';
  t.flow.started = true;
  t.flow.step = 1;
  t.timeline.push({time: currentTimeStr(), event:'Troubleshooting started'});
  render();
  showToast('Troubleshooting started on ' + id + '.');
}

function renderLiveTroubleshooting(t){
  if(!t.flow.started){
    return `
      <div class="flow-idle">
        <div class="flow-idle-icon">${ICONS.wrench}</div>
        <h4>Troubleshooting not started</h4>
        <p>Begin the guided diagnostic process to work this incident step-by-step.</p>
        <button class="btn btn-primary" onclick="startTroubleshooting('${t.id}')" ${t.status!=='Open'?'disabled':''}>${ICONS.wrench} Start Troubleshooting</button>
      </div>`;
  }
  if(t.flowType === 'software') return renderSoftwareFlow(t);
  if(t.flowType === 'hardware') return renderHardwareFlow(t);
  return renderGenericFlow(t);
}

/* Shared chip/progress-bar renderer for a bucketed step list */
function renderFlowShell(t, buckets, currentBucket, doneCount, bodyHtml){
  const pct = Math.round((doneCount / buckets.length) * 100);
  const displayStep = Math.min(doneCount >= buckets.length ? buckets.length : currentBucket + 1, buckets.length);
  const chips = buckets.map((label, i) => {
    let cls = 'locked';
    if(i < doneCount) cls = 'done';
    else if(i === currentBucket) cls = 'current';
    const icon = cls==='done' ? ICONS.check : '';
    return `<div class="flow-step-chip ${cls}"><span class="fsc-dot">${icon}</span>${label}</div>`;
  }).join('');
  return `
    <div class="flow-progress-head">
      <span class="flow-progress-label">Current Step</span>
      <span class="flow-progress-count">${displayStep} of ${buckets.length}</span>
    </div>
    <div class="flow-progress-bar"><div class="flow-progress-fill" style="width:${pct}%"></div></div>
    <div class="flow-steps">${chips}</div>
    ${bodyHtml}
  `;
}

/* ---------- SOFTWARE FLOW (INC-001 style) ---------- */
const SW_BUCKETS = ['Gather Information','Check Internet','Test Teams','Restart Teams','Retest','Document Resolution','Confirm with User','Resolve & Close'];

function swBucketInfo(t){
  const s = t.flow.step;
  let doneCount, currentBucket;
  if(s >= 1 && s <= 7){ doneCount = s - 1; currentBucket = s - 1; }
  else if(s === 8){ doneCount = 7; currentBucket = 7; }
  else if(s === 'resolved'){ doneCount = 7; currentBucket = 7; }
  else if(s === 'closed'){ doneCount = 8; currentBucket = 7; }
  else { doneCount = 0; currentBucket = 0; }
  return {doneCount, currentBucket};
}

function renderSoftwareFlow(t){
  const {doneCount, currentBucket} = swBucketInfo(t);
  let body = '';
  const s = t.flow.step;

  if(s === 1){
    body = `
      <div class="flow-card">
        <div class="flow-step-eyebrow">Step 1 — Gather Information</div>
        <div class="flow-step-title">Confirm the symptoms reported by the user.</div>
        ${t.flow.confirmed ? `
        <div class="flow-step-body">User confirms that Microsoft Teams cannot connect.</div>
        <div class="flow-actions"><button class="btn btn-primary" onclick="swContinue('${t.id}',2)">Continue</button></div>
        ` : `
        <div class="flow-actions"><button class="btn btn-primary" onclick="swConfirmSymptoms('${t.id}')">${ICONS.check} Confirm User Report</button></div>
        `}
      </div>`;
  } else if(s === 2){
    body = `
      <div class="flow-card">
        <div class="flow-step-eyebrow">Step 2 — Check Internet Connectivity</div>
        <div class="flow-step-title">Before troubleshooting the application, verify that the computer has an active internet connection.</div>
        ${t.flow.networkChecked ? `
        <div class="flow-result">
          <div class="fr-title">Network Test Result</div>
          <div class="flow-result-row"><span class="frl">Internet Connection</span><span class="frv frv-ok">Connected</span></div>
          <div class="flow-result-row"><span class="frl">Status</span><span class="frv frv-ok">Normal</span></div>
        </div>
        <div class="flow-step-body">Internet connectivity is working.</div>
        <div class="flow-actions"><button class="btn btn-primary" onclick="swContinue('${t.id}',3)">Continue</button></div>
        ` : `
        <div class="flow-actions"><button class="btn btn-primary" onclick="swRunNetworkCheck('${t.id}')">${ICONS.wrench} Run Network Test</button></div>
        `}
      </div>`;
  } else if(s === 3){
    body = `
      <div class="flow-card">
        <div class="flow-step-eyebrow">Step 3 — Test Microsoft Teams</div>
        <div class="flow-step-title">Open Microsoft Teams and test the connection.</div>
        ${t.flow.teamsTested ? `
        <div class="flow-result">
          <div class="fr-title">Teams Connection Test</div>
          <div class="flow-result-row"><span class="frl">Status</span><span class="frv frv-bad">Failed</span></div>
          <div class="flow-result-row"><span class="frl">Result</span><span class="frv frv-bad">Unable to connect</span></div>
        </div>
        <div class="flow-step-body">Teams is still unable to connect.</div>
        <div class="flow-actions"><button class="btn btn-primary" onclick="swContinue('${t.id}',4)">Continue</button></div>
        ` : `
        <div class="flow-actions"><button class="btn btn-primary" onclick="swTestTeams('${t.id}')">${ICONS.wrench} Test Teams Connection</button></div>
        `}
      </div>`;
  } else if(s === 4){
    body = `
      <div class="flow-card">
        <div class="flow-step-eyebrow">Step 4 — Restart Microsoft Teams</div>
        <div class="flow-step-title">Restart Microsoft Teams.</div>
        ${t.flow.teamsClosed ? `<div class="flow-result"><div class="flow-result-row"><span class="frl">Microsoft Teams</span><span class="frv">Closed</span></div></div><div class="flow-step-body">Microsoft Teams has been closed.</div>` : ''}
        ${t.flow.teamsReopened ? `<div class="flow-result"><div class="flow-result-row"><span class="frl">Microsoft Teams</span><span class="frv frv-ok">Restarted</span></div></div>
        <div class="flow-step-body">Microsoft Teams has been restarted.</div>
        <div class="flow-actions"><button class="btn btn-primary" onclick="swContinue('${t.id}',5)">Continue</button></div>` : `
        <div class="flow-actions">
          <button class="btn btn-outline" onclick="swCloseTeams('${t.id}')" ${t.flow.teamsClosed?'disabled':''}>${ICONS.x} Close Teams</button>
          <button class="btn btn-primary" onclick="swReopenTeams('${t.id}')" ${!t.flow.teamsClosed?'disabled':''}>${ICONS.wrench} Reopen Teams</button>
        </div>`}
      </div>`;
  } else if(s === 5){
    body = `
      <div class="flow-card">
        <div class="flow-step-eyebrow">Step 5 — Test Connection Again</div>
        <div class="flow-step-title">Test the Teams connection again after restarting the application.</div>
        ${t.flow.retested ? `
        <div class="flow-result">
          <div class="fr-title">Teams Connection Test</div>
          <div class="flow-result-row"><span class="frl">Status</span><span class="frv frv-ok">Connected</span></div>
          <div class="flow-result-row"><span class="frl">Result</span><span class="frv frv-ok">Successful</span></div>
        </div>
        <div class="flow-step-body">Microsoft Teams is now connecting successfully.</div>
        <div class="flow-actions"><button class="btn btn-primary" onclick="swContinue('${t.id}',6)">Continue</button></div>
        ` : `
        <div class="flow-actions"><button class="btn btn-primary" onclick="swRetest('${t.id}')">${ICONS.wrench} Run Connection Test</button></div>
        `}
      </div>`;
  } else if(s === 6){
    body = `
      <div class="flow-card">
        <div class="flow-step-eyebrow">Step 6 — Document Resolution</div>
        <div class="flow-step-title">Document the troubleshooting performed.</div>
        <div class="flow-note-box">
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:6px;">Technician Note</label>
          <textarea id="sw-note-${t.id}" placeholder="e.g. Checked internet connectivity, tested Microsoft Teams, restarted the application and verified that the Teams connection was successfully restored.">${t.flow.noteText||''}</textarea>
        </div>
        <div class="flow-actions"><button class="btn btn-primary" onclick="swSaveNote('${t.id}')">${ICONS.note} Save Technician Note</button></div>
      </div>`;
  } else if(s === 7){
    body = `
      <div class="flow-card">
        <div class="flow-step-eyebrow">Step 7 — User Confirmation</div>
        <div class="flow-step-title">Confirm with the user that the issue has been resolved.</div>
        ${t.flow.userChoice === 'resolved' ? `<div class="flow-step-body">Resolution confirmed by user.</div>` : ''}
        <div class="flow-actions">
          <button class="btn btn-green" onclick="swUserConfirm('${t.id}', true)">${ICONS.check} User Confirms Resolution</button>
          <button class="btn btn-outline" onclick="swUserConfirm('${t.id}', false)">Issue Still Occurring</button>
        </div>
      </div>`;
  } else if(s === 8){
    body = `
      <div class="flow-ready-banner">${ICONS.check}<span>All troubleshooting steps complete — ready to mark this ticket as Resolved.</span></div>
      <div class="flow-actions"><button class="btn btn-green" onclick="markResolved('${t.id}')">${ICONS.check} Mark as Resolved</button></div>`;
  } else if(s === 'resolved'){
    body = `
      <div class="flow-ready-banner">${ICONS.check}<span>Ticket marked as Resolved — ready to close once confirmed with the user.</span></div>
      <div class="flow-actions"><button class="btn btn-grey" onclick="closeTicket('${t.id}')">${ICONS.x} Close Ticket</button></div>`;
  } else if(s === 'closed'){
    body = `<div class="flow-done-banner">${ICONS.check}<span>Incident resolved and closed. Full lifecycle complete.</span></div>`;
  }

  return renderFlowShell(t, SW_BUCKETS, currentBucket, doneCount, body);
}

function swConfirmSymptoms(id){
  const t = findTicket(id); if(!t || t.flow.step !== 1) return;
  t.flow.confirmed = true;
  t.timeline.push({time: currentTimeStr(), event:'User symptoms confirmed.'});
  render();
}
function swRunNetworkCheck(id){
  const t = findTicket(id); if(!t || t.flow.step !== 2) return;
  t.flow.networkChecked = true;
  t.timeline.push({time: currentTimeStr(), event:'Internet connectivity verified.'});
  render();
}
function swTestTeams(id){
  const t = findTicket(id); if(!t || t.flow.step !== 3) return;
  t.flow.teamsTested = true;
  t.timeline.push({time: currentTimeStr(), event:'Teams connection test failed.'});
  render();
}
function swCloseTeams(id){
  const t = findTicket(id); if(!t || t.flow.step !== 4) return;
  t.flow.teamsClosed = true;
  t.timeline.push({time: currentTimeStr(), event:'Microsoft Teams closed.'});
  render();
}
function swReopenTeams(id){
  const t = findTicket(id); if(!t || t.flow.step !== 4 || !t.flow.teamsClosed) return;
  t.flow.teamsReopened = true;
  t.timeline.push({time: currentTimeStr(), event:'Microsoft Teams restarted.'});
  render();
}
function swRetest(id){
  const t = findTicket(id); if(!t || t.flow.step !== 5) return;
  t.flow.retested = true;
  t.timeline.push({time: currentTimeStr(), event:'Teams connection restored.'});
  render();
}
function swSaveNote(id){
  const t = findTicket(id); if(!t || t.flow.step !== 6) return;
  const el = document.getElementById('sw-note-' + id);
  const text = (el && el.value.trim()) || '';
  if(!text){ showToast('Enter a technician note before saving.'); return; }
  t.notes.push({time: currentTimeStr(), text: text});
  t.resolution = 'Microsoft Teams was restarted and the connection was successfully restored.';
  t.timeline.push({time: currentTimeStr(), event:'Technician note added.'});
  t.flow.noteSaved = true;
  t.flow.step = 7;
  render();
  showToast('Technician note saved.');
}
function swUserConfirm(id, resolved){
  const t = findTicket(id); if(!t || t.flow.step !== 7) return;
  if(resolved){
    t.flow.userChoice = 'resolved';
    t.timeline.push({time: currentTimeStr(), event:'User confirmed issue resolved.'});
    t.flow.step = 8;
    t.flow.readyToResolve = true;
  } else {
    t.flow.userChoice = 'issue';
    showToast('User still experiencing the issue — continue investigating.');
  }
  render();
}
function swContinue(id, nextStep){
  const t = findTicket(id); if(!t) return;
  t.flow.step = nextStep;
  render();
}

/* ---------- HARDWARE FLOW (INC-002 style) ---------- */
const HW_BUCKETS = ['Gather Information','Check Power Source','Check Power Cable','Reconnect Cable','Test the Device','Verify with User','Document Resolution','Resolve & Close'];

function hwBucketInfo(t){
  const s = t.flow.step;
  let doneCount, currentBucket;
  if(s >= 1 && s <= 7){ doneCount = s - 1; currentBucket = s - 1; }
  else if(s === 8){ doneCount = 7; currentBucket = 7; }
  else if(s === 'resolved'){ doneCount = 7; currentBucket = 7; }
  else if(s === 'closed'){ doneCount = 8; currentBucket = 7; }
  else { doneCount = 0; currentBucket = 0; }
  return {doneCount, currentBucket};
}

function renderHardwareFlow(t){
  const {doneCount, currentBucket} = hwBucketInfo(t);
  let body = '';
  const s = t.flow.step;

  if(s === 1){
    body = `
      <div class="flow-card">
        <div class="flow-step-eyebrow">Step 1 — Gather Information</div>
        <div class="flow-step-title">The user reports that the desktop computer will not power on.</div>
        <div class="flow-actions">
          <button class="btn btn-primary" onclick="hwConfirmSymptoms('${t.id}')">${ICONS.check} Confirm User Symptoms</button>
        </div>
      </div>`;
  } else if(s === 2){
    body = `
      <div class="flow-card">
        <div class="flow-step-eyebrow">Step 2 — Check Power Source</div>
        <div class="flow-step-title">Verify that the computer is receiving power.</div>
        ${t.flow.socketChecked ? `
        <div class="flow-step-body">Power source appears to be working.</div>
        <div class="flow-actions"><button class="btn btn-primary" onclick="swHwContinue('${t.id}',3)">Continue</button></div>
        ` : `
        <div class="flow-actions"><button class="btn btn-primary" onclick="hwCheckSocket('${t.id}')">${ICONS.wrench} Check Wall Socket</button></div>
        `}
      </div>`;
  } else if(s === 3){
    body = `
      <div class="flow-card">
        <div class="flow-step-eyebrow">Step 3 — Check Power Cable</div>
        <div class="flow-step-title">Inspect the computer's power cable and connection.</div>
        ${t.flow.cableStatus === 'loose' ? `
        <div class="flow-step-body">Possible cause identified: loose power connection.</div>
        <div class="flow-actions"><button class="btn btn-primary" onclick="swHwContinue('${t.id}',4)">Continue</button></div>
        ` : `
        <div class="flow-actions">
          <button class="btn btn-outline" onclick="hwCheckCable('${t.id}','connected')">Cable Connected Correctly</button>
          <button class="btn btn-primary" onclick="hwCheckCable('${t.id}','loose')">Cable Is Loose</button>
        </div>`}
      </div>`;
  } else if(s === 4){
    body = `
      <div class="flow-card">
        <div class="flow-step-eyebrow">Step 4 — Apply Corrective Action</div>
        <div class="flow-step-title">Reconnect the power cable securely.</div>
        ${t.flow.cableReconnected ? `
        <div class="flow-step-body">Power cable successfully reconnected.</div>
        <div class="flow-actions"><button class="btn btn-primary" onclick="swHwContinue('${t.id}',5)">Continue</button></div>
        ` : `
        <div class="flow-actions"><button class="btn btn-primary" onclick="hwReconnectCable('${t.id}')">${ICONS.wrench} Reconnect Power Cable</button></div>
        `}
      </div>`;
  } else if(s === 5){
    body = `
      <div class="flow-card">
        <div class="flow-step-eyebrow">Step 5 — Test the Device</div>
        <div class="flow-step-title">Attempt to power on the computer.</div>
        ${t.flow.powerTested ? `
        <div class="flow-result">
          <div class="fr-title">Power Test</div>
          <div class="flow-result-row"><span class="frl">Power</span><span class="frv frv-ok">ON</span></div>
          <div class="flow-result-row"><span class="frl">Startup</span><span class="frv frv-ok">Successful</span></div>
        </div>
        <div class="flow-actions"><button class="btn btn-primary" onclick="swHwContinue('${t.id}',6)">Continue</button></div>
        ` : `
        <div class="flow-actions"><button class="btn btn-primary" onclick="hwPowerOnTest('${t.id}')">${ICONS.wrench} Power On Computer</button></div>
        `}
      </div>`;
  } else if(s === 6){
    body = `
      <div class="flow-card">
        <div class="flow-step-eyebrow">Step 6 — Verify with User</div>
        <div class="flow-step-title">Confirm that the user can access the computer.</div>
        ${t.flow.userChoice === 'resolved' ? `<div class="flow-step-body">User confirmed successful operation.</div>` : ''}
        <div class="flow-actions">
          <button class="btn btn-green" onclick="hwUserConfirm('${t.id}', true)">${ICONS.check} User Confirms Device Working</button>
        </div>
      </div>`;
  } else if(s === 7){
    body = `
      <div class="flow-card">
        <div class="flow-step-eyebrow">Step 7 — Document Resolution</div>
        <div class="flow-step-title">Root cause and resolution</div>
        <div class="flow-result">
          <div class="fr-title">Root Cause</div>
          <div class="flow-step-body" style="margin-bottom:0;">Loose power cable connection.</div>
        </div>
        <div class="flow-result">
          <div class="fr-title">Resolution</div>
          <div class="flow-step-body" style="margin-bottom:0;">Power cable was securely reconnected and the computer powered on successfully.</div>
        </div>
        <div class="flow-note-box">
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:6px;">Technician Note</label>
          <textarea id="hw-note-${t.id}" placeholder="e.g. Checked the power connection and identified a loose power cable. Reconnected the cable and confirmed successful system startup.">${t.flow.noteText||''}</textarea>
        </div>
        <div class="flow-actions"><button class="btn btn-primary" onclick="hwSaveNote('${t.id}')">${ICONS.note} Save Technician Note</button></div>
      </div>`;
  } else if(s === 8){
    body = `
      <div class="flow-ready-banner">${ICONS.check}<span>All troubleshooting steps complete — ready to mark this ticket as Resolved.</span></div>
      <div class="flow-actions"><button class="btn btn-green" onclick="markResolved('${t.id}')">${ICONS.check} Mark as Resolved</button></div>`;
  } else if(s === 'resolved'){
    body = `
      <div class="flow-ready-banner">${ICONS.check}<span>Ticket marked as Resolved — ready to close once confirmed with the user.</span></div>
      <div class="flow-actions"><button class="btn btn-grey" onclick="closeTicket('${t.id}')">${ICONS.x} Close Ticket</button></div>`;
  } else if(s === 'closed'){
    body = `<div class="flow-done-banner">${ICONS.check}<span>Incident resolved and closed. Full lifecycle complete.</span></div>`;
  }

  return renderFlowShell(t, HW_BUCKETS, currentBucket, doneCount, body);
}

function hwConfirmSymptoms(id){
  const t = findTicket(id); if(!t || t.flow.step !== 1) return;
  t.flow.confirmed = true;
  t.timeline.push({time: currentTimeStr(), event:'User symptoms confirmed.'});
  t.flow.step = 2;
  render();
}
function hwCheckSocket(id){
  const t = findTicket(id); if(!t || t.flow.step !== 2) return;
  t.flow.socketChecked = true;
  t.timeline.push({time: currentTimeStr(), event:'Power source checked — working.'});
  render();
}
function hwCheckCable(id, status){
  const t = findTicket(id); if(!t || t.flow.step !== 3) return;
  if(status === 'connected'){
    showToast('Cable appears connected — inspect other connection points.');
    return;
  }
  t.flow.cableStatus = 'loose';
  t.timeline.push({time: currentTimeStr(), event:'Power cable found to be loose.'});
  render();
}
function hwReconnectCable(id){
  const t = findTicket(id); if(!t || t.flow.step !== 4) return;
  t.flow.cableReconnected = true;
  t.timeline.push({time: currentTimeStr(), event:'Power cable reconnected.'});
  render();
}
function hwPowerOnTest(id){
  const t = findTicket(id); if(!t || t.flow.step !== 5) return;
  t.flow.powerTested = true;
  t.timeline.push({time: currentTimeStr(), event:'Computer powered on successfully.'});
  render();
}
function hwUserConfirm(id, resolved){
  const t = findTicket(id); if(!t || t.flow.step !== 6) return;
  t.flow.userChoice = 'resolved';
  t.timeline.push({time: currentTimeStr(), event:'User confirmed successful operation.'});
  t.flow.step = 7;
  render();
}
function hwSaveNote(id){
  const t = findTicket(id); if(!t || t.flow.step !== 7) return;
  const el = document.getElementById('hw-note-' + id);
  const text = (el && el.value.trim()) || '';
  if(!text){ showToast('Enter a technician note before saving.'); return; }
  t.notes.push({time: currentTimeStr(), text: text});
  t.resolution = 'Power cable was securely reconnected and the computer powered on successfully.';
  t.timeline.push({time: currentTimeStr(), event:'Technician note added.'});
  t.flow.noteSaved = true;
  t.flow.step = 8;
  t.flow.readyToResolve = true;
  render();
  showToast('Technician note saved.');
}
function swHwContinue(id, nextStep){
  const t = findTicket(id); if(!t) return;
  t.flow.step = nextStep;
  render();
}

/* ---------- GENERIC FLOW (for newly-created tickets) ---------- */
const GENERIC_BUCKETS = ['Gather Information','Investigate','Apply Fix','Verify Fix'];
const GENERIC_STEPS = [
  {title:'Gather Information', body:'Confirm the reported symptoms with the user before investigating further.', btn:'Confirm symptoms with user', event:'Technician confirmed reported symptoms.'},
  {title:'Investigate', body:'Review logs and reproduce the issue to identify a likely root cause.', btn:'Run investigation', event:'Technician identified a likely root cause.'},
  {title:'Apply Fix', body:'Apply the corrective action for the identified issue.', btn:'Apply fix', event:'Technician applied a corrective fix.'},
  {title:'Verify Fix', body:'Confirm the issue no longer occurs after the fix has been applied.', btn:'Verify fix with user', event:'Technician verified the fix with the user.'}
];

function renderGenericFlow(t){
  const s = t.flow.step;
  let doneCount = (typeof s === 'number') ? s - 1 : (s === 'resolved' ? 4 : (s === 'closed' ? GENERIC_BUCKETS.length : 0));
  let currentBucket = (typeof s === 'number') ? s - 1 : GENERIC_BUCKETS.length - 1;
  let body = '';

  if(typeof s === 'number' && s <= GENERIC_STEPS.length){
    const def = GENERIC_STEPS[s-1];
    body = `
      <div class="flow-card">
        <div class="flow-step-eyebrow">Step ${s} — ${def.title}</div>
        <div class="flow-step-title">${def.body}</div>
        <div class="flow-actions"><button class="btn btn-primary" onclick="genericAdvance('${t.id}')">${ICONS.wrench} ${def.btn}</button></div>
      </div>`;
  } else if(s === GENERIC_STEPS.length + 1){
    doneCount = GENERIC_STEPS.length;
    currentBucket = GENERIC_BUCKETS.length - 1;
    body = `
      <div class="flow-ready-banner">${ICONS.check}<span>All troubleshooting steps complete — ready to mark this ticket as Resolved.</span></div>
      <div class="flow-actions"><button class="btn btn-green" onclick="markResolved('${t.id}')">${ICONS.check} Mark as Resolved</button></div>`;
  } else if(s === 'resolved'){
    body = `
      <div class="flow-ready-banner">${ICONS.check}<span>Ticket marked as Resolved — ready to close once confirmed with the user.</span></div>
      <div class="flow-actions"><button class="btn btn-grey" onclick="closeTicket('${t.id}')">${ICONS.x} Close Ticket</button></div>`;
  } else if(s === 'closed'){
    body = `<div class="flow-done-banner">${ICONS.check}<span>Incident resolved and closed. Full lifecycle complete.</span></div>`;
  }

  return renderFlowShell(t, GENERIC_BUCKETS, currentBucket, doneCount, body);
}

function genericAdvance(id){
  const t = findTicket(id); if(!t) return;
  const s = t.flow.step;
  if(typeof s !== 'number' || s > GENERIC_STEPS.length) return;
  const def = GENERIC_STEPS[s-1];
  t.timeline.push({time: currentTimeStr(), event: def.event});
  if(s === GENERIC_STEPS.length){
    t.resolution = 'Issue investigated and resolved by ' + t.assignedTo + ' following standard troubleshooting procedure.';
    t.flow.readyToResolve = true;
  }
  t.flow.step = s + 1;
  render();
}

/* ===================== GLOBAL LISTENERS ===================== */
document.addEventListener('click', function(){
  if(state.showNotifications){
    state.showNotifications = false;
    render();
  }
});

/* ===================== INIT ===================== */
render();
