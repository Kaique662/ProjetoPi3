import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { ConfirmacaoComponent } from './pages/confirmacao/confirmacao.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'produto/:id', component: ProdutoComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'confirmacao', component: ConfirmacaoComponent },
];

