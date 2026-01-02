/**
 * Theme Switcher - Simple dark/light mode toggle using CSS custom properties
 * Uses data-theme attribute on <html> element to override prefers-color-scheme
 */
(function() {
  'use strict';

  var STORAGE_KEY = 'theme-preference';

  function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY);
  }

  function setStoredTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function applyTheme(theme) {
    if (theme === 'dark' || theme === 'light') {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      // 'browser' or null - remove override, let CSS handle it
      document.documentElement.removeAttribute('data-theme');
    }
  }

  function initTheme() {
    var stored = getStoredTheme();
    if (stored) {
      applyTheme(stored);
    }
  }

  // Apply theme immediately to prevent flash
  initTheme();

  // Expose global API for theme switching
  window.theme = {
    switch: function(newTheme) {
      setStoredTheme(newTheme);
      applyTheme(newTheme);
    },
    get: function() {
      return getStoredTheme() || 'browser';
    }
  };
})();
