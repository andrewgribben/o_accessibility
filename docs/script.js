(function () {
  // Add JS-enabled class for progressive enhancement
  document.documentElement.classList.add('js-enabled');
  
  const showLineNumbersToggle = document.getElementById('show-line-numbers');
  const poemContainer = document.querySelector('.poem');
  const stanzaContainers = document.querySelectorAll('.stanza-lines');
  const lines = document.querySelectorAll('.line');
  const lineNumLinks = document.querySelectorAll('.line-num');

  // Set initial state - hide line numbers and screen reader announcements
  const srLineSpans = document.querySelectorAll('.sr-line');
  lineNumLinks.forEach(link => link.setAttribute('aria-hidden', 'true'));
  srLineSpans.forEach(span => span.setAttribute('aria-hidden', 'true'));

  // Toggle line number visibility
  if (showLineNumbersToggle && poemContainer) {
    showLineNumbersToggle.addEventListener('change', () => {
      if (showLineNumbersToggle.checked) {
        poemContainer.classList.add('show-line-numbers');
        stanzaContainers.forEach(container => container.classList.add('show-line-numbers'));
        // Make line numbers available to screen readers
        lineNumLinks.forEach(link => link.removeAttribute('aria-hidden'));
        srLineSpans.forEach(span => span.removeAttribute('aria-hidden'));
      } else {
        poemContainer.classList.remove('show-line-numbers');
        stanzaContainers.forEach(container => container.classList.remove('show-line-numbers'));
        // Hide line numbers from screen readers
        lineNumLinks.forEach(link => link.setAttribute('aria-hidden', 'true'));
        srLineSpans.forEach(span => span.setAttribute('aria-hidden', 'true'));
      }
    });
  }

  // Handle line number link clicks to copy URL to clipboard
  lineNumLinks.forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault(); // Prevent default anchor behavior
      const target = link.getAttribute('href');
      if (!target) return;
      
      const url = location.origin + location.pathname + target;
      try {
        await navigator.clipboard.writeText(url);
        // Provide visual feedback
        const originalText = link.textContent;
        link.textContent = '✓';
        link.style.color = 'var(--accent)';
        setTimeout(() => {
          link.textContent = originalText;
          link.style.color = '';
        }, 1000);
      } catch {
        // Fallback for older browsers
        const temp = document.createElement('input');
        temp.value = url;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        
        // Provide visual feedback
        const originalText = link.textContent;
        link.textContent = '✓';
        link.style.color = 'var(--accent)';
        setTimeout(() => {
          link.textContent = originalText;
          link.style.color = '';
        }, 1000);
      }
    });
  });

  // Update URL hash when lines are focused
  lines.forEach(li => {
    li.addEventListener('focusin', () => {
      const id = li.id;
      if (id && location.hash !== '#' + id) {
        history.replaceState(null, '', '#' + id);
      }
    });
  });
})();