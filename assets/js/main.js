// main.js - Global functionality

document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Toggle
    setTimeout(() => { // Wait for navbar to be injected
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navbar = document.querySelector('.navbar');
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                navbar.classList.toggle('mobile-menu-active');
                
                // Toggle icon
                const icon = mobileToggle.querySelector('i');
                if (navbar.classList.contains('mobile-menu-active')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            });
        }
    }, 200);

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
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
        revealOnScroll.observe(el);
    });
    
    // Initial check for elements in view
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                el.classList.add('active');
            }
        });
    }, 300);

    // ==========================================
    // NEW FEATURES: Before/After Slider & AI Chat
    // ==========================================

    // Before/After Slider Logic
    const slider = document.getElementById('slider');
    const afterImage = document.querySelector('.image-after');
    const sliderLine = document.getElementById('slider-line');

    if(slider && afterImage && sliderLine) {
        slider.addEventListener('input', (e) => {
            let sliderPos = e.target.value;
            afterImage.style.width = `${sliderPos}%`;
            sliderLine.style.left = `${sliderPos}%`;
        });
    }

    // AI Chat Box Toggle Logic
    const chatToggleBtn = document.getElementById('chat-toggle');
    const closeChatBtn = document.getElementById('close-chat');
    const chatWindow = document.getElementById('chat-window');

    if(chatToggleBtn && closeChatBtn && chatWindow) {
        chatToggleBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('hidden');
        });
        closeChatBtn.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
        });
    }

    // ==========================================
    // NEW ENHANCEMENTS: Map Layer & ROI Calculator
    // ==========================================

    // Map Layer Switcher Logic
    const layerTabs = document.querySelectorAll('.layer-tab');
    const overlayLayer = document.getElementById('map-overlay-effect');
    const legendText = document.getElementById('map-legend-text');

    const legendMap = {
        rgb: 'Showing <strong>RGB High-Res Field Scan</strong> — Resolution 0.5m/px',
        ndvi: 'Showing <strong>NDVI Crop Health Index</strong> — Dense Green = High Chlorophyll',
        moisture: 'Showing <strong>Root-Zone Soil Moisture Heatmap</strong> — Deep Cyan = Optimal Hydration',
        thermal: 'Showing <strong>Canopy Thermal Stress Scan</strong> — Purple/Orange = Temperature Anomalies'
    };

    if(layerTabs.length > 0 && overlayLayer) {
        layerTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                layerTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const layer = tab.getAttribute('data-layer');
                overlayLayer.className = `map-overlay-layer layer-${layer}`;
                if(legendText && legendMap[layer]) {
                    legendText.innerHTML = legendMap[layer];
                }
            });
        });
    }

    // Farm ROI Calculator Logic
    const cropBtns = document.querySelectorAll('.crop-btn');
    const acresSlider = document.getElementById('acres-slider');
    const acresVal = document.getElementById('acres-val');
    const yieldIncEl = document.getElementById('yield-inc');
    const savingsValEl = document.getElementById('savings-val');
    const profitValEl = document.getElementById('profit-val');

    if(acresSlider && cropBtns.length > 0) {
        let currentMultiplier = 1.18;
        let currentWater = 24;

        function calculateROI() {
            const acres = parseInt(acresSlider.value);
            if(acresVal) acresVal.textContent = acres.toLocaleString();

            const yieldPct = ((currentMultiplier - 1) * 100).toFixed(1);
            const savings = Math.round(acres * currentWater * 1.85);
            const profit = Math.round(acres * 128 * (currentMultiplier - 0.8));

            if(yieldIncEl) yieldIncEl.textContent = `+${yieldPct}%`;
            if(savingsValEl) savingsValEl.textContent = `$${savings.toLocaleString()}`;
            if(profitValEl) profitValEl.textContent = `$${profit.toLocaleString()}`;
        }

        cropBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                cropBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentMultiplier = parseFloat(btn.getAttribute('data-multiplier'));
                currentWater = parseFloat(btn.getAttribute('data-water'));
                calculateROI();
            });
        });

        acresSlider.addEventListener('input', calculateROI);
        
        // Quick Preset Badges Handler
        const presetBtns = document.querySelectorAll('.preset-btn');
        if(presetBtns.length > 0) {
            presetBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    presetBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const acres = btn.getAttribute('data-acres');
                    acresSlider.value = acres;
                    calculateROI();
                });
            });

            acresSlider.addEventListener('input', () => {
                const currentAcres = acresSlider.value;
                presetBtns.forEach(b => {
                    if(b.getAttribute('data-acres') === currentAcres) {
                        b.classList.add('active');
                    } else {
                        b.classList.remove('active');
                    }
                });
            });
        }

        calculateROI(); // Initial calculation run
    }

    // ==========================================
    // ADVANCED ANIMATIONS (Particles, Count-Up, 3D Tilt)
    // ==========================================

    // 1. Floating Bio Spores Canvas in Hero
    const particleCanvas = document.getElementById('hero-particles');
    if(particleCanvas) {
        const ctx = particleCanvas.getContext('2d');
        let width = particleCanvas.width = particleCanvas.offsetWidth;
        let height = particleCanvas.height = particleCanvas.offsetHeight;

        window.addEventListener('resize', () => {
            width = particleCanvas.width = particleCanvas.offsetWidth;
            height = particleCanvas.height = particleCanvas.offsetHeight;
        });

        const particles = [];
        const particleCount = 45;

        for(let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2.5 + 0.5,
                speedY: Math.random() * 0.4 + 0.1,
                speedX: Math.sin(Math.random() * Math.PI) * 0.2,
                opacity: Math.random() * 0.6 + 0.2
            });
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach(p => {
                p.y -= p.speedY;
                p.x += p.speedX;
                
                if(p.y < 0) {
                    p.y = height;
                    p.x = Math.random() * width;
                }
                if(p.x < 0 || p.x > width) {
                    p.x = Math.random() * width;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(134, 239, 172, ${p.opacity})`;
                ctx.shadowBlur = 8;
                ctx.shadowColor = '#22c55e';
                ctx.fill();
            });

            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // 2. Metric Count-Up Animation on Scroll
    const metricHeaders = document.querySelectorAll('.metric-item h3');
    if(metricHeaders.length > 0) {
        const observerOptions = { threshold: 0.5 };
        
        const metricObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent.trim();
                    let targetNum = parseFloat(text.replace(/[^0-9.]/g, ''));
                    let suffix = text.replace(/[0-9.]/g, '');

                    let count = 0;
                    let duration = 1800; // ms
                    let startTime = null;

                    function step(timestamp) {
                        if (!startTime) startTime = timestamp;
                        let progress = Math.min((timestamp - startTime) / duration, 1);
                        // Ease out cubic
                        let easeProgress = 1 - Math.pow(1 - progress, 3);
                        let currentVal = (easeProgress * targetNum);

                        if(targetNum % 1 !== 0) {
                            el.textContent = currentVal.toFixed(1) + suffix;
                        } else {
                            el.textContent = Math.floor(currentVal).toLocaleString() + suffix;
                        }

                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            el.textContent = text; // Ensure exact final text
                        }
                    }
                    requestAnimationFrame(step);
                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        metricHeaders.forEach(el => metricObserver.observe(el));
    }

    // 3. Interactive 3D Card Tilt & Cursor Glow Effect
    const tiltCards = document.querySelectorAll('.feature-card, .blog-card, .tech-card, .roi-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg tilt
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });

    // 4. FAQ Accordion Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    if(faqQuestions.length > 0) {
        faqQuestions.forEach(q => {
            q.addEventListener('click', () => {
                const item = q.parentElement;
                const isActive = item.classList.contains('active');
                
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                
                if(!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // 5. Entrance Welcome Modal & Advisory Toast Logic
    const welcomeModal = document.getElementById('welcome-modal');
    const closeWelcomeBtn = document.getElementById('close-welcome-modal');

    if(welcomeModal && closeWelcomeBtn) {
        // Auto-show Welcome Modal after 2.5 seconds
        setTimeout(() => {
            if(!sessionStorage.getItem('welcomeModalDismissed')) {
                welcomeModal.classList.remove('hidden');
            }
        }, 2500);

        function hideWelcomeModal() {
            welcomeModal.classList.add('hidden');
            sessionStorage.setItem('welcomeModalDismissed', 'true');
        }

        closeWelcomeBtn.addEventListener('click', hideWelcomeModal);
        welcomeModal.addEventListener('click', (e) => {
            if(e.target === welcomeModal) hideWelcomeModal();
        });
    }

    const advisoryToast = document.getElementById('advisory-toast');
    const closeToastBtn = document.getElementById('close-toast');

    if(advisoryToast && closeToastBtn) {
        // Auto-show Advisory Toast after 5 seconds
        setTimeout(() => {
            advisoryToast.classList.remove('hidden');
        }, 5000);

        closeToastBtn.addEventListener('click', () => {
            advisoryToast.classList.add('hidden');
        });
    }

    // ==========================================
    // NEW PLANNED FEATURES JS HANDLERS
    // ==========================================

    // 6. AI Crop Health Diagnostic Wizard Handler
    const symptomBtns = document.querySelectorAll('.symptom-btn');
    const dTitle = document.getElementById('d-title');
    const dSeverity = document.getElementById('d-severity');
    const dCause = document.getElementById('d-cause');
    const dAction = document.getElementById('d-action');

    if(symptomBtns.length > 0) {
        symptomBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                symptomBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if(dTitle) dTitle.textContent = btn.getAttribute('data-title');
                if(dSeverity) dSeverity.textContent = btn.getAttribute('data-severity');
                if(dCause) dCause.textContent = btn.getAttribute('data-cause');
                if(dAction) dAction.textContent = btn.getAttribute('data-action');
            });
        });
    }

    // 7. Live Sandbox Control Dashboard Handler
    const toggleValve = document.getElementById('toggle-valve');
    const toggleDrone = document.getElementById('toggle-drone');
    const toggleNitrogen = document.getElementById('toggle-nitrogen');
    const sbMoisture = document.getElementById('sb-moisture');
    const sbMoistureStatus = document.getElementById('sb-moisture-status');
    const sbNdvi = document.getElementById('sb-ndvi');
    const sbNdviStatus = document.getElementById('sb-ndvi-status');
    const sbNitrogen = document.getElementById('sb-nitrogen');
    const sbNitrogenStatus = document.getElementById('sb-nitrogen-status');
    const sbLog = document.getElementById('sb-log');

    if(toggleValve) {
        let valveState = false;
        toggleValve.addEventListener('click', () => {
            valveState = !valveState;
            toggleValve.classList.toggle('active', valveState);
            toggleValve.textContent = valveState ? 'TURN OFF' : 'TURN ON';
            if(sbMoisture) sbMoisture.textContent = valveState ? '44.8%' : '28.4%';
            if(sbMoistureStatus) {
                sbMoistureStatus.textContent = valveState ? 'Optimal Hydration' : 'Low (Needs Water)';
                sbMoistureStatus.style.color = valveState ? '#86efac' : '#fb923c';
            }
            if(sbLog) sbLog.textContent = `[SYSTEM]: Drip Irrigation Valve (Zone 4) set to ${valveState ? 'ACTIVE' : 'IDLE'}. Flowing 140 L/min.`;
        });
    }

    if(toggleDrone) {
        let droneState = false;
        toggleDrone.addEventListener('click', () => {
            droneState = !droneState;
            toggleDrone.classList.toggle('active', droneState);
            toggleDrone.textContent = droneState ? 'SCANNING...' : 'START SCAN';
            if(sbNdvi) sbNdvi.textContent = droneState ? '0.89' : '0.76';
            if(sbNdviStatus) {
                sbNdviStatus.textContent = droneState ? 'High Canopy Health' : 'Standard Canopy';
                sbNdviStatus.style.color = droneState ? '#4ade80' : '#86efac';
            }
            if(sbLog) sbLog.textContent = `[SYSTEM]: Drone Radar Sweep ${droneState ? 'STARTED' : 'COMPLETED'}. Multispectral scan active.`;
        });
    }

    if(toggleNitrogen) {
        let nState = false;
        toggleNitrogen.addEventListener('click', () => {
            nState = !nState;
            toggleNitrogen.classList.toggle('active', nState);
            toggleNitrogen.textContent = nState ? 'PUMPING...' : 'INJECT NPK';
            if(sbNitrogen) sbNitrogen.textContent = nState ? '52 ppm' : '34 ppm';
            if(sbNitrogenStatus) {
                sbNitrogenStatus.textContent = nState ? 'Target Optimal' : 'Deficient';
                sbNitrogenStatus.style.color = nState ? '#86efac' : '#fb923c';
            }
            if(sbLog) sbLog.textContent = `[SYSTEM]: Nitrogen Dosing Pump ${nState ? 'ACTIVE' : 'IDLE'}. NPK dosing set to 15 kg/ha.`;
        });
    }

    // 8. Seasonal Crop Calendar Tab Switcher
    const seasonTabs = document.querySelectorAll('.season-tab');
    const seasonBanner = document.getElementById('season-title-banner');
    const cropActivitiesGrid = document.getElementById('crop-activities');

    const seasonData = {
        spring: {
            title: '🌸 Spring Planting & Soil Preparation Window',
            desc: 'Focus on soil temperature monitoring, seedbed moisture calibration, and pre-emergent nutrient application.',
            cards: `
                <div class="activity-card"><span class="c-emoji">🌽</span><h4>Corn (Maize)</h4><div class="act-badge act-plant">Seed Planting Window</div><p>Soil Temp: > 10°C | Target Moisture: 32% - 36%</p></div>
                <div class="activity-card"><span class="c-emoji">🌾</span><h4>Wheat</h4><div class="act-badge act-fertilize">Nitrogen Top-Dressing</div><p>Apply 40kg/ha N-boost at tillering stage.</p></div>
                <div class="activity-card"><span class="c-emoji">🫘</span><h4>Soybeans</h4><div class="act-badge act-prep">Inoculant & Soil Prep</div><p>Verify rhizobia inoculation for optimal N-fixation.</p></div>
                <div class="activity-card"><span class="c-emoji">🍇</span><h4>Vineyards</h4><div class="act-badge act-prune">Bud Break & Canopy Care</div><p>Monitor early frost warnings via hyper-local sensors.</p></div>
            `
        },
        summer: {
            title: '☀️ Summer Peak Growth & Irrigation Management',
            desc: 'Critical water management period. Monitor transpiration rates and pest pressure under high heat.',
            cards: `
                <div class="activity-card"><span class="c-emoji">🌽</span><h4>Corn (Maize)</h4><div class="act-badge act-plant">Peak Drip Irrigation</div><p>Maintain 38% moisture during silking stage.</p></div>
                <div class="activity-card"><span class="c-emoji">☁️</span><h4>Cotton</h4><div class="act-badge act-fertilize">Canopy Foliar Spray</div><p>Apply targeted micronutrient boost.</p></div>
                <div class="activity-card"><span class="c-emoji">🫘</span><h4>Soybeans</h4><div class="act-badge act-prep">Pod-Fill Monitoring</div><p>Track NDVI health index for drought stress.</p></div>
                <div class="activity-card"><span class="c-emoji">🍇</span><h4>Vineyards</h4><div class="act-badge act-prune">Veraison & Moisture Control</div><p>Regulate deficit irrigation for sugar concentration.</p></div>
            `
        },
        autumn: {
            title: '🍂 Autumn Harvest & Yield Analytics Window',
            desc: 'Optimal crop moisture testing prior to combine harvesting and post-harvest residue management.',
            cards: `
                <div class="activity-card"><span class="c-emoji">🌽</span><h4>Corn (Maize)</h4><div class="act-badge act-harvest">Grain Harvest Window</div><p>Harvest at 15%-18% grain moisture content.</p></div>
                <div class="activity-card"><span class="c-emoji">🌾</span><h4>Winter Wheat</h4><div class="act-badge act-plant">Winter Crop Seeding</div><p>Sow winter wheat seed varieties before frost.</p></div>
                <div class="activity-card"><span class="c-emoji">🫘</span><h4>Soybeans</h4><div class="act-badge act-harvest">Bean Combine Harvest</div><p>Monitor pod dryness to prevent shattering loss.</p></div>
                <div class="activity-card"><span class="c-emoji">🍇</span><h4>Vineyards</h4><div class="act-badge act-harvest">Grape Vintage Picking</div><p>Coordinate picking based on Brix sugar sensors.</p></div>
            `
        },
        winter: {
            title: '❄️ Winter Soil Rest & Sensor Maintenance',
            desc: 'Equipment servicing, historical yield mapping analysis, and winter cover crop management.',
            cards: `
                <div class="activity-card"><span class="c-emoji">🌾</span><h4>Winter Wheat</h4><div class="act-badge act-prep">Cover Crop Overwinter</div><p>Monitor snow cover insulation effect.</p></div>
                <div class="activity-card"><span class="c-emoji">🚜</span><h4>All Fields</h4><div class="act-badge act-prune">Sensor Battery Service</div><p>Recharge solar IoT field node batteries.</p></div>
                <div class="activity-card"><span class="c-emoji">📊</span><h4>Analytics</h4><div class="act-badge act-fertilize">Annual Yield Mapping</div><p>Analyze year-end zone productivity reports.</p></div>
                <div class="activity-card"><span class="c-emoji">🍇</span><h4>Vineyards</h4><div class="act-badge act-prune">Dormant Vine Pruning</div><p>Prune canes and inspect trellising structure.</p></div>
            `
        }
    };

    if(seasonTabs.length > 0 && seasonBanner && cropActivitiesGrid) {
        seasonTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                seasonTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const s = tab.getAttribute('data-season');
                if(seasonData[s]) {
                    seasonBanner.innerHTML = `<h3>${seasonData[s].title}</h3><p>${seasonData[s].desc}</p>`;
                    cropActivitiesGrid.innerHTML = seasonData[s].cards;
                }
            });
        });
    }

    // 9. AgriBot Chat Q&A Pill Click & Send Handler
    const qaPills = document.querySelectorAll('.qa-pill');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');

    function appendUserMessage(msg) {
        if(!chatBody) return;
        const userDiv = document.createElement('div');
        userDiv.className = 'message user';
        userDiv.textContent = msg;
        chatBody.appendChild(userDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function appendBotMessage(msg) {
        if(!chatBody) return;
        setTimeout(() => {
            const botDiv = document.createElement('div');
            botDiv.className = 'message bot';
            botDiv.innerHTML = msg;
            chatBody.appendChild(botDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 400);
    }

    if(qaPills.length > 0) {
        qaPills.forEach(pill => {
            pill.addEventListener('click', () => {
                const question = pill.getAttribute('data-q');
                const answer = pill.getAttribute('data-a');
                appendUserMessage(question);
                appendBotMessage(answer);
            });
        });
    }

    if(sendChatBtn && chatInput) {
        sendChatBtn.addEventListener('click', () => {
            const text = chatInput.value.trim();
            if(text) {
                appendUserMessage(text);
                chatInput.value = '';
                appendBotMessage("Thank you for reaching out! Our agricultural AI model estimates a <strong>+18% yield improvement</strong> for your farm using AGROVIA sensors. Would you like to schedule a live demo?");
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                sendChatBtn.click();
            }
        });
    }

});
