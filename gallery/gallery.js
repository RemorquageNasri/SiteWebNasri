document.addEventListener("DOMContentLoaded", () => {
    // Gallery data with categories
    const galleryItems = [
      
      
    ].filter(item => item.src && item.src.trim() !== "");
  
    // Category labels
    const categoryLabels = {
      all: "Tous les Services",
      "vehicules-volumineux": "Transport de Véhicules Volumineux",
      remorquage: "SOS Remorquage",
      "materiel-agricole": "Transport de Matériel Agricole",
      "conteneurs-cabines": "Transport de Conteneurs et Cabines",
      "vehicules-retractables": "Transport de Véhicules Rétractables",
    }
  
    // DOM elements
    const galleryGrid = document.getElementById("galleryGrid")
    const masonryGrid = document.getElementById("masonryGrid")
    const emptyState = document.getElementById("emptyState")
    const filterButtons = document.querySelectorAll(".filter-btn")
    const mobileFilterBtn = document.querySelector(".mobile-filter-btn")
    const mobileFilterDropdown = document.getElementById("mobileFilterDropdown")
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const backToTopBtn = document.querySelector(".back-to-top")
    const gridLayoutBtn = document.querySelector(".grid-layout")
    const masonryLayoutBtn = document.querySelector(".masonry-layout")
    const lightbox = document.getElementById("imageLightbox")
    const lightboxImage = document.getElementById("lightboxImage")
    const lightboxCaption = document.getElementById("lightboxCaption")
    const lightboxClose = document.getElementById("lightboxClose")
    const lightboxPrev = document.getElementById("lightboxPrev")
    const lightboxNext = document.getElementById("lightboxNext")
  
    // Current layout and lightbox state
    let currentLayout = "grid"
    let currentLightboxIndex = 0
    let filteredItems = [...galleryItems]
  
    // Initialize gallery
    function initGallery() {
      // Populate gallery with items
      galleryItems.forEach((item) => {
        const galleryItem = createGalleryItem(item)
        galleryGrid.appendChild(galleryItem)
  
        const masonryItem = createMasonryItem(item)
        masonryGrid.appendChild(masonryItem)
      })
  
      // Set up event listeners
      setupEventListeners()
  
      // Initialize masonry layout
      initMasonry()
  
      // Initialize lazy loading
      initLazyLoading()
    }
  
    // Create gallery item element
    function createGalleryItem(item) {
      const galleryItem = document.createElement("div")
      galleryItem.className = "gallery-item"
      galleryItem.dataset.category = item.category
      galleryItem.dataset.id = item.id
  
      galleryItem.innerHTML = `
              <div class="image-container">
                  <img src="${item.src}" alt="${item.alt}" loading="lazy" onerror="this.src='https://placehold.co/800x600/e63946/FFFFFF?text=NA_SERVICE'">
                  <div class="image-overlay">
                      <span class="category-badge badge-${item.category}">${categoryLabels[item.category]}</span>
                  </div>
              </div>
              <div class="item-content">
                  <h3 class="item-title">${item.title}</h3>
                  <p class="item-description">Cliquez pour agrandir l'image</p>
              </div>
          `
  
      galleryItem.addEventListener("click", () => {
        openLightbox(item.id)
      })
  
      return galleryItem
    }
  
    // Create masonry item element
    function createMasonryItem(item) {
      const masonryItem = document.createElement("div")
      masonryItem.className = "masonry-item"
      masonryItem.dataset.category = item.category
      masonryItem.dataset.id = item.id
  
      // Random span between 20 and 40 for varied heights
      const span = Math.floor(Math.random() * 20) + 20
      masonryItem.style.setProperty("--span", span)
  
      masonryItem.innerHTML = `
              <div class="masonry-image-container">
                  <img src="${item.src}" alt="${item.alt}" loading="lazy" onerror="this.src='https://placehold.co/800x600/e63946/FFFFFF?text=NA_SERVICE'">
                  <div class="image-overlay">
                      <span class="category-badge badge-${item.category}">${categoryLabels[item.category]}</span>
                  </div>
              </div>
              <div class="item-content">
                  <h3 class="item-title">${item.title}</h3>
              </div>
          `
  
      masonryItem.addEventListener("click", () => {
        openLightbox(item.id)
      })
  
      return masonryItem
    }
  
    // Initialize masonry layout
    function initMasonry() {
      const masonryItems = document.querySelectorAll(".masonry-item")
      masonryItems.forEach((item) => {
        const img = item.querySelector("img")
        img.onload = () => {
          const height = img.naturalHeight
          const span = Math.ceil(height / 10) + 10 // 10px is the grid-auto-rows value
          item.style.setProperty("--span", span)
        }
      })
    }
  
    // Initialize lazy loading
    function initLazyLoading() {
      if ("IntersectionObserver" in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]')
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target
              img.src = img.src // Trigger load
              imageObserver.unobserve(img)
            }
          })
        })
  
        lazyImages.forEach((img) => {
          imageObserver.observe(img)
        })
      }
    }
  
    // Open lightbox
    function openLightbox(id) {
      const item = galleryItems.find((item) => item.id === Number.parseInt(id))
      if (!item) return
  
      currentLightboxIndex = filteredItems.findIndex((i) => i.id === Number.parseInt(id))
  
      lightboxImage.src = item.src
      lightboxImage.alt = item.alt
      lightboxCaption.textContent = item.title
  
      lightbox.classList.add("active")
      document.body.style.overflow = "hidden" // Prevent scrolling
    }
  
    // Close lightbox
    function closeLightbox() {
      lightbox.classList.remove("active")
      document.body.style.overflow = "" // Restore scrolling
    }
  
    // Navigate to previous image
    function prevImage() {
      if (currentLightboxIndex > 0) {
        currentLightboxIndex--
      } else {
        currentLightboxIndex = filteredItems.length - 1
      }
  
      const item = filteredItems[currentLightboxIndex]
      lightboxImage.src = item.src
      lightboxImage.alt = item.alt
      lightboxCaption.textContent = item.title
    }
  
    // Navigate to next image
    function nextImage() {
      if (currentLightboxIndex < filteredItems.length - 1) {
        currentLightboxIndex++
      } else {
        currentLightboxIndex = 0
      }
  
      const item = filteredItems[currentLightboxIndex]
      lightboxImage.src = item.src
      lightboxImage.alt = item.alt
      lightboxCaption.textContent = item.title
    }
  
    // Switch layout
    function switchLayout(layout) {
      if (layout === "grid") {
        galleryGrid.style.display = "grid"
        masonryGrid.style.display = "none"
        gridLayoutBtn.classList.add("active")
        masonryLayoutBtn.classList.remove("active")
        currentLayout = "grid"
      } else if (layout === "masonry") {
        galleryGrid.style.display = "none"
        masonryGrid.style.display = "grid"
        gridLayoutBtn.classList.remove("active")
        masonryLayoutBtn.classList.add("active")
        currentLayout = "masonry"
      }
    }
  
    // Set up event listeners
    function setupEventListeners() {
      // Filter button click events
      filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const category = this.dataset.category
          filterGallery(category)
  
          // Update active button state
          filterButtons.forEach((btn) => btn.classList.remove("active"))
          document.querySelectorAll(`[data-category="${category}"]`).forEach((btn) => {
            btn.classList.add("active")
          })
  
          // Update mobile filter button text
          document.querySelector(".mobile-filter-btn span").textContent = `Filtrer par: ${categoryLabels[category]}`
  
          // Hide mobile dropdown after selection
          mobileFilterDropdown.classList.remove("show")
        })
      })
  
      // Mobile filter dropdown toggle
      mobileFilterBtn.addEventListener("click", () => {
        mobileFilterDropdown.classList.toggle("show")
      })
  
      // Close dropdown when clicking outside
      document.addEventListener("click", (event) => {
        if (!event.target.closest(".mobile-filter")) {
          mobileFilterDropdown.classList.remove("show")
        }
      })
  
      // Mobile menu toggle
      mobileMenuBtn.addEventListener("click", function () {
        this.classList.toggle("active")
        document.querySelector(".main-nav").classList.toggle("show")
      })
  
      // Back to top button
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          backToTopBtn.classList.add("show")
        } else {
          backToTopBtn.classList.remove("show")
        }
      })
  
      backToTopBtn.addEventListener("click", (e) => {
        e.preventDefault()
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
  
      // Layout toggle
      gridLayoutBtn.addEventListener("click", () => {
        switchLayout("grid")
      })
  
      masonryLayoutBtn.addEventListener("click", () => {
        switchLayout("masonry")
      })
  
      // Lightbox controls
      lightboxClose.addEventListener("click", closeLightbox)
      lightboxPrev.addEventListener("click", prevImage)
      lightboxNext.addEventListener("click", nextImage)
  
      // Close lightbox with escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeLightbox()
        } else if (e.key === "ArrowLeft") {
          prevImage()
        } else if (e.key === "ArrowRight") {
          nextImage()
        }
      })
  
      // Close lightbox when clicking outside the image
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          closeLightbox()
        }
      })
    }
  
    // Filter gallery items
    function filterGallery(category) {
      const items = document.querySelectorAll(".gallery-item, .masonry-item")
      let visibleCount = 0
  
      // Update filtered items array for lightbox navigation
      if (category === "all") {
        filteredItems = [...galleryItems]
      } else {
        filteredItems = galleryItems.filter((item) => item.category === category)
      }
  
      items.forEach((item) => {
        if (category === "all" || item.dataset.category === category) {
          item.classList.remove("hidden")
          setTimeout(() => {
            item.classList.add("animate-in")
          }, 50)
          visibleCount++
        } else {
          item.classList.remove("animate-in")
          item.classList.add("animate-out")
  
          setTimeout(() => {
            item.classList.add("hidden")
            item.classList.remove("animate-out")
          }, 500)
        }
      })
  
      // Show/hide empty state
      if (visibleCount === 0) {
        emptyState.style.display = "block"
      } else {
        emptyState.style.display = "none"
      }
    }
  
    // Initialize the gallery
    initGallery()
  
    // Add fallback for images that fail to load
    document.querySelectorAll(".gallery-item img, .masonry-item img").forEach((img) => {
      img.addEventListener("error", function () {
        this.src = "https://placehold.co/800x600/e63946/FFFFFF?text=NA_SERVICE"
      })
    })
  
    // Add animation to stats numbers
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateValue(entry.target, 0, Number.parseInt(entry.target.textContent), 2000)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )
  
    document.querySelectorAll(".stat-number").forEach((stat) => {
      if (!stat.textContent.includes("/")) {
        observer.observe(stat)
        stat.textContent = "0"
      }
    })
  
    function animateValue(element, start, end, duration) {
      let startTimestamp = null
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        element.textContent = Math.floor(progress * (end - start) + start)
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }
  
    // Navbar scroll effect
    const siteHeader = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    });
  })

