import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoresRoutingModule } from './scores-routing.module';
import { ScoresComponent } from './components/scores.component';
import { ScoresTableComponent } from './components/scores-table/scores-table.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ScoresComponent, ScoresTableComponent],
  imports: [
    CommonModule,
    ScoresRoutingModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ScoresModule { }
