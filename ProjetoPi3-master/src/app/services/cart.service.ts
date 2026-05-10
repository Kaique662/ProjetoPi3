import { Injectable, signal, computed } from '@angular/core';
import { Produto, ItemCarrinho } from '../models/produto.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  remover(produtoId: number) {
    throw new Error('Method not implemented.');
  }
  itens = signal<ItemCarrinho[]>([]);

  totalItems = computed(() =>
    this.itens().reduce((acc, item) => acc + item.quantidade, 0)
  );

  totalPreco = computed(() =>
    this.itens().reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0)
  );

  adicionarItem(produto: Produto) {
    const atual = this.itens();
    const existente = atual.find(i => i.produto.id === produto.id);
    if (existente) {
      this.itens.set(
        atual.map(i =>
          i.produto.id === produto.id
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        )
      );
    } else {
      this.itens.set([...atual, { produto, quantidade: 1 }]);
    }
  }

  removerItem(produtoId: number) {
    this.itens.set(this.itens().filter(i => i.produto.id !== produtoId));
  }

  limparCarrinho() {
    this.itens.set([]);
  }
}
