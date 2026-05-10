import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-produto-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <a [routerLink]="['/produto', produto.id]" class="card">
      <div class="card-image">
        <img *ngIf="produto.imagemUrl" [src]="produto.imagemUrl" [alt]="produto.nome" />
        <div *ngIf="!produto.imagemUrl" class="card-image-placeholder">
          <span>🎮</span>
        </div>
        <span class="card-badge" [class]="produto.tipo">
          {{ produto.tipo === 'chave' ? 'KEY' : produto.tipo === 'conta' ? 'CONTA' : 'GIFT' }}
        </span>
      </div>
      <div class="card-info">
        <p class="card-name">{{ produto.nome }}</p>
        <p class="card-price">R$ {{ produto.preco | number:'1.2-2' }}</p>
      </div>
    </a>
  `,
  styles: [`
    .card {
      display: flex;
      flex-direction: column;
      background: var(--bg-card);
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      border: 1px solid var(--border-color);
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.4);
      border-color: var(--accent-purple);
    }

    .card-image {
      position: relative;
      width: 100%;
      aspect-ratio: 3/4;
      background: var(--bg-card-hover);
    }

    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-image-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      background: linear-gradient(135deg, var(--bg-card-hover), #1a2340);
    }

    .card-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      font-size: 10px;
      font-weight: 700;
      font-family: 'Rajdhani', sans-serif;
      padding: 2px 8px;
      border-radius: 4px;
      letter-spacing: 1px;
    }

    .card-badge.chave { background: var(--accent-cyan); color: #000; }
    .card-badge.conta { background: var(--accent-purple); color: #fff; }
    .card-badge.gift { background: var(--accent-yellow); color: #000; }

    .card-info {
      padding: 10px 12px;
    }

    .card-name {
      font-size: 13px;
      color: var(--text-primary);
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .card-price {
      font-size: 14px;
      color: var(--accent-cyan);
      font-weight: 600;
      margin-top: 4px;
    }
  `]
})
export class ProdutoCardComponent {
  @Input() produto!: Produto;
}
