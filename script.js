/**
 * INDRA PORTFOLIO - INTERACTIVE JAVASCRIPT
 * =========================================
 * Features:
 * - Scroll reveal animations
 * - Counter animation
 * - Portfolio filtering
 * - Mobile navigation
 * - Navbar scroll effect
 * - Smooth scrolling
 * - Contact form handling
 * - Typing effect
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initLoader();
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initCounters();
    initPortfolioFilter();
    initSmoothScroll();
    initContactForm();
    initParallaxEffects();
});

/**
 * PAGE LOADER
 */
function initLoader() {
    // Add loader to DOM
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="font-space text-4xl font-bold text-white">
                <span class="text-ai-blue">&lt;</span>INDRA<span class="text-ai-yellow">/&gt;</span>
            </div>
            <div class="loader-bar"></div>
        </div>
    `;
    document.body.prepend(loader);
    
    // Hide loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    });
}

/**
 * NAVBAR SCROLL EFFECT
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when scrolled down
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll direction
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * MOBILE MENU TOGGLE
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = mobileMenu.querySelectorAll('a');
    
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        
        // Animate hamburger icon
        const icon = menuBtn.querySelector('svg');
        if (!mobileMenu.classList.contains('hidden')) {
            icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>`;
        } else {
            icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>`;
        }
    });
    
    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.querySelector('svg').innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>`;
        });
    });
}

/**
 * SCROLL REVEAL ANIMATIONS
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        reveals.forEach((element, index) => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                // Add staggered delay based on index
                setTimeout(() => {
                    element.classList.add('active');
                }, index * 50);
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

/**
 * COUNTER ANIMATION
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    let started = false;
    
    const startCounting = () => {
        if (started) return;
        
        const heroSection = document.getElementById('hero');
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        
        if (heroBottom < window.innerHeight) {
            started = true;
            
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.target);
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + (target > 10 ? '+' : '+');
                    }
                };
                
                updateCounter();
            });
        }
    };
    
    window.addEventListener('scroll', startCounting);
    startCounting(); // Check on load
}

/**
 * PORTFOLIO FILTER
 */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            portfolioItems.forEach((item, index) => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        item.classList.remove('hidden');
                        item.classList.add('show');
                        item.style.animation = `fadeInUp 0.5s ease forwards`;
                    }, index * 100);
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('show');
                }
            });
        });
    });
    
    // Initialize all items as visible
    portfolioItems.forEach(item => item.classList.add('show'));
}

/**
 * SMOOTH SCROLL
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * CONTACT FORM HANDLING
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
                
                // Reset border after 2 seconds
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            }
        });
        
        if (!isValid) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Show success message (in real app, send to server)
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;
        
        // Simulate sending
        setTimeout(() => {
            submitBtn.textContent = 'MESSAGE SENT!';
            submitBtn.style.backgroundColor = '#10B981';
            
            // Reset form
            form.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 2000);
            
            showNotification('Message sent successfully!', 'success');
        }, 1500);
    });
}

/**
 * NOTIFICATION HELPER
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification fixed bottom-8 right-8 px-6 py-4 z-50 font-space font-semibold transform translate-x-full transition-transform duration-300`;
    
    // Set colors based on type
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
    } else {
        notification.classList.add('bg-ai-blue', 'text-white');
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * PARALLAX EFFECTS
 */
function initParallaxEffects() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

/**
 * TYPING EFFECT (Optional - for hero text)
 */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/**
 * INTERSECTION OBSERVER FOR LAZY LOADING
 */
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * ACTIVE NAVIGATION LINK HIGHLIGHTER
 */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-ai-yellow');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-ai-yellow');
            }
        });
    });
}

// Initialize active nav highlight
document.addEventListener('DOMContentLoaded', initActiveNavHighlight);

/**
 * PORTFOLIO MODAL SYSTEM
 * =====================
 */

// Portfolio Project Data
const portfolioData = {
    'semantic-node': {
        title: 'Semantic Node Extraction',
        subtitle: 'Knowledge Graph Generator with AI',
        category: 'AI/ML',
        tech: ['Azure OpenAI', 'Neo4J', 'Node.js', 'Vue.js', 'GraphQL'],
        layout: 1,
        images: [
            'images/semantic node extraction.jpg',
            'images/semantic node extraction.jpg',
            'images/semantic node extraction.jpg'
        ],
        paragraph1: 'The Semantic Node Extraction system represents a groundbreaking approach to automated knowledge graph generation, leveraging Azure OpenAI\'s advanced language models to analyze and extract meaningful semantic relationships from unstructured text data. This sophisticated pipeline processes documents in real-time, identifying entities, concepts, and their interconnections with remarkable accuracy. Built on Neo4J\'s powerful graph database infrastructure, the system creates dynamic knowledge networks that enable complex querying and relationship discovery across vast datasets. The Vue.js frontend provides an intuitive visualization interface where users can explore the generated graphs, zoom into specific clusters, and discover hidden patterns within their data.',
        paragraph2: 'The technical architecture employs a multi-stage processing pipeline that begins with text preprocessing and entity recognition, followed by semantic embedding generation and relationship classification. Each extracted node is enriched with contextual metadata, making the resulting knowledge graphs not only comprehensive but also deeply searchable. Integration with existing enterprise systems is facilitated through a robust GraphQL API, enabling seamless data exchange and real-time synchronization. This project has been deployed in financial and research institutions, dramatically reducing the time required for document analysis and information synthesis from weeks to mere hours.'
    },
    'ar-webxr': {
        title: 'Augmented Reality WebXR',
        subtitle: 'Immersive Web-Based AR Experience',
        category: 'WEB',
        tech: ['WebXR', 'A-Frame', 'Three.js', 'OpenCV', 'TensorFlow.js'],
        layout: 2,
        images: [
            'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200',
            'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=600',
            'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600'
        ],
        paragraph1: 'This WebXR-powered augmented reality platform brings immersive 3D experiences directly to web browsers without requiring native application installation. Built using A-Frame and Three.js frameworks, the system renders complex 3D models and animations at 60fps while maintaining broad device compatibility across smartphones, tablets, and AR-enabled headsets. The integration of OpenCV enables real-time marker detection and surface tracking, allowing virtual objects to interact naturally with the physical environment. Users can experience product visualizations, educational simulations, and interactive storytelling through an intuitive touch-based interface.',
        paragraph2: 'The platform\'s architecture maximizes performance through progressive asset loading and level-of-detail optimization, ensuring smooth experiences even on mid-range mobile devices. TensorFlow.js integration adds intelligent features such as gesture recognition and scene understanding, enabling hands-free interaction and context-aware content placement. The modular design allows content creators to build and deploy AR experiences using a visual editor, dramatically lowering the technical barrier for AR content creation. This project has been adopted by educational institutions and e-commerce platforms, increasing user engagement by over 300% compared to traditional 2D interfaces.'
    },
    'traffic-light': {
        title: 'Traffic Light Detection',
        subtitle: 'Real-time Road Safety AI for Android',
        category: 'AI/ML',
        tech: ['YOLOv5', 'TensorFlow Lite', 'Android', 'OpenCV', 'Kotlin'],
        layout: 3,
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
            'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600',
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600'
        ],
        paragraph1: 'The Traffic Light Detection system is a mobile AI application designed to enhance road safety for visually impaired pedestrians and drivers in complex urban environments. Utilizing a custom-trained YOLOv5 model optimized for TensorFlow Lite deployment, the application achieves sub-100ms inference times on standard Android devices, providing real-time audio feedback about traffic signal states. The detection pipeline handles challenging scenarios including partial occlusion, varying weather conditions, and different traffic light designs found across Indonesian cities. Integration with Android accessibility services ensures seamless operation with screen readers and other assistive technologies.',
        paragraph2: 'The model training process involved collecting and annotating over 50,000 images from Indonesian intersections, capturing the unique characteristics of local traffic infrastructure. Data augmentation techniques including synthetic weather overlays and nighttime simulation expanded the effective training dataset to handle edge cases. The application features an intelligent alert system that considers vehicle speed, intersection proximity, and signal timing to provide timely and contextually appropriate notifications. Field testing with visually impaired users demonstrated a 95% satisfaction rate and significant improvement in independent mobility, leading to partnerships with disability advocacy organizations for wider deployment.'
    },
    'smart-home': {
        title: 'Smart Home IoT',
        subtitle: 'Complete Home Automation Ecosystem',
        category: 'IOT',
        tech: ['ESP8266', 'Vue.js', 'Node.js', 'Socket.io', 'ArangoDB'],
        layout: 4,
        images: [
            'https://images.unsplash.com/photo-1558002038-1055907df827?w=1200',
            'https://images.unsplash.com/photo-1585503418537-88331351ad99?w=600',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600'
        ],
        paragraph1: 'The Smart Home IoT platform delivers a comprehensive home automation ecosystem built on ESP8266 microcontrollers and a powerful Node.js backend infrastructure. This system seamlessly integrates lighting control, climate management, security monitoring, and energy consumption tracking into a unified dashboard accessible from any device. Real-time communication between devices and the central hub is achieved through Socket.io, enabling instant response times under 50ms for critical operations like motion-triggered lighting and security alerts. The Vue.js frontend presents an elegant, customizable interface where users can create automation routines, monitor sensor data, and control individual devices with intuitive touch gestures.',
        paragraph2: 'ArangoDB\'s multi-model database architecture stores device configurations, sensor time-series data, and user preferences in a unified structure, enabling powerful queries across heterogeneous data types. The system supports over 200 connected devices per installation with automatic device discovery and configuration through a custom IoT protocol. Energy management features provide detailed consumption analytics and machine learning-powered suggestions for reducing utility bills, with reported average savings of 30% for users. The modular hardware design allows DIY enthusiasts to integrate custom sensors while the open API enables third-party integrations with popular voice assistants and smart home platforms.'
    },
    'movie-recommendation': {
        title: 'Movie Recommendation System',
        subtitle: 'Personalized Entertainment Discovery',
        category: 'AI/ML',
        tech: ['Python', 'SVD Algorithm', 'Pandas', 'Flask', 'React'],
        layout: 5,
        images: [
            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200',
            'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600',
            'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=600'
        ],
        paragraph1: 'This Movie Recommendation System employs Singular Value Decomposition (SVD) matrix factorization to deliver highly accurate personalized movie suggestions based on user viewing history and preference patterns. The algorithm decomposes the user-movie interaction matrix into latent factors that capture underlying taste dimensions, enabling discovery of non-obvious connections between user preferences and film characteristics. Processing a database of over 100,000 movies and millions of ratings, the system generates recommendations in real-time with a mean absolute error below 0.75 stars. The Flask-powered API serves predictions to a React frontend that presents recommendations in an engaging, browseable format with rich movie metadata and trailer previews.',
        paragraph2: 'Beyond basic collaborative filtering, the system incorporates content-based features extracted from movie plots, genres, director filmographies, and cast networks to handle the cold-start problem for new users and movies. A sophisticated explanation engine generates human-readable justifications for each recommendation, building user trust and enabling preference refinement. The architecture supports A/B testing of recommendation strategies, with continuous monitoring of click-through rates and watch completion metrics. Deployed as a microservice, the system has processed over 5 million recommendation requests, with user studies showing 40% higher satisfaction compared to popularity-based suggestions.'
    },
    'bully-breaker': {
        title: 'BullyBreaker',
        subtitle: 'Child Safety Wearable Technology',
        category: 'IOT',
        tech: ['ESP32', 'TensorFlow Lite', 'Flutter', 'Firebase', 'Node.js'],
        layout: 6,
        images: [
            'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200',
            'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600',
            'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600'
        ],
        paragraph1: 'BullyBreaker is an innovative IoT wearable device designed to protect children from bullying by detecting aggressive behaviors and alerting parents and guardians in real-time. The compact device, disguised as a trendy bracelet or backpack charm, incorporates an array of sensors including accelerometer, microphone, and heart rate monitor to detect physical altercations, verbal aggression, and stress responses. An embedded TensorFlow Lite model processes sensor data locally to classify situations as normal, concerning, or emergency, with the ability to trigger immediate alerts when dangerous patterns are detected. The accompanying Flutter mobile application provides parents with location tracking, incident history, and direct communication channels with school administrators.',
        paragraph2: 'Privacy and security are foundational to BullyBreaker\'s design, with all audio processing performed on-device without cloud transmission, and location data encrypted with parent-controlled access policies. The system integrates with school safety protocols, enabling coordinated responses between parents, teachers, and counselors while maintaining appropriate confidentiality. Field trials in partnership with three elementary schools demonstrated a 60% reduction in reported bullying incidents within the first semester of deployment. The project received recognition from child welfare organizations and has been featured in educational technology conferences as a model for IoT applications in child safety.'
    },
    'gis-mapping': {
        title: 'GIS Village Mapping',
        subtitle: 'Comprehensive Geographic Information System',
        category: 'WEB',
        tech: ['Google Maps API', 'Docker', 'PostgreSQL', 'PostGIS', 'Vue.js'],
        layout: 1,
        images: [
            'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200',
            'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600',
            'https://images.unsplash.com/photo-1476973422084-e0fa66ff9456?w=600'
        ],
        paragraph1: 'The GIS Village Mapping system provides a comprehensive digital representation of rural settlements, enabling local governments to manage infrastructure, plan development projects, and coordinate disaster response with unprecedented precision. Built on PostgreSQL with PostGIS extensions, the platform stores and queries complex geospatial data including land parcels, road networks, utility infrastructure, and population demographics. The Google Maps API integration delivers familiar interactive maps with custom overlay layers for visualizing administrative boundaries, flood risk zones, and development plans. Village administrators can digitize paper records, update property information, and generate official documents directly from the mapping interface.',
        paragraph2: 'Containerized with Docker for reliable deployment across diverse government IT environments, the system has been rolled out to 336 villages in Southeast Sulawesi province. The architecture supports offline operation for areas with limited connectivity, with automatic synchronization when internet access is restored. Advanced analytics features enable population density analysis, accessibility scoring for public services, and optimization of resource allocation. The project has reduced administrative processing times for land-related requests by 70% and provided critical data for COVID-19 vaccination campaigns and natural disaster relief coordination, demonstrating the transformative potential of GIS technology in rural governance.'
    },
    'nth-load-balancing': {
        title: 'NTH Load Balancing',
        subtitle: 'Enterprise Network Optimization',
        category: 'IOT',
        tech: ['MikroTik', 'RouterOS', 'Dual ISP', 'Networking', 'Python'],
        layout: 2,
        images: [
            'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200',
            'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600'
        ],
        paragraph1: 'The NTH Load Balancing implementation provides enterprise-grade network reliability through intelligent distribution of traffic across multiple Internet Service Providers. Configured on MikroTik RouterOS hardware, the system employs the N-th algorithm to distribute connection requests proportionally based on link capacity, ensuring optimal bandwidth utilization while maintaining session persistence for applications requiring consistent routing. The setup includes automatic failover detection with sub-second switchover times, eliminating noticeable service interruption when primary links experience issues. A custom monitoring dashboard displays real-time throughput, latency measurements, and link health status for network administrators.',
        paragraph2: 'Beyond basic load distribution, the configuration implements Quality of Service policies that prioritize critical business applications and video conferencing traffic during peak periods. Python-based automation scripts enable dynamic rule adjustment based on time-of-day patterns and special event requirements. The system has been deployed across multiple corporate and educational networks, achieving 99.95% uptime and reducing per-user bandwidth costs by 40% through efficient ISP utilization. Documentation and training materials developed for this project have become reference resources for network engineers throughout the region, demonstrating best practices for multi-WAN configurations in bandwidth-constrained environments.'
    },
    'medicine-prediction': {
        title: 'Medicine Sales Prediction',
        subtitle: 'Pharmaceutical Inventory Intelligence',
        category: 'AI/ML',
        tech: ['Triple Exponential Smoothing', 'Python', 'Pandas', 'Plotly', 'FastAPI'],
        layout: 3,
        images: [
            'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200',
            'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600',
            'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600'
        ],
        paragraph1: 'This Medicine Sales Prediction system leverages Triple Exponential Smoothing (Holt-Winters method) to forecast pharmaceutical demand with exceptional accuracy, enabling healthcare facilities to optimize inventory levels while ensuring medication availability. The algorithm captures three critical components of sales patterns: baseline level, trend direction, and seasonal variations, making it particularly effective for medicines with cyclical demand tied to disease seasonality. Processing historical sales data spanning five years across hundreds of pharmaceutical products, the system generates weekly forecasts with mean absolute percentage error below 12%. The FastAPI backend serves predictions through a RESTful interface, integrating seamlessly with existing pharmacy management systems.',
        paragraph2: 'The Plotly-powered dashboard presents forecasts alongside actual sales in interactive visualizations, enabling pharmacists to understand model behavior and adjust predictions based on local knowledge such as upcoming health campaigns or disease outbreaks. Automated alerts notify inventory managers when predicted demand exceeds current stock levels, with configurable lead times accounting for supplier delivery schedules. Implementation at regional pharmacy chains has reduced stockout incidents by 55% while decreasing inventory holding costs through just-in-time ordering. The system\'s success has led to expansion into hospital pharmacy applications, where accurate forecasting of emergency medications has demonstrably improved patient care outcomes.'
    },
    'disaster-app': {
        title: 'Disaster Reporting App',
        subtitle: 'Community Emergency Response Platform',
        category: 'WEB',
        tech: ['React Native', 'Vue.js', 'Node.js', 'MongoDB', 'Firebase'],
        layout: 4,
        images: [
            'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200',
            'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600',
            'https://images.unsplash.com/photo-1504542982118-59308b40fe0c?w=600'
        ],
        paragraph1: 'The Disaster Reporting Application empowers communities to report and respond to emergencies through a streamlined mobile and web platform. Built with React Native for cross-platform mobile deployment and Vue.js for the administrative web portal, the system enables citizens to submit geo-tagged incident reports with photos, videos, and severity classifications. Firebase Cloud Messaging delivers instant push notifications to nearby users and emergency responders, while MongoDB stores the flexible report schema accommodating various disaster types from floods and earthquakes to traffic accidents and infrastructure failures. The intuitive interface guides users through the reporting process with context-sensitive prompts, ensuring complete and actionable information reaches authorities.',
        paragraph2: 'The administrative dashboard aggregates reports into real-time heat maps, enabling emergency coordinators to identify patterns, allocate resources efficiently, and track response progress. Automated severity scoring helps prioritize incoming reports, while verification workflows allow trusted community members and officials to validate report accuracy. Integration with government early warning systems adds authoritative alerts alongside crowdsourced reports, creating a comprehensive situational awareness platform. Deployed during the 2023 flood season in Southeast Sulawesi, the application processed over 3,000 incident reports and coordinated relief efforts for 15,000 affected residents, demonstrating the power of community-driven emergency response technology.'
    },
    'ecommerce-market': {
        title: 'E-commerce Traditional Market',
        subtitle: 'Bank Indonesia Digital Market Initiative',
        category: 'WEB',
        tech: ['Laravel', 'Vue.js', 'MySQL', 'Payment Gateway', 'Docker'],
        layout: 5,
        images: [
            'images/ecommerce pasar rakyat bank indonesia.jpg',
            'images/additionals/ecommerce_BI/IMG-20201107-WA0120.jpg.jpeg',
            'images/additionals/ecommerce_BI/IMG-20211008-WA0027.jpg.jpeg'
        ],
        galleryImages: [
            'images/additionals/ecommerce_BI/IMG-20201107-WA0120.jpg.jpeg',
            'images/additionals/ecommerce_BI/IMG-20201107-WA0122.jpg.jpeg',
            'images/additionals/ecommerce_BI/IMG-20201107-WA0124.jpg.jpeg',
            'images/additionals/ecommerce_BI/IMG-20211008-WA0027.jpg.jpeg',
            'images/additionals/ecommerce_BI/IMG-20211008-WA0028.jpg.jpeg',
            'images/additionals/ecommerce_BI/IMG-20211008-WA0031.jpg.jpeg',
            'images/additionals/ecommerce_BI/IMG-20211105-WA0023.jpg.jpeg',
            'images/additionals/ecommerce_BI/IMG-20211130-WA0017.jpg.jpeg'
        ],
        paragraph1: 'This E-commerce Platform for Traditional Markets represents a transformative Bank Indonesia initiative to digitize local market ecosystems, connecting traditional vendors with modern consumers through a mobile-first marketplace. Built on Laravel\'s robust PHP framework with a Vue.js reactive frontend, the platform enables market traders to create digital storefronts, list products with rich descriptions and photos, and accept electronic payments through integrated payment gateways. The system addresses unique challenges of traditional market commerce including variable pricing, bulk transactions, and cash-on-delivery preferences while introducing vendors to digital business practices. A dedicated onboarding program with simplified interfaces helps traders transition from purely cash-based operations.',
        paragraph2: 'The platform incorporates a sophisticated logistics layer coordinating same-day delivery from market vendors to consumers, with route optimization serving multiple orders efficiently. Financial literacy modules embedded within the app educate vendors on digital payment benefits, tax compliance, and business record-keeping, supporting Bank Indonesia\'s broader financial inclusion objectives. Analytics dashboards help market administrators understand trading patterns, identify growth opportunities, and measure the program\'s economic impact. Since launch, the platform has onboarded over 500 traditional market vendors, processing transactions worth billions of rupiah and creating a replicable model for market digitization across Indonesia.'
    },
    'village-web': {
        title: '336 Village Websites',
        subtitle: 'Rural Government Digital Transformation',
        category: 'WEB',
        tech: ['WordPress', 'PHP', 'MySQL', 'Docker', 'Nginx'],
        layout: 6,
        images: [
            'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=1200',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600',
            'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600'
        ],
        paragraph1: 'This ambitious digital transformation project delivered professional websites to 336 villages across Southeast Sulawesi province, establishing digital presence and e-governance capabilities for rural communities. Each WordPress-based site was customized with village-specific content including leadership profiles, administrative services, tourism attractions, and economic potentials. The containerized Docker architecture enables centralized management while allowing individual villages to maintain their unique identities. Comprehensive training programs equipped village administrators with content management skills, ensuring sustainable operation and regular updates. The standardized template ensures accessibility compliance and mobile responsiveness while permitting local customization.',
        paragraph2: 'Beyond basic information publishing, the websites integrate practical e-government services including online document requests, official announcement systems, and community feedback channels. A centralized analytics platform tracks visitor engagement across all 336 sites, identifying popular content and underserved information needs. The project has dramatically improved government transparency and citizen engagement, with document request processing times reduced from days to hours. Recognition from provincial and national government digitization initiatives has established this project as a model for rural e-governance, with delegations from other provinces visiting to study the implementation methodology and training approach.'
    },
    'moramo-waterfall': {
        title: 'Moramo Waterfall Tourism',
        subtitle: '#3 Most Beautiful Waterfall in Indonesia',
        category: 'WEB',
        tech: ['Next.js', 'Strapi CMS', 'PostgreSQL', 'Cloudinary', 'Vercel'],
        layout: 1,
        images: [
            'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=1200',
            'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=600',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600'
        ],
        paragraph1: 'The Moramo Waterfall Tourism platform showcases Indonesia\'s third most beautiful waterfall through an immersive digital experience designed to attract visitors and support local tourism economy. Built with Next.js for optimal performance and SEO, the website presents stunning imagery through Cloudinary\'s advanced image optimization, ensuring fast loading times without compromising visual impact. The Strapi headless CMS empowers tourism officials to update content, manage visitor information, and promote seasonal events without technical assistance. Interactive features include virtual tours, visitor testimonials, and detailed trail maps for the seven-tiered waterfall system that spans across 2 kilometers of pristine forest.',
        paragraph2: 'The platform integrates comprehensive visitor planning tools including accommodation listings, transportation guides, and local tour operator connections, creating a complete trip planning experience. Real-time visitor count displays help tourists avoid peak crowding, while weather forecasts assist in choosing optimal visit dates. E-ticketing functionality streamlines entrance fee collection and provides valuable visitation data for conservation planning. Since launch, the website has attracted over 500,000 unique visitors and contributed to a 40% increase in tourism revenue for surrounding communities. The project demonstrates how thoughtful digital tourism platforms can balance promotional objectives with sustainable tourism practices that protect natural heritage.'
    },
    'sso-statistical': {
        title: 'SSO Statistical Platform',
        subtitle: 'Single Sign-On Government Data Portal',
        category: 'WEB',
        tech: ['OAuth 2.0', 'Laravel', 'Vue.js', 'Redis', 'PostgreSQL'],
        layout: 2,
        images: [
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
            'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600'
        ],
        paragraph1: 'The SSO Statistical Platform provides a unified authentication gateway for accessing government statistical data across multiple agencies and departments. Implementing OAuth 2.0 standards on Laravel\'s robust backend, the system manages user identities, access permissions, and audit trails for sensitive statistical databases. Redis caching ensures sub-second authentication responses even during peak usage periods, while PostgreSQL stores comprehensive user profiles with role-based access controls. The Vue.js dashboard enables administrators to manage user provisioning, monitor access patterns, and generate compliance reports required for government data governance frameworks.',
        paragraph2: 'Beyond authentication, the platform aggregates statistical datasets from connected agencies into a searchable catalog, enabling researchers and policymakers to discover relevant data sources across organizational boundaries. Advanced visualization tools transform raw statistics into interactive charts and maps, making complex data accessible to non-technical users. API management features allow approved applications to access statistical data programmatically, fostering innovation while maintaining security controls. The platform serves over 5,000 registered users across provincial government agencies, processing 50,000+ authentication requests daily and providing the foundation for evidence-based policy making in Southeast Sulawesi.'
    },
    'simbada': {
        title: 'SIMBADA System',
        subtitle: 'Regional Asset Management Platform',
        category: 'WEB',
        tech: ['Laravel', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js'],
        layout: 3,
        images: [
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200',
            'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=600',
            'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600'
        ],
        paragraph1: 'SIMBADA (Sistem Informasi Manajemen Barang Daerah) is a comprehensive regional asset management platform developed to track, maintain, and report on government-owned assets across Southeast Sulawesi province. The Laravel-based system manages the complete asset lifecycle from procurement and registration through maintenance, transfers, and eventual disposal. Detailed asset profiles capture specifications, locations, custodians, condition assessments, and depreciation calculations in compliance with government accounting standards. Chart.js visualizations present asset distribution, value summaries, and maintenance schedules in executive dashboards for provincial leadership.',
        paragraph2: 'The system implements rigorous audit controls with complete change history, digital signatures, and approval workflows ensuring accountability in asset stewardship. Mobile-responsive design enables field officers to conduct physical inventory verification using smartphones, capturing photos and updating asset conditions in real-time. Integration with financial systems automates depreciation entries and generates required reports for annual audits. Managing over 100,000 registered assets with total value exceeding 2 trillion rupiah, SIMBADA has reduced asset discrepancies by 80% and provided the transparency needed for clean audit opinions from government financial auditors.'
    },
    'kredivo-bot': {
        title: 'Kredivo Bot System',
        subtitle: 'Intelligent Financial Service Automation',
        category: 'AI/ML',
        tech: ['Dialogflow', 'Node.js', 'NLP', 'REST API', 'MongoDB'],
        layout: 4,
        images: [
            'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200',
            'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600',
            'https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?w=600'
        ],
        paragraph1: 'The Kredivo Bot System delivers intelligent conversational interfaces for financial service automation, handling customer inquiries, loan applications, and account management through natural language interactions. Built on Google Dialogflow\'s NLP engine with custom Node.js fulfillment services, the bot understands Indonesian language nuances including colloquialisms and code-mixing common in financial conversations. Integration with Kredivo\'s core banking APIs enables the bot to perform secure transactions including payment scheduling, limit inquiries, and installment calculations in real-time. Context management maintains conversation state across multiple turns, creating natural dialogue flows that guide users through complex financial processes.',
        paragraph2: 'Advanced features include intent classification with 95% accuracy across 150+ customer request types, sentiment analysis for escalating frustrated customers to human agents, and proactive notification systems for payment reminders and promotional offers. The MongoDB backend stores conversation histories enabling continuous improvement through analysis of misunderstood intents and unsuccessful conversations. A/B testing framework allows rapid experimentation with response variations to optimize customer satisfaction scores. Processing over 100,000 conversations monthly, the bot has reduced customer service costs by 60% while maintaining satisfaction ratings above 4.5 stars, demonstrating that AI-powered automation can enhance rather than diminish customer experience quality.'
    },
    'yolov5-dashboard': {
        title: 'YOLOv5 Car Dashboard',
        subtitle: 'Real-time Vehicle Safety Intelligence',
        category: 'AI/ML',
        tech: ['YOLOv5', 'Python', 'OpenCV', 'TensorRT', 'Raspberry Pi'],
        layout: 5,
        images: [
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200',
            'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600',
            'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600'
        ],
        paragraph1: 'The YOLOv5 Car Dashboard system brings advanced computer vision capabilities to standard vehicles through an affordable Raspberry Pi-based device. The custom-trained YOLOv5 model detects vehicles, pedestrians, motorcycles, traffic signs, and road hazards in real-time video streams from a dashboard-mounted camera. TensorRT optimization achieves 30fps inference on the compact hardware, providing responsive alerts for collision risks, lane departure warnings, and speed limit notifications. The OpenCV-powered display overlays detection results on the live video feed, with audible warnings for time-critical hazards. The system transforms any vehicle into a smart safety assistant without the cost of factory-installed ADAS features.',
        paragraph2: 'The model training dataset emphasizes Indonesian road conditions, including recognition of local traffic signs, three-wheeled vehicles, and the complex traffic patterns characteristic of Southeast Asian roads. Continuous recording with automatic incident flagging creates dash-cam functionality with intelligent highlight extraction for insurance and safety analysis purposes. A companion mobile app provides trip statistics, safety scores, and driving behavior analytics to help users improve their driving habits. Field testing across 10,000 kilometers of Indonesian roads demonstrated hazard detection rates comparable to commercial ADAS systems at a fraction of the cost, making advanced safety technology accessible to the broader Indonesian driving public.'
    },
    'smart-city': {
        title: 'Smart City SPBE Master Plan',
        subtitle: 'Digital Government Transformation Roadmap',
        category: 'WEB',
        tech: ['Strategic Planning', 'Architecture Design', 'Integration Framework', 'Security Framework'],
        layout: 6,
        images: [
            'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=1200',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600'
        ],
        paragraph1: 'The Smart City SPBE (Sistem Pemerintahan Berbasis Elektronik) Master Plan provides a comprehensive five-year roadmap for digital government transformation in Southeast Sulawesi province. This strategic document defines the target architecture for integrated e-government services, data sharing protocols, and citizen-centric digital platforms aligned with Indonesia\'s national SPBE framework. The plan establishes governance structures including cross-agency coordination committees, data stewardship roles, and security management organizations essential for successful digital transformation. Detailed gap analysis identifies current system deficiencies and prioritizes investments in infrastructure, applications, and human capacity development.',
        paragraph2: 'The technical architecture section specifies enterprise integration patterns, API standards, and interoperability requirements enabling seamless data exchange across 50+ government agencies. Security and privacy frameworks address data classification, access controls, and incident response procedures compliant with national cybersecurity regulations. The implementation roadmap phases transformation initiatives across three horizons: foundation building, capability expansion, and optimization, with clear milestones and success metrics for each phase. Adopted as the official provincial digital government strategy, this master plan guides annual budgeting decisions and has attracted national recognition as a model for regional SPBE planning, with elements incorporated into guidance documents for other provinces.'
    },
    'text-analysis': {
        title: 'Internal Data Analytics',
        subtitle: 'LLM-Powered Document Intelligence System',
        category: 'AI/ML',
        tech: ['LangChain', 'Azure OpenAI', 'FastAPI', 'ChromaDB', 'Vue.js', 'Docker'],
        layout: 1,
        blurImages: [1, 2],
        images: [
            'images/text analysis platform 1.png',
            'images/text analysis platform 2.png',
            'images/text analysis platform 3.png'
        ],
        paragraph1: 'This internal data analytics platform represents a cutting-edge document intelligence system built to transform how the organization processes and extracts insights from vast amounts of unstructured text data. Leveraging LangChain\'s powerful orchestration capabilities combined with Azure OpenAI\'s advanced language models, the platform enables automated document summarization, entity extraction, sentiment analysis, and semantic search across enterprise documents. The system processes thousands of documents daily, including customer communications, financial reports, and regulatory documents, extracting actionable insights that previously required hours of manual review. ChromaDB serves as the vector database backbone, enabling lightning-fast semantic similarity searches across millions of embedded text chunks.',
        paragraph2: 'The FastAPI backend provides a robust and scalable API layer that handles concurrent requests from multiple internal applications, while the Vue.js frontend offers an intuitive interface for analysts to query documents, review extracted entities, and generate automated reports. The entire system is containerized with Docker for consistent deployment across development, staging, and production environments. Advanced features include multi-language support for Indonesian and English documents, automated classification pipelines, and integration with existing business intelligence tools. The platform has reduced document processing time by 80% and enabled new use cases in risk assessment, compliance monitoring, and customer insight generation that were previously impractical at scale.'
    },
    'dodo-hrops': {
        title: 'HR Operations Automation',
        subtitle: 'Intelligent HR Operations Automation',
        category: 'AI/ML',
        tech: ['Python', 'Azure OpenAI', 'Slack Bot', 'FastAPI', 'PostgreSQL', 'Redis'],
        layout: 2,
        images: [
            'images/dodo hr-ops 1.png',
            'images/dodo hr-ops 2.png',
            'images/dodo hr-ops 1.png'
        ],
        paragraph1: 'This HR operations automation platform is an intelligent system developed to streamline human resources operations through AI-powered conversational interfaces and automated workflow processing. The system integrates seamlessly with Slack, providing employees with instant access to HR services including leave requests, policy inquiries, benefits information, and onboarding assistance through natural language conversations. Powered by Azure OpenAI\'s GPT models, the system understands context and intent with remarkable accuracy, handling complex multi-turn conversations while maintaining appropriate confidentiality and escalation protocols. The platform has dramatically reduced the HR team\'s administrative burden while improving employee satisfaction through instant, 24/7 service availability.',
        paragraph2: 'The technical architecture features a FastAPI backend that orchestrates AI inference, business logic, and integrations with HRIS systems. PostgreSQL provides persistent storage for conversation histories, employee data, and analytics, while Redis enables high-performance caching for frequently accessed information. The system implements sophisticated intent classification across 100+ HR-related request types, with automatic routing to appropriate handlers or human agents when needed. Advanced features include multilingual support, sentiment monitoring for employee wellness insights, and automated compliance checks for leave and attendance policies. Since deployment, this platform has processed over 50,000 HR inquiries with a 92% resolution rate without human intervention, establishing a new standard for intelligent workplace automation.'
    },
    'koala': {
        title: 'LLM Gateway Platform',
        subtitle: 'LLM Gateway & Model Router Platform',
        category: 'AI/ML',
        tech: ['Python', 'LiteLLM', 'FastAPI', 'Redis', 'Prometheus', 'Kubernetes'],
        layout: 3,
        images: [
            'images/llm.jpg',
            'images/llm.jpg',
            'images/llm.jpg'
        ],
        paragraph1: 'This centralized LLM Gateway and Model Router platform provides a unified interface for all AI/ML applications to access various large language models across the organization. Built on LiteLLM\'s powerful abstraction layer, the platform enables seamless switching between different LLM providers including Azure OpenAI, Anthropic Claude, and open-source models without requiring application code changes. The platform implements intelligent load balancing, automatic failover, and cost optimization strategies that route requests to the most appropriate model based on task requirements, latency constraints, and budget considerations. This architectural approach has standardized AI development practices while reducing operational complexity and costs.',
        paragraph2: 'The FastAPI-powered gateway handles thousands of concurrent requests with sub-100ms routing overhead, while Redis provides high-speed caching for frequently used prompts and responses. Comprehensive observability through Prometheus metrics and custom dashboards enables real-time monitoring of model performance, cost tracking, and usage analytics across all consuming applications. Deployed on Kubernetes for horizontal scalability, the platform automatically adjusts capacity based on demand patterns. Advanced features include prompt templating, response validation, token usage optimization, and automated A/B testing of different model configurations. The platform has become the foundation for AI strategy, enabling rapid experimentation with new models while maintaining production stability and cost control across the organization\'s growing portfolio of AI-powered applications.'
    }
};

// Layout Templates for Magazine Style
function getLayoutTemplate(layoutNum, project) {
    const layouts = {
        1: `
            <div class="magazine-layout magazine-layout-1">
                <div class="magazine-hero-image" style="background-image: url('${project.images[0]}')">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                        <span class="inline-block px-4 py-2 bg-ai-yellow text-black font-bold text-sm mb-4">${project.category}</span>
                        <h1 class="text-4xl lg:text-6xl font-bold text-white font-space mb-4">${project.title}</h1>
                        <p class="text-xl text-gray-300">${project.subtitle}</p>
                    </div>
                </div>
                <div class="magazine-content bg-ai-dark">
                    <div class="max-w-xl">
                        <div class="flex flex-wrap gap-2 mb-8">
                            ${project.tech.map(t => `<span class="tech-pill border-ai-blue text-ai-blue">${t}</span>`).join('')}
                        </div>
                        <p class="text-gray-300 text-lg leading-relaxed mb-8 drop-cap drop-cap-blue">${project.paragraph1}</p>
                        <div class="gallery-grid gallery-grid-2 mb-8">
                            <div class="gallery-item"><img src="${project.images[1]}" alt="Project detail" class="rounded ${project.blurImages?.includes(1) ? 'blur-sm' : ''}"></div>
                            <div class="gallery-item"><img src="${project.images[2]}" alt="Project detail" class="rounded ${project.blurImages?.includes(2) ? 'blur-sm' : ''}"></div>
                        </div>
                        <p class="text-gray-300 text-lg leading-relaxed">${project.paragraph2}</p>
                    </div>
                </div>
            </div>
        `,
        2: `
            <div class="magazine-layout magazine-layout-2">
                <div class="magazine-content bg-ai-dark order-2 lg:order-1">
                    <div class="max-w-xl mx-auto lg:mx-0 lg:ml-auto">
                        <span class="inline-block px-4 py-2 bg-ai-blue text-white font-bold text-sm mb-4">${project.category}</span>
                        <h1 class="text-4xl lg:text-5xl font-bold text-white font-space mb-4">${project.title}</h1>
                        <p class="text-xl text-ai-yellow mb-8">${project.subtitle}</p>
                        <p class="text-gray-300 text-lg leading-relaxed mb-8 drop-cap drop-cap-yellow">${project.paragraph1}</p>
                        <div class="quote-block my-8 py-4">
                            <p class="text-xl text-white italic font-space">"Innovation through technology, impact through purpose."</p>
                        </div>
                        <p class="text-gray-300 text-lg leading-relaxed mb-8">${project.paragraph2}</p>
                        <div class="flex flex-wrap gap-2">
                            ${project.tech.map(t => `<span class="tech-pill border-ai-yellow text-ai-yellow">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="magazine-hero-image order-1 lg:order-2" style="background-image: url('${project.images[0]}')">
                    <div class="absolute inset-0 bg-gradient-to-l from-transparent via-black/30 to-black/60"></div>
                </div>
            </div>
        `,
        3: `
            <div class="min-h-screen bg-ai-dark">
                <div class="relative h-[60vh]" style="background-image: url('${project.images[0]}'); background-size: cover; background-position: center;">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-ai-dark"></div>
                </div>
                <div class="relative -mt-32 px-6 lg:px-12 pb-12">
                    <div class="max-w-4xl mx-auto">
                        <div class="bg-ai-gray p-8 lg:p-12 border-l-4 border-ai-yellow">
                            <span class="inline-block px-4 py-2 bg-ai-yellow text-black font-bold text-sm mb-4">${project.category}</span>
                            <h1 class="text-4xl lg:text-5xl font-bold text-white font-space mb-4">${project.title}</h1>
                            <p class="text-xl text-gray-400 mb-8">${project.subtitle}</p>
                            <div class="flex flex-wrap gap-2 mb-8">
                                ${project.tech.map(t => `<span class="tech-pill border-white/30 text-white">${t}</span>`).join('')}
                            </div>
                        </div>
                        <div class="grid lg:grid-cols-2 gap-8 mt-8">
                            <div>
                                <p class="text-gray-300 text-lg leading-relaxed drop-cap drop-cap-blue">${project.paragraph1}</p>
                            </div>
                            <div>
                                <p class="text-gray-300 text-lg leading-relaxed">${project.paragraph2}</p>
                            </div>
                        </div>
                        <div class="gallery-grid gallery-grid-2 mt-8">
                            <div class="gallery-item"><img src="${project.images[1]}" alt="Project detail" class="rounded"></div>
                            <div class="gallery-item"><img src="${project.images[2]}" alt="Project detail" class="rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        4: `
            <div class="min-h-screen bg-black">
                <div class="grid lg:grid-cols-3 min-h-screen">
                    <div class="lg:col-span-1 bg-ai-blue p-8 lg:p-12 flex flex-col justify-center">
                        <span class="inline-block px-4 py-2 bg-black text-white font-bold text-sm mb-4 w-fit">${project.category}</span>
                        <h1 class="text-3xl lg:text-4xl font-bold text-white font-space mb-4">${project.title}</h1>
                        <p class="text-lg text-white/80 mb-8">${project.subtitle}</p>
                        <div class="flex flex-wrap gap-2">
                            ${project.tech.map(t => `<span class="tech-pill border-white text-white text-xs">${t}</span>`).join('')}
                        </div>
                    </div>
                    <div class="lg:col-span-2 bg-ai-dark p-8 lg:p-12 flex flex-col justify-center">
                        <div class="grid md:grid-cols-2 gap-6 mb-8">
                            <div class="gallery-item rounded-lg overflow-hidden"><img src="${project.images[1]}" alt="Project detail"></div>
                            <div class="gallery-item rounded-lg overflow-hidden"><img src="${project.images[2]}" alt="Project detail"></div>
                        </div>
                        <p class="text-gray-300 text-lg leading-relaxed mb-6 drop-cap drop-cap-yellow">${project.paragraph1}</p>
                        <p class="text-gray-300 text-lg leading-relaxed">${project.paragraph2}</p>
                    </div>
                </div>
            </div>
        `,
        5: `
            <div class="min-h-screen bg-ai-dark">
                <div class="relative">
                    <div class="absolute top-0 left-0 w-1/2 h-full bg-ai-yellow hidden lg:block"></div>
                    <div class="relative grid lg:grid-cols-2 gap-0">
                        <div class="p-8 lg:p-16 flex flex-col justify-center bg-ai-yellow lg:bg-transparent">
                            <span class="inline-block px-4 py-2 bg-black text-white font-bold text-sm mb-4 w-fit">${project.category}</span>
                            <h1 class="text-4xl lg:text-5xl font-bold text-black font-space mb-4">${project.title}</h1>
                            <p class="text-xl text-black/70 mb-8">${project.subtitle}</p>
                            <p class="text-black/80 text-lg leading-relaxed">${project.paragraph1}</p>
                        </div>
                        <div class="relative">
                            <img src="${project.images[0]}" alt="${project.title}" class="w-full h-[50vh] lg:h-screen object-cover">
                        </div>
                    </div>
                </div>
                <div class="bg-ai-gray p-8 lg:p-16">
                    <div class="max-w-4xl mx-auto">
                        <div class="flex flex-wrap gap-2 mb-8">
                            ${project.tech.map(t => `<span class="tech-pill border-ai-blue text-ai-blue">${t}</span>`).join('')}
                        </div>
                        <p class="text-gray-300 text-lg leading-relaxed mb-8">${project.paragraph2}</p>
                        <div class="gallery-grid gallery-grid-2">
                            <div class="gallery-item rounded-lg overflow-hidden"><img src="${project.images[1]}" alt="Project detail"></div>
                            <div class="gallery-item rounded-lg overflow-hidden"><img src="${project.images[2]}" alt="Project detail"></div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        6: `
            <div class="min-h-screen bg-ai-dark">
                <div class="grid lg:grid-cols-2">
                    <div class="gallery-item h-[40vh] lg:h-[50vh]"><img src="${project.images[1]}" alt="Project detail"></div>
                    <div class="gallery-item h-[40vh] lg:h-[50vh]"><img src="${project.images[2]}" alt="Project detail"></div>
                </div>
                <div class="p-8 lg:p-16">
                    <div class="max-w-4xl mx-auto text-center">
                        <span class="inline-block px-4 py-2 bg-ai-yellow text-black font-bold text-sm mb-4">${project.category}</span>
                        <h1 class="text-4xl lg:text-6xl font-bold text-white font-space mb-4">${project.title}</h1>
                        <p class="text-xl text-gray-400 mb-8">${project.subtitle}</p>
                        <div class="flex flex-wrap justify-center gap-2 mb-12">
                            ${project.tech.map(t => `<span class="tech-pill border-ai-blue text-ai-blue">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="relative">
                    <img src="${project.images[0]}" alt="${project.title}" class="w-full h-[50vh] object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-ai-dark via-transparent to-transparent"></div>
                </div>
                <div class="p-8 lg:p-16 -mt-24 relative">
                    <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
                        <p class="text-gray-300 text-lg leading-relaxed drop-cap drop-cap-blue">${project.paragraph1}</p>
                        <p class="text-gray-300 text-lg leading-relaxed">${project.paragraph2}</p>
                    </div>
                </div>
            </div>
        `
    };
    return layouts[layoutNum] || layouts[1];
}

// Open Portfolio Modal
function openPortfolioModal(projectId) {
    const modal = document.getElementById('portfolio-modal');
    const content = document.getElementById('modal-content');
    const project = portfolioData[projectId];
    
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }
    
    // Generate content based on layout
    content.innerHTML = getLayoutTemplate(project.layout, project);
    
    // Show modal
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Disable body scroll
    document.body.style.overflow = 'hidden';
}

// Close Portfolio Modal
function closePortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    
    modal.classList.remove('active');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

// Initialize Portfolio Modal System
function initPortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    const closeBtn = document.getElementById('modal-close');
    const backdrop = modal?.querySelector('.modal-backdrop');
    
    if (!modal) return;
    
    // Close button click
    closeBtn?.addEventListener('click', closePortfolioModal);
    
    // Backdrop click
    backdrop?.addEventListener('click', closePortfolioModal);
    
    // Portfolio item clicks
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const projectId = item.dataset.project;
            if (projectId) {
                openPortfolioModal(projectId);
            }
        });
    });
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closePortfolioModal();
        }
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initPortfolioModal);

/**
 * KEYBOARD NAVIGATION SUPPORT
 */
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
});

/**
 * PREFERS REDUCED MOTION CHECK
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Disable animations if user prefers reduced motion
if (prefersReducedMotion()) {
    document.documentElement.style.setProperty('--animation-duration', '0s');
}

/**
 * DEBUG: Console welcome message
 */
console.log(
    '%c INDRA PORTFOLIO %c',
    'background: #0066FF; color: white; padding: 10px 20px; font-weight: bold; font-size: 16px;',
    ''
);
console.log(
    '%c Built with passion for AI and technology 🚀',
    'color: #FFD700; font-size: 14px;'
);
