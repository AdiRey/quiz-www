import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common'
import localePl from '@angular/common/locales/pl';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './components/category.component';
import { CategoryTableComponent } from './components/category-table/category-table.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { categoryReducer } from './store/category.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffect } from './store/category.effects';


registerLocaleData(localePl);


@NgModule({
  declarations: [CategoryComponent, CategoryTableComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('category', categoryReducer),
    EffectsModule.forFeature([CategoryEffect])
  ],
  entryComponents: [
    CategoryFormComponent
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'pl-PL'
    }
  ]
})
export class CategoryModule { }
