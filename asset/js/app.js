/**
 * Apex Local Automation - Core Sandbox Logic
 * Handles the interactive simulations for the bundle components.
 */

// Global sleep helper for timing automation steps
const sleep = ms => new Promise(r => setTimeout(r, ms));

/**
 * Creates and injects an SMS bubble into the target container.
 * Utilizes the new high-contrast Brand Cyan vs. Deep Charcoal color scheme.
 */
function createMsg(containerId, text, isUser = false, colorClass = 'bg-brand-cyan text-black') {
    const container = document.getElementById(containerId);
    const div = document.createElement('div');
    div.className = `msg-anim flex ${isUser ? 'justify-end' : 'justify-start'}`;

    if (isUser) {
        div.innerHTML = `<div class="${colorClass} font-medium rounded-2xl rounded-br-none px-3 py-2 max-w-[85%] text-[10px] leading-relaxed shadow-lg">${text}</div>`;
    } else {
        div.innerHTML = `<div class="bg-black border border-slate-800 text-slate-300 rounded-2xl rounded-bl-none px-3 py-2 max-w-[85%] text-[10px] leading-relaxed shadow">${text}</div>`;
    }

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

/**
 * Displays the typing indicator for a set duration before hiding it.
 */
async function showType(indicatorId, containerId, ms) {
    const dot = document.getElementById(indicatorId);
    const box = document.getElementById(containerId);
    dot.classList.remove('hidden');
    box.scrollTop = box.scrollHeight;
    await sleep(ms);
    dot.classList.add('hidden');
}

/**
 * =========================================================
 * SIMULATION 1: MISSED CALL RECOVERY (For the Bundle Page)
 * =========================================================
 */
async function runSim1() {
    const btn = document.getElementById('btnSim1');
    if (!btn) return;

    // UI Setup & Lock Button
    btn.disabled = true;
    btn.innerText = "Running...";
    btn.className = "w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-sm bg-slate-800 text-slate-500 cursor-not-allowed";

    const smsBox = document.getElementById('smsContainer1');
    smsBox.innerHTML = '';
    smsBox.classList.remove('opacity-0');

    // Set to Customer View
    document.getElementById('phoneHeader1').className = "bg-brand-charcoal px-4 py-2 border-b border-slate-800 flex items-center gap-2 transition-colors duration-500";
    document.getElementById('phoneIcon1').className = "h-6 w-6 rounded-full bg-brand-alert text-[10px] font-bold flex items-center justify-center text-white font-mono";
    document.getElementById('phoneIcon1').innerText = "YS";
    document.getElementById('phoneTitle1').innerText = "Your Shop";
    document.getElementById('phoneSub1').innerText = "Customer's Phone View";

    // Phase 1: Customer View (Missed Call -> Auto Reply)
    const overlay = document.getElementById('overlay1');
    overlay.classList.remove('hidden');
    await sleep(2000);
    overlay.classList.add('hidden');

    await showType('typing1', 'smsContainer1', 800);
    createMsg('smsContainer1', `Hi, this is Your Shop. We're on a job or helping a customer right now, but how can we help? You can reply directly to this text.`, false, 'bg-brand-alert text-white');

    await sleep(1200);
    await showType('typing1', 'smsContainer1', 1500);
    createMsg('smsContainer1', `Hey I need someone to look at my AC unit, it's making a loud noise.`, true, 'bg-slate-700 text-white');

    await sleep(1500);

    // Phase 2: The Transition Animation
    const transitionScreen = document.getElementById('transitionOverlay1');
    transitionScreen.classList.remove('hidden');

    // Slide up transition
    setTimeout(() => { transitionScreen.classList.replace('translate-y-full', 'translate-y-0'); }, 50);

    await sleep(1200);

    // Fade out old texts behind the screen, change header
    smsBox.classList.add('opacity-0');

    document.getElementById('phoneHeader1').className = "bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2 transition-colors duration-500";
    document.getElementById('phoneIcon1').className = "h-6 w-6 rounded-full bg-blue-500 text-[10px] font-bold flex items-center justify-center text-white font-mono";
    document.getElementById('phoneIcon1').innerText = "CRM";
    document.getElementById('phoneTitle1').innerText = "Contractor Dashboard";
    document.getElementById('phoneSub1').innerText = "ServiceTitan View";

    await sleep(500);

    // Slide down transition
    transitionScreen.classList.replace('translate-y-0', 'translate-y-full');
    setTimeout(() => { transitionScreen.classList.add('hidden'); }, 500);

    // Phase 3: Contractor View (Message Received)
    smsBox.innerHTML = '';
    smsBox.classList.remove('opacity-0');

    await sleep(600);
    createMsg('smsContainer1', `<span class="text-blue-300 font-mono text-[9px] block mb-1 uppercase tracking-wider">New Lead (419-555-0122):</span>"Hey I need someone to look at my AC unit, it's making a loud noise."`, false, 'bg-slate-800 text-white border border-slate-700');

    // Reset button state
    btn.disabled = false;
    btn.innerText = "↻ Replay Simulation";
    btn.className = "w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-sm bg-brand-alert hover:bg-orange-600 text-white shadow-lg transition";
}

/**
 * =========================================================
 * SIMULATION 2: QUOTE RECOVERY
 * =========================================================
 */
async function runSim2() {
    const btn = document.getElementById('btnSim2');
    btn.disabled = true;
    btn.innerText = "Running...";
    btn.className = "w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-sm bg-slate-800 text-slate-500 cursor-not-allowed";

    document.getElementById('smsContainer2').innerHTML = '';

    // Day 1: Quote Sent
    await showType('typing2', 'smsContainer2', 800);
    createMsg('smsContainer2', `Hi Dave, estimate for the Heat Pump is ready: link.co/q1 Total: $8,500.`);

    // Day 3: Follow Up
    await sleep(1500);
    await showType('typing2', 'smsContainer2', 1000);
    createMsg('smsContainer2', `<span class="text-slate-500 font-mono text-[9px] block mb-1">Day 3 Automation:</span>Hi Dave, checking in to see if you had any questions on the estimate we sent Wednesday?`);

    // Day 7: Financing Offer
    await sleep(1500);
    await showType('typing2', 'smsContainer2', 1200);
    createMsg('smsContainer2', `<span class="text-slate-500 font-mono text-[9px] block mb-1">Day 7 Automation:</span>Quick note—we have 0% financing for 18mos ($~140/mo). Let me know if you want the link!`);

    // Customer Replies
    await sleep(1500);
    await showType('typing2', 'smsContainer2', 1500);
    createMsg('smsContainer2', `Yes, please send the link. We want to schedule it.`, true, 'bg-blue-500 text-white');

    // Reset button state
    btn.disabled = false;
    btn.innerText = "↻ Replay Timeline";
    btn.className = "w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition";
}

/**
 * =========================================================
 * SIMULATION 3: GOOGLE REVIEW ENGINE
 * =========================================================
 */
async function runSim3() {
    const btn = document.getElementById('btnSim3');
    btn.disabled = true;
    btn.innerText = "Running...";
    btn.className = "w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-sm bg-slate-800 text-slate-500 cursor-not-allowed";

    // Reset Containers & Overlay State
    document.getElementById('smsContainer3').innerHTML = '';
    const overlay = document.getElementById('reviewOverlay');
    const stars = document.getElementById('reviewStars');
    const reviewText = document.getElementById('reviewText');
    const postBtn = document.getElementById('postReviewBtn');

    overlay.classList.replace('translate-y-0', 'translate-y-full');
    stars.classList.replace('text-amber-400', 'text-slate-300');
    reviewText.innerText = 'Share details of your own experience at this place';
    reviewText.classList.replace('text-slate-800', 'text-slate-400');
    postBtn.classList.replace('bg-slate-400', 'bg-blue-600');
    postBtn.innerText = 'Post';

    // 1. Send the Review Link
    await sleep(800);
    await showType('typing3', 'smsContainer3', 1000);
    createMsg('smsContainer3', `<span class="text-slate-500 font-mono text-[9px] block mb-1">2 Hours after Invoice Paid:</span>Hi Sarah, thanks for choosing us today! If you were happy with the team, it'd mean the world to us if you left a quick review: rvw.link/g/3x`);

    // 2. Customer clicks link -> Slide up Google UI
    await sleep(1800);
    overlay.classList.replace('translate-y-full', 'translate-y-0');

    // 3. Customer taps 5 stars
    await sleep(1200);
    stars.classList.replace('text-slate-300', 'text-amber-400');

    // 4. Customer types review
    await sleep(800);
    reviewText.classList.replace('text-slate-400', 'text-slate-800');
    reviewText.innerText = "They showed up exactly on time and did a fantastic job fixing the issue. Highly recommend their crew!";

    // 5. Customer clicks Post
    await sleep(1500);
    postBtn.classList.replace('bg-blue-600', 'bg-slate-400');
    postBtn.innerText = 'Posting...';

    // 6. UI slides away
    await sleep(1000);
    overlay.classList.replace('translate-y-0', 'translate-y-full');

    // 7. Automated Thank You Text fires
    await sleep(1500);
    await showType('typing3', 'smsContainer3', 1200);
    createMsg('smsContainer3', `<span class="text-slate-500 font-mono text-[9px] block mb-1">Review Detected:</span>Thanks so much for the 5-star review, Sarah! We really appreciate your business. Have a great week!`);

    // Reset button state
    btn.disabled = false;
    btn.innerText = "↻ Replay Trigger";
    btn.className = "w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-sm bg-brand-cyan hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,229,255,0.2)] transition";
}

/**
 * =========================================================
 * SIMULATION: STANDALONE QUOTE RECOVERY (HVAC PAGE)
 * =========================================================
 */
async function runHvacSim() {
    const btn = document.getElementById('btnSimHvac');
    if (!btn) return; // Prevent errors if not on the HVAC page

    btn.disabled = true;
    btn.innerText = "Running...";
    btn.className = "w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-sm bg-slate-800 text-slate-500 cursor-not-allowed mt-2";

    document.getElementById('smsContainerHvac').innerHTML = '';

    // Day 1: Quote Sent
    await showType('typingHvac', 'smsContainerHvac', 800);
    createMsg('smsContainerHvac', `Hi Dave, estimate for the Heat Pump replacement is ready: link.co/q1 Total: $8,500.`);

    // Day 3: Follow Up
    await sleep(1800);
    await showType('typingHvac', 'smsContainerHvac', 1200);
    createMsg('smsContainerHvac', `<span class="text-brand-cyan font-mono text-[9px] block mb-1 uppercase tracking-wider">Day 3 Check-In Triggered:</span>Hi Dave, checking in to see if you had any questions on the estimate we sent Wednesday?`);

    // Day 7: Financing Offer
    await sleep(2000);
    await showType('typingHvac', 'smsContainerHvac', 1500);
    createMsg('smsContainerHvac', `<span class="text-brand-cyan font-mono text-[9px] block mb-1 uppercase tracking-wider">Day 7 Financing Triggered:</span>Quick note—we just opened up 0% financing for 18 months for fall replacements ($~140/mo). Let me know if you want the link to apply!`);

    // Customer Replies
    await sleep(1500);
    await showType('typingHvac', 'smsContainerHvac', 1500);
    createMsg('smsContainerHvac', `Oh nice. Yes, please send the link. We want to get it on the schedule before it gets cold.`, true, 'bg-brand-cyan text-black');

    // Reset button state
    btn.disabled = false;
    btn.innerText = "↻ Replay Recovery Timeline";
    btn.className = "w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-sm bg-brand-cyan hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,229,255,0.2)] mt-2 transition";
}

/**
 * =========================================================
 * SIMULATION: SINGLE-BUTTON MISSED CALL + CRM TRANSITION
 * =========================================================
 */
async function runMissedCallSim() {
    const btn = document.getElementById('btnSimMissedCall');
    if (!btn) return;

    // UI Setup & Lock Button
    btn.disabled = true;
    btn.innerText = "Running...";
    btn.className = "w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-sm bg-slate-800 text-slate-500 cursor-not-allowed mt-2";

    const smsBox = document.getElementById('smsContainerMissedCall');
    smsBox.innerHTML = '';
    smsBox.classList.remove('opacity-0');

    // Set to Customer View
    document.getElementById('phoneHeader').className = "bg-brand-charcoal px-4 py-3 border-b border-slate-800 flex items-center gap-3 transition-colors duration-500";
    document.getElementById('phoneIcon').className = "h-7 w-7 rounded-full bg-brand-alert text-[11px] font-bold flex items-center justify-center text-white font-mono";
    document.getElementById('phoneIcon').innerText = "YS";
    document.getElementById('phoneTitle').innerText = "Your Shop";
    document.getElementById('phoneSub').innerText = "Customer's Phone View";

    // Phase 1: Customer View (Missed Call -> Auto Reply)
    const overlay = document.getElementById('overlayMissedCall');
    overlay.classList.remove('hidden');
    await sleep(2000);
    overlay.classList.add('hidden');

    await showType('typingMissedCall', 'smsContainerMissedCall', 800);
    createMsg('smsContainerMissedCall', `Hi, this is Your Shop. We're on a job or helping a customer right now, but how can we help? You can reply directly to this text.`, false, 'bg-brand-alert text-white');

    await sleep(1200);
    await showType('typingMissedCall', 'smsContainerMissedCall', 1500);
    createMsg('smsContainerMissedCall', `Hey I need someone to look at my AC unit, it's making a loud noise. Are you guys available today?`, true, 'bg-slate-700 text-white');

    await sleep(1500);

    // Phase 2: The Transition Animation
    const transitionScreen = document.getElementById('transitionOverlay');
    transitionScreen.classList.remove('hidden');

    // Slide up transition
    setTimeout(() => { transitionScreen.classList.replace('translate-y-full', 'translate-y-0'); }, 50);

    await sleep(1200);

    // Fade out old texts behind the screen, change header
    smsBox.classList.add('opacity-0');

    document.getElementById('phoneHeader').className = "bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center gap-3 transition-colors duration-500";
    document.getElementById('phoneIcon').className = "h-7 w-7 rounded-full bg-blue-500 text-[11px] font-bold flex items-center justify-center text-white font-mono";
    document.getElementById('phoneIcon').innerText = "CRM";
    document.getElementById('phoneTitle').innerText = "Contractor Dashboard";
    document.getElementById('phoneSub').innerText = "ServiceTitan / App View";

    await sleep(500);

    // Slide down transition
    transitionScreen.classList.replace('translate-y-0', 'translate-y-full');
    setTimeout(() => { transitionScreen.classList.add('hidden'); }, 500);

    // Phase 3: Contractor View (Message Received)
    smsBox.innerHTML = '';
    smsBox.classList.remove('opacity-0');

    await sleep(600);
    createMsg('smsContainerMissedCall', `<span class="text-blue-300 font-mono text-[9px] block mb-1 uppercase tracking-wider">New Lead (419-555-0122):</span>"Hey I need someone to look at my AC unit, it's making a loud noise. Are you guys available today?"`, false, 'bg-slate-800 text-white border border-slate-700');

    // Reset button state
    btn.disabled = false;
    btn.innerText = "↻ Replay Full Simulation";
    btn.className = "w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-sm bg-brand-alert hover:bg-orange-500 text-white shadow-[0_0_15px_rgba(255,61,0,0.3)] transition mt-2";
}

/**
 * =========================================================
 * SIMULATION: STANDALONE GOOGLE REVIEW ENGINE (REVIEWS PAGE)
 * =========================================================
 */
async function runStandaloneReviewSim() {
    const btn = document.getElementById('btnSimReview');
    if (!btn) return;

    btn.disabled = true;
    btn.innerText = "Running Simulation...";
    btn.className = "w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-sm bg-slate-800 text-slate-500 cursor-not-allowed mt-2";

    // Reset Containers & Overlay State
    document.getElementById('smsContainerReview').innerHTML = '';
    const crmOverlay = document.getElementById('overlayReviewInvoice');
    const googleOverlay = document.getElementById('reviewOverlayStandalone');
    const stars = document.getElementById('reviewStarsStandalone');
    const reviewText = document.getElementById('reviewTextStandalone');
    const postBtn = document.getElementById('postReviewBtnStandalone');

    googleOverlay.classList.replace('translate-y-0', 'translate-y-full');
    stars.classList.replace('text-amber-400', 'text-slate-300');
    reviewText.innerText = 'Share details of your own experience at this place';
    reviewText.classList.replace('text-slate-800', 'text-slate-400');
    postBtn.classList.replace('bg-slate-400', 'bg-blue-600');
    postBtn.innerText = 'Post';


    // 2. Send the Review Link
    await sleep(800);
    await showType('typingReview', 'smsContainerReview', 1200);
    createMsg('smsContainerReview', `<span class="text-indigo-300 font-mono text-[9px] block mb-1 uppercase tracking-wider">2 Hours after Invoice Paid:</span>Hi Sarah, thanks for choosing us today! If you were happy with the team, it'd mean the world to us if you left a quick review: rvw.link/g/3x`, false, 'bg-indigo-600 text-white');

    // 3. Customer clicks link -> Slide up Google UI
    await sleep(2000);
    googleOverlay.classList.replace('translate-y-full', 'translate-y-0');

    // 4. Customer taps 5 stars
    await sleep(1500);
    stars.classList.replace('text-slate-300', 'text-amber-400');

    // 5. Customer types review
    await sleep(1000);
    reviewText.classList.replace('text-slate-400', 'text-slate-800');
    reviewText.innerText = "They showed up exactly on time and did a fantastic job fixing the issue. Highly recommend their crew!";

    // 6. Customer clicks Post
    await sleep(1500);
    postBtn.classList.replace('bg-blue-600', 'bg-slate-400');
    postBtn.innerText = 'Posting...';

    // 7. UI slides away
    await sleep(1000);
    googleOverlay.classList.replace('translate-y-0', 'translate-y-full');

    // 8. Automated Thank You Text fires
    await sleep(1500);
    await showType('typingReview', 'smsContainerReview', 1200);
    createMsg('smsContainerReview', `<span class="text-indigo-300 font-mono text-[9px] block mb-1 uppercase tracking-wider">Review Detected:</span>Thanks so much for the 5-star review, Sarah! We really appreciate your business. Have a great week!`, false, 'bg-indigo-600 text-white');

    // Reset button state
    btn.disabled = false;
    btn.innerText = "↻ Replay System Trigger";
    btn.className = "w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] transition mt-2";
}

/**
 * =========================================================
 * SIMULATION: SECURE DOCUMENT VAULT (SECURE-VAULT PAGE)
 * =========================================================
 */
async function runVaultSim() {
    const btn = document.getElementById('btnSimVault');
    if (!btn) return;

    // Reset UI State
    btn.disabled = true;
    btn.innerText = "Running Simulation...";
    btn.className = "w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-sm bg-slate-800 text-slate-500 cursor-not-allowed mt-2";

    document.getElementById('smsContainerVault').innerHTML = '';
    document.getElementById('driveToast').classList.add('hidden');

    const portal = document.getElementById('uploadPortal');
    const dropZone = document.getElementById('dropZone');
    const uploadingState = document.getElementById('uploadingState');
    const successState = document.getElementById('successState');
    const progressBar = document.getElementById('progressBar');

    // Reset Portal DOM
    portal.classList.replace('translate-y-0', 'translate-y-full');
    dropZone.classList.remove('hidden', 'border-brand-teal', 'bg-teal-50');
    dropZone.innerHTML = `<div class="text-3xl mb-3">📄</div><div class="font-bold text-sm text-slate-700">Select Document</div><div class="text-xs text-slate-500 mt-1">PDF, JPG, or PNG</div>`;
    uploadingState.classList.add('hidden');
    successState.classList.add('hidden');
    progressBar.classList.remove('animate-progress');

    // 1. Send the SMS Request
    await showType('typingVault', 'smsContainerVault', 800);
    createMsg('smsContainerVault', `<span class="text-teal-300 font-mono text-[9px] block mb-1 uppercase tracking-wider">Automated Request:</span>Hi John, Smith & Associates CPA needs a copy of your 2025 W-2 to finish filing. Tap here to securely upload: secure.apex/up/j29`, false, 'bg-brand-teal text-black');

    // 2. Customer clicks link -> Portal Slides Up
    await sleep(2000);
    portal.classList.replace('translate-y-full', 'translate-y-0');

    // 3. User selects file
    await sleep(1500);
    dropZone.classList.add('border-brand-teal', 'bg-teal-50');
    dropZone.innerHTML = `<div class="text-3xl mb-3">✅</div><div class="font-bold text-sm text-brand-teal">W2_Mason_2025.pdf</div><div class="text-xs text-slate-500 mt-1">File Selected</div>`;

    // 4. Progress bar triggers
    await sleep(1000);
    uploadingState.classList.remove('hidden');
    progressBar.classList.add('animate-progress');

    // 5. Success State
    await sleep(1600); // Wait for CSS animation to finish
    dropZone.classList.add('hidden');
    uploadingState.classList.add('hidden');
    successState.classList.remove('hidden');
    successState.classList.add('fade-in');

    // 6. Portal slides away
    await sleep(2000);
    portal.classList.replace('translate-y-0', 'translate-y-full');

    // 7. Show CPA Drive Sync Toast
    await sleep(1000);
    const toast = document.getElementById('driveToast');
    toast.classList.remove('hidden');
    toast.classList.add('fade-in');

    // Restore Button
    btn.disabled = false;
    btn.innerText = "↻ Replay Document Request";
    btn.className = "w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-sm bg-brand-teal hover:bg-teal-400 text-black shadow-[0_0_15px_rgba(20,184,166,0.3)] transition mt-2";
}

/**
* =========================================================
* SIMULATION: DOT SAFETY TRACKER (DOT-COMPLIANCE PAGE)
* =========================================================
*/
async function runDotSim() {
    const btn = document.getElementById('btnSimDot');
    if (!btn) return;

    btn.disabled = true;
    btn.innerText = "Running Simulation...";
    btn.className = "w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-sm bg-slate-800 text-slate-500 cursor-not-allowed mt-2";

    // Reset UI State
    document.getElementById('smsContainerDot').innerHTML = '';

    const toast = document.getElementById('dispatchToast');
    toast.classList.add('hidden', 'translate-y-[-20px]', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');

    // Day 60: Gentle Reminder
    await sleep(800);
    await showType('typingDot', 'smsContainerDot', 1000);
    createMsg('smsContainerDot', `<span class="text-brand-safety font-mono text-[9px] block mb-1 uppercase tracking-wider">60 Days to Expiration:</span>Hi Marcus, your DOT Medical Card expires in 60 days (12/04). Please schedule your physical soon so dispatch can keep you on the board.`, false, 'bg-slate-800 border border-slate-700 text-white');

    // Day 30: Firm Reminder + Action Link
    await sleep(2000);
    await showType('typingDot', 'smsContainerDot', 1200);
    createMsg('smsContainerDot', `<span class="text-orange-400 font-mono text-[9px] block mb-1 uppercase tracking-wider">30 Days to Expiration:</span>Marcus, your Med Card expires in 30 days. If you have completed your physical, please upload the new card here: dot.apex/m/3x`, false, 'bg-slate-800 border border-slate-700 text-white');

    // Day 7: Urgent Alert + Dispatch Notification
    await sleep(2500);
    await showType('typingDot', 'smsContainerDot', 1500);
    createMsg('smsContainerDot', `<span class="text-red-400 font-mono text-[9px] block mb-1 uppercase tracking-wider">7 Days to Expiration:</span>URGENT: Marcus, your Med Card expires in exactly 7 days. If we do not have an updated copy by next Wednesday, you will be pulled from all loads.`, false, 'bg-red-900 border border-red-700 text-white');

    // Trigger Dispatch Toast
    await sleep(800);
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.remove('translate-y-[-20px]', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    }, 50);

    // Restore Button
    await sleep(1500);
    btn.disabled = false;
    btn.innerText = "↻ Replay Expiry Sequence";
    btn.className = "w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-sm bg-brand-safety hover:bg-yellow-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)] transition mt-2";
}

/**
 * =========================================================
 * SIMULATION: PO RECONCILIATION TERMINAL (PO-SANDBOX PAGE)
 * =========================================================
 */
async function runPoSim() {
    const btn = document.getElementById('btnSimPo');
    if (!btn) return;

    btn.disabled = true;
    btn.innerText = "Processing...";
    btn.className = "w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-sm bg-slate-800 text-slate-500 cursor-not-allowed mt-2";

    const logBox = document.getElementById('auditLogContainer');
    logBox.innerHTML = ''; // Clear previous logs

    // Helper to print terminal lines
    const printLog = (text, classes = "text-slate-300") => {
        const div = document.createElement('div');
        div.className = `opacity-0 transform translate-y-2 transition-all duration-300 ${classes}`;
        div.innerHTML = text;
        logBox.appendChild(div);
        // Trigger animation
        setTimeout(() => {
            div.classList.remove('opacity-0', 'translate-y-2');
            logBox.scrollTop = logBox.scrollHeight;
        }, 50);
    };

    // 1. Initial trigger
    printLog('<span class="text-blue-400">[INBOX]</span> New email detected from: vendor@napa-supply.com');
    await sleep(1000);

    printLog('<span class="text-blue-400">[SYSTEM]</span> Extracting attachment: "Invoice_INV-8821.pdf"');
    await sleep(1500);

    // 2. OCR Parsing
    printLog('<span class="text-slate-400">[OCR]</span> Scanning document structure...');
    await sleep(800);
    printLog('<span class="text-brand-emerald">[SUCCESS]</span> Extracted PO Reference: #4490-A');
    await sleep(1000);

    // 3. Database Lookup
    printLog('<span class="text-yellow-400">[QUERY]</span> Fetching original PO #4490-A from database...');
    await sleep(1200);

    printLog('<span class="text-slate-400">--- BEGIN AUDIT ---</span>');
    await sleep(800);

    // 4. Line Item Matching
    printLog('Line 1: Heavy Duty Brake Pads (Qty 4) ... <span class="text-brand-emerald">MATCH ($120.00)</span>');
    await sleep(600);
    printLog('Line 2: 5W-30 Motor Oil 55Gal (Qty 1) ... <span class="text-brand-emerald">MATCH ($450.00)</span>');
    await sleep(800);

    // 5. The Discrepancy
    printLog('Line 3: Freight Surcharge ... <span class="text-red-500 font-bold">DISCREPANCY</span>');
    printLog('<span class="text-red-400 ml-4">↳ Billed: $150.00 | PO Approved: $0.00</span>');
    await sleep(1200);

    // 6. Final Action
    printLog('<span class="text-slate-400">--- END AUDIT ---</span>');
    await sleep(600);
    printLog('<span class="text-red-500 bg-red-500/10 px-2 py-1 inline-block mt-2 font-bold">[ACTION] Invoice FLAGGED. Routing to AP Manager for review.</span>');

    // Restore Button
    await sleep(1500);
    btn.disabled = false;
    btn.innerText = "↻ Replay Audit Simulation";
    btn.className = "w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-sm bg-brand-emerald hover:bg-emerald-400 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)] transition mt-2";
}

/**
 * =========================================================
 * SIMULATION: CUSTOM API SYNCING (API-SYNC PAGE)
 * =========================================================
 */
async function runApiSim() {
    const btn = document.getElementById('btnSimApi');
    if (!btn) return;

    btn.disabled = true;
    btn.innerText = "Processing Webhook...";
    btn.className = "w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-sm bg-slate-800 text-slate-500 cursor-not-allowed mt-2";

    const logBox = document.getElementById('apiLogContainer');
    logBox.innerHTML = '';

    const printApiLog = (text, classes = "text-slate-300") => {
        const div = document.createElement('div');
        div.className = `opacity-0 transform translate-y-2 transition-all duration-300 ${classes} mb-1`;
        div.innerHTML = text;
        logBox.appendChild(div);
        setTimeout(() => {
            div.classList.remove('opacity-0', 'translate-y-2');
            logBox.scrollTop = logBox.scrollHeight;
        }, 50);
    };

    // 1. Webhook Received
    printApiLog('<span class="text-blue-400 font-bold">[POST 201]</span> Webhook caught from source: <span class="text-white">Shopify</span>');
    await sleep(1000);

    // 2. Parse Raw Payload
    printApiLog('<span class="text-slate-500">Parsing JSON Payload...</span>');
    await sleep(800);
    printApiLog(`
    <div class="bg-black border border-slate-800 p-2 rounded text-[9px] text-slate-400 overflow-hidden">
      {<br>
      &nbsp;&nbsp;"order_id": "88492",<br>
      &nbsp;&nbsp;"customer_name": "Tyler Mason",<br>
      &nbsp;&nbsp;"sku": ["A-102", "B-991"]<br>
      }
    </div>
  `);
    await sleep(1500);

    // 3. Data Transformation
    printApiLog('<span class="text-brand-api font-bold">[MIDDLEWARE]</span> Initiating Data Transformation...');
    await sleep(600);
    printApiLog('→ Mapping "order_id" to ERP "TicketNum"');
    await sleep(400);
    printApiLog('→ Formatting SKUs for Legacy System requirements');
    await sleep(1000);

    // 4. API Push
    printApiLog('<span class="text-yellow-400 font-bold">[REQ]</span> Executing API Push to: <span class="text-white">Warehouse_ERP</span>');
    await sleep(1200);

    // 5. Success Validation
    printApiLog('<span class="text-emerald-400 font-bold">[RES 200 OK]</span> Data successfully injected into Legacy Database.');
    await sleep(600);
    printApiLog('<span class="text-slate-500">Connection closed. Awaiting next event...</span>');

    // Restore Button
    await sleep(1500);
    btn.disabled = false;
    btn.innerText = "↻ Replay API Sync";
    btn.className = "w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-sm bg-brand-api hover:bg-fuchsia-400 text-white shadow-[0_0_15px_rgba(217,70,239,0.3)] transition mt-2";
}

/**
 * =========================================================
 * SIMULATION: DATABASE ARCHITECTURE (DATABASE-ARCH PAGE)
 * =========================================================
 */
async function runDbSim() {
    const btn = document.getElementById('btnSimDb');
    if (!btn) return;

    btn.disabled = true;
    btn.innerText = "Running Migration...";
    btn.className = "w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-sm bg-slate-800 text-slate-500 cursor-not-allowed mt-2";

    const excelState = document.getElementById('excelState');
    const migrationState = document.getElementById('migrationState');

    // 1. Initial State (Excel View is already visible)
    await sleep(1000);

    // 2. Trigger Migration Screen
    migrationState.classList.remove('hidden');
    setTimeout(() => {
        migrationState.classList.remove('opacity-0');
        migrationState.classList.add('opacity-100');
    }, 50);

    await sleep(2500); // Simulate processing time

    // 3. Hide Excel View behind the loading screen
    excelState.style.display = 'none';

    // 4. Fade out Migration Screen to reveal Clean DB View
    migrationState.classList.remove('opacity-100');
    migrationState.classList.add('opacity-0');

    setTimeout(() => {
        migrationState.classList.add('hidden');
    }, 500);

    // Restore Button
    await sleep(1000);
    btn.disabled = false;
    btn.innerText = "↻ Reset & Replay Migration";
    btn.className = "w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-sm bg-brand-db hover:bg-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] transition mt-2";

    // Add a one-time listener to reset the state when clicked again
    btn.onclick = () => {
        excelState.style.display = 'flex';
        runDbSim();
    };
}

/**
 * =========================================================
 * SIMULATION: PLAY AUDIO & REVEAL LOG (AI-ASSISTANT PAGE)
 * =========================================================
 */
let currentAiAudio = null;
let callTimerInterval = null;

function playVoiceDemo(scenario) {
    const activeCallView = document.getElementById('activeCallView');
    const logView = document.getElementById('logView');
    const transcript = document.getElementById('transcriptContainerAi');
    const callStatus = document.getElementById('callStatus');
    const btnRoofing = document.getElementById('btnSimRoofing');
    const btnSteak = document.getElementById('btnSimSteak');

    if (!activeCallView || !logView || !transcript) return;

    // Stop previous audio and timers if running
    if (currentAiAudio) {
        currentAiAudio.pause();
        currentAiAudio.currentTime = 0;
    }
    clearInterval(callTimerInterval);

    // Lock buttons during the call
    btnRoofing.disabled = true; btnSteak.disabled = true;
    btnRoofing.className = "flex-1 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-800 text-slate-500 border border-slate-800 cursor-not-allowed transition";
    btnSteak.className = "flex-1 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-800 text-slate-500 border border-slate-800 cursor-not-allowed transition";

    if (scenario === 'roofing') btnRoofing.innerText = "Call in progress...";
    if (scenario === 'steak') btnSteak.innerText = "Call in progress...";

    // Hide the log, show the Active Call screen
    logView.classList.add('hidden');
    activeCallView.classList.remove('hidden');
    activeCallView.classList.add('flex');
    callStatus.innerText = "Connecting...";

    // Prepare the transcript HTML for when the call ends
    const addLog = (speaker, text, isAi) => `
    <div class="p-3 rounded-xl border ${isAi ? 'bg-brand-ai/10 border-brand-ai/30 text-white' : 'bg-slate-800/50 border-slate-700 text-slate-300'}">
      <span class="text-[10px] font-bold font-mono uppercase tracking-wider block mb-1 ${isAi ? 'text-brand-ai' : 'text-slate-500'}">${speaker}</span>
      ${text}
    </div>
  `;

    let logHTML = '';
    if (scenario === 'roofing') {
        logHTML += addLog("AI Agent", "Thank you for calling Apex Roofing. This is Sarah, how can I help you today?", true);
        logHTML += addLog("Caller", "Hi, yeah, um... a tree branch hit my roof last night and I think there's a hole. Are you guys doing emergency tarps?", false);
        logHTML += addLog("AI Agent", "Oh no, I'm so sorry to hear that. Yes, we absolutely do emergency tarping. Are you dealing with any active leaking inside the house right now?", true);
        logHTML += addLog("Caller", "A little bit in the attic, yeah. It's supposed to rain again tonight.", false);
        logHTML += addLog("AI Agent", "Got it. We definitely want to get that covered up quickly before the rain. Let me check the schedule real quick... Okay, I can have an emergency crew out to you within two hours. Can I get your address so I can check the routing?", true);
    } else {
        logHTML += addLog("AI Agent", "Thanks for calling The Ironwood Steakhouse. How can I assist you?", true);
        logHTML += addLog("Caller", "Hi, do you guys have any tables open for 4 people tonight around 7?", false);
        logHTML += addLog("AI Agent", "Hi there! Let me check the book for tonight... It looks like 7:00 PM is completely booked, but I do have a table for four open at either 6:15 PM or 7:45 PM. Would either of those work for you?", true);
        logHTML += addLog("Caller", "Hmm, let's do 7:45. Also, do you have booths available?", false);
        logHTML += addLog("AI Agent", "We do! I will put a note in to request a booth for your party at 7:45 PM. Just to let you know, booths are first-come-first-serve based on requests, but we'll do our absolute best. Can I get a first and last name for the reservation?", true);
    }

    // Define what happens when the call ends (or fails to load)
    const endCall = () => {
        clearInterval(callTimerInterval);

        // Switch views back to the log
        activeCallView.classList.add('hidden');
        activeCallView.classList.remove('flex');
        logView.classList.remove('hidden');

        // Inject the text log
        transcript.innerHTML = logHTML;
        transcript.scrollTop = 0;

        // Restore button functionality
        btnRoofing.disabled = false; btnSteak.disabled = false;
        btnRoofing.className = "flex-1 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-brand-charcoal border border-slate-700 hover:border-brand-ai text-slate-300 transition";
        btnSteak.className = "flex-1 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-brand-charcoal border border-slate-700 hover:border-brand-ai text-slate-300 transition";

        if (scenario === 'roofing') {
            btnRoofing.className = "flex-1 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-brand-ai border border-brand-ai text-white shadow-[0_0_15px_rgba(244,63,94,0.3)] transition";
            btnRoofing.innerText = "↻ Replay Roofing Call";
            btnSteak.innerText = "▶ Play Steakhouse Call";
        } else {
            btnSteak.className = "flex-1 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-brand-ai border border-brand-ai text-white shadow-[0_0_15px_rgba(244,63,94,0.3)] transition";
            btnSteak.innerText = "↻ Replay Steakhouse Call";
            btnRoofing.innerText = "▶ Play Roofing Call";
        }
    };

    // Initialize and play the .m4a audio file
    currentAiAudio = new Audio(`asset/audio/${scenario}-demo.m4a`);

    // When the audio finishes, run the endCall function
    currentAiAudio.onended = endCall;

    // Fallback: If the audio file is missing or blocked, just show the transcript instantly
    currentAiAudio.onerror = () => {
        console.log("Audio file missing or failed to load. Skipping straight to transcript.");
        endCall();
    };

    currentAiAudio.play().then(() => {
        // Audio is playing successfully, start the call timer
        let seconds = 0;
        callTimerInterval = setInterval(() => {
            seconds++;
            const m = Math.floor(seconds / 60).toString().padStart(2, '0');
            const s = (seconds % 60).toString().padStart(2, '0');
            callStatus.innerHTML = `<span class="flex items-center justify-center gap-2"><span class="w-2 h-2 rounded-full bg-brand-ai animate-pulse"></span> ${m}:${s}</span>`;
        }, 1000);
    }).catch(err => {
        console.log("Browser blocked autoplay. Skipping straight to transcript.");
        endCall();
    });
}