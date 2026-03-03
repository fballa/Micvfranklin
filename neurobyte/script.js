import { GoogleGenAI } from "@google/genai";

// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
       mobileMenu.classList.remove('open');
    });
  });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('bg-deepBlue/80', 'backdrop-blur-md', 'border-b', 'border-white/10', 'py-3');
      navbar.classList.remove('py-6');
    } else {
      navbar.classList.remove('bg-deepBlue/80', 'backdrop-blur-md', 'border-b', 'border-white/10', 'py-3');
      navbar.classList.add('py-6');
    }
  });
}

// Particle Canvas Animation
const canvas = document.getElementById('particle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  
  function initParticles() {
    particles = [];
    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(37, 99, 235, ${p.alpha})`;
      ctx.fill();
    });

    // Connections
    particles.forEach((p, i) => {
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(37, 99, 235, ${0.1 - dist / 1500})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    });
    
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', resize);
  resize();
  initParticles();
  animateParticles();
}

// Parallax Effect for Video
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo && scrollY < window.innerHeight) {
    // Subtle parallax speed
    heroVideo.style.transform = `scale(1.05) translateY(${scrollY * 0.5}px)`;
  }
});

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Gemini AI Logic
let apiKey;
try {
  // @ts-ignore
  apiKey = process.env.API_KEY;
} catch (e) {
  console.warn("API Key not found in process.env. Please ensure the environment is configured correctly.");
}

const generateBtn = document.getElementById('generate-btn');
const promptInput = document.getElementById('image-prompt');
const loadingState = document.getElementById('loading-state');
const resultContainer = document.getElementById('result-container');
const generatedImage = document.getElementById('generated-image');
const downloadLink = document.getElementById('download-link');

if (generateBtn) {
  generateBtn.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();
    if (!prompt) return;

    if (!apiKey) {
       alert("API Key is missing. Please configure the environment.");
       return;
    }

    try {
      // UI Updates
      generateBtn.disabled = true;
      generateBtn.classList.add('opacity-50');
      loadingState.classList.remove('hidden');
      resultContainer.classList.add('hidden');

      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      // Generate Image using gemini-2.5-flash-image
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
           // No responseMimeType for image generation models
        }
      });

      let imageUrl = null;
      
      // Iterate through parts to find the image
      if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            imageUrl = `data:image/png;base64,${base64EncodeString}`;
            break;
          }
        }
      }

      if (imageUrl) {
        generatedImage.src = imageUrl;
        downloadLink.href = imageUrl;
        resultContainer.classList.remove('hidden');
      } else {
         alert("No se pudo generar la imagen. Intente con otro prompt.");
      }

    } catch (error) {
      console.error("Error generating image:", error);
      alert("Ocurrió un error al generar la imagen. Por favor intente nuevamente.");
    } finally {
      generateBtn.disabled = false;
      generateBtn.classList.remove('opacity-50');
      loadingState.classList.add('hidden');
    }
  });
}
