document.addEventListener("DOMContentLoaded", () => {
  const formTitle = document.getElementById("formTitle");
  const submitBtn = document.getElementById("submitBtn");
  const toggleForm = document.getElementById("toggleForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const forgotBtn = document.getElementById("forgotBtn");
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popupMessage");
  const closePopup = document.getElementById("closePopup");

  let isLogin = false;


  toggleForm.addEventListener("click", () => {
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? "Log In" : "Sign Up";
    submitBtn.textContent = isLogin ? "Log In" : "Sign Up";
    toggleForm.textContent = isLogin ? "Sign Up" : "Login";
    nameInput.style.display = isLogin ? "none" : "block";
    clearInputs();
  });


  function clearInputs() {
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
  }


  submitBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password || (!isLogin && !name)) {
      showPopup("⚠️ Please fill in all fields.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (isLogin) {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        showPopup(`✅ Welcome back, ${user.name}!`);
      } else {
        showPopup("❌ Incorrect email or password.");
      }
    } else {
      const exists = users.some(u => u.email === email);
      if (exists) {
        showPopup("❌ Sorry! Email already exists.");
      } else {
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        showPopup("✅ Signup successful! You can now log in.");
        toggleForm.click(); // switch to login
      }
    }
  });


  forgotBtn.addEventListener("click", () => {
    const email = prompt("Enter your registered email:");
    if (!email) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email);
    if (user) {
      showPopup(`🔑 Your password is: ${user.password}`);
    } else {
      showPopup("❌ Email not found in our records.");
    }
  });


  function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = "flex";
  }

  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });
});
