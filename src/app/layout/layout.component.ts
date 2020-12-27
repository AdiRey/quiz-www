import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public opened: boolean = true;

  public items = [
    {
      route: '/q/dashboard',
      content: 'strona główna'
    },
    {
      route: '/q/quiz',
      content: 'quizy'
    },
    {
      route: '/q/quiz',
      content: 'wyniki'
    },
    {
      route: '/q/rank',
      content: 'rankingi'
    },
    {
      route: '/q/quiz',
      content: 'moje quizy'
    },
    {
      route: '/q/category',
      content: 'kategorie'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
