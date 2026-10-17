(function () {
  'use strict';

  var config = document.getElementById('portfolio-analytics');
  var projectId = config && config.getAttribute('data-project-id');
  if (!projectId || !/^[a-z0-9]+$/i.test(projectId)) return;

  window.clarity = window.clarity || function () {
    (window.clarity.q = window.clarity.q || []).push(arguments);
  };
  // Always use cookieless mode, regardless of choices saved by the previous banner.
  // Queue both denials before requesting Microsoft's script to prevent cookie storage.
  window.clarity('consentv2', { analytics_Storage: 'denied', ad_Storage: 'denied' });
  window.clarity('set', 'site', 'portfolio');
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.clarity.ms/tag/' + projectId;
  document.head.appendChild(script);
  trackEngagement();
  document.addEventListener('click', trackClick, true);

  function context(element, prefix) {
    var section = element.closest('[data-analytics-section]');
    var item = element.closest('[data-analytics-item]');
    if (section) window.clarity('set', prefix + '_section', section.getAttribute('data-analytics-section'));
    if (item) window.clarity('set', prefix + '_item', item.getAttribute('data-analytics-item'));
    return section ? section.getAttribute('data-analytics-section') : null;
  }

  function trackClick(event) {
    if (!(event.target instanceof Element)) return;
    var link = event.target.closest('a[href], .booking-link');
    if (!link) return;
    var name;
    var href = link.getAttribute('href') || '';
    var section = context(link, 'clicked');
    if (link.matches('.booking-link')) name = 'booking_open';
    else if (/^mailto:/i.test(href)) name = 'email_click';
    else if (/^tel:/i.test(href)) name = 'phone_click';
    else if (link.closest('.pdf') || (!section && /\.pdf(?:[?#]|$)/i.test(href))) name = 'resume_click';
    else if (link.closest('.linkedin')) name = 'linkedin_click';
    else if (link.closest('.github')) name = 'github_profile_click';
    else if (section && href && href.charAt(0) !== '#') name = section + '_link_click';
    else if (link.closest('.internal-links-container')) name = 'other_site_click';
    if (name) window.clarity('event', name);
    // Send the destination host only; never send mail addresses, phone numbers, or URL queries as tags.
    if (/^https?:/i.test(link.href)) {
      var destination = new URL(link.href);
      if (destination.host !== window.location.host) {
        window.clarity('set', 'outbound_host', destination.hostname);
        window.clarity('event', 'outbound_link_click');
      }
    }
  }

  function trackEngagement() {
    if (!('IntersectionObserver' in window)) return;
    var targets = document.querySelectorAll('[data-analytics-section], [data-analytics-item]');
    var seen = new WeakSet();
    var timers = new Map();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var element = entry.target;
        if (!entry.isIntersecting || document.hidden) {
          window.clearTimeout(timers.get(element));
          timers.delete(element);
        } else if (!seen.has(element) && !timers.has(element)) {
          timers.set(element, window.setTimeout(function () {
            timers.delete(element);
            if (document.hidden) return;
            seen.add(element);
            observer.unobserve(element);
            var section = context(element, 'viewed');
            window.clarity('event', element.hasAttribute('data-analytics-item') ? 'portfolio_item_engaged' : section + '_engaged');
          }, 2000));
        }
      });
    });

    function observeVisiblePage() {
      timers.forEach(function (timer) { window.clearTimeout(timer); });
      timers.clear();
      observer.disconnect();
      if (!document.hidden) {
        targets.forEach(function (element) {
          if (!seen.has(element)) observer.observe(element);
        });
      }
    }
    document.addEventListener('visibilitychange', observeVisiblePage);
    observeVisiblePage();
  }

})();
