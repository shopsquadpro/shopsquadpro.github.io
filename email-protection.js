/**
 * RecetaFlex - Email Protection Script
 * Obfuscates email addresses to prevent bot scraping
 */

(function() {
  'use strict';

  /**
   * Renders an obfuscated, non-selectable email address
   * @param {string} elementId - The ID of the element to render the email in
   * @param {boolean} isClickable - Whether to make it a mailto link (default: false)
   */
  window.renderProtectedEmail = function(elementId, isClickable) {
    setTimeout(function() {
      var p1 = atob('cmVjZXRh');
      var p2 = atob('ZmxleA==');
      var p3 = atob('Z21haWw=');
      var p4 = atob('Y29t');
      var at = String.fromCharCode(32+32);
      var dot = String.fromCharCode(46);
      
      var fullEmail = p1 + p2 + at + p3 + dot + p4;
      var targetElement = document.getElementById(elementId);
      
      if (!targetElement) return;
      
      if (isClickable) {
        // Render as clickable link (less protection)
        var link = document.createElement('a');
        link.href = 'mailto:' + fullEmail;
        link.textContent = fullEmail;
        link.style.cssText = 'color:#FF8542;text-decoration:none;';
        targetElement.appendChild(link);
      } else {
        // Render as non-selectable text (maximum protection)
        var parts = [p1+p2, at, p3, dot, p4];
        var emailSpan = document.createElement('span');
        
        for(var i=0; i<parts.length; i++) {
          var s = document.createElement('span');
          s.textContent = parts[i];
          s.style.cssText = 'display:inline;pointer-events:none;';
          emailSpan.appendChild(s);
        }
        
        emailSpan.style.cssText = 'color:#FF8542;font-weight:600;letter-spacing:1px;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;';
        emailSpan.setAttribute('data-content', 'protected');
        emailSpan.addEventListener('contextmenu', function(e) { e.preventDefault(); });
        targetElement.appendChild(emailSpan);
      }
    }, 500);
  };

  /**
   * Renders obfuscated contact address information
   * @param {string} elementId - The ID of the element to render the address in
   */
  window.renderProtectedAddress = function(elementId) {
    setTimeout(function() {
      var addr = [
        atob('VGhlIENhbm5vbiBhdCBXZXN0IEhvdXN0b24='),
        atob('MTMzNCBCcml0dG1vb3JlIFJkLCBTdWl0ZSAxMDAwQg=='),
        atob('SG91c3RvbiwgVFggNzcwNDM=')
      ];
      
      var targetElement = document.getElementById(elementId);
      if (!targetElement) return;
      
      var container = document.createElement('div');
      container.style.cssText = 'user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;';
      container.addEventListener('contextmenu', function(e) { e.preventDefault(); });
      
      for(var i=0; i<addr.length; i++) {
        var line = document.createElement('span');
        line.textContent = addr[i];
        line.style.cssText = 'display:block;pointer-events:none;';
        container.appendChild(line);
      }
      
      targetElement.appendChild(container);
    }, 500);
  };
})();

