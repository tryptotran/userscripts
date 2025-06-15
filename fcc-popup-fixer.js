// ==UserScript==
// @name         FCC Popup Fixer (Make All Links Open in Tabs)
// @version      1.0
// @description  Converts javascript:openWindow(...) to standard links that open in new tabs
// @match        *://apps.fcc.gov/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const fixLinks = () => {
    document.querySelectorAll('a[href^="javascript:openWindow("]').forEach(a => {
      const match = a.getAttribute('href').match(/openWindow\('([^']+)'\)/);
      if (match && match[1]) {
        const realUrl = new URL(match[1], location.origin).href;
        a.setAttribute('href', realUrl);
        a.setAttribute('target', '_blank');
        a.removeAttribute('onclick'); // in case there's an extra click handler
      }
    });
  };

  // Run once after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixLinks);
  } else {
    fixLinks();
  }
})();
