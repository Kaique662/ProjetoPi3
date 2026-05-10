import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { CartService } from '../../services/cart.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'produto.component.html',
  styleUrl:'produto.component.css'
})
export class ProdutoComponent implements OnInit {
  produto = signal<Produto | null>(null);
  carregando = signal(true);
  adicionado = signal(false);

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private produtoService: ProdutoService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produtoService.buscarPorId(id).subscribe({
      next: (p) => { this.produto.set(p); this.carregando.set(false); },
      error: () => {
        // Mock enquanto backend não está pronto
        this.produto.set({
          id, nome: `Produto ${id}`, descricao: 'Chave digital para ativação na plataforma.',
          preco: 89.90, tipo: 'chave', categoria: 'jogos', estoque: 5
        });
        this.carregando.set(false);
      }
    });
  }

  comprar() {
    if (this.produto()) {
      this.cartService.adicionarItem(this.produto()!);
      this.adicionado.set(true);
      setTimeout(() => this.router.navigate(['/carrinho']), 600);
    }
  }
}
