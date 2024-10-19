import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { notifications } from 'ionicons/icons';
import { IonHeader, IonToolbar, IonButtons, IonImg, IonButton, IonIcon, IonMenuButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonImg, IonButtons, IonToolbar, IonHeader, IonMenuButton],
})
export class NavComponent  implements OnInit {

  constructor() { 
    addIcons({ notifications });
  }

  ngOnInit() {}

}
