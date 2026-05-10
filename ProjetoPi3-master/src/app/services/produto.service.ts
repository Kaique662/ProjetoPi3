import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  listar(params?: { categoria?: string; ordem?: string; busca?: string }): Observable<Produto[]> {
    let httpParams = new HttpParams();
    if (params?.categoria) httpParams = httpParams.set('categoria', params.categoria);
    if (params?.ordem) httpParams = httpParams.set('ordem', params.ordem);
    if (params?.busca) httpParams = httpParams.set('busca', params.busca);
    return this.http.get<Produto[]>(`${this.API_URL}/produtos`, { params: httpParams });
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.API_URL}/produtos/${id}`);
  }

  criar(produto: Partial<Produto>): Observable<Produto> {
    return this.http.post<Produto>(`${this.API_URL}/produtos`, produto);
  }

  atualizar(id: number, produto: Partial<Produto>): Observable<Produto> {
    return this.http.put<Produto>(`${this.API_URL}/produtos/${id}`, produto);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/produtos/${id}`);
  }
}
