const fs = require('fs');
const path = require('path');

const projectsPath = path.join(__dirname, 'projects.html');
const contactPath = path.join(__dirname, 'contact.html');
const stylesPath = path.join(__dirname, 'styles.css');

const indexNav = `<!-- BEGIN: Navigation -->
<nav class="fixed top-0 left-0 right-0 h-[60px] glass z-50 flex items-center justify-between px-6" id="top-nav">
<div class="font-bold text-xl tracking-tighter">JD<span class="text-[var(--accent-1)]">.</span></div>
<!-- Desktop Nav -->
<div class="hidden md:flex gap-8 items-center">
<a class="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors" href="index.html">Home</a>
{PROJECTS_LINK}
{CONTACT_LINK}
</div>
<!-- Mobile Menu Toggle -->
<button aria-label="Toggle Menu" class="md:hidden p-2 text-[var(--text)]" id="mobile-menu-btn">
<svg class="w-6 h-6" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M4 6h16M4 12h16m-7 6h7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
</button>
</nav>
<!-- END: Navigation -->`;

const footerHTML = `<!-- BEGIN: Footer -->
<footer class="py-12 border-t border-[var(--divider)] text-center relative z-10">
  <p class="text-[var(--text-muted)] text-sm mb-2">
    © 2026 John Doe. Built with glass and light.
  </p>
  <div class="flex justify-center gap-4 text-xs font-mono uppercase tracking-widest text-[var(--accent-1)]/50">
    <span>Portfolio</span>
    <span>•</span>
    <span>Version 2.0</span>
  </div>
</footer>
<!-- END: Footer -->`;

const orbsHTML = `<!-- Animated Background Orbs -->
<div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
  <div class="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] rounded-full opacity-20 blur-[80px]" style="background: radial-gradient(circle, var(--accent-1) 0%, transparent 70%); animation: orbDrift 15s ease-in-out infinite;"></div>
  <div class="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full opacity-15 blur-[100px]" style="background: radial-gradient(circle, var(--accent-2) 0%, transparent 70%); animation: orbDrift 12s ease-in-out infinite reverse;"></div>
</div>`;

const replaceVariables = (html) => {
  return html
    .replace(/text-text-muted/g, 'text-[var(--text-muted)]')
    .replace(/text-text-main/g, 'text-[var(--text)]')
    .replace(/text-accent-1/g, 'text-[var(--accent-1)]')
    .replace(/text-accent-2/g, 'text-[var(--accent-2)]')
    .replace(/text-\[\#8A8AB0\]/g, 'text-[var(--text-muted)]')
    .replace(/text-\[\#F0F0FF\]/g, 'text-[var(--text)]')
    .replace(/text-\[\#4F8EF7\]/g, 'text-[var(--accent-1)]')
    .replace(/text-\[\#A259FF\]/g, 'text-[var(--accent-2)]')
    .replace(/border-accent-1/g, 'border-[var(--accent-1)]')
    .replace(/border-accent-2/g, 'border-[var(--accent-2)]')
    .replace(/bg-accent-1/g, 'bg-[var(--accent-1)]')
    .replace(/bg-accent-2/g, 'bg-[var(--accent-2)]')
    .replace(/border-\[\#4F8EF7\]/g, 'border-[var(--accent-1)]')
    .replace(/border-\[\#A259FF\]/g, 'border-[var(--accent-2)]')
    .replace(/border-divider/g, 'border-[var(--divider)]')
    .replace(/text-white\/40/g, 'text-[var(--text-muted)]')
    .replace(/text-white\/60/g, 'text-[var(--text-muted)]')
    .replace(/text-white\/80/g, 'text-[var(--text)]')
    .replace(/text-white/g, 'text-[var(--text)]')
    .replace(/bg-white\/[0-9]+/g, 'bg-transparent')
    .replace(/border-white\/[0-9]+/g, 'border-[var(--glass-border)]')
    .replace(/bg-\[\#4F8EF7\]\/10/g, 'bg-[var(--accent-1)]/10')
    .replace(/bg-\[\#A259FF\]\/10/g, 'bg-[var(--accent-2)]/10')
    .replace(/from-\[\#4F8EF7\]/g, 'from-[var(--accent-1)]')
    .replace(/to-\[\#A259FF\]/g, 'to-[var(--accent-2)]')
    .replace(/shadow-\[\#4F8EF7\]\/20/g, 'shadow-[var(--shadow)]')
    .replace(/focus:border-\[\#4F8EF7\]/g, 'focus:border-[var(--accent-1)]')
    .replace(/focus:ring-\[\#4F8EF7\]\/20/g, 'focus:ring-[var(--accent-1)]/20')
    .replace(/style="color: var\(--text-muted\)"/g, 'text-[var(--text-muted)]');
};

const standardizeCards = (html) => {
  return html.replace(/glass-card/g, 'glass glass-rounded');
};

const standardizeButtons = (html) => {
  const ctaStyle = 'glass px-6 py-2.5 rounded-full font-semibold text-sm text-[var(--accent-1)] border border-[var(--accent-1)] hover:shadow-[0_0_20px_var(--shadow)] transition-all duration-300 hover:scale-105 active:scale-95';
  
  // Projects page buttons
  html = html.replace(/<button class="w-full py-3[^>]*>View Project<\/button>/g, 
    `<button class="w-full mt-auto ${ctaStyle}" onclick="openModal(this)">View Project</button>`);
  
  html = html.replace(/<button class="filter-btn[^>]*>([^<]+)<\/button>/g, (match, text) => {
    return `<button class="filter-btn ${ctaStyle}" data-filter="${text.toLowerCase()}">${text}</button>`;
  });
  
  return html;
};

// --- PROCESS PROJECTS.HTML ---
let pHTML = fs.readFileSync(projectsPath, 'utf8');

// Nav
pHTML = pHTML.replace(/<!-- BEGIN: Navigation -->[\s\S]*?<!-- END: Navigation -->/m, 
  indexNav
    .replace('{PROJECTS_LINK}', '<a class="text-sm font-semibold text-[var(--accent-1)] border-b-2 border-[var(--accent-1)]" href="projects.html">Projects</a>')
    .replace('{CONTACT_LINK}', '<a class="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors" href="contact.html">Contact</a>')
);

// Orbs + rel z-10 for main
pHTML = pHTML.replace(/<main class="flex-1 p-6 lg:p-12">/, `<main class="flex-1 p-6 lg:p-12 relative z-10">\n${orbsHTML}`);

// Typography & Cards
pHTML = replaceVariables(pHTML);
pHTML = pHTML.replace(/<article class="project-card glass/g, '<article class="project-card glass glass-rounded');
pHTML = pHTML.replace(/snap-item glass/g, 'snap-item glass glass-rounded');

// Apply new headers to Match index.html: "ABOUT ME" style ->
pHTML = pHTML.replace(/<h2 class="text-3xl font-bold mb-8 flex items-center gap-3">[\s\S]*?<\/h2>/, 
  `<h2 class="text-3xl font-extrabold mb-12 flex items-center gap-4">
    <span class="w-12 h-[2px] bg-[var(--accent-1)]"></span>
    PROFESSIONAL CERTIFICATIONS
  </h2>`);

pHTML = standardizeButtons(pHTML);

// Footer
pHTML = pHTML.replace(/<footer class="mt-20 py-10[^>]*>[\s\S]*?<\/footer>/, footerHTML);

fs.writeFileSync(projectsPath, pHTML);

// --- PROCESS CONTACT.HTML ---
let cHTML = fs.readFileSync(contactPath, 'utf8');

// Nav
cHTML = cHTML.replace(/<!-- BEGIN: Top Navigation -->[\s\S]*?<!-- END: Top Navigation -->/m, 
  indexNav
    .replace('{PROJECTS_LINK}', '<a class="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors" href="projects.html">Projects</a>')
    .replace('{CONTACT_LINK}', '<a class="text-sm font-semibold text-[var(--accent-1)] border-b-2 border-[var(--accent-1)]" href="contact.html">Contact</a>')
);

// Orbs + main
cHTML = cHTML.replace(/<main class="min-h-screen px-6 py-12 lg:px-16"[^>]*>/, `<main class="min-h-screen px-6 py-12 lg:px-16 relative z-10" id="main-content">\n${orbsHTML}`);

// Typography & Variables
cHTML = replaceVariables(cHTML);

// Section Headers
cHTML = cHTML.replace(/<h2 class="text-2xl font-bold mb-2">Send a Message<\/h2>\s*<p class="text-\[var\(--text-muted\)\] text-sm">[\s\S]*?<\/p>/,
  `<h2 class="text-3xl font-extrabold mb-12 flex items-center gap-4">
    <span class="w-12 h-[2px] bg-[var(--accent-1)]"></span>
    SEND A MESSAGE
  </h2>
  <p class="text-[var(--text-muted)] text-sm -mt-8 mb-8">Fill out the form below and I'll get back to you within 24 hours.</p>`);

// Cards
cHTML = standardizeCards(cHTML);

// Remove Material Symbols from head
cHTML = cHTML.replace(/<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Material\+Symbols\+Outlined[^>]+>/, "");

// Contact Cards inline colors and buttons
const contactColors = {
  Email: '79,142,247', // #4F8EF7
  LinkedIn: '10,102,194', // #0A66C2
  GitHub: '110,64,201', // #6E40C9
  Instagram: '225,48,108', // #E1306C
  WhatsApp: '37,211,102' // #25D366
};

Object.entries(contactColors).forEach(([name, rgb]) => {
  const regexStyle = new RegExp(`style="[^"]*?border-color:\\s*#[A-Fa-f0-9]+;?"`);
  cHTML = cHTML.replace(regexStyle, `style="background: rgba(${rgb}, 0.06);"`);
});

// Remove "border-2" from contact cards
cHTML = cHTML.replace(/border-2/g, "");

// Replace hardcoded stroke / background colors in SVGs using CSS vars / no bg
cHTML = cHTML.replace(/stroke="[^"]+"/g, (match) => {
  if(match.includes('currentColor') || match.includes('white')) return match;
  return match; // keep accent stroke color
});

// Remove background circle colors
cHTML = cHTML.replace(/bg-\[#[A-Fa-f0-9]+\]\/10/g, 'bg-transparent');

// Footer
cHTML = cHTML.replace(/<footer class="max-w-6xl[^>]*>[\s\S]*?<\/footer>/, footerHTML);

fs.writeFileSync(contactPath, cHTML);

console.log("Pages processed successfully!");
