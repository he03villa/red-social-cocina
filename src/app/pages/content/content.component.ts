import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class ContentComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
