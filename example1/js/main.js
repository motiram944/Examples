document.addEventListener('DOMContentLoaded', () => {
  // Header scroll class
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Drawer
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileClose = document.querySelector('.mobile-drawer-close');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    }
  }

  // Hero Slider
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  if (slides.length > 0) {
    slideInterval = setInterval(nextSlide, 5000);
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(idx);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  // Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => item.style.opacity = '1', 50);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });

  // Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightboxModal) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('.portfolio-title');
        if (img && lightboxImg) {
          lightboxImg.src = img.src;
          if (title && lightboxTitle) lightboxTitle.textContent = title.textContent;
          lightboxModal.classList.add('active');
        }
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightboxModal.classList.remove('active');
      });
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // Interactive Price Calculator
  const daysSlider = document.getElementById('calcDays');
  const daysValDisplay = document.getElementById('calcDaysVal');
  const pkgButtons = document.querySelectorAll('.btn-radio[data-pkg]');
  const calculatedPriceDisplay = document.getElementById('calcPriceDisplay');

  let selectedDays = 2;
  let selectedPkgMultiplier = 1.0;

  function updateCalculator() {
    if (!calculatedPriceDisplay) return;

    if (daysSlider && daysValDisplay) {
      selectedDays = parseInt(daysSlider.value);
      daysValDisplay.textContent = `${selectedDays} ${selectedDays === 1 ? 'Day' : 'Days'}`;
    }

    const basePerDay = 150000;
    const total = selectedDays * basePerDay * selectedPkgMultiplier;

    // Format currency string ₹
    calculatedPriceDisplay.textContent = `₹ ${total.toLocaleString('en-IN')}`;
  }

  if (daysSlider) {
    daysSlider.addEventListener('input', updateCalculator);
  }

  pkgButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      pkgButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPkgMultiplier = parseFloat(btn.getAttribute('data-multiplier') || '1');
      updateCalculator();
    });
  });

  updateCalculator();

  // Booking Form Submission Demo
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending Inquiry...</span>`;

        setTimeout(() => {
          alert('Thank you for contacting Viya Films! Our team will reach out within 24-48 hours with your custom proposal.');
          bookingForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 1500);
      }
    });
  }
});
