// Script tombol Copy rekening/e-wallet
document.querySelectorAll('.copy-btn').forEach(btn => {
  // Supaya tidak bentrok dengan tombol Download QRIS
  if (btn.id !== "downloadQRIS") {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-text');
      navigator.clipboard.writeText(text).then(() => {
        alert(`Nomor ${text} berhasil disalin!`);
      });
    });
  }
});

// Script tombol Download QRIS
const qrisBtn = document.getElementById('downloadQRIS');
if (qrisBtn) {
  qrisBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = document.getElementById('qrisImage').src;
    link.download = "QRIS_NJR_CELL.png";
    link.click();
    alert("✅ QRIS berhasil diunduh!");
  });
}

// ===== NJR CELL V2 – Cyber Glass Interactive =====
(() => {
  const header = document.querySelector('header');
  if (!header || document.querySelector('.cyber-core')) return;

  const style = document.createElement('style');
  style.textContent = `
    .cyber-core{position:absolute;left:50%;top:50px;width:clamp(120px,18vw,220px);height:clamp(120px,18vw,220px);transform:translateX(-50%);border-radius:50%;pointer-events:none;z-index:0;opacity:.82}
    .cyber-core::before{content:"";position:absolute;inset:8%;border:1px solid rgba(57,255,20,.35);border-radius:50%;box-shadow:0 0 25px rgba(57,255,20,.2),inset 0 0 30px rgba(57,255,20,.09);animation:coreSpin 9s linear infinite}
    .cyber-core::after{content:"";position:absolute;inset:24%;border:1px dashed rgba(168,255,138,.35);border-radius:50%;animation:coreSpinReverse 6s linear infinite}
    .cyber-core-label{position:absolute;inset:0;display:grid;place-items:center;font-size:.7rem;font-weight:900;letter-spacing:.18em;color:var(--neon);text-shadow:0 0 12px rgba(57,255,20,.8);animation:corePulse 2.4s ease-in-out infinite}
    .cyber-core-icon{position:absolute;inset:0;display:grid;place-items:center;font-size:2rem;filter:drop-shadow(0 0 10px rgba(57,255,20,.55));transform:translateY(7px);transition:opacity .25s,transform .25s}
    .cyber-stats{display:flex;justify-content:center;flex-wrap:wrap;gap:10px;margin:22px auto 0;max-width:720px;position:relative;z-index:2}
    .cyber-stat{min-width:105px;padding:9px 13px;border:1px solid rgba(57,255,20,.22);border-radius:999px;background:rgba(5,10,7,.58);backdrop-filter:blur(10px);box-shadow:0 8px 24px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.03)}
    .cyber-stat strong{display:block;color:var(--neon);font-size:1rem;line-height:1.1}.cyber-stat span{display:block;color:#a9b9aa;font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;margin-top:4px}
    .cyber-ready{animation:cyberReady .8s ease both}
    @keyframes coreSpin{to{transform:rotate(360deg)}}
    @keyframes coreSpinReverse{to{transform:rotate(-360deg)}}
    @keyframes corePulse{0%,100%{opacity:.72;transform:scale(.98)}50%{opacity:1;transform:scale(1.04)}}
    @keyframes cyberReady{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    @media(max-width:768px){.cyber-core{top:42px;width:120px;height:120px}.cyber-core-icon{font-size:1.5rem}.cyber-stats{gap:7px;margin-top:18px}.cyber-stat{min-width:82px;padding:8px 9px}}
    @media(prefers-reduced-motion:reduce){.cyber-core::before,.cyber-core::after,.cyber-core-label{animation:none}.cyber-ready{animation:none}}
  `;
  document.head.appendChild(style);

  header.classList.add('cyber-ready');

  const core = document.createElement('div');
  core.className = 'cyber-core';
  core.setAttribute('aria-hidden','true');
  core.innerHTML = '<div class="cyber-core-label">NJR CELL</div><div class="cyber-core-icon">💸</div>';
  header.appendChild(core);

  const stats = document.createElement('div');
  stats.className = 'cyber-stats';
  stats.innerHTML = `
    <div class="cyber-stat"><strong>24 JAM</strong><span>Siap Melayani</span></div>
    <div class="cyber-stat"><strong>2 OUTLET</strong><span>Ciamis</span></div>
    <div class="cyber-stat"><strong>BANK</strong><span>Transfer & Tarik Tunai</span></div>
    <div class="cyber-stat"><strong>E-WALLET</strong><span>Transaksi Digital</span></div>`;
  header.appendChild(stats);

  const icons = ['💸','🏦','🎮','📶','⚡','🏥'];
  const iconEl = core.querySelector('.cyber-core-icon');
  let iconIndex = 0;
  setInterval(() => {
    iconIndex = (iconIndex + 1) % icons.length;
    iconEl.style.opacity = '0';
    iconEl.style.transform = 'translateY(7px) scale(.86)';
    setTimeout(() => {
      iconEl.textContent = icons[iconIndex];
      iconEl.style.opacity = '1';
      iconEl.style.transform = 'translateY(7px) scale(1)';
    }, 180);
  }, 3000);

  if (window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / r.width;
        const y = (e.clientY - r.top - r.height / 2) / r.height;
        btn.style.setProperty('--mx', `${(x * 6).toFixed(2)}px`);
        btn.style.setProperty('--my', `${(y * 5).toFixed(2)}px`);
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.removeProperty('--mx');
        btn.style.removeProperty('--my');
      });
    });
    const magneticStyle = document.createElement('style');
    magneticStyle.textContent = '.btn:hover{translate:var(--mx,0) var(--my,0)}';
    document.head.appendChild(magneticStyle);
  }
})();
