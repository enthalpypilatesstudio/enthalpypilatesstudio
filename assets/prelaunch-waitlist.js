// ENTHALPY — Pre-Launch Waitlist & Educational Experience Engine

(function () {
  // 1. Build and Inject the Waitlist Modal if not already present
  function injectWaitlistModal() {
    if (document.getElementById('waitlist-modal')) return;

    const modalHtml = `
    <div id="waitlist-modal" class="wl-modal-overlay" aria-hidden="true" role="dialog" aria-labelledby="wl-title">
      <div class="wl-modal-card">
        <button class="wl-modal-close" onclick="window.closeWaitlistModal()" aria-label="Close modal">&times;</button>
        
        <div id="wl-form-container">
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <span class="ey" style="color: #7D5A44;">Pre-Launch Priority Access</span>
            <h2 id="wl-title" class="d3" style="margin: 0; font-size: clamp(24px, 3vw, 32px);">Join the ENTHALPY Waitlist</h2>
            <p class="p sm muted" style="margin: 6px 0 0;">Opening Soon in Defence Colony, New Delhi. Dedicated Reformer Pilates studio engineered for both men and women. Register to receive priority booking notifications.</p>
          </div>

          <div class="wl-perk-pills">
            <span class="wl-perk-pill">● Defence Colony, New Delhi</span>
            <span class="wl-perk-pill">● Priority Reformer Booking</span>
            <span class="wl-perk-pill">● For Men & Women</span>
          </div>

          <form id="waitlist-form" onsubmit="window.handleWaitlistSubmit(event)" style="display: flex; flex-direction: column; gap: 14px;">
            <div class="fld">
              <label for="wl-name" style="font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;">Full Name *</label>
              <input type="text" id="wl-name" class="inp" required placeholder="e.g. Rahul Sharma" style="height: 48px; border: 1px solid #4A342A; background: transparent; padding: 0 14px; font-family: inherit; font-size: 14px; width: 100%;">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="fld">
                <label for="wl-phone" style="font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;">WhatsApp / Mobile *</label>
                <input type="tel" id="wl-phone" class="inp" required placeholder="+91 95899 92237" style="height: 48px; border: 1px solid #4A342A; background: transparent; padding: 0 14px; font-family: inherit; font-size: 14px; width: 100%;">
              </div>
              <div class="fld">
                <label for="wl-email" style="font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;">Email Address *</label>
                <input type="email" id="wl-email" class="inp" required placeholder="name@domain.com" style="height: 48px; border: 1px solid #4A342A; background: transparent; padding: 0 14px; font-family: inherit; font-size: 14px; width: 100%;">
              </div>
            </div>

            <div class="fld">
              <label for="wl-goal" style="font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;">Primary Movement Goal</label>
              <select id="wl-goal" class="inp" style="height: 48px; border: 1px solid #4A342A; background: #F5F1EA; padding: 0 14px; font-family: inherit; font-size: 14px; width: 100%; cursor: pointer;">
                <option value="Athletic Core Strength & Conditioning (Men & Women)">Athletic Core Strength & Conditioning</option>
                <option value="Spine Decompression & Posture Correction">Spine Decompression & Posture Correction (Tech-neck / Desk strain)</option>
                <option value="Full-Body Lean Muscle Sculpting & Tone">Full-Body Lean Muscle Sculpting & Tone</option>
                <option value="Joint Mobility & Injury Rehabilitation">Joint Mobility & Injury Rehabilitation</option>
                <option value="Brand New to Reformer Pilates">Brand New to Reformer Pilates (Beginners)</option>
              </select>
            </div>

            <div class="fld">
              <label for="wl-time" style="font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;">Preferred Class Time Window</label>
              <select id="wl-time" class="inp" style="height: 48px; border: 1px solid #4A342A; background: #F5F1EA; padding: 0 14px; font-family: inherit; font-size: 14px; width: 100%; cursor: pointer;">
                <option value="Early Morning (6:30 AM – 8:30 AM)">Early Morning (6:30 AM – 8:30 AM)</option>
                <option value="Mid-Morning (9:30 AM – 11:30 AM)">Mid-Morning (9:30 AM – 11:30 AM)</option>
                <option value="Evening (5:30 PM – 8:00 PM)">Evening (5:30 PM – 8:00 PM)</option>
                <option value="Weekends (Saturday & Sunday)">Weekends (Saturday & Sunday)</option>
              </select>
            </div>

            <button type="submit" id="wl-submit-btn" class="btn" style="min-height: 52px; width: 100%; background: #4A342A; color: #F5F1EA; font-weight: 600; font-size: 13px; letter-spacing: .14em; text-transform: uppercase; cursor: pointer; border: none; margin-top: 8px;">
              Join Waitlist
            </button>
            <span class="sm muted" style="text-align: center; font-size: 11px;">Opening in Defence Colony, New Delhi · No advance fee</span>
          </form>
        </div>

        <div id="wl-success-container" style="display: none; text-align: center; padding: 20px 0;">
          <div style="width: 52px; height: 52px; border-radius: 50%; background: #4A342A; color: #F5F1EA; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 18px;">✓</div>
          <span class="ey" style="color: #7D5A44;">Waitlist Confirmed</span>
          <h3 class="d3" style="margin: 8px 0 14px;">You're on the ENTHALPY Waitlist!</h3>
          <p class="p" style="max-width: 440px; margin: 0 auto 20px; font-size: 15px; line-height: 1.6;">
            Your registration is confirmed. Your reference ID is <strong id="wl-founder-code" style="color: #7D5A44; font-family: monospace; font-size: 16px;">ENT-WL-101</strong>.
          </p>
          <div style="background: #E8E2D7; padding: 16px; border-radius: 4px; max-width: 440px; margin: 0 auto 24px; text-align: left; font-size: 13px; line-height: 1.5;">
            <strong>Opening in Defence Colony, New Delhi:</strong> You will receive a direct WhatsApp notification from our studio team as soon as scheduling and private pre-opening sessions open.
          </div>
          <button class="btn btn-sm btn-o" onclick="window.closeWaitlistModal()">Close</button>
        </div>
      </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  // 2. Open / Close functions on window
  window.openWaitlistModal = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    injectWaitlistModal();
    const modal = document.getElementById('waitlist-modal');
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      const firstInput = document.getElementById('wl-name');
      if (firstInput) setTimeout(() => firstInput.focus(), 100);
    }
  };

  window.closeWaitlistModal = function () {
    const modal = document.getElementById('waitlist-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  };

  // 3. Handle Form Submission
  window.handleWaitlistSubmit = async function (e) {
    e.preventDefault();
    const btn = document.getElementById('wl-submit-btn');
    if (btn) {
      btn.innerText = 'Registering on Waitlist...';
      btn.disabled = true;
    }

    const name = document.getElementById('wl-name')?.value || '';
    const phone = document.getElementById('wl-phone')?.value || '';
    const email = document.getElementById('wl-email')?.value || '';
    const goal = document.getElementById('wl-goal')?.value || '';
    const time = document.getElementById('wl-time')?.value || '';

    const payload = { name, phone, email, goal, preferredTime: time, source: window.location.pathname };

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      const code = data.founderId || ('ENT-WL-' + Math.floor(100 + Math.random() * 900));
      showSuccess(code);
    } catch (err) {
      const randomId = 'ENT-WL-' + Math.floor(100 + Math.random() * 900);
      const list = JSON.parse(localStorage.getItem('enthalpy_waitlist') || '[]');
      list.push({ ...payload, founderId: randomId, date: new Date().toISOString() });
      localStorage.setItem('enthalpy_waitlist', JSON.stringify(list));
      showSuccess(randomId);
    }
  };

  function showSuccess(code) {
    const formBox = document.getElementById('wl-form-container');
    const successBox = document.getElementById('wl-success-container');
    const codeEl = document.getElementById('wl-founder-code');
    if (formBox) formBox.style.display = 'none';
    if (successBox) successBox.style.display = 'block';
    if (codeEl) codeEl.innerText = code;
  }

  // 4. Attach event listeners
  document.addEventListener('DOMContentLoaded', function () {
    injectWaitlistModal();

    // Delegate clicks to open-waitlist-modal
    document.addEventListener('click', function (e) {
      const target = e.target.closest('.open-waitlist-modal, a[href="#waitlist"], button[data-waitlist]');
      if (target) {
        e.preventDefault();
        window.openWaitlistModal();
      }
    });

    // Close on backdrop click
    const modal = document.getElementById('waitlist-modal');
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) window.closeWaitlistModal();
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') window.closeWaitlistModal();
    });
  });

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    injectWaitlistModal();
  }
})();
