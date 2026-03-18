// =============================
// HELPER FUNCTIONS
// =============================

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function getStoredUser() {
  return JSON.parse(localStorage.getItem("neonUser"));
}

// =============================
// SIGNUP LOGIC
// =============================

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    let valid = true;

    // Reset borders
    [name, email, password, confirmPassword].forEach((input) => {
      input.style.borderColor = "#1f1f3a";
    });

    // Name validation
    if (name.value.trim().length < 3) {
      name.style.borderColor = "red";
      alert("Name must be at least 3 characters.");
      valid = false;
    }

    // Email validation
    if (!isValidEmail(email.value.trim())) {
      email.style.borderColor = "red";
      alert("Enter a valid email.");
      valid = false;
    }

    // Password validation
    if (password.value.length < 6) {
      password.style.borderColor = "red";
      alert("Password must be at least 6 characters.");
      valid = false;
    }

    // Confirm password
    if (password.value !== confirmPassword.value) {
      confirmPassword.style.borderColor = "red";
      alert("Passwords do not match.");
      valid = false;
    }

    if (!valid) return;

    const userData = {
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value,
      role: "admin", // change to "user" if needed
      loggedIn: true,
    };

    localStorage.setItem("neonUser", JSON.stringify(userData));

    alert("Account created successfully!");
    window.location.href = "profile.html";
  });
}

// =============================
// LOGIN LOGIC
// =============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = loginForm.querySelector("input[type='email']");
    const passwordInput = loginForm.querySelector("input[type='password']");

    emailInput.style.borderColor = "#1f1f3a";
    passwordInput.style.borderColor = "#1f1f3a";

    if (!isValidEmail(emailInput.value.trim())) {
      emailInput.style.borderColor = "red";
      alert("Enter a valid email.");
      return;
    }

    if (passwordInput.value.length < 6) {
      passwordInput.style.borderColor = "red";
      alert("Password must be at least 6 characters.");
      return;
    }

    const storedUser = getStoredUser();

    if (!storedUser) {
      alert("No account found. Please sign up first.");
      window.location.href = "signup.html";
      return;
    }

    if (
      storedUser.email === emailInput.value.trim() &&
      storedUser.password === passwordInput.value
    ) {
      storedUser.loggedIn = true;
      localStorage.setItem("neonUser", JSON.stringify(storedUser));

      alert("Login successful!");
      if (storedUser.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "profile.html";
      }
    } else {
      alert("Invalid email or password.");
    }
  });
}

// =============================
// LOGOUT FUNCTION
// =============================

function logoutUser() {
  const user = getStoredUser();
  if (user) {
    user.loggedIn = false;
    localStorage.setItem("neonUser", JSON.stringify(user));
  }
  window.location.href = "login.html";
}

// =============================
// SAVED COUNTRIES FUNCTIONS
// =============================

// Save country function with duplicate check
function saveCountry(country) {
  let saved = JSON.parse(localStorage.getItem("savedCountries")) || [];

  // Check for duplicates using name
  const exists = saved.some((item) => item.name === country.name);

  if (exists) {
    alert("⚠️ This country is already saved!");
    return false;
  }

  saved.push(country);
  localStorage.setItem("savedCountries", JSON.stringify(saved));

  alert("✅ Country saved successfully!");
  return true;
}

// Get all saved countries
function getSavedCountries() {
  return JSON.parse(localStorage.getItem("savedCountries")) || [];
}

// Remove a saved country by index
function removeSavedCountry(index) {
  let saved = getSavedCountries();
  if (index >= 0 && index < saved.length) {
    saved.splice(index, 1);
    localStorage.setItem("savedCountries", JSON.stringify(saved));
    return true;
  }
  return false;
}

// Clear all saved countries
function clearAllSavedCountries() {
  localStorage.removeItem("savedCountries");
}

// Check if a country is already saved
function isCountrySaved(countryName) {
  const saved = getSavedCountries();
  return saved.some((item) => item.name === countryName);
}

// =============================
// INITIALIZATION
// =============================

// Load saved countries preview on dashboard pages
const savedContainer = document.getElementById("savedContainer");
if (savedContainer) {
  const saved = getSavedCountries();
  savedContainer.innerHTML = saved.length
    ? saved
        .map(
          (country) => `
      <div class="saved-card">
        <img src="${country.flag}" alt="${country.name}" />
        <h3>${country.name}</h3>
        <p>Capital: ${country.capital}</p>
      </div>
    `,
        )
        .join("")
    : "<p>No saved countries yet.</p>";
}
