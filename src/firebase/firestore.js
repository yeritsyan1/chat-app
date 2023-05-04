import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBXrW3_CIJB4E3bxg-dtM9hzWRhOv6oUK8",
  authDomain: "chat-app-586d0.firebaseapp.com",
  projectId: "chat-app-586d0",
  storageBucket: "chat-app-586d0.appspot.com",
  messagingSenderId: "304255063698",
  appId: "1:304255063698:web:2f97eff2d8d228f87c384b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);