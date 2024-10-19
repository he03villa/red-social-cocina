import { Component, inject, OnInit } from '@angular/core';
import { IonItem, IonMenu, IonContent, IonList, IonListHeader, IonImg, IonButton } from "@ionic/angular/standalone";
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
  standalone: true,
  imports: [IonItem, IonMenu, IonContent, IonList, IonListHeader, IonImg, IonButton],
})
export class MenuLateralComponent  implements OnInit {

  _service:ServicesService = inject(ServicesService);

  constructor() { }

  ngOnInit() {}

}
