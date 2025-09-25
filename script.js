// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initTypingEffect();
    initRoleRotation();
    initScrollAnimations();
    initSkillBars();
    initProjectModals();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
    initCVDownloader();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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
}

// Typing effect for hero section
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    const texts = ['Muhammad Gibran', 'Full Stack Developer', 'UI/UX Designer', 'Gamer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Auto-rotating role/title functionality
function initRoleRotation() {
    const roleElement = document.querySelector('.title-role');
    const roles = [
        'Full Stack Developer',
        'Frontend Developer', 
        'Backend Developer',
        'Mobile Developer',
        'UI/UX Designer',
        'Web Developer',
        'Software Engineer',
        'Laravel Developer',
        'Flutter Developer',
        'JavaScript Developer'
    ];
    
    let currentRoleIndex = 0;
    let isAnimating = false;
    
    function rotateRole() {
        if (isAnimating) return;
        
        isAnimating = true;
        
        // Fade out current role
        roleElement.style.opacity = '0';
        roleElement.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            // Change to next role
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            roleElement.textContent = roles[currentRoleIndex];
            
            // Fade in new role
            roleElement.style.opacity = '1';
            roleElement.style.transform = 'translateY(0)';
            
            isAnimating = false;
        }, 300);
    }
    
    // Set initial transition
    roleElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    // Start rotation every 3 seconds
    setInterval(rotateRole, 3000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Add specific animations to elements
    const aboutImg = document.querySelector('.about-img');
    const aboutText = document.querySelector('.about-text');
    const projectCards = document.querySelectorAll('.project-card');
    const serviceCards = document.querySelectorAll('.service-card');

    if (aboutImg) {
        aboutImg.classList.add('slide-in-left');
        observer.observe(aboutImg);
    }

    if (aboutText) {
        aboutText.classList.add('slide-in-right');
        observer.observe(aboutText);
    }

    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
        observer.observe(card);
    });

    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
        observer.observe(card);
    });
}

// Skill cards animation
function initSkillBars() {
    const skillCards = document.querySelectorAll('.skills-grid .skill-card');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillCard = entry.target;
                
                // Add staggered animation
                setTimeout(() => {
                    skillCard.style.opacity = '1';
                    skillCard.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }, { threshold: 0.3 });

    // Initially hide items for animation
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        skillObserver.observe(card);
    });
}

// Project modals
function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    const viewDetailsButtons = document.querySelectorAll('.btn-view-details');

    const projectData = {
        1: {
            title: 'E-Commerce Website',
            image: 'https://via.placeholder.com/600x400/6366f1/ffffff?text=E-Commerce+Website',
            description: 'A modern e-commerce platform built with React and Node.js, featuring user authentication, product catalog, shopping cart, and payment integration.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
            features: [
                'User authentication and authorization',
                'Product catalog with search and filtering',
                'Shopping cart and wishlist functionality',
                'Secure payment processing with Stripe',
                'Admin dashboard for product management',
                'Responsive design for all devices'
            ],
            liveDemo: '#',
            github: '#'
        },
        2: {
            title: 'Task Management App',
            image: 'https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Task+Management+App',
            description: 'A collaborative task management application with real-time updates, built using Vue.js and Firebase for seamless team collaboration.',
            technologies: ['Vue.js', 'Firebase', 'Vuex', 'CSS3', 'JavaScript'],
            features: [
                'Real-time collaboration',
                'Task assignment and tracking',
                'Project timeline visualization',
                'Team member management',
                'File attachments and comments',
                'Mobile-responsive interface'
            ],
            liveDemo: '#',
            github: '#'
        },
        3: {
            title: 'Weather Dashboard',
            image: 'https://via.placeholder.com/600x400/06b6d4/ffffff?text=Weather+Dashboard',
            description: 'A beautiful weather dashboard that provides location-based weather forecasts with interactive charts and detailed weather information.',
            technologies: ['JavaScript', 'Weather API', 'Charts.js', 'HTML5', 'CSS3'],
            features: [
                'Current weather conditions',
                '7-day weather forecast',
                'Interactive weather charts',
                'Location-based weather data',
                'Weather alerts and notifications',
                'Beautiful UI with weather animations'
            ],
            liveDemo: '#',
            github: '#'
        },
        4: {
            title: 'Portfolio Website',
            image: 'https://via.placeholder.com/600x400/10b981/ffffff?text=Portfolio+Website',
            description: 'A responsive portfolio website with modern animations and interactive elements, showcasing projects and skills in an elegant way.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Responsive Design'],
            features: [
                'Modern and clean design',
                'Smooth scrolling animations',
                'Interactive project gallery',
                'Contact form with validation',
                'Mobile-first responsive design',
                'SEO optimized'
            ],
            liveDemo: '#',
            github: '#'
        },
        5: {
            title: 'Social Media Dashboard',
            image: 'https://via.placeholder.com/600x400/f59e0b/ffffff?text=Social+Media+Dashboard',
            description: 'An analytics dashboard for social media management with data visualization, post scheduling, and performance tracking.',
            technologies: ['React', 'D3.js', 'Express', 'MongoDB', 'Chart.js'],
            features: [
                'Social media analytics',
                'Post scheduling and management',
                'Performance tracking',
                'Data visualization with charts',
                'Multi-platform integration',
                'Real-time notifications'
            ],
            liveDemo: '#',
            github: '#'
        },
        6: {
            title: 'Booking System',
            image: 'https://via.placeholder.com/600x400/ef4444/ffffff?text=Booking+System',
            description: 'An online booking system for restaurants and events with calendar integration, payment processing, and customer management.',
            technologies: ['PHP', 'MySQL', 'Bootstrap', 'jQuery', 'PayPal API'],
            features: [
                'Online reservation system',
                'Calendar integration',
                'Payment processing',
                'Customer management',
                'Email notifications',
                'Admin dashboard'
            ],
            liveDemo: '#',
            github: '#'
        }
    };

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                modalBody.innerHTML = `
                    <div class="modal-project">
                        <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: 10px; margin-bottom: 1.5rem;">
                        <h2 style="color: #6366f1; margin-bottom: 1rem;">${project.title}</h2>
                        <p style="color: #a1a1aa; margin-bottom: 1.5rem; line-height: 1.6;">${project.description}</p>
                        
                        <h3 style="color: #ffffff; margin-bottom: 1rem;">Technologies Used</h3>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                            ${project.technologies.map(tech => `<span style="background: #6366f1; color: white; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.9rem;">${tech}</span>`).join('')}
                        </div>
                        
                        <h3 style="color: #ffffff; margin-bottom: 1rem;">Key Features</h3>
                        <ul style="color: #a1a1aa; margin-bottom: 1.5rem; line-height: 1.6;">
                            ${project.features.map(feature => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join('')}
                        </ul>
                        
                        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                            <a href="${project.liveDemo}" class="btn btn-primary" style="text-decoration: none;">Live Demo</a>
                            <a href="${project.github}" class="btn btn-secondary" style="text-decoration: none;">View Code</a>
                        </div>
                    </div>
                `;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Contact form validation
function initContactForm() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Clear previous errors
        clearErrors();
        
        // Validate name
        if (nameInput.value.trim() === '') {
            showError('name-error', 'Name is required');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError('name-error', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError('email-error', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError('email-error', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            showError('message-error', 'Message is required');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError('message-error', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                form.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        }
    });

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }

    // Real-time validation
    nameInput.addEventListener('blur', function() {
        if (this.value.trim() !== '' && this.value.trim().length < 2) {
            showError('name-error', 'Name must be at least 2 characters');
        } else {
            document.getElementById('name-error').textContent = '';
        }
    });

    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value.trim() !== '' && !emailRegex.test(this.value.trim())) {
            showError('email-error', 'Please enter a valid email address');
        } else {
            document.getElementById('email-error').textContent = '';
        }
    });

    messageInput.addEventListener('blur', function() {
        if (this.value.trim() !== '' && this.value.trim().length < 10) {
            showError('message-error', 'Message must be at least 10 characters');
        } else {
            document.getElementById('message-error').textContent = '';
        }
    });
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scroll for hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(function() {
    // Any scroll-based functionality that doesn't need immediate response
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://via.placeholder.com/200x200/6366f1/ffffff?text=Profile',
        'https://via.placeholder.com/400x500/6366f1/ffffff?text=About+Me',
        'https://via.placeholder.com/400x300/6366f1/ffffff?text=Project+1',
        'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Project+2',
        'https://via.placeholder.com/400x300/06b6d4/ffffff?text=Project+3',
        'https://via.placeholder.com/400x300/10b981/ffffff?text=Project+4',
        'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Project+5',
        'https://via.placeholder.com/400x300/ef4444/ffffff?text=Project+6'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();

// CV Downloader functionality
function initCVDownloader() {
    const downloadBtn = document.getElementById('download-cv');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Let the default download behavior work, just add visual feedback
            const originalText = this.innerHTML;
            
            // Show loading state briefly
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            this.style.pointerEvents = 'none';
            
            // Show success message
            setTimeout(() => {
                showDownloadMessage('CV berhasil didownload!');
                trackDownload('pdf');
            }, 500);
            
            // Reset button
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 1500);
        });
    }
}

// Generate PDF from HTML template
function generatePDFFromHTML() {
    // Since we can't generate actual PDF in browser without library,
    // we'll create a print-optimized HTML that can be saved as PDF
    const cvData = {
        name: 'Your Full Name',
        title: 'Full Stack Developer & UI/UX Designer',
        email: 'your.email@example.com',
        phone: '+62 123 456 7890',
        website: 'yourportfolio.com',
        location: 'Jakarta, Indonesia',
        summary: 'Passionate Full Stack Developer with 3+ years of experience in creating responsive web applications and user-centered designs.',
        skills: [
            { category: 'Frontend', items: ['HTML5, CSS3, JavaScript', 'React, Vue.js, Angular', 'Tailwind CSS, Bootstrap'] },
            { category: 'Backend', items: ['Node.js, Express', 'PHP, Laravel', 'Python, Django'] },
            { category: 'Database', items: ['MongoDB, MySQL', 'PostgreSQL', 'Firebase'] }
        ],
        experience: [
            {
                title: 'Senior Full Stack Developer',
                company: 'Tech Company Inc.',
                period: 'Jan 2022 - Present',
                achievements: [
                    'Led development of 5+ web applications using React, Node.js, and MongoDB',
                    'Improved application performance by 40% through code optimization',
                    'Mentored 3 junior developers and conducted code reviews'
                ]
            }
        ]
    };
    
    const printableHTML = createPrintableCV(cvData);
    
    // Open in new window for printing/saving as PDF
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printableHTML);
    printWindow.document.close();
    
    // Auto-trigger print dialog (user can save as PDF)
    setTimeout(() => {
        printWindow.print();
    }, 500);
    
    showDownloadMessage('CV siap untuk disimpan sebagai PDF! Gunakan Ctrl+P atau Print untuk menyimpan.', 'success');
    trackDownload('html-to-pdf');
}

// Create printable CV HTML
function createPrintableCV(data) {
    return `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name} - CV</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
            font-size: 14px;
        }
        
        .cv-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            background: white;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #6366f1;
            padding-bottom: 20px;
        }
        
        .name {
            font-size: 2.5rem;
            font-weight: bold;
            color: #6366f1;
            margin-bottom: 10px;
        }
        
        .title {
            font-size: 1.2rem;
            color: #666;
            margin-bottom: 15px;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            font-size: 0.9rem;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .section {
            margin-bottom: 25px;
        }
        
        .section-title {
            font-size: 1.3rem;
            font-weight: bold;
            color: #6366f1;
            margin-bottom: 15px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 5px;
        }
        
        .experience-item, .education-item {
            margin-bottom: 20px;
        }
        
        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
        }
        
        .item-title {
            font-weight: bold;
            color: #333;
        }
        
        .item-company {
            color: #6366f1;
            font-weight: 500;
        }
        
        .item-date {
            color: #666;
            font-size: 0.9rem;
        }
        
        .item-description ul {
            margin-left: 20px;
        }
        
        .item-description li {
            margin-bottom: 5px;
            color: #555;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        
        .skill-category {
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #6366f1;
        }
        
        .skill-category h4 {
            color: #6366f1;
            margin-bottom: 10px;
        }
        
        .skill-list {
            list-style: none;
        }
        
        .skill-list li {
            padding: 3px 0;
            color: #555;
        }
        
        @media print {
            body {
                font-size: 12px;
            }
            .cv-container {
                padding: 20px;
                box-shadow: none;
            }
            .contact-info {
                font-size: 0.8rem;
            }
        }
        
        @page {
            margin: 1cm;
        }
    </style>
</head>
<body>
    <div class="cv-container">
        <!-- Header -->
        <div class="header">
            <h1 class="name">${data.name}</h1>
            <p class="title">${data.title}</p>
            <div class="contact-info">
                <div class="contact-item">
                    <span>📧</span>
                    <span>${data.email}</span>
                </div>
                <div class="contact-item">
                    <span>📱</span>
                    <span>${data.phone}</span>
                </div>
                <div class="contact-item">
                    <span>🌐</span>
                    <span>${data.website}</span>
                </div>
                <div class="contact-item">
                    <span>📍</span>
                    <span>${data.location}</span>
                </div>
            </div>
        </div>

        <!-- Professional Summary -->
        <div class="section">
            <h2 class="section-title">Ringkasan Profesional</h2>
            <p>${data.summary}</p>
        </div>

        <!-- Experience -->
        <div class="section">
            <h2 class="section-title">Pengalaman Kerja</h2>
            ${data.experience.map(exp => `
                <div class="experience-item">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${exp.title}</div>
                            <div class="item-company">${exp.company}</div>
                        </div>
                        <div class="item-date">${exp.period}</div>
                    </div>
                    <div class="item-description">
                        <ul>
                            ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Skills -->
        <div class="section">
            <h2 class="section-title">Keahlian Teknis</h2>
            <div class="skills-grid">
                ${data.skills.map(skillGroup => `
                    <div class="skill-category">
                        <h4>${skillGroup.category}</h4>
                        <ul class="skill-list">
                            ${skillGroup.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Education -->
        <div class="section">
            <h2 class="section-title">Pendidikan</h2>
            <div class="education-item">
                <div class="item-header">
                    <div>
                        <div class="item-title">Sarjana Teknik Informatika</div>
                        <div class="item-company">Universitas Indonesia</div>
                    </div>
                    <div class="item-date">2016 - 2020</div>
                </div>
                <div class="item-description">
                    <p>Lulus dengan predikat Cum Laude, fokus pada Software Engineering dan Web Development</p>
                </div>
            </div>
        </div>

        <!-- Languages -->
        <div class="section">
            <h2 class="section-title">Bahasa</h2>
            <ul class="skill-list">
                <li>Bahasa Indonesia - Native</li>
                <li>English - Fluent</li>
                <li>Japanese - Basic</li>
            </ul>
        </div>
    </div>
    
    <script>
        // Auto print when page loads
        window.onload = function() {
            setTimeout(function() {
                window.print();
            }, 500);
        }
    </script>
</body>
</html>`;
}

// Show download options
function showDownloadOptions() {
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
        <div class="download-modal-content">
            <div class="download-modal-header">
                <h3>Download CV</h3>
                <span class="download-modal-close">&times;</span>
            </div>
            <div class="download-modal-body">
                <p>Choose your preferred format:</p>
                <div class="download-options">
                    <button class="download-option-btn" data-type="pdf">
                        <i class="fas fa-file-pdf"></i>
                        <span>Download PDF</span>
                        <small>Ready-to-use PDF format</small>
                    </button>
                    <button class="download-option-btn" data-type="html">
                        <i class="fas fa-code"></i>
                        <span>View HTML Version</span>
                        <small>Editable HTML template</small>
                    </button>
                    <button class="download-option-btn" data-type="generate">
                        <i class="fas fa-magic"></i>
                        <span>Generate Custom CV</span>
                        <small>Create personalized version</small>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Handle close
    const closeBtn = modal.querySelector('.download-modal-close');
    closeBtn.addEventListener('click', () => {
        closeDownloadModal(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeDownloadModal(modal);
        }
    });
    
    // Handle download options
    const optionBtns = modal.querySelectorAll('.download-option-btn');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');
            handleDownload(type);
            closeDownloadModal(modal);
        });
    });
}

// Close download modal
function closeDownloadModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

// Handle different download types
function handleDownload(type) {
    switch(type) {
        case 'pdf':
            downloadPDF();
            break;
        case 'html':
            viewHTMLCV();
            break;
        case 'generate':
            generateCustomCV();
            break;
    }
}

// Download PDF (if exists)
function downloadPDF() {
    const link = document.createElement('a');
    link.href = 'cv.pdf';
    link.download = 'Your_Name_CV.pdf';
    
    // Add download animation
    showDownloadAnimation();
    
    // Check if file exists
    fetch('cv.pdf')
        .then(response => {
            if (response.ok) {
                link.click();
                showDownloadMessage('PDF downloaded successfully!');
            } else {
                showDownloadMessage('PDF not found. Please use HTML version.', 'error');
            }
        })
        .catch(() => {
            showDownloadMessage('PDF not available. Opening HTML version...', 'warning');
            setTimeout(() => viewHTMLCV(), 1000);
        });
    
    trackDownload('pdf');
}

// View HTML CV
function viewHTMLCV() {
    window.open('cv-template.html', '_blank');
    showDownloadMessage('CV opened in new tab!');
    trackDownload('html');
}

// Generate custom CV
function generateCustomCV() {
    const cvData = {
        name: 'Your Full Name',
        title: 'Full Stack Developer & UI/UX Designer',
        email: 'your.email@example.com',
        phone: '+62 123 456 7890',
        website: 'yourportfolio.com',
        location: 'Jakarta, Indonesia'
    };
    
    const cvHTML = generateCVHTML(cvData);
    
    // Create and download HTML file
    const blob = new Blob([cvHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'My_CV.html';
    link.click();
    
    URL.revokeObjectURL(url);
    showDownloadMessage('Custom CV generated and downloaded!');
    trackDownload('generated');
}

// Generate CV HTML
function generateCVHTML(data) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name} - CV</title>
    <style>
        /* Include the CV styles here */
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .cv-container { max-width: 800px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #6366f1; padding-bottom: 20px; }
        .name { font-size: 2.5rem; color: #6366f1; margin-bottom: 10px; }
        .title { font-size: 1.2rem; color: #666; margin-bottom: 15px; }
        .contact-info { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
    </style>
</head>
<body>
    <div class="cv-container">
        <div class="header">
            <h1 class="name">${data.name}</h1>
            <p class="title">${data.title}</p>
            <div class="contact-info">
                <span>📧 ${data.email}</span>
                <span>📱 ${data.phone}</span>
                <span>🌐 ${data.website}</span>
                <span>📍 ${data.location}</span>
            </div>
        </div>
        <p><strong>Note:</strong> This is a basic CV template. Please customize with your actual information and experience.</p>
    </div>
</body>
</html>`;
}

// Show download animation
function showDownloadAnimation() {
    const downloadBtn = document.getElementById('download-cv');
    if (downloadBtn) {
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        downloadBtn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.style.pointerEvents = 'auto';
        }, 2000);
    }
}

// Show download success message
function showDownloadMessage(message = 'CV download started!', type = 'success') {
    // Create and show a toast notification
    const toast = document.createElement('div');
    toast.className = `download-toast ${type}`;
    
    const icon = type === 'error' ? 'fa-exclamation-circle' : 
                 type === 'warning' ? 'fa-exclamation-triangle' : 'fa-check-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide and remove toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Track download for analytics (optional)
function trackDownload(type = 'general') {
    console.log(`CV downloaded (${type}) at:`, new Date().toISOString());
    // You can add Google Analytics or other tracking here
    // gtag('event', 'download', { 'event_category': 'CV', 'event_label': type });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Ensure hero content is visible
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element) => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
});

// Add some initial styling for loading animation
const style = document.createElement('style');
style.textContent = `
    .hero-content > * {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.6s ease;
    }
`;
document.head.appendChild(style);

// Icon Navbar Active State
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    
    // Handle nav item clicks
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active state on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // View All Projects Functionality
    const viewAllProjectsBtn = document.getElementById('view-all-projects');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    let projectsVisible = false;
    
    if (viewAllProjectsBtn) {
        viewAllProjectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (!projectsVisible) {
                // Show hidden projects with stagger animation
                hiddenProjects.forEach((project, index) => {
                    setTimeout(() => {
                        project.classList.add('show');
                    }, index * 150); // Stagger animation
                });
                
                // Update button text
                viewAllProjectsBtn.innerHTML = `
                    <span>Show Less</span>
                    <i class="fas fa-arrow-up"></i>
                `;
                
                projectsVisible = true;
                
                // Smooth scroll to show new projects
                setTimeout(() => {
                    const firstHiddenProject = document.querySelector('.hidden-project.show');
                    if (firstHiddenProject) {
                        firstHiddenProject.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }, 500);
                
            } else {
                // Hide projects
                hiddenProjects.forEach(project => {
                    project.classList.remove('show');
                });
                
                // Update button text
                viewAllProjectsBtn.innerHTML = `
                    <span>View All Projects</span>
                    <i class="fas fa-arrow-right"></i>
                `;
                
                projectsVisible = false;
                
                // Scroll back to projects section
                document.getElementById('projects').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});


