import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ContentDialogData, ContentModel } from '../../model/content-model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss']
})
export class MessageContainerComponent implements OnInit {

  public data$: Observable<ContentModel>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public matDialog: ContentDialogData,
    private readonly _httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.data$ = (this._httpClient.get(this.matDialog.url) as Observable<ContentModel>)
      .pipe(filter(f => f != null));
  }

}
