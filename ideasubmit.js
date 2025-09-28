// IKSHANA Submission Form Interactivity

document.addEventListener('DOMContentLoaded', function() {
  // Character count for idea description
  const ideaDesc = document.getElementById('ideaDesc');
  const descCount = document.getElementById('descCount');
  if (ideaDesc && descCount) {
    ideaDesc.addEventListener('input', function() {
      descCount.textContent = ideaDesc.value.length;
    });
  }

  // File input drag & drop highlight
  function setupDropzone(dropzoneId, inputId) {
    const dropzone = document.getElementById(dropzoneId);
    const input = document.getElementById(inputId);
    if (!dropzone || !input) return;
    dropzone.addEventListener('click', () => input.click());
    dropzone.addEventListener('dragover', e => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', e => {
      dropzone.classList.remove('dragover');
    });
    dropzone.addEventListener('drop', e => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      input.files = e.dataTransfer.files;
    });
    input.addEventListener('change', () => {
      if (input.files.length > 0) {
        dropzone.querySelector('.ikshana-upload__text').textContent = input.files[0].name;
      }
    });
  }
  setupDropzone('videoDrop', 'videoPitch');
  setupDropzone('docsDrop', 'supportDocs');

  // Form submission (demo: show thank you message)
  const form = document.getElementById('ikshanaForm');
  const thankYou = document.getElementById('thankYouMessage');
  if (form && thankYou) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = form.querySelector('.ikshana-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
      setTimeout(() => {
        form.style.display = 'none';
        thankYou.style.display = 'block';
      }, 1200);
    });
  }
});
