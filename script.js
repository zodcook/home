document.addEventListener("DOMContentLoaded", () => {
  // Splash Screen
  const splashScreen = document.getElementById("splash-screen")
  const skipSplash = document.getElementById("skip-splash")

  if (splashScreen && skipSplash) {
    skipSplash.addEventListener("click", hideSplashScreen)

    // Auto hide splash screen after 6 seconds
    setTimeout(hideSplashScreen, 6000)
  }

  function hideSplashScreen() {
    splashScreen.classList.add("hidden")
    setTimeout(() => {
      splashScreen.style.display = "none"
    }, 500)
  }

  // Mobile Menu
  const menuToggle = document.getElementById("menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")
  const mobileMenuClose = document.getElementById("mobile-menu-close")

  if (menuToggle && mobileMenu && mobileMenuClose) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.add("active")
    })

    mobileMenuClose.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
    })
  }

  // Search Box
  const searchToggle = document.getElementById("search-toggle")
  const searchBox = document.getElementById("search-box")
  const searchClose = document.querySelector(".search-close")

  if (searchToggle && searchBox && searchClose) {
    searchToggle.addEventListener("click", () => {
      searchBox.classList.add("active")
      searchBox.querySelector("input").focus()
    })

    searchClose.addEventListener("click", () => {
      searchBox.classList.remove("active")
    })
  }

  // Slider
  const slider = document.getElementById("main-slider")

  if (slider) {
    const slides = slider.querySelectorAll(".slide")
    const dots = slider.querySelectorAll(".slider-dot")
    const prevBtn = slider.querySelector(".slider-prev")
    const nextBtn = slider.querySelector(".slider-next")

    let currentSlide = 0
    const slideCount = slides.length

    // Initialize slider
    function showSlide(index) {
      // Hide all slides
      slides.forEach((slide) => {
        slide.classList.remove("active")
      })

      // Remove active class from all dots
      dots.forEach((dot) => {
        dot.classList.remove("active")
      })

      // Show current slide and activate dot
      slides[index].classList.add("active")
      dots[index].classList.add("active")

      // Reset animations
      const title = slides[index].querySelector(".slide-title")
      const description = slides[index].querySelector(".slide-description")
      const button = slides[index].querySelector(".order-button")

      if (title && description && button) {
        title.style.animation = "none"
        description.style.animation = "none"
        button.style.animation = "none"

        setTimeout(() => {
          title.style.animation = "slideInRight 0.5s ease forwards 0.2s"
          description.style.animation = "slideInRight 0.5s ease forwards 0.4s"
          button.style.animation = "fadeInUp 0.5s ease forwards 0.6s"
        }, 50)
      }
    }

    // Next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slideCount
      showSlide(currentSlide)
    }

    // Previous slide
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount
      showSlide(currentSlide)
    }

    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000)

    // Reset interval when manually changing slides
    function resetInterval() {
      clearInterval(slideInterval)
      slideInterval = setInterval(nextSlide, 5000)
    }

    // Event listeners
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide()
        resetInterval()
      })

      nextBtn.addEventListener("click", () => {
        nextSlide()
        resetInterval()
      })
    }

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index
        showSlide(currentSlide)
        resetInterval()
      })
    })

    // Initialize first slide
    showSlide(currentSlide)
  }

  // Menu Tabs
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabContents = document.querySelectorAll(".tab-content")

  if (tabButtons.length && tabContents.length) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab")

        // Remove active class from all buttons and contents
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabContents.forEach((content) => content.classList.remove("active"))

        // Add active class to current button and content
        button.classList.add("active")
        document.getElementById(`tab-${tabId}`).classList.add("active")
      })
    })
  }

  // Header scroll effect
  const header = document.querySelector(".header")

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }

  // Add to cart animation
  const addToCartButtons = document.querySelectorAll(".add-to-cart")

  if (addToCartButtons.length) {
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()

        // Show notification or update cart count
        const cartBadge = document.querySelector(".cart-badge")
        if (cartBadge) {
          const currentCount = Number.parseInt(cartBadge.textContent)
          cartBadge.textContent = currentCount + 1

          // Animation effect
          cartBadge.style.animation = "none"
          setTimeout(() => {
            cartBadge.style.animation = "popIn 0.3s ease forwards"
          }, 10)
        }

        // You could also add a toast notification here
      })
    })
  }

  // Login button redirect
  const loginButtons = document.querySelectorAll(".login-button")

  if (loginButtons.length) {
    loginButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()
        window.location.href = "https://zodcook.github.io/login/"
      })
    })
  }
})
