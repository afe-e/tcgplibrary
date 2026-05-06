import { inject, Injectable, signal } from '@angular/core';
import { Firebase } from './firebase';
import { createUserWithEmailAndPassword, onIdTokenChanged, signInWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly firebase = inject(Firebase);
  private readonly router = inject(Router);

  // Si está la sesión iniciada, el valor de user será el usuario, si no, será null. 
  // Mientras se comprueba si hay sesión iniciada o no, el valor de user es undefined.
  readonly user = signal<User | null | undefined>(undefined);

  constructor() {
    onIdTokenChanged(this.firebase.auth, (user) => {
      if (user) {
        this.user.set({
          id: user.uid,
          name: user.displayName ?? '',
          email: user.email ?? ''
        });
      } else {
        this.user.set(null);
      }
    });
  }

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this.firebase.auth, email, password);
    this.router.navigateByUrl('tasks');
  }

  async signUp(username: string, email: string, password: string) {
    const response = await createUserWithEmailAndPassword(this.firebase.auth, email, password);
    await updateProfile(response.user, { displayName: username });
    response.user.reload(); // Refrescar el token de usuario con la información actualizada
    this.router.navigateByUrl('tasks');
  }

  async logout() {
    await this.firebase.auth.signOut();
    this.router.navigateByUrl('login');
  }
}
