// Form validation and interactive effects

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');
  const inputs = form.querySelectorAll('.form__input');

  form.addEventListener('submit', function (e) {
    let valid = true;
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        input.classList.add('form__input--error');
        valid = false;
      } else {
        input.classList.remove('form__input--error');
      }
    });
    if (!valid) {
      e.preventDefault();
      showError('Please fill in all required fields correctly.');
    } else {
      hideError();
      // Optionally, show a success message or handle submission
    }
  });

  inputs.forEach(input => {
    input.addEventListener('input', function () {
      if (input.checkValidity()) {
        input.classList.remove('form__input--error');
      }
    });
  });

  function showError(msg) {
    let errorBox = document.getElementById('formError');
    if (!errorBox) {
      errorBox = document.createElement('div');
      errorBox.id = 'formError';
      errorBox.className = 'form__error';
      form.insertBefore(errorBox, form.firstChild);
    }
    errorBox.textContent = msg;
    errorBox.style.display = 'block';
  }
  function hideError() {
    const errorBox = document.getElementById('formError');
    if (errorBox) errorBox.style.display = 'none';
  }

  // Smooth scroll for anchor links (if any)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});

// Add error style for invalid input
const style = document.createElement('style');
style.innerHTML = `
  .form__input--error {
    border-color: #f357a8 !important;
    background: #fff0f6 !important;
    animation: shake 0.2s 2;
  }
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    50% { transform: translateX(4px); }
    75% { transform: translateX(-4px); }
    100% { transform: translateX(0); }
  }
`;
document.head.appendChild(style);
