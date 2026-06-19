
// ============ HAMBURGER MENU ============
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if (toggle) {
  toggle.addEventListener('click', () => {
    const isActive = nav.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isActive);
  });
}

// Close menu when a link is clicked
if (nav) {
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// ============ SEARCH FUNCTIONALITY ============
$(document).ready(function() {
  $('#searchInput').on('keyup', function() {
    var value = $(this).val().toLowerCase();
    
    // Search in sports cards
    $('.sport-card').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
    
    // Search in activity cards
    $('.activity-card').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

// ============ VISITOR COUNTER ============
function initializeVisitorCounter() {
  let count = localStorage.getItem('visits');
  count = count ? parseInt(count) + 1 : 1;
  localStorage.setItem('visits', count);
  
  const counter = document.getElementById('visitor-counter');
  if (counter) {
    counter.textContent = 'Total Visits: ' + count.toLocaleString();
    counter.setAttribute('aria-live', 'polite');
  }
}

// Initialize visitor counter when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeVisitorCounter);
} else {
  initializeVisitorCounter();
}

// ============ FORM VALIDATION ============

// CAPTCHA answers
const captchaAnswers = {
  'registerForm': 12,      // 7 + 5 = 12
  'bookingForm': 9,        // 12 - 3 = 9
  'contactForm': 12        // 8 + 4 = 12
};

// Validation functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateCaptcha(captchaAnswer, formId) {
  const answer = parseInt(captchaAnswer);
  return answer === captchaAnswers[formId];
}

function showError(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
    element.classList.add('show');
  }
}

function clearError(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = '';
    element.classList.remove('show');
  }
}

// Register form validation
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    ['fullNameError', 'emailError', 'phoneError', 'dobError', 'passwordError', 'confirmPasswordError', 'termsError', 'captchaError'].forEach(id => clearError(id));
    
    let isValid = true;
    
    // Validate full name
    const fullName = document.getElementById('fullName').value.trim();
    if (fullName.length < 3) {
      showError('fullNameError', 'Name must be at least 3 characters');
      isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email').value.trim();
    if (!validateEmail(email)) {
      showError('emailError', 'Please enter a valid email address');
      isValid = false;
    }
    
    // Validate phone
    const phone = document.getElementById('phone').value.trim();
    if (!validatePhone(phone)) {
      showError('phoneError', 'Please enter a valid phone number');
      isValid = false;
    }
    
    // Validate DOB
    const dob = document.getElementById('dob').value;
    if (!dob) {
      showError('dobError', 'Please select your date of birth');
      isValid = false;
    }
    
    // Validate password
    const password = document.getElementById('password').value;
    if (!validatePassword(password)) {
      showError('passwordError', 'Password must be at least 6 characters');
      isValid = false;
    }
    
    // Validate confirm password
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
      showError('confirmPasswordError', 'Passwords do not match');
      isValid = false;
    }
    
    // Validate terms
    if (!document.getElementById('terms').checked) {
      showError('termsError', 'You must agree to the terms');
      isValid = false;
    }
    
    // Validate CAPTCHA
    const captcha = document.getElementById('captcha').value;
    if (!validateCaptcha(captcha, 'registerForm')) {
      showError('captchaError', 'Incorrect answer. (Hint: 7 + 5)');
      isValid = false;
    }
    
    if (isValid) {
      alert('Registration successful! We will send you a confirmation email shortly.');
      registerForm.reset();
    }
  });
}

// Booking form validation
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const errorMessages = this.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
      msg.textContent = '';
      msg.classList.remove('show');
    });
    
    // Validate fields
    const fullName = document.getElementById('bookFullName').value.trim();
    if (fullName.length < 3) {
      showError('bookFullName', 'Name must be at least 3 characters');
      isValid = false;
    }
    
    const email = document.getElementById('bookEmail').value.trim();
    if (!validateEmail(email)) {
      showError('bookEmail', 'Please enter a valid email address');
      isValid = false;
    }
    
    const phone = document.getElementById('bookPhone').value.trim();
    if (!validatePhone(phone)) {
      showError('bookPhone', 'Please enter a valid phone number');
      isValid = false;
    }
    
    const sport = document.getElementById('sport').value;
    if (!sport) {
      showError('sport', 'Please select a sport');
      isValid = false;
    }
    
    const date = document.getElementById('sessionDate').value;
    if (!date) {
      showError('sessionDate', 'Please select a date');
      isValid = false;
    }
    
    const time = document.getElementById('sessionTime').value;
    if (!time) {
      showError('sessionTime', 'Please select a time');
      isValid = false;
    }
    
    const level = document.getElementById('level').value;
    if (!level) {
      showError('level', 'Please select skill level');
      isValid = false;
    }
    
    const participants = document.getElementById('participants').value;
    if (!participants || participants < 1) {
      showError('participants', 'Please enter number of participants');
      isValid = false;
    }
    
    if (!document.querySelector('input[name="terms"]').checked) {
      isValid = false;
    }
    
    const captchaBook = document.getElementById('captchaBook').value;
    if (!validateCaptcha(captchaBook, 'bookingForm')) {
      showError('captchaBook', 'Incorrect answer. (Hint: 12 - 3)');
      isValid = false;
    }
    
    if (isValid) {
      alert('Booking request submitted successfully! Check your email for confirmation details.');
      bookingForm.reset();
    }
  });
}

// Contact form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const errorMessages = this.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
      msg.textContent = '';
      msg.classList.remove('show');
    });
    
    const name = document.getElementById('contactName').value.trim();
    if (name.length < 3) {
      showError('contactName', 'Name must be at least 3 characters');
      isValid = false;
    }
    
    const email = document.getElementById('contactEmail').value.trim();
    if (!validateEmail(email)) {
      showError('contactEmail', 'Please enter a valid email address');
      isValid = false;
    }
    
    const subject = document.getElementById('subject').value;
    if (!subject) {
      showError('subject', 'Please select a subject');
      isValid = false;
    }
    
    const message = document.getElementById('message').value.trim();
    if (message.length < 10) {
      showError('message', 'Message must be at least 10 characters');
      isValid = false;
    }
    
    const captchaContact = document.getElementById('contactCaptcha').value;
    if (!validateCaptcha(captchaContact, 'contactForm')) {
      showError('contactCaptcha', 'Incorrect answer. (Hint: 8 + 4)');
      isValid = false;
    }
    
    if (isValid) {
      alert('Message sent successfully! We will respond within 24 hours.');
      contactForm.reset();
    }
  });
}

// ============ KEYBOARD NAVIGATION ============
document.addEventListener('keydown', function(e) {
  // Close menu with Escape key
  if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
    nav.classList.remove('active');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  }
});

// ============ SCROLL TO TOP ============
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show scroll to top button on scroll
let scrollBtn = document.createElement('button');
scrollBtn.id = 'scrollTopBtn';
scrollBtn.innerHTML = '↑';
scrollBtn.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #ff4444;
  color: white;
  border: none;
  padding: 12px 15px;
  border-radius: 50%;
  cursor: pointer;
  display: none;
  z-index: 99;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  aria-label: "Scroll to top";
`;

document.body.appendChild(scrollBtn);

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});

scrollBtn.addEventListener('click', scrollToTop);
scrollBtn.addEventListener('mouseover', function() {
  this.style.background = '#ff2222';
});
scrollBtn.addEventListener('mouseout', function() {
  this.style.background = '#ff4444';
});
