const signupTab = document.getElementById("signupTab");
const signinTab = document.getElementById("signinTab");
const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");

signupTab.onclick = () => {
  signupTab.classList.add("active");
  signinTab.classList.remove("active");
  signupForm.classList.add("active");
  signinForm.classList.remove("active");
};

signinTab.onclick = () => {
  signinTab.classList.add("active");
  signupTab.classList.remove("active");
  signinForm.classList.add("active");
  signupForm.classList.remove("active");
};

const suUsername = document.getElementById("suUsername");
const suFullname = document.getElementById("suFullname");
const suEmail = document.getElementById("suEmail");
const suPassword = document.getElementById("suPassword");
const createAccountBtn = document.getElementById("createAccountBtn");
const togglePwd = document.getElementById("togglePwd");

const ruleLength = document.getElementById("ruleLength");
const ruleUpper = document.getElementById("ruleUpper");
const ruleNumber = document.getElementById("ruleNumber");
const ruleSymbol = document.getElementById("ruleSymbol");

togglePwd.onclick = () => {
  if(suPassword.type === "password") {
    suPassword.type = "text";
    togglePwd.textContent = "Hide";
  } else {
    suPassword.type = "password";
    togglePwd.textContent = "Show";
  }
};

function checkPasswordRules(pwd) {
  if(pwd.length >= 8) { ruleLength.className="rule correct"; ruleLength.textContent="✅ Minimum 8 characters"; }
  else { ruleLength.className="rule incorrect"; ruleLength.textContent="❌ Minimum 8 characters"; }

  if(/[A-Z]/.test(pwd)) { ruleUpper.className="rule correct"; ruleUpper.textContent="✅ At least one uppercase letter"; }
  else { ruleUpper.className="rule incorrect"; ruleUpper.textContent="❌ At least one uppercase letter"; }

  if(/[0-9]/.test(pwd)) { ruleNumber.className="rule correct"; ruleNumber.textContent="✅ At least one number"; }
  else { ruleNumber.className="rule incorrect"; ruleNumber.textContent="❌ At least one number"; }

  if(/[!@#$%^&*]/.test(pwd)) { ruleSymbol.className="rule correct"; ruleSymbol.textContent="✅ At least one symbol (!@#$%^&*)"; }
  else { ruleSymbol.className="rule incorrect"; ruleSymbol.textContent="❌ At least one symbol (!@#$%^&*)"; }

  return (pwd.length>=8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[!@#$%^&*]/.test(pwd));
}

function validateSignUp() {
  let ok = true;
  if(!suUsername.value) ok=false;
  if(!suFullname.value) ok=false;
  if(!suEmail.value) ok=false;

  if(!checkPasswordRules(suPassword.value)) ok=false;

  createAccountBtn.disabled = !ok;
}

[suUsername, suFullname, suEmail, suPassword].forEach(el => el.addEventListener("input", validateSignUp));

signupForm.onsubmit = e => {
  e.preventDefault();
  signupForm.querySelector(".success").innerText = "Account Created Successfully!";
  console.log({
    username: suUsername.value,
    fullName: suFullname.value,
    email: suEmail.value,
    password: "****"
  });
  signupForm.reset();
  createAccountBtn.disabled = true;

  [ruleLength, ruleUpper, ruleNumber, ruleSymbol].forEach(r => { r.className="rule incorrect"; r.textContent="❌ "+r.textContent.slice(2); });
};

const siUser = document.getElementById("siUser");
const siPass = document.getElementById("siPass");
const loginBtn = document.getElementById("loginBtn");

function validateSignIn() {
  loginBtn.disabled = !(siUser.value && siPass.value);
}

[siUser, siPass].forEach(el => el.addEventListener("input", validateSignIn));

signinForm.onsubmit = e => {
  e.preventDefault();
  signinForm.querySelector(".success").innerText = "Logged in successfully!";
};