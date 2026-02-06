// Dynamic PDF Creator - plain JavaScript

// Helper to select by id
const $ = id => document.getElementById(id);

// Controls
const titleInput = $('title');
const authorInput = $('author');
const paragraphsContainer = $('paragraphs');
const addParagraphBtn = $('add-paragraph');
const clearContentBtn = $('clear-content');
const imageUrlInput = $('image-url');
const addImageUrlBtn = $('add-image-url');
const imageFileInput = $('image-file');
const previewTitle = $('preview-title');
const previewAuthor = $('preview-author');
const previewContent = $('preview-content');
const generateBtn = $('generate');
const filenameInput = $('filename');
const pageSizeSelect = $('page-size');
const previewClearBtn = $('preview-clear');

// Keep track of images added (so they can be cleared)
let previewImages = [];

function syncPreview() {
  previewTitle.textContent = titleInput.value || 'Document title';
  previewAuthor.textContent = authorInput.value || 'Author';

  // Collect paragraphs from the textarea fields
  previewContent.innerHTML = '';
  const paras = paragraphsContainer.querySelectorAll('.para');
  paras.forEach(p => {
    const text = p.value.trim();
    if (text) {
      const el = document.createElement('p');
      el.textContent = text;
      previewContent.appendChild(el);
    }
  });

  // Append images (in the order they were added)
  previewImages.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    previewContent.appendChild(img);
  });
}

// Initialize event listeners for live-sync
titleInput.addEventListener('input', syncPreview);
authorInput.addEventListener('input', syncPreview);

// Add paragraph
addParagraphBtn.addEventListener('click', () => {
  const count = paragraphsContainer.querySelectorAll('.para').length + 1;
  const label = document.createElement('label');
  label.innerHTML = `Paragraph ${count} <textarea class="para" placeholder="Write paragraph text..."></textarea>`;
  paragraphsContainer.appendChild(label);

  // Attach input listener to new textarea
  const ta = label.querySelector('.para');
  ta.addEventListener('input', syncPreview);
  ta.focus();
});

clearContentBtn.addEventListener('click', () => {
  // Clear all fields except filename
  titleInput.value = '';
  authorInput.value = '';
  const paras = paragraphsContainer.querySelectorAll('label');
  // keep first textarea label, remove others
  paras.forEach((lab, idx) => {
    if (idx === 0) {
      const ta = lab.querySelector('.para');
      if (ta) ta.value = '';
    } else {
      lab.remove();
    }
  });
  previewImages = [];
  syncPreview();
});

// Add image from URL
addImageUrlBtn.addEventListener('click', () => {
  const url = imageUrlInput.value.trim();
  if (!url) return alert('Please enter an image URL');
  // Basic validation
  if (!/^https?:\/\/.+/.test(url)) return alert('Enter a valid URL (http/https)');
  previewImages.push(url);
  imageUrlInput.value = '';
  syncPreview();
});

// Add uploaded file image
imageFileInput.addEventListener('change', (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    previewImages.push(ev.target.result);
    syncPreview();
  };
  reader.readAsDataURL(file);
  // reset input so same file can be chosen again later if needed
  e.target.value = '';
});

// Remove preview images
previewClearBtn.addEventListener('click', () => {
  previewImages = [];
  syncPreview();
});

// Keep preview in sync as user types in existing first textarea
const firstPara = paragraphsContainer.querySelector('.para');
if (firstPara) firstPara.addEventListener('input', syncPreview);

// Generate PDF using html2pdf
generateBtn.addEventListener('click', async () => {
  syncPreview();

  const filename = filenameInput.value.trim() || 'document.pdf';

  // Options for html2pdf
  const opt = {
    margin:       10,
    filename:     filename,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    jsPDF:        { unit: 'mm', format: pageSizeSelect.value || 'a4', orientation: 'portrait' }
  };

  const element = $('pdf-preview');

  // Show a simple feedback while generating
  generateBtn.textContent = 'Generating...';
  generateBtn.disabled = true;
  try {
    await html2pdf().set(opt).from(element).save();
  } catch (err) {
    console.error(err);
    alert('Failed to generate PDF: ' + err.message);
  } finally {
    generateBtn.textContent = 'Generate PDF';
    generateBtn.disabled = false;
  }
});

// Initial sync
syncPreview();

// Expose a small API if someone wants to extend
window.pdfCreator = { syncPreview };
