        document.addEventListener('DOMContentLoaded', function() {
            const menuBtn = document.getElementById('menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const menuIcon = menuBtn.querySelector('i');
            const mobileLinks = document.querySelectorAll('.mobile-link');
            const navbar = document.getElementById('navbar');
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('a.nav-link');
            const textSpans = document.querySelectorAll('.home-info h2 span');
            let currentTextIndex = 0;
            const revealElements = document.querySelectorAll('.fade-in-element');

            // --- Mobile Menu Toggle ---
            function toggleMenu() {
                mobileMenu.classList.toggle('menu-open'); // Toggle 'menu-open' for slide
                document.body.classList.toggle('overflow-hidden'); // Prevent scrolling when menu is open
                // Toggle icon
                if (mobileMenu.classList.contains('menu-open')) {
                    menuIcon.classList.remove('bx-menu');
                    menuIcon.classList.add('bx-x');
                } else {
                    menuIcon.classList.remove('bx-x');
                    menuIcon.classList.add('bx-menu');
                }
            }

            menuBtn.addEventListener('click', toggleMenu);
            mobileLinks.forEach(link => {
                link.addEventListener('click', toggleMenu);
            });

            // --- Sticky Header ---
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('bg-brand-dark/90', 'backdrop-blur-sm', 'shadow-lg');
                } else {
                    navbar.classList.remove('bg-brand-dark/90', 'backdrop-blur-sm', 'shadow-lg');
                }
            });
            
            // --- Active Nav Link Highlighting ---
            function updateActiveLink() {
                let currentSection = 'home'; // Default to home

                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    // Trigger 150px before the top of the section
                    if (window.scrollY >= sectionTop - 150) { 
                        currentSection = section.getAttribute('id');
                    }
                });

                // Update desktop links
                navLinks.forEach(link => {
                    link.classList.remove('text-brand-primary', 'font-bold');
                    if (link.dataset.section === currentSection) {
                        link.classList.add('text-brand-primary', 'font-bold');
                    }
                });

                // Update mobile links (they are different elements)
                mobileLinks.forEach(link => {
                    link.classList.remove('text-brand-primary');
                    if (link.dataset.section === currentSection) {
                        link.classList.add('text-brand-primary');
                    }
                });
            }

            window.addEventListener('scroll', updateActiveLink);
            updateActiveLink(); // Run on load

            // --- Typing Animation ---
            function updateActiveText() {
                // Update text spans
                textSpans.forEach((span, index) => {
                    span.classList.toggle('active', index === currentTextIndex);
                });
                currentTextIndex = (currentTextIndex + 1) % textSpans.length;

                // Update the h2 element's min-height based on the tallest span
                // This prevents the layout from shifting
                let maxHeight = 0;
                textSpans.forEach(span => {
                    span.classList.add('active'); // Temporarily activate to measure
                    maxHeight = Math.max(maxHeight, span.offsetHeight);
                    span.classList.remove('active'); // Deactivate
                });
                
                // Re-apply the correct active class
                if(textSpans[currentTextIndex]) {
                    textSpans[currentTextIndex].classList.add('active');
                    const h2 = document.querySelector('.home-info h2');
                    if(h2) h2.style.height = `${maxHeight}px`;
                }
            }


            if (textSpans.length > 0) {
                // Run once on load to set the height
                updateActiveText();
                // Then set the interval
                setInterval(updateActiveText, 4000); // Cycle every 4 seconds
            }

            // --- Scroll Reveal Animations (Intersection Observer) ---
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Use a short delay based on the animation-delay style, if present
                        const delay = parseInt(entry.target.style.animationDelay) || 0;
                        setTimeout(() => {
                            entry.target.classList.add('is-visible');
                        }, delay);
                        observer.unobserve(entry.target); // Stop observing once visible
                    }
                });
            }, {
                root: null, // relative to viewport
                threshold: 0.1 // 10% of the item must be visible
            });

            revealElements.forEach(el => {
                observer.observe(el);
            });

            // --- Project Link Button Styles (Applied via JS for convenience) ---
            const btnSolidClasses = [
                'inline-flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'bg-brand-primary', 'text-brand-dark', 
                'font-medium', 'rounded-full', 'transition-all', 'duration-300', 
                'hover:bg-brand-secondary', 'hover:shadow-lg', 'hover:shadow-brand-primary/30'
            ];
            
            const btnOutlineClasses = [
                'inline-flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'border-2', 'border-brand-primary', 
                'text-brand-primary', 'font-medium', 'rounded-full', 'transition-all', 'duration-300', 
                'hover:bg-brand-primary', 'hover:text-brand-dark'
            ];

            document.querySelectorAll('.btn-solid').forEach(btn => btn.classList.add(...btnSolidClasses));
            document.querySelectorAll('.btn-outline').forEach(btn => btn.classList.add(...btnOutlineClasses));

            // --- Tech Tag Styles ---
            const techTagClasses = [
                'inline-block', 'bg-brand-dark/50', 'border', 'border-brand-primary/50', 'text-brand-primary', 
                'text-xs', 'font-medium', 'px-3', 'py-1', 'rounded-full'
            ];
            document.querySelectorAll('.tech-tag').forEach(tag => tag.classList.add(...techTagClasses));


        });
