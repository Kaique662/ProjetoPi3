import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProdutoCardComponent } from '../../components/produto-card/produto-card.component';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, ProdutoCardComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  produtos = signal<Produto[]>([]);
  carregando = signal(true);
  categoriaAtiva = signal('todos');
  ordemAtiva = signal('relevancia');

  categorias = [
    { label: 'Todos', valor: 'todos' },
    { label: 'Chaves Steam', valor: 'steam' },
    { label: 'Chaves Xbox', valor: 'xbox' },
    { label: 'Chaves PlayStation', valor: 'ps' },
    { label: 'Contas', valor: 'contas' },
    { label: 'Gift Cards', valor: 'gift-cards' },
  ];

  ordens = [
    { label: 'Relevância', valor: 'relevancia' },
    { label: 'Menor preço', valor: 'preco-asc' },
    { label: 'Maior preço', valor: 'preco-desc' },
    { label: 'Avaliação', valor: 'avaliacao' },
  ];

  constructor(private produtoService: ProdutoService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['categoria']) this.categoriaAtiva.set(params['categoria']);
      this.carregarProdutos();
    });
  }

  carregarProdutos() {
    this.carregando.set(true);
    this.produtoService.listar({ categoria: this.categoriaAtiva() }).subscribe({
      next: (data) => { this.produtos.set(data); this.carregando.set(false); },
      error: () => {
        this.produtos.set(this.getMock());
        this.carregando.set(false);
      }
    });
  }

  filtrarCategoria(c: string) {
    this.categoriaAtiva.set(c);
    this.carregarProdutos();
  }

  onSortChange(event: Event) {
    this.ordemAtiva.set((event.target as HTMLSelectElement).value);
  }

  getMock(): Produto[] {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1, nome: `Produto ${i + 1}`, descricao: '',
      preco: (i + 1) * 29.9, tipo: ['chave', 'conta', 'gift'][i % 3] as any,
      categoria: 'jogos', estoque: 5
    }));
  }
}
