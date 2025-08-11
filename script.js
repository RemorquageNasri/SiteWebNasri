// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log('DOM fully loaded, initializing scripts...');
  
  // Variables - add null checks and safe defaults
  const loader = document.querySelector(".loader-container");
  const header = document.querySelector(".header");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuLinks = document.querySelectorAll(".mobile-nav-link") || [];
  const backToTopBtn = document.querySelector(".back-to-top");
  const navLinks = document.querySelectorAll(".nav-link") || [];
  const animatedElements = document.querySelectorAll(".animate-on-scroll") || [];
  const testimonials = document.querySelectorAll(".testimonial") || [];
  const prevBtn = document.querySelectorAll(".prev-btn") || [];
  const nextBtn = document.querySelectorAll(".next-btn") || [];
  const dots = document.querySelectorAll(".dot") || [];
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  const statNumbers = document.querySelectorAll(".stat-number") || [];
  const faqItems = document.querySelectorAll(".faq-item") || [];
  const fleetItems = document.querySelectorAll(".fleet-item") || [];
  const fleetDots = document.querySelectorAll(".fleet-dots .dot") || [];
  const callBtn = document.querySelector(".call-btn");
  const facebookBtn = document.querySelector(".facebook-btn");
  
  // Only initialize testimonial functionality if testimonials exist on the page
  const hasTestimonials = testimonials && testimonials.length > 0;
  
  // Variables pour le slider
  let currentTestimonial = 0;
  let currentFleetItem = 0;
  let isAnimating = false;
  let statsAnimated = false;
  let statsNumbersAnimated = false;

  // Nouvelles variables pour les sections ajoutées
  const galleryItems = document.querySelectorAll(".gallery-item") || [];
  const videoCards = document.querySelectorAll(".video-card") || [];
  const statsNumbers = document.querySelectorAll(".stats-number") || [];
  const newsletterForm = document.querySelector(".newsletter-form");
  const blogCards = document.querySelectorAll(".blog-card") || [];

  // Initialize AOS animation library if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      offset: 50,
      delay: 100,
      anchorPlacement: "top-bottom"
    });
  }

  // Hide loader after page is loaded with safety checks
  window.addEventListener("load", () => {
    // Simuler un chargement plus long pour montrer l'animation du loader
    setTimeout(() => {
      try {
        if (loader && loader.style) {
          loader.style.opacity = "0";
        }
        
        setTimeout(() => {
          try {
            if (loader && loader.style) {
              loader.style.display = "none";
            }
            if (document && document.body && document.body.classList) {
              document.body.classList.add("loaded");
            }

            // Animer les éléments du hero après le chargement
            if (typeof animateHeroElements === 'function') {
              try {
                animateHeroElements();
              } catch (e) {
                console.error('Error in animateHeroElements:', e);
              }
            }

            // Démarrer les animations flottantes
            if (typeof startFloatingAnimations === 'function') {
              startFloatingAnimations();
            }

            // Animer les statistiques
            if (typeof animateStats === 'function') {
              animateStats();
            }

            // Animer les nombres de statistiques
            if (typeof animateStatsNumbers === 'function') {
              animateStatsNumbers();
            }

            // Animer le camion en mouvement
            if (typeof animateMovingTruck === 'function') {
              animateMovingTruck();
            }

            // Animer la section des témoignages
            if (testimonials && testimonials.length > 0) {
              showTestimonial(0);
            }

            // Animer la section de la flotte
            if (fleetItems && fleetItems.length > 0) {
              showFleetItem(0);
            }

            // Animer les éléments au défilement
            if (typeof animateOnScroll === 'function') {
              animateOnScroll();
            }

            // Appliquer l'effet de parallaxe
            if (typeof applyParallaxEffect === 'function') {
              applyParallaxEffect();
            }

            // Animer le bouton d'appel
            if (callBtn && typeof animateCallButton === 'function') {
              animateCallButton();
            }

            // Activer la navigation active au défilement
            if (navLinks && navLinks.length > 0) {
              window.addEventListener("scroll", () => {
                let current = "";
                const sections = document.querySelectorAll("section");
                const headerHeight = header ? header.offsetHeight : 0;

                sections.forEach((section) => {
                  const sectionTop = section.offsetTop - headerHeight - 100;
                  const sectionHeight = section.offsetHeight;

                  if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute("id") || "";
                  }
                });

                navLinks.forEach((link) => {
                  if (link && link.classList) {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${current}`) {
                      link.classList.add("active");
                    }
                  }
                });
              });
            }
          } catch (e) {
            console.error('Error in loader hide timeout:', e);
          }
        }, 500); // End of inner setTimeout
      } catch (e) {
        console.error('Error in loader fade out:', e);
      }
    }, 1500);
  });

  // Fonction pour démarrer les animations flottantes
  function startFloatingAnimations() {
    // Ajouter des animations flottantes à certains éléments
    const elementsToFloat = [
      document.querySelector(".hero-truck"),
      ...document.querySelectorAll(".emergency-icon"),
      ...document.querySelectorAll(".service-icon"),
      document.querySelector(".experience-badge"),
    ]

    elementsToFloat.forEach((element, index) => {
      if (element) {
        element.classList.add("floating")
        // Décaler légèrement les animations pour un effet plus naturel
        element.style.animationDelay = `${index * 0.2}s`
      }
    })

    // Ajouter des animations de pulsation lente
    const elementsToPulse = [
      ...document.querySelectorAll(".emergency-card"),
      ...document.querySelectorAll(".pricing-card.popular"),
      document.querySelector(".contact-cta"),
    ]

    elementsToPulse.forEach((element, index) => {
      if (element) {
        element.classList.add("pulse-slow")
        element.style.animationDelay = `${index * 0.3}s`
      }
    })

    // Ajouter des effets de brillance
    const elementsToShimmer = [
      ...document.querySelectorAll(".btn-primary"),
      ...document.querySelectorAll(".btn-secondary"),
      document.querySelector(".logo-text .highlight"),
    ]

    elementsToShimmer.forEach((element) => {
      if (element) {
        element.classList.add("shimmer")
      }
    })
  }

  // Animate hero elements with improved animations
  function animateHeroElements() {
    // Animate title words with a smooth 3D flip effect
    const titleWords = document.querySelectorAll(".hero h1 .word");
    if (titleWords.length > 0) {
      // Reset all words to initial state
      titleWords.forEach(word => {
        word.classList.remove('visible');
      });
      
      // Animate each word with a staggered delay
      setTimeout(() => {
        titleWords.forEach((word, index) => {
          setTimeout(() => {
            word.classList.add('visible');
          }, 150 * index); // Staggered delay between words
        });
      }, 300); // Slight delay before starting the animation
    }

    // Animate other elements (h2, p, buttons) with a nice fade-up effect
    const heroElements = document.querySelectorAll(".hero .animate-text:not(h1)");
    heroElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      
      // Start animation after the title animation is complete
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 1000 + (100 * index));
    });
  }

  // Mobile menu toggle with error handling and debugging
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function (e) {
      try {
        this.classList.toggle("active");
        mobileMenu.classList.toggle("active");

        if (this.classList.contains("active")) {
          if (this.children[0]) this.children[0].style.transform = "rotate(45deg) translate(5px, 5px)";
          if (this.children[1]) this.children[1].style.opacity = "0";
          if (this.children[2]) this.children[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
        } else {
          if (this.children[0]) this.children[0].style.transform = "none";
          if (this.children[1]) this.children[1].style.opacity = "1";
          if (this.children[2]) this.children[2].style.transform = "none";
        }
      } catch (error) {
        console.error("Error in mobile menu toggle:", error);
      }
    });
  } else {
    console.warn("Mobile menu elements not found or are null.");
  }

  // Close mobile menu when clicking on a link
  if (mobileMenuLinks && mobileMenuLinks.length > 0) {
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (mobileMenu) mobileMenu.classList.remove("active");
        if (mobileMenuBtn) {
          mobileMenuBtn.classList.remove("active");
          if (mobileMenuBtn.children[0]) mobileMenuBtn.children[0].style.transform = "none";
          if (mobileMenuBtn.children[1]) mobileMenuBtn.children[1].style.opacity = "1";
          if (mobileMenuBtn.children[2]) mobileMenuBtn.children[2].style.transform = "none";
        }
      });
    });
  } else {
    console.warn("No mobile menu links found.");
  }

  // Change header style on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    // Afficher/masquer le bouton retour en haut
    if (backToTopBtn) {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add("active")
      } else {
        backToTopBtn.classList.remove("active")
      }
    }

    // Animer les éléments au scroll
    animateOnScroll()

    // Animer les statistiques quand elles sont visibles
    animateStats()

    // Animer les statistiques de la nouvelle section
    animateStatsNumbers()

    // Animer le bouton d'appel au scroll
    animateCallButton()

    // Effet parallaxe pour certaines sections
    applyParallaxEffect()
  })

  // Effet parallaxe pour certaines sections
  function applyParallaxEffect() {
    const parallaxElements = [
      { element: document.querySelector(".hero"), speed: 0.4 },
      { element: document.querySelector(".about"), speed: 0.2 },
      { element: document.querySelector(".testimonials"), speed: 0.1 },
      { element: document.querySelector(".newsletter"), speed: 0.3 },
    ]

    parallaxElements.forEach((item) => {
      if (item.element) {
        const scrollPosition = window.scrollY
        const elementPosition = item.element.offsetTop
        const distance = scrollPosition - elementPosition

        if (Math.abs(distance) < window.innerHeight * 1.5) {
          const section = item.element
          const background = section.style
          background.backgroundPosition = `center ${distance * item.speed}px`
        }
      }
    })
  }

  // Animate call button
  function animateCallButton() {
    if (window.scrollY > 300) {
      callBtn.classList.add("visible")

      // Expansion périodique du bouton
      if (!callBtn.classList.contains("expanded") && !callBtn.expandTimeout) {
        callBtn.expandTimeout = setTimeout(() => {
          callBtn.classList.add("expanded")

          setTimeout(() => {
            callBtn.classList.remove("expanded")
            callBtn.expandTimeout = null
          }, 3000)
        }, 2000)
      }
    }
  }

  // Animation des statistiques de la nouvelle section
  function animateStatsNumbers() {
    if (statsNumbersAnimated) return

    const statsSection = document.querySelector(".stats-section")
    if (!statsSection) return

    const statsSectionPosition = statsSection.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (statsSectionPosition < windowHeight - 100) {
      statsNumbersAnimated = true

      statsNumbers.forEach((stat) => {
        const targetNumber = Number.parseInt(stat.getAttribute("data-count"))
        let currentNumber = 0
        const duration = 2000
        const increment = targetNumber / (duration / 16)

        const counter = setInterval(() => {
          currentNumber += increment

          if (currentNumber >= targetNumber) {
            currentNumber = targetNumber
            clearInterval(counter)
          }

          // Formater les grands nombres avec des séparateurs
          stat.textContent = formatNumber(Math.floor(currentNumber))
        }, 16)
      })
    }
  }

  // Formater les grands nombres avec des séparateurs
  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  // Gestion des vidéos témoignages
  videoCards.forEach((card) => {
    const thumbnail = card.querySelector(".video-thumbnail")
    const playButton = card.querySelector(".play-button")

    if (thumbnail && playButton) {
      thumbnail.addEventListener("click", () => {
        // Simuler l'ouverture d'une vidéo (dans un projet réel, cela ouvrirait une modal avec la vidéo)
        playButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'

        setTimeout(() => {
          alert("La vidéo s'ouvrirait ici dans un projet réel.")
          playButton.innerHTML = '<i class="fas fa-play"></i>'
        }, 1000)
      })
    }
  })

  // Gestion de la galerie
  galleryItems.forEach((item) => {
    const zoomButton = item.querySelector(".gallery-zoom")

    if (zoomButton) {
      zoomButton.addEventListener("click", (e) => {
        e.stopPropagation()

        // Simuler l'ouverture d'une lightbox (dans un projet réel, cela ouvrirait une lightbox)
        alert("La lightbox s'ouvrirait ici dans un projet réel.")
      })
    }

    item.addEventListener("click", () => {
      // Simuler l'ouverture d'une lightbox (dans un projet réel, cela ouvrirait une lightbox)
      alert("La lightbox s'ouvrirait ici dans un projet réel.")
    })
  })

  // Gestion du formulaire de newsletter
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const emailInput = newsletterForm.querySelector(".newsletter-input")
      const submitBtn = newsletterForm.querySelector(".newsletter-btn")

      if (emailInput && submitBtn) {
        const originalText = submitBtn.textContent
        submitBtn.textContent = "Envoi en cours..."
        submitBtn.disabled = true

        // Simuler l'envoi du formulaire
        setTimeout(() => {
          alert(`Merci de vous être inscrit avec l'email: ${emailInput.value}`)
          emailInput.value = ""
          submitBtn.textContent = originalText
          submitBtn.disabled = false
        }, 1500)
      }
    })
  }

  // Animation des cartes de blog
  blogCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("hovered")
    })

    card.addEventListener("mouseleave", () => {
      card.classList.remove("hovered")
    })
  })

  // Ajouter des attributs data-text aux titres de section pour l'effet de texte fantôme
  const sectionHeaders = document.querySelectorAll(".section-header h2")
  sectionHeaders.forEach((header) => {
    if (!header.getAttribute("data-text")) {
      header.setAttribute("data-text", header.textContent)
    }
  })

  // Smooth scrolling for anchor links with checks
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  if (anchorLinks.length > 0) {
    anchorLinks.forEach((anchor) => {
      if (anchor) {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href");
          if (targetId === "#") return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80, // Adjust for fixed header
              behavior: "smooth",
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 991) {
              const mobileMenu = document.querySelector(".mobile-menu");
              const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
              if (mobileMenu && mobileMenu.classList.contains("active")) {
                mobileMenu.classList.remove("active");
                if (mobileMenuBtn) mobileMenuBtn.classList.remove("active");
              }
            }
          }
        });
      }
    });
  }

  // Update active navigation link on page load with checks
  window.addEventListener("load", () => {
    // Handle page load with hash in URL
    const currentSection = window.location.hash;
    if (currentSection) {
      const targetElement = document.querySelector(currentSection);
      if (targetElement) {
        // Small delay to ensure all elements are rendered
        setTimeout(() => {
          window.scrollTo(0, 0);
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          });
        }, 100);
      }
    }
    
    // Call animateOnScroll after all resources are loaded
    if (typeof animateOnScroll === 'function') {
      animateOnScroll();
    }
    
    // Initialize AOS again in case it wasn't ready earlier
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  });

  // Active navigation link on scroll
  window.addEventListener("scroll", () => {
    let current = ""

    const sections = document.querySelectorAll("section")
    const headerHeight = header.offsetHeight

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100
      const sectionHeight = section.offsetHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // FAQ toggle
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    const answer = item.querySelector(".faq-answer")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Close all FAQ items
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active")
        const faqAnswer = faqItem.querySelector(".faq-answer")
        faqAnswer.style.maxHeight = "0"
      })

      // If the clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add("active")
        answer.style.maxHeight = answer.scrollHeight + "px"
      }
    })
  })

  // Fleet slider
  function showFleetItem(index) {
    if (isAnimating) return
    isAnimating = true

    fleetItems.forEach((item) => {
      item.classList.remove("active")
    })

    fleetDots.forEach((dot) => {
      dot.classList.remove("active")
    })

    fleetItems[index].classList.add("active")
    fleetDots[index].classList.add("active")

    currentFleetItem = index

    setTimeout(() => {
      isAnimating = false
    }, 500)
  }

  // Fleet navigation - with null checks
  const fleetPrevBtn = document.querySelector(".fleet .prev-btn");
  const fleetNextBtn = document.querySelector(".fleet .next-btn");
  
  if (fleetPrevBtn) {
    fleetPrevBtn.addEventListener("click", () => {
      let prevIndex = currentFleetItem - 1;
      if (prevIndex < 0) {
        prevIndex = fleetItems.length - 1;
      }
      showFleetItem(prevIndex);
    });
  }

  if (fleetNextBtn) {
    fleetNextBtn.addEventListener("click", () => {
      let nextIndex = currentFleetItem + 1;
      if (nextIndex >= fleetItems.length) {
        nextIndex = 0;
      }
      showFleetItem(nextIndex);
    });
  }

  // Fleet dots
  fleetDots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const index = Number.parseInt(this.getAttribute("data-index"))
      showFleetItem(index)
    })
  })

  // Auto slide fleet items - with checks
  let fleetInterval;
  const fleetSlider = document.querySelector(".fleet-slider");
  
  if (fleetItems.length > 0) {
    fleetInterval = setInterval(() => {
      let nextIndex = currentFleetItem + 1;
      if (nextIndex >= fleetItems.length) {
        nextIndex = 0;
      }
      showFleetItem(nextIndex);
    }, 6000);
  }

  // Pause auto slide on hover - with null check
  if (fleetSlider) {
    fleetSlider.addEventListener("mouseenter", () => {
      if (fleetInterval) clearInterval(fleetInterval);
    });

    fleetSlider.addEventListener("mouseleave", () => {
      if (fleetItems.length > 0) {
        fleetInterval = setInterval(() => {
          let nextIndex = currentFleetItem + 1;
          if (nextIndex >= fleetItems.length) {
            nextIndex = 0;
          }
          showFleetItem(nextIndex);
        }, 6000);
      }
    });
  }

  // Testimonial slider with null checks
  function showTestimonial(index) {
    if (isAnimating || !testimonials || !testimonials.length) return;
    isAnimating = true;

    // Safely remove active class from all testimonials
    if (testimonials && testimonials.length > 0) {
      testimonials.forEach((testimonial) => {
        if (testimonial && testimonial.classList) {
          testimonial.classList.remove("active");
        }
      });
    }

    // Update dots
    const activeDots = document.querySelectorAll(".testimonial-dots .dot");
    if (activeDots && activeDots.length > 0) {
      activeDots.forEach((dot) => {
        if (dot && dot.classList) {
          dot.classList.remove("active");
        }
      });
    }

    // Set new active testimonial and dot
    if (testimonials[index] && testimonials[index].classList) {
      testimonials[index].classList.add("active");
    }
    
    if (activeDots[index] && activeDots[index].classList) {
      activeDots[index].classList.add("active");
    }

    currentTestimonial = index;

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  // Next testimonial - with null checks
  const testimonialNextBtn = document.querySelector(".testimonials .next-btn");
  const testimonialPrevBtn = document.querySelector(".testimonials .prev-btn");
  
  if (testimonialNextBtn && testimonials.length > 0) {
    testimonialNextBtn.addEventListener("click", () => {
      let nextIndex = currentTestimonial + 1;
      if (nextIndex >= testimonials.length) {
        nextIndex = 0;
      }
      showTestimonial(nextIndex);
    });
  }

  // Previous testimonial - with null checks
  if (testimonialPrevBtn && testimonials.length > 0) {
    testimonialPrevBtn.addEventListener("click", () => {
      let prevIndex = currentTestimonial - 1;
      if (prevIndex < 0) {
        prevIndex = testimonials.length - 1;
      }
      showTestimonial(prevIndex);
    });
  }

  // Testimonial dots - with null check
  const testimonialDots = document.querySelectorAll(".testimonial-dots .dot");
  if (testimonialDots.length > 0) {
    testimonialDots.forEach((dot) => {
      dot.addEventListener("click", function () {
        const index = Number.parseInt(this.getAttribute("data-index"));
        if (!isNaN(index)) {
          showTestimonial(index);
        }
      });
    });
  }

  // Auto slide testimonials - with check
  let testimonialInterval;
  if (hasTestimonials) {
    testimonialInterval = setInterval(() => {
      if (testimonials.length > 0) {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonials.length) {
          nextIndex = 0;
        }
        showTestimonial(nextIndex);
      }
    }, 5000);
  }

  // Pause auto slide on hover - with null check
  const testimonialSlider = document.querySelector(".testimonial-slider");
  if (testimonialSlider && testimonialInterval) {
    testimonialSlider.addEventListener("mouseenter", () => {
      if (testimonialInterval) clearInterval(testimonialInterval);
    });

    testimonialSlider.addEventListener("mouseleave", () => {
      if (testimonials.length > 0) {
        testimonialInterval = setInterval(() => {
          let nextIndex = currentTestimonial + 1;
          if (nextIndex >= testimonials.length) {
            nextIndex = 0;
          }
          showTestimonial(nextIndex);
        }, 5000);
      }
    });
  }

  // Animate elements on scroll
  function animateOnScroll() {
    animatedElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        if (element.classList.contains("slide-up")) {
          element.classList.add("fade-in")
        } else if (element.classList.contains("slide-in-left")) {
          element.classList.add("fade-in")
        } else if (element.classList.contains("slide-in-right")) {
          element.classList.add("fade-in")
        } else if (element.classList.contains("zoom-in")) {
          element.classList.add("fade-in")
        } else {
          element.classList.add("fade-in")
        }
      }
    })
  }

  // Animate stats counter
  function animateStats() {
    if (statsAnimated) return

    const statsSection = document.querySelector(".stats-container")
    if (!statsSection) return

    const statsSectionPosition = statsSection.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (statsSectionPosition < windowHeight - 100) {
      statsAnimated = true

      statNumbers.forEach((stat) => {
        const targetNumber = Number.parseInt(stat.getAttribute("data-count"))
        let currentNumber = 0
        const duration = 2000
        const increment = targetNumber / (duration / 16)

        const counter = setInterval(() => {
          currentNumber += increment

          if (currentNumber >= targetNumber) {
            currentNumber = targetNumber
            clearInterval(counter)
          }

          stat.textContent = Math.floor(currentNumber)
        }, 16)
      })
    }
  }

  // Animation du camion en mouvement
  function animateMovingTruck() {
    const truck = document.querySelector(".moving-truck");
    if (truck) {
      truck.style.animation = "none";
      void truck.offsetWidth; // Trigger reflow
      truck.style.animation = "moveTruck 15s linear infinite";
    }
  }

  // Appliquer l'animation de pulsation périodiquement
  if (facebookBtn) {
    setInterval(pulseFacebookButton, 8000)
  }

  // Ajouter une animation de pulsation périodique pour le bouton Facebook
  function pulseFacebookButton() {
    if (facebookBtn) {
      facebookBtn.classList.add("pulse")
      setTimeout(() => {
        facebookBtn.classList.remove("pulse")
      }, 1000)
    }
  }

  // Call the truck animation periodically if the function exists
  if (typeof animateMovingTruck === 'function') {
    setInterval(animateMovingTruck, 15000);
  }

  // Form submission
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Ajouter un état de chargement au bouton
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...'
      submitBtn.disabled = true

      // Simuler la soumission du formulaire avec un délai plus réaliste
      setTimeout(() => {
        contactForm.style.display = "none"
        formSuccess.style.display = "block"

        // Réinitialiser le formulaire
        contactForm.reset()

        // Masquer le message de succès après 5 secondes
        setTimeout(() => {
          formSuccess.style.display = "none"
          contactForm.style.display = "block"
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
        }, 5000)
      }, 1500)
    })
  }

  // Add pulse animation to call button periodically with error handling
  function pulseCallButton() {
    try {
      if (!callBtn || !callBtn.classList) return;
      
      callBtn.classList.add("pulse");
      setTimeout(() => {
        try {
          if (callBtn && callBtn.classList) {
            callBtn.classList.remove("pulse");
          }
        } catch (e) {
          console.error('Error removing pulse class from call button:', e);
        }
      }, 1000);
    } catch (e) {
      console.error('Error in pulseCallButton:', e);
    }
  }

  // Pulse the call button periodically if call button exists
  if (callBtn) {
    setInterval(pulseCallButton, 5000);
  }

  // Ajouter un effet de zoom sur les images au survol avec vérifications
  const zoomableImages = document.querySelectorAll(".service-image img, .fleet-image img, .blog-image img");
  if (zoomableImages.length > 0) {
    zoomableImages.forEach((img) => {
      if (img) {
        img.addEventListener("mouseenter", () => {
          img.style.transform = "scale(1.05)";
          img.style.transition = "transform 0.3s ease-in-out";
        });

        img.addEventListener("mouseleave", () => {
          img.style.transform = "scale(1)";
        });
      }
    });
  };

  // Add hover effect to service cards - with null check
  const serviceCards = document.querySelectorAll(".service-card");
  if (serviceCards.length > 0) {
    serviceCards.forEach((card) => {
      if (card) {
        card.addEventListener("mouseenter", () => {
          card.classList.add("hovered");
        });

        card.addEventListener("mouseleave", () => {
          card.classList.remove("hovered");
        });
      }
    });
  }

  // Add parallax effect to hero section - with null check
  const hero = document.querySelector(".hero");
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 600) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
      }
    });
  }

  // Initialize animations on page load with checks
  if (typeof animateOnScroll === 'function') {
    animateOnScroll();
    
    // Add scroll and resize event listeners with debounce
    let scrollTimeout;
    window.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(animateOnScroll, 100);
    });
    
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(animateOnScroll, 100);
    });
  }

  // Initialize animations after page load
  function initializeAnimations() {
    // Show first testimonial and fleet item if they exist
    if (hasTestimonials) {
      showTestimonial(0);
    }
    
    if (fleetItems && fleetItems.length > 0) {
      showFleetItem(0);
    }

    // Add CSS class to call button after delay with safety check
    setTimeout(() => {
      try {
        if (callBtn && callBtn.classList) {
          callBtn.classList.add("visible");
        }
      } catch (e) {
        console.error('Error adding visible class to call button:', e);
      }
    }, 1000);

    // Add animation to truck silhouettes with null check
    const truckSilhouettes = document.querySelectorAll(".truck-silhouette");
    if (truckSilhouettes && truckSilhouettes.length > 0) {
      truckSilhouettes.forEach((truck) => {
        if (truck && truck.classList) {
          setInterval(() => {
            truck.classList.add("bounce");
            setTimeout(() => {
              if (truck && truck.classList) {
                truck.classList.remove("bounce");
              }
            }, 1000);
          }, 5000);
        }
      });
    }

    // Add 3D tilt effect to emergency cards with null check
    const emergencyCards = document.querySelectorAll(".emergency-card");
    
    if (emergencyCards && emergencyCards.length > 0) {
      emergencyCards.forEach((card) => {
        if (card && card.style) {
          card.addEventListener("mousemove", (e) => {
            try {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              const centerX = rect.width / 2;
              const centerY = rect.height / 2;

              const angleX = (y - centerY) / 20;
              const angleY = (centerX - x) / 20;

              card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
              card.style.transition = 'transform 0.1s ease-out';
            } catch (e) {
              console.error('Error in 3D tilt effect:', e);
            }
          });

          card.addEventListener("mouseleave", () => {
            try {
              card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
              card.style.transition = 'transform 0.5s ease-out';
            } catch (e) {
              console.error('Error resetting 3D tilt effect:', e);
            }
          });
        }
      });
    }
  }

  // Call the initialization function
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnimations);
  } else {
    initializeAnimations();
  }

  // Add 'loaded' class to body after loading with safety check
  if (document && document.body && document.body.classList) {
    try {
      document.body.classList.add("loaded");
    } catch (e) {
      console.error('Error adding loaded class to body:', e);
    }
  }

  // Add CSS class for animations
  const style = document.createElement("style");
  style.textContent = `
    @keyframes cursor-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    
    .typing-cursor {
      display: inline-block;
      width: 3px;
      height: 1em;
      background-color: currentColor;
      margin-left: 2px;
      animation: cursor-blink 1s infinite;
    }
  `;
  
  // Add styles to the head
  if (document.head) {
    try {
      document.head.appendChild(style);
    } catch (e) {
      console.error('Error adding styles to document head:', e);
    }
  }
});

