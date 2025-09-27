// Script tombol Copy
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.getAttribute('data-text');
    navigator.clipboard.writeText(text).then(() => {
      alert(`Nomor ${text} berhasil disalin!`);
    });
  });
});

