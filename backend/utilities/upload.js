const multer = require("multer");
const firebase = require("firebase/app");
const { getStorage, ref, uploadBytes } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyBVwr29zLVvuvcDnrfBQXKPiWNmD-2xefs",
  authDomain: "fir-project-9906e.firebaseapp.com",
  projectId: "fir-project-9906e",
  storageBucket: "fir-project-9906e.appspot.com",
  messagingSenderId: "289016627724",
  appId: "1:289016627724:web:b784fdcd91f6cd7bd6a429",
  measurementId: "G-YDZW0RXWSD",
};

firebase.initializeApp(firebaseConfig);

const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

module.exports = { upload, storage, ref, uploadBytes };
