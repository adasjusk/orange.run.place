// script.js

;(function() {
  // ——————————————
  // 0) DOMAIN-CHANGE WARNING
  // ——————————————
  const oldHosts = ['orange.run.place', 'www.orange.run.place'];
  if (oldHosts.includes(window.location.hostname)) {
    document.addEventListener('DOMContentLoaded', () => {
      // mark body so CSS can push content down
      document.body.classList.add('domain-warning-active');

      // create banner
      const banner = document.createElement('div');
      banner.className = 'domain-warning';
      banner.innerHTML = `
        ⚠️ This site has moved to
        <a href="https://oranges.lt" target="_self">https://oranges.lt</a>.
        Please update your bookmarks.
      `;
      document.body.prepend(banner);
    });
  }

  // ——————————————
  // 1) CLEAN UP URL ON LOAD
  // ——————————————
  const path = window.location.pathname;
  if (/^\/index(?:\.html)?$/.test(path)) {
    history.replaceState(null, '', '/');
  } else if (path.endsWith('.html')) {
    history.replaceState(null, '', path.slice(0, -5));
  }

  // ——————————————
  // 2) RANDOM BACKGROUND
  // ——————————————
  window.addEventListener('load', () => {
    const images = ['image.png', 'image2.png'];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.body.style.backgroundImage = `url('${randomImage}')`;
  });

  // ——————————————
  // 3) INTERCEPT .html LINKS & CLEAN NAV
  // ——————————————
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        const href = link.getAttribute('href');
        const cleanPath = href.replace(/\.html$/, '');
        history.pushState(null, '', cleanPath);
        window.location.href = cleanPath;
      });
    });

    // ——————————————
    // 4) COPY IP BUTTON
    // ——————————————
    const copyIpButton = document.getElementById('copy-ip');
    if (copyIpButton) {
      copyIpButton.addEventListener('click', () => {
        const ipAddress = document.getElementById('server-ip').textContent;
        navigator.clipboard.writeText(ipAddress)
          .then(() => alert('IP Address copied to clipboard!'))
          .catch(err => console.error('Failed to copy IP Address:', err));
      });
    }
  });

  // ——————————————
  // 5) HANDLE BACK/FORWARD
  // ——————————————
  window.addEventListener('popstate', () => {
    window.location.reload();
  });
})();
