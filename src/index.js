import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import firebase from "firebase/compat/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqMMhoOuLLrJ9EQDRkef8fy3NhvpUR-9I",
  authDomain: "chat-react-193e2.firebaseapp.com",
  projectId: "chat-react-193e2",
  storageBucket: "chat-react-193e2.appspot.com",
  messagingSenderId: "24521627703",
  appId: "1:24521627703:web:315e92c4bad8fae9ba87b2",
  measurementId: "G-7XWCC8XSMX"
};

initializeApp(firebaseConfig)

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const db = getFirestore(app)

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        firebase,
        auth,
        db
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);