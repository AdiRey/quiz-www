import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scores',
  template: '<section class="module-content"><router-outlet></router-outlet></section>'
})
export class ScoresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
