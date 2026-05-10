import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {
  processando = false;

  constructor(
    public cartService: CartService,
    private readonly pedidoService: PedidoService,
    private readonly router: Router
  ) {}

  remover(produtoId: number): void {
    this.cartService.removerItem(produtoId);
  }

  finalizar(): void {
    this.processando = true;
    const itens = this.cartService.itens();
    const metodoPagamento = 'PIX'; // ou 'CREDITO', 'DEBITO'
    
    this.pedidoService.criarPedido(itens, metodoPagamento).subscribe({
      next: (_pedido) => {
        this.cartService.limparCarrinho();
        this.router.navigate(['/confirmacao']);
      },
      error: (err) => {
        console.error('Erro ao finalizar compra:', err);
        this.processando = false;
      }
    });
  }
}