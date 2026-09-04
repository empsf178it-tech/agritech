// components.js - Handles rendering of shared UI components

const renderNavbar = () => {
    const isSubdir = window.location.pathname.includes('/insights/');
    const root = isSubdir ? '../' : '';
    
    const navbarHTML = `
    <nav class="navbar">
        <div class="container">
            <a href="${root}index.html" class="navbar-brand">
                <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="15" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" stroke-width="1.5"/>
                    <path d="M16 7C16 7 23 9.5 23 17C23 22 17.5 24.5 16 24.5C14.5 24.5 9 22 9 17C9 9.5 16 7 16 7Z" fill="url(#nav-logo-grad)"/>
                    <path d="M16 24.5V13" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                    <path d="M16 17.5C16 17.5 19.5 15.5 21 15.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
                    <defs>
                        <linearGradient id="nav-logo-grad" x1="9" y1="7" x2="23" y2="24.5" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#4ade80"/>
                            <stop offset="1" stop-color="#15803d"/>
                        </linearGradient>
                    </defs>
                </svg>
                <span>AGROVIA</span>
            </a>
            
            <div class="nav-menu-wrapper">
                <ul class="navbar-nav">
                    <li><a href="${root}index.html" class="nav-link" data-path="index.html">Home</a></li>
                    <li><a href="${root}solutions.html" class="nav-link" data-path="solutions.html">Solutions</a></li>
                    <li><a href="${root}technology.html" class="nav-link" data-path="technology.html">Technology</a></li>
                    <li><a href="${root}platform.html" class="nav-link" data-path="platform.html">Platform</a></li>
                    <li><a href="${root}about.html" class="nav-link" data-path="about.html">About</a></li>
                    <li><a href="${root}insights.html" class="nav-link" data-path="insights.html">Insights</a></li>
                </ul>
                
                <div class="navbar-actions">
                    <a href="${root}demo.html" class="btn btn-primary">Get Started <i data-lucide="arrow-right"></i></a>
                </div>
            </div>
            
            <button class="mobile-toggle" aria-label="Toggle Menu">
                <i data-lucide="menu"></i>
            </button>
        </div>
    </nav>
    `;
    
    document.getElementById('navbar-placeholder').innerHTML = navbarHTML;
    
    // Set active link
    const currentPath = window.location.pathname;
    const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('data-path');
        if (filename === linkPath) {
            link.classList.add('active');
        } else if (filename.includes('precision-agriculture') && linkPath === 'insights.html') {
            link.classList.add('active');
        }
    });
};

const renderFooter = () => {
    const isSubdir = window.location.pathname.includes('/insights/');
    const root = isSubdir ? '../' : '';

    const footerHTML = `
    <!-- AI Chat Box (Bottom Right) -->
    <div class="chat-bot-container">
        <button id="chat-toggle" class="chat-toggle-btn" aria-label="Toggle AI Assistant">💬</button>
        <div id="chat-window" class="chat-window hidden">
            <div class="chat-header">
                <h4 style="color: var(--deep-forest-green); margin: 0; font-size: 1rem; font-family: var(--font-heading);">AgriBot AI 🤖</h4>
                <button id="close-chat" aria-label="Close Chat">✖</button>
            </div>
            <div class="chat-body" id="chat-body">
                <div class="message bot">Hello! Ask me anything about AGROVIA smart farming, yield optimization, or sensors 🤖</div>
                <div class="chat-quick-qa">
                    <button class="qa-pill" data-q="How much water can I save?" data-a="AGROVIA precision drip sensors reduce water consumption by 25% to 35% by triggering irrigation only when root-zone moisture drops below optimal threshold.">💧 Water Savings?</button>
                    <button class="qa-pill" data-q="How does drone NDVI work?" data-a="Our 4K multispectral drones capture red-edge light reflection to calculate Chlorophyll density, diagnosing crop health 14 days before symptoms appear.">🚁 Drone NDVI Scan?</button>
                    <button class="qa-pill" data-q="How do I get a demo?" data-a="You can request a free personalized 30-minute demo on our Request Demo page or calculate your custom ROI using our interactive calculator!">📅 Request Demo?</button>
                </div>
            </div>
            <div class="chat-footer">
                <input type="text" id="chat-input" placeholder="Type a message...">
                <button id="send-chat-btn">Send</button>
            </div>
        </div>
    </div>

    <!-- Bottom Floating Advisory Toast Popup (Bottom Left) -->
    <div id="advisory-toast" class="toast-popup hidden">
        <button id="close-toast" class="toast-close-btn" aria-label="Close Alert">&times;</button>
        <div class="toast-header">
            <span class="toast-pulse-dot"></span>
            <strong>Live Advisory Alert</strong>
        </div>
        <div class="toast-body">
            <p>🌧️ <strong>Monsoon Warning (Zone 4):</strong> Recommended 30% reduction in irrigation schedule due to incoming rainfall.</p>
        </div>
        <div class="toast-actions">
            <a href="${root}solutions.html" class="toast-btn" onclick="document.getElementById('advisory-toast').classList.add('hidden');">Inspect Field Map</a>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <!-- Newsletter Bar inside Footer -->
            <div class="footer-top-cta">
                <div class="footer-top-cta-text">
                    <h3>Subscribe to AgriTech Insights</h3>
                    <p>Get quarterly reports, yield optimization guides, and platform updates delivered to your inbox.</p>
                </div>
                <form class="footer-newsletter-form" onsubmit="event.preventDefault(); alert('Thank you for subscribing to AGROVIA Insights!');">
                    <input type="email" placeholder="Enter your work email..." required>
                    <button type="submit" class="btn btn-primary">Subscribe</button>
                </form>
            </div>

            <div class="footer-grid">
                <div class="footer-brand-col">
                    <div class="footer-brand" style="display: flex; align-items: center; gap: 8px;">
                        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="15" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" stroke-width="1.5"/>
                            <path d="M16 7C16 7 23 9.5 23 17C23 22 17.5 24.5 16 24.5C14.5 24.5 9 22 9 17C9 9.5 16 7 16 7Z" fill="url(#foot-logo-grad)"/>
                            <path d="M16 24.5V13" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                            <path d="M16 17.5C16 17.5 19.5 15.5 21 15.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
                            <defs>
                                <linearGradient id="foot-logo-grad" x1="9" y1="7" x2="23" y2="24.5" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#4ade80"/>
                                    <stop offset="1" stop-color="#15803d"/>
                                </linearGradient>
                            </defs>
                        </svg>
                        <span>AGROVIA</span>
                    </div>
                    <p class="footer-tagline">Connecting field data, smart technology, and actionable insights to empower sustainable farming worldwide.</p>
                    
                    <div class="footer-contact-info">
                        <div>📧 contact@agrovia.tech</div>
                        <div>📞 +1 (800) 555-AGRO</div>
                        <div>📍 San Francisco, CA & Global Field Ops</div>
                    </div>

                    <div class="footer-social">
                        <a href="#" aria-label="X (formerly Twitter)" title="X">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        <a href="#" aria-label="LinkedIn" title="LinkedIn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                            </svg>
                        </a>
                        <a href="#" aria-label="Facebook" title="Facebook">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.69c0-2.47 1.47-3.83 3.72-3.83 1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.23 0-1.62.76-1.62 1.54V12h2.73l-.44 3h-2.29v6.8c4.56-.93 8-4.96 8-9.8z"/>
                            </svg>
                        </a>
                        <a href="#" aria-label="Instagram" title="Instagram">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a href="#" aria-label="YouTube" title="YouTube">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                
                <div class="footer-links-col">
                    <h4 class="footer-title">Solutions</h4>
                    <ul class="footer-links">
                        <li><a href="${root}solutions.html#irrigation">Smart Irrigation</a></li>
                        <li><a href="${root}solutions.html#crop">Crop Intelligence</a></li>
                        <li><a href="${root}solutions.html#soil">Soil Monitoring</a></li>
                        <li><a href="${root}solutions.html#weather">Weather Intelligence</a></li>
                        <li><a href="${root}solutions.html#analytics">Farm Analytics</a></li>
                    </ul>
                </div>
                
                <div class="footer-links-col">
                    <h4 class="footer-title">Company & Tech</h4>
                    <ul class="footer-links">
                        <li><a href="${root}about.html">About Us</a></li>
                        <li><a href="${root}technology.html">Technology Stack</a></li>
                        <li><a href="${root}platform.html">Platform Dashboard</a></li>
                        <li><a href="${root}contact.html">Contact Sales</a></li>
                        <li><a href="${root}demo.html">Request Demo</a></li>
                    </ul>
                </div>
                
                <div class="footer-links-col">
                    <h4 class="footer-title">Resources</h4>
                    <ul class="footer-links">
                        <li><a href="${root}insights.html">Agritech Insights</a></li>
                        <li><a href="${root}insights/precision-agriculture.html">Precision Farming Guide</a></li>
                        <li><a href="#">Documentation</a></li>
                        <li><a href="#">System Status</a></li>
                        <li><a href="#">Support Center</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2026 AGROVIA Inc. All rights reserved.</p>
                <div class="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Security</a>
                    <a href="#">Cookie Settings</a>
                </div>
                <div class="status-badge">
                    <span class="status-dot"></span>
                    <span>All Systems Operational</span>
                </div>
            </div>
        </div>
    </footer>
    `;
    
    document.getElementById('footer-placeholder').innerHTML = footerHTML;
};

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('navbar-placeholder')) renderNavbar();
    if (document.getElementById('footer-placeholder')) renderFooter();
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
