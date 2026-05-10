import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <nav class="navbar">
      <div class="navbar-top">
        <div class="navbar-left">
          <a routerLink="/" class="logo">
            <span class="logo-key">🔑</span>
            <span class="logo-text">GetKey</span>
          </a>
          <span class="divider">|</span>
          <ng-container *ngIf="!authService.isLoggedIn()">
            <a routerLink="/login" class="auth-link">Login</a>
            <span class="sep">|</span>
            <a routerLink="/login" class="auth-link">Registrar-se</a>
          </ng-container>
          <ng-container *ngIf="authService.isLoggedIn()">
            <span class="user-greeting">Olá, {{ authService.currentUser()?.nome }}</span>
            <button class="auth-link logout-btn" (click)="authService.logout()">Sair</button>
          </ng-container>
        </div>

        <div class="search-bar">
          <input type="text" placeholder="pesquisar" [(ngModel)]="searchQuery" (ngModel)="searchQuery" />
          <button class="search-btn" (click)="search()">🔍</button>
        </div>

        <div class="navbar-right">
          <a routerLink="/favoritos" class="icon-btn" title="Favoritos">♡</a>
          <a routerLink="/carrinho" class="icon-btn cart-btn" title="Carrinho">
            🛒
            <span class="cart-badge" *ngIf="cartService.totalItems() > 0">
              {{ cartService.totalItems() }}
            </span>
          </a>
        </div>
      </div>

      <div class="navbar-bottom">
        <a routerLink="/catalogo" [queryParams]="{categoria: 'todos'}" routerLinkActive="active" class="nav-link">categorias</a>
        <span class="nav-sep">|</span>
        <a routerLink="/catalogo" [queryParams]="{ordem: 'mais-vendidos'}" class="nav-link">mais vendidos</a>
        <span class="nav-sep">|</span>
        <a routerLink="/catalogo" [queryParams]="{categoria: 'chaves'}" class="nav-link">chaves</a>
        <span class="nav-sep">|</span>
        <a routerLink="/catalogo" [queryParams]="{categoria: 'jogos'}" class="nav-link">jogos</a>
        <span class="nav-sep">|</span>
        <a routerLink="/catalogo" [queryParams]="{categoria: 'gift-cards'}" class="nav-link">GIFT cards</a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
    }

    .navbar-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      gap: 16px;
    }

    .navbar-left {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 200px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .logo-key { font-size: 18px; }

    .logo-text {
      font-family: 'Rajdhani', sans-serif;
      font-weight: 700;
      font-size: 20px;
      color: var(--accent-cyan);
      letter-spacing: 1px;
    }

    .divider, .sep {
      color: var(--text-muted);
    }

    .auth-link {
      font-size: 13px;
      color: var(--text-secondary);
      transition: color 0.2s;
      background: none;
    }

    .auth-link:hover { color: var(--accent-cyan); }

    .logout-btn { font-size: 13px; }

    .user-greeting {
      font-size: 13px;
      color: var(--accent-cyan);
    }

    .search-bar {
      flex: 1;
      max-width: 440px;
      display: flex;
      align-items: center;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      overflow: hidden;
    }

    .search-bar input {
      flex: 1;
      background: transparent;
      border: none;
      padding: 8px 14px;
      color: var(--text-primary);
      font-size: 14px;
    }

    .search-bar input::placeholder { color: var(--text-muted); }

    .search-btn {
      background: var(--bg-card-hover);
      border: none;
      padding: 8px 12px;
      color: var(--text-secondary);
      cursor: pointer;
      transition: background 0.2s;
    }

    .search-btn:hover { background: var(--accent-purple); }

    .navbar-right {
      display: flex;
      align-items: center;
      gap: 16px;
      min-width: 80px;
      justify-content: flex-end;
    }

    .icon-btn {
      font-size: 20px;
      color: var(--text-secondary);
      cursor: pointer;
      position: relative;
      transition: color 0.2s;
    }

    .icon-btn:hover { color: var(--accent-cyan); }

    .cart-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: var(--accent-purple);
      color: white;
      font-size: 10px;
      font-weight: 700;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .navbar-bottom {
      display: flex;
      align-items: center;
      padding: 0 20px;
      background: var(--bg-card);
      border-top: 1px solid var(--border-color);
    }

    .nav-link {
      padding: 10px 14px;
      font-size: 13px;
      color: var(--text-secondary);
      transition: color 0.2s;
      letter-spacing: 0.5px;
    }

    .nav-link:hover, .nav-link.active {
      color: var(--text-primary);
    }

    .nav-sep {
      color: var(--border-color);
      font-size: 12px;
    }
  `]
})
export class NavbarComponent {
  searchQuery = '';

  constructor(
    public cartService: CartService,
    public authService: AuthService
  ) {}

  search() {
    console.log('Pesquisar:', this.searchQuery);
  }
}
