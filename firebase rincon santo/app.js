import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCvyTxZ3v-Ju4sJElAZlSiPM3KiKg7dWfE",
  authDomain: "prueba-rincon-santo.firebaseapp.com",
  projectId: "prueba-rincon-santo",
  storageBucket: "prueba-rincon-santo.firebasestorage.app",
  messagingSenderId: "623705016912",
  appId: "1:623705016912:web:ef5880d4e86e4b62b25f55",
  measurementId: "G-4VJDDWR0SF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById('login-form');
const signupBtn = document.getElementById('signup-btn');
const googleBtn = document.getElementById('google-login');
const errorMsg = document.getElementById('error-msg');

// Iniciar sesión con correo y contraseña
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'dashboard.html';
  } catch (error) {
    errorMsg.textContent = "⚠️ " + error.message;
  }
});

// Crear cuenta manual
signupBtn.addEventListener('click', async () => {
  const email = prompt("📧 Ingresa tu correo:");
  const password = prompt("🔒 Ingresa tu contraseña (mín 6 caracteres):");
  if (!email || !password) return alert("⚠️ Correo y contraseña obligatorios");

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("✅ Cuenta creada exitosamente, ahora puedes iniciar sesión.");
  } catch (error) {
    alert("❌ Error al crear cuenta: " + error.message);
  }
});

// Iniciar sesión con Google
googleBtn.addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    window.location.href = 'dashboard.html';
  } catch (error) {
    errorMsg.textContent = "⚠️ " + error.message;
  }
});

// Mantener sesión activa
onAuthStateChanged(auth, (user) => {
  if (user) console.log("Usuario logueado:", user.email);
});