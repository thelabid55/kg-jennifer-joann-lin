document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });

    // 2. Sticky Navbar Styling on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
            navbar.style.backgroundColor = 'rgba(246, 224, 0, 0.95)'; // slightly transparent primary color
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.classList.remove('shadow-md');
            navbar.style.backgroundColor = '#F6E000'; // solid primary color
            navbar.style.backdropFilter = 'none';
        }
    });

    // 3. Scroll Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Gallery Modal Logic
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.getElementById('gallery-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const closeModalBtn = document.getElementById('close-modal');
    const modalPanel = document.getElementById('modal-panel');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const modalSubtitle = document.getElementById('modal-subtitle');

    function openGalleryModal(imgSrc, title, desc, subtitle) {
        modalImage.src = imgSrc;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalSubtitle.textContent = subtitle;

        galleryModal.classList.remove('hidden');
        void galleryModal.offsetWidth;
        galleryModal.classList.remove('opacity-0');
        modalPanel.classList.remove('scale-95');
        document.body.style.overflow = 'hidden';
    }

    function closeGalleryModal() {
        galleryModal.classList.add('opacity-0');
        modalPanel.classList.add('scale-95');

        setTimeout(() => {
            galleryModal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img').src;
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');
            const subtitle = item.getAttribute('data-subtitle');
            openGalleryModal(img, title, desc, subtitle);
        });
    });

    closeModalBtn.addEventListener('click', closeGalleryModal);
    modalBackdrop.addEventListener('click', closeGalleryModal);

    // 5. Menu Modal Logic
    const menuData = {
        bread: {
            title: "Artisan Breads",
            icon: "fa-bread-slice",
            items: [
                { name: "Classic Sourdough", desc: "Slow-fermented, naturally gluten-free option available.", price: "$8.00" },
                { name: "Honey Oat Loaf", desc: "Infused with our signature organic honey and safe rolled oats.", price: "$9.50" },
                { name: "Focaccia with Rosemary", desc: "Dairy-free, olive oil base loaded with fresh herbs.", price: "$7.00" },
                { name: "Seeded Whole Grain", desc: "Nut-free recipe, packed with sunflower and pumpkin seeds.", price: "$8.50" },
                { name: "Rustic Baguette", desc: "Traditional crusty exterior, soft airy interior, allergy-safe.", price: "$6.00" }
            ]
        },
        cakes: {
            title: "Celebration Cakes",
            icon: "fa-cake-candles",
            items: [
                { name: "Honey Lemon Drizzle", desc: "Egg-free and dairy-free light sponge cake with zesty icing.", price: "$45.00" },
                { name: "Rich Chocolate Fudge", desc: "Vegan chocolate cake tailored for severe dairy allergies.", price: "$55.00" },
                { name: "Vanilla Bean Tiered", desc: "Classic vanilla, soy-free and custom natural sweetener options.", price: "$60.00" },
                { name: "Carrot & Spice", desc: "Refined sugar-free, loaded with organic spices and raisins.", price: "$50.00" },
                { name: "Berry Forest Cake", desc: "Layered with fresh, local berries and a whipped coconut cream.", price: "$55.00" }
            ]
        },
        beverages: {
            title: "Warm Beverages",
            icon: "fa-mug-hot",
            items: [
                { name: "Signature Honey Tea", desc: "Organic chamomile sweetened with local apiary honey.", price: "$4.50" },
                { name: "Golden Milk Latte", desc: "Turmeric and plant-based milk blend, naturally anti-inflammatory.", price: "$5.50" },
                { name: "Classic Espresso", desc: "Fair-trade organic coffee beans, robust and rich.", price: "$3.50" },
                { name: "Mocha Almond-Free", desc: "Safe chocolate blend with creamy oat milk.", price: "$6.00" },
                { name: "Spiced Hot Cider", desc: "Warm apple cider infused with cinnamon sticks and whole cloves.", price: "$5.00" }
            ]
        },
        treats: {
            title: "Sweet Treats",
            icon: "fa-cookie",
            items: [
                { name: "Pure Honeycomb", desc: "A fresh block of unrefined, natural honeycomb direct from the hive.", price: "$7.00" },
                { name: "Chewy Ginger Cookies", desc: "Gluten-free, refined sugar-free, packed with warm spices.", price: "$3.50" },
                { name: "Dark Chocolate Truffles", desc: "Dairy-free ganache rolled in pure, safe cocoa powder.", price: "$12.00 / box" },
                { name: "Fruit Tarts", desc: "Seasonal local fruits on an almond-free, allergy-safe pastry crust.", price: "$6.50" },
                { name: "Honey Glazed Pastry", desc: "Flaky, butter-free pastry layered with sweet honey glaze.", price: "$4.00" }
            ]
        }
    };

    const menuModal = document.getElementById('menu-modal');
    const menuModalTitle = document.getElementById('menu-modal-title');
    const menuModalIcon = document.getElementById('menu-modal-icon');
    const menuModalList = document.getElementById('menu-modal-list');

    window.openMenuModal = function (category) {
        const data = menuData[category];
        menuModalTitle.textContent = data.title;
        menuModalIcon.className = `fa-solid ${data.icon} text-secondary text-3xl mr-4`;

        // Clear list
        menuModalList.innerHTML = '';

        // Populate list
        data.items.forEach(item => {
            const li = document.createElement('div');
            li.className = 'flex flex-col sm:flex-row sm:justify-between sm:items-start border-b border-gray-200 pb-5 mb-5 last:border-0 last:pb-0 last:mb-0';
            li.innerHTML = `
                <div class="pr-0 sm:pr-4 mb-2 sm:mb-0">
                    <h4 class="text-lg font-bold text-dark">${item.name}</h4>
                    <p class="text-gray-600 text-sm mt-1 leading-relaxed">${item.desc}</p>
                </div>
                <div class="text-secondary font-bold whitespace-nowrap text-lg">${item.price}</div>
            `;
            menuModalList.appendChild(li);
        });

        menuModal.classList.remove('hidden');
        void menuModal.offsetWidth;
        menuModal.classList.remove('opacity-0');
        menuModal.querySelector('#menu-modal-panel').classList.remove('scale-95');
        document.body.style.overflow = 'hidden';
    }

    window.closeMenuModal = function () {
        menuModal.classList.add('opacity-0');
        menuModal.querySelector('#menu-modal-panel').classList.add('scale-95');
        setTimeout(() => {
            menuModal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }

    // 6. Donation Buttons Logic
    const donationBtns = document.querySelectorAll('.donation-btn');
    donationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset all buttons to the unselected state
            donationBtns.forEach(b => {
                b.classList.remove('bg-primary');
                b.classList.add('hover:bg-primary');
            });
            // Highlight the clicked button
            btn.classList.add('bg-primary');
            btn.classList.remove('hover:bg-primary');
        });
    });

    // 7. Accessibility Assistive Logic
    const accToggleBtn = document.getElementById('accessibility-toggle-btn');
    const accPanel = document.getElementById('accessibility-panel');
    const accCloseBtn = document.getElementById('close-accessibility');

    // Open/Close Accessibility menu panel
    accToggleBtn.addEventListener('click', () => {
        const isHidden = accPanel.classList.contains('hidden');
        if (isHidden) {
            accPanel.classList.remove('hidden');
            void accPanel.offsetWidth;
            accPanel.classList.remove('scale-95', 'opacity-0');
        } else {
            accPanel.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                accPanel.classList.add('hidden');
            }, 300);
        }
    });

    accCloseBtn.addEventListener('click', () => {
        accPanel.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            accPanel.classList.add('hidden');
        }, 300);
    });

    // A. Font Sizer (Strict 5-click maximum boundary condition)
    let fontSizeClicks = 0;
    const btnIncreaseText = document.getElementById('btn-increase-text');
    const textSizeCounter = document.getElementById('text-size-clicks');

    btnIncreaseText.addEventListener('click', () => {
        fontSizeClicks++;
        if (fontSizeClicks > 5) {
            fontSizeClicks = 0;
        }

        // Scale calculations (+8% scale per step, up to +40%)
        const currentScale = 100 + (fontSizeClicks * 8);
        document.documentElement.style.fontSize = `${currentScale}%`;

        // Display click logs dynamically
        if (fontSizeClicks === 0) {
            textSizeCounter.textContent = "Normal";
        } else {
            textSizeCounter.textContent = `${fontSizeClicks} / 5`;
        }
    });

    // B. Color / Vision High Contrast Adjuster
    const btnToggleContrast = document.getElementById('btn-toggle-contrast');
    let isHighContrastActive = false;

    btnToggleContrast.addEventListener('click', () => {
        isHighContrastActive = !isHighContrastActive;
        if (isHighContrastActive) {
            document.documentElement.style.filter = "contrast(1.4) saturate(1.2)";
            btnToggleContrast.classList.add('bg-primary', 'text-dark');
        } else {
            document.documentElement.style.filter = "";
            btnToggleContrast.classList.remove('bg-primary', 'text-dark');
        }
    });

    // C. Screen Reader Assistant (Text-to-Speech Web API integration)
    const btnToggleTts = document.getElementById('btn-toggle-tts');
    const ttsStatus = document.getElementById('tts-status');
    let isTtsActive = false;

    btnToggleTts.addEventListener('click', () => {
        isTtsActive = !isTtsActive;
        if (isTtsActive) {
            btnToggleTts.classList.add('bg-primary', 'text-dark');
            ttsStatus.textContent = "TTS: Active";
            speakAccessibilityText("Assistive screen reader enabled. Hover over any text on the screen to listen.");
        } else {
            btnToggleTts.classList.remove('bg-primary', 'text-dark');
            ttsStatus.textContent = "Enable Speech Assist";
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        }
    });

    function speakAccessibilityText(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel(); // Cleans the buffer instantly before running new queue
        const voiceSpeech = new SpeechSynthesisUtterance(text);
        voiceSpeech.rate = 1.0;
        window.speechSynthesis.speak(voiceSpeech);
    }

    // Attach mouseover hooks to parse readable HTML structures
    document.body.addEventListener('mouseover', (e) => {
        if (!isTtsActive) return;

        const hoveredElement = e.target;
        const matchesReadableTag = ['H1', 'H2', 'H3', 'H4', 'P', 'SPAN', 'A', 'BUTTON', 'LI'].includes(hoveredElement.tagName);

        if (matchesReadableTag) {
            const textualInformation = hoveredElement.innerText || hoveredElement.getAttribute('aria-label') || hoveredElement.getAttribute('alt');
            if (textualInformation && textualInformation.trim().length > 0) {
                speakAccessibilityText(textualInformation.slice(0, 150));
            }
        }
    });
});
