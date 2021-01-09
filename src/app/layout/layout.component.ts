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
      content: 'strona główna',
      icon: 'video_label'
    },
    {
      route: '/q/quiz',
      content: 'quizy',
      icon: 'school'
    },
    {
      route: '/q/quiz2',
      content: 'wyniki',
      icon: 'score'
    },
    {
      route: '/q/rank',
      content: 'rankingi',
      icon: 'moving'
    },
    {
      route: '/q/quiz3',
      content: 'moje quizy',
      icon: 'emoji_objects'
    },
    {
      route: '/q/category',
      content: 'kategorie',
      icon: 'category'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public buttonClick() {
    console.log('xd');
  }

}
