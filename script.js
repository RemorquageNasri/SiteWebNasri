// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Variables
  const loader = document.querySelector(".loader-container")
  const header = document.querySelector(".header")
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuLinks = document.querySelectorAll(".mobile-nav-link")
  const backToTopBtn = document.querySelector(".back-to-top")
  const navLinks = document.querySelectorAll(".nav-link")
  const animatedElements = document.querySelectorAll(".animate-on-scroll")
  const testimonials = document.querySelectorAll(".testimonial")
  const prevBtn = document.querySelectorAll(".prev-btn")
  const nextBtn = document.querySelectorAll(".next-btn")
  const dots = document.querySelectorAll(".dot")
  const contactForm = document.getElementById("contactForm")
  const formSuccess = document.getElementById("formSuccess")
  const statNumbers = document.querySelectorAll(".stat-number")
  const faqItems = document.querySelectorAll(".faq-item")
  const fleetItems = document.querySelectorAll(".fleet-item")
  const fleetDots = document.querySelectorAll(".fleet-dots .dot")
  const callBtn = document.querySelector(".call-btn")
  const facebookBtn = document.querySelector(".facebook-btn")

  // Nouvelles variables pour les sections ajoutées
  const galleryItems = document.querySelectorAll(".gallery-item")
  const videoCards = document.querySelectorAll(".video-card")
  const statsNumbers = document.querySelectorAll(".stats-number")
  const newsletterForm = document.querySelector(".newsletter-form")
  const blogCards = document.querySelectorAll(".blog-card")

  let currentTestimonial = 0
  let currentFleetItem = 0
  let isAnimating = false
  let statsAnimated = false
  let statsNumbersAnimated = false

  // Initialize AOS animation library
  let AOS // Declare AOS variable
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      mirror: true,
      offset: 50,
      delay: 100,
      anchorPlacement: "top-bottom",
    })
  } else {
    console.warn("AOS is not defined. Make sure to include the AOS library.")
  }

  // Hide loader after page is loaded
  window.addEventListener("load", () => {
    // Simuler un chargement plus long pour montrer l'animation du loader
    setTimeout(() => {
      loader.style.opacity = "0"
      setTimeout(() => {
        loader.style.display = "none"
        document.body.classList.add("loaded")

        // Animer les éléments du hero après le chargement
        animateHeroElements()

        // Démarrer les animations flottantes
        startFloatingAnimations()
      }, 500)
    }, 1500)
  })

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

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", function () {
    this.classList.toggle("active")
    mobileMenu.classList.toggle("active")

    if (this.classList.contains("active")) {
      this.children[0].style.transform = "rotate(45deg) translate(5px, 5px)"
      this.children[1].style.opacity = "0"
      this.children[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
    } else {
      this.children[0].style.transform = "none"
      this.children[1].style.opacity = "1"
      this.children[2].style.transform = "none"
    }
  })

  // Close mobile menu when clicking on a link
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
      mobileMenuBtn.children[0].style.transform = "none"
      mobileMenuBtn.children[1].style.opacity = "1"
      mobileMenuBtn.children[2].style.transform = "none"
    })
  })

  // Change header style on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    // Afficher/masquer le bouton retour en haut
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("active")
    } else {
      backToTopBtn.classList.remove("active")
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

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = header.offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Fermer le menu mobile si ouvert
        if (mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active")
          mobileMenuBtn.classList.remove("active")
        }
      }
    })
  })

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

  // Fleet navigation
  document.querySelector(".fleet .prev-btn").addEventListener("click", () => {
    let prevIndex = currentFleetItem - 1
    if (prevIndex < 0) {
      prevIndex = fleetItems.length - 1
    }
    showFleetItem(prevIndex)
  })

  document.querySelector(".fleet .next-btn").addEventListener("click", () => {
    let nextIndex = currentFleetItem + 1
    if (nextIndex >= fleetItems.length) {
      nextIndex = 0
    }
    showFleetItem(nextIndex)
  })

  // Fleet dots
  fleetDots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const index = Number.parseInt(this.getAttribute("data-index"))
      showFleetItem(index)
    })
  })

  // Auto slide fleet items
  let fleetInterval = setInterval(() => {
    let nextIndex = currentFleetItem + 1
    if (nextIndex >= fleetItems.length) {
      nextIndex = 0
    }
    showFleetItem(nextIndex)
  }, 6000)

  // Pause auto slide on hover
  document.querySelector(".fleet-slider").addEventListener("mouseenter", () => {
    clearInterval(fleetInterval)
  })

  document.querySelector(".fleet-slider").addEventListener("mouseleave", () => {
    fleetInterval = setInterval(() => {
      let nextIndex = currentFleetItem + 1
      if (nextIndex >= fleetItems.length) {
        nextIndex = 0
      }
      showFleetItem(nextIndex)
    }, 6000)
  })

  // Testimonial slider
  function showTestimonial(index) {
    if (isAnimating) return
    isAnimating = true

    testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active")
    })

    const activeDots = document.querySelectorAll(".testimonial-dots .dot")
    activeDots.forEach((dot) => {
      dot.classList.remove("active")
    })

    testimonials[index].classList.add("active")
    activeDots[index].classList.add("active")

    currentTestimonial = index

    setTimeout(() => {
      isAnimating = false
    }, 500)
  }

  // Next testimonial
  document.querySelector(".testimonials .next-btn").addEventListener("click", () => {
    let nextIndex = currentTestimonial + 1
    if (nextIndex >= testimonials.length) {
      nextIndex = 0
    }
    showTestimonial(nextIndex)
  })

  // Previous testimonial
  document.querySelector(".testimonials .prev-btn").addEventListener("click", () => {
    let prevIndex = currentTestimonial - 1
    if (prevIndex < 0) {
      prevIndex = testimonials.length - 1
    }
    showTestimonial(prevIndex)
  })

  // Testimonial dots
  const testimonialDots = document.querySelectorAll(".testimonial-dots .dot")
  testimonialDots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const index = Number.parseInt(this.getAttribute("data-index"))
      showTestimonial(index)
    })
  })

  // Auto slide testimonials
  let testimonialInterval = setInterval(() => {
    let nextIndex = currentTestimonial + 1
    if (nextIndex >= testimonials.length) {
      nextIndex = 0
    }
    showTestimonial(nextIndex)
  }, 5000)

  // Pause auto slide on hover
  document.querySelector(".testimonial-slider").addEventListener("mouseenter", () => {
    clearInterval(testimonialInterval)
  })

  document.querySelector(".testimonial-slider").addEventListener("mouseleave", () => {
    testimonialInterval = setInterval(() => {
      let nextIndex = currentTestimonial + 1
      if (nextIndex >= testimonials.length) {
        nextIndex = 0
      }
      showTestimonial(nextIndex)
    }, 5000)
  })

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

  // Amélioration de l'animation du camion en mouvement
  function animateMovingTruck() {
    const trucks = document.querySelectorAll(".moving-truck")
    trucks.forEach((truck) => {
      truck.style.animation = "none"
      truck.offsetHeight // Trigger reflow
      truck.style.animation = "truck-move-right 15s linear infinite"
    })
  }

  // Animate moving truck
  function animateMovingTruck() {
    const trucks = document.querySelectorAll(".moving-truck")
    trucks.forEach((truck) => {
      truck.style.animation = "none"
      truck.offsetHeight // Trigger reflow
      truck.style.animation = "truck-move-right 15s linear infinite"
    })
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

  // Call the truck animation periodically
  setInterval(animateMovingTruck, 15000)

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

  // Animate call button pulse
  function pulseCallButton() {
    callBtn.classList.add("pulse")
    setTimeout(() => {
      callBtn.classList.remove("pulse")
    }, 1000)
  }

  // Pulse the call button periodically
  setInterval(pulseCallButton, 5000)

  // Add hover effect to service cards
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("hovered")
    })

    card.addEventListener("mouseleave", () => {
      card.classList.remove("hovered")
    })
  })

  // Add parallax effect to hero section
  window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero")
    const scrollPosition = window.scrollY

    if (scrollPosition < 600) {
      hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`
    }
  })


  // Ajouter une animation de comptage pour les statistiques
  function animateCounter(element, target, duration = 8000) {
    let start = 0
    const increment = target / (duration / 16)

    const timer = setInterval(() => {
      start += increment

      if (start >= target) {
        clearInterval(timer)
        start = target
      }

      element.textContent = Math.floor(start)
    }, 16)
  }

  // Ajouter un effet de zoom sur les images au survol
  const zoomableImages = document.querySelectorAll(".service-image img, .fleet-image img, .blog-image img")
  zoomableImages.forEach((img) => {
    img.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.05)"
    })

    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1)"
    })
  })


  // Initialize animations on page load
  animateOnScroll()

  // Show first testimonial and fleet item
  showTestimonial(0)
  showFleetItem(0)

  // Add CSS class to call button after delay
  setTimeout(() => {
    callBtn.classList.add("visible")
  }, 3000)

  // Add animation to truck silhouettes
  const truckSilhouettes = document.querySelectorAll(".truck-silhouette")
  truckSilhouettes.forEach((truck) => {
    setInterval(() => {
      truck.classList.add("bounce")
      setTimeout(() => {
        truck.classList.remove("bounce")
      }, 1000)
    }, 5000)
  })

  // Add 3D tilt effect to emergency cards
  const emergencyCards = document.querySelectorAll(".emergency-card")

  emergencyCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const angleX = (y - centerY) / 20
      const angleY = (centerX - x) / 20

      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
    })
  })

  // Ajouter une classe 'loaded' au body après le chargement
  document.body.classList.add("loaded")
})

// Add CSS class for animations
document.addEventListener("DOMContentLoaded", () => {
  // Ajouter des styles pour l'animation du curseur de typing
  const style = document.createElement("style")
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
    `
  document.head.appendChild(style)
})

