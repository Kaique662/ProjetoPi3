export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  tipo: 'chave' | 'conta' | 'gift';
  categoria: string;
  plataforma?: string; // steam, xbox, ps, etc
  imagemUrl?: string;
  estoque: number;
  avaliacao?: number;
  totalAvaliacoes?: number;
}

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}
