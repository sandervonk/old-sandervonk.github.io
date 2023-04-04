// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: "AIzaSyCZelR1HSbmcPf70rTI5Ig02yasL8RSdPw",
  authDomain: "vite-practice.firebaseapp.com",
  projectId: "vite-practice",
  storageBucket: "vite-practice.appspot.com",
  messagingSenderId: "559659689480",
  appId: "1:559659689480:web:417819295e1ad204e193bd",
  measurementId: "G-61KY0KX892",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]
messaging.setBackgroundMessageHandler((payload) => {
  const notification = JSON.parse(payload.data.notification);
  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: "//sandervonk.github.io/VITE/img/icon/app/icon-192x192.png",
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
