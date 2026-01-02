/**
 * Theme Switcher - Dark/light mode toggle using CSS custom properties
 * Uses data-theme attribute on <html> element to override prefers-color-scheme
 * 
 * Note: Initial theme is applied via inline script in <head> to prevent FOIT.
 * This script provides the switching API and handles system preference changes.
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
      if (theme === 'browser') {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, theme);
      }
    } catch (e) {
      // localStorage not available
    }
  }

  function applyTheme(theme) {
    if (theme === 'dark' || theme === 'light') {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      // 'browser' or null - remove override, let CSS @media query handle it
      document.documentElement.removeAttribute('data-theme');
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

  // Listen for system preference changes (only matters when theme is 'browser')
  darkQuery.addEventListener('change', function() {
    var stored = getStoredTheme();
    if (!stored || stored === 'browser') {
      // No override set, CSS handles it automatically via @media query
      // But we might want to update any UI indicators here
    }
  });

  // Expose global API for theme switching
  window.theme = {
    switch: function(newTheme) {
      setStoredTheme(newTheme);
      applyTheme(newTheme);
    },
    get: function() {
      return getStoredTheme() || 'browser';
    },
    getEffective: function() {
      return getEffectiveTheme();
    }
  };
})();
