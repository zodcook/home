document.addEventListener("DOMContentLoaded", () => {
  // Tab switching
  const tabs = document.querySelectorAll(".auth-tab")
  const forms = document.querySelectorAll(".auth-form")

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab")

      // Remove active class from all tabs and forms
      tabs.forEach((t) => t.classList.remove("active"))
      forms.forEach((f) => f.classList.remove("active"))

      // Add active class to current tab and form
      tab.classList.add("active")
      document.getElementById(`${target}-form`).classList.add("active")
    })
  })

  // Toggle password visibility
  const toggleButtons = document.querySelectorAll(".toggle-password")

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const input = button.parentElement.querySelector("input")
      const icon = button.querySelector("i")

      if (input.type === "password") {
        input.type = "text"
        // Check if feather is defined before using it
        if (typeof feather !== "undefined") {
          feather.replace(icon, { name: "eye-off" })
        } else {
          console.warn("Feather icons not loaded. Ensure Feather icons are properly included.")
          // Fallback to a simple text change if feather is not available
          icon.textContent = "Hide"
        }
      } else {
        input.type = "password"
        // Check if feather is defined before using it
        if (typeof feather !== "undefined") {
          feather.replace(icon, { name: "eye" })
        } else {
          console.warn("Feather icons not loaded. Ensure Feather icons are properly included.")
          // Fallback to a simple text change if feather is not available
          icon.textContent = "Show"
        }
      }
    })
  })

  // Form submission
  const loginForm = document.getElementById("login-form-element")
  const registerForm = document.getElementById("register-form-element")
  const toast = document.getElementById("toast")
  const toastTitle = document.querySelector(".toast-title")
  const toastMessage = document.querySelector(".toast-message")
  const toastClose = document.querySelector(".toast-close")

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = document.getElementById("login-email").value
    const password = document.getElementById("login-password").value

    // Simulate login (in a real app, this would be an API call)
    if (email && password) {
      // Store user info in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: email,
          isLoggedIn: true,
        }),
      )

      // Show success toast
      toastTitle.textContent = "ورود موفق"
      toastMessage.textContent = "به زود کوک خوش آمدید!"
      toast.classList.add("show")

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "https://zodcook.github.io/home/#"
      }, 2000)
    }
  })

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const firstName = document.getElementById("register-firstname").value
    const lastName = document.getElementById("register-lastname").value
    const email = document.getElementById("register-email").value
    const password = document.getElementById("register-password").value
    const confirmPassword = document.getElementById("register-confirm-password").value

    // Validate password match
    if (password !== confirmPassword) {
      toastTitle.textContent = "خطا"
      toastMessage.textContent = "رمز عبور و تکرار آن مطابقت ندارند."
      toast.classList.add("show")
      return
    }

    // Simulate registration (in a real app, this would be an API call)
    if (firstName && lastName && email && password) {
      // Store user info in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          isLoggedIn: true,
        }),
      )

      // Show success toast
      toastTitle.textContent = "ثبت نام موفق"
      toastMessage.textContent = "حساب کاربری شما با موفقیت ایجاد شد."
      toast.classList.add("show")

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        window.location.href = "https://zodcook.github.io/home/#"
      }, 2000)
    }
  })

  // Close toast
  toastClose.addEventListener("click", () => {
    toast.classList.remove("show")
  })

  // Auto-hide toast after 5 seconds
  function hideToast() {
    setTimeout(() => {
      toast.classList.remove("show")
    }, 5000)
  }

  // Show toast event
  toast.addEventListener("transitionend", function (e) {
    if (e.propertyName === "transform" && this.classList.contains("show")) {
      hideToast()
    }
  })
})
