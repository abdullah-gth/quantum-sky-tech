// 1. Particles Canvas System
const colors = ['#C91C34', '#8B1524', '#ffffff', '#34d399', '#f59e0b'];

class ParticleSystem {
  constructor(canvasId, particleCount, sizeMultiplier = 1) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = particleCount;
    this.sizeMultiplier = sizeMultiplier;

    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.animateParticles = this.animateParticles.bind(this);

    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas);

    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
    this.animateParticles();
  }

  resizeCanvas() {
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
  }

  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: (Math.random() * 3 + 1) * this.sizeMultiplier,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.7 + 0.3
    };
  }

  updateParticle(p) {
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0 || p.x > this.canvas.width || p.y < 0 || p.y > this.canvas.height) {
      Object.assign(p, this.createParticle());
    }
  }

  drawParticle(p) {
    this.ctx.save();
    this.ctx.globalAlpha = p.alpha;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    this.ctx.fillStyle = p.color;
    this.ctx.shadowBlur = 10 * this.sizeMultiplier;
    this.ctx.shadowColor = p.color;
    this.ctx.fill();
    this.ctx.restore();
  }

  animateParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(p => {
      this.updateParticle(p);
      this.drawParticle(p);
    });
    requestAnimationFrame(this.animateParticles);
  }
}

new ParticleSystem('heroParticles', 90);
new ParticleSystem('btnParticles', 15, 0.6); // Fewer and smaller particles for the button

// 2. Swiper Services Carousel
const servicesSwiper = new Swiper('.servicesSwiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: { delay: 4000 },
  pagination: { el: '.swiper-pagination', clickable: true },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});

// 3. Swiper Review Testimonials
const reviewSwiper = new Swiper('.reviewSwiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: { delay: 5000 },
  pagination: { el: '.swiper-pagination', clickable: true },
  breakpoints: {
    768: { slidesPerView: 2 }
  }
});

// 4. Drawer Overlay Dynamic Menu Toggle
const openOverlayBtn = document.getElementById('openOverlayBtn');
const closeOverlayBtn = document.getElementById('closeOverlayBtn');
const fullOverlayMenu = document.getElementById('fullOverlayMenu');

openOverlayBtn.addEventListener('click', () => {
  fullOverlayMenu.classList.remove('-translate-y-full');
  fullOverlayMenu.classList.add('translate-y-0');
});

closeOverlayBtn.addEventListener('click', () => {
  fullOverlayMenu.classList.remove('translate-y-0');
  fullOverlayMenu.classList.add('-translate-y-full');
});

// 5. Tech Stack Tab Switcher
function switchTab(tabName) {
  document.querySelectorAll('.tech-content').forEach(content => {
    content.classList.add('hidden');
  });
  document.querySelectorAll('.tech-tab-btn').forEach(btn => {
    btn.classList.remove('text-brandRed', 'border-brandRed', 'bg-cardBg');
    btn.classList.add('text-gray-400', 'border-transparent');
  });

  document.getElementById('content-' + tabName).classList.remove('hidden');
  const activeBtn = document.getElementById('tab-' + tabName);
  activeBtn.classList.add('text-brandRed', 'border-brandRed', 'bg-cardBg');
  activeBtn.classList.remove('text-gray-400', 'border-transparent');
}

// 6. Tech Marquee Swiper (Hero Section)
const techMarqueeSwiper = new Swiper('.techMarqueeSwiper', {
  slidesPerView: 'auto',
  spaceBetween: 0,
  loop: true,
  speed: 4000,
  freeMode: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
});


// 7. WordPress Service Page Specific Scripts
// FAQ Toggle
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-btn');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');

        if(btn) {
            btn.addEventListener('click', () => {
                const isOpen = !content.classList.contains('hidden');
                
                // Close all other FAQs
                faqItems.forEach(otherItem => {
                    if(otherItem !== item) {
                        otherItem.querySelector('.faq-content')?.classList.add('hidden');
                        otherItem.querySelector('.faq-icon')?.classList.replace('fa-minus', 'fa-plus');
                    }
                });

                if (isOpen) {
                    content.classList.add('hidden');
                    icon.classList.replace('fa-minus', 'fa-plus');
                } else {
                    content.classList.remove('hidden');
                    icon.classList.replace('fa-plus', 'fa-minus');
                }
            });
        }
    });
});

// WP Tab Switcher
window.switchWpTab = function(tabName) {
  document.querySelectorAll('.wp-tab-content').forEach(content => {
    content.classList.add('hidden');
    content.classList.remove('block');
  });
  document.querySelectorAll('.wp-tab-btn').forEach(btn => {
    btn.classList.remove('text-brandRed', 'border-brandRed', 'bg-cardBg');
    btn.classList.add('text-gray-400', 'border-transparent');
  });

  const contentElement = document.getElementById('wp-content-' + tabName);
  if(contentElement) {
      contentElement.classList.remove('hidden');
      contentElement.classList.add('block');
  }
  
  const activeBtn = document.getElementById('wp-tab-' + tabName);
  if(activeBtn) {
      activeBtn.classList.add('text-brandRed', 'border-brandRed', 'bg-cardBg');
      activeBtn.classList.remove('text-gray-400', 'border-transparent');
  }
}

// 8. WP Projects Swiper
const wpProjectSwiper = new Swiper('.wpProjectSwiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: {
    nextEl: '.wp-next',
    prevEl: '.wp-prev',
  }
});


// 9. SEO Counters Animation
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});
