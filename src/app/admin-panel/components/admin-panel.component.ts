import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  template: '<section class="module-content"><router-outlet></router-outlet></section>',
})
export class AdminPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
