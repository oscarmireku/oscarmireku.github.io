document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon from bars to times
            const icon = hamburger.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. Scroll Reveal Animation using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    // 3. Header Scroll Effect
    const header = document.querySelector('#header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '0';
        }
    });

    // 4. Smooth Scrolling adjust for header height
    // Note: CSS scroll-behavior: smooth handles the animation, 
    // but we might need JS to handle the offset if the fixed header covers content.
    // However, padding-top on body or section usually fixes this.
    // Let's add a robust handler just in case.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // 5. Dynamic News Feed
    const newsGrid = document.querySelector('.news-grid');
    if (newsGrid) {
        fetch('posts.json')
            .then(response => response.json())
            .then(data => {
                newsGrid.innerHTML = data.map(post => `
                    <article class="news-card scroll-reveal">
                        <div class="news-header">
                            <img src="${post.avatar}" alt="${post.author}" class="news-avatar">
                            <div class="news-meta">
                                <span class="news-author">${post.author}</span>
                                <span class="news-date">${post.date} • <i class="fab fa-linkedin"></i></span>
                            </div>
                        </div>
                        <h3>${post.title}</h3>
                        <p>${post.content}</p>
                        <a href="${post.link}" target="_blank" class="read-more">View on LinkedIn <i class="fas fa-external-link-alt" style="font-size: 0.8em; margin-left: 8px;"></i></a>
                    </article>
                `).join('');

                // Re-attach observer to new elements
                const newReveals = newsGrid.querySelectorAll('.scroll-reveal');
                newReveals.forEach(el => observer.observe(el));
            })
            .catch(error => console.error('Error loading posts:', error));
    }

});
