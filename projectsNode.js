const fs = require('fs');
const path = require('path');

const projectsPath = path.join(__dirname, 'projects.html');
const stylesPath = path.join(__dirname, 'styles.css');
const scriptPath = path.join(__dirname, 'script.js');

let pHTML = fs.readFileSync(projectsPath, 'utf8');

// --- FIX 1: Remove leftover wrapper ---
pHTML = pHTML.replace('<div class="flex pt-[60px] min-h-screen">', '');
pHTML = pHTML.replace(/<\/div>\s*<!-- END: Main Layout Wrapper -->/m, '<!-- END: Main Layout Wrapper -->');

// --- FIX 2: Fix <main> tag ---
pHTML = pHTML.replace(/<main class="flex-1 p-6 lg:p-12 relative z-10">/, '<main class="pt-[60px] px-6 lg:px-16 relative z-10">');

// --- FIX 3: Centre page header ---
pHTML = pHTML.replace(/<header class="mb-12" data-purpose="page-header">/, '<header class="mb-12 max-w-5xl mx-auto" data-purpose="page-header">');

// --- FIX 4: Centre filter section ---
pHTML = pHTML.replace(/<section class="mb-8" id="projects-section">/, '<section class="mb-8 max-w-5xl mx-auto" id="projects-section">');

// --- FIX 5: Centre projects grid (Done via FIX 4 because they are in the same section, wait, FIX 4 asks for the filter section wrapper. Let's make sure: )
// Ah, projects grid is inside #projects-section. 
// "Find the filter tabs section... Add to its outer section... If the section already has classes just add max-w-5xl mx-auto."
// Currently:
// <section class="mb-8" id="projects-section">
//   <div class="flex flex-wrap gap-3 mb-10" data-purpose="filter-tabs" id="filter-controls">
pHTML = pHTML.replace(/<section class="mb-8 max-w-5xl mx-auto" id="projects-section">/, '<section class="max-w-5xl mx-auto mb-8" id="projects-section">');

// FIX 5 explicitly says: "Find the section containing the project cards grid. Add max-w-5xl mx-auto to the section or its direct wrapper div." 
// They are both in the same "projects-section". So FIX 4 & 5 are handled by that one replace if the grid wrapper doesn't need it.
// Wait, I will add it to the wrapper div as well if I want to be safe, but adding to the section handles both. Let's add it to the section.

// --- FIX 6: Centre certificates section ---
pHTML = pHTML.replace(/<section class="mt-24 mb-12" id="certificates-section">/, '<section class="mt-24 mb-12 max-w-5xl mx-auto" id="certificates-section">');

// --- FIX 7: Remove Tailwind config block ---
pHTML = pHTML.replace(/<script>\s*tailwind\.config = {[\s\S]*?}\s*<\/script>\s*/, '');

// --- FIX 8: Fix certificate borders ---
pHTML = pHTML.replace(/class="([^"]*?)snap-item glass glass-rounded p-6 border-l-4 border-l-accent-1"/g, 'class="$1snap-item glass glass-rounded p-6" style="border-left: 4px solid var(--accent-1);"');
pHTML = pHTML.replace(/class="([^"]*?)snap-item glass glass-rounded p-6 border-l-4 border-l-accent-2"/g, 'class="$1snap-item glass glass-rounded p-6" style="border-left: 4px solid var(--accent-2);"');
// Fallback if glass-rounded missing
pHTML = pHTML.replace(/class="([^"]*?)snap-item glass p-6 border-l-4 border-l-accent-1"/g, 'class="$1snap-item glass p-6" style="border-left: 4px solid var(--accent-1);"');
pHTML = pHTML.replace(/class="([^"]*?)snap-item glass p-6 border-l-4 border-l-accent-2"/g, 'class="$1snap-item glass p-6" style="border-left: 4px solid var(--accent-2);"');


// --- FIX 9: Fix modal styling ---
pHTML = pHTML.replace(/<dialog class="glass w-\[90%\] max-w-2xl p-0 text-\[var\(--text\)\]" id="project-modal">/, '<dialog class="glass glass-rounded w-[90%] max-w-2xl p-0 text-[var(--text)]" id="project-modal">');
// Close button
pHTML = pHTML.replace(/<button class="absolute top-4 right-4 z-10 p-2 bg-black\/50 rounded-full hover:bg-black\/80 transition-all"/, '<button class="absolute top-4 right-4 z-10 p-2 glass rounded-full hover:shadow-[0_0_12px_var(--shadow)] transition-all"');
// Action buttons
pHTML = pHTML.replace(/<a class="px-8 py-3 bg-\[var\(--accent-1\)\] rounded-xl font-bold hover:opacity-90 transition-all" href="#">Live Demo<\/a>\s*<a class="px-8 py-3 bg-transparent rounded-xl font-bold hover:bg-transparent transition-all" href="#">Source Code<\/a>/, 
  `<a class="glass px-8 py-3 rounded-full font-semibold text-sm text-[var(--accent-1)] border border-[var(--accent-1)] hover:shadow-[0_0_20px_var(--shadow)] transition-all duration-300 hover:scale-105" href="#">Live Demo</a>
<a class="glass px-8 py-3 rounded-full font-semibold text-sm text-[var(--text-muted)] border border-[var(--glass-border)] hover:shadow-[0_0_20px_var(--shadow)] transition-all duration-300 hover:scale-105" href="#">Source Code</a>`);

pHTML = pHTML.replace(/<a class="px-8 py-3 bg-accent-1 rounded-xl font-bold hover:opacity-90 transition-all" href="#">Live Demo<\/a>\s*<a class="px-8 py-3 bg-white\/10 rounded-xl font-bold hover:bg-white\/20 transition-all" href="#">Source Code<\/a>/, 
  `<a class="glass px-8 py-3 rounded-full font-semibold text-sm text-[var(--accent-1)] border border-[var(--accent-1)] hover:shadow-[0_0_20px_var(--shadow)] transition-all duration-300 hover:scale-105" href="#">Live Demo</a>
<a class="glass px-8 py-3 rounded-full font-semibold text-sm text-[var(--text-muted)] border border-[var(--glass-border)] hover:shadow-[0_0_20px_var(--shadow)] transition-all duration-300 hover:scale-105" href="#">Source Code</a>`);

// --- FIX 10: Remove duplicate footer comments ---
// Ensure they aren't globally replaced into one space if there are many, we want exactly one reduction.
pHTML = pHTML.replace(/<!-- BEGIN: Footer -->\s*<!-- BEGIN: Footer -->/, '<!-- BEGIN: Footer -->');
pHTML = pHTML.replace(/<!-- END: Footer -->\s*<!-- END: Footer -->/, '<!-- END: Footer -->');

// --- FIX 11: Fix openModal() ---
pHTML = pHTML.replace(/<button class="w-full mt-auto glass px-6 py-2.5 rounded-full font-semibold text-sm text-\[var\(--accent-1\)\] border border-\[var\(--accent-1\)\] hover:shadow-\[0_0_20px_var\(--shadow\)\] transition-all duration-300 hover:scale-105 active:scale-95" onclick="openModal\(this\)">View Project<\/button>/g, 
  (match, offset, str) => {
    // Determine which card we're in by looking a bit backwards
    let cardText = str.substring(offset - 400, offset);
    if(cardText.includes('Nebula Store')) return match.replace('this', "'nebula'");
    if(cardText.includes('Aura Design')) return match.replace('this', "'aura'");
    if(cardText.includes('DataPulse')) return match.replace('this', "'datapulse'");
    if(cardText.includes('ZenFlow')) return match.replace('this', "'zen'");
    if(cardText.includes('Legacy Portfolio')) return match.replace('this', "'legacy'");
    if(cardText.includes('Quantix Identity')) return match.replace('this', "'quantix'");
    return match;
  }
);
// Make sure it also replaces the old Tailwind buttons if my previous script didn't apply directly correctly somewhere
pHTML = pHTML.replace(/<button class="w-full mt-auto[^>]*onclick="openModal\('?(.*?)'?\)"[^>]*>View Project<\/button>/g, (match, param, offset, str) => {
  let cardText = str.substring(offset - 400, offset);
  let cId = "unknown";
  if(cardText.includes('Nebula Store')) cId = 'nebula';
  else if(cardText.includes('Aura Design')) cId = 'aura';
  else if(cardText.includes('DataPulse')) cId = 'datapulse';
  else if(cardText.includes('ZenFlow')) cId = 'zen';
  else if(cardText.includes('Legacy Portfolio')) cId = 'legacy';
  else if(cardText.includes('Quantix Identity')) cId = 'quantix';
  else return match; // Fallback
  return match.replace(new RegExp(`onclick="openModal\\([^)]+\\)"`), `onclick="openModal('${cId}')"`);
});

// --- ADDITION 2: Scroll arrows (HTML) ---
const certWrapperOriginal = `<div class="flex gap-6 overflow-x-auto snap-x pb-8" data-purpose="certificate-scroll">`;
if (pHTML.includes(certWrapperOriginal)) {
  const newCertLayer = `<div class="scroll-section-wrapper">
    <button class="scroll-arrow scroll-arrow-left hidden-arrow" aria-label="Scroll left">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <div class="flex gap-6 overflow-x-auto snap-x pb-8" data-purpose="certificate-scroll">`;
  pHTML = pHTML.replace(certWrapperOriginal, newCertLayer);
  
  // We need to close the wrapper immediately after the cert scroll closes.
  // The structure is:
  // <div class="scroll-section-wrapper">
  //   ... scroll div ...
  //     <!-- Cert 1 --> ... <!-- Cert 4 --> ...
  //   </div> <!-- closes .flex gap-6 -->
  // </section> <!-- closes certificates-section -->
  pHTML = pHTML.replace(/(<!-- Cert 4 -->[\s\S]*?<\/div>)\s*<\/div>\s*<\/section>/, 
    `$1
    </div>
    <button class="scroll-arrow scroll-arrow-right" aria-label="Scroll right">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  </div>
</section>`);
}

fs.writeFileSync(projectsPath, pHTML);


// --- ADDITION 1 & 2 CSS ---
let cssTxt = fs.readFileSync(stylesPath, 'utf8');

const navCss = `\n#top-nav {
  background: linear-gradient(
    180deg,
    rgba(79, 142, 247, 0.08) 0%,
    rgba(13, 13, 13, 0.75) 100%
  );
  border-bottom: 1px solid rgba(79, 142, 247, 0.20);
  box-shadow: 0 1px 0 rgba(79, 142, 247, 0.10),
              0 4px 24px rgba(0, 0, 0, 0.40);
}\n`;

const certCss = `\n.scroll-section-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
}

.scroll-arrow {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--glass-bg);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 4px 16px var(--shadow);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 200ms ease, box-shadow 200ms ease,
              transform 200ms ease, opacity 200ms ease;
  z-index: 10;
}

.scroll-arrow:hover {
  background: rgba(79, 142, 247, 0.15);
  box-shadow: 0 0 20px rgba(79, 142, 247, 0.30);
  transform: scale(1.08);
}

.scroll-arrow:active { transform: scale(0.96); }

.scroll-arrow.hidden-arrow {
  opacity: 0;
  pointer-events: none;
}

.scroll-section-wrapper > *:not(.scroll-arrow) {
  flex: 1;
  min-width: 0;
}\n`;

if (!cssTxt.includes('#top-nav {')) {
  cssTxt += navCss;
}
if (!cssTxt.includes('.scroll-arrow')) {
  cssTxt += certCss;
}

fs.writeFileSync(stylesPath, cssTxt);


// --- ADDITION 2 JS ---
let jsTxt = fs.readFileSync(scriptPath, 'utf8');

const jsAddition = `// Scroll Arrow Logic
(function () {
  const wrapper = document.querySelector('.scroll-section-wrapper');
  if (!wrapper) return;
  const scrollEl = wrapper.querySelector('[data-purpose="certificate-scroll"]');
  const leftBtn  = wrapper.querySelector('.scroll-arrow-left');
  const rightBtn = wrapper.querySelector('.scroll-arrow-right');
  if (!scrollEl || !leftBtn || !rightBtn) return;

  const scrollAmount = () => scrollEl.clientWidth * 0.75;

  leftBtn.addEventListener('click', () => {
    scrollEl.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });
  rightBtn.addEventListener('click', () => {
    scrollEl.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });

  function updateArrows() {
    const atStart = scrollEl.scrollLeft <= 8;
    const atEnd = scrollEl.scrollLeft + scrollEl.clientWidth 
                  >= scrollEl.scrollWidth - 8;
    leftBtn.classList.toggle('hidden-arrow', atStart);
    rightBtn.classList.toggle('hidden-arrow', atEnd);
  }

  scrollEl.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows, { passive: true });
  updateArrows();
})();\n`;

// Insert it at the end of === PROJECTS PAGE === section
// Meaning we find the start of the section and the index of the next section "=== CONTACT PAGE ==="
// Or append at end of file if not specific. "at the END of the === PROJECTS PAGE === section"
let insertIndex = jsTxt.indexOf('// === CONTACT PAGE ===');
if (insertIndex === -1) insertIndex = jsTxt.length; // fallback

if (!jsTxt.includes('const wrapper = document.querySelector(\'.scroll-section-wrapper\');')) {
  jsTxt = jsTxt.substring(0, insertIndex) + jsAddition + "\n" + jsTxt.substring(insertIndex);
  fs.writeFileSync(scriptPath, jsTxt);
}

console.log("Projects refactor script executed.");
