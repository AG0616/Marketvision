importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
  apiKey: "AIzaSyC0vWvztDBun4lvn7rCSEU1QjXoB8PF-PA",
  authDomain: "marketvision-41e69.firebaseapp.com",
  projectId: "marketvision-41e69",
  storageBucket: "marketvision-41e69.firebasestorage.app",
  messagingSenderId: "443279380424",
  appId: "1:443279380424:web:a714dc5f05dcab8b93fafd",
  measurementId: "G-1XYBQCJNY1"
});

const messaging = firebase.messaging();