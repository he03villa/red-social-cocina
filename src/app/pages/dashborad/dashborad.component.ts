import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonSplitPane, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { MenuLateralComponent } from 'src/app/components/menu-lateral/menu-lateral.component';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { SearchComponent } from 'src/app/modals/search/search.component';

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  standalone: true,
  imports: [IonIcon, IonTabButton, IonTabBar, IonSplitPane, IonApp, IonRouterOutlet, MenuLateralComponent, NavComponent],
  styleUrls: ['./dashborad.component.scss'],
  providers: [ModalController],
})
export class DashboradComponent  implements OnInit {

  private modalCtrl: ModalController = inject(ModalController);

  constructor() { 
    addIcons({ library, playCircle, radio, search });
  }

  ngOnInit() {}

  /**
   * Opens a modal with the specified component and data.
   * @param component The component to load into the modal.
   * @param data The data to pass to the modal component as input properties.
   * @returns A promise that resolves when the modal is presented.
   */
  async abrirModal(data: any, component: any) {
    const modal = await this.modalCtrl.create({
      component: component,
      componentProps: data
    });
    modal.present();
  }

}
