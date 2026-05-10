import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemCarrinho } from '../models/produto.model';

export interface Pedido {
  id: number;
  usuarioId: number;
  itens: { produtoId: number; quantidade: number; precoUnitario: number }[];
  total: number;
  status: 'PENDENTE' | 'PAGO' | 'CANCELADO';
  metodoPagamento: string;
  criadoEm: string;
}

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  criarPedido(itens: ItemCarrinho[], metodoPagamento: string): Observable<Pedido> {
    const body = {
      itens: itens.map(i => ({
        produtoId: i.produto.id,
        quantidade: i.quantidade,
        precoUnitario: i.produto.preco
      })),
      metodoPagamento
    };
    return this.http.post<Pedido>(`${this.API_URL}/pedidos`, body);
  }

  buscarPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.API_URL}/pedidos/meus`);
  }
}
