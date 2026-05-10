import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.css',
})
export class LoginComponent {
  email = '';
  senha = '';
  emailRegistro = '';
  modoRegistro = signal(false);
  carregando = signal(false);
  erro = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  fazerLogin() {
    if (!this.email || !this.senha) {
      this.erro.set('Preencha email e senha.');
      return;
    }
    this.carregando.set(true);
    this.erro.set('');
    this.authService.login({ email: this.email, senha: this.senha }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.erro.set('Email ou senha inválidos.');
        this.carregando.set(false);
      }
    });
  }

  receberCodigo() {
    alert('Código enviado para ' + this.emailRegistro);
  }

  receberLinkMagico() {
    alert('Link mágico enviado para ' + this.emailRegistro);
  }
}
