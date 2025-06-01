/**
 * Portfolio Website for Gnaniaditya Mandali
 * Updated: June 2025
 * Original Template: iPortfolio by BootstrapMade
 * Customized by: Gnaniaditya Mandali
 */

(function () {
  "use strict";

  /*-----------------------------------------
   * 1. Header toggle
   *-----------------------------------------*/
  const headerToggleBtn = document.querySelector('.header-toggle');
  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /*-----------------------------------------
   * 2. Hide mobile nav on same-page/hash links
   *-----------------------------------------*/
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.querySelector('.header-show')) headerToggle();
    });
  });

  /*-----------------------------------------
   * 3. Toggle mobile nav dropdowns
   *-----------------------------------------*/
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /*-----------------------------------------
   * 4. Preloader
   *-----------------------------------------*/
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /*-----------------------------------------
   * 5. Scroll to top button
   *-----------------------------------------*/
  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      scrollTop.classList.toggle('active', window.scrollY > 100);
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /*-----------------------------------------
   * 6. AOS (Animate On Scroll) initialization
   *-----------------------------------------*/
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /*-----------------------------------------
   * 7. Typed.js for animated typing effect
   *-----------------------------------------*/
  const typedElement = document.querySelector('.typed');
  if (typedElement) {
    const items = typedElement.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: items,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /*-----------------------------------------
   * 8. Pure Counter (animated counters)
   *-----------------------------------------*/
  new PureCounter();

  /*-----------------------------------------
   * 9. Animate the skills section on reveal
   *-----------------------------------------*/
  document.querySelectorAll('.skills-animation').forEach(item => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: () => {
        item.querySelectorAll('.progress .progress-bar').forEach(bar => {
          bar.style.width = bar.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /*-----------------------------------------
   * 10. Initialize GLightbox
   *-----------------------------------------*/
  const glightbox = GLightbox({ selector: '.glightbox' });

  /*-----------------------------------------
   * 11. Isotope layout and filters
   *-----------------------------------------*/
  document.querySelectorAll('.isotope-layout').forEach(isotopeContainer => {
    const layout = isotopeContainer.getAttribute('data-layout') ?? 'masonry';
    const filter = isotopeContainer.getAttribute('data-default-filter') ?? '*';
    const sort = isotopeContainer.getAttribute('data-sort') ?? 'original-order';

    let iso;
    imagesLoaded(isotopeContainer.querySelector('.isotope-container'), () => {
      iso = new Isotope(isotopeContainer.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeContainer.querySelectorAll('.isotope-filters li').forEach(filterBtn => {
      filterBtn.addEventListener('click', function () {
        isotopeContainer.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        iso.arrange({ filter: this.getAttribute('data-filter') });
        if (typeof aosInit === 'function') aosInit();
      });
    });
  });

  /*-----------------------------------------
   * 12. Initialize Swiper sliders
   *-----------------------------------------*/
  function initSwiper() {
    document.querySelectorAll('.init-swiper').forEach(swiperContainer => {
      const config = JSON.parse(swiperContainer.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(swiperContainer, config);
    });
  }
  window.addEventListener('load', initSwiper);

  /*-----------------------------------------
   * 13. Smooth scrolling for hash links on page load
   *-----------------------------------------*/
  window.addEventListener('load', () => {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        const scrollMarginTop = parseInt(getComputedStyle(target).scrollMarginTop);
        window.scrollTo({ top: target.offsetTop - scrollMarginTop, behavior: 'smooth' });
      }, 100);
    }
  });

  /*-----------------------------------------
   * 14. Navigation active state on scroll
   *-----------------------------------------*/
  const navLinks = document.querySelectorAll('.navmenu a');
  function navScrollspy() {
    navLinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;
      const position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navScrollspy);
  document.addEventListener('scroll', navScrollspy);

})();
