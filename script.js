// منوی همبرگری و سایدبار
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeSidebarBtn = document.getElementById('sidebarClose');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openSidebar);
closeSidebarBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// بستن منو بعد از کلیک روی لینک‌های داخلی (اسکرول نرم)
document.querySelectorAll('.sidebar-nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        closeSidebar();
      }
    }
  });
});

// اسکرول نرم برای لینک‌های هشدار در صفحه اصلی (بدون سایدبار)
document.querySelectorAll('a[href^="#"]:not(.sidebar-nav a)').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#') {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// فرم تماس: ارسال پیام از طریق ایمیل (mailto)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    
    if (!name || !email || !message) {
      alert('لطفاً تمام فیلدها را پر کنید.');
      return;
    }
    
    // ساخت لینک mailto
    const subject = encodeURIComponent(`پیام از سایت Reza.A - ${name}`);
    const body = encodeURIComponent(`نام: ${name}\nایمیل: ${email}\n\nپیام:\n${message}`);
    const mailtoLink = `mailto:nmzhsen@gmail.com?subject=${subject}&body=${body}`;
    
    // باز کردن کلاینت ایمیل
    window.location.href = mailtoLink;
    
    // نمایش پیغام و ریست فرم (اختیاری)
    alert('ایمیل شما در حال باز شدن است. لطفاً آن را ارسال کنید.');
    contactForm.reset();
  });
}
