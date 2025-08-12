  window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 1000);
        });

        // Header Scroll Effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');

        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });

        // Active Navigation Link
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop <= 120) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // FAQ Accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const isActive = faqItem.classList.contains('active');

                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });

                // Toggle current item
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });

        // Smooth Scrolling for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // WhatsApp Function
        function openWhatsApp(message = 'Olá, gostaria de saber mais sobre os seus serviços.') {
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/5522992547273?text=${encodedMessage}`, '_blank');
        }

        // Contact Form
        const SUPABASE_URL = "https://ybfkqmejybzfqbkagkvi.supabase.co";
        const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZmtxbWVqeWJ6ZnFia2Fna3ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MzE1OTcsImV4cCI6MjA1NzIwNzU5N30.qgD3PKCWT_VOEkjRA9U_EDnSlKokQGrdWUFLtqWTvws";

        document.getElementById('contactForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            const formData = {
                nome: document.getElementById('name').value,
                email: document.getElementById('email').value,
                telefone: document.getElementById('phone').value,
                empresa: document.getElementById('company').value,
                mensagem: document.getElementById('message').value
            };

            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': SUPABASE_API_KEY,
                        'Authorization': `Bearer ${SUPABASE_API_KEY}`
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    // Success
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
                    submitBtn.style.background = 'var(--primary)';
                    
                    // Reset form
                    this.reset();
                    
                    // Show success message
                    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 3000);
                } else {
                    throw new Error('Erro ao enviar mensagem');
                }
            } catch (error) {
                console.error('Error:', error);
                
                // Error state
                submitBtn.innerHTML = '<i class="fas fa-times"></i> Erro ao enviar';
                submitBtn.style.background = 'var(--accent)';
                
                alert('Erro ao enviar mensagem. Tente novamente ou entre em contato via WhatsApp.');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });

        // Intersection Observer for Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.service-card, .value-card, .product-card, .tech-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Performance optimization: Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        // Add loading states to buttons
        document.querySelectorAll('.btn').forEach(btn => {
            if (btn.type !== 'submit') {
                btn.addEventListener('click', function() {
                    if (this.href && !this.href.includes('#')) {
                        const originalHTML = this.innerHTML;
                        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
                        setTimeout(() => {
                            this.innerHTML = originalHTML;
                        }, 2000);
                    }
                });
            }
        });

        // Add smooth reveal animation on scroll
        const revealElements = document.querySelectorAll('.section-header, .hero-content');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.2 });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            revealObserver.observe(el);
        });

        // Add revealed class styles
        const style = document.createElement('style');
        style.textContent = `
            .revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);

        // Add typing effect to hero title
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing effect when page loads
        window.addEventListener('load', function() {
            setTimeout(() => {
                const heroTitle = document.querySelector('.hero h1');
                if (heroTitle) {
                    const originalText = heroTitle.textContent;
                    typeWriter(heroTitle, originalText, 50);
                }
            }, 1500);
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Add hover effects to cards
        document.querySelectorAll('.service-card, .product-card, .value-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });

        // Add progress indicators for forms
        const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
        let completedFields = 0;

        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                const requiredFields = document.querySelectorAll('#contactForm [required]');
                completedFields = 0;

                requiredFields.forEach(field => {
                    if (field.value.trim() !== '') {
                        completedFields++;
                    }
                });

                // Update submit button state
                const submitBtn = document.querySelector('#contactForm button[type="submit"]');
                const progress = (completedFields / requiredFields.length) * 100;
                
                if (progress === 100) {
                    submitBtn.style.background = 'var(--primary)';
                    submitBtn.disabled = false;
                } else {
                    submitBtn.style.background = 'var(--gray-400)';
                    submitBtn.disabled = false; // Keep enabled for better UX
                }
            });
        });

        // Add cookie consent (simple implementation)
        function showCookieConsent() {
            if (!localStorage.getItem('cookieConsent')) {
                const consentBanner = document.createElement('div');
                consentBanner.innerHTML = `
                    <div style="position: fixed; bottom: 0; left: 0; right: 0; background: var(--dark); color: white; padding: 20px; z-index: 10000; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
                        <div style="flex: 1;">
                            <p>Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa política de cookies.</p>
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <button onclick="acceptCookies()" style="background: var(--primary); color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Aceitar</button>
                            <button onclick="declineCookies()" style="background: transparent; color: white; border: 1px solid white; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Recusar</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(consentBanner);
            }
        }

        window.acceptCookies = function() {
            localStorage.setItem('cookieConsent', 'accepted');
            document.querySelector('[style*="position: fixed; bottom: 0"]').remove();
        };

        window.declineCookies = function() {
            localStorage.setItem('cookieConsent', 'declined');
            document.querySelector('[style*="position: fixed; bottom: 0"]').remove();
        };

        // Show cookie consent after page load
        setTimeout(showCookieConsent, 3000);

        // Add search functionality (basic)
        function addSearchFunctionality() {
            const searchBox = document.createElement('div');
            searchBox.innerHTML = `
                <div id="searchOverlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10001; padding: 100px 20px;">
                    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; padding: 40px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <h3>Pesquisar no site</h3>
                            <button onclick="closeSearch()" style="background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
                        </div>
                        <input type="text" id="searchInput" placeholder="Digite sua pesquisa..." style="width: 100%; padding: 15px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; margin-bottom: 20px;">
                        <div id="searchResults"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(searchBox);
        }

        window.openSearch = function() {
            document.getElementById('searchOverlay').style.display = 'block';
            document.getElementById('searchInput').focus();
        };

        window.closeSearch = function() {
            document.getElementById('searchOverlay').style.display = 'none';
        };

        // Add search functionality
        addSearchFunctionality();

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                openSearch();
            }
            
            // Escape to close overlays
            if (e.key === 'Escape') {
                closeSearch();
                navMenu.classList.remove('active');
            }
        });

        // Add performance monitoring
        window.addEventListener('load', function() {
            // Log performance metrics
            if ('performance' in window) {
                const navigation = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
                
                // Log Core Web Vitals if available
                if ('web-vital' in window) {
                    // This would typically use a library like web-vitals
                    console.log('Performance metrics logged');
                }
            }
        });

        // Add error boundary for JavaScript errors
        window.addEventListener('error', function(e) {
            console.error('JavaScript Error:', e.error);
            
            // Optionally send error to analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                    description: e.error.toString(),
                    fatal: false
                });
            }
        });

        // Add service worker for offline functionality (basic)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                        console.log('ServiceWorker registration successful');
                    })
                    .catch(function(err) {
                        console.log('ServiceWorker registration failed');
                    });
            });
        }

        // Add enhanced analytics events
        function trackEvent(eventName, parameters = {}) {
            // Google Analytics 4
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, parameters);
            }
            
            // Facebook Pixel
            if (typeof fbq !== 'undefined') {
                fbq('track', eventName, parameters);
            }
            
            // Custom analytics
            console.log('Event tracked:', eventName, parameters);
        }

        // Track user interactions
        document.addEventListener('click', function(e) {
            if (e.target.matches('a[href^="mailto:"]')) {
                trackEvent('email_click', { email: e.target.href.replace('mailto:', '') });
            }
            
            if (e.target.matches('a[href*="wa.me"]')) {
                trackEvent('whatsapp_click', { source: 'website' });
            }
            
            if (e.target.matches('.btn')) {
                trackEvent('button_click', { 
                    button_text: e.target.textContent.trim(),
                    button_location: e.target.closest('section')?.id || 'unknown'
                });
            }
        });

        // Track form interactions
        document.getElementById('contactForm').addEventListener('submit', function() {
            trackEvent('form_submission', { form_name: 'contact_form' });
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', function() {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
                maxScroll = scrollPercent;
                trackEvent('scroll_depth', { percent: scrollPercent });
            }
        });

        console.log('🚀 A.S.A Company Website Loaded Successfully!');
        console.log('📊 Professional analytics and performance monitoring active');
        console.log('💬 WhatsApp integration ready');
        console.log('📱 Mobile-responsive design loaded');
        console.log('🎨 Modern UI/UX components initialized');