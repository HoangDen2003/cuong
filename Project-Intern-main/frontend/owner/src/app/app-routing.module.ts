// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./mainComponent/layout-main.module').then(m => m.LayoutMainModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./authComponent/layout-auth.module').then(m => m.LayoutAuthModule)
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
