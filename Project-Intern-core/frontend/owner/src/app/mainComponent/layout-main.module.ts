import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutMainRoutingModule } from './layout-main-routing.module';
import { LayoutMainComponent } from './layout-main.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { UpdatePostComponent } from './pages/update-post/update-post.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { DetailPostComponent } from './pages/detail-post/detail-post.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './layouts/footer/footer.component';
import { EditLanguageDialogComponent } from './dialogs/edit-language-dialog/edit-language-dialog.component';
import { EditStatusDialogComponent } from './dialogs/edit-status-dialog/edit-status-dialog.component';
import { EditCategoryDialogComponent } from './dialogs/edit-category-dialog/edit-category-dialog.component';
import { DeleteMutipalPostComponent } from './dialogs/delete-mutipal-post/delete-mutipal-post.component';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FilterDialogComponent } from './dialogs/filter-dialog/filter-dialog.component';

@NgModule({
  declarations: [
    LayoutMainComponent,
    MenuComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    DetailPostComponent,
    AccountPageComponent,
    UpdatePostComponent,
    CreatePostComponent,
    EditLanguageDialogComponent,
    EditStatusDialogComponent,
    EditCategoryDialogComponent,
    DeleteMutipalPostComponent,
    FilterDialogComponent,
  ],
  imports: [
    CommonModule,
    LayoutMainRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    CKEditorModule,
    TranslateModule.forChild(),
  ]
})
export class LayoutMainModule {}
