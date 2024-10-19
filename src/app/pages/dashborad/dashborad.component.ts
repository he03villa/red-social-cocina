import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/angular/standalone';
import { MenuLateralComponent } from 'src/app/components/menu-lateral/menu-lateral.component';

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  standalone: true,
  imports: [IonSplitPane, IonApp, IonRouterOutlet, MenuLateralComponent],
  styleUrls: ['./dashborad.component.scss'],
})
export class DashboradComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
