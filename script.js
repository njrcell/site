// Script tombol Copy rekening/e-wallet
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.getAttribute('data-text');
    navigator.clipboard.writeText(text).then(() => {
      alert(`Nomor ${text} berhasil disalin!`);
    });
  });
});
// Script tombol Download QRIS
document.getElementById('downloadQRIS').addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = document.getElementById('qrisImage').src;
  link.download = "QRIS_NJR_CELL.png";
  link.click();
});
