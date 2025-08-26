// ——— Minimal config you can edit easily ———
const CONFIG = {
  recipientName: "Hridi Whrittika Das",
  senderName: "Your Bepy",

  // Optional: show "Days since we met" — set like "2021-07-15" or leave empty "" to hide
  metDate: "2018-11-12",

  // 1) EDIT THIS: The letter that opens in the modal
  letter: `তুমি আমার জীবনের সেই গল্প,
যার প্রতিটি পৃষ্ঠা ভরা ছিল ভালোবাসা,
কখনো অভিমান, কখনো মিষ্টি দুষ্টুমি,
কাছে টেনে নেওয়ার আকাঙ্ক্ষা,
আবার দূরে সরে যাওয়ার অজানা হাওয়া।

তুমি ছিলে বলেই আমার পৃথিবী হয়েছিল রঙিন,
তোমার উপস্থিতিতে সকালগুলো ভরেছিল নতুন আলোয় ।

বৃষ্টির ভেজা বিকেল কিংবা চাঁদের আলোয় ভরা রাত, 
সবকিছুই তোমার ছোঁয়ায় পেয়েছিল অন্যরকম অর্থ।

তুমি আমার জীবনের সব থেকে বড় আশীর্বাদ, 
আবার তুমিই আমার সব থেকে বড় আফসোস।

তুমি ছিলে আমার আকাশ, তুমি ছিলে আমার পৃথিবী।
আজও তোমার জন্য মনে শুধু শুভকামনাই রইল। 

Happy 23rd, Bepy! ❤❤❤`,

  // 2) EDIT THIS: The birthday wish shown on the page
  wish: `জীবনের নতুন এই বসন্তে তোমাকে জানাই  অফুরন্ত শুভকামনা। ❤`,

  // 3) GALLERY: Your 20 images (placed in /images)
  gallery: [
    "./images/1.jpg",
    "./images/2.jpg",
    "./images/3.jpg",
    "./images/4.jpg",
    "./images/5.jpg",
    "./images/6.jpg",
    "./images/7.jpg",
    "./images/8.jpg",
    "./images/9.jpg",
    "./images/10.jpg",
    "./images/11.jpg",
    "./images/12.jpg",
    "./images/13.jpg",
    "./images/14.jpg",
    "./images/15.jpg",
    "./images/16.jpg",
    "./images/17.jpg",
    "./images/18.jpg",
    "./images/19.jpg",
    "./images/20.jpg"
  ],

  // 4) AUDIO: Put your mp3 at /audio/raag-ambient.mp3
  audioSrc: "./audio/raag-ambient.mp3"
};

// ——— DOM references ———
const $ = (sel) => document.querySelector(sel);
const recipientEl = $("#recipientName");
const senderEl = $("#senderName");
const galleryEl = $("#gallery");
const wishEl = $("#wishText");
const confettiBtn = $("#confettiBtn");
const letterBtn = $("#letterBtn");
const letterModal = $("#letterModal");
const letterBody = $("#letterBody");
const sinceEl = $("#since");
const audio = $("#bgm");
const audioBtn = $("#audioBtn");

// ——— Init ———
function init() {
  recipientEl.textContent = CONFIG.recipientName || "Friend";
  senderEl.textContent = CONFIG.senderName || "Someone who wishes you well";

  // Optional: time since met
  if (CONFIG.metDate) {
    const days = daysSince(CONFIG.metDate);
    sinceEl.textContent = `Since we met: ${days.toLocaleString()} days.`;
    sinceEl.hidden = false;
  }

  // Letter (single editable string)
  letterBody.innerHTML = CONFIG.letter
    .split("\n")
    .map(line => `<p>${escapeHtml(line)}</p>`)
    .join("");

  // Gallery
  galleryEl.innerHTML = (CONFIG.gallery || []).map((src, i) => `
    <figure class="card" role="listitem" aria-label="Photo ${i+1}">
      <img src="${src}" alt="Image ${i+1}"
           style="width:100%;height:220px;object-fit:cover;border-radius:12px" />
    </figure>
  `).join("");

  // Wish (single editable string)
  wishEl.textContent = CONFIG.wish;

  // Audio
  if (CONFIG.audioSrc) {
    const source = document.createElement("source");
    source.src = CONFIG.audioSrc;
    source.type = "audio/mpeg";
    audio.appendChild(source);
  } else {
    audioBtn.style.display = "none";
  }
}

function daysSince(isoDate) {
  const start = new Date(isoDate);
  const now = new Date();
  const diff = now - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function escapeHtml(s){
  return s.replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[m]));
}

// ——— Interactions ———
confettiBtn?.addEventListener("click", () => {
  burstConfetti();
  // gentle floating sprinkle
  const duration = 1500;
  const animationEnd = Date.now() + duration;
  (function frame(){
    confetti({
      particleCount: 2,
      startVelocity: 12,
      spread: 200,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });
    if (Date.now() < animationEnd) requestAnimationFrame(frame);
  })();
});

letterBtn?.addEventListener("click", () => {
  letterModal.showModal();
});

audioBtn?.addEventListener("click", async () => {
  if (audio.paused) {
    try { await audio.play(); } catch {}
    audioBtn.textContent = "Pause music";
    audioBtn.setAttribute("aria-pressed", "true");
  } else {
    audio.pause();
    audioBtn.textContent = "Play music";
    audioBtn.setAttribute("aria-pressed", "false");
  }
});

function burstConfetti(){
  const end = Date.now() + 700;
  const colors = ["#ff5bd7","#67e8f9","#ffd166","#a78bfa","#f472b6","#22d3ee"];
  (function frame(){
    confetti({
      particleCount: 14,
      spread: 70,
      origin: { y: 0.6 },
      colors
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// Start
init();
