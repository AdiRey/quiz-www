import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { RouterModule } from '@angular/router';
import { MessageContainerComponent } from './components/message-container/message-container.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { toastrReducer as notificationReducer } from './store/toast/toastr.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ToastrEffect as NotificationEffect } from './store/toast/toastr.effects';

@NgModule({
  declarations: [LogoComponent, MessageContainerComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    StoreModule.forFeature('notification', notificationReducer),
    EffectsModule.forFeature([NotificationEffect])
  ],
  exports: [LogoComponent]
})
export class SharedModule { }
