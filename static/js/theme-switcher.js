/**
 * Theme Switcher - Dark/light mode toggle with sun/moon icons
 * 
 * Behavior:
 * - On first visit: Follow browser's prefers-color-scheme
 * - When user clicks toggle: Switch theme and save to localStorage
 * - On return visit: Restore saved preference
 * 
 * Note: Initial theme is applied via inline script in <head> to prevent FOIT.
 */
(function() {
  'use strict';

  var STORAGE_KEY = 'theme-preference';
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // localStorage not available
    }
  }

  function getEffectiveTheme() {
    var stored = getStoredTheme();
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    // Follow system preference
    return darkQuery.matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark' || theme === 'light') {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    updateIcon();
  }

  function updateIcon() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    
    var sunIcon = btn.querySelector('.fa-sun');
    var moonIcon = btn.querySelector('.fa-moon');
    if (!sunIcon || !moonIcon) return;

    var effective = getEffectiveTheme();
    // Show sun when dark (click to go light), show moon when light (click to go dark)
    sunIcon.style.display = effective === 'dark' ? 'inline' : 'none';
    moonIcon.style.display = effective === 'light' ? 'inline' : 'none';
  }

  function toggle() {
    var current = getEffectiveTheme();
    var next = current === 'dark' ? 'light' : 'dark';
    setStoredTheme(next);
    applyTheme(next);
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', toggle);
    }
    updateIcon();
  });

  // Listen for system preference changes (when no manual override)
  darkQuery.addEventListener('change', function() {
    if (!getStoredTheme()) {
      updateIcon();
    }
  });

  // Expose global API
  window.theme = {
    toggle: toggle,
    get: getEffectiveTheme
  };
})();

/**
 * Reading Progress Bar
 * Shows scroll progress as a thin bar at the top of the page
 */
(function() {
  'use strict';

  var progressBar = null;

  function updateProgress() {
    if (!progressBar) return;
    
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (docHeight > 0) {
      var progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = Math.min(progress, 100) + '%';
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    progressBar = document.getElementById('reading-progress');
    if (progressBar) {
      window.addEventListener('scroll', updateProgress, { passive: true });
      updateProgress();
    }
  });
})();
