import { GoogleGenAI } from "@google/genai";

// --- ENV SIMULATION ---
// IMPORTANT: Add your Gemini API Key here for the AI to work.
const process = {
    env: {
        API_KEY: '' 
    }
};

// --- DATA CONSTANTS ---
const CURRENCY = "C$";
const CITIES = [
    { name: 'Managua', active: true },
    { name: 'Masaya', active: false },
    { name: 'Estelí', active: false }
];

const CATEGORIES = [
    {
        id: 'Electricidad',
        name: "Electricidad",
        icon: "zap",
        color: "bg-amber-100 text-amber-600",
        gradient: "from-amber-500 to-orange-500",
        description: "Cableado, paneles, iluminación."
    },
    {
        id: 'Fontanería',
        name: "Fontanería",
        icon: "wrench",
        color: "bg-cyan-100 text-cyan-600",
        gradient: "from-cyan-500 to-blue-500",
        description: "Fugas, inodoros, drenajes."
    },
    {
        id: 'Instalaciones',
        name: "Instalaciones",
        icon: "fan",
        color: "bg-emerald-100 text-emerald-600",
        gradient: "from-emerald-500 to-teal-500",
        description: "Abanicos, Racks TV, Muebles."
    }
];

const MOCK_TECHNICIANS = [
    {
        id: 't1',
        name: 'Juan Pérez',
        photoUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        specialties: ['Electricidad', 'Instalaciones'],
        rating: 4.9,
        jobsCompleted: 142,
        hourlyRate: 350,
        city: 'Managua',
        verified: true,
        phone: '50500000001',
        description: 'Electricista certificado por INATEC con 10 años de experiencia. Especialista en instalaciones residenciales y comerciales.',
        badges: ['Certificado', 'Respuesta Rápida', 'Vacunado']
    },
    {
        id: 't2',
        name: 'Carlos Martínez',
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        specialties: ['Fontanería'],
        rating: 4.7,
        jobsCompleted: 89,
        hourlyRate: 300,
        city: 'Managua',
        verified: true,
        phone: '50500000002',
        description: 'Soluciono cualquier problema de tuberías en menos de 24 horas. Trabajo con termofusión y PVC.',
        badges: ['Herramienta Propia', 'Garantía 30 días']
    },
    {
        id: 't3',
        name: 'Marlon López',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        specialties: ['Instalaciones', 'Electricidad'],
        rating: 5.0,
        jobsCompleted: 210,
        hourlyRate: 400,
        city: 'Managua',
        verified: true,
        phone: '50500000003',
        description: 'Experto en montaje de muebles y soportes. Detallista y limpio en el área de trabajo.',
        badges: ['Top Rated', 'Vehículo Propio']
    },
    {
        id: 't4',
        name: 'José Ruiz',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        specialties: ['Fontanería'],
        rating: 4.2,
        jobsCompleted: 20,
        hourlyRate: 250,
        city: 'Managua',
        verified: false,
        phone: '50500000004',
        description: 'Fontanería básica, destape de inodoros y limpieza de trampas de grasa. Económico y honesto.',
        badges: ['Económico']
    }
];

// --- APP LOGIC ---
class NicaTasksApp {
    constructor() {
        this.currentView = 'LANDING';
        this.selectedCategory = null;
        this.selectedCity = 'Managua';
        this.prefilledMessage = '';
        this.init();
    }

    init() {
        this.renderCategories();
        this.renderRegisterOptions();
        lucide.createIcons();
        
        // Initial nav state logic
        this.updateMobileNav();
    }

    navigate(view) {
        // Scroll to top
        window.scrollTo(0, 0);

        // Hide all views
        document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
        
        // Show target view
        document.getElementById(`view-${view.toLowerCase()}`).classList.remove('hidden');
        
        this.currentView = view;
        this.updateMobileNav();

        // Reset if going to Services
        if (view === 'SERVICES') {
            this.selectedCategory = null;
            document.getElementById('ai-input').value = '';
        }

        // Render Technicians if navigating there
        if (view === 'TECHNICIANS') {
            this.renderTechnicians();
        }
    }

    updateMobileNav() {
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach((btn, index) => {
            btn.classList.remove('active');
            // Mapping index 0: Landing, 1: Services, 2: Register
            if (this.currentView === 'LANDING' && index === 0) btn.classList.add('active');
            if (this.currentView === 'SERVICES' && index === 1) btn.classList.add('active');
            if (this.currentView === 'TECHNICIANS' && index === 1) btn.classList.add('active'); // Techs stays on Services icon
            if (this.currentView === 'REGISTER' && index === 2) btn.classList.add('active');
        });
        lucide.createIcons();
    }

    selectCategory(categoryId, message = '') {
        this.selectedCategory = categoryId;
        this.prefilledMessage = message;
        this.navigate('TECHNICIANS');
    }

    setCity(city) {
        this.selectedCity = city;
        this.renderTechnicians();
    }

    fillAi(text) {
        const input = document.getElementById('ai-input');
        input.value = text;
        this.handleAiSearch();
    }

    async handleAiSearch() {
        const input = document.getElementById('ai-input');
        const btn = document.getElementById('ai-btn');
        const iconContainer = document.getElementById('ai-icon-container');
        const text = input.value.trim();

        if (!text) return;

        // Loading state
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i>`;
        lucide.createIcons();

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const prompt = `
              Actúa como un coordinador de servicios para el hogar en Nicaragua.
              Problema: "${text}".
              
              1. Clasifica en: 'Electricidad', 'Fontanería', 'Instalaciones'. Si no encaja, usa 'Instalaciones'.
              2. Genera un mensaje para WhatsApp al técnico (jerga nica educada).
              
              Responde SOLO JSON: {"category": "String", "techMessage": "String"}
            `;

            const response = await ai.models.generateContent({
              model: 'gemini-3-flash-preview',
              contents: prompt,
              config: { responseMimeType: "application/json" }
            });

            const result = JSON.parse(response.text);
            this.selectCategory(result.category, result.techMessage);

        } catch (e) {
            console.error(e);
            // Fallback
            this.selectCategory('Instalaciones', `Hola, necesito ayuda con: ${text}`);
        } finally {
            btn.disabled = false;
            btn.innerHTML = `<i data-lucide="arrow-right" class="w-5 h-5"></i>`;
            lucide.createIcons();
        }
    }

    renderCategories() {
        const container = document.getElementById('categories-grid');
        container.innerHTML = CATEGORIES.map(cat => `
            <button onclick="app.selectCategory('${cat.id}')" class="group relative overflow-hidden bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-900/10 transition-all duration-300 text-left h-64 flex flex-col justify-between">
                <div class="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${cat.gradient} opacity-10 rounded-bl-[4rem] group-hover:scale-125 transition-transform duration-700 ease-out"></div>
                <div class="w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <i data-lucide="${cat.icon}" class="w-7 h-7"></i>
                </div>
                <div>
                    <h4 class="text-2xl font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors">${cat.name}</h4>
                    <p class="text-slate-500 font-medium max-w-xs">${cat.description}</p>
                </div>
                <div class="flex items-center text-sm font-bold text-indigo-600 group-hover:translate-x-2 transition-transform bg-indigo-50 w-fit px-4 py-2 rounded-full mt-4">
                    Ver Técnicos <i data-lucide="chevron-right" class="w-4 h-4 ml-1"></i>
                </div>
            </button>
        `).join('');
    }

    renderTechnicians() {
        // Title update
        const titleEl = document.getElementById('tech-list-title');
        titleEl.textContent = this.selectedCategory ? this.selectedCategory : 'Todos los Expertos';

        // City Filters
        const filtersContainer = document.getElementById('city-filters');
        filtersContainer.innerHTML = CITIES.map(c => `
            <button 
                onclick="app.setCity('${c.name}')" 
                class="px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${this.selectedCity === c.name ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'} ${!c.active ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}">
                ${c.name}
            </button>
        `).join('');

        // Filtering Logic
        const filtered = MOCK_TECHNICIANS.filter(t => 
            (!this.selectedCategory || t.specialties.includes(this.selectedCategory)) &&
            t.city === this.selectedCity
        );

        document.getElementById('tech-count-label').textContent = `${filtered.length} profesionales disponibles.`;

        const grid = document.getElementById('tech-grid');
        
        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full py-24 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-300">
                    <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6"><i data-lucide="filter" class="w-10 h-10 text-slate-300"></i></div>
                    <h3 class="text-xl font-bold text-slate-700 mb-2">No encontramos técnicos</h3>
                    <p class="text-slate-500">Intenta cambiar de ciudad o categoría.</p>
                </div>
            `;
        } else {
            grid.innerHTML = filtered.map(tech => `
                <div class="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-indigo-900/10 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[3rem] -mr-8 -mt-8 z-0 group-hover:bg-indigo-50 transition-colors"></div>
                    
                    <div class="relative z-10 flex items-start gap-4 mb-5">
                        <div class="relative">
                            <img src="${tech.photoUrl}" class="w-16 h-16 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform duration-300">
                            ${tech.verified ? '<div class="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-1 rounded-full border-2 border-white shadow-sm"><i data-lucide="shield" class="w-3 h-3"></i></div>' : ''}
                        </div>
                        <div class="flex-1 min-w-0 pt-1">
                            <h3 class="font-bold text-lg text-slate-900 truncate leading-tight mb-1">${tech.name}</h3>
                            <div class="flex items-center gap-1.5">
                                <i data-lucide="star" class="w-4 h-4 text-amber-400 fill-amber-400"></i>
                                <span class="text-sm font-bold text-slate-700">${tech.rating}</span>
                                <span class="text-xs text-slate-400">(${tech.jobsCompleted} trabajos)</span>
                            </div>
                        </div>
                    </div>

                    <div class="relative z-10 flex flex-wrap gap-2 mb-4">
                        ${tech.badges.map(b => `<span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">${b}</span>`).join('')}
                    </div>

                    <div class="relative z-10 bg-slate-50 p-4 rounded-2xl mb-6 flex-1 border border-slate-100/50">
                        <p class="text-sm text-slate-600 line-clamp-3 leading-relaxed">"${tech.description}"</p>
                    </div>

                    <div class="relative z-10 mt-auto">
                        <div class="flex items-end justify-between mb-5 px-1 border-b border-slate-100 pb-4">
                            <div>
                                <span class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Tarifa estimada</span>
                                <div class="text-xl font-extrabold text-slate-900">${CURRENCY}${tech.hourlyRate}<span class="text-sm text-slate-400 font-normal">/hr</span></div>
                            </div>
                        </div>
                        <button onclick="app.contactTech('${tech.phone}', '${tech.name}')" class="w-full bg-slate-900 hover:bg-green-600 text-white py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg group-hover:shadow-xl">
                            <i data-lucide="message-circle" class="w-5 h-5"></i> Contactar
                        </button>
                    </div>
                </div>
            `).join('');
        }
        lucide.createIcons();
    }

    contactTech(phone, name) {
        const baseMsg = this.prefilledMessage || `Hola ${name}, te vi en NicaTasks y quiero cotizar un trabajo.`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(baseMsg)}`;
        window.open(url, '_blank');
    }

    renderRegisterOptions() {
        const select = document.getElementById('reg-job');
        select.innerHTML = CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }

    handleRegister(e) {
        e.preventDefault();
        alert('¡Solicitud enviada! Te contactaremos pronto.');
        this.navigate('LANDING');
    }
}

// Global instance to access from HTML onclick events
window.app = new NicaTasksApp();
