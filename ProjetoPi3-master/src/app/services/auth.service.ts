import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: 'CLIENTE' | 'ADMIN';
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api';
  
  currentUser = signal<Usuario | null>(null);
  isLoggedIn = signal<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    // Restaurar sessão do localStorage
    const savedUser = localStorage.getItem('getkey_user');
    const savedToken = localStorage.getItem('getkey_token');
    if (savedUser && savedToken) {
      this.currentUser.set(JSON.parse(savedUser));
      this.isLoggedIn.set(true);
    }
  }

  login(data: LoginRequest) {
    return this.http.post<{ token: string; usuario: Usuario }>(
      `${this.API_URL}/auth/login`, data
    ).pipe(
      tap(res => {
        localStorage.setItem('getkey_token', res.token);
        localStorage.setItem('getkey_user', JSON.stringify(res.usuario));
        this.currentUser.set(res.usuario);
        this.isLoggedIn.set(true);
      })
    );
  }

  register(data: RegisterRequest) {
    return this.http.post<{ token: string; usuario: Usuario }>(
      `${this.API_URL}/auth/register`, data
    ).pipe(
      tap(res => {
        localStorage.setItem('getkey_token', res.token);
        localStorage.setItem('getkey_user', JSON.stringify(res.usuario));
        this.currentUser.set(res.usuario);
        this.isLoggedIn.set(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('getkey_token');
    localStorage.removeItem('getkey_user');
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem('getkey_token');
  }
}
