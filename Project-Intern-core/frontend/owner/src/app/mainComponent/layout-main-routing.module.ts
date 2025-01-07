import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutMainComponent } from './layout-main.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { UpdatePostComponent } from './pages/update-post/update-post.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { DetailPostComponent } from './pages/detail-post/detail-post.component';
import { ApiService } from '../services/api.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      { path: '', redirectTo: 'post', pathMatch: 'full' },
      { path: 'post', component: HomeComponent, canActivate: [ApiService] },
      { path: 'account-page', component: AccountPageComponent, canActivate: [ApiService] },
      { path: 'update-post/:id', component: UpdatePostComponent, canActivate: [ApiService] },
      { path: 'create-post', component: CreatePostComponent, canActivate: [ApiService] },
      { path: 'detail-post/:id', component: DetailPostComponent, canActivate: [ApiService] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutMainRoutingModule { }
