import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthEffect } from './store/auth.effects';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { AuthLoaderComponent } from './components/auth-loader/auth-loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [AuthComponent, AuthPageComponent, AuthLoaderComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffect])
  ]
})
export class AuthModule { }
