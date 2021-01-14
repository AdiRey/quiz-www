import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { RouterModule } from '@angular/router';
import { MessageContainerComponent } from './components/message-container/message-container.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ToastrEffect as NotificationEffect } from './store/toast/toastr.effects';
import { HasTokenGuard } from './guards/has-token.guard';
import { ConfirmEntryComponent } from './components/confirm-entry/confirm-entry.component';
import { FormWrapperComponent } from './components/form-wrapper/form-wrapper.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RedirectionEffect } from './store/redirection';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OnCreateDirective } from './directives/on-create.directive';
import { ImageContainerComponent } from './components/image-container/image-container.component';

@NgModule({
  declarations: [
    LogoComponent,
    MessageContainerComponent,
    ConfirmEntryComponent,
    FormWrapperComponent,
    LoaderComponent,
    OnCreateDirective,
    ImageContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    HttpClientModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    EffectsModule.forFeature([NotificationEffect, RedirectionEffect])
  ],
  providers: [HasTokenGuard],
  exports: [LogoComponent, ConfirmEntryComponent, FormWrapperComponent, LoaderComponent, OnCreateDirective],
  entryComponents: [ConfirmEntryComponent]
})
export class SharedModule { }
