import { Component, OnInit } from '@angular/core';
import SwiperCore, { Virtual, Navigation, Pagination } from 'swiper/core';

SwiperCore.use([Virtual, Pagination, Navigation]);

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.scss']
})
export class NewsViewComponent implements OnInit {

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

  constructor() { }

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
