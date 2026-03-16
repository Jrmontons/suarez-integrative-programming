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
