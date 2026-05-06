import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth/web-extension';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCxag4KFHo5yOjuKNifHyhokoMJy8PQMvo",
  authDomain: "prueba-lista-tareas.firebaseapp.com",
  projectId: "prueba-lista-tareas",
  storageBucket: "prueba-lista-tareas.firebasestorage.app",
  messagingSenderId: "614138183029",
  appId: "1:614138183029:web:a9d8a1e11460d0ed35673c",
  measurementId: "G-M3N8DJH5N0"
};

@Injectable({
  providedIn: 'root',
})
export class Firebase {
  private readonly _app = initializeApp(firebaseConfig);
  private readonly _auth = getAuth(this._app);
  private readonly _db = getFirestore(this._app);

  get app() {
    return this._app;
  }

  get auth() {
    return this._auth;
  }

  get db() {
    return this._db;
  }
}
