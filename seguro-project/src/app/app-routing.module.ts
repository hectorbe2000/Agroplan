import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./pages/proveedores/proveedores.module').then(m => m.ProveedoresPageModule)
  },
  {
    path: 'parcelas',
    loadChildren: () => import('./pages/parcelas/parcelas.module').then(m => m.ParcelasPageModule)
  },
  {
    path: 'aplicadores',
    loadChildren: () => import('./pages/aplicadores/aplicadores.module').then(m => m.AplicadoresPageModule)
  },
  {
    path: 'aplicadores/nuevo',
    loadChildren: () => import('./pages/aplicadores/aplicador-form/aplicador-form.module').then(m => m.AplicadorFormPageModule)
  },
  {
    path: 'aplicadores/editar/:id',
    loadChildren: () => import('./pages/aplicadores/aplicador-form/aplicador-form.module').then(m => m.AplicadorFormPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
