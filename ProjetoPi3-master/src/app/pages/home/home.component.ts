import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ProdutoCardComponent } from '../../components/produto-card/produto-card.component';
import { ProdutoService } from '../../services/produto.service';
import { AuthService } from '../../services/auth.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProdutoCardComponent],
  templateUrl: './home.component.html',
  styleUrl:'./home.component.css'
})
export class HomeComponent implements OnInit {
  produtos = signal<Produto[]>([]);
  carregando = signal(true);
  categoriaAtiva = signal('todos');

  categorias = [
    { label: 'Todos', valor: 'todos' },
    { label: 'Chaves Steam', valor: 'steam' },
    { label: 'Chaves Xbox', valor: 'xbox' },
    { label: 'Chaves PlayStation', valor: 'ps' },
    { label: 'Contas', valor: 'contas' },
    { label: 'Gift Cards', valor: 'gift-cards' },
  ];

  constructor(
    private produtoService: ProdutoService,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos(categoria?: string) {
    this.carregando.set(true);
    this.produtoService.listar({ categoria: categoria || undefined }).subscribe({
      next: (data) => {
        this.produtos.set(data);
        this.carregando.set(false);
      },
      error: () => {
        // Dados mockados enquanto o backend não está pronto
        this.produtos.set(this.getMockProdutos());
        this.carregando.set(false);
      }
    });
  }

  filtrarCategoria(categoria: string) {
    this.categoriaAtiva.set(categoria);
    this.carregarProdutos(categoria === 'todos' ? undefined : categoria);
  }

  getMockProdutos(): Produto[] {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      nome: `Jogo ${i + 1}`,
      descricao: 'Descrição do produto',
      preco: Math.floor(Math.random() * 200) + 20,
      tipo: ['chave', 'conta', 'gift'][i % 3] as any,
      categoria: 'jogos',
      estoque: 10,
    }));
  }
}
