/* ========================================================
   DRA. ANDRESSA DORINI - MÉDICA PSIQUIATRA
   Interactive Application Script
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close other items
      faqItems.forEach(el => el.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 4. Appointment Modal Handler
  const modal = document.getElementById('appointmentModal');
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const modalClose = document.querySelector('.modal-close');
  const appointmentForm = document.getElementById('appointmentForm');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.classList.add('active');
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // 5. Form Submit -> WhatsApp Direct Link
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value.trim();
      const preference = document.getElementById('formModality').value;
      const topic = document.getElementById('formReason').value;
      const notes = document.getElementById('formNotes').value.trim();

      const phone = "5541988662325";
      let text = `Olá, Dra. Andressa Dorini! Gostaria de informações sobre agendamento de consulta.\n\n`;
      text += `*Nome:* ${name}\n`;
      text += `*Modalidade:* ${preference}\n`;
      text += `*Interesse:* ${topic}\n`;
      if (notes) {
        text += `*Observação:* ${notes}\n`;
      }
      text += `\nAguardando confirmação de horários disponíveis. Obrigado!`;

      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
      if (modal) modal.classList.remove('active');
    });
  }

  // 6. Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 7. Counter Animation for Trust Metrics
  const counters = document.querySelectorAll('.trust-number[data-count]');
  let animated = false;

  const countUp = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-count');
      let current = 0;
      const increment = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.innerText = target + (counter.getAttribute('data-suffix') || '');
          clearInterval(timer);
        } else {
          counter.innerText = current + (counter.getAttribute('data-suffix') || '');
        }
      }, 35);
    });
  };

  const metricsSection = document.querySelector('.hero-trust-metrics');
  if (metricsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          countUp();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(metricsSection);
  }
});

