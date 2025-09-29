document.addEventListener('DOMContentLoaded', function() {
  // -------------------------
  // Character count
  // -------------------------
  const ideaDesc = document.getElementById('ideaDesc');
  const descCount = document.getElementById('descCount');
  if (ideaDesc && descCount) {
    ideaDesc.addEventListener('input', function() {
      descCount.textContent = ideaDesc.value.length;
    });
  }

  // -------------------------
  // Dropzone setup with file size validation
  // -------------------------
  function setupDropzone(dropzoneId, inputId, maxSizeMB) {
    const dropzone = document.getElementById(dropzoneId);
    const input = document.getElementById(inputId);
    if (!dropzone || !input) return;

    const textDiv = dropzone.querySelector('.ikshana-upload__text');

    // Click to open file dialog
    dropzone.addEventListener('click', () => input.click());

    // Highlight on dragover
    dropzone.addEventListener('dragover', e => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', e => {
      dropzone.classList.remove('dragover');
    });

    // Handle file drop
    dropzone.addEventListener('drop', e => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file) {
        if (file.size > maxSizeMB * 1024 * 1024) {
          alert(`File too large! Maximum size is ${maxSizeMB}MB`);
          input.value = '';
          textDiv.textContent = `Click to upload`;
        } else {
          input.files = e.dataTransfer.files;
          textDiv.textContent = file.name;
        }
      }
    });

    // Handle manual file selection
    input.addEventListener('change', () => {
      if (input.files.length > 0) {
        const file = input.files[0];
        if (file.size > maxSizeMB * 1024 * 1024) {
          alert(`File too large! Maximum size is ${maxSizeMB}MB`);
          input.value = '';
          textDiv.textContent = `Click to upload`;
        } else {
          textDiv.textContent = file.name;
        }
      }
    });
  }

  // Video dropzone (100MB)
  setupDropzone('videoDrop', 'videoPitch', 100);
  // Document dropzone (10MB)
  setupDropzone('docsDrop', 'supportDocs', 10);

  // -------------------------
  // Form submission
  // -------------------------
 const form = document.getElementById('ikshanaForm');
const thankYou = document.getElementById('thankYouMessage');

if (form && thankYou) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = form.querySelector('.ikshana-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    const formData = new FormData(form);

    fetch('https://api.web3forms.com/submit', { // Web3Forms endpoint
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        form.style.display = 'none';
        thankYou.style.display = 'block';
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    })
    .catch(err => {
      alert('Submission failed! Check your API key and try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Your Idea';
      console.error(err);
    });
  });
}

});

