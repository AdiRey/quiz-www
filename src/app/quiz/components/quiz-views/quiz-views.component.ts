import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SwiperCore, { Virtual, Navigation, Pagination } from 'swiper/core';

SwiperCore.use([Virtual, Pagination, Navigation]);

@Component({
  selector: 'app-quiz-views',
  templateUrl: './quiz-views.component.html',
  styleUrls: ['./quiz-views.component.scss']
})
export class QuizViewsComponent implements OnInit {

  public pagination = {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 2
  }

  public navigation = {
    nextEl: '.swiper-button-next',
    revEl: '.swiper-button-prev'
  };

  addQuiz() {
    this._router.navigate(['/q/quiz/add-quiz'])
  }

  constructor(
    private readonly _router: Router
  ) { }

  ngOnInit(): void {
  }

  categoryList = [
    {
      name: 'java',
      content: [
        {
          title: 'Spring Quiz',
          img: 'xd1',
          description: 'hahaha1'
        },
        {
          title: 'J2EE Quiz',
          img: 'xd2', 
          description: 'hahaha2'
        },
        {
          title: 'Spark Quiz',
          img: 'xd3',
          description: 'hahaha3'
        },
        {
          title: 'Spring Quiz',
          img: 'xd1',
          description: 'hahaha1'
        },
        {
          title: 'J2EE Quiz',
          img: 'xd2',
          description: 'hahaha2'
        },
        {
          title: 'Spark Quiz',
          img: 'xd3',
          description: 'hahaha3'
        },
        {
          title: 'Spring Quiz',
          img: 'xd1',
          description: 'hahaha1'
        },
        {
          title: 'J2EE Quiz',
          img: 'xd2',
          description: 'hahaha2'
        },
        {
          title: 'Spark Quiz',
          img: 'xd3',
          description: 'hahaha3'
        },
        {
          title: 'Spring Quiz',
          img: 'xd1',
          description: 'hahaha1'
        },
        {
          title: 'J2EE Quiz',
          img: 'xd2',
          description: 'hahaha2'
        },
        {
          title: 'Spark Quiz',
          img: 'xd3',
          description: 'hahaha3'
        },
        {
          title: 'Spring Quiz',
          img: 'xd1',
          description: 'hahaha1'
        },
        {
          title: 'J2EE Quiz',
          img: 'xd2', 
          description: 'hahaha2'
        },
        {
          title: 'Spark Quiz',
          img: 'xd3',
          description: 'hahaha3'
        },
        {
          title: 'Spring Quiz',
          img: 'xd1',
          description: 'hahaha1'
        },
        {
          title: 'J2EE Quiz',
          img: 'xd2', 
          description: 'hahaha2'
        },
        {
          title: 'Spark Quiz',
          img: 'xd3',
          description: 'hahaha3'
        },
        {
          title: 'Spring Quiz',
          img: 'xd1',
          description: 'hahaha1'
        },
        {
          title: 'J2EE Quiz',
          img: 'xd2', 
          description: 'hahaha2'
        },
        {
          title: 'Spark Quiz',
          img: 'xd3',
          description: 'hahaha3'
        },
        {
          title: 'Spring Quiz',
          img: 'xd1',
          description: 'hahaha1'
        },
        {
          title: 'J2EE Quiz',
          img: 'xd2', 
          description: 'hahaha2'
        },
        {
          title: 'Spark Quiz',
          img: 'xd3',
          description: 'hahaha3'
        },
        {
          title: 'Spring Quiz',
          img: 'xd1',
          description: 'hahaha1'
        },
        {
          title: 'J2EE Quiz',
          img: 'xd2', 
          description: 'hahaha2'
        },
        {
          title: 'Spark Quiz',
          img: 'xd3',
          description: 'hahaha3'
        },
        {
          title: 'Spring Quiz',
          img: 'xd1',
          description: 'hahaha1'
        },
        {
          title: 'J2EE Quiz',
          img: 'xd2', 
          description: 'hahaha2'
        },
        {
          title: 'Spark Quiz',
          img: 'xd3',
          description: 'hahaha3'
        },
        {
          title: 'Spring Quiz',
          img: 'xd1',
          description: 'hahaha1'
        },
        {
          title: 'J2EE Quiz',
          img: 'xd2', 
          description: 'hahaha2'
        },
        {
          title: 'Spark Quiz',
          img: 'xd3',
          description: 'hahaha3'
        },
        {
          title: 'Spring Quiz',
          img: 'xd1',
          description: 'hahaha1'
        },
        {
          title: 'J2EE Quiz',
          img: 'xd2', 
          description: 'hahaha2'
        },
        {
          title: 'Spark Quiz',
          img: 'xd3',
          description: 'hahaha3'
        },
        {
          title: 'Spring Quiz',
          img: 'xd1',
          description: 'hahaha1'
        },
        {
          title: 'J2EE Quiz',
          img: 'xd2', 
          description: 'hahaha2'
        },
        {
          title: 'Spark Quiz',
          img: 'xd3',
          description: 'hahaha3'
        }
      ]
    },
    {
      name: 'typescript',
      content: [
        {
          title: 'Angular Quiz',
          img: 'xdd1',
          description: 'hahaha11'
        },
        {
          title: 'React Quiz',
          img: 'xdd2',
          description: 'hahaha22'
        }
      ]
    }
  ];

}
