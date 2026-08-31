document.addEventListener('DOMContentLoaded', () => {
  // Masonry / Gallery Filter
  const filterTabs = document.querySelectorAll('.masonry-tab');
  const masonryItems = document.querySelectorAll('.masonry-item');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-tab');

      masonryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'block';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          item.style.display = 'none';
        }
      });
    });
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // Booking Form Submission
  const bookingFormWarm = document.getElementById('bookingFormWarm');
  if (bookingFormWarm) {
    bookingFormWarm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = bookingFormWarm.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = 'Sending Booking Details...';
        setTimeout(() => {
          alert('Thank you! Vitthal Janardan and the Viya Films team have received your request. We will contact you shortly!');
          bookingFormWarm.reset();
          btn.disabled = false;
          btn.innerHTML = 'Submit Booking Request';
        }, 1500);
      }
    });
  }
});
