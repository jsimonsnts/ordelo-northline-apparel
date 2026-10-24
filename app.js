const D = structuredClone(window.ordeloData);
const state = {
    page: 'Inbox',
    channel: 'All',
    conversationId: 'conv1',
    orderFilter: 'All',
    orderId: null,
    customerId: 'c1',
    typing: false,
    toast: '',
    versions: [...D.rules]
};
const $ = (s) => document.querySelector(s);
const money = (n) => `$${n.toFixed(2)}`;
const initials = (name) => name.split(' ').map(x => x[0]).join('');
const customer = (id) => D.customers.find(x => x.id === id);
const convo = () => D.conversations.find(x => x.id === state.conversationId);
const navItems = [
    ['Inbox', '▣'],
    ['Orders', '▤'],
    ['Customers', '♙'],
    ['Agent Desk', '✦']
];
const channelCounts = (channel) => channel === 'All' ? D.conversations.length : D.conversations.filter(c => c.channel === channel).length;

function setState(updates) {
    Object.assign(state, updates);
    render();
}

function toast(text) {
    state.toast = text;
    render();
    setTimeout(() => {
        if (state.toast === text) {
            state.toast = '';
            render();
        }
    }, 2600);
}

function shell(content) {
    return `<div class="app-shell"><aside class="sidebar"><div class="brand"><div class="brand-mark">O</div><strong>ordelo</strong></div><div class="workspace"><small>Workspace</small><b>Northline Apparel</b></div><nav class="nav">${navItems.map(([name,icon]) => `<button class="${state.page === name ? 'active':''}" data-nav="${name}"><span class="nav-icon">${icon}</span>${name}</button>`).join('')}</nav></aside><main class="main"><header class="topbar"><div><h1>${state.page}</h1><p>Northline Apparel <span style="color:#b6c0c7">·</span> Friday, October 24</p></div><div class="top-actions"><span class="eyebrow">Live workspace</span><div class="avatar">JS</div></div></header><section class="content">${content}</section></main><nav class="mobile-nav">${navItems.map(([name,icon]) => `<button class="${state.page === name ? 'active':''}" data-nav="${name}">${icon}<br>${name}</button>`).join('')}</nav>${state.orderId ? orderDrawer() : ''}${state.toast ? `<div class="toast">${state.toast}</div>` : ''}</div>`;
}

function render() {
    const pages = {
        Inbox: inboxPage,
        Orders: ordersPage,
        Customers: customersPage,
        'Agent Desk': agentPage
    };
    $('#app').innerHTML = shell(pages[state.page]());
    bind();
}

function inboxPage() {
    const filtered = D.conversations.filter(c => state.channel === 'All' || c.channel === state.channel);
    const c = convo(),
        person = customer(c.customerId);
    return `<div class="page-title"><div><div class="eyebrow">Live conversations</div><h2>Inbox</h2><p class="sub">One calm place for every customer conversation.</p></div></div><div class="toolbar">${['All','Messenger','Instagram','WhatsApp','TikTok','Website'].map(x=>`<button class="chip ${state.channel===x?'active':''}" data-channel="${x}">${x}<span class="count">${channelCounts(x)}</span></button>`).join('')}</div><div class="inbox-layout"><div class="card conversation-list">${filtered.map(c=>{const p=customer(c.customerId);return `<div class="conversation ${c.id===state.conversationId?'selected':''}" data-conversation="${c.id}"><div class="row"><span class="customer">${p.name}</span><span class="time">${c.time}</span></div><div class="preview">${c.last}</div><div class="meta"><span class="channel-dot channel-${c.channel}"></span>${c.channel}<span class="status-tag ${c.done?'done':c.owner !== 'AI answering'?'human':''}">${c.done?'Done':c.owner}</span></div></div>`}).join('')}</div><div class="card thread">${thread(c,person)}</div></div>`;
}

function thread(c, p) {
    return `<div class="thread-head"><div class="customer-line"><div class="big-avatar">${p.initials}</div><div><div class="customer">${p.name}</div><div class="meta"><span class="channel-dot channel-${c.channel}"></span>${c.channel} · ${p.phone}</div></div><div class="thread-head-actions"><button class="secondary" data-action="done">Done</button><button class="primary" data-action="toggle-owner">${c.owner === 'AI answering' ? 'Take over' : 'Back to AI'}</button></div></div></div><div class="messages">${c.messages.map(m=>message(m)).join('')}${state.typing ? `<div class="typing">Ordelo AI is typing…</div>`:''}</div>${c.owner === 'AI answering' ? `<div class="composer"><div class="composer-row"><input id="customer-input" placeholder="Try: navy linen shirt, medium, yes, or wrong size" /><button class="primary" data-action="send-customer">Send</button></div><small>Scripted AI is active · replies in 1–2 seconds</small></div>` : `<div class="composer"><div class="composer-row"><input id="agent-input" placeholder="Write a reply as a teammate…" /><button class="primary" data-action="send-agent">Reply</button></div><small>You're replying as John Simon</small></div>`}`;
}

function message(m) {
    if (m.from === 'event') return `<div class="event">${m.text}</div>`;
    const cls = m.from === 'customer' ? 'customer' : m.from === 'ai' ? 'ai' : 'agent';
    return `<div class="bubble-wrap ${cls}"><div><div class="bubble">${m.text}${m.card ? card(m.card) : ''}</div><div class="bubble-time">${m.from==='customer'?'Customer':m.from==='ai'?'Ordelo AI':'John Simon'} · ${m.time}</div></div></div>`;
}

function card(type) {
    if (type === 'product') {
        const p = D.products[0];
        return `<div class="product-card"><strong>${p.name}</strong><div class="product-price">${money(p.price)}</div><div class="meta">${p.sizes} · ${p.stock} in stock</div><button class="secondary" style="margin-top:10px">View product</button></div>`;
    }
    return `<div class="receipt-card"><strong>Order #1049 created</strong><div class="meta" style="margin-top:6px">Navy linen shirt · Medium</div><div class="order-total" style="font-size:14px;margin-top:10px;padding-top:10px"><span>Total</span><span>${money(68)}</span></div></div>`;
}

function aiReply(text) {
    const low = text.toLowerCase();
    if (low.includes('wrong size')) return {
        text: 'I’m sorry about that — I’ll bring in a teammate so we can get the right size sorted quickly.',
        handover: true
    };
    if (low.trim() === 'yes' || low.includes('yes,') || low.includes('yes!')) return {
        text: 'Perfect — your address is saved and your order is on its way to the team.',
        card: 'receipt',
        order: true
    };
    if (/medium|small|large|xl|size/.test(low) && !low.includes('shirt')) return {
        text: 'Great choice. Should I use your saved address for this order?'
    };
    if (low.includes('navy') && low.includes('linen') || low.includes('shirt')) return {
        text: 'Our navy linen shirt is $68, available in XS–XXL, with 42 in stock. Want to choose a size?',
        card: 'product'
    };
    return {
        text: 'Thanks for reaching out! I don’t have that detail yet, so I’ll have a teammate take a look.',
        handover: true
    };
}

function sendMessage(kind) {
    const input = kind === 'customer' ? $('#customer-input') : $('#agent-input');
    const text = input?.value.trim();
    if (!text) return;
    const c = convo();
    c.messages.push({
        from: kind === 'customer' ? 'customer' : 'agent',
        text,
        time: 'Just now'
    });
    c.last = text;
    if (kind === 'customer') {
        state.typing = true;
        render();
        setTimeout(() => {
            const r = aiReply(text);
            state.typing = false;
            c.messages.push({
                from: 'ai',
                text: r.text,
                time: 'Just now',
                card: r.card
            });
            if (r.handover) {
                c.owner = 'Sofia M.';
                c.messages.push({
                    from: 'event',
                    text: 'Sofia M. took over this conversation',
                    time: 'Just now'
                });
            }
            if (r.order) {
                const next = String(1049);
                D.orders.unshift({
                    id: '#' + next,
                    customerId: c.customerId,
                    items: 'Navy linen shirt × 1 · Medium',
                    total: 68,
                    payment: 'Pending',
                    status: 'Processing',
                    channel: c.channel,
                    history: ['Order created by Ordelo AI · ' + c.channel, 'Address confirmed · saved address']
                });
            }
            render();
        }, 1200);
    } else {
        render();
    }
}

function ordersPage() {
    const filtered = D.orders.filter(o => state.orderFilter === 'All' || o.status === state.orderFilter);
    return `<div class="page-title"><div><div class="eyebrow">Commerce overview</div><h2>Orders</h2><p class="sub">Track every order from conversation to doorstep.</p></div></div><div class="toolbar">${['All','Processing','Shipped','Delivered','Cancelled'].map(x=>`<button class="chip ${state.orderFilter===x?'active':''}" data-order-filter="${x}">${x}<span class="count">${x==='All'?D.orders.length:D.orders.filter(o=>o.status===x).length}</span></button>`).join('')}</div><div class="card table-card"><table><thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Source</th></tr></thead><tbody>${filtered.map(o=>{const p=customer(o.customerId);return `<tr data-order="${o.id}"><td><b>${o.id}</b></td><td>${p.name}</td><td>${o.items}</td><td><b>${money(o.total)}</b></td><td>${o.payment}</td><td><span class="pill ${o.status.toLowerCase()}">${o.status}</span></td><td><span class="meta"><span class="channel-dot channel-${o.channel}"></span>${o.channel}</span></td></tr>`}).join('')}</tbody></table></div>`;
}

function orderDrawer() {
    const o = D.orders.find(x => x.id === state.orderId),
        p = customer(o.customerId);
    const next = {
        Processing: 'Shipped',
        Shipped: 'Delivered',
        Delivered: 'Delivered',
        Cancelled: 'Cancelled'
    } [o.status];
    return `<div class="drawer"><div class="drawer-panel"><button class="drawer-close" data-action="close-order">×</button><div class="eyebrow">Order detail</div><h2>${o.id}</h2><p class="sub">${p.name} · <span class="channel-dot channel-${o.channel}"></span> ${o.channel}</p><hr style="border:0;border-top:1px solid var(--line);margin:24px 0"><div class="field"><label>Items</label><strong>${o.items}</strong></div><div class="order-total"><span>Total</span><span>${money(o.total)}</span></div><div style="margin:18px 0"><span class="pill ${o.status.toLowerCase()}">${o.status}</span> <span class="meta" style="margin-left:8px">${o.payment}</span></div>${next !== o.status ? `<button class="primary" style="width:100%" data-action="advance-order">Move to ${next}</button>` : `<button class="secondary" style="width:100%" disabled>Order complete</button>`}<h3 style="margin-top:30px">History</h3><div class="history">${o.history.map((h,i)=>`<div class="history-item">${h}<small>${i===o.history.length-1?'Just now':'Oct '+(24-i)}</small></div>`).join('')}</div></div></div>`;
}

function customersPage() {
    const p = customer(state.customerId);
    return `<div class="page-title"><div><div class="eyebrow">People behind the orders</div><h2>Customers</h2><p class="sub">Know the context before you reply.</p></div></div><div class="split-layout"><div class="card customer-list">${D.customers.map(c=>`<div class="customer-row ${c.id===state.customerId?'active':''}" data-customer="${c.id}"><div class="initials">${c.initials}</div><div><div class="customer">${c.name}</div><div class="meta">${c.orders} orders · ${money(c.spent)}</div></div><span style="margin-left:auto;color:#a2adb5">›</span></div>`).join('')}</div><div class="card profile"><div class="profile-head"><div class="initials">${p.initials}</div><div><h3 style="margin:0 0 4px">${p.name}</h3><div class="meta">Customer since April 2024</div></div></div><div class="profile-grid"><div class="field"><label>Phone</label><strong>${p.phone}</strong></div><div class="field"><label>Orders</label><strong>${p.orders} orders · ${money(p.spent)}</strong></div><div class="field"><label>Channels</label><div class="tag-list">${p.channels.map(x=>`<span class="tag"><span class="channel-dot channel-${x}"></span> ${x}</span>`).join('')}</div></div><div class="field"><label>Tags</label><div class="tag-list">${p.tags.map(x=>`<span class="tag">${x}</span>`).join('')}</div></div></div><div class="field"><label>Saved address</label><strong>${p.address}</strong></div><button class="secondary" style="margin-top:25px" data-action="view-customer-chat">View conversations</button></div></div>`;
}

function agentPage() {
    return `<div class="page-title"><div><div class="eyebrow">Teach your teammate</div><h2>Agent Desk</h2><p class="sub">Give the AI clear, human rules in plain English.</p></div><span class="status-tag">AI answering 5 conversations</span></div><div class="agent-grid"><div class="card agent-card"><h3>Teach Ordelo a new rule</h3><p class="sub">Write what you want the AI to remember. Keep it specific.</p><textarea id="rule-input" placeholder="Example: Offer free shipping on orders over $100."></textarea><button class="primary" data-action="publish-rule">Publish rule</button><h3 style="margin-top:30px">Published versions</h3>${state.versions.map((r,i)=>`<div class="version"><div><b>Version ${state.versions.length-i}</b><small>${r}</small></div><button class="secondary" data-action="rollback" data-version="${i}">Roll back</button></div>`).join('')}</div><div class="card agent-card"><h3>Questions needing a human</h3><p class="sub">These are opportunities to make the agent smarter.</p>${D.unanswered.map((q,i)=>`<div class="version"><div><b>${q}</b><small>Asked ${i+1} time${i?'s':''} this week</small></div><span style="color:#a4adb4">›</span></div>`).join('')}<div style="background:#fff7e5;padding:15px;border-radius:10px;margin-top:22px"><b>Tip</b><p class="sub" style="margin-top:5px">Published rules apply to new conversations instantly. Roll back to test a safer answer.</p></div></div></div>`;
}

function bind() {
    document.querySelectorAll('[data-nav]').forEach(b => b.onclick = () => setState({
        page: b.dataset.nav,
        orderId: null
    }));
    document.querySelectorAll('[data-channel]').forEach(b => b.onclick = () => setState({
        channel: b.dataset.channel
    }));
    document.querySelectorAll('[data-conversation]').forEach(b => b.onclick = () => setState({
        conversationId: b.dataset.conversation
    }));
    document.querySelectorAll('[data-order-filter]').forEach(b => b.onclick = () => setState({
        orderFilter: b.dataset.orderFilter
    }));
    document.querySelectorAll('[data-order]').forEach(b => b.onclick = () => setState({
        orderId: b.dataset.order
    }));
    document.querySelectorAll('[data-customer]').forEach(b => b.onclick = () => setState({
        customerId: b.dataset.customer
    }));
    document.querySelectorAll('[data-action]').forEach(b => b.onclick = () => action(b.dataset.action, b));
}

function action(type, el) {
    if (type === 'toggle-owner') {
        const c = convo();
        c.owner = c.owner === 'AI answering' ? 'John Simon' : 'AI answering';
        c.messages.push({
            from: 'event',
            text: c.owner === 'AI answering' ? 'Ordelo AI is answering again' : 'John Simon took over this conversation',
            time: 'Just now'
        });
        render();
    } else if (type === 'done') {
        const c = convo();
        c.done = true;
        c.messages.push({ from: 'event', text: 'Conversation marked done', time: 'Just now' });
        render();
        toast('Conversation marked done');
    } else if (type === 'send-customer') sendMessage('customer');
    else if (type === 'send-agent') sendMessage('agent');
    else if (type === 'close-order') setState({
        orderId: null
    });
    else if (type === 'advance-order') {
        const o = D.orders.find(x => x.id === state.orderId);
        const next = {
            Processing: 'Shipped',
            Shipped: 'Delivered'
        } [o.status];
        o.status = next;
        o.history.push('Status updated to ' + next);
        render();
        toast('Order updated to ' + next);
    } else if (type === 'publish-rule') {
        const input = $('#rule-input');
        if (input.value.trim()) {
            state.versions.unshift(input.value.trim());
            render();
            toast('Rule published to Ordelo AI');
        }
    } else if (type === 'rollback') {
        state.versions.splice(Number(el.dataset.version), 1);
        render();
        toast('Rule rolled back');
    } else if (type === 'view-customer-chat') {
        setState({
            page: 'Inbox',
            orderId: null,
            conversationId: D.conversations.find(c => c.customerId === state.customerId)?.id || 'conv1'
        });
    } else if (type === 'new-customer') {
        toast('Demo action: customer form is ready');
    }
}
render();
