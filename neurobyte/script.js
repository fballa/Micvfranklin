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

// Parallax Effect for Video
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo && scrollY < window.innerHeight) {
    // Subtle parallax speed (reduced from 0.5 to 0.2)
    heroVideo.style.transform = `translateY(${scrollY * 0.2}px)`;
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

// Contact Form Handler
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Enviando...</span><i data-lucide="loader-2" class="w-4 h-4 ml-2 animate-spin"></i>';
    lucide.createIcons();

    const formData = new FormData(contactForm);
    const data = {
      nombre_completo: formData.get('nombre_completo'),
      email: formData.get('email'),
      telefono: formData.get('telefono'),
      asunto: formData.get('asunto'),
      contenido: formData.get('contenido')
    };

    try {
      const response = await fetch('https://misdemos.x10.mx/apichat/api_enviar_correo.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        // @ts-ignore
        Swal.fire({
          title: '¡Mensaje Enviado!',
          text: result.message || 'Nos pondremos en contacto contigo pronto.',
          icon: 'success',
          confirmButtonColor: '#F97316',
          background: '#111827',
          color: '#ffffff'
        });
        contactForm.reset();
      } else {
        throw new Error(result.message || 'Hubo un error al enviar el correo.');
      }
    } catch (error) {
      console.error('Error:', error);
      // @ts-ignore
      Swal.fire({
        title: 'Error',
        text: 'No se pudo enviar el mensaje. Por favor, intenta de nuevo más tarde.',
        icon: 'error',
        confirmButtonColor: '#E11D48',
        background: '#111827',
        color: '#ffffff'
      });
    } finally {
      // Restore button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      lucide.createIcons();
    }
  });
}
