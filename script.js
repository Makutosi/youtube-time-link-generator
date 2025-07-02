/* Youtube Time Link Generator / 30.6.2025 */

// 1. generateButton のイベントリスナー
document.getElementById('generateButton').addEventListener('click', function () {
  let url = document.getElementById('url').value.trim();
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;
  const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

  if (!url || !url.includes("youtu")) {
    alert("Please enter a valid YouTube URL.");
    return;
  }

  // 既存の t= または start= を除去
  url = url.replace(/([?&])(t|start)=\d+s?/g, '').replace(/([?&])$/, '');

  let timeUrl = "";
  if (url.includes("youtu.be/")) {
    timeUrl = url + "?t=" + totalSeconds;
  } else {
    const separator = url.includes("?") ? "&" : "?";
    timeUrl = url + separator + "t=" + totalSeconds;
  }

  const linkEl = document.getElementById('generatedLink');
  linkEl.href = timeUrl;
  linkEl.style.display = 'block';

  const displayEl = document.getElementById('displayLink');
  displayEl.textContent = timeUrl;
  displayEl.style.display = 'block';

  const copyBtn = document.getElementById('copyButton');
  copyBtn.style.display = 'inline-block';
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(timeUrl).then(() => {
      document.getElementById('copyStatus').textContent = "✔ Copied!";
    });
  };
  document.getElementById('copyStatus').textContent = "";
});

// 2. ダークモード処理
const toggleButton = document.getElementById('toggleDarkMode');

toggleButton.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  toggleButton.textContent = isDark ? 'Light Mode' : 'Dark Mode';
});

window.addEventListener('DOMContentLoaded', () => {
  toggleButton.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
});

// 3. ServiceWorker 登録
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(error => {
      console.log('ServiceWorker registration failed:', error);
    });
  });
}